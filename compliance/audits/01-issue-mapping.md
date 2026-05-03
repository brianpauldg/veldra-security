# Deliverable 2: Issue-by-Issue Mapping

## Issue 1: Peptide Marketing Removal
**Status:** EXISTS — patch only
**Surface:** /peptides redirects to /trt. All public-facing peptide references removed in April 24-25 work. Remaining refs only in: lib/clinic/types.ts (ProtocolType enum), lib/clinic/seed-data.ts (test data), lib/agents.ts (internal agent prompts), clinic dashboard treatment filter tab label.
**Files to modify:** None for launch — internal references are acceptable
**Files to create:** If coming-soon page desired: app/peptides/page.tsx (replace redirect with holding page)
**Diff size:** Small
**Notes:** Peptide removal is COMPLETE for public-facing site. No further action needed unless FDA PCAC status changes.

## Issue 2: GLP-1 Marketing Audit (FDA April 2026)
**Status:** PARTIAL — patch + add
**Surface:**
- app/glp1/page.tsx — Does NOT clarify compounded vs branded medication source. No "patient-specific medical necessity" language. No compounder identity disclosure.
- app/disclaimer/page.tsx — EXEMPLARY: explicitly states "Compounded medications are not FDA-approved drugs"
- app/intake/glp1/page.tsx — EXEMPLARY: separates "Compounded semaglutide or tirzepatide" from branded in prior-use question
- app/terms/page.tsx — Does NOT mention compounded medications
- app/faq/page.tsx — Lists "semaglutide or tirzepatide" without clarifying compounded
- app/pricing/page.tsx — No medication source disclosure
- app/services/page.tsx — Same gap
**Files to modify:** app/glp1/page.tsx, app/faq/page.tsx, app/services/page.tsx, app/terms/page.tsx
**Files to create:** None
**Diff size:** Medium
**Key requirements:**
1. All GLP-1 pages must state medications are compounded (not branded Ozempic/Wegovy/Mounjaro/Zepbound)
2. No language suggesting equivalence to branded products
3. Compounder identity should not be obscured
4. "Patient-specific medical necessity" documentation is Issue #4 (separate)

## Issue 3: High-Risk Merchant Payment Abstraction
**Status:** PARTIAL — patch + add
**Surface:** Stripe is deeply integrated:
- app/api/checkout/route.ts — Stripe checkout session creation
- app/api/create-checkout-session/route.ts — Alternative checkout with tier mapping
- app/api/stripe-webhook/route.ts — Webhook handler
- app/api/clinic/billing/route.ts — Subscription/invoice management (6 actions)
- app/api/checkout-session-verify/route.ts — Session verification
- lib/pricing.ts — Price IDs mapped to env vars
**Files to modify:** All 5 Stripe routes (wrap in abstraction)
**Files to create:** lib/payments/provider.ts (abstraction interface), lib/payments/stripe.ts (current implementation), lib/payments/corepay.ts (stub for high-risk processor)
**Diff size:** Large
**Dependencies:** None
**Notes:** Stripe integration is functional. Abstraction adds a provider interface so Corepay/PaymentCloud/Easy Pay Direct can be swapped in without changing checkout flows. NOT urgent for launch — Stripe works. Migration is controlled.

## Issue 4: Patient-Specific Medical Necessity Documentation
**Status:** NET-NEW — full build
**Surface:** Nothing exists. Required for compounded GLP-1 prescriptions under FDA April 2026 rule.
**Files to create:**
- app/clinic/rx-justification/page.tsx (clinician-facing form)
- app/api/clinic/rx-justification/route.ts (API for CRUD)
- lib/clinic/rx-justification-schema.ts (Zod schema)
- Supabase migration: rx_justifications table
**Diff size:** Large
**Dependencies:** #17 OptiMantra integration (justification should sync to EHR)
**Notes:** Prescriber must document per-patient medical necessity for compounded semaglutide/tirzepatide. Should capture: why branded is not appropriate, clinical rationale, patient-specific factors. Must be tied to patient record and prescription.

