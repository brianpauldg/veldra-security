/**
 * Bloom Metabolics — EHR Integration Adapter
 * Abstraction layer for CharmEHR (primary) with extensible provider support.
 *
 * CharmEHR API Reference: https://www.charmhealth.com/resources/api-docs/
 * CharmEHR uses OAuth2 for authentication and REST API for data exchange.
 */

import { createClient } from '@supabase/supabase-js'

// ── Types ────────────────────────────────────────────────────

export interface EHRConfig {
  provider: 'charm' | 'fhir_generic'
  baseUrl: string
  clientId: string
  clientSecret: string
  accessToken?: string
  refreshToken?: string
  tokenExpiresAt?: string
}

export interface EHRPatient {
  externalId: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  gender: string
  phone: string
}

export interface EHREncounter {
  externalId: string
  date: string
  type: string
  providerName: string
  assessment: string
  plan: string
  notes: string
}

export interface EHRLabOrder {
  externalId: string
  marker: string
  value: number
  unit: string
  collectedAt: string
  referenceRange: string
}

export interface EHRSyncResult {
  success: boolean
  action: string
  direction: 'push' | 'pull'
  resourceType: string
  externalId?: string
  error?: string
  timestamp: string
}

// ── CharmEHR Adapter ─────────────────────────────────────────

export class CharmEHRAdapter {
  private config: EHRConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private supabase: any

  constructor(config: EHRConfig) {
    this.config = config
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    this.supabase = url && key ? createClient(url, key) : null
  }

  // ── Authentication ──────────────────────────────────────────

