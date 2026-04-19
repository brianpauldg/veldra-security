-- ============================================================
-- Bloom Metabolics — Clinical Database Schema
-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor)
-- ============================================================

-- ── EXTENSIONS ──────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── 1. CLINICS (multi-tenant) ───────────────────────────
CREATE TABLE IF NOT EXISTS clinics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Bloom Metabolics',
  owner_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. TEAM MEMBERS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'physician', 'clinician', 'rn_ma', 'admin_ops')),
  full_name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(clinic_id, user_id)
);

-- ── 3. PATIENTS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS patients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('M', 'F', 'Other')),
  state TEXT, -- for licensing compliance
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'onboarding', 'discharged', 'lost_to_followup')),
  current_protocol TEXT CHECK (current_protocol IN (
    'trt_standard', 'trt_premium',
    'glp1_core', 'glp1_complete',
    'peptide_bpc157_tb500', 'peptide_motsc', 'peptide_ghkcu',
    'optimization_bundle', 'consultation_only'
  )),
  subscription_plan TEXT,
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('trial', 'active', 'past_due', 'paused', 'cancelled')),
  stripe_customer_id TEXT,
  provider_assigned UUID REFERENCES team_members(id),
  churn_risk_score INTEGER DEFAULT 0 CHECK (churn_risk_score >= 0 AND churn_risk_score <= 100),
  last_check_in DATE,
  next_check_in DATE,
  refill_due_date DATE,
  medical_history_encrypted TEXT, -- AES-256-GCM encrypted
  current_medications_encrypted TEXT, -- AES-256-GCM encrypted
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_patients_clinic ON patients(clinic_id);
CREATE INDEX idx_patients_status ON patients(status, clinic_id);
CREATE INDEX idx_patients_provider ON patients(provider_assigned);
CREATE INDEX idx_patients_email ON patients(email);

-- ── 4. PATIENT LABS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS patient_labs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  test_date DATE NOT NULL,
  marker TEXT NOT NULL, -- e.g., 'total_testosterone', 'estradiol', 'psa', 'hematocrit'
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL, -- e.g., 'ng/dL', 'pg/mL', '%'
  reference_min NUMERIC,
  reference_max NUMERIC,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_labs_patient ON patient_labs(patient_id, test_date DESC);
CREATE INDEX idx_labs_marker ON patient_labs(marker, patient_id);

-- ── 5. PATIENT VITALS ───────────────────────────────────
CREATE TABLE IF NOT EXISTS patient_vitals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  recorded_date DATE NOT NULL,
  systolic_bp NUMERIC,
  diastolic_bp NUMERIC,
  heart_rate NUMERIC,
  weight_kg NUMERIC,
  height_cm NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vitals_patient ON patient_vitals(patient_id, recorded_date DESC);

-- ── 6. PATIENT INTAKES ──────────────────────────────────
CREATE TABLE IF NOT EXISTS patient_intakes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  intake_date DATE DEFAULT CURRENT_DATE,
  symptoms_notes_encrypted TEXT, -- AES-256-GCM
  goals TEXT,
  contraindications_encrypted TEXT, -- AES-256-GCM
  treatment_recommendation TEXT CHECK (treatment_recommendation IN ('trt', 'glp1', 'both', 'peptides', 'refer_out')),
  lab_requirements JSONB DEFAULT '[]',
  red_flags JSONB DEFAULT '[]',
  created_by UUID REFERENCES team_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 7. CLINICAL ALERTS ──────────────────────────────────
CREATE TABLE IF NOT EXISTS clinical_alerts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'urgent', 'warning', 'info')),
  category TEXT NOT NULL, -- e.g., 'elevated_hematocrit', 'missed_followup', 'lab_overdue'
  title TEXT NOT NULL,
  description TEXT,
  is_acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_by UUID REFERENCES team_members(id),
  acknowledged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_alerts_clinic ON clinical_alerts(clinic_id, is_acknowledged, severity);
CREATE INDEX idx_alerts_patient ON clinical_alerts(patient_id);

-- ── 8. TASKS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES team_members(id),
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT CHECK (task_type IN ('follow_up_labs', 'prescription_refill', 'patient_education', 'insurance_auth', 'intake_review', 'provider_review', 'general')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_clinic ON tasks(clinic_id, status);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to, status);

