import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )

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
    // Idempotency check — prevent duplicate processing on webhook retries
    const { data: existingEvent } = await supabaseAdmin
      .from('intake_submissions')
      .select('id')
      .eq('stripe_session_id', (event.data.object as any).id)
      .maybeSingle()

    // For checkout.session.completed, check if patient already exists
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const email = (session.customer_details?.email || session.customer_email || '').toString().toLowerCase()
      const customerId = session.customer as string
      const metadata = session.metadata || {}

      if (!email) {
        console.warn('checkout.session.completed without email — skipping')
        return NextResponse.json({ received: true })
      }

      // Upsert profile with stripe_customer_id
      const { error } = await supabaseAdmin.from('profiles').upsert(
        { email, stripe_customer_id: customerId },
        { onConflict: 'email' }
      )
      if (error) console.error('Failed to upsert profile after checkout:', error)

      // Auto-create patient record immediately after payment (with idempotency)
      const { data: existingPatient } = await supabaseAdmin
        .from('patients')
        .select('id')
        .eq('email', email)
        .maybeSingle()

      if (existingPatient) {
        // Patient already exists — skip creation (idempotent)
        return NextResponse.json({ received: true, existing: true })
      }

      if (!existingPatient) {
        const serviceInterest = metadata.serviceInterest || 'trt'
        const treatmentType = serviceInterest === 'glp1' ? 'glp1' : 'trt'
        const defaultProtocol = treatmentType === 'trt' ? 'trt_standard' : 'glp1_semaglutide'
        const today = new Date().toISOString().split('T')[0]

        // Get clinic ID
        const { data: clinic } = await supabaseAdmin.from('clinics').select('id').limit(1).maybeSingle()
        const clinicId = clinic?.id

        const { error: patientError } = await supabaseAdmin
          .from('patients')
          .insert({
            clinic_id: clinicId,
            first_name: metadata.firstName || '',
            last_name: metadata.lastName || '',
            email,
            phone: metadata.phone || '',
            status: 'onboarding',
            treatment_type: treatmentType,
            current_protocol: defaultProtocol,
            adherence: 'unknown',
            risk_score: 0,
            enrollment_date: today,
            stripe_customer_id: customerId,
            tags: [treatmentType, 'new_patient', 'paid'],
          })

        if (patientError) {
          console.error('Failed to create patient after checkout:', patientError)
        } else {
          console.log(`[WEBHOOK] Patient record created (${treatmentType})`)

          // Create onboarding task
          const patientName = `${metadata.firstName || ''} ${metadata.lastName || ''}`.trim() || email
          await supabaseAdmin.from('clinical_tasks').insert({
            patient_name: patientName,
            task_type: 'followup_review',
            title: `New ${treatmentType.toUpperCase()} patient — ${patientName}`,
            description: `${patientName} paid consultation fee. Review intake form when completed and schedule consultation.`,
            status: 'pending',
            priority: 'high',
            assignee_name: 'Brian DeGuzman, RN',
            due_date: today,
            created_by: 'system',
          }).then(({ error }) => {
            if (error) console.error('Failed to create onboarding task:', error)
          })

          // Send emails via Resend
          try {
            const { sendBookingConfirmation, sendNewPatientAlert } = await import('@/lib/email/resend')
            await Promise.all([
              sendBookingConfirmation({
                patientEmail: email,
                patientName,
                serviceInterest: metadata.serviceInterest || treatmentType,
              }),
              sendNewPatientAlert({
                patientName,
                patientEmail: email,
                treatmentType,
              }),
            ])
          } catch {
            // Non-blocking — email failure doesn't break checkout flow
          }
        }
      }
    }
  } catch (err) {
    console.error('Error processing webhook event:', err)
    return NextResponse.json({ received: true })
  }

  return NextResponse.json({ received: true })
}
