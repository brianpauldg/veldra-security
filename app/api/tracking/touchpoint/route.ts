/**
 * POST /api/tracking/touchpoint — Record a session touchpoint
 */

import { NextResponse } from 'next/server'
import { recordTouchpoint } from '@/lib/acquisition/tracking'
import { parseUTM } from '@/lib/acquisition/utm'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { session_id, url, referrer } = body

    if (!session_id) {
      return NextResponse.json({ error: 'session_id required' }, { status: 400 })
    }

    const utm = url ? parseUTM(url) : {}

    await recordTouchpoint(session_id, {
      source: utm.source,
      medium: utm.medium,
      campaign: utm.campaign,
      content: utm.content,
      term: utm.term,
      landing_page: url,
      at: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
