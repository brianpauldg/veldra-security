import { describe, it, expect } from 'vitest'
import { safeTrack, isPublicPage } from '@/lib/analytics/safe-track'

describe('safeTrack', () => {
  it('passes allowlisted fields', () => {
    const result = safeTrack('page_view', { page_url: '/trt', source: 'google' })
    expect(result.page_url).toBe('/trt')
    expect(result.source).toBe('google')
    expect(result.event).toBe('page_view')
  })

  it('rejects PHI fields', () => {
    const result = safeTrack('form_submit', {
      email: 'test@example.com',
      first_name: 'John',
      phone: '555-1234',
      page_url: '/book',
    })
    expect(result.email).toBeUndefined()
    expect(result.first_name).toBeUndefined()
    expect(result.phone).toBeUndefined()
    expect(result.page_url).toBe('/book')
  })

  it('rejects non-allowlisted fields (default-deny)', () => {
    const result = safeTrack('click', { page_url: '/trt', random_field: 'hello' })
    expect(result.random_field).toBeUndefined()
    expect(result.page_url).toBe('/trt')
  })
})

describe('isPublicPage', () => {
  it('returns true for public pages', () => {
    expect(isPublicPage('/')).toBe(true)
    expect(isPublicPage('/trt')).toBe(true)
    expect(isPublicPage('/blog/post-1')).toBe(true)
  })

  it('returns false for clinic pages', () => {
    expect(isPublicPage('/clinic/patients')).toBe(false)
    expect(isPublicPage('/clinic/analytics')).toBe(false)
  })

  it('returns false for portal pages', () => {
    expect(isPublicPage('/portal/dashboard')).toBe(false)
  })
})
