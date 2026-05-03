import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null })

vi.mock('@/lib/supabase-admin', () => ({
  getSupabaseAdmin: () => ({
    from: () => ({ insert: mockInsert }),
  }),
}))

vi.mock('@/lib/clinic/ehr-mapping', () => ({
  getLocalIdForEHRPatient: vi.fn().mockResolvedValue('local_patient_1'),
}))

vi.mock('@/lib/clinic/audit', () => ({ logAudit: vi.fn() }))

import { handleLabResultReceived } from '@/lib/integrations/optimantra/webhook-handlers/lab-result-received'

describe('lab-result-received webhook handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('hematocrit >54% triggers alert', async () => {
    await handleLabResultReceived({ patient_id: 'om_1', test_name: 'Hematocrit', result_value: '56.2' })
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ alert_type: 'lab_critical_value' })
    )
  })

  it('hematocrit <=54% no alert', async () => {
    await handleLabResultReceived({ patient_id: 'om_1', test_name: 'Hematocrit', result_value: '48.5' })
    expect(mockInsert).not.toHaveBeenCalled()
  })

  it('elevated ALT for GLP-1 patient triggers alert', async () => {
    await handleLabResultReceived({ patient_id: 'om_1', test_name: 'ALT (Alanine Aminotransferase)', result_value: '150' })
    expect(mockInsert).toHaveBeenCalled()
  })

  it('audit log captures lab result receipt', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    await handleLabResultReceived({ patient_id: 'om_1', test_name: 'TSH', result_value: '2.5' })
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'lab_result_received' })
    )
  })
})
