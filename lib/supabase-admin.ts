/**
 * Bloom Metabolics — Shared Supabase Admin Client
 * Used by server-side libraries for data persistence.
 * Returns null if credentials are missing (graceful degradation).
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient | null {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return null
  _client = createClient(url, key)
  return _client
}
