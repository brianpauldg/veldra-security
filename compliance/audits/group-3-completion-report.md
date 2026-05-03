# Group 3: Consent & Intake Compliance — Completion Report

## Pre-Tasks

### Vitest Framework — COMPLETE
- Installed: vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/jest-dom, jsdom, @vitest/coverage-v8
- Created: vitest.config.ts, tests/setup.ts, tests/helpers/factories.ts, tests/helpers/mocks.ts
- Added test scripts to package.json: test, test:run, test:coverage
- 3 smoke test files, 11 tests total — ALL PASSING

### Production ENCRYPTION_KEY Guard — COMPLETE
- lib/encryption.ts: Added module-level guard that throws FATAL error in production if ENCRYPTION_KEY is missing or invalid

## Issue 6: TCPA-Compliant Consent

### Files Created
| File | Purpose |
|------|---------|
| components/TCPAConsent.tsx | Reusable TCPA consent checkboxes (email + SMS) with versioned text |
| lib/consent-text.ts | Versioned consent strings v1.0.0 with SMS and email language |
| supabase/migrations/20260428_consent_records.sql | consent_records + out_of_state_waitlist + signed_consents tables |
| app/api/communications/opt-out/route.ts | Opt-out endpoint for SMS/email/all channels |
| app/unsubscribe/page.tsx | Public unsubscribe page with confirmation |

### Files Modified
| File | Change |
|------|--------|
| app/book/page.tsx | Added TCPAConsent component, consent validation before checkout |
| components/LeadPopup.tsx | Renamed nova_visits → bloom_visits, nova_lead → bloom_lead, nova_popup_dismissed → bloom_popup_dismissed |

### Consent Text (v1.0.0)
- SMS: Identifies Bloom Metabolics by name, frequency varies, rates may apply, STOP/HELP instructions, link to terms
- Email: Identifies Bloom Metabolics, unsubscribe at any time, link to privacy policy
- One-to-one specificity: no "and partners" carve-out

### Opt-Out
- POST /api/communications/opt-out: accepts email/phone + channel (sms/email/all)
- Idempotent: re-calling doesn't create duplicate revocations
- Returns success even if no records found (no existence leak)
- /unsubscribe page: public one-click unsubscribe with confirmation

## Issue 11: California State Gating

### Files Created
| File | Purpose |
|------|---------|
| config/eligible-states.ts | Single source of truth: ELIGIBLE_STATES = ['CA'], isEligibleState() helper |
| components/StateGate.tsx | State gate component: CA proceeds, non-CA shows waitlist signup |

### Files Modified
| File | Change |
|------|--------|
| app/intake/trt/page.tsx | Wrapped IntakeWizard in StateGate |
| app/intake/glp1/page.tsx | Wrapped IntakeWizard in StateGate |

### Behavior
- Patient selects state before starting intake
- CA: proceeds to intake wizard
- Non-CA: shows "We're not in [State] yet" with waitlist email capture
- Waitlist saves to out_of_state_waitlist table (email + state only, no PHI)
- "Select a different state" option to re-select

## Issue 9: Informed Consent Templates & Document System

### Files Created
| File | Purpose |
|------|---------|
| lib/clinic/consent-templates.ts | 3 versioned consent templates: TRT, GLP-1, Telehealth |
| app/api/clinic/consents/route.ts | GET (templates), POST (e-signature), PATCH (supersede) — all auth-gated |
| compliance/data-classification.md | Data classification: PHI, PII, marketing data |
| compliance/integrations/esignature-options.md | DocuSign vs SignNow vs in-house evaluation |

### Consent Templates
- **TRT v1.0**: Hypogonadism criteria, cardiovascular risk, fertility effects, polycythemia monitoring (>54% hold, >55% phlebotomy), prostate/PSA, stopping protocol, Schedule III acknowledgment, telehealth limitations. 
- **GLP-1 v1.0**: Compounded medication NOT FDA-approved disclosure, thyroid C-cell boxed warning, pancreatitis, gallbladder, gastroparesis, pregnancy contraindication, weight regain on stop, results vary.
- **Telehealth v1.0**: Nature of telehealth, limitations, technology requirements, emergency instructions (call 911), recording policy, privacy.
- All templates marked with `<!-- REQUIRES CLINICAL REVIEW -->` for physician partner review.

### Consent API
- GET /api/clinic/consents — retrieve templates (auth required)
- POST /api/clinic/consents — record e-signature with content hash (SHA-256) (auth required)
- PATCH /api/clinic/consents — supersede old consent with new version (auth required)

### E-Signature
- In-app signature pad (base64 PNG) — current implementation
- Content hash for integrity verification
- Upgrade path documented in esignature-options.md
- PDF generation deferred (requires @react-pdf/renderer — added to post-launch backlog)

## Database Migrations
SQL file created: supabase/migrations/20260428_consent_records.sql
- consent_records table (TCPA consent tracking)
- out_of_state_waitlist table (marketing data only)
- signed_consents table (informed consent e-signatures)
- All tables: RLS enabled, appropriate indexes

**HUMAN ACTION REQUIRED**: Run this SQL in Supabase SQL Editor before these features go live.

## Build Status
`npm run build` — **SUCCESS** (42/42 static pages, 0 errors)

## Test Status
`npm run test:run` — **11/11 PASSED** (3 test files)
- auth-middleware.test.ts: 3/3 passed
- phi-redaction.test.ts: 5/5 passed
- encryption.test.ts: 3/3 passed

## Human Action Items (Updated)

Added to /compliance/HUMAN-ACTION-REQUIRED.md:
1. Run supabase/migrations/20260428_consent_records.sql in Supabase SQL Editor
2. Physician partner must review consent template content (marked with <!-- REQUIRES CLINICAL REVIEW -->)
3. Generate and add UNSUBSCRIBE_SECRET to Vercel env vars
4. E-signature provider selection: DocuSign HIPAA / SignNow / in-house (see esignature-options.md)
5. Verify Supabase Storage BAA coverage for future PDF storage

## Files Summary

| Action | File |
|--------|------|
| CREATED | vitest.config.ts |
| CREATED | tests/setup.ts |
| CREATED | tests/helpers/factories.ts |
| CREATED | tests/helpers/mocks.ts |
| CREATED | tests/lib/clinic/auth-middleware.test.ts |
| CREATED | tests/lib/clinic/phi-redaction.test.ts |
| CREATED | tests/api/intake/encryption.test.ts |
| MODIFIED | package.json (devDeps + test scripts) |
| MODIFIED | lib/encryption.ts (production guard) |
| CREATED | components/TCPAConsent.tsx |
| CREATED | lib/consent-text.ts |
| CREATED | config/eligible-states.ts |
| CREATED | components/StateGate.tsx |
| CREATED | lib/clinic/consent-templates.ts |
| CREATED | supabase/migrations/20260428_consent_records.sql |
| CREATED | app/api/clinic/consents/route.ts |
| CREATED | app/api/communications/opt-out/route.ts |
| CREATED | app/unsubscribe/page.tsx |
| CREATED | compliance/data-classification.md |
| CREATED | compliance/integrations/esignature-options.md |
| MODIFIED | app/book/page.tsx (TCPAConsent added) |
| MODIFIED | app/intake/trt/page.tsx (StateGate added) |
| MODIFIED | app/intake/glp1/page.tsx (StateGate added) |
| MODIFIED | components/LeadPopup.tsx (nova_ → bloom_ keys) |
