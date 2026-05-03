/**
 * Bloom Metabolics — OptiMantra EHR Adapter
 * Translates between canonical Bloom shapes and OptiMantra API responses.
 */

import type {
  EHRAdapter,
  CanonicalPatient,
  CanonicalPrescription,
  CanonicalLabResult,
  ConsentDocumentMetadata,
} from './ehr-types'
import * as optiMantra from '@/lib/integrations/optimantra/client'
import type { OptiMantraPatient, OptiMantraPrescription, OptiMantraLabResult } from '@/lib/integrations/optimantra/types'
import { getEHRIdForLocalPatient, linkPatientToEHR } from './ehr-mapping'
import { logAudit } from './audit'

function toCanonicalPatient(om: OptiMantraPatient, localId?: string): CanonicalPatient {
  return {
    localId: localId || om.external_id || '',
    ehrId: om.id,
    firstName: om.first_name,
    lastName: om.last_name,
    email: om.email,
    phone: om.phone,
    dateOfBirth: om.date_of_birth,
    gender: om.gender,
    state: om.address?.state,
    status: om.status,
  }
}

function toCanonicalPrescription(rx: OptiMantraPrescription): CanonicalPrescription {
  return {
    id: rx.id,
    patientId: rx.patient_id,
    prescriberId: rx.prescriber_id,
    drugName: rx.drug_name,
    drugNdc: rx.drug_ndc,
    quantity: rx.quantity,
    refills: rx.refills,
    directions: rx.directions,
    deaSchedule: rx.dea_schedule,
    isCompounded: rx.is_compounded,
    prescribedAt: rx.prescribed_at,
    status: rx.status,
  }
}

function toCanonicalLabResult(lab: OptiMantraLabResult): CanonicalLabResult {
  return {
    id: lab.id,
    patientId: lab.patient_id,
    testName: lab.test_name,
    resultValue: lab.result_value,
    resultUnit: lab.result_unit,
    referenceRange: lab.reference_range,
    abnormalFlag: lab.abnormal_flag,
    collectedAt: lab.collected_at,
    resultedAt: lab.resulted_at,
  }
}

export class OptiMantraEHRAdapter implements EHRAdapter {
  async getPatientByLocalId(localPatientId: string): Promise<CanonicalPatient | null> {
    const ehrId = await getEHRIdForLocalPatient(localPatientId, 'optimantra')
    if (!ehrId) return null
    const patient = await optiMantra.getPatient(ehrId)
    return toCanonicalPatient(patient, localPatientId)
  }

  async getPatientByEHRId(ehrPatientId: string): Promise<CanonicalPatient | null> {
    const patient = await optiMantra.getPatient(ehrPatientId)
    return toCanonicalPatient(patient)
  }

  async getPatientByEmail(email: string): Promise<CanonicalPatient | null> {
    const patient = await optiMantra.findPatientByEmail(email)
    return patient ? toCanonicalPatient(patient) : null
  }

  async linkPatient(localPatientId: string, ehrPatientId: string): Promise<void> {
    await linkPatientToEHR(localPatientId, 'optimantra', ehrPatientId)
    logAudit({
      userId: 'system', userName: 'EHR', userRole: 'super_admin',
      action: 'patient_linked_to_ehr', resourceType: 'ehr_patient_mappings',
      resourceId: localPatientId, details: { ehrPatientId, provider: 'optimantra' },
    })
  }

  async getPrescriptionsForPatient(localPatientId: string): Promise<CanonicalPrescription[]> {
    const ehrId = await getEHRIdForLocalPatient(localPatientId, 'optimantra')
    if (!ehrId) return []
    const prescriptions = await optiMantra.getPrescriptions(ehrId)
    return prescriptions.map(toCanonicalPrescription)
  }

  async getLabResultsForPatient(localPatientId: string): Promise<CanonicalLabResult[]> {
    const ehrId = await getEHRIdForLocalPatient(localPatientId, 'optimantra')
    if (!ehrId) return []
    const labs = await optiMantra.getLabResults(ehrId)
    return labs.map(toCanonicalLabResult)
  }

  async pushSignedConsentPDF(
    localPatientId: string,
    consentId: string,
    pdfBuffer: Buffer,
    metadata: ConsentDocumentMetadata,
  ): Promise<{ ehrDocumentId: string }> {
    const ehrId = await getEHRIdForLocalPatient(localPatientId, 'optimantra')
    if (!ehrId) {
      throw new Error(`No OptiMantra mapping for local patient ${localPatientId}`)
    }

    const doc = await optiMantra.uploadDocument(ehrId, pdfBuffer, {
      document_type: 'signed_consent',
      file_name: `consent_${consentId}.pdf`,
      mime_type: 'application/pdf',
      description: `${metadata.consentType} v${metadata.consentVersion} signed by ${metadata.patientName} at ${metadata.signedAt}`,
    })

    logAudit({
      userId: 'system', userName: 'EHR', userRole: 'super_admin',
      action: 'consent_pushed_to_ehr', resourceType: 'signed_consents',
      resourceId: consentId, details: { ehrDocumentId: doc.id, ehrPatientId: ehrId },
    })

    return { ehrDocumentId: doc.id }
  }
}
