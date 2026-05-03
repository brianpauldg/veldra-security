/**
 * Bloom Metabolics — Unsubscribe Link Generator
 * Generates signed URLs for one-click unsubscribe in outbound emails.
 */

import crypto from 'crypto'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'

function getSecret(): string {
  const secret = process.env.UNSUBSCRIBE_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('UNSUBSCRIBE_SECRET must be set in production')
    }
    return 'dev-unsubscribe-secret-not-for-production'
  }
  return secret
}

export interface UnsubscribePayload {
  email: string
  channel: 'sms' | 'email' | 'all'
  exp: number // Unix timestamp
}

/**
 * Generate a signed unsubscribe URL for embedding in outbound emails.
 * Token expires in 1 year by default.
 */
export function generateUnsubscribeURL(email: string, channel: 'sms' | 'email' | 'all' = 'all'): string {
  const exp = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60 // 1 year
  const payload: UnsubscribePayload = { email, channel, exp }
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(data)
    .digest('base64url')

  return `${BASE_URL}/unsubscribe?token=${data}.${signature}`
}

/**
 * Verify and decode an unsubscribe token.
 * Returns the payload if valid, null if invalid or expired.
 */
export function verifyUnsubscribeToken(token: string): UnsubscribePayload | null {
  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [data, signature] = parts

  // Verify signature
  const expectedSig = crypto
    .createHmac('sha256', getSecret())
    .update(data)
    .digest('base64url')

  if (signature !== expectedSig) return null

  // Decode payload
  try {
    const payload: UnsubscribePayload = JSON.parse(Buffer.from(data, 'base64url').toString())

    // Check expiration
    if (payload.exp < Math.floor(Date.now() / 1000)) return null

    return payload
  } catch {
    return null
  }
}
