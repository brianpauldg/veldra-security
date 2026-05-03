import { beforeEach, vi } from 'vitest'

// Clear mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'
process.env.ENCRYPTION_KEY = 'a'.repeat(64) // 64 hex chars for testing
process.env.NODE_ENV = 'test'
