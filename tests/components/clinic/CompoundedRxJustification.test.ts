import { describe, it, expect } from 'vitest'
import { validateClinicalRationale, validateJustificationInput } from '@/lib/clinic/validation/justification-validator'
import { COMPOUNDABLE_DRUGS, requiresJustification } from '@/config/clinical/compoundable-drugs'

describe('CompoundedRxJustification form logic', () => {
  const validRationale = 'Patient has documented PEG hypersensitivity confirmed via skin prick test 2024-08-15. FDA-approved formulation contains polyethylene glycol. Compounded preparation excluding PEG is medically necessary.'

  it('renders all required fields — drug options exist', () => {
    expect(COMPOUNDABLE_DRUGS.length).toBeGreaterThanOrEqual(2)
    expect(COMPOUNDABLE_DRUGS[0].display_name).toContain('Semaglutide')
    expect(COMPOUNDABLE_DRUGS[1].display_name).toContain('Tirzepatide')
  })

  it('submit disabled with empty rationale', () => {
    const r = validateClinicalRationale('')
    expect(r.valid).toBe(false)
  })

  it('submit disabled with rationale < 100 chars', () => {
    const r = validateClinicalRationale('A'.repeat(99))
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('100 characters')
  })

  it('live denylist warning appears when "cost" typed', () => {
    const r = validateClinicalRationale('cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost')
    expect(r.valid).toBe(false)
    expect(r.offending_phrases).toContain('cost')
  })

  it('live denylist warning clears with substantive medical content', () => {
    const r = validateClinicalRationale(validRationale)
    expect(r.valid).toBe(true)
    expect(r.offending_phrases).toBeUndefined()
  })

  it('conditional fields — deviation categories require justification', () => {
    const r = validateJustificationInput({
      patient_id: 'pat-1', drug: 'compounded_semaglutide',
      deviation_categories: [], // empty
      clinical_rationale: validRationale,
      prescriber_id: 'doc-1', prescriber_npi: '1234567890', prescriber_signature: 'sig',
    })
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('deviation category')
  })

  it('signature required — missing signature fails validation', () => {
    const r = validateJustificationInput({
      patient_id: 'pat-1', drug: 'compounded_semaglutide',
      deviation_categories: ['allergy'],
      clinical_rationale: validRationale,
      prescriber_id: 'doc-1', prescriber_npi: '1234567890', prescriber_signature: '',
    })
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('signature')
  })

  it('successful validation with correct payload', () => {
    const r = validateJustificationInput({
      patient_id: 'pat-1', drug: 'compounded_semaglutide',
      deviation_categories: ['allergy'],
      clinical_rationale: validRationale,
      prescriber_id: 'doc-1', prescriber_npi: '1234567890', prescriber_signature: 'data:image/png;base64,test',
    })
    expect(r.valid).toBe(true)
  })
})
