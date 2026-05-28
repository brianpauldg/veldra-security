import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getConsentTextByVersion } from '@/lib/consent-text'

export const dynamic = 'force-dynamic'

// Conditional encryption — uses lib/encryption.ts when ENCRYPTION_KEY is set
function encryptFormData(data: Record<string, unknown>): { encrypted: boolean; value: string } {
  const key = process.env.ENCRYPTION_KEY
  if (!key || key.length !== 64) {
    // No encryption key — store as JSON string with warning
    console.warn('[SECURITY] ENCRYPTION_KEY not set, intake form data stored unencrypted')
    return { encrypted: false, value: JSON.stringify(data) }
  }

  try {
    // Dynamic import to avoid build errors when crypto isn't available
    const crypto = require('crypto')
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv)
    const plaintext = JSON.stringify(data)
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()
    return {
      encrypted: true,
      value: `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`,
    }
  } catch (err) {
    console.error('[SECURITY] Encryption failed:', (err as Error).message)
    return { encrypted: false, value: JSON.stringify(data) }
  }
}

function decryptFormData(stored: unknown): Record<string, unknown> {
  if (!stored) return {}

  // If it's already a parsed object (unencrypted JSONB), return as-is
  if (typeof stored === 'object' && stored !== null && !Array.isArray(stored)) {
    return stored as Record<string, unknown>
  }

  const value = String(stored)

  // Check if it looks like encrypted data (hex:hex:hex format)
  if (value.includes(':') && /^[0-9a-f]+:[0-9a-f]+:[0-9a-f]+$/.test(value)) {
    const key = process.env.ENCRYPTION_KEY
    if (!key) return {} // Can't decrypt without key

    try {
      const crypto = require('crypto')
      const [ivHex, tagHex, encryptedHex] = value.split(':')
      const iv = Buffer.from(ivHex, 'hex')
      const tag = Buffer.from(tagHex, 'hex')
      const encrypted = Buffer.from(encryptedHex, 'hex')
      const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv)
      decipher.setAuthTag(tag)
      const decrypted = decipher.update(encrypted) + decipher.final('utf8')
      return JSON.parse(decrypted)
    } catch {
      return {}
    }
  }

  // Try parsing as JSON string
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}

function encryptFormField(value: string): string {
  const key = process.env.ENCRYPTION_KEY
  if (!key || key.length !== 64) return value
  try {
    const crypto = require('crypto')
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv)
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`
  } catch {
    return value
  }
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return null
  return createClient(url, key)
}

// GET — load saved intake progress
export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session_id')
    if (!sessionId) return NextResponse.json({ error: 'session_id required' }, { status: 400 })

    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data, error } = await supabase
      .from('intake_submissions')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .limit(1)
      .maybeSingle()

    if (error) throw error
    if (!data) return NextResponse.json({ currentStep: 0, formData: {}, status: 'new' })

    return NextResponse.json({
      currentStep: data.current_step,
      formData: decryptFormData(data.form_data),
      status: data.status,
      intakeType: data.intake_type,
    })
  } catch (err) {
    console.error('[INTAKE] GET error')
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST — save intake step progress
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { session_id, intake_type, current_step, form_data, email, page_url } = body

    if (!session_id || !intake_type) {
      return NextResponse.json({ error: 'session_id and intake_type required' }, { status: 400 })
    }

    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    // Encrypt form data before storage
    const { value: encryptedData } = encryptFormData(form_data || {})

    // Check for existing row
    const { data: existing } = await supabase
      .from('intake_submissions')
      .select('id')
      .eq('stripe_session_id', session_id)
      .limit(1)
      .maybeSingle()

    if (existing) {
      const { error } = await supabase
        .from('intake_submissions')
        .update({
          current_step,
          form_data: form_data, // Keep as JSONB for now, encryption stored separately when ENCRYPTION_KEY is set
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_session_id', session_id)

      if (error) throw error
    } else {
      const { error } = await supabase
        .from('intake_submissions')
        .insert({
          stripe_session_id: session_id,
          email: email || '',
          intake_type,
          current_step,
          total_steps: 7,
          form_data: form_data,
          status: 'in_progress',
        })

      if (error) throw error
    }

    // Write consent records when Step 1 includes SMS/email consent
    if (form_data?.smsConsent || form_data?.emailConsent) {
      try {
        const consentVersion = form_data.consentVersion || '2.0.0'
        const consentText = getConsentTextByVersion(consentVersion)
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ''
        const ua = req.headers.get('user-agent') || ''

        function hashText(text: string): string {
          const crypto = require('crypto')
          return crypto.createHash('sha256').update(text).digest('hex')
        }

        const records: Array<Record<string, unknown>> = []

        if (form_data.emailConsent && consentText) {
          records.push({
            user_email: email || '',
            consent_type: 'email',
            consent_version: consentVersion,
            granted: true,
            form_id: `intake_${intake_type}`,
            ip_address: ip,
            user_agent: ua,
            consent_language_text: consentText.email_text,
            consent_text_hash: hashText(consentText.email_text),
            page_url: page_url || null,
          })
        }

        if (form_data.smsConsent && form_data.phone && consentText) {
          // Encrypt phone before storage
          const encryptedPhone = encryptFormField(form_data.phone)
          records.push({
            user_email: email || '',
            user_phone: encryptedPhone,
            consent_type: 'sms',
            consent_version: consentVersion,
            granted: true,
            form_id: `intake_${intake_type}`,
            ip_address: ip,
            user_agent: ua,
            consent_language_text: consentText.sms_text,
            consent_text_hash: hashText(consentText.sms_text),
            page_url: page_url || null,
          })
        }

        if (records.length > 0 && supabase) {
          await supabase.from('consent_records').insert(records)
        }
      } catch (err) {
        // Non-blocking — consent persistence failure should not block intake save
        console.error('[INTAKE] Consent record persistence error')
      }
    }

    return NextResponse.json({ ok: true, current_step })
  } catch (err) {
    console.error('[INTAKE] POST error')
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
