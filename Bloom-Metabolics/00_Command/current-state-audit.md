# Current-State Audit — Nova Health Codebase

**Audit Date:** 2026-04-15
**Codebase:** veldra-security (git repo)
**Current Branch:** main
**Package Name:** novahealth v1.0.0

---

## 1. Project Overview

Multi-layered healthcare SaaS combining:
- Public-facing marketing/booking site (Next.js 14 App Router)
- Clinic dashboard for physicians/staff (clinical workflow management)
- AI agent orchestration platform (8 Claude managed agents)
- Growth automation engine (lead capture, nurture, booking)
- Internal operations platform (Express backend with BullMQ job queues)

**Total:** 70+ files, ~3,500 lines of production code, 2,000+ lines of documentation

---

## 2. Technology Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| Framework | Next.js 14 (App Router) | ✅ Configured |
| Language | TypeScript 5 | ✅ Configured |
| Styling | Tailwind CSS v4 + Framer Motion | ✅ Configured |
| Database | Supabase (PostgreSQL + Auth + RLS) | ✅ Schema deployed |
| Payments | Stripe | ⚠️ SDK integrated, products not created |
| CRM | GoHighLevel | ✅ API integrated |
| Automation | n8n Cloud | ✅ Workflows configured |
| AI Agents | Claude (Anthropic SDK) | ✅ 8 agents configured |
| AI (Legacy) | OpenAI | ⚠️ Mocked, not real |
| Email | SendGrid | ⚠️ SDK integrated, templates missing |
| SMS | Twilio | ⚠️ SDK integrated, templates missing |
| Notifications | Telegram Bot | ✅ Functional |
| MCP | Obsidian, Google Workspace, GHL, n8n | ✅ All configured |
| Hosting | Vercel (expected) | ⬜ Not deployed |
| Encryption | AES-256-GCM (crypto-js) | ✅ Implemented |

---

## 3. Pages & Routes (32 Total)

### Marketing Pages (20)
| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Homepage | ✅ Built |
| `/about` | Company info | ✅ Built |
| `/services` | Service overview | ✅ Built |
| `/pricing` | Pricing table | ✅ Built |
| `/how-it-works` | Process walkthrough | ✅ Built |
| `/faq` | FAQ accordion | ✅ Built |
| `/contact` | Contact form | ✅ Built |
| `/trt` | TRT landing page | ✅ Built |
| `/glp1` | GLP-1 landing page | ✅ Built |
| `/peptides` | Peptides landing page | ✅ Built |
| `/vs/hims` | Comparison page | ✅ Built |
| `/vs/roman` | Comparison page | ✅ Built |
| `/alternatives/best-online-trt-clinics` | Directory page | ✅ Built |
| `/quiz` | TRT symptom quiz | ✅ Built |
| `/glp1-quiz` | GLP-1 assessment quiz | ✅ Built |
| `/privacy` | Privacy policy | ✅ Built |
| `/terms` | Terms of service | ✅ Built |
| `/disclaimer` | Medical disclaimer | ✅ Built |
| `/book` | Booking form | ✅ Built |
| `/booking` | Alt booking page | ✅ Built |

### Checkout & Post-Booking (3)
| Route | Purpose | Status |
|-------|---------|--------|
| `/checkout` | Stripe checkout | ⚠️ Built, needs Stripe products |
| `/success` | Post-checkout | ✅ Built |
| `/book?session=[id]` | Calendly embed | ⚠️ Needs Calendly URL |

### Clinic Dashboard (7)
| Route | Purpose | Status |
|-------|---------|--------|
| `/clinic` | Dashboard home | ✅ Built |
| `/clinic/patients` | Patient list | ✅ Built |
| `/clinic/patients/[id]` | Patient detail | ✅ Built |
| `/clinic/alerts` | Clinical alerts | ✅ Built |
| `/clinic/tasks` | Task management | ✅ Built |
| `/clinic/settings` | Configuration | ✅ Built |
| `/clinic/layout.tsx` | Dashboard wrapper | ✅ Built |

---

## 4. Components (13)

| Component | Purpose |
|-----------|---------|
| Header.tsx | Navigation bar, logo, auth button |
| Footer.tsx | Links, social, copyright, disclaimers |
| LayoutShell.tsx | Main layout wrapper |
| EmailCapture.tsx | Email signup form |
| LeadPopup.tsx | Exit-intent/scroll popup |
| AttributionTracker.tsx | UTM/referrer tracking |
| PricingTable.tsx | Pricing comparison table |
| TreatmentPage.tsx | Reusable treatment page template |
| MedicalDirectorBio.tsx | Provider credentials display |
| SchemaMarkup.tsx | JSON-LD structured data |
| ui/Button.tsx | Button variants |
| ui/Card.tsx | Card container |
| ui/Section.tsx | Section wrapper with animations |

---

