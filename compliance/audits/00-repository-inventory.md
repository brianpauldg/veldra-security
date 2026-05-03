# Deliverable 1: Repository Inventory

## Pages (30)

| Page | Description | Compliance Issues |
|------|-------------|-------------------|
| `/` (app/page.tsx) | Homepage — hero, service cards (TRT + GLP-1), how-it-works, pricing, FAQ, CTA. Properly disclaimed. | #12 FTC health claims audit |
| `/trt` (app/trt/page.tsx) | TRT product page via TreatmentPage component. Uses "may support," "commonly report" language. Disclaimer present. | #2 GLP-1/marketing audit, #12 FTC |
| `/glp1` (app/glp1/page.tsx) | GLP-1 product page. References semaglutide/tirzepatide without branded names. Does NOT clarify compounded vs branded source. | #2 GLP-1 marketing (CRITICAL), #12 FTC |
| `/services` (app/services/page.tsx) | Two-service overview (TRT + GLP-1). "Patients commonly report 15-20% body weight reduction" — properly qualified. | #2, #12 |
| `/how-it-works` (app/how-it-works/page.tsx) | 4-step process page. Physician-led + RN-managed framing. No AI references. Clean. | #5 AB 3030 (clean) |
| `/pricing` (app/pricing/page.tsx) | $49 consultation, $249/mo TRT, $275/mo GLP-1. 7-day credit window documented. FAQ section. | #12 FTC |
| `/faq` (app/faq/page.tsx) | 5-category FAQ. GLP-1 medication options listed without branded names. Timelines properly qualified. | #2, #12 |
| `/about` (app/about/page.tsx) | Mission, values, team. Explicitly states "No guaranteed outcome promises." | Clean |
| `/contact` (app/contact/page.tsx) | Contact form POSTs to /api/contact. brian@bloommetabolics.com displayed. | #6 TCPA consent |
| `/privacy` (app/privacy/page.tsx) | Full HIPAA NPP. 10 sections. References OptiMantra, Stripe, lab partners as BAs. | #13 privacy/terms audit |
| `/terms` (app/terms/page.tsx) | ToS with CA-only geography, $49 refund policy, 7-day credit, verbal confirmation requirement. | #13, #11 CA gating |
| `/disclaimer` (app/disclaimer/page.tsx) | Medical disclaimer + FDA notice on compounded meds. Explicitly states "not FDA-approved drugs." | #13 (EXEMPLARY) |
| `/book` (app/book/page.tsx) | 4-field booking form → Stripe $49 checkout → intake redirect. Pre-selects service from URL param. | #6 TCPA, #8 PHI (email in URL) |
| `/booking` (app/booking/page.tsx) | Post-payment Calendly embed. | Clean |
| `/checkout` (app/checkout/page.tsx) | Redirect to /book. | Clean |
| `/success` (app/success/page.tsx) | Post-booking confirmation with next steps. | Clean |
| `/quiz` (app/quiz/page.tsx) | 12-question TRT self-assessment. "Educational purposes only" disclaimer. Saves result as lead. | #6 TCPA consent on email capture |
| `/glp1-quiz` (app/glp1-quiz/page.tsx) | 7-question GLP-1 eligibility screener. Proper disclaimers. MEN2/thyroid screening absent (that's in intake). | #6 TCPA |
| `/intake/trt` (app/intake/trt/page.tsx) | 7-step TRT intake wizard. Comprehensive symptom assessment, medical history, risks/consent, e-signature. Required field validation. | #8 PHI (form_data stored plaintext), #9 informed consent |
| `/intake/glp1` (app/intake/glp1/page.tsx) | 7-step GLP-1 intake wizard. BMI calculator, contraindication screening (MEN2, thyroid cancer boxed warning), prior GLP-1 use with compounded option explicitly separated. | #8 PHI, #9 informed consent (EXEMPLARY on contraindications) |
| `/peptides` (app/peptides/page.tsx) | `redirect('/trt')` — no content served. | #1 peptide removal (DONE) |
| `/clinic` (app/clinic/page.tsx) | Command center dashboard. KPIs from live Supabase data. Empty arrays for alerts/tasks/encounters (seed data removed). | #5 AB 3030, #18 AI agents |
| `/clinic/patients` (app/clinic/patients/page.tsx) | Patient roster with treatment type tabs (All/TRT/GLP-1/Peptide). Fetches from /api/clinic/patients. | #8 PHI access control |
| `/clinic/patients/[id]` (app/clinic/patients/[id]/page.tsx) | Full patient profile: intake data, billing panel, labs, vitals, meds, encounters, symptoms. Billing workflow with protocol call + manual payment approval. | #8 PHI, #18 AI review panel |
| `/clinic/alerts` (app/clinic/alerts/page.tsx) | Clinical alerts page. Empty state (no seed data). | #8 PHI |
| `/clinic/tasks` (app/clinic/tasks/page.tsx) | Task management. Empty state. | Clean |
| `/clinic/settings` (app/clinic/settings/page.tsx) | Team roster (Brian, Albert Aparisio, Mahshad Nejad), MCP status, notification prefs, security settings. | #5 AB 3030 (MCP reference) |
| `/clinic/login` (app/clinic/login/page.tsx) | Supabase Auth email+password login. No MFA. | #8 HIPAA access controls |
| `/vs/hims` (app/vs/hims/page.tsx) | Bloom vs Hims comparison. Unsubstantiated superiority claims. Testimonials without individual disclaimers. | #12 FTC (CRITICAL) |
| `/vs/roman` (app/vs/roman/page.tsx) | Bloom vs Ro comparison. Same FTC issues as Hims page. | #12 FTC (CRITICAL) |
| `/alternatives/best-online-trt-clinics` | Self-ranking as "#1 Our Pick." Unsubstantiated star ratings. Disclosure at bottom only. | #12 FTC (CRITICAL) |

## API Routes (16)

| Route | What It Does | Data Handled | External Services | Auth |
|-------|-------------|-------------|-------------------|------|
| `/api/checkout` | Creates Stripe checkout for $49 consultation. Routes to intake based on serviceInterest. | Email, name, phone, serviceInterest | Stripe | None (rate limited) |
| `/api/create-checkout-session` | Alternative checkout route supporting consultation/TRT/GLP-1 tiers. | Email, tier selection | Stripe | None |
| `/api/checkout-session-verify` | Verifies Stripe session, upserts profile in Supabase. | Stripe session ID, email | Stripe, Supabase | None |
| `/api/stripe-webhook` | Handles checkout.session.completed. Creates patient record + onboarding task. | Full checkout metadata (name, phone, serviceInterest) | Supabase | Stripe signature |
| `/api/leads` | Captures leads from forms/quizzes. Syncs to GHL CRM. | Name, email, phone, UTM params, gclid, fbclid, IP geo | Supabase, GHL | None |
| `/api/contact` | Saves contact form submissions. Rate limited (3/10min). | Name, email, phone, subject, message | Supabase | None (rate limited) |
| `/api/clients` | Legacy route for client management. | Client data | Supabase | Supabase RLS |
| `/api/intake` | GET: loads intake progress. POST: saves step data. | Full medical history, symptoms, medications (PHI) | Supabase | Session ID only |
| `/api/intake/complete` | Marks intake complete, creates patient record, creates onboarding task. | Signature, consent, full form_data | Supabase | Session ID only |
| `/api/clinic/patients` | GET: list/search patients. PATCH: update status/adherence. Includes intake data on detail view. | Full patient records + intake form data (PHI) | Supabase | **NONE** |
| `/api/clinic/billing` | POST: schedule_protocol_call, approve_and_invoice, start_subscription, cancel. GET: billing status. | Payment data, subscription status, patient email | Stripe, Supabase | **NONE** |
| `/api/clinic/agents` | REST API for Claude managed agents. 12 query actions. | Full patient data, labs, vitals, alerts, encounters | Supabase (via data-service) | Bearer token |
| `/api/clinic/mcp` | MCP tool server for Claude agents. Read + write operations. | Full clinical data. Can create alerts/tasks. | Supabase, notification services | Bearer token |
| `/api/clinic/ehr` | CharmEHR adapter. Push/pull patients, labs, encounters. Link patient to external EHR ID. | Full patient demographics, lab results, encounters | CharmEHR API, Supabase | **NONE** |
| `/api/clinic/n8n-webhook` | Receives n8n workflow events (new_patient, lab_result, intake_completed, refill_request). Creates tasks/alerts. Sends Telegram + email notifications. | Full patient objects, lab results, clinical details | Supabase, Telegram, Resend email | Bearer token |
| `/api/clinic/notify` | Push notification endpoint for browser/mobile. | Notification content (may contain patient names) | Browser Push API | Bearer token |

## Components (15)

| Component | Used In | Compliance Notes |
|-----------|---------|------------------|
| Header.tsx | LayoutShell (all public pages) | Navigation only. Clean. |
| Footer.tsx | LayoutShell (all public pages) | Legal links + email + Provider Login link. Clean. |
| LayoutShell.tsx | Root layout | Separates public/clinic layouts. Includes LeadPopup + AttributionTracker. |
| Meridian.tsx | Header, Footer, homepage | **Logo component ONLY** — NOT an AI chat widget. Pure CSS circles + "B" glyph. |
| PricingTable.tsx | /pricing, homepage | Renders consultation + TRT + GLP-1 pricing cards. |
| TreatmentPage.tsx | /trt, /glp1 | Reusable treatment page template with hero, benefits, process, FAQ, disclaimer. |
| MedicalDirectorBio.tsx | Homepage | **CRITICAL: `MEDICAL_DIRECTOR_LIVE = false`**. Shows placeholder "board-certified medical team" text. Physician credentials not filled. |
| EmailCapture.tsx | Homepage CTA, various | Email-only capture form. Posts to /api/leads. No explicit TCPA consent language. |
| LeadPopup.tsx | LayoutShell (exit-intent) | Exit-intent modal. Uses `nova_lead` localStorage key (old brand). No explicit consent language before capture. |
| AttributionTracker.tsx | LayoutShell | Captures UTM params, referrer, device, geo to sessionStorage. No PII. |
| SchemaMarkup.tsx | Various pages | JSON-LD structured data. Declares "MedicalBusiness" type. No license/NPI numbers. |
| IntakeWizard.tsx | /intake/trt, /intake/glp1 | Multi-step form wizard. Saves to Supabase. BeforeUnload warning. Required field validation. |
| Button.tsx | Throughout | UI component. |
| Card.tsx | Throughout | UI component. |
| Section.tsx | Throughout | UI component with framer-motion. |

## Key Libraries

| Library | Purpose | Key Exports | Compliance Notes |
|---------|---------|-------------|------------------|
| lib/pricing.ts | Central pricing config | CONSULTATION ($49), PROGRAMS (TRT $249/mo, GLP-1 $275/mo), helper functions | Source of truth for all displayed prices |
| lib/types.ts | Zod schemas + TypeScript types | leadCaptureSchema, contactFormSchema, consultationSchema, emailCaptureSchema | serviceInterest enum: 'trt', 'glp1', 'general' |
| lib/events.ts | Client-side event tracking | trackEvent() | Sends to /api/leads as side effect |
| lib/encryption.ts | AES-256-GCM encryption | encrypt(), decrypt(), hashSensitiveData(), generateSecureToken() | **NEVER IMPORTED OR USED ANYWHERE IN THE CODEBASE** |
| lib/clinic/data-service.ts | Data access layer | getPatientById(), getAllPatients(), getPatientSummary(), getAllAlerts(), getAllTasks() | Queries Supabase first, falls back to seed data if Supabase unavailable |
| lib/clinic/ehr-adapter.ts | CharmEHR integration | CharmEHRAdapter class with OAuth2 auth, patient/lab/encounter CRUD | Stub — requires CHARM_EHR_BASE_URL, CHARM_EHR_CLIENT_ID, CHARM_EHR_CLIENT_SECRET |
| lib/clinic/types.ts | Clinical type definitions | Patient, LabResult, Vital, Alert, Task, Medication, Encounter + LAB_REFERENCE_RANGES | Comprehensive clinical data model |
| lib/clinic/seed-data.ts | Demo/test data | SEED_PATIENTS (22), SEED_LABS, SEED_VITALS, etc. | Still imported in data-service.ts as fallback. Still imported in agents route for overview. |
| lib/clinic/mcp-adapter.ts | MCP tool definitions | mcpTools object, createNotification(), logAgentAction() | In-memory notification store |
| lib/clinic/audit.ts | Audit logging | logAudit(), getAuditLogs(), sanitizeForLog() | **In-memory only. 10K entry limit. Incomplete PHI redaction.** |
| middleware.ts | Request middleware | Rate limiting, security headers, CSP, HSTS, auth checks | Protected routes list references OLD Nova Health routes (/dashboard, /clients, /compliance) that DON'T EXIST. Actual /clinic/* routes NOT in protected list — rely on client-side auth in layout. |

## Auth Provider

- **Provider:** Supabase Auth (via `@supabase/auth-helpers-nextjs`)
- **Login:** Email + password only (app/clinic/login/page.tsx)
- **MFA:** Not implemented
- **Session timeout:** Not implemented (sessions persist indefinitely)
- **Role definitions:** `super_admin | physician | clinician | rn_ma | admin_ops` (lib/clinic/types.ts)
- **Role enforcement:** Client-side only (app/clinic/layout.tsx reads user_metadata.role). No server-side role checks on ANY API route.
- **Middleware gap:** middleware.ts protects `/dashboard, /clients, /compliance, /documents, /messaging, /settings` (OLD routes). Does NOT protect `/clinic/*` or `/api/clinic/*`.

## Database Schema

Four overlapping schema files exist:
1. **supabase-schema.sql** — Old Nova Health SaaS schema (companies, tasks, templates). Not used.
2. **supabase-clinic-schema.sql** — Primary clinical schema: clinics, team_members, patients, patient_labs, patient_vitals, patient_intakes, clinical_alerts, tasks, audit_logs, leads, prescriptions, check_ins. RLS enabled on all tables.
3. **supabase-patients-schema.sql** — Alternative patient schema (generated during our work). Adds treatment_type, ehr columns.
4. **supabase-intake-schema.sql** — intake_submissions table.

**PHI Encryption at Rest:**
- ENCRYPTED: medical_history_encrypted, current_medications_encrypted, symptoms_notes_encrypted, contraindications_encrypted (4 fields across 2 tables)
- **NOT ENCRYPTED:** patient names, emails, phones, DOBs, lab values, vital signs, prescriptions, check-in responses, intake form_data (JSONB), alert descriptions, task descriptions

## Test Coverage

**None.** No test files, no test config (Vitest, Jest, Playwright), no __tests__ directories.

## PHI Handling Patterns

- `lib/encryption.ts` exists with full AES-256-GCM implementation but is **never imported anywhere**
- `lib-encryption.ts` (root level) is a duplicate — also never imported by application code
- The 4 encrypted columns in supabase-clinic-schema.sql suggest encryption was planned but implementation stalled
- Intake form data stored as plaintext JSONB in intake_submissions.form_data
- Patient names, emails, DOBs stored plaintext in patients table
- Console.log statements in API routes log PHI (e.g., contact form: name, email, subject, message)

## Webhook Handlers

| Handler | Source | Auth | Data Disclosed |
|---------|--------|------|----------------|
| /api/stripe-webhook | Stripe | Stripe signature verification | Email, name, serviceInterest |
| /api/clinic/n8n-webhook | n8n workflows | Bearer token | Full patient objects, lab results, clinical details |
| /api/clinic/mcp | Claude agents | Bearer token | Full clinical data; can create alerts/tasks |

## Environment Variables

Referenced but potentially unset:
- `ENCRYPTION_KEY` — Required for lib/encryption.ts (which is never called)
- `SENDGRID_API_KEY` — Referenced in .env.example but no SendGrid SDK installed, not wired in code
- `CHARM_EHR_BASE_URL`, `CHARM_EHR_CLIENT_ID`, `CHARM_EHR_CLIENT_SECRET` — EHR adapter stub
- `UPSTASH_REDIS_REST_URL` — For persistent rate limiting (not implemented)
- `NOVA_AGENT_API_KEY` — Old brand name in .env.example

**Exposed in .mcp.json (committed to repo):**
- Google OAuth client secret
- GoHighLevel API key + location ID
