# Deliverable 5: Compliance Remediation Plan

## Execution Groups

### Group 1 (Prompt 1): Security & PHI Hardening — Issues 8, 3 (partial), C1-C5
**Priority: BLOCKING — must complete before any patient data**

| Issue | Status | Files to Modify | Files to Create | Diff | Effort |
|-------|--------|----------------|-----------------|------|--------|
| #8 HIPAA/PHI | PARTIAL | middleware.ts (add /clinic/* to protected routes), app/api/clinic/patients/route.ts (add auth), app/api/clinic/billing/route.ts (add auth), app/api/clinic/ehr/route.ts (add auth), app/api/checkout/route.ts (remove email from URL), app/api/contact/route.ts (remove console.log PHI), lib/clinic/audit.ts (expand redaction list) | lib/clinic/auth-middleware.ts (reusable auth check), lib/clinic/phi-redaction.ts | Large | Large |
| C1 (no auth) | Covered by #8 above | | | | |
| C2 (encryption unused) | PARTIAL | app/api/intake/route.ts (encrypt form_data), app/api/intake/complete/route.ts (encrypt on write) | None — lib/encryption.ts already exists | Medium | Medium |
| C3 (wrong middleware routes) | EXISTS | middleware.ts (replace old routes with /clinic/*, /api/clinic/*) | None | Small | Small |
| C4 (seed data fallback) | EXISTS | lib/clinic/data-service.ts (remove fallback, fail securely), app/api/clinic/agents/route.ts (remove SEED_PATIENTS import) | None | Small | Small |
| C5 (.mcp.json secrets) | EXISTS | .mcp.json (remove secrets, use env refs), .gitignore (add .mcp.json) | None | Small | Small |
| H1 (email in URL) | EXISTS | app/api/checkout/route.ts line 27 (remove email param) | None | Small | Small |
| H2 (console.log PHI) | EXISTS | app/api/contact/route.ts, app/api/stripe-webhook/route.ts, app/api/clinic/n8n-webhook/route.ts | None | Small | Small |
| H7 (webhook idempotency) | PARTIAL | app/api/stripe-webhook/route.ts (add idempotency check on session ID) | None | Small | Small |

**Dependencies:** None — this is the foundation.
**Estimated total diff:** ~400 lines changed, ~100 lines new
**Order:** Fix middleware → add auth to clinic APIs → remove PHI from logs/URLs → add encryption to intake → remove seed fallback → fix .mcp.json

---

### Group 2 (Prompt 2): Marketing Compliance — Issues 2, 12, 1, 13
**Priority: HIGH — LegitScript and FDA readiness**

| Issue | Status | Files to Modify | Files to Create | Diff | Effort |
|-------|--------|----------------|-----------------|------|--------|
| #2 GLP-1 FDA | PARTIAL | app/glp1/page.tsx (add compounded disclosure), app/faq/page.tsx (clarify compounded), app/services/page.tsx (add disclosure), app/terms/page.tsx (add compounded language) | None | Medium | Small |
| #12 FTC claims | EXISTS | app/vs/hims/page.tsx (qualify claims, add per-testimonial disclaimers, add methodology), app/vs/roman/page.tsx (same), app/alternatives/best-online-trt-clinics/page.tsx (add advertorial disclosure at top, qualify ratings, substantiate or remove star system) | None | Medium | Medium |
| #1 Peptides | EXISTS | None — already done. Verify /peptides redirect works. | Optional: app/peptides/page.tsx (coming-soon page instead of redirect) | Small | Small |
| #13 Legal pages | EXISTS | app/terms/page.tsx (add compounded med disclosure) | components/CookieBanner.tsx (cookie consent), app/accessibility/page.tsx (accessibility statement) | Medium | Medium |
| H3 (MedDirector) | EXISTS | components/MedicalDirectorBio.tsx (set MEDICAL_DIRECTOR_LIVE = true, fill credentials) | None | Small | Small |
| H5 (GLP-1 disclosure) | Covered by #2 above | | | | |

**Dependencies:** None
**Estimated total diff:** ~300 lines changed, ~150 lines new
**Order:** GLP-1 compounded disclosure → FTC fixes on competitor pages → cookie banner → medical director credentials → terms update

---

### Group 3 (Prompt 3): Consent & Intake Compliance — Issues 6, 9, 11
**Priority: HIGH — required for patient-facing forms**

| Issue | Status | Files to Modify | Files to Create | Diff | Effort |
|-------|--------|----------------|-----------------|------|--------|
| #6 TCPA consent | PARTIAL | components/EmailCapture.tsx (add consent checkbox), components/LeadPopup.tsx (add consent, fix nova_ key), app/book/page.tsx (add TCPA consent), app/quiz/page.tsx (add consent), app/glp1-quiz/page.tsx (add consent), app/contact/page.tsx (add marketing consent) | components/TCPAConsent.tsx, lib/consent-text.ts | Medium | Medium |
| #9 Informed consents | PARTIAL | None urgently — intake form consents are solid | app/api/clinic/consents/route.ts (consent PDF generation), lib/clinic/consent-templates.ts | Medium | Medium |
| #11 CA state gating | PARTIAL | app/intake/trt/page.tsx (restrict to CA or add validation), app/intake/glp1/page.tsx (same) | None | Small | Small |

**Dependencies:** #8 (PHI hardening should be done first so consent data is encrypted)
**Estimated total diff:** ~200 lines changed, ~200 lines new
**Order:** TCPA consent component → add to all forms → CA state gating on intake → consent document generation

---

### Group 4 (Prompt 4): Clinical Compliance Gates — Issues 4, 10, 5, 18
**Priority: MEDIUM-HIGH — required for prescription workflow**

| Issue | Status | Files to Modify | Files to Create | Diff | Effort |
|-------|--------|----------------|-----------------|------|--------|
| #4 Rx Justification | NET-NEW | None | app/clinic/rx-justification/page.tsx, app/api/clinic/rx-justification/route.ts, lib/clinic/rx-justification-schema.ts, Supabase migration | Large | Large |
| #10 CURES attestation | NET-NEW | None | app/clinic/cures/page.tsx, app/api/clinic/cures/route.ts, lib/clinic/cures-schema.ts, Supabase migration | Large | Large |
| #5 AB 3030 | PARTIAL | app/api/clinic/agents/route.ts (add disclosure headers), app/api/clinic/mcp/route.ts (add human-review gate for writes), app/clinic/patients/[id]/page.tsx (strengthen AI disclosure) | lib/clinic/ab3030-disclaimer.ts, components/clinic/AIDisclosure.tsx | Medium | Medium |
| #18 AI agent gates | PARTIAL | app/api/clinic/mcp/route.ts (require confirmation for create_alert, create_task), app/api/clinic/agents/route.ts (add disclosure metadata) | lib/clinic/ab3030-gates.ts | Medium | Medium |

**Dependencies:** #8 (auth must be on clinic APIs first)
**Estimated total diff:** ~200 lines changed, ~600 lines new
**Order:** AB 3030 disclaimers + AI gates (quick) → Rx Justification build → CURES attestation build

---

### Group 5 (Prompt 5): Infrastructure & Communication — Issues 7, 3, 17
**Priority: MEDIUM — operational infrastructure**

| Issue | Status | Files to Modify | Files to Create | Diff | Effort |
|-------|--------|----------------|-----------------|------|--------|
| #7 A2P/Email/SMS | PARTIAL | package.json (add @sendgrid/mail) | lib/email/sendgrid.ts, lib/sms/provider.ts (stub), Supabase migration: communication_consents + communication_logs tables | Large | Large |
| #3 Payment abstraction | PARTIAL | None immediately — Stripe works for launch | lib/payments/provider.ts (interface), lib/payments/stripe.ts (current impl wrapped), lib/payments/corepay.ts (stub) | Large | Large |
| #17 OptiMantra | PARTIAL | lib/clinic/ehr-adapter.ts (refactor or replace CharmEHR with OptiMantra) | lib/clinic/optimantra-adapter.ts, compliance/integrations/optimantra-integration-spec.md | Large | Large |

**Dependencies:** #8 (auth), #6 (TCPA consent feeds into email/SMS sends)
**Estimated total diff:** ~100 lines changed, ~800 lines new
**Notes:** Payment abstraction and OptiMantra adapter are LARGE efforts. For launch, Stripe works and OptiMantra is accessed directly by the prescriber. These are post-launch priorities.

---

### Group 6 (Prompt 6): Documentation & Compliance Packets — Issues 14, 15, 16
**Priority: MEDIUM — documentation, not code**

| Issue | Status | Files to Modify | Files to Create | Diff | Effort |
|-------|--------|----------------|-----------------|------|--------|
| #14 LegitScript | NET-NEW | None | compliance/legitscript/business-info.md, product-service-desc.md, regulatory-compliance.md, website-review.md, physician-credentials.md, pharmacy-credentials.md | N/A (docs) | Medium |
| #15 Clinical SOPs | NET-NEW | None | compliance/sops/prescribing-trt.md, prescribing-glp1.md, patient-intake.md, lab-review.md, adverse-event.md, refill-auth.md, telehealth-consult.md | N/A (docs) | Medium |
| #16 HIPAA Policies | NET-NEW | None | compliance/hipaa-policies/privacy.md, security.md, breach-notification.md, ba-management.md, workforce-training.md, access-control.md, audit-control.md | N/A (docs) | Medium |

**Dependencies:** #2 (marketing audit should be done before LegitScript packet references website content)
**Estimated total diff:** ~0 code lines, ~3000+ lines of documentation
**Order:** HIPAA policies (foundational) → Clinical SOPs → LegitScript packet

---

## Execution Priority Summary

| Order | Group | What | Blocks Launch? | Est. Effort |
|-------|-------|------|----------------|-------------|
| 1 | Group 1 | Security & PHI hardening | **YES** | 2-3 days |
| 2 | Group 2 | Marketing compliance | **YES** (LegitScript) | 1-2 days |
| 3 | Group 3 | Consent & intake compliance | **YES** (TCPA) | 1-2 days |
| 4 | Group 4 | Clinical compliance gates | Partially (Rx justification before first GLP-1 Rx) | 2-3 days |
| 5 | Group 6 | Documentation | Partially (HIPAA policies needed) | 2-3 days |
| 6 | Group 5 | Infrastructure (payment, EHR, email) | No — Stripe works, OptiMantra accessed directly | Post-launch |

**Total estimated effort: 8-13 days of focused work**
**Capital impact: Minimal — all changes are code/documentation, no new services required**
