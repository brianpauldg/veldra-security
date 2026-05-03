import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'

export const dynamic = 'force-dynamic'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return null
  return createClient(url, key)
}

// PATCH — update patient status (lifecycle transitions)
export async function PATCH(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const body = await req.json()
    const { patient_id, status, adherence, notes } = body

    if (!patient_id) return NextResponse.json({ error: 'patient_id required' }, { status: 400 })

    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (status) updates.status = status
    if (adherence) updates.adherence = adherence
    if (notes) updates.notes = notes

    const { error } = await supabase.from('patients').update(updates).eq('id', patient_id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true, updated: updates })
  } catch (err) {
    console.error('Patient update error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const params = req.nextUrl.searchParams

    // Direct Supabase query — bypass data-service to eliminate abstraction issues
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')

    if (!url || !key) {
      return NextResponse.json({ error: 'Supabase not configured', hasUrl: !!url, hasKey: !!key }, { status: 500 })
    }

    const supabase = createClient(url, key)

    const id = params.get('id')
    if (id) {
      const { data } = await supabase.from('patients').select('*').or(`id.eq.${id},mrn.eq.${id}`).maybeSingle()
      if (!data) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })

      // Also fetch intake form data if it exists
      let intakeData = null
      if (data.email) {
        const { data: intake } = await supabase
          .from('intake_submissions')
          .select('*')
          .eq('email', data.email)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()
        if (intake) intakeData = intake
      }
      // Also try by intake_submission_id
      if (!intakeData && data.intake_submission_id) {
        const { data: intake } = await supabase
          .from('intake_submissions')
          .select('*')
          .eq('id', data.intake_submission_id)
          .maybeSingle()
        if (intake) intakeData = intake
      }

      return NextResponse.json({ ...data, intake: intakeData })
    }

    // Patient list with filters
    let query = supabase.from('patients').select('*')
    if (params.get('status')) query = query.eq('status', params.get('status')!)
    if (params.get('treatment_type')) query = query.eq('treatment_type', params.get('treatment_type')!)
    if (params.get('search')) {
      const s = params.get('search')!
      query = query.or(`first_name.ilike.%${s}%,last_name.ilike.%${s}%,email.ilike.%${s}%`)
    }

    const { data: patients, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
    }

    // Compute counts
    const { data: allPatients } = await supabase.from('patients').select('treatment_type, status')
    const all = allPatients || []
    const counts = {
      total: all.length,
      trt: all.filter(p => p.treatment_type === 'trt').length,
      glp1: all.filter(p => p.treatment_type === 'glp1').length,
      peptide: all.filter(p => p.treatment_type === 'peptide').length,
      onboarding: all.filter(p => p.status === 'onboarding').length,
      active: all.filter(p => p.status === 'active').length,
    }

    // Map to camelCase for frontend
    const mapped = (patients || []).map(p => ({
      id: p.id,
      mrn: p.mrn || '',
      firstName: p.first_name,
      lastName: p.last_name,
      email: p.email,
      phone: p.phone || '',
      dateOfBirth: p.date_of_birth || '',
      gender: p.gender || 'male',
      state: p.state || '',
      status: p.status || 'onboarding',
      primaryProtocol: p.current_protocol || 'custom',
      adherence: p.adherence || 'unknown',
      riskScore: p.risk_score || p.churn_risk_score || 0,
      assignedPhysicianId: p.provider_assigned || '',
      enrollmentDate: p.enrollment_date || '',
      lastVisitDate: p.last_visit_date || p.last_check_in || '',
      nextFollowUpDate: p.next_follow_up_date || p.next_check_in || '',
      lastLabDate: p.last_lab_date || '',
      nextLabDueDate: p.next_lab_due_date || '',
      activeAlertCount: p.active_alert_count || 0,
      pendingRefills: p.pending_refills || 0,
      tags: p.tags || [],
      treatmentType: p.treatment_type,
      ehrProvider: p.ehr_provider,
      ehrExternalId: p.ehr_external_id,
    }))

    return NextResponse.json({ patients: mapped, counts })
  } catch (err) {
    console.error('Clinic patients API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
