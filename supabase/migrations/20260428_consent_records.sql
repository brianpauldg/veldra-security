-- Consent records for TCPA compliance
CREATE TABLE IF NOT EXISTS consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  user_phone TEXT,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('sms', 'email')),
  consent_version TEXT NOT NULL,
  granted BOOLEAN NOT NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  form_id TEXT NOT NULL,
  marketing_source TEXT,
  revoked_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_consent_email_type ON consent_records (user_email, consent_type);
CREATE INDEX IF NOT EXISTS idx_consent_granted ON consent_records (granted_at);
CREATE INDEX IF NOT EXISTS idx_consent_revoked ON consent_records (revoked_at) WHERE revoked_at IS NOT NULL;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;

-- Out-of-state waitlist (marketing data only, no PHI)
CREATE TABLE IF NOT EXISTS out_of_state_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_state ON out_of_state_waitlist (state, created_at);
ALTER TABLE out_of_state_waitlist ENABLE ROW LEVEL SECURITY;

-- Signed informed consents
CREATE TABLE IF NOT EXISTS signed_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID,
  document_id TEXT NOT NULL,
  document_version TEXT NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL,
  signature_data TEXT,
  ip_address TEXT,
  user_agent TEXT,
  content_hash TEXT NOT NULL,
  superseded_by UUID REFERENCES signed_consents(id),
  superseded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_signed_patient_doc ON signed_consents (patient_id, document_id);
CREATE INDEX IF NOT EXISTS idx_signed_at ON signed_consents (signed_at);
ALTER TABLE signed_consents ENABLE ROW LEVEL SECURITY;