## Issue 5: AB 3030 GenAI Disclaimers
**Status:** PARTIAL — patch + add
**Surface:**
- Meridian component is a LOGO, not AI chat — no AB 3030 implication
- app/api/clinic/agents/route.ts — Claude agent API. 12 query actions. Bearer auth. No AB 3030 disclaimer.
- app/api/clinic/mcp/route.ts — MCP tool server. Claude agents can create alerts/tasks. No human-review gate. No AB 3030 disclosure.
- app/clinic/patients/[id]/page.tsx line ~276 — Shows "AI outputs are review support — not clinical decisions" (GOOD but insufficient for AB 3030)
- app/clinic/settings/page.tsx — Shows "MCP Agents: Connected — 3 active" status
**Files to modify:** app/api/clinic/agents/route.ts (add disclaimer header to responses), app/api/clinic/mcp/route.ts (add human-review gate before write operations), app/clinic/patients/[id]/page.tsx (strengthen AB 3030 disclosure)
**Files to create:** lib/clinic/ab3030-disclaimer.ts (standardized disclaimer text), components/clinic/AIDisclosure.tsx (reusable disclosure component)
**Diff size:** Medium
**Notes:** AB 3030 requires clear disclosure when GenAI is used in clinical communications. Agent-generated alerts/tasks/insights must be labeled as AI-generated. Write operations (create alert, create task) should require human confirmation before execution.

## Issue 6: TCPA-Compliant Consent on Lead Intake
**Status:** PARTIAL — patch + add
**Surface:**
- components/EmailCapture.tsx — Email capture with NO explicit consent language
- components/LeadPopup.tsx — Exit-intent popup with email capture. No TCPA consent checkbox. Uses `nova_lead` localStorage key (old brand).
- app/book/page.tsx — Booking form collects phone. No TCPA consent checkbox for SMS/voice.
- app/quiz/page.tsx — Captures email after quiz. No consent language.
- app/glp1-quiz/page.tsx — Captures email + phone. No consent language.
- app/contact/page.tsx — Contact form. No marketing consent.
**Files to modify:** All 6 files above — add TCPA consent checkbox with proper one-to-one specificity language
**Files to create:** components/TCPAConsent.tsx (reusable consent checkbox component), lib/consent-text.ts (centralized consent language)
**Diff size:** Medium
**Dependencies:** #7 A2P 10DLC (consent feeds into SMS compliance)

## Issue 7: A2P 10DLC + CAN-SPAM Email/SMS Infrastructure
**Status:** PARTIAL — patch + add
**Surface:**
- Email: SendGrid API key in .env.example but NO SendGrid SDK installed. /api/contact saves to DB but does NOT send email. No email templates.
- SMS: No SMS infrastructure at all. No Twilio/MessageBird SDK.
- Consent: No consent tracking table or mechanism.
**Files to modify:** package.json (add SendGrid SDK)
**Files to create:** lib/email/sendgrid.ts (email service), lib/sms/twilio.ts (SMS stub), Supabase migration: communication_consents table, communication_logs table
**Diff size:** Large
**Dependencies:** #6 TCPA consent (consent records feed into send authorization)

