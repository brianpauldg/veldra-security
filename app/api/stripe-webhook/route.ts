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
  const sig = request.headers.get('stripe-signature') || ''
  const body = await request.arrayBuffer()
  const buf = Buffer.from(body)
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const email = (session.customer_details?.email || session.customer_email || '').toString().toLowerCase()
      const customerId = session.customer as string

      if (!email) {
        console.warn('checkout.session.completed without email — skipping')
      } else {
        // Upsert profile with stripe_customer_id
        const { error } = await supabaseAdmin.from('profiles').upsert(
          { email, stripe_customer_id: customerId },
          { onConflict: 'email' }
        )
        if (error) console.error('Failed to upsert profile after checkout:', error)
      }
    }
  } catch (err) {
    console.error('Error processing webhook event:', err)
    return NextResponse.json({ received: true })
  }

  return NextResponse.json({ received: true })
}