  async authenticate(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        }),
      })

      if (!response.ok) return false

      const data = await response.json()
      this.config.accessToken = data.access_token
      this.config.refreshToken = data.refresh_token
      this.config.tokenExpiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString()
      return true
    } catch (err) {
      console.error('CharmEHR auth error:', err)
      return false
    }
  }

  private async request(path: string, options: RequestInit = {}) {
    if (!this.config.accessToken) {
      await this.authenticate()
    }

    const response = await fetch(`${this.config.baseUrl}${path}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (response.status === 401) {
      // Token expired — refresh and retry
      await this.authenticate()
      return fetch(`${this.config.baseUrl}${path}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })
    }

    return response
  }

  // ── Patient Operations ──────────────────────────────────────

  async createPatient(patient: EHRPatient): Promise<EHRSyncResult> {
    const result = await this.syncOperation('create_patient', 'push', 'patient', async () => {
      const res = await this.request('/api/patient', {
        method: 'POST',
        body: JSON.stringify({
          first_name: patient.firstName,
          last_name: patient.lastName,
          email: patient.email,
          date_of_birth: patient.dateOfBirth,
          gender: patient.gender,
          phone: patient.phone,
        }),
      })
      const data = await res.json()
      return data.id || data.patient_id
    })
    return result
  }

  async getPatient(externalId: string): Promise<EHRPatient | null> {
    try {
      const res = await this.request(`/api/patient/${externalId}`)
      if (!res.ok) return null
      const data = await res.json()
      return {
        externalId: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        dateOfBirth: data.date_of_birth,
        gender: data.gender,
        phone: data.phone,
      }
    } catch {
      return null
    }
  }

  // ── Encounter Operations ────────────────────────────────────

  async pushEncounter(patientExternalId: string, encounter: {
    date: string; type: string; assessment: string; plan: string; notes?: string
  }): Promise<EHRSyncResult> {
    return this.syncOperation('push_encounter', 'push', 'encounter', async () => {
      const res = await this.request(`/api/patient/${patientExternalId}/encounter`, {
        method: 'POST',
        body: JSON.stringify({
          encounter_date: encounter.date,
          encounter_type: encounter.type,
          assessment: encounter.assessment,
          plan: encounter.plan,
          notes: encounter.notes || '',
        }),
      })
      const data = await res.json()
      return data.id
    })
  }

  async pullEncounters(patientExternalId: string): Promise<EHREncounter[]> {
    try {
      const res = await this.request(`/api/patient/${patientExternalId}/encounters`)
      if (!res.ok) return []
      const data = await res.json()
      return (data.encounters || data || []).map((e: Record<string, unknown>) => ({
        externalId: e.id as string,
        date: e.encounter_date as string,
        type: e.encounter_type as string,
        providerName: e.provider_name as string,
        assessment: e.assessment as string,
        plan: e.plan as string,
        notes: e.notes as string,
      }))
    } catch {
      return []
    }
  }

  // ── Lab Operations ──────────────────────────────────────────

  async pushLabResult(patientExternalId: string, lab: {
    marker: string; value: number; unit: string; collectedAt: string; referenceRange: string
  }): Promise<EHRSyncResult> {
    return this.syncOperation('push_lab', 'push', 'lab_result', async () => {
      const res = await this.request(`/api/patient/${patientExternalId}/lab`, {
        method: 'POST',
        body: JSON.stringify({
          test_name: lab.marker,
          result_value: lab.value,
          result_unit: lab.unit,
          collection_date: lab.collectedAt,
          reference_range: lab.referenceRange,
        }),
      })
      const data = await res.json()
      return data.id
    })
  }

  async pullLabResults(patientExternalId: string): Promise<EHRLabOrder[]> {
    try {
      const res = await this.request(`/api/patient/${patientExternalId}/labs`)
      if (!res.ok) return []
      const data = await res.json()
      return (data.labs || data || []).map((l: Record<string, unknown>) => ({
        externalId: l.id as string,
        marker: l.test_name as string,
        value: l.result_value as number,
        unit: l.result_unit as string,
        collectedAt: l.collection_date as string,
        referenceRange: l.reference_range as string,
      }))
    } catch {
      return []
    }
  }

  // ── Link Patient ────────────────────────────────────────────

  async linkPatient(bloomPatientId: string, ehrExternalId: string): Promise<void> {
    const sb = this.supabase
    if (!sb) return
    await sb
      .from('patients')
      .update({
        ehr_provider: 'charm',
        ehr_external_id: ehrExternalId,
        ehr_last_sync_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', bloomPatientId)
  }

  // ── Sync Operation Wrapper ──────────────────────────────────

  private async syncOperation(
    action: string,
    direction: 'push' | 'pull',
    resourceType: string,
    operation: () => Promise<string | undefined>,
    patientId?: string,
  ): Promise<EHRSyncResult> {
    const timestamp = new Date().toISOString()
    const sb = this.supabase
    try {
      const externalId = await operation()

      // Log success
      if (sb) {
        await sb.from('ehr_sync_log').insert({
          patient_id: patientId,
          ehr_provider: 'charm',
          action,
          direction,
          resource_type: resourceType,
          sync_status: 'success',
        })
      }

      return { success: true, action, direction, resourceType, externalId, timestamp }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error'

      // Log error
      if (sb) {
        await sb.from('ehr_sync_log').insert({
          patient_id: patientId,
          ehr_provider: 'charm',
          action,
          direction,
          resource_type: resourceType,
          sync_status: 'error',
          error_message: errorMsg,
        })
      }

      return { success: false, action, direction, resourceType, error: errorMsg, timestamp }
    }
  }
}

// ── Factory ──────────────────────────────────────────────────

export function getEHRAdapter(): CharmEHRAdapter | null {
  const baseUrl = process.env.CHARM_EHR_BASE_URL
  const clientId = process.env.CHARM_EHR_CLIENT_ID
  const clientSecret = process.env.CHARM_EHR_CLIENT_SECRET

  if (!baseUrl || !clientId || !clientSecret) return null

  return new CharmEHRAdapter({
    provider: 'charm',
    baseUrl,
    clientId,
    clientSecret,
  })
}
