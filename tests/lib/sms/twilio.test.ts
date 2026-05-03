import { describe, it, expect } from 'vitest'
import { sendSMS } from '@/lib/sms/twilio'

describe('Twilio SMS', () => {
  it('returns not-sent when SMS_ENABLED is false', async () => {
    const result = await sendSMS({ to: '+15551234567', body: 'Test' })
    expect(result.sent).toBe(false)
    expect(result.reason).toContain('SMS_ENABLED=false')
  })
})
