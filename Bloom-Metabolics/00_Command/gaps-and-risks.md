# Gaps, Risks & Hard Stops

**Date:** 2026-04-15
**Status:** Pre-Launch Assessment

---

## CRITICAL GAPS (Launch Blockers)

### 1. No Physician/Provider On Board
- **Severity:** CRITICAL — Cannot prescribe without a licensed provider
- **Impact:** Zero patients possible without this
- **Fix Time:** 5–14 days (recruitment, credentialing, contract)
- **Owner:** Founder
- **Action:** Post immediately on physician job boards, reach out to telehealth provider networks (OpenLoop, Wheel, SteadyMD). Need MD/DO or NP with prescribing authority in target states. Must have DEA registration for testosterone (Schedule III).
- **Workaround:** Start with a physician network like OpenLoop or Wheel for initial patients while recruiting dedicated provider.

### 2. Stripe Products Not Configured
- **Severity:** CRITICAL — Checkout endpoint will fail without products
- **Impact:** Cannot collect payment
- **Fix Time:** 1–2 hours
- **Owner:** Founder (Stripe dashboard access required)
- **Action:** Create products in Stripe: Consultation ($49), TRT Standard ($149/mo), TRT Premium ($199/mo), GLP-1 Core ($249/mo), GLP-1 Complete ($349/mo), Peptide Protocol ($199–299/mo), Optimization Bundle ($399/mo). Create monthly subscription prices. Update `.env.local` with product IDs.

### 3. No EHR System Selected
- **Severity:** CRITICAL — Cannot maintain compliant medical records
- **Impact:** Legal liability, no e-prescribing, no structured clinical workflow
- **Fix Time:** 3–7 days (selection, setup, BAA)
- **Owner:** Founder + Clinical Lead
- **Action:** Evaluate Cerbo EHR (best fit for cash-pay hormone clinics), Healthie, DrChrono. See EHR evaluation doc. Minimum viable: Cerbo or manual documentation in Supabase with provider sign-off.
- **Workaround for Day 1:** Structured intake forms + provider documentation in secure system + manual prescription process. Not scalable past 10 patients.

### 4. No Pharmacy Partner
- **Severity:** CRITICAL — Cannot fulfill prescriptions
- **Impact:** Zero treatment delivery
- **Fix Time:** 7–14 days (outreach, agreement, BAA, integration)
- **Owner:** Founder + Clinical Lead
- **Action:** Contact compounding pharmacies for TRT (testosterone cypionate) and GLP-1 (compounded semaglutide). Key partners to evaluate: Empower Pharmacy, Hallandale Pharmacy, Red Rock Compounding, Precision Medicine. Need: 503A or 503B licensed pharmacy, BAA, competitive pricing, fast shipping. For branded medications: establish relationships with retail pharmacy partners.

### 5. No Lab Partner
- **Severity:** CRITICAL — Cannot order blood work
- **Impact:** No treatment can begin without baseline labs
- **Fix Time:** 3–7 days
- **Owner:** Founder + Clinical Lead
- **Action:** Partner with Quest Diagnostics and/or Labcorp for nationwide coverage. Alternatives: direct-to-consumer options (Ulta Lab Tests, Walk-In Lab) while establishing direct accounts. Need: electronic requisition capability, results API (or manual process for launch), BAA.

---

## HIGH PRIORITY GAPS

### 6. Email Templates Not Created
- **Severity:** HIGH — Nurture sequences won't fire
- **Impact:** Lead conversion drops significantly without automated follow-up
- **Fix Time:** 2–4 hours
- **Owner:** Ops/Dev
- **Action:** Create templates in SendGrid for: welcome, intake reminder, lab instructions, follow-up sequence (5 templates), booking confirmation, post-consult next steps, refill notification, physician alerts.

### 7. SMS Templates Missing
- **Severity:** HIGH — Appointment reminders, lab notifications won't send
- **Impact:** Patient engagement and compliance suffer
- **Fix Time:** 1–2 hours
- **Owner:** Ops/Dev
- **Action:** Create SMS templates in Twilio/GHL for: appointment reminder (24hr, 1hr), booking confirmation, intake form reminder, lab results available, refill due, missed check-in follow-up. All must be < 160 characters with opt-out language.

### 8. No BAAs Signed
- **Severity:** HIGH — HIPAA violation risk
- **Impact:** Legal liability if any PHI breach occurs
- **Fix Time:** 1–4 weeks per vendor
- **Owner:** Founder + Attorney
- **Action:** Execute BAAs with: Supabase, Stripe, SendGrid, Twilio, GoHighLevel, n8n, Vercel, any pharmacy partner, any lab partner, any EHR vendor. Priority order: Supabase (database), EHR vendor, pharmacy, then others.
- **Note:** Supabase offers BAA on Pro plan ($25/mo). Stripe, SendGrid, Twilio all have standard BAA processes.

