# Deliverable 4: Conflict and Risk Register

## CRITICAL CONFLICTS

### C1: Clinic API Routes Have ZERO Authentication
**Files:** app/api/clinic/patients/route.ts, app/api/clinic/billing/route.ts, app/api/clinic/ehr/route.ts
**Issue:** These three endpoints handle the most sensitive data in the system (full patient records, payment operations, EHR sync) and have NO authentication whatsoever. Any HTTP client can:
- `GET /api/clinic/patients` — retrieve the full patient roster with names, emails, treatment types
- `PATCH /api/clinic/patients` — modify any patient's status, adherence, notes
- `POST /api/clinic/billing` — start subscriptions, send invoices, cancel subscriptions for any patient
- `POST /api/clinic/ehr` — push patient data to external EHR, link patients to external records
**Risk:** Full patient data breach. Financial fraud. Unauthorized EHR modifications.
**Conflict with:** HIPAA Access Controls (45 CFR § 164.312(a)), launch readiness

### C2: lib/encryption.ts Is Never Used
**Files:** lib/encryption.ts (104 lines of AES-256-GCM), lib-encryption.ts (duplicate at root)
**Issue:** Two complete encryption libraries exist but are NEVER imported by any application code. The supabase-clinic-schema.sql defines 4 `*_encrypted` columns (medical_history_encrypted, current_medications_encrypted, symptoms_notes_encrypted, contraindications_encrypted), but the application never calls encrypt() before writing or decrypt() after reading. These columns are either empty or contain plaintext despite the column name.
**Risk:** False sense of security. Schema implies encryption; code doesn't deliver it.
**Conflict with:** HIPAA Encryption Requirements (45 CFR § 164.312(a)(2)(iv))

### C3: middleware.ts Protects Routes That Don't Exist
**File:** middleware.ts lines 6-17
**Issue:** Protected routes list includes `/dashboard, /clients, /compliance, /documents, /messaging, /settings` and their API counterparts. These are OLD Nova Health routes that were never built in this codebase. The ACTUAL clinic routes (`/clinic/*`, `/api/clinic/*`) are NOT in the protected list.
**Risk:** All clinic API routes are unprotected at the middleware level. Client-side auth in layout.tsx only protects page renders, not API calls.
**Conflict with:** HIPAA Access Controls, basic security posture

### C4: Seed Data Falls Back in Production
**File:** lib/clinic/data-service.ts
**Issue:** If Supabase connection fails (env var corruption, service outage), data-service.ts falls back to SEED_PATIENTS, SEED_LABS, etc. Production would serve 22 fake patients with realistic names and demographics. The agents API route (app/api/clinic/agents/route.ts) still directly imports SEED_PATIENTS for the overview action.
**Risk:** Fake clinical data served as real in production. Agent responses based on fake data.
**Conflict with:** Data integrity, clinical safety

### C5: .mcp.json Contains Real API Keys
**File:** .mcp.json (committed to git)
**Issue:** Contains plaintext Google OAuth client secret (`GOCSPX-...`) and GoHighLevel API key (`pit-649cd3f0-...`) with location ID. This file is in the git repository.
**Risk:** Credential exposure. Anyone with repo access can impersonate the Google OAuth client or access the GHL CRM account.
**Conflict with:** Security best practices, credential management

## HIGH-SEVERITY RISKS

### H1: Email in Checkout Redirect URL
**File:** app/api/checkout/route.ts line 27
```typescript
url: `...${intakePath}?session=demo&email=${encodeURIComponent(data.email)}`
```
**Issue:** Patient email address passed as URL parameter in the demo mode redirect. URL parameters are logged in browser history, server access logs, and analytics.
**Risk:** PHI (email associated with healthcare service) exposed in URL.
**Conflict with:** HIPAA Minimum Necessary, PHI exposure

### H2: Console.log Statements Leak PHI
**Files:**
- app/api/contact/route.ts line 53: logs `name, email, subject, message`
- app/api/stripe-webhook/route.ts line 85: logs `Patient created for ${email} (${treatmentType})`
- app/api/clinic/n8n-webhook/route.ts: logs patient names in notification messages
**Risk:** PHI written to Vercel server logs (retained 30 days by default).
**Conflict with:** HIPAA Minimum Necessary, audit log controls

### H3: MedicalDirectorBio.tsx Has Placeholder Credentials
**File:** components/MedicalDirectorBio.tsx line 13
```typescript
const MEDICAL_DIRECTOR_LIVE = false
```
**Issue:** Medical director component shows placeholder text "[TODO] Dr. [Full Name], MD" when `MEDICAL_DIRECTOR_LIVE` is false. Currently false in production. The homepage renders this component.
**Risk:** Patients may see placeholder medical credentials. LegitScript will flag this.
**Conflict with:** #14 LegitScript readiness, professional credentialing requirements

### H4: LeadPopup Uses `nova_lead` localStorage Key
**File:** components/LeadPopup.tsx line 50
**Issue:** localStorage key `nova_lead` is from old brand. If the Nova Health domain ever serves from the same origin, lead state would cross-contaminate.
**Risk:** Low (brand migration artifact). Easy fix.
**Conflict with:** Brand consistency

### H5: GLP-1 Product Page Does Not Disclose Compounded Source
**File:** app/glp1/page.tsx
**Issue:** Page references "semaglutide or tirzepatide" without disclosing that these are compounded medications, not branded Ozempic/Wegovy/Mounjaro/Zepbound. The disclaimer page discloses this but the product page itself does not.
**Risk:** FDA March 2026 telehealth warning letters specifically target obscuring compounder identity. Patient may assume they're receiving branded medication.
**Conflict with:** #2 FDA April 2026 compliance, FDA March 2026 warning letters

