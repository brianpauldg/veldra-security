import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null })
const mockSingle = vi.fn()

function chainable(): Record<string, unknown> {
  const self: Record<string, unknown> = {}
  for (const m of ['select', 'eq', 'gte', 'limit']) {
    self[m] = () => self
  }
  self.single = mockSingle
  return self
}

vi.mock('@/lib/supabase-admin', () => ({
  getSupabaseAdmin: () => ({
    from: (table: string) => {
      if (table === 'medical_director_review_queue') {
        return { insert: mockInsert }
      }
      return chainable()
    },
  }),
}))

vi.mock('@/lib/clinic/ehr-mapping', () => ({
  getLocalIdForEHRPatient: vi.fn().mockResolvedValue('local_patient_1'),
}))

vi.mock('@/lib/clinic/audit', () => ({ logAudit: vi.fn() }))

import { handlePrescriptionCreated } from '@/lib/integrations/optimantra/webhook-handlers/prescription-created'

describe('prescription-created webhook handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('compounded GLP-1 with valid justification: no alert', async () => {
    mockSingle.mockResolvedValue({ data: { id: 'just_1' }, error: null })
    await handlePrescriptionCreated({ patient_id: 'om_1', drug_name: 'Semaglutide', is_compounded: true })
    expect(mockInsert).not.toHaveBeenCalled()
  })

  it('compounded GLP-1 without justification: alert created', async () => {
    mockSingle.mockResolvedValue({ data: null, error: null })
    await handlePrescriptionCreated({ patient_id: 'om_1', drug_name: 'Semaglutide', is_compounded: true })
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ alert_type: 'compounded_rx_flagged', severity: 'high' })
    )
  })

  it('compounded GLP-1 with expired justification: alert created', async () => {
    mockSingle.mockResolvedValue({ data: null, error: null })
    await handlePrescriptionCreated({ patient_id: 'om_1', drug_name: 'Tirzepatide', is_compounded: true })
    expect(mockInsert).toHaveBeenCalled()
  })

  it('Schedule III with valid CURES query: no alert', async () => {
    mockSingle.mockResolvedValue({ data: { id: 'pmp_1' }, error: null })
    await handlePrescriptionCreated({ patient_id: 'om_1', drug_name: 'Testosterone Cypionate', dea_schedule: 'III', is_compounded: false })
    expect(mockInsert).not.toHaveBeenCalled()
  })

  it('Schedule III without CURES query: critical alert', async () => {
    mockSingle.mockResolvedValue({ data: null, error: null })
    await handlePrescriptionCreated({ patient_id: 'om_1', drug_name: 'Testosterone', dea_schedule: 'III', is_compounded: false })
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ alert_type: 'prescription_gate_bypass', severity: 'critical' })
    )
  })

  it('Schedule III with expired CURES: alert created', async () => {
    mockSingle.mockResolvedValue({ data: null, error: null })
    await handlePrescriptionCreated({ patient_id: 'om_1', drug_name: 'Testosterone', dea_schedule: 'III', is_compounded: false })
    expect(mockInsert).toHaveBeenCalled()
  })

  it('non-compounded non-Schedule-III: no gates checked', async () => {
    await handlePrescriptionCreated({ patient_id: 'om_1', drug_name: 'Metformin', is_compounded: false })
    expect(mockInsert).not.toHaveBeenCalled()
  })

  it('audit log captures every event', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    await handlePrescriptionCreated({ patient_id: 'om_1', drug_name: 'Test', is_compounded: false })
    expect(logAudit).toHaveBeenCalled()
  })
})
