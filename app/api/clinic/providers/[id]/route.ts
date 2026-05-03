import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'
import { logAudit } from '@/lib/clinic/audit'

export const dynamic = 'force-dynamic'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return null
  return createClient(url, key)
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

  const { data, error } = await sb.from('providers').select('*').eq('id', params.id).maybeSingle()
  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  if (!['super_admin', 'physician'].includes(auth.user.role)) {
    return NextResponse.json({ error: 'Admin or medical director required' }, { status: 403 })
  }

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

  const body = await req.json()
  const { error } = await sb.from('providers').update({ ...body, updated_at: new Date().toISOString() }).eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  logAudit({
    userId: auth.user.id, userName: auth.user.email, userRole: auth.user.role as any,
    action: 'provider_updated', resourceType: 'providers', resourceId: params.id, details: {},
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  if (!['super_admin', 'physician'].includes(auth.user.role)) {
    return NextResponse.json({ error: 'Admin or medical director required' }, { status: 403 })
  }

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

  // Soft delete
  await sb.from('providers').update({ active: false, updated_at: new Date().toISOString() }).eq('id', params.id)

  logAudit({
    userId: auth.user.id, userName: auth.user.email, userRole: auth.user.role as any,
    action: 'provider_deactivated', resourceType: 'providers', resourceId: params.id, details: {},
  })

  return NextResponse.json({ ok: true })
}
