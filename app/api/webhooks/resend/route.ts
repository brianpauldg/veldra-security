/**
 * POST /api/webhooks/resend — Resend webhook handler
 * Processes delivery, bounce, complaint, and open events.
 * Updates email_sends table in Supabase.
 */

import { NextResponse } from 'next/server'
import { logAudit } from '@/lib/clinic/audit'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

const RESEND_WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    // Optional: verify webhook signature
    if (RESEND_WEBHOOK_SECRET) {
      const signature = request.headers.get('svix-signature')
      if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
      }
      // In production: verify using svix library
    }

    const sb = getSupabaseAdmin()
    const emailId = data?.email_id

    switch (type) {
      case 'email.delivered':
        if (sb && emailId) {
          await sb.from('email_sends')
            .update({ delivered_at: new Date().toISOString() })
            .eq('resend_message_id', emailId)
        }
        logAudit({
          userId: 'system', userName: 'Resend', userRole: 'super_admin',
          action: 'email_delivered', resourceType: 'email_sends',
          resourceId: emailId || '', details: { to: data?.to },
        })
        break

      case 'email.bounced':
        if (sb && emailId) {
          await sb.from('email_sends')
            .update({ bounced: true, bounce_reason: data?.bounce?.message || 'unknown' })
            .eq('resend_message_id', emailId)
        }
        logAudit({
          userId: 'system', userName: 'Resend', userRole: 'super_admin',
          action: 'email_bounced', resourceType: 'email_sends',
          resourceId: emailId || '', details: { to: data?.to, reason: data?.bounce?.message },
        })
        break

      case 'email.complained':
        if (sb && emailId) {
          await sb.from('email_sends')
            .update({ complained: true })
            .eq('resend_message_id', emailId)
        }
        logAudit({
          userId: 'system', userName: 'Resend', userRole: 'super_admin',
          action: 'email_complaint', resourceType: 'email_sends',
          resourceId: emailId || '', details: { to: data?.to },
        })
        break

      case 'email.opened':
        if (sb && emailId) {
          await sb.from('email_sends')
            .update({ opened_at: new Date().toISOString() })
            .eq('resend_message_id', emailId)
        }
        break

      case 'email.clicked':
        if (sb && emailId) {
          await sb.from('email_sends')
            .update({ clicked_at: new Date().toISOString() })
            .eq('resend_message_id', emailId)
        }
        break
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
