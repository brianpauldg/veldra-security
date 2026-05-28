/**
 * OptiMantra Webhook: lab_result.received
 * Checks critical values for TRT (hematocrit >54%) and GLP-1 (liver enzymes).
 */

import { getLocalIdForEHRPatient } from '@/lib/clinic/ehr-mapping'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { logAudit } from '@/lib/clinic/audit'

const HEMATOCRIT_THRESHOLD = 54
const ALT_THRESHOLD = 120 // U/L, roughly 3x upper normal
const AST_THRESHOLD = 120

export async function handleLabResultReceived(data: Record<string, unknown>): Promise<void> {
  const patientId = data.patient_id as string
  const testName = (data.test_name as string || '').toLowerCase()
  const resultValue = parseFloat(data.result_value as string)

  if (!patientId || isNaN(resultValue)) return

  const localPatientId = await getLocalIdForEHRPatient(patientId, 'optimantra')

  logAudit({
    userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
    action: 'lab_result_received', resourceType: 'lab_results',
    resourceId: patientId, details: { testName, resultValue },
  })

  const sb = getSupabaseAdmin()
  if (!sb || !localPatientId) return

  // Hematocrit > 54% — critical for TRT patients (polycythemia risk)
  if (testName.includes('hematocrit') && resultValue > HEMATOCRIT_THRESHOLD) {
    await sb.from('medical_director_review_queue').insert({
      patient_id: localPatientId,
      alert_type: 'lab_critical_value',
      severity: 'high',
      title: `Hematocrit ${resultValue}% exceeds ${HEMATOCRIT_THRESHOLD}% threshold`,
      details: { test_name: testName, result_value: resultValue, ehr_patient_id: patientId },
      status: 'pending',
    })
  }

  // Elevated liver enzymes — critical for GLP-1 patients
  if ((testName.includes('alt') || testName.includes('alanine')) && resultValue > ALT_THRESHOLD) {
    await sb.from('medical_director_review_queue').insert({
      patient_id: localPatientId,
      alert_type: 'lab_critical_value',
      severity: 'high',
      title: `ALT ${resultValue} U/L exceeds threshold`,
      details: { test_name: testName, result_value: resultValue, ehr_patient_id: patientId },
      status: 'pending',
    })
  }

  if ((testName.includes('ast') || testName.includes('aspartate')) && resultValue > AST_THRESHOLD) {
    await sb.from('medical_director_review_queue').insert({
      patient_id: localPatientId,
      alert_type: 'lab_critical_value',
      severity: 'high',
      title: `AST ${resultValue} U/L exceeds threshold`,
      details: { test_name: testName, result_value: resultValue, ehr_patient_id: patientId },
      status: 'pending',
    })
  }
}
