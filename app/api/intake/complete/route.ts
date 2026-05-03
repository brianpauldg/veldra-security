import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { session_id, signature_name, signature_date } = body

    if (!session_id || !signature_name) {
      return NextResponse.json({ error: 'session_id and signature required' }, { status: 400 })
    }

    const supabase = getSupabase()

    // 1. Mark intake as completed
    const { error: updateError } = await supabase
      .from('intake_submissions')
      .update({
        status: 'completed',
        consent_signed: true,
        consent_signed_at: new Date().toISOString(),
        signature_name,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_session_id', session_id)

    if (updateError) throw updateError

    // 2. Load the completed intake to create patient record
    const { data: intake, error: fetchError } = await supabase
      .from('intake_submissions')
      .select('*')
      .eq('stripe_session_id', session_id)
      .maybeSingle()

    if (fetchError) throw fetchError

    // 3. Auto-create patient record from intake data
    if (intake) {
      const formData = intake.form_data || {}
      const treatmentType = intake.intake_type === 'glp1' ? 'glp1' : 'trt'
      const defaultProtocol = treatmentType === 'trt' ? 'trt_standard' : 'glp1_semaglutide'
      const today = new Date().toISOString().split('T')[0]

      // Check if patient already exists for this email
      const { data: existingPatient } = await supabase
        .from('patients')
        .select('id')
        .eq('email', intake.email)
        .maybeSingle()

      if (!existingPatient) {
        // Get clinic ID
        const { data: clinic } = await supabase.from('clinics').select('id').limit(1).maybeSingle()
        const clinicId = clinic?.id

        const { error: patientError } = await supabase
          .from('patients')
          .insert({
            clinic_id: clinicId,
            intake_submission_id: intake.id,
            first_name: formData.firstName || signature_name.split(' ')[0] || '',
            last_name: formData.lastName || signature_name.split(' ').slice(1).join(' ') || '',
            email: intake.email,
            phone: formData.phone || '',
            date_of_birth: formData.dateOfBirth || '',
            gender: formData.biologicalSex || 'male',
            state: formData.state || '',
            status: 'onboarding',
            treatment_type: treatmentType,
            current_protocol: defaultProtocol,
            adherence: 'unknown',
            risk_score: 0,
            enrollment_date: today,
            tags: [treatmentType, 'new_intake'],
          })

        if (patientError) {
          console.error('Failed to create patient from intake:', patientError)
        }
      }

      // 4. Create onboarding task
      const patientName = `${formData.firstName || signature_name.split(' ')[0] || ''} ${formData.lastName || signature_name.split(' ').slice(1).join(' ') || ''}`.trim()

      await supabase.from('clinical_tasks').insert({
        patient_name: patientName,
        type: 'followup_review',
        title: `New ${treatmentType.toUpperCase()} intake — review and schedule consultation`,
        description: `${patientName} completed ${treatmentType.toUpperCase()} intake form. Review intake data, confirm eligibility, and ensure consultation is scheduled.`,
        status: 'pending',
        priority: 'high',
        assignee_name: 'Brian DeGuzman, RN',
        due_date: today,
        created_by: 'system',
      }).then(({ error }) => {
        if (error) console.error('Failed to create onboarding task:', error)
      })
    }

    return NextResponse.json({
      ok: true,
      redirect_url: `/booking?session=${session_id}`,
    })
  } catch (err) {
    console.error('Intake complete error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
