import { describe, it, expect, vi } from 'vitest'

// Mock Supabase before importing
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn().mockReturnValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: null },
        error: { message: 'invalid token' },
      }),
    },
  }),
}))

describe('requireClinicAuth', () => {
  it('rejects unauthenticated request with 401', async () => {
    const { requireClinicAuth } = await import('@/lib/clinic/auth-middleware')
    const req = new Request('http://localhost/api/clinic/patients', {
      method: 'GET',
    }) as any
    req.cookies = { get: () => undefined }

    const result = await requireClinicAuth(req)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      const body = await result.response.json()
      expect(result.response.status).toBe(401)
      expect(body.error).toBeDefined()
    }
  })

  it('rejects request with invalid bearer token with 401', async () => {
    const { requireClinicAuth } = await import('@/lib/clinic/auth-middleware')
    const req = new Request('http://localhost/api/clinic/patients', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer invalid-token' },
    }) as any
    req.cookies = { get: () => undefined }

    const result = await requireClinicAuth(req)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.response.status).toBe(401)
    }
  })

  it('requireBearerAuth accepts valid agent key', async () => {
    process.env.ANTHROPIC_API_KEY = 'sk-ant-test-key-123'
    const { requireBearerAuth } = await import('@/lib/clinic/auth-middleware')
    const req = new Request('http://localhost/api/clinic/agents', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer sk-ant-test-key-123' },
    }) as any

    const result = requireBearerAuth(req)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.user.role).toBe('agent')
    }
  })
})
