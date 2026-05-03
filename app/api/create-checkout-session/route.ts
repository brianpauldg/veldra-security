// app/api/create-checkout-session/route.ts
// Bloom Metabolics — Stripe Checkout for consultation + treatment programs
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'

// Maps tier IDs from lib/pricing.ts to Stripe Price IDs
const PRICE_MAP: Record<string, { envKey: string; mode: 'payment' | 'subscription' }> = {
  consultation: { envKey: 'STRIPE_PRICE_CONSULTATION', mode: 'payment' },
  trt:          { envKey: 'STRIPE_PRICE_TRT',          mode: 'subscription' },
  glp1:         { envKey: 'STRIPE_PRICE_GLP1',         mode: 'subscription' },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = (body?.email || '').toString().trim().toLowerCase()
    const tier  = (body?.tier  || 'consultation').toString().trim().toLowerCase()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const config = PRICE_MAP[tier]
    if (!config) {
      return NextResponse.json({ error: `Invalid tier: ${tier}` }, { status: 400 })
    }

    const priceId = process.env[config.envKey]
    if (!priceId || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: `Stripe not configured. Set ${config.envKey} in environment variables.` },
        { status: 500 }
      )
    }

    // Find or create Stripe customer
    const existing = await stripe.customers.list({ email, limit: 1 })
    const customer = existing.data.length > 0
      ? existing.data[0]
      : await stripe.customers.create({ email })

    const session = await stripe.checkout.sessions.create({
      mode: config.mode,
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: config.mode === 'payment'
        ? `${BASE_URL}/booking?session={CHECKOUT_SESSION_ID}`
        : `${BASE_URL}/success?session={CHECKOUT_SESSION_ID}&tier=${tier}`,
      cancel_url: `${BASE_URL}/book`,
      metadata: {
        tier,
        signup_email: email,
        firstName: body?.firstName || '',
        lastName: body?.lastName || '',
        phone: body?.phone || '',
        serviceInterest: body?.serviceInterest || '',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('create-checkout-session error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
