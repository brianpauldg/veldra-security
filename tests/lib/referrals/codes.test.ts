import { describe, it, expect } from 'vitest'
import { generateReferralCode, lookupByCode, isCodeActive } from '@/lib/referrals/codes'

describe('referral codes', () => {
  it('generates an 8-char alphanumeric code', () => {
    const code = generateReferralCode('patient_1')
    expect(code).toHaveLength(8)
    expect(/^[A-F0-9]{8}$/.test(code)).toBe(true)
  })

  it('returns the same code for the same patient', () => {
    const code1 = generateReferralCode('patient_codes_1')
    const code2 = generateReferralCode('patient_codes_1')
    expect(code1).toBe(code2)
  })

  it('looks up a patient by code', () => {
    const code = generateReferralCode('patient_lookup_1')
    const result = lookupByCode(code)
    expect(result).not.toBeNull()
    expect(result!.patient_id).toBe('patient_lookup_1')
  })

  it('lookup is case-insensitive', () => {
    const code = generateReferralCode('patient_case_1')
    const result = lookupByCode(code.toLowerCase())
    expect(result).not.toBeNull()
  })

  it('returns null for unknown code', () => {
    expect(lookupByCode('ZZZZZZZZ')).toBeNull()
  })

  it('isCodeActive returns true for existing codes', () => {
    const code = generateReferralCode('patient_active_1')
    expect(isCodeActive(code)).toBe(true)
  })
})