### H6: Stripe Integration Assumptions Complicate Payment Abstraction
**Files:** All 5 Stripe-related API routes
**Issue:** Stripe is deeply integrated with:
- Direct Stripe SDK calls in 5 separate route files
- Stripe checkout session IDs used as access tokens for intake forms
- Stripe customer IDs stored in patient records
- Stripe webhook handling coupled to patient creation logic
- Stripe coupon creation for $49 credit
- Stripe invoice finalization + pay workflows

Abstracting to a different payment processor (Corepay/PaymentCloud) requires:
1. New payment provider interface
2. Migrating session-based access control (currently Stripe session IDs)
3. Customer ID mapping between processors
4. Invoice/receipt generation outside Stripe
5. Webhook handler refactoring
**Risk:** Payment abstraction is a LARGE effort, not a simple swap. Stripe works — migration should be planned carefully.
**Conflict with:** #3 high-risk merchant abstraction (effort larger than initially estimated)

### H7: No Duplicate Prevention on Stripe Webhook
**File:** app/api/stripe-webhook/route.ts
**Issue:** If Stripe retries a webhook (common on network timeout), the handler will create a duplicate patient record. No idempotency check exists.
**Risk:** Duplicate patient records in Supabase. Duplicate onboarding tasks.

### H8: Intake Form Data Stored as Plaintext JSONB
**File:** supabase-intake-schema.sql — `form_data JSONB DEFAULT '{}'`
**Issue:** intake_submissions.form_data contains full medical history, symptom assessments, medication lists, contraindication screening results — all stored as plaintext JSON in Supabase. This is the most sensitive data in the system.
**Risk:** Database breach exposes complete patient health histories.
**Conflict with:** HIPAA Encryption at Rest requirements

## MEDIUM-SEVERITY RISKS

### M1: In-Memory Rate Limiting Doesn't Survive Restarts
**Files:** middleware.ts, app/api/checkout/route.ts, app/api/contact/route.ts
**Issue:** All rate limiting uses JavaScript `Map` objects. On Vercel, each serverless function invocation may be a new instance, and Maps are not shared across instances.
**Risk:** Rate limiting is effectively non-functional on Vercel's serverless architecture. Attacker can send unlimited requests.

### M2: Audit Logging Is In-Memory and Incomplete
**File:** lib/clinic/audit.ts
**Issue:** Audit log stored in memory with 10,000 entry limit. Lost on server restart. sanitizeForLog() only redacts 6 field names (ssn, password, etc.) — misses email, phone, name, DOB, medical data.
**Risk:** Audit trail lost on every deployment. PHI in audit log entries.
**Conflict with:** HIPAA Audit Controls (45 CFR § 164.312(b))

### M3: EHR Adapter Targets CharmEHR, Not OptiMantra
**File:** lib/clinic/ehr-adapter.ts
**Issue:** Adapter class is `CharmEHRAdapter` with Charm-specific API paths. Per launch parameters, OptiMantra is the EHR system of record, not CharmEHR.
**Risk:** EHR integration is non-functional. CharmEHR API calls will fail since OptiMantra endpoints differ.
**Conflict with:** #17 OptiMantra integration

### M4: Third-Party Scripts on All Pages
**File:** app/layout.tsx lines 49-96
**Issue:** Meta Pixel and GA4 scripts load on ALL pages including intake forms and clinic dashboard (when accessed without clinic layout). These scripts can observe page content and URL parameters.
**Risk:** Third-party tracking scripts on pages handling PHI. Meta/Google may receive health-related page visit data.
**Recommendation:** Exclude analytics scripts from /intake/* and /clinic/* routes.

### M5: n8n Webhook Sends Full Patient Objects to Telegram
**File:** app/api/clinic/n8n-webhook/route.ts
**Issue:** Various webhook handlers send patient names and clinical details to Telegram chat and Resend email. No data minimization.
**Risk:** PHI disclosed to messaging platforms without BAA.

### M6: GHL Lead Sync Combines Health Data with Ad Tracking IDs
**File:** app/api/leads/route.ts
**Issue:** serviceInterest (trt/glp1) is sent to GHL alongside gclid (Google click ID) and fbclid (Facebook click ID). This links a patient's health interest to their advertising profile.
**Risk:** Health data combined with ad platform identifiers. Potential HIPAA/CMIA violation if GHL doesn't have BAA.

## ARCHITECTURAL IMPLICATIONS

### A1: Single Supabase Project for Everything
All data — marketing leads, patient records, intake forms, clinical tasks, audit logs — lives in one Supabase project. No data isolation between public-facing and clinical-facing data.

**Recommendation:** Acceptable for launch at current scale. At scale, consider separate Supabase projects for marketing (leads, contacts) vs clinical (patients, labs, prescriptions) with cross-project references.

### A2: No CI/CD Pipeline
No GitHub Actions, no Vercel build checks, no automated testing. Deployments are manual via `npx vercel --prod`.

**Recommendation:** Add basic CI before scaling: lint, type-check, build validation. Not blocking for launch.

### A3: Multiple Overlapping Schema Files
Four SQL files define overlapping table structures:
- supabase-schema.sql (old Nova Health)
- supabase-clinic-schema.sql (primary)
- supabase-patients-schema.sql (generated during work)
- supabase-intake-schema.sql (intake)

Some tables (patients, alerts, tasks) may have been created from different schemas, causing column name inconsistencies. The data-service.ts maps multiple column name patterns (e.g., `current_protocol || primary_protocol`, `risk_score || churn_risk_score`, `last_check_in || last_visit_date`).

**Recommendation:** Consolidate into one canonical schema file. Verify live Supabase tables match expectations with `SELECT column_name FROM information_schema.columns`.
