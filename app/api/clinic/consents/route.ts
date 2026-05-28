import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'
import { getConsentTemplate, getCurrentConsentTemplates } from '@/lib/clinic/consent-templates'
import { generateConsentPDF } from '@/lib/clinic/consent-pdf'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return null
  return createClient(url, key)
}

// GET — retrieve consent templates
export async function GET(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  const id = req.nextUrl.searchParams.get('id')
  const version = req.nextUrl.searchParams.get('version') || undefined

  if (id) {
    const template = getConsentTemplate(id, version)
    if (!template) return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    return NextResponse.json(template)
  }

  return NextResponse.json({ templates: getCurrentConsentTemplates() })
}

// POST — record an e-signature
export async function POST(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const body = await req.json()
    const { patient_id, document_id, document_version, signature_data, ip_address, user_agent } = body

    if (!document_id || !signature_data) {
      return NextResponse.json({ error: 'document_id and signature_data required' }, { status: 400 })
    }

    const template = getConsentTemplate(document_id, document_version)
    if (!template) return NextResponse.json({ error: 'Invalid consent template' }, { status: 400 })

    // Hash the consent document content for integrity verification
    const contentHash = crypto.createHash('sha256').update(template.body).digest('hex')

    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data, error } = await supabase
      .from('signed_consents')
      .insert({
        patient_id: patient_id || null,
        document_id,
        document_version: document_version || template.version,
        signed_at: new Date().toISOString(),
        signature_data, // Should be encrypted by caller
        ip_address: ip_address || '',
        user_agent: user_agent || '',
        content_hash: contentHash,
      })
      .select('id')
      .single()

    if (error) throw error

    // Generate PDF and upload to Supabase Storage
    let pdfUrl: string | null = null
    try {
      const signedAt = new Date().toISOString()
      const pdfBuffer = await generateConsentPDF({
        templateTitle: template.title,
        templateBody: template.body,
        templateVersion: template.version,
        patientName: body.patient_name || 'Patient',
        signatureDataURL: signature_data,
        signedAt,
        ipAddress: ip_address || '',
        contentHash,
      })

      const fileName = `${patient_id || 'unknown'}/${document_id}-v${template.version}-${signedAt.replace(/[:.]/g, '-')}.pdf`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('signed-consents')
        .upload(fileName, pdfBuffer, { contentType: 'application/pdf', upsert: false })

      if (!uploadError && uploadData) {
        pdfUrl = uploadData.path
        // Update signed_consents row with PDF path
        await supabase.from('signed_consents').update({ pdf_storage_url: pdfUrl } as any).eq('id', data.id)
      }
    } catch (pdfErr) {
      console.error('[CONSENTS] PDF generation/upload error, consent record saved without PDF')
    }

    return NextResponse.json({ ok: true, consent_id: data.id, content_hash: contentHash, pdf_url: pdfUrl })
  } catch (err) {
    console.error('[CONSENTS] POST error')
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PATCH — supersede a consent with new version
export async function PATCH(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const body = await req.json()
    const { consent_id, superseded_by } = body

    if (!consent_id || !superseded_by) {
      return NextResponse.json({ error: 'consent_id and superseded_by required' }, { status: 400 })
    }

    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { error } = await supabase
      .from('signed_consents')
      .update({
        superseded_by,
        superseded_at: new Date().toISOString(),
      })
      .eq('id', consent_id)

    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[CONSENTS] PATCH error')
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
