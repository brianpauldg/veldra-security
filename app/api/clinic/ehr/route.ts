import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getEHRAdapter } from '@/lib/clinic/ehr-adapter'
import { requireClinicAuth } from '@/lib/clinic/auth-middleware'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// POST — EHR operations: link, sync-labs, sync-encounter, push-patient
export async function POST(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const body = await req.json()
    const { action, patient_id } = body

    if (!patient_id) {
      return NextResponse.json({ error: 'patient_id required' }, { status: 400 })
    }

    const adapter = getEHRAdapter()
    if (!adapter) {
      return NextResponse.json({
        error: 'CharmEHR not configured. Set CHARM_EHR_BASE_URL, CHARM_EHR_CLIENT_ID, and CHARM_EHR_CLIENT_SECRET.',
        configured: false,
      }, { status: 503 })
    }

    const supabase = getSupabase()
    const { data: patient } = await supabase
      .from('patients')
      .select('*')
      .eq('id', patient_id)
      .maybeSingle()

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    switch (action) {
      case 'link': {
        // Link Bloom patient to CharmEHR external ID
        const { ehr_external_id } = body
        if (!ehr_external_id) {
          return NextResponse.json({ error: 'ehr_external_id required' }, { status: 400 })
        }
        await adapter.linkPatient(patient_id, ehr_external_id)
        return NextResponse.json({ ok: true, linked: true })
      }

      case 'push_patient': {
        // Create patient in CharmEHR
        const result = await adapter.createPatient({
          externalId: '',
          firstName: patient.first_name,
          lastName: patient.last_name,
          email: patient.email,
          dateOfBirth: patient.date_of_birth || '',
          gender: patient.gender || 'male',
          phone: patient.phone || '',
        })

        if (result.success && result.externalId) {
          await adapter.linkPatient(patient_id, result.externalId)
        }

        return NextResponse.json(result)
      }

      case 'push_labs': {
        // Push lab results to CharmEHR
        if (!patient.ehr_external_id) {
          return NextResponse.json({ error: 'Patient not linked to CharmEHR' }, { status: 400 })
        }

        const { data: labs } = await supabase
          .from('lab_results')
          .select('*')
          .eq('patient_id', patient_id)
          .order('collected_at', { ascending: false })
          .limit(20)

        const results = []
        for (const lab of (labs || [])) {
          const result = await adapter.pushLabResult(patient.ehr_external_id, {
            marker: lab.marker,
            value: lab.value,
            unit: lab.unit,
            collectedAt: lab.collected_at,
            referenceRange: `${lab.reference_min}-${lab.reference_max}`,
          })
          results.push(result)
        }

        return NextResponse.json({ results, count: results.length })
      }

      case 'pull_labs': {
        if (!patient.ehr_external_id) {
          return NextResponse.json({ error: 'Patient not linked to CharmEHR' }, { status: 400 })
        }
        const labs = await adapter.pullLabResults(patient.ehr_external_id)
        return NextResponse.json({ labs, count: labs.length })
      }

      case 'push_encounter': {
        if (!patient.ehr_external_id) {
          return NextResponse.json({ error: 'Patient not linked to CharmEHR' }, { status: 400 })
        }
        const { encounter } = body
        if (!encounter) {
          return NextResponse.json({ error: 'encounter data required' }, { status: 400 })
        }
        const result = await adapter.pushEncounter(patient.ehr_external_id, encounter)
        return NextResponse.json(result)
      }

      case 'pull_encounters': {
        if (!patient.ehr_external_id) {
          return NextResponse.json({ error: 'Patient not linked to CharmEHR' }, { status: 400 })
        }
        const encounters = await adapter.pullEncounters(patient.ehr_external_id)
        return NextResponse.json({ encounters, count: encounters.length })
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
    }
  } catch (err) {
    console.error('EHR API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// GET — EHR sync status for a patient
export async function GET(req: NextRequest) {
  const auth = await requireClinicAuth(req)
  if (!auth.ok) return auth.response

  try {
    const patientId = req.nextUrl.searchParams.get('patient_id')
    if (!patientId) {
      return NextResponse.json({ error: 'patient_id required' }, { status: 400 })
    }

    const supabase = getSupabase()

    const [patientRes, logsRes] = await Promise.all([
      supabase.from('patients').select('ehr_provider, ehr_external_id, ehr_last_sync_at').eq('id', patientId).maybeSingle(),
      supabase.from('ehr_sync_log').select('*').eq('patient_id', patientId).order('created_at', { ascending: false }).limit(10),
    ])

    return NextResponse.json({
      configured: !!(process.env.CHARM_EHR_BASE_URL),
      linked: !!(patientRes.data?.ehr_external_id),
      ehrProvider: patientRes.data?.ehr_provider || null,
      ehrExternalId: patientRes.data?.ehr_external_id || null,
      lastSyncAt: patientRes.data?.ehr_last_sync_at || null,
      recentSyncLogs: logsRes.data || [],
    })
  } catch (err) {
    console.error('EHR status error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
