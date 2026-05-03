/**
 * Bloom Metabolics — EHR Patient ID Mapping
 * Links local Bloom patient UUIDs to external EHR patient IDs.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { logAudit } from './audit'

// In-memory fallback when Supabase is unavailable
const memoryMappings = new Map<string, { ehrProvider: string; ehrExternalId: string }>()

export async function linkPatientToEHR(
  localPatientId: string,
  ehrProvider: string,
  ehrExternalId: string,
): Promise<void> {
  const sb = getSupabaseAdmin()
  if (sb) {
    await sb.from('ehr_patient_mappings').upsert(
      {
        local_patient_id: localPatientId,
        ehr_provider: ehrProvider,
        ehr_external_id: ehrExternalId,
        active: true,
        last_verified_at: new Date().toISOString(),
      },
      { onConflict: 'local_patient_id,ehr_provider' }
    )
  } else {
    memoryMappings.set(`${localPatientId}:${ehrProvider}`, { ehrProvider, ehrExternalId })
  }

  logAudit({
    userId: 'system', userName: 'EHR Mapping', userRole: 'super_admin',
    action: 'ehr_patient_linked', resourceType: 'ehr_patient_mappings',
    resourceId: localPatientId, details: { ehrProvider, ehrExternalId },
  })
}

export async function getEHRIdForLocalPatient(
  localPatientId: string,
  ehrProvider: string,
): Promise<string | null> {
  const sb = getSupabaseAdmin()
  if (sb) {
    const { data } = await sb
      .from('ehr_patient_mappings')
      .select('ehr_external_id')
      .eq('local_patient_id', localPatientId)
      .eq('ehr_provider', ehrProvider)
      .eq('active', true)
      .single()
    return data?.ehr_external_id || null
  }

  const key = `${localPatientId}:${ehrProvider}`
  return memoryMappings.get(key)?.ehrExternalId || null
}

export async function getLocalIdForEHRPatient(
  ehrExternalId: string,
  ehrProvider: string,
): Promise<string | null> {
  const sb = getSupabaseAdmin()
  if (sb) {
    const { data } = await sb
      .from('ehr_patient_mappings')
      .select('local_patient_id')
      .eq('ehr_external_id', ehrExternalId)
      .eq('ehr_provider', ehrProvider)
      .eq('active', true)
      .single()
    return data?.local_patient_id || null
  }

  for (const [key, val] of memoryMappings) {
    if (val.ehrExternalId === ehrExternalId && val.ehrProvider === ehrProvider) {
      return key.split(':')[0]
    }
  }
  return null
}

export async function unlinkPatient(
  localPatientId: string,
  ehrProvider: string,
  reason: string,
): Promise<void> {
  const sb = getSupabaseAdmin()
  if (sb) {
    await sb.from('ehr_patient_mappings')
      .update({ active: false, updated_at: new Date().toISOString() })
      .eq('local_patient_id', localPatientId)
      .eq('ehr_provider', ehrProvider)
  } else {
    memoryMappings.delete(`${localPatientId}:${ehrProvider}`)
  }

  logAudit({
    userId: 'system', userName: 'EHR Mapping', userRole: 'super_admin',
    action: 'ehr_patient_unlinked', resourceType: 'ehr_patient_mappings',
    resourceId: localPatientId, details: { ehrProvider, reason },
  })
}
