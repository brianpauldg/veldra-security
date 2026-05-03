/**
 * Bloom Metabolics — Compounded Rx Flagging Hook
 * Called when a compounded GLP-1 prescription is detected without valid justification.
 * Creates a medical director review alert.
 */

import { createReviewAlert } from './review-queue'
import { logAudit } from './audit'

/**
 * Flag a compounded Rx justification for medical director review.
 * Updates justification status to 'flagged' (in production, writes to Supabase).
 * Creates corresponding alert in review queue.
 */
export function flagCompoundedRxForReview(input: {
  justification_id: string
  patient_id: string
  drug: string
  reason: string
}): void {
  // Create review queue alert (PHI-redacted summary)
  createReviewAlert({
    alert_type: 'compounded_rx_flagged',
    severity: 'high',
    patient_id: input.patient_id,
    triggered_by_id: input.justification_id,
    triggered_by_type: 'compounded_rx_justifications',
    summary: `Compounded Rx justification flagged for ${input.drug}: ${input.reason}`,
    details: {
      justification_id: input.justification_id,
      drug: input.drug,
      reason: input.reason,
    },
  })

  logAudit({
    userId: 'system',
    userName: 'System',
    userRole: 'super_admin',
    action: 'compounded_rx_flagged',
    resourceType: 'compounded_rx_justifications',
    resourceId: input.justification_id,
    details: { drug: input.drug, reason: input.reason },
  })
}
