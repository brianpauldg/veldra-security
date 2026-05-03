import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'
import { logAudit } from '@/lib/clinic/audit'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  const { reason } = await req.json()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  const sb = createClient(url, key)

  await sb.from('ai_write_confirmations').update({
    rejected_at: new Date().toISOString(),
    rejected_by: auth.user.id,
    rejection_reason: reason || 'No reason provided',
  }).eq('token', params.token)

  logAudit({
    userId: auth.user.id, userName: auth.user.email, userRole: 'clinician' as any,
    action: 'ai_write_rejected', resourceType: 'ai_write_confirmations',
    resourceId: params.token, details: { reason },
  })

  return NextResponse.json({ ok: true, rejected: true })
}
