import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'
import { validatePMPInput, requiresMedDirectorReview } from '@/lib/clinic/validation/pmp-validator'
import { createReviewAlert } from '@/lib/clinic/review-queue'
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

  const params = req.nextUrl.searchParams
  let query = sb.from('pmp_queries').select('*')
  if (params.get('patient_id')) query = query.eq('patient_id', params.get('patient_id')!)
  if (params.get('prescriber_id')) query = query.eq('prescriber_id', params.get('prescriber_id')!)
  if (params.get('risk_stratification')) query = query.eq('risk_stratification', params.get('risk_stratification')!)

  const { data, error } = await query.order('query_datetime', { ascending: false }).limit(50)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ queries: data || [], count: data?.length || 0 })
}

export async function POST(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const body = await req.json()
    const validation = validatePMPInput(body)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.reason }, { status: 422 })
    }

    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data, error } = await sb.from('pmp_queries').insert({
      patient_id: body.patient_id,
      prescriber_id: body.prescriber_id,
      prescriber_dea: body.prescriber_dea,
      query_datetime: body.query_datetime || new Date().toISOString(),
      query_method: body.query_method,
      query_reference: body.query_reference || null,
      risk_stratification: body.risk_stratification,
      concerning_findings_text: body.concerning_findings_text || null,
      findings_checklist: body.findings_checklist,
      clinical_judgment_text: body.clinical_judgment_text || null,
      attestation_signature: body.attestation_signature,
      ip_address: body.ip_address || '',
      user_agent: body.user_agent || '',
      outage_attested: body.outage_attested || false,
      outage_details: body.outage_details || null,
    }).select('id').single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Check if medical director review is required
    if (requiresMedDirectorReview(body)) {
      try {
        createReviewAlert({
          alert_type: 'prescription_gate_bypass',
          severity: body.risk_stratification === 'high' ? 'critical' : 'high',
          patient_id: body.patient_id,
          prescriber_id: body.prescriber_id,
          triggered_by_id: data.id,
          triggered_by_type: 'pmp_queries',
          summary: `PMP query requires medical director review, risk: ${body.risk_stratification}`,
        })
      } catch { /* non-blocking */ }
    }

    logAudit({
      userId: auth.user.id, userName: auth.user.email, userRole: 'clinician' as any,
      action: 'pmp_query_created', resourceType: 'pmp_queries',
      resourceId: data.id, details: { risk_stratification: body.risk_stratification },
    })

    return NextResponse.json({ ok: true, id: data.id, warnings: validation.warnings })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
