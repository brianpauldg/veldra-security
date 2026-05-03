-- Bloom Metabolics — Production Clinical Schema
-- Run this in Supabase SQL Editor

-- ── Patients ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mrn TEXT UNIQUE NOT NULL DEFAULT ('BM-' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0')),
  intake_submission_id UUID REFERENCES intake_submissions(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  date_of_birth TEXT DEFAULT '',
  gender TEXT DEFAULT 'male' CHECK (gender IN ('male', 'female', 'other')),
  state TEXT DEFAULT '',
  status TEXT DEFAULT 'onboarding' CHECK (status IN ('active', 'inactive', 'onboarding', 'paused', 'discharged')),
  treatment_type TEXT NOT NULL CHECK (treatment_type IN ('trt', 'glp1', 'peptide')),
  primary_protocol TEXT DEFAULT 'custom',
  adherence TEXT DEFAULT 'unknown' CHECK (adherence IN ('excellent', 'good', 'fair', 'poor', 'unknown')),
  risk_score INTEGER DEFAULT 0,
  assigned_physician_id TEXT,
  enrollment_date TEXT DEFAULT (TO_CHAR(NOW(), 'YYYY-MM-DD')),
  last_visit_date TEXT,
  next_follow_up_date TEXT,
  last_lab_date TEXT,
  next_lab_due_date TEXT,
  active_alert_count INTEGER DEFAULT 0,
  pending_refills INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  -- EHR integration
  ehr_provider TEXT,
  ehr_external_id TEXT,
  ehr_last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_patients_email ON patients (email);
CREATE INDEX IF NOT EXISTS idx_patients_status ON patients (status);
CREATE INDEX IF NOT EXISTS idx_patients_treatment_type ON patients (treatment_type);
CREATE INDEX IF NOT EXISTS idx_patients_mrn ON patients (mrn);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- ── Labs ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lab_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  marker TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  reference_min NUMERIC,
  reference_max NUMERIC,
  is_abnormal BOOLEAN DEFAULT FALSE,
  collected_at TEXT NOT NULL,
  reported_at TEXT,
  order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_labs_patient ON lab_results (patient_id);
CREATE INDEX IF NOT EXISTS idx_labs_marker ON lab_results (marker);

ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;

-- ── Vitals ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  recorded_at TEXT NOT NULL,
  source TEXT DEFAULT 'clinic',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vitals_patient ON vitals (patient_id);

ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;

-- ── Alerts ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clinical_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low', 'info')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rationale TEXT DEFAULT '',
  trigger_value TEXT,
  trigger_threshold TEXT,
  owner_id TEXT,
  owner_name TEXT,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_alerts_patient ON clinical_alerts (patient_id);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON clinical_alerts (status);

ALTER TABLE clinical_alerts ENABLE ROW LEVEL SECURITY;

-- ── Tasks ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clinical_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  patient_name TEXT,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  assignee_id TEXT,
  assignee_name TEXT,
  due_date TEXT,
  completed_at TIMESTAMPTZ,
  created_by TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_status ON clinical_tasks (status);

ALTER TABLE clinical_tasks ENABLE ROW LEVEL SECURITY;

-- ── Medications ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  route TEXT DEFAULT '',
  start_date TEXT,
  end_date TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  prescriber_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_medications_patient ON medications (patient_id);

ALTER TABLE medications ENABLE ROW LEVEL SECURITY;

-- ── Encounters ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS encounters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  date TEXT NOT NULL,
  provider_id TEXT,
  provider_name TEXT,
  chief_complaint TEXT,
  assessment TEXT,
  plan TEXT,
  follow_up_date TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_encounters_patient ON encounters (patient_id);

ALTER TABLE encounters ENABLE ROW LEVEL SECURITY;

-- ── EHR Integration Log ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS ehr_sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  ehr_provider TEXT NOT NULL,
  action TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('push', 'pull')),
  resource_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'pending')),
  request_payload JSONB,
  response_payload JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ehr_sync_patient ON ehr_sync_log (patient_id);

ALTER TABLE ehr_sync_log ENABLE ROW LEVEL SECURITY;
