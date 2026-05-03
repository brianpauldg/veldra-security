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

export async function GET(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

  const { data, error } = await sb.from('providers').select('*').order('full_name')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ providers: data || [] })
}

export async function POST(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  // Only admin or medical_director can create providers
  if (!['super_admin', 'physician'].includes(auth.user.role)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
  }

  const body = await req.json()
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

  const { data, error } = await sb.from('providers').insert({
    user_id: body.user_id || null,
    full_name: body.full_name,
    role: body.role,
    npi: body.npi || null,
    dea_number: body.dea_number || null,
    dea_expiration: body.dea_expiration || null,
    ca_medical_license: body.ca_medical_license || null,
    ca_license_expiration: body.ca_license_expiration || null,
    ca_furnishing_license: body.ca_furnishing_license || null,
    ca_furnishing_expiration: body.ca_furnishing_expiration || null,
    cures_enrolled: body.cures_enrolled || false,
  }).select('id').single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  logAudit({
    userId: auth.user.id, userName: auth.user.email, userRole: auth.user.role as any,
    action: 'provider_created', resourceType: 'providers',
    resourceId: data.id, details: { role: body.role },
  })

  return NextResponse.json({ ok: true, id: data.id })
}
