/**
 * Bloom Metabolics — Provider EHR Mapping
 * Links local provider records to OptiMantra provider IDs.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { logAudit } from './audit'

export async function linkProviderToEHR(
  localProviderId: string,
  ehrProvider: string,
  ehrExternalProviderId: string,
): Promise<void> {
  const sb = getSupabaseAdmin()
  if (sb) {
    await sb.from('providers').update({
      ehr_provider: ehrProvider,
      ehr_external_provider_id: ehrExternalProviderId,
      ehr_linked_at: new Date().toISOString(),
    }).eq('id', localProviderId)
  }

  logAudit({
    userId: 'system', userName: 'EHR Mapping', userRole: 'super_admin',
    action: 'provider_linked_to_ehr', resourceType: 'providers',
    resourceId: localProviderId, details: { ehrProvider, ehrExternalProviderId },
  })
}

export async function getEHRProviderIdForLocalProvider(localProviderId: string): Promise<string | null> {
  const sb = getSupabaseAdmin()
  if (!sb) return null
  const { data } = await sb
    .from('providers')
    .select('ehr_external_provider_id')
    .eq('id', localProviderId)
    .single()
  return data?.ehr_external_provider_id || null
}

export async function getLocalProviderIdForEHRProvider(ehrExternalProviderId: string): Promise<string | null> {
  const sb = getSupabaseAdmin()
  if (!sb) return null
  const { data } = await sb
    .from('providers')
    .select('id')
    .eq('ehr_external_provider_id', ehrExternalProviderId)
    .single()
  return data?.id || null
}
