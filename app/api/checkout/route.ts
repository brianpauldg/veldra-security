import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { consultationSchema } from '@/lib/types'
import { trackEvent } from '@/lib/events'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = consultationSchema.parse(body)

    const priceId = process.env.STRIPE_CONSULTATION_PRICE_ID

    if (!priceId || !process.env.STRIPE_SECRET_KEY) {
      // Demo mode: redirect to booking page directly
      trackEvent('checkout_completed', {
        email: data.email,
        service: data.serviceInterest,
        mode: 'demo',
      })

      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/booking?session=demo&email=${encodeURIComponent(data.email)}`,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: data.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        serviceInterest: data.serviceInterest,
        goals: data.goals,
      },
    })

    trackEvent('checkout_initiated', {
      email: data.email,
      service: data.serviceInterest,
      stripeSessionId: session.id,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
