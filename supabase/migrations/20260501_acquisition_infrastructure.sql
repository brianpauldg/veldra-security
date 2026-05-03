-- Bloom Metabolics — Acquisition Infrastructure Schema
-- Group 4.5: Conversion tracking, email/SMS sends, sequences, referrals

-- ══════════════════════════════════════════════════════════════
-- Conversion Events
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS conversion_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  lead_id UUID,
  patient_id UUID,
  session_id TEXT,
  event_data JSONB,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  content TEXT,
  term TEXT,
  referrer TEXT,
  landing_page TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conv_event_type ON conversion_events (event_type);
CREATE INDEX IF NOT EXISTS idx_conv_lead ON conversion_events (lead_id);
CREATE INDEX IF NOT EXISTS idx_conv_patient ON conversion_events (patient_id);
CREATE INDEX IF NOT EXISTS idx_conv_session ON conversion_events (session_id);
CREATE INDEX IF NOT EXISTS idx_conv_created ON conversion_events (created_at);
CREATE INDEX IF NOT EXISTS idx_conv_source ON conversion_events (source);
CREATE INDEX IF NOT EXISTS idx_conv_campaign ON conversion_events (campaign);
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════
-- Lead Attribution
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS lead_attribution (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL UNIQUE,
  first_touch_source TEXT,
  first_touch_medium TEXT,
  first_touch_campaign TEXT,
  first_touch_content TEXT,
  first_touch_term TEXT,
  first_touch_at TIMESTAMPTZ,
  first_touch_landing_page TEXT,
  last_touch_source TEXT,
  last_touch_medium TEXT,
  last_touch_campaign TEXT,
  last_touch_content TEXT,
  last_touch_term TEXT,
  last_touch_at TIMESTAMPTZ,
  last_touch_landing_page TEXT,
  touchpoint_count INTEGER DEFAULT 1,
  conversion_path JSONB,
  referral_code TEXT,
  referred_by_patient_id UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attr_lead ON lead_attribution (lead_id);
CREATE INDEX IF NOT EXISTS idx_attr_referral ON lead_attribution (referral_code);
CREATE INDEX IF NOT EXISTS idx_attr_referred_by ON lead_attribution (referred_by_patient_id);
CREATE INDEX IF NOT EXISTS idx_attr_first_source ON lead_attribution (first_touch_source);
ALTER TABLE lead_attribution ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════
-- Email Sends
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS email_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resend_message_id TEXT UNIQUE,
  template_id TEXT NOT NULL,
  to_email TEXT NOT NULL,
  to_lead_id UUID,
  to_patient_id UUID,
  category TEXT NOT NULL,
  ab3030_human_reviewed BOOLEAN,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  click_count INTEGER DEFAULT 0,
  unsubscribed_via_this_email BOOLEAN DEFAULT false,
  bounced BOOLEAN DEFAULT false,
  bounce_reason TEXT,
  complained BOOLEAN DEFAULT false,
  audit_metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_resend ON email_sends (resend_message_id);
CREATE INDEX IF NOT EXISTS idx_email_lead ON email_sends (to_lead_id);
CREATE INDEX IF NOT EXISTS idx_email_patient ON email_sends (to_patient_id);
CREATE INDEX IF NOT EXISTS idx_email_sent ON email_sends (sent_at);
CREATE INDEX IF NOT EXISTS idx_email_template ON email_sends (template_id);
ALTER TABLE email_sends ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════
-- SMS Sends
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS sms_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  twilio_message_sid TEXT UNIQUE,
  template_id TEXT,
  to_phone TEXT NOT NULL,
  to_lead_id UUID,
  to_patient_id UUID,
  category TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  failed BOOLEAN DEFAULT false,
  failure_reason TEXT,
  opted_out_via_this_message BOOLEAN DEFAULT false,
  audit_metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sms_twilio ON sms_sends (twilio_message_sid);
CREATE INDEX IF NOT EXISTS idx_sms_lead ON sms_sends (to_lead_id);
ALTER TABLE sms_sends ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════
-- Email Sequences
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS sequence_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL,
  sequence_id TEXT NOT NULL,
  current_step_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'exited', 'paused')),
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  next_step_at TIMESTAMPTZ,
  exited_at TIMESTAMPTZ,
  exit_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_seq_lead ON sequence_enrollments (lead_id);
CREATE INDEX IF NOT EXISTS idx_seq_status ON sequence_enrollments (status);
CREATE INDEX IF NOT EXISTS idx_seq_next ON sequence_enrollments (next_step_at);
ALTER TABLE sequence_enrollments ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════
-- Referral Program
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  patient_id UUID NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ref_code ON referral_codes (code);
CREATE INDEX IF NOT EXISTS idx_ref_patient ON referral_codes (patient_id);
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_patient_id UUID NOT NULL,
  referee_lead_id UUID,
  referee_patient_id UUID,
  referral_code TEXT NOT NULL,
  referred_at TIMESTAMPTZ DEFAULT now(),
  enrolled_at TIMESTAMPTZ,
  credit_status TEXT DEFAULT 'pending' CHECK (credit_status IN ('pending', 'eligible', 'paid', 'void')),
  credit_amount_cents INTEGER,
  credit_paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals (referrer_patient_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals (referral_code);
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS referral_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  referral_id UUID,
  amount_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'available', 'applied', 'expired')),
  applied_to_invoice TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_credits_patient ON referral_credits (patient_id);
ALTER TABLE referral_credits ENABLE ROW LEVEL SECURITY;
