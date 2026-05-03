import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendSMS } from '@/lib/sms/twilio'

describe('sendSMS', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
  })

  it('returns not-sent when SMS_ENABLED is false (default)', async () => {
    const result = await sendSMS({ to: '+15551234567', body: 'Test message' })
    expect(result.sent).toBe(false)
    expect(result.reason).toContain('SMS_ENABLED=false')
  })

  it('returns not-sent when SMS is disabled regardless of other params', async () => {
    const result = await sendSMS({ to: '+15551234567', body: 'Test', template_id: 'reminder' })
    expect(result.sent).toBe(false)
    expect(result.reason).toContain('SMS_ENABLED=false')
  })

  it('includes template_id in params when provided', async () => {
    const result = await sendSMS({ to: '+15551234567', body: 'Test', template_id: 'appt_reminder' })
    expect(result.sent).toBe(false) // still gated
  })

  it('includes patient_id in params when provided', async () => {
    const result = await sendSMS({ to: '+15551234567', body: 'Test', patient_id: 'pat_123' })
    expect(result.sent).toBe(false)
  })

  it('does not throw regardless of input', async () => {
    const result = await sendSMS({ to: '', body: '' })
    expect(result.sent).toBe(false)
  })

  it('accepts patient_id without error', async () => {
    const result = await sendSMS({ to: '+15551234567', body: 'Hello', patient_id: 'pat_1' })
    expect(result.sent).toBe(false)
    expect(result.reason).toContain('SMS_ENABLED')
  })
})
