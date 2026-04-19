// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
})

const PRICE_MAP: Record<string, string> = {
    starter: process.env.STRIPE_PRICE_STARTER || '',
    growth:  process.env.STRIPE_PRICE_GROWTH  || '',
    pro:     process.env.STRIPE_PRICE_PRO     || '',
}

export async function POST(request: NextRequest) {
    const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.SUPABASE_SERVICE_ROLE_KEY || ''
        )
    try {
          const body = await request.json()
          const email = (body?.email || '').toString().trim().toLowerCase()
          const plan  = (body?.plan  || 'starter').toString().trim().toLowerCase()

      if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

      // Check if user exists via auth.users (email lives there, not in profiles)
      const { data: authData } = await supabaseAdmin.auth.admin.listUsers()
          const existingUser = authData?.users?.find((u: any) => u.email === email)
          if (existingUser) {
                  return NextResponse.json({ existing: true, redirect: '/dashboard' })
          }

      // New user — create Stripe customer and Checkout session
      let customer: Stripe.Customer | null = null
          const existingCustomers = await stripe.customers.list({ email, limit: 1 })
          if (existingCustomers.data.length > 0) customer = existingCustomers.data[0]
          else customer = await stripe.customers.create({ email })

      const priceId = PRICE_MAP[plan] || PRICE_MAP['starter']
          if (!priceId) return NextResponse.json(
            { error: 'Missing Stripe price ID. Add STRIPE_PRICE_STARTER/GROWTH/PRO to env vars.' },
            { status: 500 }
                )

      const session = await stripe.checkout.sessions.create({
              mode: 'subscription',
              customer: customer.id,
              line_items: [{ price: priceId, quantity: 1 }],
              payment_method_types: ['card'],
              allow_promotion_codes: true,
              subscription_data: {
                        trial_period_days: 30,
                        metadata: { signup_email: email, plan },
              },
              success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.bloommetabolics.io'}/signup?checkout=complete&session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
              cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.bloommetabolics.io'}/signup?checkout=cancelled`,
      })

      return NextResponse.json({ existing: false, url: session.url })
    } catch (err) {
          console.error('create-checkout-session error:', err)
          return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
