/**
 * POST /api/cron/sequences — Process due email sequence steps
 * Called by Vercel Cron every 15 minutes.
 */

import { NextResponse } from 'next/server'
import { getDueEnrollments } from '@/lib/email/sequence-engine'
import { logAudit } from '@/lib/clinic/audit'

export async function POST(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const due = getDueEnrollments()

  let processed = 0
  for (const enrollment of due) {
    // In production: look up sequence definition, send template email, advance step
    processed++
  }

  logAudit({
    userId: 'system', userName: 'Cron', userRole: 'super_admin',
    action: 'sequences_processed', resourceType: 'sequence_enrollments',
    resourceId: 'cron', details: { due: due.length, processed },
  })

  return NextResponse.json({ ok: true, due: due.length, processed })
}
