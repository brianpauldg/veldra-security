-- Bloom Metabolics — Waitlist Leads Table
-- Migration: 20260502_waitlist_leads.sql

CREATE TABLE IF NOT EXISTS waitlist_leads (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name    text NOT NULL,
  last_name     text NOT NULL,
  email         text NOT NULL,
  phone         text NOT NULL,
  state         text NOT NULL,
  primary_interest text NOT NULL,
  preferred_contact text,
  timeline      text,
  notes         text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_term      text,
  utm_content   text,
  referrer      text,
  landing_page  text,
  user_agent    text,
  ip_address    text,
  status        text NOT NULL DEFAULT 'new'
                CHECK (status IN ('new', 'contacted', 'qualified', 'disqualified', 'converted')),
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Prevent duplicate spam — on conflict update timestamp and notes
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_leads_email_unique ON waitlist_leads (email);

-- Enable RLS — only service role can insert/select
ALTER TABLE waitlist_leads ENABLE ROW LEVEL SECURITY;

-- No public policies = only service_role bypasses RLS
COMMENT ON TABLE waitlist_leads IS 'Waitlist submissions from bloommetabolics.com. Service-role access only.';
