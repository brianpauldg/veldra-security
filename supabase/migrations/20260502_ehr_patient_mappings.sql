-- Bloom Metabolics - EHR Patient ID Mappings
-- Links local Bloom patient UUIDs to external EHR system patient IDs

CREATE TABLE IF NOT EXISTS ehr_patient_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  local_patient_id UUID NOT NULL,
  ehr_provider TEXT NOT NULL CHECK (ehr_provider IN ('optimantra', 'none')),
  ehr_external_id TEXT NOT NULL,
  mapped_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_verified_at TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (ehr_provider, ehr_external_id),
  UNIQUE (local_patient_id, ehr_provider)
);

CREATE INDEX IF NOT EXISTS idx_ehr_map_local ON ehr_patient_mappings (local_patient_id);
CREATE INDEX IF NOT EXISTS idx_ehr_map_external ON ehr_patient_mappings (ehr_external_id);
CREATE INDEX IF NOT EXISTS idx_ehr_map_provider ON ehr_patient_mappings (ehr_provider);
ALTER TABLE ehr_patient_mappings ENABLE ROW LEVEL SECURITY;