## 5. API Routes (10)

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/leads` | POST | Lead capture + multi-channel delivery | ✅ Functional |
| `/api/leads` | GET | Health check | ✅ Functional |
| `/api/checkout` | POST | Stripe session creation | ⚠️ Needs products |
| `/api/clinic/agents` | GET | Agent read API (12 actions) | ✅ Functional |
| `/api/clinic/n8n-webhook` | POST | n8n automation trigger | ✅ Functional |
| `/api/clinic/mcp` | POST | MCP tool access | ✅ Functional |
| `/api/clinic/notify` | POST | Alert routing | ✅ Functional |
| `/api/health` | GET | System health | ✅ Functional |
| `/api/session` | POST | Session management | ✅ Functional |
| `/api/verify-payment` | POST | Stripe webhook handler | ⚠️ Needs testing |

---

## 6. Claude Managed Agents (8)

| Agent | ID Variable | Purpose |
|-------|------------|---------|
| Qualifier | ANTHROPIC_AGENT_ID_QUALIFIER | Score leads 1–100, segment HOT/WARM/COLD |
| Clinical Intake | ANTHROPIC_AGENT_ID_CLINICAL | Structured intake, triage, contraindications |
| Content | ANTHROPIC_AGENT_ID_CONTENT | Personalized email/SMS sequences |
| Business Ops | ANTHROPIC_AGENT_ID_BIZOP | Emails, contracts, meeting notes, briefings |
| Outreach | ANTHROPIC_AGENT_ID_OUTREACH | Cold email sequences for B2B partnerships |
| Research | ANTHROPIC_AGENT_ID_RESEARCH | TRT/GLP-1/peptide research, content, SEO |
| Data | ANTHROPIC_AGENT_ID_DATA | GitHub triage, KPI tracking, monitoring |
| Service Ops | ANTHROPIC_AGENT_ID_SERVICE | Support routing, SLA tracking |

---

## 7. MCP Integrations (4)

| Server | Purpose | Config |
|--------|---------|--------|
| Obsidian | Knowledge base access | Vault: lofi-autopilot |
| Google Workspace | Gmail, Drive, Calendar, Docs, Sheets | Full suite |
| GoHighLevel | CRM, contacts, pipelines, campaigns | Location: EtuSnpCLjL9iAaorat63 |
| n8n | Workflow automation | Instance: novahealth.app.n8n.cloud |

---

## 8. Database Schema (12 Tables)

| Table | Purpose | PHI? |
|-------|---------|------|
| companies | Multi-tenant orgs | No |
| team_members | Staff with roles | No |
| assistant_messages | AI chat history | No |
| assistant_tasks | AI task tracking (vector-enabled) | No |
| compliance_checklists | Compliance tracking | No |
| document_templates | Doc templates | No |
| usage_analytics | Metrics | No |
| patients | Patient records | **Yes — Encrypted** |
| patient_labs | Lab results | **Yes** |
| patient_vitals | Vitals tracking | **Yes** |
| patient_intakes | Intake data | **Yes — Encrypted** |
| audit_logs | Immutable audit trail | Metadata only |

**Security:** AES-256-GCM encryption on medical_history, current_medications, symptoms_notes, contraindications. RLS policies enforce role-based access. 5 roles with 30+ permissions.

---

## 9. Design System

**Palette:**
- Primary: Graphite scale (graphite-50 to graphite-950) — dark backgrounds
- Accent: Nova/Silver scale (nova-50 to nova-900) — chrome highlights
- CTA: Ice blue (ice-400/500/600) — < 5% of surface area

**Typography:** Inter (body), Inter Tight (headings), JetBrains Mono (data)

**Effects:** Glass morphism (blur + transparency), gradient backgrounds, chrome text gradients, fade-in/slide-up animations

---

## 10. Lead Capture & Processing Flow

```
Web Form / Quiz / Popup / Email Capture
           ↓
    POST /api/leads
           ↓
    ┌──────┼──────┬──────────┐
    ↓      ↓      ↓          ↓
  GHL    n8n   Telegram   Email
 Upsert  Emit   Alert     Alert
    ↓      ↓
  Tags   Qualifier Agent
  Fields  (Score 1-100)
           ↓
    HOT / WARM / COLD
           ↓
  Pipeline Stage Assignment
           ↓
  Tailored Nurture Sequence
```

---

## 11. "Nova Health" / "Veldra" References (70 Files)

All references cataloged and ready for rename:
- 13 marketing page files
- 4 component files
- 5 API route files
- 8 config/type files
- 15 documentation files
- 8 platform code files
- 12 agent/marketing skill files
- 5 env/meta files

See `/Bloom-Metabolics/18_Legacy-Rename-Map/rename-map.md` for file-by-file replacement plan.

---

## 12. Automation Workflows (n8n)

4 main workflows configured:
1. **Lead Intake & Normalization** — Webhook → normalize → GHL → DB → Qualifier Agent
2. **Follow-up Sequence** — Qualified lead → Content Agent → SendGrid → tracking
3. **Booking → Clinical Intake** — Calendly webhook → GHL update → Clinical Intake Agent → tasks
4. **Alert Escalation** — Lab webhook → reference range check → alert generation → notifications

---

## 13. Platform Backend (Express)

- Entry: `/platform/src/index.ts`
- 5 BullMQ job queues (LEAD_INTAKE, LEAD_QUALIFY, OUTREACH_GENERATE, BOOKING_HANDOFF, DEAD_LETTER)
- Workflow engine with approval gates
- Agent registry managing all 8 Claude agents
- HMAC-verified webhook handlers
- Audit logging for all agent actions
- ~2,198 lines of backend code

---

## 14. Marketing Skills (35)

Full skill library at `.agents/skills/` covering: copywriting, CRO, SEO, content strategy, email sequences, cold email, paid ads, ad creative, social content, lead magnets, competitor analysis, pricing strategy, schema markup, launch strategy, referral programs, churn prevention, customer research, marketing psychology, analytics, A/B testing, form CRO, popup CRO, onboarding CRO, programmatic SEO, site architecture, copy editing, free tool strategy, RevOps, sales enablement, community marketing, marketing ideas, paywall upgrade CRO, product marketing context.
