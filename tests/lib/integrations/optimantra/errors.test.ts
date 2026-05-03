import { describe, it, expect } from 'vitest'
import {
  OptiMantraNotFoundError,
  OptiMantraAuthError,
  OptiMantraRateLimitError,
  OptiMantraServerError,
  OptiMantraValidationError,
  isRetryable,
} from '@/lib/integrations/optimantra/errors'

describe('OptiMantra errors', () => {
  it('isRetryable: 500/502/503 are retryable', () => {
    expect(isRetryable(new OptiMantraServerError('fail', 500))).toBe(true)
    expect(isRetryable(new OptiMantraServerError('fail', 502))).toBe(true)
    expect(isRetryable(new OptiMantraServerError('fail', 503))).toBe(true)
  })

  it('isRetryable: 401/403/404 are not retryable', () => {
    expect(isRetryable(new OptiMantraAuthError())).toBe(false)
    expect(isRetryable(new OptiMantraNotFoundError('patient', '123'))).toBe(false)
  })

  it('error messages preserve request_id', () => {
    const err = new OptiMantraServerError('timeout', 503, 'req_abc')
    expect(err.requestId).toBe('req_abc')
  })

  it('HTTP status code preserved on errors', () => {
    const err = new OptiMantraNotFoundError('patient', '123')
    expect(err.statusCode).toBe(404)
    const auth = new OptiMantraAuthError()
    expect(auth.statusCode).toBe(401)
  })

  it('instanceof checks work correctly', () => {
    const err = new OptiMantraValidationError({ name: 'required' })
    expect(err instanceof OptiMantraValidationError).toBe(true)
    expect(err instanceof Error).toBe(true)
  })
})
