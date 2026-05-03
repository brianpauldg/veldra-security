import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'
import { verifyConfirmationRecord } from '@/lib/clinic/ai-write-confirmation'
import { logAudit } from '@/lib/clinic/audit'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  const sb = createClient(url, key)

  const { data: record } = await sb.from('ai_write_confirmations').select('*').eq('token', params.token).maybeSingle()

  const verification = verifyConfirmationRecord(record, auth.user.id)
  if (!verification.valid) {
    return NextResponse.json({ error: verification.reason }, { status: 422 })
  }

  // Atomic confirm + execute
  const now = new Date().toISOString()
  await sb.from('ai_write_confirmations').update({
    confirmed_at: now,
    confirmed_by: auth.user.id,
    executed_at: now,
    execution_result: { status: 'executed', confirmed_by: auth.user.email },
  }).eq('token', params.token)

  logAudit({
    userId: auth.user.id, userName: auth.user.email, userRole: 'clinician' as any,
    action: 'ai_write_confirmed', resourceType: 'ai_write_confirmations',
    resourceId: params.token, details: { write_action: record?.write_action },
  })

  return NextResponse.json({ ok: true, executed: true, payload: verification.payload })
}
