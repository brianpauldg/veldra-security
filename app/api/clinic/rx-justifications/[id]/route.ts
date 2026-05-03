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

  const { data, error } = await sb.from('compounded_rx_justifications').select('*').eq('id', params.id).maybeSingle()
  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

  const body = await req.json()

  if (body.action === 'supersede' && body.new_justification_id) {
    const { error } = await sb.from('compounded_rx_justifications').update({
      status: 'superseded',
      superseded_by: body.new_justification_id,
      updated_at: new Date().toISOString(),
    }).eq('id', params.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    logAudit({
      userId: auth.user.id, userName: auth.user.email, userRole: 'clinician' as any,
      action: 'justification_superseded', resourceType: 'compounded_rx_justifications',
      resourceId: params.id, details: { superseded_by: body.new_justification_id },
    })

    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
