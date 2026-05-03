import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'
import { validateJustificationInput } from '@/lib/clinic/validation/justification-validator'
import { logAudit } from '@/lib/clinic/audit'

export const dynamic = 'force-dynamic'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return null
  return createClient(url, key)
}

// GET — list justifications with filters
export async function GET(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

  const params = req.nextUrl.searchParams
  let query = sb.from('compounded_rx_justifications').select('*')

  if (params.get('patient_id')) query = query.eq('patient_id', params.get('patient_id')!)
  if (params.get('prescriber_id')) query = query.eq('prescriber_id', params.get('prescriber_id')!)
  if (params.get('drug')) query = query.eq('drug', params.get('drug')!)
  if (params.get('status')) query = query.eq('status', params.get('status')!)

  const { data, error } = await query.order('signed_at', { ascending: false }).limit(50)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ justifications: data || [], count: data?.length || 0 })
}

// POST — create new justification
export async function POST(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const body = await req.json()
    const validation = validateJustificationInput(body)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.reason, offending_phrases: validation.offending_phrases }, { status: 422 })
    }

    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data, error } = await sb.from('compounded_rx_justifications').insert({
      patient_id: body.patient_id,
      drug: body.drug,
      deviation_categories: body.deviation_categories,
      deviation_details: body.deviation_details || null,
      clinical_rationale: body.clinical_rationale,
      prescriber_id: body.prescriber_id,
      prescriber_npi: body.prescriber_npi,
      prescriber_dea: body.prescriber_dea || null,
      prescriber_signature: body.prescriber_signature,
      ip_address: body.ip_address || '',
      user_agent: body.user_agent || '',
      status: 'signed',
    }).select('id').single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    logAudit({
      userId: auth.user.id, userName: auth.user.email, userRole: 'clinician' as any,
      action: 'compounded_rx_justification_created', resourceType: 'compounded_rx_justifications',
      resourceId: data.id, details: { drug: body.drug, status: 'signed' },
    })

    return NextResponse.json({ ok: true, id: data.id })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
