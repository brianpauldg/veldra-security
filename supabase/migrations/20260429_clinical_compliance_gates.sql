-- Bloom Metabolics — Clinical Compliance Gates Schema
-- Group 4 Stage 1: Compounded Rx Justification, CURES/PMP, Provider Credentials,
-- Medical Director Review Queue, AB 3030 AI Write Confirmations

-- ══════════════════════════════════════════════════════════════
-- Table 1: compounded_rx_justifications
-- FDA April 1 2026 — patient-specific medical necessity documentation
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS compounded_rx_justifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  drug TEXT NOT NULL,
  deviation_categories JSONB NOT NULL,
  deviation_details TEXT,
  clinical_rationale TEXT NOT NULL CHECK (length(clinical_rationale) >= 100),
  prescriber_id UUID NOT NULL,
  prescriber_npi TEXT NOT NULL,
  prescriber_dea TEXT,
  prescriber_signature TEXT NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'signed' CHECK (status IN ('draft', 'signed', 'superseded', 'flagged')),
  superseded_by UUID REFERENCES compounded_rx_justifications(id),
  flagged_reason TEXT,
  flagged_at TIMESTAMPTZ,
  flagged_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rx_just_patient ON compounded_rx_justifications (patient_id);
CREATE INDEX IF NOT EXISTS idx_rx_just_prescriber ON compounded_rx_justifications (prescriber_id);
CREATE INDEX IF NOT EXISTS idx_rx_just_drug ON compounded_rx_justifications (drug);
CREATE INDEX IF NOT EXISTS idx_rx_just_status ON compounded_rx_justifications (status);
CREATE INDEX IF NOT EXISTS idx_rx_just_signed ON compounded_rx_justifications (signed_at);
ALTER TABLE compounded_rx_justifications ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════
-- Table 2: pmp_queries
-- California CURES PDMP attestation for Schedule III TRT
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS pmp_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  prescriber_id UUID NOT NULL,
  prescriber_dea TEXT NOT NULL,
  query_datetime TIMESTAMPTZ NOT NULL,
  query_method TEXT NOT NULL CHECK (query_method IN ('manual_portal', 'dosespot_pmp')),
  query_reference TEXT,
  risk_stratification TEXT NOT NULL CHECK (risk_stratification IN ('none', 'low', 'moderate', 'high', 'declined_to_prescribe')),
  concerning_findings_text TEXT,
  findings_checklist JSONB NOT NULL,
  clinical_judgment_text TEXT,
  attestation_signature TEXT NOT NULL,
  attestation_datetime TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  outage_attested BOOLEAN DEFAULT false,
  outage_details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pmp_patient ON pmp_queries (patient_id);
CREATE INDEX IF NOT EXISTS idx_pmp_prescriber ON pmp_queries (prescriber_id);
CREATE INDEX IF NOT EXISTS idx_pmp_datetime ON pmp_queries (query_datetime);
CREATE INDEX IF NOT EXISTS idx_pmp_risk ON pmp_queries (risk_stratification);
ALTER TABLE pmp_queries ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════
-- Table 3: providers
-- Credential management for prescribers
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('clinician', 'medical_director', 'admin')),
  npi TEXT,
  dea_number TEXT,
  dea_expiration DATE,
  ca_medical_license TEXT,
  ca_license_expiration DATE,
  ca_furnishing_license TEXT,
  ca_furnishing_expiration DATE,
  cures_enrolled BOOLEAN DEFAULT false,
  cures_enrollment_date DATE,
  cures_user_id TEXT,
  malpractice_carrier TEXT,
  malpractice_expiration DATE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_providers_user ON providers (user_id);
CREATE INDEX IF NOT EXISTS idx_providers_role ON providers (role);
CREATE INDEX IF NOT EXISTS idx_providers_active ON providers (active);
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════
-- Table 4: medical_director_review_queue
-- Centralized compliance alert queue
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS medical_director_review_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type TEXT NOT NULL CHECK (alert_type IN ('compounded_rx_flagged', 'prescription_gate_bypass', 'ai_write_flagged', 'credential_expiring', 'cures_outage', 'other')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  patient_id UUID,
  prescriber_id UUID,
  triggered_by_id UUID,
  triggered_by_type TEXT,
  summary TEXT NOT NULL,
  details JSONB,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'acknowledged', 'resolved', 'dismissed')),
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_review_status ON medical_director_review_queue (status);
CREATE INDEX IF NOT EXISTS idx_review_severity ON medical_director_review_queue (severity);
CREATE INDEX IF NOT EXISTS idx_review_patient ON medical_director_review_queue (patient_id);
CREATE INDEX IF NOT EXISTS idx_review_prescriber ON medical_director_review_queue (prescriber_id);
CREATE INDEX IF NOT EXISTS idx_review_created ON medical_director_review_queue (created_at);
ALTER TABLE medical_director_review_queue ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════
-- Table 5: ai_write_confirmations
-- AB 3030 strict confirmation tokens for AI-suggested writes
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS ai_write_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  ai_source TEXT NOT NULL,
  write_action TEXT NOT NULL,
  write_payload JSONB NOT NULL,
  patient_id UUID,
  suggested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  confirmed_at TIMESTAMPTZ,
  confirmed_by UUID,
  rejected_at TIMESTAMPTZ,
  rejected_by UUID,
  rejection_reason TEXT,
  executed_at TIMESTAMPTZ,
  execution_result JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_aiconf_token ON ai_write_confirmations (token);
CREATE INDEX IF NOT EXISTS idx_aiconf_expires ON ai_write_confirmations (expires_at);
CREATE INDEX IF NOT EXISTS idx_aiconf_confirmed ON ai_write_confirmations (confirmed_at);
CREATE INDEX IF NOT EXISTS idx_aiconf_source ON ai_write_confirmations (ai_source);
ALTER TABLE ai_write_confirmations ENABLE ROW LEVEL SECURITY;
