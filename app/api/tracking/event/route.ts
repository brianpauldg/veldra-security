/**
 * POST /api/tracking/event — Record a conversion event
 */

import { NextResponse } from 'next/server'
import { trackEvent } from '@/lib/acquisition/tracking'
import { parseUTM } from '@/lib/acquisition/utm'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event_type, session_id, lead_id, patient_id, event_data, url } = body

    if (!event_type) {
      return NextResponse.json({ error: 'event_type required' }, { status: 400 })
    }

    // Extract UTM from URL if provided
    const utm = url ? parseUTM(url) : {}

    await trackEvent({
      event_type,
      session_id,
      lead_id,
      patient_id,
      event_data,
      source: utm.source,
      medium: utm.medium,
      campaign: utm.campaign,
      content: utm.content,
      term: utm.term,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
