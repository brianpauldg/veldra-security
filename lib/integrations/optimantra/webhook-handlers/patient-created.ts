/**
 * OptiMantra Webhook: patient.created
 * Auto-links if external_id matches a Bloom local patient.
 */

import { linkPatientToEHR } from '@/lib/clinic/ehr-mapping'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { logAudit } from '@/lib/clinic/audit'

export async function handlePatientCreated(data: Record<string, unknown>): Promise<void> {
  const ehrPatientId = data.id as string
  const externalId = data.external_id as string | undefined

  if (!ehrPatientId) return

  logAudit({
    userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
    action: 'patient_created_received', resourceType: 'patients',
    resourceId: ehrPatientId, details: { externalId },
  })

  // If external_id is set and matches a Bloom patient UUID, auto-link
  if (externalId) {
    const sb = getSupabaseAdmin()
    if (sb) {
      const { data: localPatient } = await sb
        .from('patients')
        .select('id')
        .eq('id', externalId)
        .single()

      if (localPatient) {
        await linkPatientToEHR(externalId, 'optimantra', ehrPatientId)
        logAudit({
          userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
          action: 'patient_auto_linked', resourceType: 'ehr_patient_mappings',
          resourceId: externalId, details: { ehrPatientId },
        })
      }
    }
  }
}
