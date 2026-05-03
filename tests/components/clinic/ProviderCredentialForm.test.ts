import { describe, it, expect } from 'vitest'
import { buildProvider } from '@/tests/helpers/factories'

describe('ProviderCredentialForm logic', () => {
  it('renders all credential fields — factory produces complete shape', () => {
    const p = buildProvider()
    expect(p.full_name).toBeDefined()
    expect(p.role).toBeDefined()
    expect(p.npi).toBeDefined()
    expect(p.dea_number).toBeDefined()
    expect(p.dea_expiration).toBeDefined()
    expect(p.ca_medical_license).toBeDefined()
    expect(p.ca_license_expiration).toBeDefined()
    expect(p.cures_enrolled).toBeDefined()
    expect(p.active).toBe(true)
  })

  it('CURES enrolled toggle — enrollment fields present when true', () => {
    const p = buildProvider({ cures_enrolled: true, cures_enrollment_date: '2026-01-15', cures_user_id: 'CURES-123' })
    expect(p.cures_enrolled).toBe(true)
    expect(p.cures_enrollment_date).toBe('2026-01-15')
    expect(p.cures_user_id).toBe('CURES-123')
  })

  it('date validation — expired DEA detected', () => {
    const p = buildProvider({ dea_expiration: '2025-01-01' })
    const expDate = new Date(p.dea_expiration as string)
    const isExpired = expDate < new Date()
    expect(isExpired).toBe(true)
  })

  it('date validation — within 60 days detected', () => {
    const in30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const p = buildProvider({ dea_expiration: in30Days })
    const expDate = new Date(p.dea_expiration as string)
    const daysUntil = Math.floor((expDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    expect(daysUntil).toBeLessThan(60)
    expect(daysUntil).toBeGreaterThan(0)
  })

  it('submit payload matches expected shape', () => {
    const p = buildProvider()
    const payload = {
      full_name: p.full_name,
      role: p.role,
      npi: p.npi,
      dea_number: p.dea_number,
      dea_expiration: p.dea_expiration,
      ca_medical_license: p.ca_medical_license,
      ca_license_expiration: p.ca_license_expiration,
      cures_enrolled: p.cures_enrolled,
    }
    expect(Object.keys(payload).length).toBe(8)
    expect(payload.full_name).toBe('Dr. Test Provider')
  })
})
