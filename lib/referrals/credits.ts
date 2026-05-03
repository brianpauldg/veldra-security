/**
 * Bloom Metabolics — Referral Credits
 */

import { logAudit } from '@/lib/clinic/audit'

const REFERRER_CREDIT_CENTS = 5000 // $50
const REFEREE_CREDIT_CENTS = 5000 // $50
const MAX_ANNUAL_REFERRER_CREDIT_CENTS = 30000 // $300
const CREDIT_EXPIRY_MONTHS = 12

export interface ReferralCredit {
  id: string
  patient_id: string
  referral_id: string
  amount_cents: number
  status: 'pending' | 'available' | 'applied' | 'expired'
  expires_at: string
}

const creditStore: ReferralCredit[] = []
let creditCounter = 0

export function issueCredit(patientId: string, referralId: string, amountCents: number): ReferralCredit {
  const credit: ReferralCredit = {
    id: `cred_${++creditCounter}`,
    patient_id: patientId,
    referral_id: referralId,
    amount_cents: amountCents,
    status: 'available',
    expires_at: new Date(Date.now() + CREDIT_EXPIRY_MONTHS * 30 * 24 * 3600 * 1000).toISOString(),
  }
  creditStore.push(credit)

  logAudit({
    userId: 'system', userName: 'Referrals', userRole: 'super_admin',
    action: 'referral_credit_issued', resourceType: 'referral_credits',
    resourceId: credit.id, details: { amount_cents: amountCents },
  })

  return credit
}

export function getAvailableCredits(patientId: string): ReferralCredit[] {
  return creditStore.filter(c => c.patient_id === patientId && c.status === 'available' && new Date(c.expires_at) > new Date())
}

export function getAnnualReferrerTotal(patientId: string): number {
  const yearAgo = new Date(Date.now() - 365 * 24 * 3600 * 1000)
  return creditStore.filter(c => c.patient_id === patientId && new Date(c.expires_at) > yearAgo).reduce((sum, c) => sum + c.amount_cents, 0)
}

export function canIssueReferrerCredit(patientId: string): boolean {
  return getAnnualReferrerTotal(patientId) + REFERRER_CREDIT_CENTS <= MAX_ANNUAL_REFERRER_CREDIT_CENTS
}

export function applyCredit(creditId: string, invoiceId: string): boolean {
  const credit = creditStore.find(c => c.id === creditId && c.status === 'available')
  if (!credit || new Date(credit.expires_at) < new Date()) return false
  credit.status = 'applied'
  return true
}

export { REFERRER_CREDIT_CENTS, REFEREE_CREDIT_CENTS, MAX_ANNUAL_REFERRER_CREDIT_CENTS }
