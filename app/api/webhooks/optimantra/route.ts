/**
 * POST /api/webhooks/optimantra — OptiMantra webhook handler
 * Verifies signature, routes events to handlers.
 */

import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { OPTIMANTRA_CONFIG } from '@/lib/integrations/optimantra/config'
import { logAudit } from '@/lib/clinic/audit'
import { handlePrescriptionCreated } from '@/lib/integrations/optimantra/webhook-handlers/prescription-created'
import { handleLabResultReceived } from '@/lib/integrations/optimantra/webhook-handlers/lab-result-received'
import { handlePatientCreated } from '@/lib/integrations/optimantra/webhook-handlers/patient-created'
import { handleAppointmentCompleted } from '@/lib/integrations/optimantra/webhook-handlers/appointment-completed'
import { handleAppointmentCanceled } from '@/lib/integrations/optimantra/webhook-handlers/appointment-canceled'

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

export async function POST(request: Request) {
  if (!OPTIMANTRA_CONFIG.enabled) {
    return NextResponse.json({ error: 'OptiMantra integration not active' }, { status: 503 })
  }

  const rawBody = await request.text()

  // Verify webhook signature
  const signature = request.headers.get('x-optimantra-signature') || ''
  if (OPTIMANTRA_CONFIG.webhookSecret) {
    try {
      if (!verifySignature(rawBody, signature, OPTIMANTRA_CONFIG.webhookSecret)) {
        logAudit({
          userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
          action: 'webhook_signature_invalid', resourceType: 'optimantra',
          resourceId: '', details: {},
        })
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    } catch {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  }

  let event: { event_type: string; timestamp: string; data: Record<string, unknown> }
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Replay protection: reject events older than 5 minutes
  const eventAge = Date.now() - new Date(event.timestamp).getTime()
  if (eventAge > OPTIMANTRA_CONFIG.webhookMaxAgeMs) {
    logAudit({
      userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
      action: 'webhook_replay_rejected', resourceType: 'optimantra',
      resourceId: '', details: { event_type: event.event_type, age_ms: eventAge },
    })
    return NextResponse.json({ error: 'Event too old' }, { status: 400 })
  }

  logAudit({
    userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
    action: `webhook_received:${event.event_type}`, resourceType: 'optimantra',
    resourceId: '', details: { event_type: event.event_type },
  })

  // Route to handler
  try {
    switch (event.event_type) {
      case 'prescription.created':
        await handlePrescriptionCreated(event.data)
        break
      case 'lab_result.received':
        await handleLabResultReceived(event.data)
        break
      case 'patient.created':
        await handlePatientCreated(event.data)
        break
      case 'appointment.completed':
        await handleAppointmentCompleted(event.data)
        break
      case 'appointment.canceled':
        await handleAppointmentCanceled(event.data)
        break
      default:
        // Unknown event types: return 200 to prevent OptiMantra retries
        break
    }
  } catch (err) {
    logAudit({
      userId: 'system', userName: 'OptiMantra Webhook', userRole: 'super_admin',
      action: 'webhook_handler_error', resourceType: 'optimantra',
      resourceId: '', details: { event_type: event.event_type, error: err instanceof Error ? err.message : 'unknown' },
    })
  }

  return NextResponse.json({ ok: true })
}
