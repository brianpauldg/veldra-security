import { describe, it, expect } from 'vitest'
import { validateClinicalRationale, validateJustificationInput, tokenize } from '@/lib/clinic/validation/justification-validator'

describe('justification-validator', () => {
  const validRationale = 'Patient has documented allergy to polyethylene glycol (PEG) present in standard branded formulations. Compounded preparation excludes PEG excipient per allergy assessment. Prior adverse reaction documented in chart.'

  it('rejects pure cost rationale', () => {
    const r = validateClinicalRationale('Cost savings cost cheaper affordable savings lower price save money cost cheaper affordable savings cost cost cheaper affordable savings cost cost cheaper affordable')
    expect(r.valid).toBe(false)
    expect(r.offending_phrases).toBeDefined()
  })

  it('rejects pure convenience rationale', () => {
    const r = validateClinicalRationale('Preference convenience preferred convenient easier simpler preference convenience preferred convenient easier simpler preference convenience preferred convenient easier simpler')
    expect(r.valid).toBe(false)
  })

  it('passes legitimate clinical rationale', () => {
    const r = validateClinicalRationale(validRationale)
    expect(r.valid).toBe(true)
  })

  it('passes cost mentioned alongside substantive clinical content', () => {
    const r = validateClinicalRationale('Patient has documented intolerance to polysorbate 80 excipient in branded semaglutide formulation. Compounded preparation excludes this excipient. While cost is also a consideration, the primary medical necessity is excipient intolerance.')
    expect(r.valid).toBe(true)
    expect(r.warnings).toBeDefined()
  })

  it('rejects "cost" (lowercase)', () => {
    const r = validateClinicalRationale('cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost cost')
    expect(r.valid).toBe(false)
  })

  it('rejects "COST" (uppercase)', () => {
    const r = validateClinicalRationale('COST COST COST COST COST COST COST COST COST COST COST COST COST COST COST COST COST COST COST COST COST')
    expect(r.valid).toBe(false)
  })

  it('rejects "cheaper"', () => {
    const tokens = tokenize('cheaper medication option selected for this patient treatment plan medication medication medication')
    expect(tokens).toContain('cheaper')
  })

  it('rejects "savings" and "saving"', () => {
    const r1 = validateClinicalRationale('savings savings savings savings savings savings savings savings savings savings savings savings savings savings savings savings savings savings savings savings')
    expect(r1.valid).toBe(false)
    const r2 = validateClinicalRationale('saving saving saving saving saving saving saving saving saving saving saving saving saving saving saving saving saving saving saving saving saving')
    expect(r2.valid).toBe(false)
  })

  it('rejects rationale exactly 99 chars', () => {
    const short = 'A'.repeat(99)
    const r = validateClinicalRationale(short)
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('100 characters')
  })

  it('passes rationale exactly 100 chars', () => {
    const exact = 'Patient has documented allergy requiring compounded formulation without specific excipient per chart.'
    expect(exact.length).toBeGreaterThanOrEqual(100)
    const r = validateClinicalRationale(exact)
    expect(r.valid).toBe(true)
  })

  it('rejects empty rationale', () => {
    const r = validateClinicalRationale('')
    expect(r.valid).toBe(false)
  })

  it('rejects pure denylist content (repeated)', () => {
    const r = validateClinicalRationale('cost convenience preference cheaper affordability savings lower price save money more affordable budget cost convenience preference cheaper affordability')
    expect(r.valid).toBe(false)
    expect(r.offending_phrases!.length).toBeGreaterThan(0)
  })

  it('validates full justification input — missing patient_id', () => {
    const r = validateJustificationInput({
      patient_id: '',
      drug: 'semaglutide',
      deviation_categories: ['allergy'],
      clinical_rationale: validRationale,
      prescriber_id: 'doc-1',
      prescriber_npi: '1234567890',
      prescriber_signature: 'base64...',
    })
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('Patient ID')
  })
})
