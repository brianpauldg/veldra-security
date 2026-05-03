import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/supabase-admin', () => ({ getSupabaseAdmin: () => null }))
vi.mock('@/lib/clinic/ehr-mapping', () => ({
  getLocalIdForEHRPatient: vi.fn().mockResolvedValue('local_patient_1'),
}))
vi.mock('@/lib/acquisition/tracking', () => ({
  trackEvent: vi.fn().mockResolvedValue(undefined),
}))
vi.mock('@/lib/email/sequence-engine', () => ({
  enrollInSequence: vi.fn(),
  exitSequence: vi.fn(),
}))
vi.mock('@/lib/clinic/audit', () => ({ logAudit: vi.fn() }))

import { handleAppointmentCompleted } from '@/lib/integrations/optimantra/webhook-handlers/appointment-completed'
import { trackEvent } from '@/lib/acquisition/tracking'
import { enrollInSequence, exitSequence } from '@/lib/email/sequence-engine'

describe('appointment-completed webhook handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('records consult_completed conversion event', async () => {
    await handleAppointmentCompleted({ patient_id: 'om_1', appointment_type: 'consultation' })
    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({ event_type: 'consult_completed' })
    )
  })

  it('enrolls in post_consult_v1 sequence', async () => {
    await handleAppointmentCompleted({ patient_id: 'om_1', appointment_type: 'consultation' })
    expect(enrollInSequence).toHaveBeenCalledWith('local_patient_1', 'post_consult_v1', expect.any(Array))
  })

  it('exits lead_nurture_v1 if active', async () => {
    await handleAppointmentCompleted({ patient_id: 'om_1', appointment_type: 'consultation' })
    expect(exitSequence).toHaveBeenCalledWith('local_patient_1', 'lead_nurture_v1', 'consult_completed')
  })

  it('audit log captures completion', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    await handleAppointmentCompleted({ patient_id: 'om_1', appointment_type: 'follow_up' })
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'appointment_completed' })
    )
  })
})
