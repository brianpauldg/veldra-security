/**
 * Bloom Metabolics — Referral Program Policy
 * <!-- REQUIRES BRIAN'S APPROVAL on amounts before launch -->
 */

export const REFERRAL_POLICY = {
  referrer_credit_cents: 5000, // $50 to referrer
  referee_credit_cents: 5000, // $50 to referee on first month
  max_annual_referrer_credit_cents: 30000, // $300 max per year per referrer
  credit_expiry_months: 12,
  requires_first_payment: true, // Credit only issued after referee's first subscription payment
} as const
