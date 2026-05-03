/**
 * Bloom Metabolics — Consent Document Push to EHR
 * Pushes signed consent PDFs to OptiMantra patient chart.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getEHRAdapter } from '@/config/integrations/ehr'
import { logAudit } from './audit'
import type { ConsentDocumentMetadata } from './ehr-types'

export async function pushConsentToEHR(consentId: string): Promise<{ pushed: boolean; ehrDocumentId?: string; error?: string }> {
  const sb = getSupabaseAdmin()
  if (!sb) return { pushed: false, error: 'Supabase not configured' }

  // Check if already pushed (idempotent)
  const { data: consent } = await sb
    .from('signed_consents')
    .select('id, patient_id, consent_type, consent_version, signed_at, patient_name, ehr_document_id, pdf_path')
    .eq('id', consentId)
    .single()

  if (!consent) return { pushed: false, error: 'Consent not found' }
  if (consent.ehr_document_id) return { pushed: true, ehrDocumentId: consent.ehr_document_id }

  try {
    // Read PDF from Supabase Storage
    let pdfBuffer: Buffer
    if (consent.pdf_path) {
      const { data: fileData, error: downloadError } = await sb.storage
        .from('signed-consents')
        .download(consent.pdf_path)
      if (downloadError || !fileData) {
        throw new Error(`PDF download failed: ${downloadError?.message || 'no data'}`)
      }
      pdfBuffer = Buffer.from(await fileData.arrayBuffer())
    } else {
      return { pushed: false, error: 'No PDF path on consent record' }
    }

    const metadata: ConsentDocumentMetadata = {
      consentType: consent.consent_type,
      consentVersion: consent.consent_version,
      signedAt: consent.signed_at,
      patientName: consent.patient_name || 'Patient',
    }

    const adapter = getEHRAdapter()
    const { ehrDocumentId } = await adapter.pushSignedConsentPDF(
      consent.patient_id,
      consentId,
      pdfBuffer,
      metadata,
    )

    // Update signed_consents record
    await sb.from('signed_consents').update({
      ehr_document_id: ehrDocumentId,
      ehr_pushed_at: new Date().toISOString(),
      ehr_push_error: null,
    }).eq('id', consentId)

    logAudit({
      userId: 'system', userName: 'Consent Push', userRole: 'super_admin',
      action: 'consent_pushed_to_ehr', resourceType: 'signed_consents',
      resourceId: consentId, details: { ehrDocumentId },
    })

    return { pushed: true, ehrDocumentId }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'unknown'

    // Record error on consent
    await sb.from('signed_consents').update({
      ehr_push_error: errorMsg,
    }).eq('id', consentId)

    // Create alert for manual reconciliation
    await sb.from('medical_director_review_queue').insert({
      patient_id: consent.patient_id,
      alert_type: 'consent_push_failed',
      severity: 'medium',
      title: `Consent push to EHR failed: ${consent.consent_type}`,
      details: { consentId, error: errorMsg },
      status: 'pending',
    })

    logAudit({
      userId: 'system', userName: 'Consent Push', userRole: 'super_admin',
      action: 'consent_push_failed', resourceType: 'signed_consents',
      resourceId: consentId, details: { error: errorMsg },
    })

    return { pushed: false, error: errorMsg }
  }
}
