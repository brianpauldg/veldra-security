/**
 * Database initialization script for Nova Health
 * Creates tables and functions for multi-vertical SaaS
 */

const supabaseSchema = `
-- ── COMPANIES ──────────────────────────────────────────────────
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  vertical TEXT NOT NULL CHECK (vertical IN ('accounting', 'law', 'hr')),
  employee_count INT NOT NULL,
  operations_roles_count INT NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('active', 'trial', 'past_due', 'canceled')),
  trial_ends_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_companies_stripe_customer ON companies(stripe_customer_id);

-- ── AI ASSISTANT CONVERSATIONS ──────────────────────────
CREATE TABLE assistant_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  context JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_company_id ON assistant_messages(company_id);
CREATE INDEX idx_messages_created_at ON assistant_messages(created_at DESC);

-- ── AI-GENERATED TASKS ──────────────────────────────────
CREATE TABLE assistant_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  vertical_area TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  time_estimated_hours NUMERIC,
  savings_potential TEXT,
  status TEXT DEFAULT 'suggested' CHECK (status IN ('suggested', 'accepted', 'in_progress', 'completed')),
  generated_by_ai BOOLEAN DEFAULT true,
  generated_template TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  vector VECTOR(1536) -- For semantic search
);

CREATE INDEX idx_tasks_company_id ON assistant_tasks(company_id);
CREATE INDEX idx_tasks_status ON assistant_tasks(status);
CREATE INDEX idx_tasks_vector ON assistant_tasks USING ivfflat (vector);

-- ── COMPLIANCE CHECKLISTS ───────────────────────────────
CREATE TABLE compliance_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  vertical TEXT NOT NULL CHECK (vertical IN ('accounting', 'law', 'hr')),
  category TEXT NOT NULL,
  item TEXT NOT NULL,
  description TEXT,
  deadline DATE,
  frequency TEXT DEFAULT 'quarterly' CHECK (frequency IN ('annual', 'quarterly', 'monthly', 'weekly', 'ad_hoc')),
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  last_completed TIMESTAMP,
  risk_level TEXT DEFAULT 'medium' CHECK (risk_level IN ('low', 'medium', 'high')),
  priority INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_compliance_company_id ON compliance_checklists(company_id);
CREATE INDEX idx_compliance_category ON compliance_checklists(category);
CREATE INDEX idx_compliance_deadline ON compliance_checklists(deadline);

-- ── DOCUMENT TEMPLATES ──────────────────────────────────
CREATE TABLE document_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical TEXT NOT NULL CHECK (vertical IN ('accounting', 'law', 'hr')),
  category TEXT NOT NULL,
  template_name TEXT NOT NULL,
  description TEXT,
  content_template TEXT NOT NULL,
  placeholders TEXT[],
  tags TEXT[],
  hours_saved NUMERIC,
  usage_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_templates_vertical ON document_templates(vertical);
CREATE INDEX idx_templates_category ON document_templates(category);

-- ── TEAM MEMBERS ────────────────────────────────────────
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'manager', 'member')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_team_members_company_id ON team_members(company_id);
CREATE UNIQUE INDEX idx_team_members_unique ON team_members(company_id, user_id);

-- ── USAGE & ANALYTICS ───────────────────────────────────
CREATE TABLE usage_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  assistant_interactions INT DEFAULT 0,
  tasks_generated INT DEFAULT 0,
  tasks_completed INT DEFAULT 0,
  compliance_items_completed INT DEFAULT 0,
  documents_generated INT DEFAULT 0,
  hours_saved_estimate NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_company_id ON usage_analytics(company_id);
CREATE INDEX idx_analytics_date ON usage_analytics(date DESC);

-- ── ROW LEVEL SECURITY ──────────────────────────────────
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistant_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistant_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_analytics ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own company data
CREATE POLICY "Users access own companies"
  ON companies FOR ALL USING (
    auth.uid() = user_id OR
    auth.uid() IN (
      SELECT user_id FROM team_members
      WHERE company_id = companies.id
    )
  );

CREATE POLICY "Users access own company messages"
  ON assistant_messages FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM team_members
      WHERE company_id = assistant_messages.company_id
    ) OR
    auth.uid() IN (
      SELECT user_id FROM companies
      WHERE id = assistant_messages.company_id
    )
  );

CREATE POLICY "Users access own company tasks"
  ON assistant_tasks FOR ALL USING (
    auth.uid()  IN (
      SELECT user_id FROM team_members
      WHERE company_id = assistant_tasks.company_id
    ) OR
    auth.uid() IN (
      SELECT user_id FROM companies
      WHERE id = assistant_tasks.company_id
    )
  );

CREATE POLICY "Users access own company compliance"
  ON compliance_checklists FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM team_members
      WHERE company_id = compliance_checklists.company_id
    ) OR
    auth.uid() IN (
      SELECT user_id FROM companies
      WHERE id = compliance_checklists.company_id
    )
  );

-- Public templates accessible to all authenticated users
CREATE POLICY "Everyone can read document templates"
  ON document_templates FOR SELECT USING (true);
`;

export default supabaseSchema;
