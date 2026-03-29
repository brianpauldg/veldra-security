// app/api/clients/route.ts — Secure API route example
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { clientSchema, validateRequest, isValidUUID } from '@/lib/validation'
import { logAuditEvent } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/clients — list clients for current firm
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Auth check — middleware handles redirect but API needs 401
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's firm (RLS ensures they only see their own)
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    
    return NextResponse.json({ clients })
  } catch (err) {
    console.error('GET /api/clients error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/clients — create new client
export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse and validate input
    const body = await request.json()
    const validated = validateRequest(clientSchema, body)

    // Get user's firm_id
    const { data: profile } = await supabase
      .from('profiles')
      .select('firm_id, role')
      .eq('id', session.user.id)
      .single()

    if (!profile?.firm_id) {
      return NextResponse.json({ error: 'No firm associated with account' }, { status: 400 })
    }

    // Insert with firm_id enforced server-side (never trust client for this)
    const { data: client, error } = await supabase
      .from('clients')
      .insert({ ...validated, firm_id: profile.firm_id })
      .select()
      .single()

    if (error) throw error

    // Audit log
    await logAuditEvent('client.created', 'client', client.id, { name: client.name })

    return NextResponse.json({ client }, { status: 201 })
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Validation failed')) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('POST /api/clients error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
