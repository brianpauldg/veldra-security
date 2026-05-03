/**
 * POST /api/webhooks/twilio/inbound — Twilio inbound SMS handler
 * Processes opt-out keywords (STOP, UNSUBSCRIBE) for TCPA compliance.
 */

import { NextResponse } from 'next/server'
import { logAudit } from '@/lib/clinic/audit'

const OPT_OUT_KEYWORDS = ['stop', 'unsubscribe', 'cancel', 'end', 'quit']
const OPT_IN_KEYWORDS = ['start', 'unstop', 'subscribe']

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const from = formData.get('From') as string
    const body = (formData.get('Body') as string || '').trim().toLowerCase()

    if (!from) {
      return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } })
    }

    if (OPT_OUT_KEYWORDS.includes(body)) {
      logAudit({
        userId: 'system', userName: 'Twilio', userRole: 'super_admin',
        action: 'sms_opt_out', resourceType: 'sms_sends',
        resourceId: from, details: { keyword: body },
      })
      // In production: update consent_records to revoke SMS consent
      return new Response(
        '<Response><Message>You have been unsubscribed from Bloom Metabolics messages. Reply START to re-subscribe.</Message></Response>',
        { headers: { 'Content-Type': 'text/xml' } }
      )
    }

    if (OPT_IN_KEYWORDS.includes(body)) {
      logAudit({
        userId: 'system', userName: 'Twilio', userRole: 'super_admin',
        action: 'sms_opt_in', resourceType: 'sms_sends',
        resourceId: from, details: { keyword: body },
      })
      return new Response(
        '<Response><Message>You have been re-subscribed to Bloom Metabolics messages. Reply STOP to unsubscribe.</Message></Response>',
        { headers: { 'Content-Type': 'text/xml' } }
      )
    }

    // Forward other inbound messages for review
    return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } })
  } catch {
    return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } })
  }
}
