/**
 * Bloom Metabolics — EHR Adapter Factory
 * Returns the active EHR adapter based on configuration.
 */

import type { EHRAdapter } from '@/lib/clinic/ehr-types'
import { OPTIMANTRA_CONFIG } from '@/lib/integrations/optimantra/config'

let _adapter: EHRAdapter | null = null

export function getEHRAdapter(): EHRAdapter {
  if (_adapter) return _adapter

  if (OPTIMANTRA_CONFIG.enabled) {
    const { OptiMantraEHRAdapter } = require('@/lib/clinic/ehr-adapter-optimantra')
    _adapter = new OptiMantraEHRAdapter() as EHRAdapter
  } else {
    const { MockEHRAdapter } = require('@/lib/clinic/ehr-adapter-mock')
    _adapter = new MockEHRAdapter() as EHRAdapter
  }

  return _adapter!
}

/** Reset cached adapter (for testing) */
export function resetEHRAdapter(): void {
  _adapter = null
}
