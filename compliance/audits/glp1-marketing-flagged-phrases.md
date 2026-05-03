# GLP-1 Marketing Compliance Audit — Flagged Phrases

## Audit Date: April 29, 2026
## Rule: FDA April 1, 2026 "essentially a copy" rule + FDA March 3, 2026 telehealth warning letters

---

## Category 1: Equivalence to Branded Products

| # | File | Line | Current Phrase | Violation | Proposed Replacement |
|---|------|------|---------------|-----------|---------------------|
| 1 | app/services/page.tsx | 35 | "Semaglutide and tirzepatide options" | Presents as equivalent to branded without specifying compounded | "Compounded semaglutide or tirzepatide formulations" |

## Category 2: Specific Weight-Loss Numbers Without Disclosure

| # | File | Line | Current Phrase | Violation | Proposed Replacement |
|---|------|------|---------------|-----------|---------------------|
| 2 | app/glp1/page.tsx | ~38 | "Patients commonly report 15-20% body weight reduction" | Unsubstantiated efficacy claim for compounded meds | "Individual results vary significantly. Weight loss outcomes depend on medical evaluation, adherence, and lifestyle factors. Not all patients respond to therapy." |
| 3 | app/services/page.tsx | 38 | "Patients commonly report 15-20% body weight reduction" | Same | Same replacement |

## Category 3: Off-Label / Vanity-Use Framing

| # | File | Line | Current Phrase | Violation | Proposed Replacement |
|---|------|------|---------------|-----------|---------------------|
| 4 | app/page.tsx | 148 | "Semaglutide or tirzepatide, supervised by a physician with monthly check-ins and metabolic tracking." | Frames as optimization service, no medical necessity language | "Compounded GLP-1 receptor agonist therapy, prescribed based on individual medical evaluation by a licensed physician." |

## Category 4: Private-Label Language (Missing "Compounding" Designation)

| # | File | Line | Current Phrase | Violation | Proposed Replacement |
|---|------|------|---------------|-----------|---------------------|
| 5 | app/pricing/page.tsx | 65 | "Medication shipped from a U.S.-licensed pharmacy" | Doesn't identify as compounding pharmacy | "Compounded medication shipped from a U.S.-licensed compounding pharmacy" |
| 6 | app/faq/page.tsx | 49 | "licensed pharmacy partner" | Same | "licensed compounding pharmacy partner" |
| 7 | app/how-it-works/page.tsx | ~72 | "licensed pharmacy" | Same | "licensed compounding pharmacy" |
| 8 | lib/pricing.ts | TRT includes | "Free shipping from licensed pharmacy" | Same | "Free shipping from licensed compounding pharmacy" |

## Category 5: Implied Medical Equivalence

| # | File | Line | Current Phrase | Violation | Proposed Replacement |
|---|------|------|---------------|-----------|---------------------|
| 9 | app/faq/page.tsx | ~87 | "Options may include semaglutide or tirzepatide based on your medical profile and current availability." | "Current availability" implies interchangeable supply | "Based on your medical profile, the physician may prescribe compounded semaglutide or tirzepatide, subject to state regulations and pharmacy availability." |

## Category 6: Missing Compounded Medication Disclosure (CRITICAL)

Pages that discuss GLP-1 but do NOT disclose medications are compounded and not FDA-approved:

| # | File | Issue |
|---|------|-------|
| 10 | app/page.tsx | Homepage hero and service cards — no compounded disclosure |
| 11 | app/glp1/page.tsx | Primary GLP-1 page — disclaimer exists on /disclaimer but NOT on this page itself |
| 12 | app/services/page.tsx | Services overview — no compounded disclosure |
| 13 | app/pricing/page.tsx | Pricing page — no compounded disclosure |
| 14 | app/faq/page.tsx | FAQ — no compounded disclosure |
| 15 | app/layout.tsx | SEO metadata — title/description don't mention "compounded" |
| 16 | app/how-it-works/page.tsx | Process page — no compounded disclosure |
| 17 | app/book/page.tsx | Booking page — no compounded disclosure |

**Note:** app/disclaimer/page.tsx DOES contain proper FDA/compounded disclosure. app/intake/glp1/page.tsx DOES properly separate compounded from branded in prior-use question. These are exemplary — the gap is on marketing pages.

## Category 7: Pricing Implying Equivalence

| # | File | Line | Current Phrase | Violation | Proposed Replacement |
|---|------|------|---------------|-----------|---------------------|
| 18 | lib/pricing.ts | GLP-1 tagline | "Semaglutide or Tirzepatide, physician-supervised. Starts with $49 consultation." | Price without compounded disclosure may imply savings vs branded = same product | Add: "Compounded formulations. Not FDA-approved." to tagline |

## Summary

| Category | Count | Severity |
|----------|-------|----------|
| Equivalence to Branded | 1 | High |
| Weight-Loss Numbers | 2 | High |
| Off-Label/Vanity Framing | 1 | Critical |
| Private-Label Language | 4 | High |
| Implied Equivalence | 1 | High |
| Missing Compounded Disclosure | 8 | Critical |
| Pricing Implying Equivalence | 1 | Medium |
| **Total** | **18** | — |

## Remediation Approach

1. Create `components/GLP1ComplianceDisclosure.tsx` with compact and full variants
2. Add disclosure component to all 8 pages missing it (Category 6)
3. Replace all "licensed pharmacy" with "licensed compounding pharmacy" (Category 4)
4. Remove or heavily qualify weight-loss percentage claims (Category 2)
5. Add compounded designation to pricing taglines (Categories 1, 7)
6. Create `config/clinical/pharmacy-partners.ts` for pharmacy name config
