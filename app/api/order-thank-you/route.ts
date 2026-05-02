import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendOrderThankYou } from '@/lib/email/resend'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  treatmentType: z.enum(['trt', 'glp1', 'peptide', 'general']).default('general'),
})

/**
 * POST /api/order-thank-you
 *
 * Sends a branded thank-you email with 10% review incentive.
 * Payment-processor agnostic — can be called by CorePay webhook,
 * Stripe webhook, n8n automation, or manually from clinic dashboard.
 *
 * Auth: requires INTERNAL_API_KEY header or service-role Supabase key.
 */
export async function POST(req: NextRequest) {
  // Simple auth gate — only server-side callers or admin
  const authHeader = req.headers.get('authorization') || ''
  const internalKey = process.env.INTERNAL_API_KEY
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const isAuthed =
    (internalKey && authHeader === `Bearer ${internalKey}`) ||
    (supabaseKey && authHeader === `Bearer ${supabaseKey}`)

  if (!isAuthed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { email, firstName, lastName, treatmentType } = parsed.data
  const patientName = [firstName, lastName].filter(Boolean).join(' ')

  // Send thank-you email
  const sent = await sendOrderThankYou({
    patientEmail: email,
    patientName,
    treatmentType,
  })

  // Log to email_sends if Supabase is configured
  if (sent) {
    const sb = getSupabaseAdmin()
    if (sb) {
      const { error } = await sb.from('email_sends').insert({
        resend_message_id: `resend_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        template_id: 'order-thank-you',
        to_email: email,
        category: 'transactional',
        sent_at: new Date().toISOString(),
      })
      if (error) console.error('[ORDER-THANK-YOU] email_sends insert error:', error.message)
    }
  }

  return NextResponse.json({ ok: true, sent })
}
