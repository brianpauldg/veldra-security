import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock config to control enabled/disabled state
vi.mock('@/lib/integrations/optimantra/config', () => ({
  OPTIMANTRA_CONFIG: {
    baseUrl: 'https://api.optimantra.com/v1',
    apiKey: 'test_key',
    webhookSecret: '',
    enabled: false,
    retry: { maxRetries: 3, baseDelayMs: 10, maxDelayMs: 100 },
    rateLimit: { maxConcurrent: 5, requestsPerMinute: 60 },
    webhookMaxAgeMs: 300000,
  },
  assertOptiMantraEnabled: vi.fn(),
  assertOptiMantraConfigured: vi.fn(),
}))

vi.mock('@/lib/clinic/audit', () => ({
  logAudit: vi.fn(),
}))

import { getPatient, findPatientByEmail } from '@/lib/integrations/optimantra/client'
import { assertOptiMantraEnabled, assertOptiMantraConfigured, OPTIMANTRA_CONFIG } from '@/lib/integrations/optimantra/config'

describe('OptiMantra client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(assertOptiMantraEnabled).mockImplementation(() => {})
    vi.mocked(assertOptiMantraConfigured).mockImplementation(() => {})
  })

  it('OPTIMANTRA_ENABLED=false guard throws when assertOptiMantraEnabled rejects', async () => {
    vi.mocked(assertOptiMantraEnabled).mockImplementation(() => {
      throw new Error('OptiMantra integration not yet activated.')
    })
    await expect(getPatient('123')).rejects.toThrow('not yet activated')
  })

  it('production guard throws if API key missing', async () => {
    vi.mocked(assertOptiMantraConfigured).mockImplementation(() => {
      throw new Error('OPTIMANTRA_API_KEY environment variable is required')
    })
    await expect(getPatient('123')).rejects.toThrow('OPTIMANTRA_API_KEY')
  })

  it('getPatient returns patient on 200', async () => {
    const mockPatient = { id: 'om_1', first_name: 'John', last_name: 'Doe', email: 'john@x.com' }
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      ok: true,
      headers: new Headers(),
      json: () => Promise.resolve(mockPatient),
    })

    const patient = await getPatient('om_1')
    expect(patient.id).toBe('om_1')
    expect(patient.first_name).toBe('John')
  })

  it('getPatient throws OptiMantraNotFoundError on 404', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 404,
      ok: false,
      headers: new Headers(),
      json: () => Promise.resolve({}),
    })

    await expect(getPatient('nonexistent')).rejects.toThrow('not found')
  })

  it('getPatient throws OptiMantraAuthError on 401', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 401,
      ok: false,
      headers: new Headers(),
      json: () => Promise.resolve({}),
    })

    await expect(getPatient('om_1')).rejects.toThrow('authentication failed')
  })

  it('findPatientByEmail returns null on 404', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 404,
      ok: false,
      headers: new Headers(),
      json: () => Promise.resolve({}),
    })

    const result = await findPatientByEmail('nobody@x.com')
    expect(result).toBeNull()
  })

  it('retries on 500 up to 3 times', async () => {
    let callCount = 0
    global.fetch = vi.fn().mockImplementation(() => {
      callCount++
      if (callCount <= 3) {
        return Promise.resolve({ status: 500, ok: false, headers: new Headers(), json: () => Promise.resolve({}) })
      }
      return Promise.resolve({ status: 200, ok: true, headers: new Headers(), json: () => Promise.resolve({ id: 'om_1' }) })
    })

    const result = await getPatient('om_1')
    expect(callCount).toBe(4) // 1 initial + 3 retries
    expect(result.id).toBe('om_1')
  })

  it('respects Retry-After header on 429', async () => {
    let callCount = 0
    global.fetch = vi.fn().mockImplementation(() => {
      callCount++
      if (callCount === 1) {
        return Promise.resolve({
          status: 429, ok: false,
          headers: new Headers({ 'Retry-After': '1' }),
          json: () => Promise.resolve({}),
        })
      }
      return Promise.resolve({ status: 200, ok: true, headers: new Headers(), json: () => Promise.resolve({ id: 'om_1' }) })
    })

    const result = await getPatient('om_1')
    expect(callCount).toBe(2)
    expect(result.id).toBe('om_1')
  })

  it('logs all requests to audit', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    global.fetch = vi.fn().mockResolvedValue({
      status: 200, ok: true, headers: new Headers(),
      json: () => Promise.resolve({ id: 'om_1' }),
    })

    await getPatient('om_1')
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'optimantra_api:get' })
    )
  })

  it('throws OptiMantraServerError on malformed JSON', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200, ok: true, headers: new Headers(),
      json: () => Promise.reject(new Error('invalid json')),
    })

    await expect(getPatient('om_1')).rejects.toThrow('Malformed JSON')
  })
})
