import { describe, it, expect } from 'vitest'
import { redactPHI, redactIfPHI } from '@/lib/clinic/phi-redaction'

describe('redactPHI', () => {
  it('redacts email field in permissive mode', () => {
    const result = redactPHI({ email: 'test@example.com', status: 'active' }, 'permissive')
    expect(result.email).toBe('[REDACTED]')
    expect(result.status).toBe('active')
  })

  it('redacts nested PHI fields', () => {
    const result = redactPHI({
      firstName: 'John',
      lastName: 'Doe',
      phone: '5551234567',
      id: 'abc-123',
    }, 'permissive')
    expect(result.firstName).toBe('[REDACTED]')
    expect(result.lastName).toBe('[REDACTED]')
    expect(result.phone).toBe('[REDACTED]')
    expect(result.id).toBe('abc-123')
  })

  it('strict mode default-denies unknown fields', () => {
    const result = redactPHI({
      id: 'abc-123',
      status: 'active',
      customField: 'some value',
      treatment_type: 'trt',
    }, 'strict')
    expect(result.id).toBe('abc-123')
    expect(result.status).toBe('active')
    expect(result.treatment_type).toBe('trt')
    expect(result.customField).toBe('[REDACTED]')
  })
})

describe('redactIfPHI', () => {
  it('redacts known PHI field', () => {
    expect(redactIfPHI('email', 'test@example.com')).toBe('[REDACTED]')
  })

  it('passes through non-PHI field', () => {
    expect(redactIfPHI('status', 'active')).toBe('active')
  })
})
