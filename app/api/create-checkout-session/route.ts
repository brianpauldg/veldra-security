// app/api/create-checkout-session/route.ts
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = (body?.email || '').toString().trim().toLowerCase()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    // Check if a profile already exists for this email
    const { data: profiles, error: profileErr } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', email)
      .limit(1)

    if (profileErr) throw profileErr

    if (profiles && profiles.length > 0) {
      // Existing user — instruct client to go to dashboard
      return NextResponse.json({ existing: true, redirect: '/dashboard' })
    }

    // New user — create Stripe customer and Checkout session
    let customer: Stripe.Customer | null = null
    const existingCustomers = await stripe.customers.list({ email, limit: 1 })
    if (existingCustomers.data.length > 0) customer = existingCustomers.data[0]
    else customer = await stripe.customers.create({ email })

    const priceId = process.env.STRIPE_PRICE_ID
    if (!priceId) return NextResponse.json({ error: 'Missing STRIPE_PRICE_ID env var' }, { status: 500 })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      subscription_data: {
        // Optionally set trial days via env var
        trial_period_days: process.env.STRIPE_TRIAL_DAYS ? parseInt(process.env.STRIPE_TRIAL_DAYS) : undefined,
        metadata: { signup_email: email },
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.veldra.io'}/signup?checkout=complete&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.veldra.io'}/signup?checkout=cancelled`,
    })

    return NextResponse.json({ existing: false, url: session.url })
  } catch (err) {
    console.error('create-checkout-session error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
