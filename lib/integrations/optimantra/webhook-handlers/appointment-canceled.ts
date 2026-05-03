/**
 * OptiMantra Webhook: appointment.canceled
 * Audit log only — clinician handles re-booking.
 */

import { logAudit } from '@/lib/clinic/audit'

export async function handleAppointmentCanceled(data: Record<string, unknown>): Promise<void> {
  const patientId = data.patient_id as string
  const appointmentType = data.appointment_type as string
  const reason = data.cancellation_reason as string | undefined

  logAudit({
    userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
    action: 'appointment_canceled', resourceType: 'appointments',
    resourceId: patientId || '', details: { appointmentType, reason },
  })
}
