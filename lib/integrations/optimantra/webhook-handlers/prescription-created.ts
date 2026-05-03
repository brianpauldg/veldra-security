/**
 * OptiMantra Webhook: prescription.created
 * Validates compounded Rx justification + CURES PMP compliance gates.
 */

import { getLocalIdForEHRPatient } from '@/lib/clinic/ehr-mapping'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { logAudit } from '@/lib/clinic/audit'

export async function handlePrescriptionCreated(data: Record<string, unknown>): Promise<void> {
  const patientId = data.patient_id as string
  const drugName = data.drug_name as string
  const prescriberId = data.prescriber_id as string
  const isCompounded = data.is_compounded as boolean
  const deaSchedule = data.dea_schedule as string | undefined

  if (!patientId || !drugName) return

  const localPatientId = await getLocalIdForEHRPatient(patientId, 'optimantra')

  logAudit({
    userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
    action: 'prescription_created_received', resourceType: 'prescriptions',
    resourceId: patientId, details: { drugName, isCompounded, deaSchedule },
  })

  const sb = getSupabaseAdmin()
  if (!sb || !localPatientId) return

  // Gate 1: Compounded GLP-1 prescriptions require justification within 90 days
  if (isCompounded) {
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 3600 * 1000).toISOString()
    const { data: justification } = await sb
      .from('compounded_rx_justifications')
      .select('id')
      .eq('patient_id', localPatientId)
      .gte('created_at', ninetyDaysAgo)
      .eq('status', 'approved')
      .limit(1)
      .single()

    if (!justification) {
      // Flag for medical director review
      await sb.from('medical_director_review_queue').insert({
        patient_id: localPatientId,
        alert_type: 'compounded_rx_flagged',
        severity: 'high',
        title: `Compounded Rx without justification: ${drugName}`,
        details: { drug_name: drugName, prescriber_id: prescriberId, ehr_patient_id: patientId },
        status: 'pending',
      })

      logAudit({
        userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
        action: 'compounded_rx_flagged', resourceType: 'medical_director_review_queue',
        resourceId: localPatientId, details: { drugName, reason: 'no_valid_justification' },
      })
    }
  }

  // Gate 2: Schedule III (testosterone) requires CURES PMP query within 120 days
  if (deaSchedule === 'III') {
    const oneHundredTwentyDaysAgo = new Date(Date.now() - 120 * 24 * 3600 * 1000).toISOString()
    const { data: pmpQuery } = await sb
      .from('pmp_queries')
      .select('id')
      .eq('patient_id', localPatientId)
      .gte('queried_at', oneHundredTwentyDaysAgo)
      .limit(1)
      .single()

    if (!pmpQuery) {
      await sb.from('medical_director_review_queue').insert({
        patient_id: localPatientId,
        alert_type: 'prescription_gate_bypass',
        severity: 'critical',
        title: `Schedule III Rx without CURES query: ${drugName}`,
        details: { drug_name: drugName, prescriber_id: prescriberId, ehr_patient_id: patientId, dea_schedule: deaSchedule },
        status: 'pending',
      })

      logAudit({
        userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
        action: 'prescription_gate_bypass', resourceType: 'medical_director_review_queue',
        resourceId: localPatientId, details: { drugName, reason: 'no_valid_cures_query' },
      })
    }
  }
}