-- ── 9. AUDIT LOGS (immutable) ───────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clinic_id UUID REFERENCES clinics(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  agent_id TEXT, -- for Claude agent actions
  action TEXT NOT NULL, -- 'view_patient', 'edit_protocol', 'order_lab', etc.
  resource_type TEXT, -- 'patient', 'lab_result', 'task', etc.
  resource_id UUID,
  changes JSONB, -- { field, old_value, new_value }
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_clinic ON audit_logs(clinic_id, created_at DESC);
CREATE INDEX idx_audit_user ON audit_logs(user_id, created_at DESC);

-- ── 10. LEADS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT CHECK (service_interest IN ('trt', 'glp1', 'peptides', 'general')),
  source TEXT, -- 'website', 'quiz', 'referral', 'ad'
  variant TEXT, -- 'homepage', 'quiz', 'popup', 'partner'
  quiz_score INTEGER,
  qualification_segment TEXT CHECK (qualification_segment IN ('hot', 'warm', 'cold')),
  qualification_score INTEGER,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  referrer TEXT,
  gclid TEXT,
  fbclid TEXT,
  partner_referral TEXT,
  ghl_contact_id TEXT,
  pipeline_stage TEXT,
  device_type TEXT,
  geo_region TEXT,
  geo_country TEXT,
  converted_to_patient_id UUID REFERENCES patients(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_clinic ON leads(clinic_id, created_at DESC);
CREATE INDEX idx_leads_segment ON leads(qualification_segment);

-- ── 11. PRESCRIPTIONS ───────────────────────────────────
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  prescribed_by UUID REFERENCES team_members(id) NOT NULL,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  pharmacy_partner TEXT,
  pharmacy_order_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent_to_pharmacy', 'preparing', 'shipped', 'delivered', 'cancelled')),
  tracking_number TEXT,
  refill_count INTEGER DEFAULT 0,
  next_refill_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rx_patient ON prescriptions(patient_id);
CREATE INDEX idx_rx_refill ON prescriptions(next_refill_date);

-- ── 12. CHECK-INS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS check_ins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  check_in_date DATE DEFAULT CURRENT_DATE,
  overall_wellbeing INTEGER CHECK (overall_wellbeing >= 1 AND overall_wellbeing <= 10),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  mood_stability INTEGER CHECK (mood_stability >= 1 AND mood_stability <= 10),
  symptom_improvement TEXT CHECK (symptom_improvement IN ('much_better', 'somewhat_better', 'same', 'somewhat_worse', 'much_worse')),
  side_effects TEXT[],
  medication_adherence TEXT CHECK (medication_adherence IN ('as_prescribed', 'missed_1_2', 'missed_several', 'stopped')),
  satisfaction_score INTEGER CHECK (satisfaction_score >= 1 AND satisfaction_score <= 10),
  questions_for_provider TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_checkins_patient ON check_ins(patient_id, check_in_date DESC);

-- ── ROW LEVEL SECURITY ──────────────────────────────────
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_intakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

-- ── RLS POLICIES ────────────────────────────────────────
-- Team members can access data for their clinic
CREATE POLICY "team_access_clinic" ON clinics
  FOR ALL USING (owner_user_id = auth.uid() OR id IN (
    SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "team_access_members" ON team_members
  FOR ALL USING (clinic_id IN (
    SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "team_access_patients" ON patients
  FOR ALL USING (clinic_id IN (
    SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "team_access_labs" ON patient_labs
  FOR ALL USING (patient_id IN (
    SELECT id FROM patients WHERE clinic_id IN (
      SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "team_access_vitals" ON patient_vitals
  FOR ALL USING (patient_id IN (
    SELECT id FROM patients WHERE clinic_id IN (
      SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "team_access_intakes" ON patient_intakes
  FOR ALL USING (patient_id IN (
    SELECT id FROM patients WHERE clinic_id IN (
      SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "team_access_alerts" ON clinical_alerts
  FOR ALL USING (clinic_id IN (
    SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "team_access_tasks" ON tasks
  FOR ALL USING (clinic_id IN (
    SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "team_access_audit" ON audit_logs
  FOR SELECT USING (clinic_id IN (
    SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "team_access_leads" ON leads
  FOR ALL USING (clinic_id IN (
    SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "team_access_rx" ON prescriptions
  FOR ALL USING (patient_id IN (
    SELECT id FROM patients WHERE clinic_id IN (
      SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "team_access_checkins" ON check_ins
  FOR ALL USING (patient_id IN (
    SELECT id FROM patients WHERE clinic_id IN (
      SELECT clinic_id FROM team_members WHERE user_id = auth.uid()
    )
  ));

-- Audit logs are insert-only (immutable)
CREATE POLICY "audit_insert_only" ON audit_logs
  FOR INSERT WITH CHECK (true);
