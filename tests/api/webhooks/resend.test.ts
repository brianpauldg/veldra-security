import { describe, it, expect, vi } from 'vitest'
import { POST } from '@/app/api/webhooks/resend/route'

vi.mock('@/lib/clinic/audit', () => ({
  logAudit: vi.fn(),
}))

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/webhooks/resend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

describe('POST /api/webhooks/resend', () => {
  it('handles email.delivered event', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    const res = await POST(makeRequest({ type: 'email.delivered', data: { email_id: 'msg_1', to: 'test@x.com' } }))
    expect(res.status).toBe(200)
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'email_delivered' })
    )
  })

  it('handles email.bounced event', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    const res = await POST(makeRequest({ type: 'email.bounced', data: { email_id: 'msg_2', to: 'bad@x.com', bounce: { message: 'mailbox full' } } }))
    expect(res.status).toBe(200)
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'email_bounced' })
    )
  })

  it('handles email.complained event', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    const res = await POST(makeRequest({ type: 'email.complained', data: { email_id: 'msg_3', to: 'spam@x.com' } }))
    expect(res.status).toBe(200)
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'email_complaint' })
    )
  })

  it('returns 200 for unknown event types', async () => {
    const res = await POST(makeRequest({ type: 'email.opened', data: {} }))
    expect(res.status).toBe(200)
  })

  it('returns 400 for invalid JSON payload', async () => {
    const req = new Request('http://localhost/api/webhooks/resend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
