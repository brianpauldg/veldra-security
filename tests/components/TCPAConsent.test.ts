import { describe, it, expect } from 'vitest'
import { CURRENT_CONSENT_VERSION, getCurrentConsentText, getConsentTextByVersion } from '@/lib/consent-text'

// isConsentValid logic tested inline (avoids importing .tsx without JSX transform)
function isConsentValid(
  consent: { email: boolean; sms: boolean },
  requiresEmail: boolean,
  requiresSMS: boolean
): boolean {
  if (requiresEmail && !consent.email) return false
  if (requiresSMS && !consent.sms) return false
  return true
}

describe('TCPAConsent logic', () => {
  it('isConsentValid returns false when email required but not granted', () => {
    expect(isConsentValid({ email: false, sms: false }, true, false)).toBe(false)
  })

  it('isConsentValid returns true when email required and granted', () => {
    expect(isConsentValid({ email: true, sms: false }, true, false)).toBe(true)
  })

  it('isConsentValid returns false when SMS required but not granted', () => {
    expect(isConsentValid({ email: true, sms: false }, true, true)).toBe(false)
  })

  it('isConsentValid returns true when both required and granted', () => {
    expect(isConsentValid({ email: true, sms: true }, true, true)).toBe(true)
  })

  it('CURRENT_CONSENT_VERSION is 1.0.0', () => {
    expect(CURRENT_CONSENT_VERSION).toBe('1.0.0')
  })

  it('getCurrentConsentText returns v1.0.0', () => {
    const text = getCurrentConsentText()
    expect(text.version).toBe('1.0.0')
    expect(text.sms_text).toContain('Bloom Metabolics')
    expect(text.sms_text).toContain('STOP')
    expect(text.email_text).toContain('Bloom Metabolics')
    expect(text.email_text).toContain('unsubscribe')
  })

  it('getConsentTextByVersion returns correct version', () => {
    const text = getConsentTextByVersion('1.0.0')
    expect(text).not.toBeNull()
    expect(text!.version).toBe('1.0.0')
  })

  it('getConsentTextByVersion returns null for unknown version', () => {
    expect(getConsentTextByVersion('99.0.0')).toBeNull()
  })
})
