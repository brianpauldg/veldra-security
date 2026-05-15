# Audit Changelog

**Branch:** `release/pre-launch-2026-05`
**Started:** 2026-05-15

---

## Changes Log

### 2026-05-15 — Stage 1: Audit-driven fixes

**S1.1 — Content removals:**
- `app/clinic/settings/page.tsx:12`: "Albert Aparisio" → "Michael Napolitano", title "Medical Director" → "Covering Physician"
- `app/api/clinic/agents/route.ts:207`: Same replacement
- `.env.example:20`: "Nova Health" → "Bloom Metabolics"
- `veldra_FINAL_SITE.html`: Deleted (legacy Nova Health landing page artifact)
- `lib/clinic/seed-data.ts`: "Dr. Elena Martinez" → "Dr. Test Physician (SEED DATA)" across 35 instances

**S1.2 — Physician claim corrections:**
- `app/learn/page.tsx:283`: "Board-certified physician" → "U.S.-licensed physician" (interim until Napolitano board cert documented)
- `compliance/medical-director-launch-checklist.md`: Confirmed exists with 5-point checklist (already present)
- `MEDICAL_DIRECTOR_LIVE`: Confirmed remains `false`

**S1.3 — GLP-1 compliance language:**
- `app/glp1/page.tsx:22`: Benefits rewritten — trial data attributed to brand-name, compounded qualifier added
- `app/glp1/page.tsx:26`: "Many patients report" → "Some patients report" + "Individual results vary"
- `app/intake/glp1/page.tsx:431`: "15-20% body weight loss" attributed to brand-name trials with 68-week timeframe
- `app/trt/page.tsx:20-26`: All 6 benefit claims rewritten — "commonly report" → "may support" with "Individual results vary" appended
- `audit/01a-glp1-deep-audit.md`: Created as addendum documenting all findings and fixes

**S1.4 — Peptide compliance language:**
- `app/peptides/page.tsx`: Added explicit 503A pharmacy + patient-specific Rx paragraph and pre-launch waitlist framing
- `app/learn/peptides/page.tsx`: Added full 503A/compliance disclaimer replacing minimal prior text

**S1.5 — Services hub additions:**
- `app/services/page.tsx`: Added Sexual Health Optimization ($129/mo) and Longevity Stack ($249/mo) service entries with conservative claim language, compliance disclaimers, and waitlist CTAs
