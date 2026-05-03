import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const PRICE_MAP: Record<string, string> = {
  trt: process.env.STRIPE_PRICE_TRT || '',
  glp1: process.env.STRIPE_PRICE_GLP1 || '',
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return null
  return createClient(url, key)
}

// POST — Start subscription for approved patient
export async function POST(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const body = await req.json()
    const { action, patient_id } = body

    if (!patient_id) return NextResponse.json({ error: 'patient_id required' }, { status: 400 })

    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data: patient } = await supabase
      .from('patients')
      .select('*')
      .eq('id', patient_id)
      .maybeSingle()

    if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })

    switch (action) {
      // ── Activate subscription after physician approval ──
      case 'start_subscription': {
        const { treatment_type, apply_consultation_credit } = body
        const type = treatment_type || patient.treatment_type || 'trt'
        const priceId = PRICE_MAP[type]

        if (!priceId) {
          return NextResponse.json({ error: `No Stripe price configured for ${type}. Set STRIPE_PRICE_${type.toUpperCase()} env var.` }, { status: 500 })
        }

        // Find or create Stripe customer
        let customerId = patient.stripe_customer_id
        if (!customerId) {
          const existing = await stripe.customers.list({ email: patient.email, limit: 1 })
          if (existing.data.length > 0) {
            customerId = existing.data[0].id
          } else {
            const customer = await stripe.customers.create({
              email: patient.email,
              name: `${patient.first_name} ${patient.last_name}`,
              metadata: { bloom_patient_id: patient_id, treatment_type: type },
            })
            customerId = customer.id
          }
          await supabase.from('patients').update({ stripe_customer_id: customerId }).eq('id', patient_id)
        }

        // Check 7-day eligibility window for consultation credit
        const enrollmentDate = patient.enrollment_date || patient.created_at
        const daysSinceEnrollment = enrollmentDate
          ? Math.floor((Date.now() - new Date(enrollmentDate).getTime()) / (1000 * 60 * 60 * 24))
          : 999
        const withinCreditWindow = daysSinceEnrollment <= 7
        const shouldApplyCredit = apply_consultation_credit && withinCreditWindow

        const sessionParams: Stripe.Checkout.SessionCreateParams = {
          mode: 'subscription',
          customer: customerId,
          payment_method_types: ['card'],
          line_items: [{ price: priceId, quantity: 1 }],
          success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'}/success?subscription=active&tier=${type}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'}/book`,
          metadata: {
            bloom_patient_id: patient_id,
            treatment_type: type,
            session_type: 'subscription',
            consultation_credit_applied: shouldApplyCredit ? 'yes' : 'no',
            days_since_consultation: String(daysSinceEnrollment),
          },
        }

        // Apply $49 consultation credit only within 7-day window
        if (shouldApplyCredit) {
          const coupon = await stripe.coupons.create({
            amount_off: 4900,
            currency: 'usd',
            duration: 'once',
            name: 'Consultation fee credit (7-day window)',
            metadata: { patient_id, type: 'consultation_credit', days_since: String(daysSinceEnrollment) },
          })
          sessionParams.discounts = [{ coupon: coupon.id }]
        }

        const session = await stripe.checkout.sessions.create(sessionParams)

        // Update patient — mark as approved, pending protocol call
        await supabase.from('patients').update({
          status: 'active',
          treatment_type: type,
          updated_at: new Date().toISOString(),
        }).eq('id', patient_id)

        return NextResponse.json({
          ok: true,
          checkout_url: session.url,
          subscription_type: type,
          credit_applied: shouldApplyCredit,
          credit_window_expired: !withinCreditWindow,
          days_since_consultation: daysSinceEnrollment,
        })
      }

      // ── Send invoice link via email (patient self-pays) ──
      case 'send_invoice_link': {
        const { treatment_type, apply_consultation_credit } = body
        const type = treatment_type || patient.treatment_type || 'trt'
        const priceId = PRICE_MAP[type]

        if (!priceId) {
          return NextResponse.json({ error: `No Stripe price for ${type}` }, { status: 500 })
        }

        let customerId = patient.stripe_customer_id
        if (!customerId) {
          const customer = await stripe.customers.create({
            email: patient.email,
            name: `${patient.first_name} ${patient.last_name}`,
            metadata: { bloom_patient_id: patient_id },
          })
          customerId = customer.id
          await supabase.from('patients').update({ stripe_customer_id: customerId }).eq('id', patient_id)
        }

        // Check 7-day eligibility window for consultation credit
        const enrollmentDate = patient.enrollment_date || patient.created_at
        const daysSinceEnrollment = enrollmentDate
          ? Math.floor((Date.now() - new Date(enrollmentDate).getTime()) / (1000 * 60 * 60 * 24))
          : 999
        const withinCreditWindow = daysSinceEnrollment <= 7
        const shouldApplyCredit = apply_consultation_credit && withinCreditWindow

        const invoice = await stripe.invoices.create({
          customer: customerId,
          collection_method: 'send_invoice',
          days_until_due: 3,
          metadata: {
            bloom_patient_id: patient_id,
            treatment_type: type,
            consultation_credit: shouldApplyCredit ? 'applied' : 'expired',
          },
        })

        await stripe.invoiceItems.create({
          customer: customerId,
          invoice: invoice.id,
          price: priceId,
          description: `${type.toUpperCase()} Program — First Month (monthly recurring)`,
        })

        if (shouldApplyCredit) {
          await stripe.invoiceItems.create({
            customer: customerId,
            invoice: invoice.id,
            amount: -4900,
            currency: 'usd',
            description: 'Consultation fee credit (within 7-day window)',
          })
        }

        await stripe.invoices.finalizeInvoice(invoice.id)
        await stripe.invoices.sendInvoice(invoice.id)

        return NextResponse.json({
          ok: true,
          invoice_id: invoice.id,
          invoice_url: invoice.hosted_invoice_url,
          sent_to: patient.email,
          credit_applied: shouldApplyCredit,
          credit_window_expired: !withinCreditWindow,
        })
      }

      // ── Schedule protocol call (assign to Brian or Mahshad) ──
      case 'schedule_protocol_call': {
        const { assignee } = body
        const type = patient.treatment_type || 'trt'
        const price = type === 'glp1' ? '$249' : '$299'

        await supabase.from('clinical_tasks').insert({
          patient_name: `${patient.first_name} ${patient.last_name}`,
          task_type: 'patient_outreach',
          title: `Protocol call — ${patient.first_name} ${patient.last_name} (${type.toUpperCase()})`,
          description: `Call patient to review ${type.toUpperCase()} treatment protocol, confirm correct treatment, discuss add-on options, and verbally confirm monthly recurring fee of ${price}/mo. Do NOT process payment until patient gives verbal confirmation.`,
          status: 'pending',
          priority: 'urgent',
          assignee_name: assignee || 'Brian DeGuzman, RN',
          due_date: new Date().toISOString().split('T')[0],
          created_by: 'system',
        })

        return NextResponse.json({ ok: true, assigned_to: assignee })
      }

      // ── Approve: payment already collected on phone, create subscription + send receipt ──
      case 'approve_and_invoice': {
        const { treatment_type, apply_consultation_credit, payment_method_id } = body
        const type = treatment_type || patient.treatment_type || 'trt'
        const priceId = PRICE_MAP[type]
        const price = type === 'glp1' ? 249 : 299

        if (!priceId) {
          return NextResponse.json({ error: `No Stripe price for ${type}` }, { status: 500 })
        }

        // Find or create Stripe customer
        let customerId = patient.stripe_customer_id
        if (!customerId) {
          const existing = await stripe.customers.list({ email: patient.email, limit: 1 })
          if (existing.data.length > 0) {
            customerId = existing.data[0].id
          } else {
            const customer = await stripe.customers.create({
              email: patient.email,
              name: `${patient.first_name} ${patient.last_name}`,
              metadata: { bloom_patient_id: patient_id },
            })
            customerId = customer.id
          }
          await supabase.from('patients').update({ stripe_customer_id: customerId }).eq('id', patient_id)
        }

        // Check 7-day credit window
        const enrollDate = patient.enrollment_date || patient.created_at
        const daysSince = enrollDate
          ? Math.floor((Date.now() - new Date(enrollDate).getTime()) / (1000 * 60 * 60 * 24))
          : 999
        const withinWindow = daysSince <= 7
        const shouldCredit = apply_consultation_credit && withinWindow
        const chargeAmount = shouldCredit ? price - 49 : price

        // If a payment method was provided (card collected on phone),
        // attach it to the customer and create the subscription directly
        if (payment_method_id) {
          await stripe.paymentMethods.attach(payment_method_id, { customer: customerId })
          await stripe.customers.update(customerId, {
            invoice_settings: { default_payment_method: payment_method_id },
          })

          // Create subscription — charges automatically
          const subParams: Stripe.SubscriptionCreateParams = {
            customer: customerId,
            items: [{ price: priceId }],
            default_payment_method: payment_method_id,
            metadata: {
              bloom_patient_id: patient_id,
              treatment_type: type,
              verbal_confirmation: 'yes',
            },
          }

          if (shouldCredit) {
            const coupon = await stripe.coupons.create({
              amount_off: 4900,
              currency: 'usd',
              duration: 'once',
              name: 'Consultation fee credit (7-day window)',
            })
            subParams.coupon = coupon.id
          }

          const subscription = await stripe.subscriptions.create(subParams)

          await supabase.from('patients').update({
            status: 'active',
            treatment_type: type,
            updated_at: new Date().toISOString(),
          }).eq('id', patient_id)

          return NextResponse.json({
            ok: true,
            mode: 'subscription_created',
            subscription_id: subscription.id,
            sent_to: patient.email,
            credit_applied: shouldCredit,
            first_charge: chargeAmount,
            recurring: price,
          })
        }

        // Ensure customer has email set for receipt delivery
        await stripe.customers.update(customerId, { email: patient.email })

        // Create invoice, send as receipt after marking paid
        const invoice = await stripe.invoices.create({
          customer: customerId,
          collection_method: 'send_invoice',
          days_until_due: 1,
          metadata: {
            bloom_patient_id: patient_id,
            treatment_type: type,
            verbal_confirmation: 'yes',
            payment_collected: 'phone',
          },
        })

        await stripe.invoiceItems.create({
          customer: customerId,
          invoice: invoice.id,
          amount: price * 100,
          currency: 'usd',
          description: `${type.toUpperCase()} Program — Monthly (recurring)`,
        })

        if (shouldCredit) {
          await stripe.invoiceItems.create({
            customer: customerId,
            invoice: invoice.id,
            amount: -4900,
            currency: 'usd',
            description: 'Consultation fee credit (within 7-day window)',
          })
        }

        // Finalize → send invoice email → then mark as paid
        // This way Stripe sends the invoice email first, patient sees it as paid receipt
        await stripe.invoices.finalizeInvoice(invoice.id)
        await stripe.invoices.sendInvoice(invoice.id)
        // Small delay then mark paid so the email goes out first
        await stripe.invoices.pay(invoice.id, { paid_out_of_band: true })

        // Update patient status
        await supabase.from('patients').update({
          status: 'active',
          treatment_type: type,
          updated_at: new Date().toISOString(),
        }).eq('id', patient_id)

        return NextResponse.json({
          ok: true,
          mode: 'receipt_sent',
          invoice_id: invoice.id,
          invoice_url: invoice.hosted_invoice_url,
          sent_to: patient.email,
          credit_applied: shouldCredit,
          amount_charged: chargeAmount,
          recurring: price,
        })
      }

      // ── Get billing status for a patient ──
      case 'status': {
        const customerId = patient.stripe_customer_id
        if (!customerId) {
          return NextResponse.json({ has_subscription: false, invoices: [], customer: null })
        }

        const subscriptions = await stripe.subscriptions.list({ customer: customerId, limit: 5 })
        const invoices = await stripe.invoices.list({ customer: customerId, limit: 10 })

        return NextResponse.json({
          has_subscription: subscriptions.data.length > 0,
          subscriptions: subscriptions.data.map(s => ({
            id: s.id,
            status: s.status,
            plan: s.items.data[0]?.price?.id,
            amount: (s.items.data[0]?.price?.unit_amount || 0) / 100,
            interval: s.items.data[0]?.price?.recurring?.interval,
            current_period_end: new Date(s.current_period_end * 1000).toISOString(),
            cancel_at_period_end: s.cancel_at_period_end,
          })),
          invoices: invoices.data.map(i => ({
            id: i.id,
            status: i.status,
            amount_due: (i.amount_due || 0) / 100,
            amount_paid: (i.amount_paid || 0) / 100,
            created: new Date(i.created * 1000).toISOString(),
            invoice_url: i.hosted_invoice_url,
            pdf: i.invoice_pdf,
          })),
        })
      }

      // ── Cancel subscription ──
      case 'cancel_subscription': {
        const { subscription_id } = body
        if (!subscription_id) return NextResponse.json({ error: 'subscription_id required' }, { status: 400 })

        const cancelled = await stripe.subscriptions.update(subscription_id, {
          cancel_at_period_end: true,
        })

        await supabase.from('patients').update({
          status: 'paused',
          updated_at: new Date().toISOString(),
        }).eq('id', patient_id)

        return NextResponse.json({
          ok: true,
          cancel_at: new Date(cancelled.current_period_end * 1000).toISOString(),
        })
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
    }
  } catch (err) {
    console.error('Billing API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// GET — billing status for a patient
export async function GET(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const patientId = req.nextUrl.searchParams.get('patient_id')
    if (!patientId) return NextResponse.json({ error: 'patient_id required' }, { status: 400 })

    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data: patient } = await supabase
      .from('patients')
      .select('stripe_customer_id, email, treatment_type')
      .eq('id', patientId)
      .maybeSingle()

    if (!patient?.stripe_customer_id) {
      return NextResponse.json({ has_subscription: false, invoices: [], subscriptions: [] })
    }

    const subscriptions = await stripe.subscriptions.list({ customer: patient.stripe_customer_id, limit: 5 })
    const invoices = await stripe.invoices.list({ customer: patient.stripe_customer_id, limit: 10 })

    return NextResponse.json({
      has_subscription: subscriptions.data.length > 0,
      subscriptions: subscriptions.data.map(s => ({
        id: s.id,
        status: s.status,
        amount: (s.items.data[0]?.price?.unit_amount || 0) / 100,
        interval: s.items.data[0]?.price?.recurring?.interval,
        current_period_end: new Date(s.current_period_end * 1000).toISOString(),
        cancel_at_period_end: s.cancel_at_period_end,
      })),
      invoices: invoices.data.map(i => ({
        id: i.id,
        status: i.status,
        amount_due: (i.amount_due || 0) / 100,
        amount_paid: (i.amount_paid || 0) / 100,
        created: new Date(i.created * 1000).toISOString(),
        invoice_url: i.hosted_invoice_url,
      })),
    })
  } catch (err) {
    console.error('Billing status error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
