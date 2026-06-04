import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// PRE-LAUNCH: Checkout disabled. All CTAs route to /join waitlist.
// Original Stripe checkout code preserved in git history for Corepay migration.

export async function POST() {
  return NextResponse.json(
    { error: 'Bloom Metabolics is in pre-launch. Enrollment opens July 15, 2026.', redirect: '/join' },
    { status: 503 }
  )
}
