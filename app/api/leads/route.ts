import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { enrichServerLead, type EnrichedLead } from '@/lib/attribution'
import { getConsentTextByVersion } from '@/lib/consent-text'
import {
  sendTelegram,
  sendLeadEmail,
  emitN8n,
  formatTelegramLead,
  formatLeadEmail,
  isHighIntent,
  logLeadFailure,
} from '@/lib/notify'
import { trackEvent, recordTouchpoint } from '@/lib/acquisition/tracking'
import { sendTemplatedEmail } from '@/lib/email/send'

type NotifyResult = { ok: boolean; skipped?: boolean; error?: string; status?: number }

function encryptPhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined
  const key = process.env.ENCRYPTION_KEY
  if (!key || key.length !== 64) return phone // Dev fallback, plaintext
  try {
    const crypto = require('crypto')
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv)
    const encrypted = Buffer.concat([cipher.update(phone, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`
  } catch {
    return phone
  }
}

const GHL_API_KEY = process.env.GHL_API_KEY || ''
const GHL_BASE_URL = process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com'
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || ''

const leadSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  variant: z.enum(['quiz', 'guide']).optional(),
  serviceInterest: z.enum(['trt', 'glp1', 'general']).optional(),
  // Free Assessment (TRT quiz) result — powers the {{assessment_result}} email merge field
  assessmentScore: z.number().optional(),
  assessmentTier: z.enum(['low', 'moderate', 'high']).optional(),
  assessmentResult: z.string().max(2000).optional(),
  // Client-captured attribution (optional — server still enriches with geo/device/session)
  attribution: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      content: z.string().optional(),
      term: z.string().optional(),
      gclid: z.string().optional(),
      fbclid: z.string().optional(),
      landing_page: z.string().optional(),
      referrer: z.string().optional(),
      captured_at: z.string().optional(),
    })
    .optional(),
  session_id: z.string().optional(),
  consent: z.object({
    email: z.boolean().optional(),
    sms: z.boolean().optional(),
    version: z.string().optional(),
  }).optional(),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const lead = enrichServerLead(parsed.data as Record<string, unknown>, req.headers)
  const consentData = parsed.data.consent

  // Persist consent records to Supabase if consent provided
  if (consentData && (consentData.email || consentData.sms)) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import('@supabase/supabase-js')
        const sb = createClient(supabaseUrl, supabaseKey)
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ''
        const ua = req.headers.get('user-agent') || ''
        const version = consentData.version || '2.0.0'
        const consentText = getConsentTextByVersion(version)
        const crypto = require('crypto')
        function hashText(text: string): string {
          return crypto.createHash('sha256').update(text).digest('hex')
        }
        const records = []
        if (consentData.email) {
          const langText = consentText?.email_text || ''
          records.push({
            user_email: parsed.data.email,
            consent_type: 'email',
            consent_version: version,
            granted: true,
            form_id: parsed.data.source || 'lead_form',
            ip_address: ip,
            user_agent: ua,
            consent_language_text: langText,
            consent_text_hash: langText ? hashText(langText) : null,
            page_url: req.headers.get('referer') || null,
          })
        }
        if (consentData.sms && parsed.data.phone) {
          const langText = consentText?.sms_text || ''
          records.push({
            user_email: parsed.data.email,
            user_phone: encryptPhone(parsed.data.phone),
            consent_type: 'sms',
            consent_version: version,
            granted: true,
            form_id: parsed.data.source || 'lead_form',
            ip_address: ip,
            user_agent: ua,
            consent_language_text: langText,
            consent_text_hash: langText ? hashText(langText) : null,
            page_url: req.headers.get('referer') || null,
          })
        }
        if (records.length > 0) {
          await sb.from('consent_records').insert(records)
        }
      }
    } catch (err) {
      // Non-blocking — consent persistence failure should not block lead capture
      console.error('[LEADS] Consent record persistence error')
    }
  }

  // Track lead_created event + record attribution touchpoint
  const attribution = parsed.data.attribution
  await trackEvent({
    event_type: 'lead_created',
    lead_id: lead.lead_id,
    session_id: parsed.data.session_id,
    source: attribution?.source || parsed.data.source,
    medium: attribution?.medium,
    campaign: attribution?.campaign,
    content: attribution?.content,
    term: attribution?.term,
    referrer: attribution?.referrer,
    landing_page: attribution?.landing_page,
    event_data: {
      variant: parsed.data.variant,
      serviceInterest: parsed.data.serviceInterest,
      assessmentTier: parsed.data.assessmentTier,
      assessmentScore: parsed.data.assessmentScore,
    },
  })

  if (parsed.data.session_id) {
    await recordTouchpoint(parsed.data.session_id, {
      source: attribution?.source || parsed.data.source,
      medium: attribution?.medium,
      campaign: attribution?.campaign,
      content: attribution?.content,
      term: attribution?.term,
      landing_page: attribution?.landing_page,
      at: new Date().toISOString(),
    })
  }

  // Send welcome email (non-blocking — fires after tracking, before GHL/notifications)
  if (consentData?.email) {
    const serviceLabel = parsed.data.serviceInterest === 'trt' ? 'TRT' : parsed.data.serviceInterest === 'glp1' ? 'GLP-1' : 'hormone optimization'
    sendTemplatedEmail({
      template_id: 'welcome-after-lead',
      to: parsed.data.email,
      subject: 'Welcome to Bloom Metabolics',
      html: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
        <h1 style="font-size:24px;color:#1a1a1a;">Welcome to Bloom Metabolics</h1>
        <p>Thank you for your interest in ${serviceLabel} therapy. Our clinical team is ready to help you take the next step.</p>
        <p><strong>What happens next:</strong></p>
        <ol>
          <li>Book an Optimization Consultation ($49, credited toward Month 1 of membership)</li>
          <li>Complete a brief medical intake form</li>
          <li>Meet with a licensed provider via telehealth</li>
        </ol>
        <p><a href="https://bloommetabolics.com/book" style="display:inline-block;background:#1a1a1a;color:#c9b88c;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;">Book Your Consultation</a></p>
        <p style="font-size:13px;color:#666;margin-top:24px;">Individual results vary. All treatments require evaluation by a licensed provider.</p>
      </div>`,
      lead_id: lead.lead_id,
    }).catch(() => { /* non-blocking */ })
  }

  // Fire all side effects in parallel. None blocks another.
  const [ghlRes, n8nRes, tgRes, emailRes] = await Promise.allSettled([
    upsertGhl(lead),
    emitN8n('nova.lead.captured', lead as unknown as Record<string, unknown>),
    isHighIntent(lead) ? sendTelegram(formatTelegramLead(lead)) : Promise.resolve<NotifyResult>({ ok: true, skipped: true }),
    sendLeadAlertEmail(lead),
  ])

  const failures: Array<{ channel: string; error: string }> = []
  if (ghlRes.status === 'rejected') failures.push({ channel: 'ghl', error: String(ghlRes.reason) })
  else if (!ghlRes.value.ok && !ghlRes.value.skipped) failures.push({ channel: 'ghl', error: ghlRes.value.error || 'ghl_failed' })

  if (n8nRes.status === 'rejected') failures.push({ channel: 'n8n', error: String(n8nRes.reason) })
  else if (!n8nRes.value.ok && !n8nRes.value.skipped) failures.push({ channel: 'n8n', error: n8nRes.value.error || 'n8n_failed' })

  if (tgRes.status === 'rejected') failures.push({ channel: 'telegram', error: String(tgRes.reason) })
  else if (!tgRes.value.ok && !tgRes.value.skipped) failures.push({ channel: 'telegram', error: tgRes.value.error || 'tg_failed' })

  if (emailRes.status === 'rejected') failures.push({ channel: 'email', error: String(emailRes.reason) })
  else if (!emailRes.value.ok && !emailRes.value.skipped) failures.push({ channel: 'email', error: emailRes.value.error || 'email_failed' })

  if (failures.length) logLeadFailure(lead, failures)

  return NextResponse.json({
    ok: true,
    lead_id: lead.lead_id,
    contactId: ghlRes.status === 'fulfilled' ? ghlRes.value.contactId : undefined,
    delivered: {
      ghl: ghlRes.status === 'fulfilled' && ghlRes.value.ok,
      n8n: n8nRes.status === 'fulfilled' && n8nRes.value.ok,
      telegram: tgRes.status === 'fulfilled' && tgRes.value.ok,
      email: emailRes.status === 'fulfilled' && emailRes.value.ok,
    },
  })
}

