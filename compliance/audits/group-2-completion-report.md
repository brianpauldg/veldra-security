# Group 2: Marketing Compliance — Completion Report

## Post-Deployment Verification (April 29, 2026)

| Check | Result | Details |
|-------|--------|---------|
| 1. Banned language (Our Pick, best for, winner, beats) | **PASS** | Zero instances on /vs/hims, /vs/roman, /alternatives/best-online-trt-clinics |
| 2. Editorial Disclosure at top of competitor pages | **PASS** | Present on all 3 competitor pages before content |
| 3. GLP-1 compounded disclosure | **PASS** | Present on /, /glp1, /services, /pricing. FAQ + how-it-works use "licensed compounding pharmacy" inline. |
| 4. Star ratings removed | **PASS** | Zero star ratings on all 3 competitor pages |
| 5. Cookie banner | **PASS** | CCPA-compliant banner renders on homepage with Accept All / Reject Non-Essential / Customize |
| 6. Accessibility page | **PASS** | /accessibility renders with WCAG 2.1 AA target, contact info, known issues section |

### Corrections Applied During Verification
- /vs/hims: "Best For" sections renamed to "May Suit", testimonial "within a month I felt significantly better" replaced with factual description
- /vs/roman: Same — "Best For" renamed, testimonial "Within 6 weeks I felt noticeably better" replaced
- /alternatives: testimonial "within a month I felt significantly better" replaced, "better lab monitoring" replaced with "comprehensive lab monitoring"
- EditorialDisclosure added to /vs/hims and /vs/roman (was missing in initial deploy)

---

## Issue 2: GLP-1 FDA April 2026 Compliance — DONE

### Components Created
| File | Purpose |
|------|---------|
| config/clinical/pharmacy-partners.ts | Pharmacy partner name config (placeholder pending contract) |
| components/GLP1ComplianceDisclosure.tsx | Compact + full variants with: compounded designation, not FDA-approved, pharmacy partner, thyroid C-cell warning, contraindications, risks, medical necessity, prescribing entity |

### Pages Modified (18 flagged items applied)
| File | Changes | Rule Cited |
|------|---------|------------|
| lib/pricing.ts | GLP-1 tagline: "Compounded semaglutide or tirzepatide. Not FDA-approved." + "licensed compounding pharmacy" | FDA April 1 2026 |
| app/page.tsx | GLP-1 service card desc updated + "licensed compounding pharmacy" (3 instances) + GLP1ComplianceDisclosure compact added | FDA April 1 2026 |
| app/glp1/page.tsx | Description: "compounded" + "not FDA-approved". FAQ: compounded designation. Weight loss %: removed. Disclaimer: compounded disclosure. Metadata: "compounded" added | FDA April 1 2026 |
| app/services/page.tsx | "Compounded semaglutide or tirzepatide formulations". Weight loss %: replaced with "Individual results vary" | FDA April 1 2026 |
| app/pricing/page.tsx | "licensed compounding pharmacy" (3 instances) | FDA April 1 2026 |
| app/faq/page.tsx | "licensed compounding pharmacy" (2 instances). GLP-1 med answer: compounded designation + medical necessity | FDA April 1 2026 |
| app/how-it-works/page.tsx | "licensed compounding pharmacy" | FDA April 1 2026 |
| components/TreatmentPage.tsx | GLP1ComplianceDisclosure full variant renders on GLP-1 pages (tag-based detection) | FDA April 1 2026 |

## Issue 12: FTC Educational Reframing — DONE

### Components Created
| File | Purpose |
|------|---------|
| components/EditorialDisclosure.tsx | Prominent + inline variants for editorial transparency |
| components/TestimonialDisclosure.tsx | Per-testimonial typical-results disclosure (general/weight-loss/hormone variants) |

