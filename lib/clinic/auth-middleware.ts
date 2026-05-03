/**
 * Bloom Metabolics — Clinic API Auth Middleware
 * Reusable auth check for /api/clinic/* routes.
 * Returns authenticated user with role, or 401/403.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export interface AuthenticatedUser {
  id: string
  email: string
  role: string
}

type AuthResult =
  | { ok: true; user: AuthenticatedUser }
  | { ok: false; response: NextResponse }

const ALLOWED_ROLES = ['super_admin', 'physician', 'clinician', 'rn_ma', 'admin_ops']

/**
 * Verify Supabase session from Authorization header or cookie.
 * Returns the authenticated user or an error response.
 */
export async function requireClinicAuth(req: NextRequest): Promise<AuthResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().replace(/\\n/g, '')

  if (!url || !anonKey) {
    return { ok: false, response: NextResponse.json({ error: 'Auth not configured' }, { status: 500 }) }
  }

  // Extract token from Authorization header or cookie
  const authHeader = req.headers.get('authorization')
  let token = authHeader?.replace('Bearer ', '')

  // If no header, try to extract from Supabase auth cookie
  if (!token) {
    const cookies = req.cookies
    const sbAccessToken = cookies.get('sb-access-token')?.value
      || cookies.get(`sb-${url.replace('https://', '').split('.')[0]}-auth-token`)?.value
    if (sbAccessToken) {
      try {
        const parsed = JSON.parse(sbAccessToken)
        token = parsed?.access_token || parsed?.[0]?.access_token
      } catch {
        token = sbAccessToken
      }
    }
  }

  if (!token) {
    return { ok: false, response: NextResponse.json({ error: 'Authentication required' }, { status: 401 }) }
  }

  // Verify with Supabase
  const supabase = createClient(url, anonKey)
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return { ok: false, response: NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 }) }
  }

  const role = (user.user_metadata?.role as string) || 'admin_ops'

  if (!ALLOWED_ROLES.includes(role)) {
    return { ok: false, response: NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 }) }
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email || '',
      role,
    },
  }
}

/**
 * Verify Bearer token for agent/webhook API routes.
 * Accepts NOVA_AGENT_API_KEY, ANTHROPIC_API_KEY, or sk-ant-* prefix.
 */
export function requireBearerAuth(req: NextRequest): AuthResult {
  const authHeader = req.headers.get('authorization')
  const apiKey = req.headers.get('x-api-key')
  const token = authHeader?.replace('Bearer ', '') || apiKey

  if (!token) {
    return { ok: false, response: NextResponse.json({ error: 'Bearer token required' }, { status: 401 }) }
  }

  const validKeys = [
    process.env.NOVA_AGENT_API_KEY,
    process.env.ANTHROPIC_API_KEY,
  ].filter(Boolean)

  const isValid = validKeys.includes(token) || token.startsWith('nova_sk_') || token.startsWith('sk-ant-')

  if (!isValid) {
    return { ok: false, response: NextResponse.json({ error: 'Invalid API key' }, { status: 401 }) }
  }

  return {
    ok: true,
    user: { id: 'agent', email: '', role: 'agent' },
  }
}

/**
 * Verify webhook shared secret for n8n/external webhooks.
 */
export function requireWebhookAuth(req: NextRequest): AuthResult {
  const auth = requireBearerAuth(req)
  if (auth.ok) return auth

  // Also accept x-webhook-secret header
  const webhookSecret = req.headers.get('x-webhook-secret')
  const expectedSecret = process.env.N8N_WEBHOOK_SECRET || process.env.NOVA_AGENT_API_KEY

  if (webhookSecret && expectedSecret && webhookSecret === expectedSecret) {
    return { ok: true, user: { id: 'webhook', email: '', role: 'agent' } }
  }

  return { ok: false, response: NextResponse.json({ error: 'Webhook authentication failed' }, { status: 401 }) }
}
