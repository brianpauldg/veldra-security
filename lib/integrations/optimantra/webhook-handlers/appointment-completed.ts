/**
 * OptiMantra Webhook: appointment.completed
 * Records conversion event and triggers post-consult sequence.
 */

import { getLocalIdForEHRPatient } from '@/lib/clinic/ehr-mapping'
import { trackEvent } from '@/lib/acquisition/tracking'
import { enrollInSequence, exitSequence } from '@/lib/email/sequence-engine'
import { logAudit } from '@/lib/clinic/audit'

export async function handleAppointmentCompleted(data: Record<string, unknown>): Promise<void> {
  const patientId = data.patient_id as string
  const appointmentType = data.appointment_type as string

  if (!patientId) return

  const localPatientId = await getLocalIdForEHRPatient(patientId, 'optimantra')

  logAudit({
    userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
    action: 'appointment_completed', resourceType: 'appointments',
    resourceId: patientId, details: { appointmentType },
  })

  // Record conversion event
  await trackEvent({
    event_type: 'consult_completed',
    patient_id: localPatientId || undefined,
    event_data: { appointment_type: appointmentType, ehr_patient_id: patientId },
  })

  if (localPatientId) {
    // Exit lead nurture sequence if active
    exitSequence(localPatientId, 'lead_nurture_v1', 'consult_completed')

    // Enroll in post-consultation sequence
    enrollInSequence(localPatientId, 'post_consult_v1', [
      { id: 'pc_step_1', delay_hours: 2, template_id: 'consult-followup' },
      { id: 'pc_step_2', delay_hours: 72, template_id: 'consult-reminder' },
    ])
  }
}
