-- Bloom Metabolics — Intake Submissions Table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS intake_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  intake_type TEXT NOT NULL CHECK (intake_type IN ('trt', 'glp1')),
  current_step INTEGER DEFAULT 0,
  total_steps INTEGER NOT NULL DEFAULT 7,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  form_data JSONB DEFAULT '{}',
  consent_signed BOOLEAN DEFAULT FALSE,
  consent_signed_at TIMESTAMPTZ,
  signature_name TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_intake_stripe_session ON intake_submissions (stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_intake_email ON intake_submissions (email);
CREATE INDEX IF NOT EXISTS idx_intake_status ON intake_submissions (status, intake_type);

-- RLS: disable public access, only service role can read/write
ALTER TABLE intake_submissions ENABLE ROW LEVEL SECURITY;

-- No public policies — only accessible via service role key (server-side API routes)
