import { describe, it, expect, beforeEach } from 'vitest'

describe('unsubscribe-link', () => {
  beforeEach(() => {
    process.env.UNSUBSCRIBE_SECRET = 'test-secret-for-unsubscribe-link-testing-only'
    process.env.NEXT_PUBLIC_APP_URL = 'https://bloommetabolics.com'
  })

  it('generateUnsubscribeURL produces valid signed URL', async () => {
    const { generateUnsubscribeURL } = await import('@/lib/email/unsubscribe-link')
    const url = generateUnsubscribeURL('test@example.com', 'email')
    expect(url).toContain('https://bloommetabolics.com/unsubscribe?token=')
    expect(url).toContain('.')
  })

  it('verifyUnsubscribeToken accepts valid token', async () => {
    const { generateUnsubscribeURL, verifyUnsubscribeToken } = await import('@/lib/email/unsubscribe-link')
    const url = generateUnsubscribeURL('test@example.com', 'all')
    const token = url.split('token=')[1]
    const payload = verifyUnsubscribeToken(token)
    expect(payload).not.toBeNull()
    expect(payload!.email).toBe('test@example.com')
    expect(payload!.channel).toBe('all')
  })

  it('verifyUnsubscribeToken rejects tampered token', async () => {
    const { generateUnsubscribeURL, verifyUnsubscribeToken } = await import('@/lib/email/unsubscribe-link')
    const url = generateUnsubscribeURL('test@example.com')
    const token = url.split('token=')[1]
    const tampered = token.slice(0, -5) + 'XXXXX'
    expect(verifyUnsubscribeToken(tampered)).toBeNull()
  })

  it('verifyUnsubscribeToken rejects expired token', async () => {
    const { verifyUnsubscribeToken } = await import('@/lib/email/unsubscribe-link')
    // Manually create an expired token
    const crypto = await import('crypto')
    const payload = { email: 'test@example.com', channel: 'email', exp: 1000000 } // expired long ago
    const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
    const sig = crypto.createHmac('sha256', process.env.UNSUBSCRIBE_SECRET!).update(data).digest('base64url')
    expect(verifyUnsubscribeToken(`${data}.${sig}`)).toBeNull()
  })
})
