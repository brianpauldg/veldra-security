import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/supabase-admin', () => ({ getSupabaseAdmin: () => null }))
vi.mock('@/lib/clinic/audit', () => ({ logAudit: vi.fn() }))

import { linkProviderToEHR, getEHRProviderIdForLocalProvider } from '@/lib/clinic/provider-ehr-mapping'

describe('provider EHR mapping', () => {
  it('linkProviderToEHR does not throw without Supabase', async () => {
    await expect(linkProviderToEHR('prov_1', 'optimantra', 'ehr_prov_1')).resolves.toBeUndefined()
  })

  it('getEHRProviderIdForLocalProvider returns null without Supabase', async () => {
    const result = await getEHRProviderIdForLocalProvider('prov_1')
    expect(result).toBeNull()
  })

  it('audit log captures link operations', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    await linkProviderToEHR('prov_2', 'optimantra', 'ehr_prov_2')
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'provider_linked_to_ehr' })
    )
  })

  it('lookup returns null for unknown provider', async () => {
    const result = await getEHRProviderIdForLocalProvider('nonexistent')
    expect(result).toBeNull()
  })
})
