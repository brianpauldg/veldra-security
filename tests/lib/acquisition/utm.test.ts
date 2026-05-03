import { describe, it, expect } from 'vitest'
import { parseUTM, serializeUTM, mergeAttribution } from '@/lib/acquisition/utm'

describe('parseUTM', () => {
  it('extracts UTM params from URL string', () => {
    const result = parseUTM('https://bloommetabolics.com/?utm_source=google&utm_medium=cpc&utm_campaign=trt_ca')
    expect(result.source).toBe('google')
    expect(result.medium).toBe('cpc')
    expect(result.campaign).toBe('trt_ca')
  })

  it('extracts gclid and fbclid', () => {
    const result = parseUTM('https://x.com/?gclid=abc123&fbclid=def456')
    expect(result.gclid).toBe('abc123')
    expect(result.fbclid).toBe('def456')
  })

  it('returns undefined for missing params', () => {
    const result = parseUTM('https://bloommetabolics.com/')
    expect(result.source).toBeUndefined()
    expect(result.medium).toBeUndefined()
  })

  it('works with URLSearchParams', () => {
    const params = new URLSearchParams('utm_source=meta&utm_content=ad1')
    const result = parseUTM(params)
    expect(result.source).toBe('meta')
    expect(result.content).toBe('ad1')
  })
})

describe('serializeUTM', () => {
  it('serializes params to query string', () => {
    const result = serializeUTM({ source: 'google', medium: 'cpc' })
    expect(result).toContain('utm_source=google')
    expect(result).toContain('utm_medium=cpc')
  })

  it('omits undefined values', () => {
    const result = serializeUTM({ source: 'google' })
    expect(result).not.toContain('utm_medium')
  })
})

describe('mergeAttribution', () => {
  it('preserves first-touch values', () => {
    const existing = { source: 'google', medium: 'cpc', at: '2026-01-01' }
    const incoming = { source: 'meta', medium: 'social', at: '2026-01-05' }
    const merged = mergeAttribution(existing, incoming)
    expect(merged.source).toBe('google')
    expect(merged.medium).toBe('cpc')
  })

  it('fills in missing first-touch from incoming', () => {
    const existing = { source: 'google' }
    const incoming = { source: 'meta', campaign: 'spring' }
    const merged = mergeAttribution(existing, incoming)
    expect(merged.source).toBe('google')
    expect(merged.campaign).toBe('spring')
  })

  it('uses last-touch for timestamp', () => {
    const existing = { at: '2026-01-01' }
    const incoming = { at: '2026-01-05' }
    const merged = mergeAttribution(existing, incoming)
    expect(merged.at).toBe('2026-01-05')
  })
})
