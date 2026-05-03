import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'
import { getCompoundedGLP1Eligibility } from '@/lib/clinic/prescription-eligibility'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  const { patient_id, drug } = await req.json()
  if (!patient_id) return NextResponse.json({ error: 'patient_id required' }, { status: 400 })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  const sb = createClient(url, key)

  const { data: justifications } = await sb.from('compounded_rx_justifications').select('signed_at, status')
    .eq('patient_id', patient_id)
    .eq('drug', drug || 'compounded_semaglutide')
    .eq('status', 'signed')
    .order('signed_at', { ascending: false }).limit(1)

  const last = justifications?.[0]
  const result = getCompoundedGLP1Eligibility(last?.signed_at || null, last?.status || null)

  return NextResponse.json(result)
}