### Pages Modified (29 flagged items + verification corrections)
| File | Changes | Rule Cited |
|------|---------|------------|
| app/alternatives/best-online-trt-clinics/page.tsx | Title: "Choosing an Online TRT Clinic: A Patient's Guide". Removed "Our Pick" badge + highlight. Removed star ratings + numerical scoring. Neutralized all competitor descriptions ("less personalization" to "standardized protocol tiers", "basic lab panels" to "focused lab panels"). Editorial disclosure at top. TestimonialDisclosure per testimonial. Section titles: "Clinic Profiles". Testimonial outcome claims replaced with factual descriptions. "better" removed. | FTC Health Products Compliance Guidance |
| app/vs/hims/page.tsx | 4 bottomLine statements replaced with factual descriptions. Star ratings removed. TestimonialDisclosure per testimonial. "Best For" sections renamed to "May Suit". Testimonial outcome-specific timeframe removed. EditorialDisclosure added at top. Generic footer disclaimer removed. | FTC Endorsement Guides |
| app/vs/roman/page.tsx | 3 bottomLine statements replaced with factual descriptions. Star ratings removed. TestimonialDisclosure per testimonial. "Best For" renamed to "May Suit". Testimonial "Within 6 weeks I felt noticeably better" replaced. EditorialDisclosure added at top. Generic footer removed. | FTC Endorsement Guides |

### Affiliate Audit
- Inspected all external links in vs/hims, vs/roman, alternatives pages
- Zero affiliate links found (no `?ref=`, `?aff=`, `?partner=` patterns)
- No redirect routes adding affiliate parameters
- **CLEAN — no affiliate relationships**

### Site-Wide Testimonial Coverage
- /vs/hims: 2 testimonials — both have TestimonialDisclosure ✓
- /vs/roman: 2 testimonials — both have TestimonialDisclosure ✓
- /alternatives: 3 testimonials — all have TestimonialDisclosure ✓
- Homepage: no testimonials present (uses credibility signals, not quotes) ✓
- /trt, /glp1: no testimonials in TreatmentPage component ✓
- **All testimonials site-wide have per-testimonial disclosure**

## Issue 1: Peptide Verification — DONE
- /peptides redirect confirmed working (redirects to /trt)
- Zero residual references on active marketing surfaces
- Documented in peptide-residual-references.md

## Issue 13: Legal Pages + Cookie Banner + Accessibility — DONE

### Created
| File | Purpose |
|------|---------|
| components/CookieBanner.tsx | CCPA-compliant: Accept All / Reject Non-Essential / Customize. Default opt-out for analytics + marketing. 12-month localStorage expiry. Keyboard accessible. ARIA labels. |
| app/accessibility/page.tsx | WCAG 2.1 AA target statement. Commitment, compliance level, known issues (initially empty), contact (brian@bloommetabolics.com), third-party content disclaimer. Last reviewed date. |

### Modified
| File | Change |
|------|--------|
| components/LayoutShell.tsx | Added CookieBanner to public layout |

### Terms + Privacy + Disclaimer
- Terms: compounded medication disclosure added via Issue 2 work
- **Privacy: FULLY UPDATED** — 17 sections total:
  - Sections 1-9: HIPAA NPP (original, unchanged)
  - Section 8: Updated with cookie banner reference
  - Section 10: CCPA/CPRA rights (know, delete, correct, limit sensitive PI, non-discrimination, 45/90 day timeline, authorized agents)
  - Section 11: Sensitive Personal Information (CPRA-specific — limited use, no cross-context advertising, no selling, encrypted at rest)
  - Section 12: CMIA (California medical information confidentiality)
  - Section 13: Third-party processors table (Supabase, Stripe*, Vercel, OptiMantra, Calendly, Resend)
    - *Stripe: "Not BAA-eligible; PHI not transmitted. Payment metadata uses opaque patient identifiers only."
  - Section 14: We Do Not Sell Personal Information (CCPA/CPRA no-sale declaration)
  - Section 15: Children's Privacy (18+ only, no minor data collection)
  - Section 16: Data Retention (medical records 7yr CA, audit logs 6yr HIPAA, payment 7yr PCI)
  - Section 17: Contact Information
  - DRAFT header at top: "Draft for Attorney Review — Not Yet Legally Operative"
  - Last updated: April 29, 2026
  - privacy@bloommetabolics.com created and active
