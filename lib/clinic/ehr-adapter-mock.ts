/**
 * Bloom Metabolics — Mock EHR Adapter
 * Used when OPTIMANTRA_ENABLED=false or in tests.
 */

import type {
  EHRAdapter,
  CanonicalPatient,
  CanonicalPrescription,
  CanonicalLabResult,
  ConsentDocumentMetadata,
} from './ehr-types'

const mockPatients = new Map<string, CanonicalPatient>()
const mockLinks = new Map<string, string>() // localId → ehrId
const mockDocuments = new Map<string, string>() // consentId → ehrDocumentId

export class MockEHRAdapter implements EHRAdapter {
  async getPatientByLocalId(localPatientId: string): Promise<CanonicalPatient | null> {
    return mockPatients.get(localPatientId) || null
  }

  async getPatientByEHRId(ehrPatientId: string): Promise<CanonicalPatient | null> {
    for (const p of mockPatients.values()) {
      if (p.ehrId === ehrPatientId) return p
    }
    return null
  }

  async getPatientByEmail(email: string): Promise<CanonicalPatient | null> {
    for (const p of mockPatients.values()) {
      if (p.email === email) return p
    }
    return null
  }

  async linkPatient(localPatientId: string, ehrPatientId: string): Promise<void> {
    mockLinks.set(localPatientId, ehrPatientId)
    const existing = mockPatients.get(localPatientId)
    if (existing) {
      existing.ehrId = ehrPatientId
      existing.linkedAt = new Date().toISOString()
    }
  }

  async getPrescriptionsForPatient(_localPatientId: string): Promise<CanonicalPrescription[]> {
    return []
  }

  async getLabResultsForPatient(_localPatientId: string): Promise<CanonicalLabResult[]> {
    return []
  }

  async pushSignedConsentPDF(
    _localPatientId: string,
    consentId: string,
    _pdfBuffer: Buffer,
    _metadata: ConsentDocumentMetadata,
  ): Promise<{ ehrDocumentId: string }> {
    const ehrDocumentId = `mock_doc_${consentId}`
    mockDocuments.set(consentId, ehrDocumentId)
    return { ehrDocumentId }
  }

  // Test helpers
  seedPatient(patient: CanonicalPatient): void {
    mockPatients.set(patient.localId, patient)
  }

  reset(): void {
    mockPatients.clear()
    mockLinks.clear()
    mockDocuments.clear()
  }
}
