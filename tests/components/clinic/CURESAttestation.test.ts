import { describe, it, expect } from 'vitest'
import { validatePMPInput, requiresMedDirectorReview } from '@/lib/clinic/validation/pmp-validator'
import type { PMPQueryInput } from '@/lib/clinic/types/compliance'

const emptyFindings = {
  multiple_prescribers: false, multiple_pharmacies: false,
  overlapping_testosterone_rx: false, concurrent_benzo_or_opioid: false,
  recent_er_substance: false, recent_decline_elsewhere: false,
}

const base: PMPQueryInput = {
  patient_id: 'pat-1', prescriber_id: 'doc-1', prescriber_dea: 'AA1234567',
  query_datetime: new Date().toISOString(), query_method: 'manual_portal',
  risk_stratification: 'low', findings_checklist: emptyFindings,
  attestation_signature: 'sig',
}

describe('CURESAttestation form logic', () => {
  it('all fields valid — passes', () => {
    expect(validatePMPInput(base).valid).toBe(true)
  })

  it('findings checked reveals judgment requirement — empty judgment fails', () => {
    const r = validatePMPInput({
      ...base, findings_checklist: { ...emptyFindings, multiple_prescribers: true },
      clinical_judgment_text: '',
    })
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('Clinical judgment')
  })

  it('judgment present but < 50 chars fails', () => {
    const r = validatePMPInput({
      ...base, findings_checklist: { ...emptyFindings, multiple_prescribers: true },
      clinical_judgment_text: 'Too short.',
    })
    expect(r.valid).toBe(false)
  })

  it('dosespot_pmp requires query_reference', () => {
    const r = validatePMPInput({ ...base, query_method: 'dosespot_pmp' })
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('query reference')
  })

  it('manual_portal allows null query_reference', () => {
    const r = validatePMPInput({ ...base, query_method: 'manual_portal' })
    expect(r.valid).toBe(true)
  })

  it('outage attested reveals required outage_details', () => {
    const r = validatePMPInput({ ...base, outage_attested: true, outage_details: '' })
    expect(r.valid).toBe(false)
    expect(r.reason).toContain('Outage details')
  })

  it('outage with details passes', () => {
    const r = validatePMPInput({ ...base, outage_attested: true, outage_details: 'CURES portal returned 503 at 10:15 AM PT.' })
    expect(r.valid).toBe(true)
  })

  it('successful submit produces valid payload shape', () => {
    const input: PMPQueryInput = {
      ...base, query_method: 'dosespot_pmp', query_reference: 'DS-12345',
      risk_stratification: 'moderate',
      findings_checklist: { ...emptyFindings, overlapping_testosterone_rx: true },
      clinical_judgment_text: 'Patient reports switching providers recently due to relocation. Verified via chart records. No diversion concern.',
    }
    const r = validatePMPInput(input)
    expect(r.valid).toBe(true)
    expect(input.query_reference).toBe('DS-12345')
    expect(input.findings_checklist.overlapping_testosterone_rx).toBe(true)
  })
})
