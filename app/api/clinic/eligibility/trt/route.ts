import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'
import { getTRTEligibility } from '@/lib/clinic/prescription-eligibility'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  const { patient_id, prescriber_id } = await req.json()
  if (!patient_id || !prescriber_id) {
    return NextResponse.json({ error: 'patient_id and prescriber_id required' }, { status: 400 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  const sb = createClient(url, key)

  // Get provider
  const { data: provider } = await sb.from('providers').select('*').eq('id', prescriber_id).maybeSingle()

  // Get most recent PMP query
  const { data: queries } = await sb.from('pmp_queries').select('query_datetime, outage_attested')
    .eq('patient_id', patient_id).order('query_datetime', { ascending: false }).limit(1)

  const lastQuery = queries?.[0]
  const result = getTRTEligibility(provider, lastQuery?.query_datetime || null, lastQuery?.outage_attested)

  return NextResponse.json(result)
}
