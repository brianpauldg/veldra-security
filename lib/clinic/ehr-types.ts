/**
 * Bloom Metabolics — Canonical EHR Types
 * Internal data model; all EHR-specific data gets translated to these shapes.
 */

export interface CanonicalPatient {
  localId: string             // Bloom UUID
  ehrId?: string              // OptiMantra/external ID
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | 'unknown'
  state?: string
  status: string
  linkedAt?: string
}

export interface CanonicalPrescription {
  id: string
  patientId: string
  prescriberId: string
  drugName: string
  drugNdc?: string
  quantity: number
  refills: number
  directions: string
  deaSchedule?: string
  isCompounded: boolean
  prescribedAt: string
  status: string
}

export interface CanonicalLabResult {
  id: string
  patientId: string
  testName: string
  resultValue: string
  resultUnit?: string
  referenceRange?: string
  abnormalFlag?: 'high' | 'low' | 'critical_high' | 'critical_low' | null
  collectedAt: string
  resultedAt: string
}

export interface CanonicalProvider {
  id: string
  firstName: string
  lastName: string
  npi?: string
  deaNumber?: string
  specialty?: string
  email?: string
}

export interface CanonicalAppointment {
  id: string
  patientId: string
  providerId: string
  type: string
  status: 'scheduled' | 'completed' | 'canceled' | 'no_show'
  startAt: string
  endAt: string
  notes?: string
}

export interface ConsentDocumentMetadata {
  consentType: string
  consentVersion: string
  signedAt: string
  patientName: string
}

export interface EHRAdapter {
  getPatientByLocalId(localPatientId: string): Promise<CanonicalPatient | null>
  getPatientByEHRId(ehrPatientId: string): Promise<CanonicalPatient | null>
  getPatientByEmail(email: string): Promise<CanonicalPatient | null>
  linkPatient(localPatientId: string, ehrPatientId: string): Promise<void>
  getPrescriptionsForPatient(localPatientId: string): Promise<CanonicalPrescription[]>
  getLabResultsForPatient(localPatientId: string): Promise<CanonicalLabResult[]>
  pushSignedConsentPDF(localPatientId: string, consentId: string, pdfBuffer: Buffer, metadata: ConsentDocumentMetadata): Promise<{ ehrDocumentId: string }>
}
