import { describe, it, expect } from 'vitest'
import { safeTrack, isPublicPage } from '@/lib/analytics/safe-track'

describe('analytics aggregations', () => {
  it('safeTrack aggregates only allowlisted event fields', () => {
    const result = safeTrack('funnel_step_completed', {
      funnel_step: 'consultation_booked',
      source: 'google',
      medium: 'cpc',
      campaign: 'trt_spring',
      patient_name: 'John Doe', // PHI — rejected
      ssn: '123-45-6789', // PHI — rejected
    })
    expect(result.funnel_step).toBe('consultation_booked')
    expect(result.source).toBe('google')
    expect(result.medium).toBe('cpc')
    expect(result.campaign).toBe('trt_spring')
    expect(result.patient_name).toBeUndefined()
    expect(result.ssn).toBeUndefined()
  })

  it('supports treatment_type for cohort analysis', () => {
    const result = safeTrack('subscription_started', {
      treatment_type: 'trt',
      category: 'subscription',
    })
    expect(result.treatment_type).toBe('trt')
    expect(result.category).toBe('subscription')
  })

  it('supports variant for A/B test tracking', () => {
    const result = safeTrack('experiment_viewed', {
      variant: 'pricing_v2',
      template_id: 'landing_page_a',
    })
    expect(result.variant).toBe('pricing_v2')
    expect(result.template_id).toBe('landing_page_a')
  })

  it('isPublicPage correctly segments clinic vs public for aggregation', () => {
    // Public pages contribute to marketing analytics
    expect(isPublicPage('/trt')).toBe(true)
    expect(isPublicPage('/pricing')).toBe(true)
    expect(isPublicPage('/blog/understanding-trt')).toBe(true)
    // Clinic pages excluded from public analytics
    expect(isPublicPage('/clinic/analytics')).toBe(false)
    expect(isPublicPage('/portal/settings')).toBe(false)
  })

  it('rejects all known PHI patterns from analytics payload', () => {
    const phiFields = {
      email: 'test@x.com',
      phone: '555-1234',
      first_name: 'John',
      last_name: 'Doe',
      date_of_birth: '1990-01-01',
      address: '123 Main St',
      ssn: '123-45-6789',
      npi: '1234567890',
      dea: 'AB1234567',
    }
    const result = safeTrack('test_phi_rejection', phiFields)
    for (const key of Object.keys(phiFields)) {
      expect(result[key]).toBeUndefined()
    }
  })
})