export async function GET() {
  return NextResponse.json({
    service: 'Bloom Metabolics, Lead Capture API',
    status: 'active',
    integrations: {
      ghl: Boolean(GHL_API_KEY && GHL_LOCATION_ID),
      telegram: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
      n8n: Boolean(process.env.N8N_WEBHOOK_URL),
      email: Boolean(process.env.RESEND_API_KEY && process.env.LEAD_ALERT_EMAIL),
    },
  })
}

// ─── GHL upsert ─────────────────────────────────────────────
async function upsertGhl(lead: EnrichedLead): Promise<{ ok: boolean; skipped?: boolean; contactId?: string; error?: string }> {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return { ok: true, skipped: true }
  }

  const tags = buildTags(lead)

  try {
    const res = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        email: lead.email,
        firstName: lead.firstName,
        lastName: lead.lastName,
        phone: lead.phone,
        source: lead.source || 'bloom_metabolics_website',
        tags,
        customFields: buildGhlCustomFields(lead),
      }),
    })

    const data = (await res.json().catch(() => ({}))) as { contact?: { id?: string }; id?: string }
    if (!res.ok) {
      return { ok: false, error: `ghl_${res.status}` }
    }
    return { ok: true, contactId: data.contact?.id || data.id }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown' }
  }
}

function buildTags(lead: EnrichedLead): string[] {
  const tags = ['website-lead']
  if (lead.source) tags.push(`source-${lead.source}`)
  if (lead.medium) tags.push(`medium-${lead.medium}`)
  if (lead.campaign) tags.push(`campaign-${lead.campaign}`)
  if (lead.variant) tags.push(`popup-${lead.variant}`)
  if (lead.serviceInterest) tags.push(`interest-${lead.serviceInterest}`)
  else if (lead.variant === 'quiz') tags.push('interest-trt')
  if (lead.assessmentTier) tags.push(`assessment-${lead.assessmentTier}`)
  if (lead.device) tags.push(`device-${lead.device}`)
  if (lead.gclid) tags.push('from-google-ads')
  if (lead.fbclid) tags.push('from-meta-ads')
  return tags
}

function buildGhlCustomFields(lead: EnrichedLead): Record<string, string | undefined> {
  return {
    landing_page: lead.landing_page,
    referrer: lead.referrer,
    gclid: lead.gclid,
    fbclid: lead.fbclid,
    lead_id: lead.lead_id,
    session_id: lead.session_id,
    geo_region: lead.geo?.region,
    geo_country: lead.geo?.country,
    geo_city: lead.geo?.city,
    assessment_tier: lead.assessmentTier,
    assessment_score: lead.assessmentScore != null ? String(lead.assessmentScore) : undefined,
    assessment_result: lead.assessmentResult,
  }
}

async function sendLeadAlertEmail(lead: EnrichedLead) {
  const { subject, text } = formatLeadEmail(lead)
  return sendLeadEmail(subject, text)
}
