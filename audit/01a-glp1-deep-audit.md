# GLP-1 Compliance Language Deep Audit

**Date:** 2026-05-15
**Branch:** `release/pre-launch-2026-05`

---

## Findings and Fixes Applied

### F-GLP1-01 — /glp1 benefits: "demonstrated significant weight reduction in clinical studies"
- **File:** `app/glp1/page.tsx:22`
- **Original:** "GLP-1 medications have demonstrated significant weight reduction in clinical studies when combined with lifestyle modifications."
- **Fix applied:** Rewritten to explicitly attribute data to brand-name trial data and note compounded formulations are not independently studied.
- **Status:** FIXED

### F-GLP1-02 — /glp1 benefits: "Many patients report improved energy levels"
- **File:** `app/glp1/page.tsx:26`
- **Original:** "Many patients report improved energy levels and overall well-being"
- **Fix applied:** Changed to "Some patients report" with "Individual results vary" appended.
- **Status:** FIXED

### F-GLP1-03 — GLP-1 intake form: "patients commonly report 15-20% body weight loss"
- **File:** `app/intake/glp1/page.tsx:431`
- **Original:** "Significant weight reduction — patients commonly report 15–20% body weight loss"
- **Fix applied:** Rewritten to attribute percentages to "clinical trials of brand-name GLP-1 medications" with specific timeframe (68 weeks) and qualifier that "Individual results with compounded formulations vary."
- **Status:** FIXED

### F-GLP1-04 — /learn/glp1 FAQ: weight loss expectations
- **File:** `app/learn/glp1/page.tsx:118-119`
- **Current:** "Clinical trials have shown average weight loss of 15-22% of body weight over 68 weeks, but individual outcomes differ from trial averages."
- **Assessment:** ALREADY PROPERLY QUALIFIED — attributes data to "clinical trials" with explicit timeframe and variance disclaimer.
- **Status:** NO CHANGE NEEDED

### F-GLP1-05 — Blog: compounded-glp1-explained.mdx
- **File:** `content/blog/compounded-glp1-explained.mdx:97`
- **Current:** "Brand-name medications like Ozempic (semaglutide) and Mounjaro (tirzepatide) have undergone extensive clinical trials..."
- **Assessment:** PROPERLY ATTRIBUTED — explicitly references brand-name drugs, not compounded formulations.
- **Status:** NO CHANGE NEEDED

### F-GLP1-06 — TRT benefits: "commonly report" language
- **File:** `app/trt/page.tsx:20-26`
- **Original:** Six benefit claims using "Patients commonly report," "Many patients experience," "Patients frequently report"
- **Fix applied:** All rewritten to use "may support" framing with "Individual results vary" appended to each.
- **Status:** FIXED

## Summary

| Location | Issue | Status |
|----------|-------|--------|
| `/glp1` benefits | Trial data applied to compounded without qualifier | FIXED |
| `/glp1` benefits | "Many patients report" without variance disclaimer | FIXED |
| GLP-1 intake form | Specific percentage claim without attribution | FIXED |
| `/learn/glp1` FAQ | Already properly qualified | No change |
| Blog article | Already properly attributed to brand-name | No change |
| `/trt` benefits | "Commonly report" language without variance | FIXED |
