-- ============================================================
-- Nova Health — Supabase Database Setup
-- Run this in Supabase SQL Editor
-- ============================================================

-- ── 1. ENABLE REQUIRED EXTENSIONS ───────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── 2. FIRMS TABLE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS firms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  firm_type TEXT CHECK (firm_type IN ('accounting', 'hr_consultancy', 'staffing', 'legal', 'other')),
  state TEXT,
  headcount INTEGER,
  stripe_customer_id TEXT,
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'starter', 'growth', 'pro')),
  trial_end_date TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. PROFILES TABLE (extends Supabase auth.users) ──────────
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  plan TEXT DEFAULT 'trial',
  onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 4. CLIENTS TABLE ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  industry TEXT,
  employee_count INTEGER,
  compliance_score INTEGER DEFAULT 0 CHECK (compliance_score >= 0 AND compliance_score <= 100),
  baa_status TEXT DEFAULT 'pending' CHECK (baa_status IN ('pending', 'signed', 'expired', 'not_required')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'review', 'onboarding', 'inactive')),
  frameworks TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 5. COMPLIANCE ALERTS TABLE ──────────────────────────────
CREATE TABLE IF NOT EXISTS compliance_alerts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('high', 'medium', 'low')) DEFAULT 'medium',
  summary TEXT,
  action_checklist TEXT,
  source_url TEXT,
  effective_date TIMESTAMPTZ,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'acknowledged', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. CHECKLIST ITEMS TABLE ────────────────────────────────
CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  alert_id UUID REFERENCES compliance_alerts(id) ON DELETE CASCADE NOT NULL,
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE NOT NULL,
  task_text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_by UUID REFERENCES auth.users(id),
  completed_at TIMESTAMPTZ,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 7. DOCUMENTS TABLE ──────────────────────────────────────
-- Note: actual files stored in Supabase Storage with encryption
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  doc_type TEXT CHECK (doc_type IN ('baa', 'policy', 'contract', 'report', 'form', 'other')),
  storage_path TEXT NOT NULL,    -- path in Supabase Storage
  size_bytes INTEGER,
  is_encrypted BOOLEAN DEFAULT TRUE,
  encryption_key_id TEXT,        -- reference to key in Vault
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 8. MESSAGES TABLE ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) NOT NULL,
  recipient_id UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 9. AUDIT LOG TABLE ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 10. ROW LEVEL SECURITY — ENABLE ON ALL TABLES ───────────
ALTER TABLE firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ── 11. RLS POLICIES ────────────────────────────────────────

-- Profiles: users can only see/edit their own profile
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Firms: users can only see their own firm
CREATE POLICY "firms_select_own" ON firms
  FOR SELECT USING (
    id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "firms_update_own" ON firms
  FOR UPDATE USING (
    id IN (
      SELECT firm_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Clients: users can only see clients belonging to their firm
CREATE POLICY "clients_select_own_firm" ON clients
  FOR SELECT USING (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "clients_insert_own_firm" ON clients
  FOR INSERT WITH CHECK (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "clients_update_own_firm" ON clients
  FOR UPDATE USING (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "clients_delete_admin_only" ON clients
  FOR DELETE USING (
    firm_id IN (
      SELECT firm_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Compliance alerts: own firm only
CREATE POLICY "alerts_select_own_firm" ON compliance_alerts
  FOR SELECT USING (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "alerts_insert_own_firm" ON compliance_alerts
  FOR INSERT WITH CHECK (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "alerts_update_own_firm" ON compliance_alerts
  FOR UPDATE USING (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

-- Checklist items: own firm only
CREATE POLICY "checklist_select_own_firm" ON checklist_items
  FOR SELECT USING (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "checklist_update_own_firm" ON checklist_items
  FOR UPDATE USING (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

-- Documents: own firm only
CREATE POLICY "documents_select_own_firm" ON documents
  FOR SELECT USING (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "documents_insert_own_firm" ON documents
  FOR INSERT WITH CHECK (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "documents_delete_admin_only" ON documents
  FOR DELETE USING (
    firm_id IN (
      SELECT firm_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Messages: own firm, sender or recipient
CREATE POLICY "messages_select_own" ON messages
  FOR SELECT USING (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
    AND (sender_id = auth.uid() OR recipient_id = auth.uid() OR recipient_id IS NULL)
  );

CREATE POLICY "messages_insert_own_firm" ON messages
  FOR INSERT WITH CHECK (
    firm_id IN (SELECT firm_id FROM profiles WHERE id = auth.uid())
    AND sender_id = auth.uid()
  );

-- Audit log: admin/owner can view, system inserts
CREATE POLICY "audit_select_admin" ON audit_logs
  FOR SELECT USING (
    firm_id IN (
      SELECT firm_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- ── 12. AUTO-CREATE PROFILE ON SIGNUP ───────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── 13. AUTO-UPDATE updated_at ──────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER firms_updated_at BEFORE UPDATE ON firms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── 14. STORAGE BUCKETS ─────────────────────────────────────
-- Run these in Supabase Dashboard → Storage
-- 1. Create bucket named 'documents' — set to PRIVATE (not public)
-- 2. Enable RLS on storage
-- Policy: users can only access their firm's documents
