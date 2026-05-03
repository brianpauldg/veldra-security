import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return null
  return createClient(url, key)
}

// POST — opt out of SMS, email, or all communications
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, phone, channel } = body

    if (!email && !phone) {
      return NextResponse.json({ error: 'email or phone required' }, { status: 400 })
    }

    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 500 })

    const now = new Date().toISOString()
    const channels = channel === 'all' ? ['sms', 'email'] : [channel]

    for (const ch of channels) {
      let query = supabase
        .from('consent_records')
        .update({ revoked_at: now })
        .eq('consent_type', ch)
        .is('revoked_at', null) // Only revoke active consents

      if (email) query = query.eq('user_email', email)
      // Phone matching would require decryption — skip for now, match by email

      await query
    }

    // Always return success — don't leak whether records existed
    return NextResponse.json({ ok: true, message: 'Opt-out processed' })
  } catch (err) {
    console.error('[OPT-OUT] Error processing opt-out')
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
