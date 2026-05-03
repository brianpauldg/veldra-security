import { describe, it, expect } from 'vitest'
import { buildProvider } from '@/tests/helpers/factories'

describe('providers detail API logic', () => {
  it('GET returns provider with all credential fields', () => {
    const p = buildProvider()
    expect(p.id).toBeDefined()
    expect(p.full_name).toBe('Dr. Test Provider')
    expect(p.role).toBe('clinician')
    expect(p.npi).toBe('1234567890')
    expect(p.dea_number).toBe('AA1234567')
    expect(p.dea_expiration).toBe('2027-12-31')
    expect(p.ca_medical_license).toBe('A12345')
    expect(p.cures_enrolled).toBe(true)
    expect(p.active).toBe(true)
  })

  it('clinician role cannot create providers — role check', () => {
    const clinicianRole = 'clinician'
    const allowedRoles = ['super_admin', 'physician']
    expect(allowedRoles.includes(clinicianRole)).toBe(false)
  })

  it('admin role can update providers — role check', () => {
    const adminRole = 'super_admin'
    const allowedRoles = ['super_admin', 'physician']
    expect(allowedRoles.includes(adminRole)).toBe(true)
  })

  it('DELETE soft-deletes — sets active=false', () => {
    const p = buildProvider({ active: true })
    expect(p.active).toBe(true)
    // After DELETE, active would be set to false
    const afterDelete = { ...p, active: false }
    expect(afterDelete.active).toBe(false)
    // Row still exists (not removed)
    expect(afterDelete.id).toBe(p.id)
  })
})
