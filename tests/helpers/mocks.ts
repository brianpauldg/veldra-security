import { vi } from 'vitest'

/**
 * Mock Supabase client that returns configurable data.
 */
export function mockSupabaseClient(data: unknown = [], error: unknown = null) {
  const chainable = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data: Array.isArray(data) ? data[0] : data, error }),
    single: vi.fn().mockResolvedValue({ data: Array.isArray(data) ? data[0] : data, error }),
    then: vi.fn().mockImplementation((cb: Function) => cb({ data, error })),
  }

  return {
    from: vi.fn().mockReturnValue(chainable),
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
    _chainable: chainable,
  }
}

/**
 * Mock audit logger
 */
export function mockAuditLogger() {
  return {
    logAudit: vi.fn().mockReturnValue({ id: 'audit_test', timestamp: new Date().toISOString() }),
  }
}
