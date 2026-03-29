import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
})

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const sessionId = url.searchParams.get('session_id')
    if (!sessionId) return NextResponse.json({ error: 'session_id required' }, { status: 400 })

    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['customer'] })
    const customer = session.customer as Stripe.Customer | null
    const email = (customer?.email || session.customer_details?.email || session.customer_email || '').toString().toLowerCase()

    if (!email) return NextResponse.json({ error: 'no email on session' }, { status: 400 })

    // Ensure profile exists or create it (fallback if webhook delayed)
    const { data: existing, error } = await supabaseAdmin.from('profiles').select('id').eq('email', email).limit(1)
    if (error) throw error

    if (!existing || existing.length === 0) {
      const { error: insertErr } = await supabaseAdmin.from('profiles').insert({ email, stripe_customer_id: customer?.id || null })
      if (insertErr) console.error('Failed to create profile after checkout verify:', insertErr)
    } else {
      // Update stripe_customer_id if missing
      const { error: updateErr } = await supabaseAdmin.from('profiles').update({ stripe_customer_id: customer?.id || null }).eq('email', email)
      if (updateErr) console.error('Failed to update profile stripe_customer_id:', updateErr)
    }

    return NextResponse.json({ success: true, email })
  } catch (err) {
    console.error('checkout-session-verify error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
