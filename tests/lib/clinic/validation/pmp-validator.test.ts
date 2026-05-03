import { describe, it, expect } from 'vitest'
import { validatePMPInput, requiresMedDirectorReview } from '@/lib/clinic/validation/pmp-validator'
import type { PMPQueryInput } from '@/lib/clinic/types/compliance'

const emptyChecklist = {
  multiple_prescribers: false, multiple_pharmacies: false,
  overlapping_testosterone_rx: false, concurrent_benzo_or_opioid: false,
  recent_er_substance: false, recent_decline_elsewhere: false,
}

const baseInput: PMPQueryInput = {
  patient_id: 'pat-1', prescriber_id: 'doc-1', prescriber_dea: 'AA1234567',
  query_datetime: new Date().toISOString(), query_method: 'manual_portal',
  risk_stratification: 'low', findings_checklist: emptyChecklist,
  attestation_signature: 'sig-data',
}

describe('pmp-validator', () => {
  it('empty findings + low risk passes', () => {
    const r = validatePMPInput(baseInput)
    expect(r.valid).toBe(true)
  })

  it('finding=true + empty clinical_judgment_text fails', () => {
    const r = validatePMPInput({
      ...baseInput,
      findings_checklist: { ...emptyChecklist, multiple_prescribers: true },
      clinical_judgment_text: '',
    })
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('Clinical judgment')
  })

  it('finding=true + short clinical_judgment_text fails', () => {
    const r = validatePMPInput({
      ...baseInput,
      findings_checklist: { ...emptyChecklist, multiple_prescribers: true },
      clinical_judgment_text: 'Too short text here.',
    })
    expect(r.valid).toBe(false)
  })

  it('dosespot_pmp + null query_reference fails', () => {
    const r = validatePMPInput({ ...baseInput, query_method: 'dosespot_pmp', query_reference: undefined })
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('query reference')
  })

  it('manual_portal + null query_reference passes', () => {
    const r = validatePMPInput({ ...baseInput, query_method: 'manual_portal', query_reference: undefined })
    expect(r.valid).toBe(true)
  })

  it('findings + risk=none raises warning', () => {
    const r = validatePMPInput({
      ...baseInput,
      risk_stratification: 'none',
      findings_checklist: { ...emptyChecklist, multiple_prescribers: true },
      clinical_judgment_text: 'Patient reports switching providers recently. Verified with patient and prior prescriber. No diversion concerns after review of records and clinical discussion.',
    })
    expect(r.valid).toBe(true)
    expect(r.warnings).toBeDefined()
    expect(r.warnings![0]).toContain('Risk stratification')
  })

  it('outage_attested=true + empty outage_details fails', () => {
    const r = validatePMPInput({ ...baseInput, outage_attested: true, outage_details: '' })
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('Outage details')
  })

  it('all fields valid passes', () => {
    const r = validatePMPInput({
      ...baseInput,
      query_method: 'dosespot_pmp',
      query_reference: 'DS-12345',
      risk_stratification: 'low',
    })
    expect(r.valid).toBe(true)
  })
})

describe('requiresMedDirectorReview', () => {
  it('high risk requires review', () => {
    expect(requiresMedDirectorReview({ ...baseInput, risk_stratification: 'high' })).toBe(true)
  })

  it('concurrent benzo requires review', () => {
    expect(requiresMedDirectorReview({
      ...baseInput,
      findings_checklist: { ...emptyChecklist, concurrent_benzo_or_opioid: true },
    })).toBe(true)
  })

  it('low risk with no findings does not require review', () => {
    expect(requiresMedDirectorReview(baseInput)).toBe(false)
  })
})
