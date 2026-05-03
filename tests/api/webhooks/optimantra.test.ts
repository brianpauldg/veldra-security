import { describe, it, expect, vi } from 'vitest'
import crypto from 'crypto'

vi.mock('@/lib/integrations/optimantra/config', () => ({
  OPTIMANTRA_CONFIG: {
    baseUrl: 'https://api.optimantra.com/v1',
    apiKey: 'test',
    webhookSecret: 'test_secret',
    enabled: true,
    retry: { maxRetries: 3, baseDelayMs: 10, maxDelayMs: 100 },
    rateLimit: { maxConcurrent: 5, requestsPerMinute: 60 },
    webhookMaxAgeMs: 300000,
  },
}))

vi.mock('@/lib/clinic/audit', () => ({ logAudit: vi.fn() }))
vi.mock('@/lib/integrations/optimantra/webhook-handlers/prescription-created', () => ({ handlePrescriptionCreated: vi.fn() }))
vi.mock('@/lib/integrations/optimantra/webhook-handlers/lab-result-received', () => ({ handleLabResultReceived: vi.fn() }))
vi.mock('@/lib/integrations/optimantra/webhook-handlers/patient-created', () => ({ handlePatientCreated: vi.fn() }))
vi.mock('@/lib/integrations/optimantra/webhook-handlers/appointment-completed', () => ({ handleAppointmentCompleted: vi.fn() }))
vi.mock('@/lib/integrations/optimantra/webhook-handlers/appointment-canceled', () => ({ handleAppointmentCanceled: vi.fn() }))

import { POST } from '@/app/api/webhooks/optimantra/route'

function signPayload(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

function makeRequest(body: Record<string, unknown>, signature?: string) {
  const raw = JSON.stringify(body)
  const sig = signature ?? signPayload(raw, 'test_secret')
  return new Request('http://localhost/api/webhooks/optimantra', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-optimantra-signature': sig },
    body: raw,
  })
}

describe('POST /api/webhooks/optimantra', () => {
  it('rejects invalid signature', async () => {
    const res = await POST(makeRequest(
      { event_type: 'patient.created', timestamp: new Date().toISOString(), data: {} },
      'invalid_signature_hex_padded_to_64_chars_aaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    ))
    expect(res.status).toBe(401)
  })

  it('rejects events older than 5 minutes', async () => {
    const old = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const body = { event_type: 'patient.created', timestamp: old, data: {} }
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(400)
  })

  it('routes prescription.created to handler', async () => {
    const { handlePrescriptionCreated } = await import('@/lib/integrations/optimantra/webhook-handlers/prescription-created')
    const body = { event_type: 'prescription.created', timestamp: new Date().toISOString(), data: { patient_id: 'om_1' } }
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(200)
    expect(handlePrescriptionCreated).toHaveBeenCalled()
  })

  it('returns 200 for unknown event types', async () => {
    const body = { event_type: 'unknown.event', timestamp: new Date().toISOString(), data: {} }
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(200)
  })

  it('audit log captures all incoming events', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    const body = { event_type: 'lab_result.received', timestamp: new Date().toISOString(), data: {} }
    await POST(makeRequest(body))
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'webhook_received:lab_result.received' })
    )
  })

  it('OPTIMANTRA_ENABLED=false rejects with 503', async () => {
    // Re-mock config with enabled=false
    const { OPTIMANTRA_CONFIG } = await import('@/lib/integrations/optimantra/config')
    const original = OPTIMANTRA_CONFIG.enabled;
    (OPTIMANTRA_CONFIG as { enabled: boolean }).enabled = false

    const body = { event_type: 'patient.created', timestamp: new Date().toISOString(), data: {} }
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(503);

    (OPTIMANTRA_CONFIG as { enabled: boolean }).enabled = original
  })
})
