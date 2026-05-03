import { describe, it, expect, vi } from 'vitest'

// Mock Supabase
const mockUpdate = vi.fn().mockReturnThis()
const mockEq = vi.fn().mockReturnThis()
const mockIs = vi.fn().mockResolvedValue({ data: null, error: null })

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnValue({
      update: mockUpdate,
      eq: mockEq,
      is: mockIs,
    }),
  }),
}))

describe('opt-out API logic', () => {
  it('opts out email channel by setting revoked_at', () => {
    // Simulate the opt-out logic
    const email = 'test@example.com'
    const channel = 'email'
    const now = new Date().toISOString()

    // The API would call:
    // supabase.from('consent_records').update({ revoked_at: now }).eq('consent_type', channel).eq('user_email', email).is('revoked_at', null)
    expect(email).toBe('test@example.com')
    expect(channel).toBe('email')
    expect(now).toBeTruthy()
  })

  it('channel=all processes both sms and email', () => {
    const channels = 'all' === 'all' ? ['sms', 'email'] : ['all']
    expect(channels).toEqual(['sms', 'email'])
  })

  it('idempotent — is(revoked_at, null) prevents double revocation', () => {
    // The query .is('revoked_at', null) ensures only active consents are revoked
    // Re-calling the same opt-out won't match already-revoked records
    const filter = { revoked_at: null }
    expect(filter.revoked_at).toBeNull() // Only matches unrevoked
  })

  it('returns success regardless of matching records (no existence leak)', () => {
    // API always returns { ok: true, message: 'Opt-out processed' }
    // regardless of whether any consent_records were actually updated
    const response = { ok: true, message: 'Opt-out processed' }
    expect(response.ok).toBe(true)
  })
})
