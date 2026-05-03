import { describe, it, expect } from 'vitest'
import { issueCredit, getAvailableCredits, canIssueReferrerCredit, applyCredit } from '@/lib/referrals/credits'

describe('referral credits', () => {
  it('issues a credit with available status', () => {
    const credit = issueCredit('patient_cr_1', 'ref_1', 5000)
    expect(credit.status).toBe('available')
    expect(credit.amount_cents).toBe(5000)
    expect(credit.patient_id).toBe('patient_cr_1')
  })

  it('retrieves available credits for a patient', () => {
    issueCredit('patient_cr_2', 'ref_2', 5000)
    const credits = getAvailableCredits('patient_cr_2')
    expect(credits.length).toBeGreaterThanOrEqual(1)
    expect(credits[0].status).toBe('available')
  })

  it('applies a credit successfully', () => {
    const credit = issueCredit('patient_cr_3', 'ref_3', 5000)
    const result = applyCredit(credit.id, 'inv_1')
    expect(result).toBe(true)
  })

  it('cannot apply a credit twice', () => {
    const credit = issueCredit('patient_cr_4', 'ref_4', 5000)
    applyCredit(credit.id, 'inv_1')
    const result = applyCredit(credit.id, 'inv_2')
    expect(result).toBe(false)
  })

  it('enforces annual cap on referrer credits', () => {
    const pid = 'patient_cap_test'
    // Issue 6 credits of $50 = $300 (at cap)
    for (let i = 0; i < 6; i++) {
      issueCredit(pid, `ref_cap_${i}`, 5000)
    }
    expect(canIssueReferrerCredit(pid)).toBe(false)
  })
})
