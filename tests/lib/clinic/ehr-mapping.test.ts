import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/supabase-admin', () => ({ getSupabaseAdmin: () => null }))
vi.mock('@/lib/clinic/audit', () => ({ logAudit: vi.fn() }))

import { linkPatientToEHR, getEHRIdForLocalPatient, unlinkPatient } from '@/lib/clinic/ehr-mapping'

describe('EHR patient mapping', () => {
  it('linkPatientToEHR creates mapping (in-memory fallback)', async () => {
    await linkPatientToEHR('local_map_1', 'optimantra', 'ehr_map_1')
    const result = await getEHRIdForLocalPatient('local_map_1', 'optimantra')
    expect(result).toBe('ehr_map_1')
  })

  it('linkPatientToEHR is idempotent', async () => {
    await linkPatientToEHR('local_map_2', 'optimantra', 'ehr_map_2')
    await linkPatientToEHR('local_map_2', 'optimantra', 'ehr_map_2')
    const result = await getEHRIdForLocalPatient('local_map_2', 'optimantra')
    expect(result).toBe('ehr_map_2')
  })

  it('getEHRIdForLocalPatient returns null when no mapping', async () => {
    const result = await getEHRIdForLocalPatient('nonexistent', 'optimantra')
    expect(result).toBeNull()
  })

  it('unlinkPatient removes mapping (in-memory)', async () => {
    await linkPatientToEHR('local_map_3', 'optimantra', 'ehr_map_3')
    await unlinkPatient('local_map_3', 'optimantra', 'test reason')
    const result = await getEHRIdForLocalPatient('local_map_3', 'optimantra')
    expect(result).toBeNull()
  })

  it('audit log captures link operations', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    await linkPatientToEHR('local_map_4', 'optimantra', 'ehr_map_4')
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'ehr_patient_linked' })
    )
  })

  it('audit log captures unlink operations', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    await linkPatientToEHR('local_map_5', 'optimantra', 'ehr_map_5')
    await unlinkPatient('local_map_5', 'optimantra', 'deactivated')
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'ehr_patient_unlinked' })
    )
  })
})
