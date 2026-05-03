/**
 * Bloom Metabolics — Clinical Compliance Type Definitions
 * Group 4: Compounded Rx Justification, CURES/PMP, Provider Credentials,
 * Medical Director Review Queue, AB 3030 AI Write Confirmations.
 */

// ── Enums ────────────────────────────────────────────────────

export type DeviationCategory = 'allergy' | 'concentration' | 'combination' | 'dosage_form' | 'other'

export type RiskStratification = 'none' | 'low' | 'moderate' | 'high' | 'declined_to_prescribe'

export type ProviderRole = 'clinician' | 'medical_director' | 'admin'

export type AlertType = 'compounded_rx_flagged' | 'prescription_gate_bypass' | 'ai_write_flagged' | 'credential_expiring' | 'cures_outage' | 'other'

export type AlertSeverityLevel = 'low' | 'medium' | 'high' | 'critical'

export type AlertStatusLevel = 'open' | 'acknowledged' | 'resolved' | 'dismissed'

export type JustificationStatus = 'draft' | 'signed' | 'superseded' | 'flagged'

export type QueryMethod = 'manual_portal' | 'dosespot_pmp'

export type AISource = 'agents' | 'mcp' | 'meridian'

export type WriteAction = 'create_alert' | 'create_task' | 'update_alert_status' | 'create_insight' | 'modify_protocol'

export type EligibilityStatus = 'ELIGIBLE' | 'REQUIRES_FIRST_QUERY' | 'REQUIRES_REFRESH' | 'REQUIRES_JUSTIFICATION' | 'BLOCKED_OVERRIDE_REQUIRED' | 'BLOCKED_PROVIDER_INELIGIBLE'

// ── Interfaces ───────────────────────────────────────────────

export interface FindingsChecklist {
  multiple_prescribers: boolean
  multiple_pharmacies: boolean
  overlapping_testosterone_rx: boolean
  concurrent_benzo_or_opioid: boolean
  recent_er_substance: boolean
  recent_decline_elsewhere: boolean
}

export interface CompoundedRxJustification {
  id: string
  patient_id: string
  drug: string
  deviation_categories: DeviationCategory[]
  deviation_details?: string
  clinical_rationale: string
  prescriber_id: string
  prescriber_npi: string
  prescriber_dea?: string
  prescriber_signature: string
  signed_at: string
  ip_address?: string
  user_agent?: string
  status: JustificationStatus
  superseded_by?: string
  flagged_reason?: string
  flagged_at?: string
  flagged_by?: string
  created_at: string
  updated_at: string
}

export interface CompoundedRxJustificationInput {
  patient_id: string
  drug: string
  deviation_categories: DeviationCategory[]
  deviation_details?: string
  clinical_rationale: string
  prescriber_id: string
  prescriber_npi: string
  prescriber_dea?: string
  prescriber_signature: string
  ip_address?: string
  user_agent?: string
}

export interface PMPQuery {
  id: string
  patient_id: string
  prescriber_id: string
  prescriber_dea: string
  query_datetime: string
  query_method: QueryMethod
  query_reference?: string
  risk_stratification: RiskStratification
  concerning_findings_text?: string
  findings_checklist: FindingsChecklist
  clinical_judgment_text?: string
  attestation_signature: string
  attestation_datetime: string
  ip_address?: string
  user_agent?: string
  outage_attested: boolean
  outage_details?: string
  created_at: string
}

export interface PMPQueryInput {
  patient_id: string
  prescriber_id: string
  prescriber_dea: string
  query_datetime: string
  query_method: QueryMethod
  query_reference?: string
  risk_stratification: RiskStratification
  concerning_findings_text?: string
  findings_checklist: FindingsChecklist
  clinical_judgment_text?: string
  attestation_signature: string
  ip_address?: string
  user_agent?: string
  outage_attested?: boolean
  outage_details?: string
}

export interface Provider {
  id: string
  user_id?: string
  full_name: string
  role: ProviderRole
  npi?: string
  dea_number?: string
  dea_expiration?: string
  ca_medical_license?: string
  ca_license_expiration?: string
  ca_furnishing_license?: string
  ca_furnishing_expiration?: string
  cures_enrolled: boolean
  cures_enrollment_date?: string
  cures_user_id?: string
  malpractice_carrier?: string
  malpractice_expiration?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface ProviderInput {
  user_id?: string
  full_name: string
  role: ProviderRole
  npi?: string
  dea_number?: string
  dea_expiration?: string
  ca_medical_license?: string
  ca_license_expiration?: string
  ca_furnishing_license?: string
  ca_furnishing_expiration?: string
  cures_enrolled?: boolean
}

export interface MedicalDirectorAlert {
  id: string
  alert_type: AlertType
  severity: AlertSeverityLevel
  patient_id?: string
  prescriber_id?: string
  triggered_by_id?: string
  triggered_by_type?: string
  summary: string
  details?: Record<string, unknown>
  status: AlertStatusLevel
  acknowledged_at?: string
  acknowledged_by?: string
  resolved_at?: string
  resolved_by?: string
  resolution_notes?: string
  created_at: string
}

export interface AIWriteConfirmation {
  id: string
  token: string
  ai_source: AISource
  write_action: WriteAction
  write_payload: Record<string, unknown>
  patient_id?: string
  suggested_at: string
  expires_at: string
  confirmed_at?: string
  confirmed_by?: string
  rejected_at?: string
  rejected_by?: string
  rejection_reason?: string
  executed_at?: string
  execution_result?: Record<string, unknown>
  created_at: string
}

export interface AIWriteConfirmationInput {
  ai_source: AISource
  write_action: WriteAction
  write_payload: Record<string, unknown>
  patient_id?: string
  expires_in_ms?: number // default 3600000 (1 hour)
}

export interface ValidationResult {
  valid: boolean
  reason?: string
  offending_phrases?: string[]
  warnings?: string[]
}

export interface EligibilityResult {
  status: EligibilityStatus
  reason?: string
  last_query_date?: string
  days_since_query?: number
  provider_issue?: string
}
