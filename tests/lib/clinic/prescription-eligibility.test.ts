import { describe, it, expect } from 'vitest'
import { getTRTEligibility, getCompoundedGLP1Eligibility } from '@/lib/clinic/prescription-eligibility'
import type { Provider } from '@/lib/clinic/types/compliance'

const validProvider: Provider = {
  id: 'prov-1', full_name: 'Dr. Test', role: 'clinician',
  cures_enrolled: true, dea_number: 'AA1234567',
  dea_expiration: '2027-12-31', ca_medical_license: 'A12345',
  ca_license_expiration: '2027-12-31', active: true,
  created_at: '2026-01-01', updated_at: '2026-01-01',
}

function daysAgo(n: number): string {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString()
}

describe('TRT eligibility (CURES gate)', () => {
  it('provider not cures_enrolled returns BLOCKED', () => {
    const r = getTRTEligibility({ ...validProvider, cures_enrolled: false }, null)
    expect(r.status).toBe('BLOCKED_PROVIDER_INELIGIBLE')
    expect(r.reason).toContain('CURES')
  })

  it('provider with expired DEA returns BLOCKED', () => {
    const r = getTRTEligibility({ ...validProvider, dea_expiration: '2025-01-01' }, null)
    expect(r.status).toBe('BLOCKED_PROVIDER_INELIGIBLE')
    expect(r.reason).toContain('DEA')
  })

  it('provider with expired CA license returns BLOCKED', () => {
    const r = getTRTEligibility({ ...validProvider, ca_license_expiration: '2025-01-01' }, null)
    expect(r.status).toBe('BLOCKED_PROVIDER_INELIGIBLE')
  })

  it('no prior PMP query returns REQUIRES_FIRST_QUERY', () => {
    const r = getTRTEligibility(validProvider, null)
    expect(r.status).toBe('REQUIRES_FIRST_QUERY')
  })

  it('query 50 days ago returns ELIGIBLE', () => {
    const r = getTRTEligibility(validProvider, daysAgo(50))
    expect(r.status).toBe('ELIGIBLE')
    expect(r.days_since_query).toBeCloseTo(50, 0)
  })

  it('query exactly 119 days ago returns ELIGIBLE', () => {
    const r = getTRTEligibility(validProvider, daysAgo(119))
    expect(r.status).toBe('ELIGIBLE')
  })

  it('query 130 days ago returns REQUIRES_REFRESH', () => {
    const r = getTRTEligibility(validProvider, daysAgo(130))
    expect(r.status).toBe('REQUIRES_REFRESH')
  })

  it('outage attested returns BLOCKED_OVERRIDE_REQUIRED', () => {
    const r = getTRTEligibility(validProvider, daysAgo(10), true)
    expect(r.status).toBe('BLOCKED_OVERRIDE_REQUIRED')
  })
})

describe('GLP-1 eligibility (justification gate)', () => {
  it('no prior justification returns REQUIRES_JUSTIFICATION', () => {
    const r = getCompoundedGLP1Eligibility(null, null)
    expect(r.status).toBe('REQUIRES_JUSTIFICATION')
  })

  it('signed justification 30 days ago returns ELIGIBLE', () => {
    const r = getCompoundedGLP1Eligibility(daysAgo(30), 'signed')
    expect(r.status).toBe('ELIGIBLE')
  })

  it('signed justification 100 days ago returns REQUIRES_JUSTIFICATION', () => {
    const r = getCompoundedGLP1Eligibility(daysAgo(100), 'signed')
    expect(r.status).toBe('REQUIRES_JUSTIFICATION')
  })

  it('draft justification returns REQUIRES_JUSTIFICATION', () => {
    const r = getCompoundedGLP1Eligibility(daysAgo(10), 'draft')
    expect(r.status).toBe('REQUIRES_JUSTIFICATION')
  })
})
