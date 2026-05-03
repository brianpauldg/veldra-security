-- Add EHR provider linking columns to providers table
ALTER TABLE providers ADD COLUMN IF NOT EXISTS ehr_provider TEXT;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS ehr_external_provider_id TEXT;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS ehr_linked_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_providers_ehr ON providers (ehr_provider, ehr_external_provider_id);