## Issue 8: HIPAA / CMIA PHI Flow Audit and Redaction
**Status:** PARTIAL — patch + add (CRITICAL)
**Surface:**
- lib/encryption.ts EXISTS with full AES-256-GCM but is **NEVER IMPORTED OR USED ANYWHERE**
- PHI stored plaintext: patient names, emails, DOBs, lab values, vitals, prescriptions, check-in responses, intake form_data
- Only 4 fields encrypted (medical_history_encrypted, current_medications_encrypted, symptoms_notes_encrypted, contraindications_encrypted) — in schema only, application doesn't call encrypt()
- Console.log statements leak PHI: app/api/contact/route.ts logs name/email/message, n8n-webhook logs patient names in notifications
- Email in URL: app/api/checkout/route.ts passes `email=` in redirect URL
- /api/clinic/patients has NO AUTH — full patient roster publicly accessible
- /api/clinic/billing has NO AUTH — payment data publicly accessible
- /api/clinic/ehr has NO AUTH — EHR sync operations publicly accessible
- lib/clinic/audit.ts: sanitizeForLog() only redacts ['ssn', 'socialSecurity', 'password', 'token', 'secret', 'creditCard'] — misses email, phone, name, DOB, medical data
- middleware.ts protects OLD routes (/dashboard, /clients) not CURRENT routes (/clinic/*)
**Files to modify:** middleware.ts (protect /api/clinic/*), all /api/clinic/ routes (add auth), lib/clinic/audit.ts (expand redaction), app/api/checkout/route.ts (remove email from URL), app/api/contact/route.ts (remove console.log of PHI)
**Files to create:** lib/clinic/phi-redaction.ts (standardized redaction), middleware auth for clinic routes
**Diff size:** Large
**Dependencies:** None — MUST be done first

## Issue 9: Informed Consents (TRT, GLP-1, Telehealth)
**Status:** PARTIAL — patch only
**Surface:**
- TRT consent: EXISTS in app/intake/trt/page.tsx Step 7. Comprehensive risks (9 items), benefits (6 items), 3 consent checkboxes, e-signature. GOOD.
- GLP-1 consent: EXISTS in app/intake/glp1/page.tsx Step 7. Comprehensive risks (9 items including boxed warning), benefits (7 items), contraindication alerts (MEN2, thyroid cancer), 3 consent checkboxes, e-signature. EXEMPLARY.
- Telehealth consent: EXISTS as checkbox in both intake forms ("I consent to receiving medical care via telehealth and understand the limitations of telemedicine").
- **GAP:** Consents are embedded in intake wizard — no standalone consent document that can be printed/downloaded/shared with OptiMantra.
**Files to modify:** None urgently
**Files to create:** app/api/clinic/consents/route.ts (generate downloadable consent PDF), lib/clinic/consent-templates.ts (standardized consent text for TRT, GLP-1, telehealth)
**Diff size:** Medium
**Dependencies:** #17 OptiMantra (consents should sync to EHR chart)

## Issue 10: CURES California PDMP Workflow
**Status:** NET-NEW — full build
**Surface:** Nothing exists. TRT is Schedule III — California CURES query required before prescribing.
**Files to create:**
- app/clinic/cures/page.tsx (CURES attestation interface)
- app/api/clinic/cures/route.ts (attestation recording)
- Supabase migration: cures_attestations table
- lib/clinic/cures-schema.ts
**Diff size:** Large
**Dependencies:** #17 OptiMantra (CURES integrated via DoseSpot in OptiMantra)
**Notes:** Per launch parameters, DoseSpot (inside OptiMantra) handles eRx and CURES. The Bloom dashboard needs an attestation workflow confirming the prescriber checked CURES before writing TRT. This is a documentation/compliance gate, not a direct PDMP API integration.

## Issue 11: California State-of-Residence Gating in Intake
**Status:** PARTIAL — patch only
**Surface:**
- app/terms/page.tsx — States "currently provides services to patients residing in California"
- app/intake/trt/page.tsx Step 1 — Has state dropdown with ALL 50 states
- app/intake/glp1/page.tsx Step 1 — Same: all 50 states available
- app/book/page.tsx — No state field at all
- No server-side gating — a patient in Texas can complete intake and book consultation
**Files to modify:** app/intake/trt/page.tsx (restrict state dropdown or add validation), app/intake/glp1/page.tsx (same), optionally app/book/page.tsx (add state field with CA gate)
**Files to create:** None
**Diff size:** Small

## Issue 12: FTC Health Claims Audit
**Status:** EXISTS — patch only (CRITICAL on competitor pages)
**Surface:**
- app/vs/hims/page.tsx — Unsubstantiated superiority claims ("more hands-on experience," "depth and personalization"), testimonials without individual disclaimers, biased comparison framing
- app/vs/roman/page.tsx — Same issues: unsubstantiated comparative claims, testimonial outcome claims ("Within 6 weeks I felt noticeably better")
- app/alternatives/best-online-trt-clinics/page.tsx — WORST: self-ranking as "#1 Our Pick," unsubstantiated star ratings, "Bloom Metabolics produced this comparison" disclosure buried at bottom
- Marketing pages (/trt, /glp1, /services, /faq) — Generally COMPLIANT with "may support," "commonly report," "results vary" language
**Files to modify:** app/vs/hims/page.tsx, app/vs/roman/page.tsx, app/alternatives/best-online-trt-clinics/page.tsx
**Files to create:** None
**Diff size:** Medium

## Issue 13: Privacy Policy, Terms, NPP, Cookie, Accessibility
**Status:** EXISTS — patch only
**Surface:**
- /privacy — Full HIPAA NPP. 10 sections. COMPLIANT.
- /terms — ToS with CA geography, refund policy. COMPLIANT. Missing compounded medication disclosure.
- /disclaimer — Medical + FDA disclaimer. EXEMPLARY.
- Cookie banner — MISSING. No cookie consent mechanism despite using analytics cookies (GA4, Meta Pixel env vars configured).
- Accessibility — No a11y audit performed. No skip-navigation links. No ARIA labels audited.
**Files to modify:** app/terms/page.tsx (add compounded medication disclosure)
**Files to create:** components/CookieBanner.tsx, app/accessibility/page.tsx (accessibility statement)
**Diff size:** Medium

## Issue 14: LegitScript-Readiness Documentation Packet
**Status:** NET-NEW — full build
**Surface:** Nothing exists. LegitScript application in flight per launch parameters.
**Files to create:** compliance/legitscript/ directory with:
- business-information.md
- product-service-description.md
- regulatory-compliance.md
- website-content-review.md
- physician-credentials.md
- pharmacy-credentials.md
**Diff size:** Medium (documentation, not code)
**Dependencies:** #2 GLP-1 marketing audit (LegitScript reviews website content), #9 informed consents, #13 legal pages

## Issue 15: Clinical SOPs (Skeleton)
**Status:** NET-NEW — full build
**Surface:** Bloom-Metabolics/14_SOPs/sop-index.md exists as a planning document but no actual SOP content. No SOPs in the application.
**Files to create:** compliance/sops/ directory with skeletons:
- prescribing-protocol-trt.md
- prescribing-protocol-glp1.md
- patient-intake-workflow.md
- lab-review-protocol.md
- adverse-event-reporting.md
- refill-authorization.md
- telehealth-consultation.md
**Diff size:** Medium (documentation)

## Issue 16: HIPAA Policies (Skeleton)
**Status:** NET-NEW — full build
**Surface:** No HIPAA policy documents exist in the codebase.
**Files to create:** compliance/hipaa-policies/ directory:
- privacy-policy-internal.md
- security-policy.md
- breach-notification-plan.md
- business-associate-management.md
- workforce-training.md
- access-control-policy.md
- audit-control-policy.md
- device-media-controls.md
**Diff size:** Medium (documentation)

## Issue 17: OptiMantra Integration Layer
**Status:** PARTIAL — patch + add
**Surface:**
- lib/clinic/ehr-adapter.ts EXISTS — CharmEHRAdapter class with OAuth2, patient/lab/encounter CRUD
- app/api/clinic/ehr/route.ts EXISTS — 6 EHR actions (push_patient, link, push_labs, pull_labs, push_encounter, pull_encounters)
- **PROBLEM:** Adapter targets CharmEHR, NOT OptiMantra. Per launch parameters, OptiMantra is the EHR system of record.
- Adapter is a stub — requires CHARM_EHR_BASE_URL env vars that aren't set
**Files to modify:** lib/clinic/ehr-adapter.ts (rename/refactor for OptiMantra API), app/api/clinic/ehr/route.ts (update actions for OptiMantra endpoints)
**Files to create:** lib/clinic/optimantra-adapter.ts (if building separate adapter), compliance/integrations/optimantra-integration-spec.md
**Diff size:** Large
**Notes:** OptiMantra API differs from CharmEHR. DoseSpot (inside OptiMantra) handles eRx and CURES. The adapter needs to be rewritten or a new OptiMantra-specific adapter created. The existing abstraction pattern (getEHRAdapter factory) is good — just pointed at the wrong provider.

## Issue 18: AI Agents AB 3030 + Human-Review Gates
**Status:** PARTIAL — patch + add
**Surface:**
- app/api/clinic/agents/route.ts — 12 read-only query actions for Claude agents. Bearer token auth. No AB 3030 headers. Returns raw clinical data without disclaimers.
- app/api/clinic/mcp/route.ts — MCP tool server. Claude agents can CREATE alerts and tasks (write operations) WITHOUT human review gate. Bearer token auth.
- app/clinic/patients/[id]/page.tsx — AI review panel shows "AI outputs are review support — not clinical decisions" but this is a static label, not a functional gate.
- lib/clinic/mcp-adapter.ts — Defines 11 MCP tools including write operations (create_alert, create_task, update_alert_status). No confirmation step.
**Files to modify:** app/api/clinic/mcp/route.ts (add human-review confirmation for write operations), app/api/clinic/agents/route.ts (add AB 3030 disclosure header)
**Files to create:** lib/clinic/ab3030-gates.ts (human-review confirmation logic), components/clinic/AIDisclosure.tsx
**Diff size:** Medium
**Dependencies:** #5 AB 3030 disclaimers (shared infrastructure)
