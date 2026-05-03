import { describe, it, expect } from 'vitest'
import { getTemplateMetadata, requiresConsent, requiresHumanReview } from '@/lib/email/categories'

describe('email categories', () => {
  it('returns metadata for known templates', () => {
    const meta = getTemplateMetadata('consult-confirmation')
    expect(meta).not.toBeNull()
    expect(meta!.category).toBe('transactional')
  })

  it('returns null for unknown templates', () => {
    expect(getTemplateMetadata('nonexistent-template')).toBeNull()
  })

  it('transactional emails do not require consent', () => {
    expect(requiresConsent('consult-confirmation')).toBe(false)
    expect(requiresConsent('consult-reminder')).toBe(false)
  })

  it('marketing emails require consent', () => {
    expect(requiresConsent('welcome-after-lead')).toBe(true)
    expect(requiresConsent('referral-invitation')).toBe(true)
  })
})
