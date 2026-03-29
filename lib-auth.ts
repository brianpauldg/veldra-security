// lib/auth.ts — Drop this into your app/lib/ directory
// Handles all auth operations securely

import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase' // generate with: npx supabase gen types typescript

// ── CLIENT-SIDE AUTH ─────────────────────────────────────────────────────────
export const createClient = () => createClientComponentClient<Database>()

// ── SERVER-SIDE AUTH ─────────────────────────────────────────────────────────
export const createServerClient = () =>
  createServerComponentClient<Database>({ cookies })

// ── GET CURRENT USER (server component) ─────────────────────────────────────
export async function getCurrentUser() {
  const supabase = createServerClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) return null
  return session.user
}

// ── GET CURRENT PROFILE WITH FIRM ────────────────────────────────────────────
export async function getCurrentProfile() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, firms(*)')
    .eq('id', session.user.id)
    .single()

  return profile
}

// ── REQUIRE AUTH (use in server components) ───────────────────────────────────
// Throws if not authenticated — middleware handles redirect
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

// ── SIGN IN ───────────────────────────────────────────────────────────────────
export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient()
  
  // Sanitize inputs
  const sanitizedEmail = email.trim().toLowerCase()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: sanitizedEmail,
    password,
  })
  
  if (error) throw error
  return data
}

// ── SIGN IN WITH GOOGLE ────────────────────────────────────────────────────────
export async function signInWithGoogle() {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
  if (error) throw error
}

// ── SIGN IN WITH MICROSOFT ────────────────────────────────────────────────────
export async function signInWithMicrosoft() {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      scopes: 'openid profile email',
    },
  })
  if (error) throw error
}

// ── SIGN OUT ──────────────────────────────────────────────────────────────────
export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// ── RESET PASSWORD ─────────────────────────────────────────────────────────────
export async function resetPassword(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password` }
  )
  if (error) throw error
}

// ── AUDIT LOG ─────────────────────────────────────────────────────────────────
export async function logAuditEvent(
  action: string,
  resourceType: string,
  resourceId?: string,
  metadata?: Record<string, unknown>
) {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  const { data: profile } = await supabase
    .from('profiles')
    .select('firm_id')
    .eq('id', session.user.id)
    .single()

  await supabase.from('audit_logs').insert({
    firm_id: profile?.firm_id,
    user_id: session.user.id,
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    metadata: metadata || {},
  })
}