### 9. OpenAI Integration Is Mocked
- **Severity:** HIGH — AI assistant returns hardcoded responses
- **Impact:** AI-powered features in clinic dashboard don't work
- **Fix Time:** 2–4 hours
- **Owner:** Dev
- **Action:** Replace mock responses in `/lib/ai.ts` with real API calls. Consider whether OpenAI is still needed given 8 Claude agents already configured. May be able to consolidate on Anthropic SDK entirely.
- **Note:** This is lower priority if Claude agents handle all AI tasks.

---

## MEDIUM PRIORITY GAPS

### 10. Admin Dashboard Not Built
- **Severity:** MEDIUM — No user management, billing analytics, revenue reports
- **Impact:** Manual operations for admin tasks
- **Fix Time:** 1–2 weeks
- **Owner:** Dev
- **Action:** Build `/admin/` routes for: user management, billing overview, revenue reports, churn analysis. Not required for first patient.

### 11. Vector Search / RAG Not Implemented
- **Severity:** MEDIUM — Semantic search for AI assistant doesn't work
- **Impact:** AI assistant can't retrieve educational content
- **Fix Time:** 1–2 days
- **Owner:** Dev
- **Action:** Add embedding generation (OpenAI or Anthropic), implement pgvector similarity search. `assistant_tasks` table already has vector column.

### 12. No State Licensing Compliance Framework
- **Severity:** MEDIUM — Must verify provider is licensed in patient's state
- **Impact:** Practicing medicine without a license is illegal
- **Fix Time:** 1–2 days (framework), ongoing (per state)
- **Owner:** Founder + Attorney + Provider
- **Action:** Document state-by-state telehealth requirements. Build state verification into intake flow. Start with 3–5 states where provider is licensed. Expand as additional providers join.

---

## LOW PRIORITY GAPS

### 13. White-Label Support
- **Severity:** LOW — B2B reseller feature, not needed for launch
- **Fix Time:** 4–8 weeks
- **Owner:** Dev (future)

### 14. Advanced Analytics Dashboard
- **Severity:** LOW — Basic Recharts charts exist, advanced cohort analysis missing
- **Fix Time:** 1–2 weeks
- **Owner:** Dev (future)

---

## RISKS

### R1. Regulatory Enforcement Risk
- **Probability:** MEDIUM
- **Impact:** HIGH
- **Description:** FDA is actively targeting telehealth companies for compounded medication marketing. 30+ warning letters issued Q1 2026.
- **Mitigation:** Never imply compounded meds are FDA-approved. Clear disclaimers. Compliance-first marketing copy. Attorney review of all patient-facing materials.

### R2. Provider Availability Risk
- **Probability:** MEDIUM
- **Impact:** CRITICAL
- **Description:** Finding a licensed provider willing to work with a new telehealth startup may take longer than expected.
- **Mitigation:** Parallel paths: (1) direct recruitment, (2) physician network (OpenLoop, Wheel), (3) NP with collaborative physician agreement.

### R3. Compounding Pharmacy Regulatory Risk
- **Probability:** MEDIUM
- **Impact:** HIGH
- **Description:** FDA may further restrict compounded semaglutide availability. Novo Nordisk actively pursuing legal action against compounders.
- **Mitigation:** Offer both compounded and brand-name GLP-1 options. Build insurance coordination pathway for branded medications. Don't build entire business model on compounded drug availability.

### R4. Cash-Pay Market Saturation
- **Probability:** LOW-MEDIUM
- **Impact:** MEDIUM
- **Description:** Increasing number of telehealth competitors in TRT and GLP-1 space.
- **Mitigation:** Premium positioning, comprehensive labs, proactive care model. Differentiate on quality and trust, not price.

### R5. Data Breach Risk
- **Severity:** LOW probability, EXTREME impact
- **Description:** PHI breach would be legally and reputationally devastating.
- **Mitigation:** AES-256-GCM encryption (already implemented), RLS policies (already configured), BAAs with all vendors, HIPAA Security Risk Assessment, incident response plan, regular access audits.

---

## Summary Matrix

| Gap | Severity | Blocks Launch? | Fix Time | Owner |
|-----|----------|---------------|----------|-------|
| No Provider | CRITICAL | YES | 5–14 days | Founder |
| Stripe Products | CRITICAL | YES | 1–2 hours | Founder |
| No EHR | CRITICAL | YES* | 3–7 days | Founder |
| No Pharmacy | CRITICAL | YES | 7–14 days | Founder |
| No Lab Partner | CRITICAL | YES | 3–7 days | Founder |
| Email Templates | HIGH | Partial | 2–4 hours | Dev/Ops |
| SMS Templates | HIGH | Partial | 1–2 hours | Dev/Ops |
| No BAAs | HIGH | Legal risk | 1–4 weeks | Founder + Attorney |
| OpenAI Mock | HIGH | Partial | 2–4 hours | Dev |
| Admin Dashboard | MEDIUM | No | 1–2 weeks | Dev |
| Vector Search | MEDIUM | No | 1–2 days | Dev |
| State Licensing | MEDIUM | Partial | 1–2 days | Founder + Attorney |
| White-Label | LOW | No | 4–8 weeks | Dev |
| Advanced Analytics | LOW | No | 1–2 weeks | Dev |

*EHR can be worked around with manual documentation for first 5–10 patients.
