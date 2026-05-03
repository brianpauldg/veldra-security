/**
 * POST /api/referrals/track — Record a referral conversion
 * Called when a referred lead completes their first payment.
 */

import { NextResponse } from 'next/server'
import { lookupByCode } from '@/lib/referrals/codes'
import { issueCredit, canIssueReferrerCredit, REFERRER_CREDIT_CENTS, REFEREE_CREDIT_CENTS } from '@/lib/referrals/credits'
import { logAudit } from '@/lib/clinic/audit'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { referral_code, referee_patient_id, referral_id } = body

    if (!referral_code || !referee_patient_id) {
      return NextResponse.json({ error: 'referral_code and referee_patient_id required' }, { status: 400 })
    }

    const referrer = lookupByCode(referral_code)
    if (!referrer) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 })
    }

    const rid = referral_id || `ref_${Date.now()}`

    // Issue referee credit
    const refereeCredit = issueCredit(referee_patient_id, rid, REFEREE_CREDIT_CENTS)

    // Issue referrer credit if under annual cap
    let referrerCredit = null
    if (canIssueReferrerCredit(referrer.patient_id)) {
      referrerCredit = issueCredit(referrer.patient_id, rid, REFERRER_CREDIT_CENTS)
    }

    logAudit({
      userId: 'system', userName: 'Referrals', userRole: 'super_admin',
      action: 'referral_converted', resourceType: 'referrals',
      resourceId: rid, details: { referrer_id: referrer.patient_id, referee_id: referee_patient_id },
    })

    return NextResponse.json({
      ok: true,
      referee_credit: refereeCredit,
      referrer_credit: referrerCredit,
      referrer_capped: !referrerCredit,
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
