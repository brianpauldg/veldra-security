-- Nova Health Agent Orchestration Platform — Initial Schema
-- Run: cd platform && npm run migrate

-- ══════════════════════════════════════════════════
-- AGENTS
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  version TEXT NOT NULL DEFAULT '0.1.0',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled', 'error')),
  config JSONB NOT NULL DEFAULT '{}',
  skill_ids JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agents_slug ON agents(slug);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);

-- ══════════════════════════════════════════════════
-- SKILLS (OpenClaw)
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '0.1.0',
  description TEXT NOT NULL DEFAULT '',
  agent_slug TEXT NOT NULL,
  permission_tier TEXT NOT NULL DEFAULT 'read_only' CHECK (permission_tier IN ('read_only', 'internal_write', 'external_write', 'dangerous')),
  input_schema JSONB NOT NULL DEFAULT '{}',
  output_schema JSONB NOT NULL DEFAULT '{}',
  requires_approval BOOLEAN NOT NULL DEFAULT false,
  sandboxed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_agent ON skills(agent_slug);
CREATE INDEX IF NOT EXISTS idx_skills_tier ON skills(permission_tier);

-- ══════════════════════════════════════════════════
-- LEADS
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY,
  external_id TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  state TEXT,
  age INT,
  service_interest TEXT NOT NULL DEFAULT 'mixed' CHECK (service_interest IN ('trt', 'glp1', 'peptides', 'mixed')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'normalized', 'qualified', 'nurture', 'book_now', 'manual_review', 'disqualified', 'booked', 'lost')),
  score INT,
  segment TEXT CHECK (segment IN ('HOT', 'WARM', 'COLD')),
  consent_status TEXT NOT NULL DEFAULT 'pending' CHECK (consent_status IN ('pending', 'opted_in', 'opted_out', 'unknown')),
  consent_timestamp TIMESTAMPTZ,
  source_type TEXT NOT NULL CHECK (source_type IN ('ghl', 'form', 'partner', 'crm_import', 'manual', 'ad_platform')),
  source_id TEXT,
  source_attribution JSONB NOT NULL DEFAULT '{}',
  goals TEXT,
  symptoms JSONB NOT NULL DEFAULT '[]',
  disqualifiers JSONB NOT NULL DEFAULT '[]',
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone) WHERE phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_segment ON leads(segment) WHERE segment IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source_type);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(score DESC) WHERE score IS NOT NULL;

-- ══════════════════════════════════════════════════
-- LEAD SOURCES
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS lead_sources (
  id UUID PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  webhook_id UUID,
  attribution JSONB NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════════
-- LEAD EVENTS (append-only timeline)
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS lead_events (
  id UUID PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_events_lead ON lead_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_events_type ON lead_events(event_type);
CREATE INDEX IF NOT EXISTS idx_lead_events_created ON lead_events(created_at DESC);

-- ══════════════════════════════════════════════════
-- LEAD QUALIFICATIONS
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS lead_qualifications (
  id UUID PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  score INT NOT NULL,
  segment TEXT NOT NULL CHECK (segment IN ('HOT', 'WARM', 'COLD')),
  primary_interest TEXT NOT NULL,
  symptoms JSONB NOT NULL DEFAULT '[]',
  disqualifiers JSONB NOT NULL DEFAULT '[]',
  next_action TEXT NOT NULL CHECK (next_action IN ('book_consult', 'nurture_sequence', 'manual_review', 'disqualify')),
  reasoning TEXT NOT NULL,
  qualified_by TEXT NOT NULL,
  workflow_run_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qualifications_lead ON lead_qualifications(lead_id);
CREATE INDEX IF NOT EXISTS idx_qualifications_action ON lead_qualifications(next_action);

-- ══════════════════════════════════════════════════
-- WORKFLOW RUNS
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS workflow_runs (
  id UUID PRIMARY KEY,
  workflow_slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled', 'waiting_approval')),
  triggered_by TEXT NOT NULL CHECK (triggered_by IN ('webhook', 'schedule', 'manual', 'event')),
  trigger_data JSONB NOT NULL DEFAULT '{}',
  current_step_key TEXT,
  step_results JSONB NOT NULL DEFAULT '{}',
  error TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_runs_workflow ON workflow_runs(workflow_slug);
CREATE INDEX IF NOT EXISTS idx_runs_status ON workflow_runs(status);
CREATE INDEX IF NOT EXISTS idx_runs_created ON workflow_runs(created_at DESC);

-- ══════════════════════════════════════════════════
-- APPROVALS
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS approvals (
  id UUID PRIMARY KEY,
  workflow_run_id UUID NOT NULL REFERENCES workflow_runs(id) ON DELETE CASCADE,
  step_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired', 'auto_approved')),
  policy_type TEXT NOT NULL,
  context JSONB NOT NULL DEFAULT '{}',
  decided_by TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  decided_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_approvals_status ON approvals(status);
CREATE INDEX IF NOT EXISTS idx_approvals_run ON approvals(workflow_run_id);
CREATE INDEX IF NOT EXISTS idx_approvals_pending ON approvals(created_at) WHERE status = 'pending';

-- ══════════════════════════════════════════════════
-- OUTREACH DECISIONS
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS outreach_decisions (
  id UUID PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  workflow_run_id UUID NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms')),
  message_type TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  cta_text TEXT NOT NULL DEFAULT '',
  cta_url TEXT NOT NULL DEFAULT '',
  approval_id UUID REFERENCES approvals(id),
  approved BOOLEAN NOT NULL DEFAULT false,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_outreach_lead ON outreach_decisions(lead_id);
CREATE INDEX IF NOT EXISTS idx_outreach_approved ON outreach_decisions(approved);

-- ══════════════════════════════════════════════════
-- BOOKING INTENTS
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS booking_intents (
  id UUID PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  workflow_run_id UUID NOT NULL,
  qualification_id UUID NOT NULL,
  booking_type TEXT NOT NULL DEFAULT 'immediate' CHECK (booking_type IN ('immediate', 'scheduled', 'callback')),
  preferred_date TIMESTAMPTZ,
  ghl_calendar_id TEXT,
  ghl_appointment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'created', 'confirmed', 'no_show', 'cancelled')),
  handoff_method TEXT NOT NULL CHECK (handoff_method IN ('ghl_api', 'booking_link', 'manual')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_booking_lead ON booking_intents(lead_id);
CREATE INDEX IF NOT EXISTS idx_booking_status ON booking_intents(status);

-- ══════════════════════════════════════════════════
-- SCHEDULES
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  workflow_slug TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('cron', 'once', 'interval')),
  expression TEXT NOT NULL,
  input JSONB NOT NULL DEFAULT '{}',
  enabled BOOLEAN NOT NULL DEFAULT true,
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════════
-- AUDIT LOG (append-only)
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  before_state JSONB,
  after_state JSONB,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_log(actor);

-- ══════════════════════════════════════════════════
-- WEBHOOK TRIGGERS
-- ══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS webhook_triggers (
  id UUID PRIMARY KEY,
  source_type TEXT NOT NULL,
  source_id TEXT NOT NULL DEFAULT '',
  secret TEXT NOT NULL,
  workflow_slug TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  last_received_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_source ON webhook_triggers(source_type);
