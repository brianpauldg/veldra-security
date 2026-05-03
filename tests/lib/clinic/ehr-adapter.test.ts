import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MockEHRAdapter } from '@/lib/clinic/ehr-adapter-mock'
import type { CanonicalPatient } from '@/lib/clinic/ehr-types'

vi.mock('@/lib/clinic/audit', () => ({ logAudit: vi.fn() }))

describe('EHR Adapter', () => {
  let adapter: MockEHRAdapter

  beforeEach(() => {
    adapter = new MockEHRAdapter()
    adapter.reset()
  })

  const seedPatient: CanonicalPatient = {
    localId: 'local_1',
    ehrId: 'ehr_1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    status: 'active',
  }

  it('mock adapter satisfies EHRAdapter interface', () => {
    expect(adapter.getPatientByLocalId).toBeDefined()
    expect(adapter.linkPatient).toBeDefined()
    expect(adapter.pushSignedConsentPDF).toBeDefined()
  })

  it('getPatientByLocalId returns canonical shape', async () => {
    adapter.seedPatient(seedPatient)
    const result = await adapter.getPatientByLocalId('local_1')
    expect(result).not.toBeNull()
    expect(result!.firstName).toBe('John')
    expect(result!.localId).toBe('local_1')
  })

  it('getPatientByLocalId returns null for unknown', async () => {
    const result = await adapter.getPatientByLocalId('nonexistent')
    expect(result).toBeNull()
  })

  it('linkPatient persists mapping', async () => {
    adapter.seedPatient({ ...seedPatient, ehrId: undefined })
    await adapter.linkPatient('local_1', 'ehr_new')
    const result = await adapter.getPatientByLocalId('local_1')
    expect(result!.ehrId).toBe('ehr_new')
    expect(result!.linkedAt).toBeDefined()
  })

  it('pushSignedConsentPDF returns ehrDocumentId', async () => {
    const result = await adapter.pushSignedConsentPDF(
      'local_1', 'consent_1', Buffer.from('pdf'),
      { consentType: 'trt', consentVersion: '1.0', signedAt: '2026-01-01', patientName: 'John' }
    )
    expect(result.ehrDocumentId).toBe('mock_doc_consent_1')
  })

  it('getPatientByEmail returns matching patient', async () => {
    adapter.seedPatient(seedPatient)
    const result = await adapter.getPatientByEmail('john@example.com')
    expect(result).not.toBeNull()
    expect(result!.localId).toBe('local_1')
  })

  it('getPrescriptionsForPatient returns empty array in mock', async () => {
    const result = await adapter.getPrescriptionsForPatient('local_1')
    expect(result).toEqual([])
  })

  it('getLabResultsForPatient returns empty array in mock', async () => {
    const result = await adapter.getLabResultsForPatient('local_1')
    expect(result).toEqual([])
  })
})
