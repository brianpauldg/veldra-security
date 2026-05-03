import { describe, it, expect, vi } from 'vitest'
import { POST } from '@/app/api/webhooks/twilio/inbound/route'

vi.mock('@/lib/clinic/audit', () => ({
  logAudit: vi.fn(),
}))

function makeFormRequest(fields: Record<string, string>) {
  const body = new URLSearchParams(fields)
  return new Request('http://localhost/api/webhooks/twilio/inbound', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}

describe('POST /api/webhooks/twilio/inbound', () => {
  it('handles STOP keyword and returns unsubscribe TwiML', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    const res = await POST(makeFormRequest({ From: '+15551234567', Body: 'STOP' }))
    const text = await res.text()
    expect(text).toContain('unsubscribed')
    expect(text).toContain('<Response>')
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'sms_opt_out' })
    )
  })

  it('handles START keyword and returns re-subscribe TwiML', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    const res = await POST(makeFormRequest({ From: '+15551234567', Body: 'START' }))
    const text = await res.text()
    expect(text).toContain('re-subscribed')
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'sms_opt_in' })
    )
  })

  it('handles case-insensitive opt-out keywords', async () => {
    const res = await POST(makeFormRequest({ From: '+15551234567', Body: 'stop' }))
    const text = await res.text()
    expect(text).toContain('unsubscribed')
  })

  it('returns empty TwiML for non-keyword messages', async () => {
    const res = await POST(makeFormRequest({ From: '+15551234567', Body: 'Hello, I have a question' }))
    const text = await res.text()
    expect(text).toBe('<Response></Response>')
  })

  it('returns empty TwiML when From is missing', async () => {
    const res = await POST(makeFormRequest({ Body: 'STOP' }))
    const text = await res.text()
    expect(text).toBe('<Response></Response>')
  })
})