- Disclaimer: compounded medication and FDA disclosure already exemplary

## Issue H3: Medical Director — VERIFIED

### Modified
| File | Change |
|------|--------|
| components/MedicalDirectorBio.tsx | Added 7-line guard comment block with 5 requirements before flag can be flipped |

### Created
| File | Purpose |
|------|---------|
| compliance/medical-director-launch-checklist.md | 5-item checklist, all PENDING |

- `MEDICAL_DIRECTOR_LIVE = false` confirmed. NOT changed.

## Sanity Checks
- **Meridian.tsx**: Logo component only — no GLP-1 content. Clean.
- **Quiz pages**: No GLP-1 weight loss percentage claims. Clean.
- **IG carousel scripts**: reel-assets/PRODUCTION-GUIDE.md contains video production guide, not marketing copy. Clean.

## Build Status
`npm run build` — **SUCCESS** (43/43 static pages, 0 errors)

## Test Status
`npm run test:run` — **47/47 PASSED** (11 test files)

## Human Action Items (Updated)
1. Brian provides pharmacy partner name → update config/clinical/pharmacy-partners.ts
2. Attorney reviews privacy policy and terms (add DRAFT marker)
3. Physician partner reviews medical director bio content
4. Brian completes medical-director-launch-checklist.md
5. Brian confirms accessibility complaint contact email
6. Verify competitor factual claims are current (marked with <!-- REQUIRES VERIFICATION --> where uncertain)

## Files Summary

| Action | File |
|--------|------|
| CREATED | config/clinical/pharmacy-partners.ts |
| CREATED | components/GLP1ComplianceDisclosure.tsx |
| CREATED | components/EditorialDisclosure.tsx |
| CREATED | components/TestimonialDisclosure.tsx |
| CREATED | components/CookieBanner.tsx |
| CREATED | app/accessibility/page.tsx |
| CREATED | compliance/medical-director-launch-checklist.md |
| CREATED | compliance/audits/glp1-marketing-flagged-phrases.md |
| CREATED | compliance/audits/ftc-claims-flagged.md |
| CREATED | compliance/audits/peptide-residual-references.md |
| MODIFIED | lib/pricing.ts (GLP-1 tagline + pharmacy designation) |
| MODIFIED | app/page.tsx (GLP-1 desc + disclosure + pharmacy) |
| MODIFIED | app/glp1/page.tsx (5 changes: metadata, desc, FAQ, weight claim, disclaimer) |
| MODIFIED | app/services/page.tsx (desc + weight claim) |
| MODIFIED | app/pricing/page.tsx (pharmacy designation x3) |
| MODIFIED | app/faq/page.tsx (pharmacy x2 + GLP-1 med answer) |
| MODIFIED | app/how-it-works/page.tsx (pharmacy) |
| MODIFIED | components/TreatmentPage.tsx (GLP1ComplianceDisclosure on GLP-1 pages) |
| MODIFIED | app/alternatives/best-online-trt-clinics/page.tsx (title, data, ratings, disclosure, testimonials, banned language removed) |
| MODIFIED | app/vs/hims/page.tsx (4 bottomLines, star ratings, testimonials, "Best For" to "May Suit", editorial disclosure) |
| MODIFIED | app/vs/roman/page.tsx (3 bottomLines, star ratings, testimonials, "Best For" to "May Suit", editorial disclosure) |
| MODIFIED | components/LayoutShell.tsx (CookieBanner added) |
| MODIFIED | components/MedicalDirectorBio.tsx (guard comment) |
