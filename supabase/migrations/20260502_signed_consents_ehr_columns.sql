-- Add EHR document push columns to signed_consents
ALTER TABLE signed_consents ADD COLUMN IF NOT EXISTS ehr_document_id TEXT;
ALTER TABLE signed_consents ADD COLUMN IF NOT EXISTS ehr_pushed_at TIMESTAMPTZ;
ALTER TABLE signed_consents ADD COLUMN IF NOT EXISTS ehr_push_error TEXT;
