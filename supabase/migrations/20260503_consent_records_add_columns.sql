-- Add consent language tracking columns to consent_records
-- These capture the exact text the user agreed to and where they agreed to it.
-- Supports A2P 10DLC audit requirements.

ALTER TABLE consent_records
  ADD COLUMN IF NOT EXISTS consent_language_text TEXT,
  ADD COLUMN IF NOT EXISTS consent_text_hash TEXT,
  ADD COLUMN IF NOT EXISTS page_url TEXT;

-- Index on hash for deduplication / audit lookups
CREATE INDEX IF NOT EXISTS idx_consent_text_hash ON consent_records (consent_text_hash) WHERE consent_text_hash IS NOT NULL;
