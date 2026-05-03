# FTC Claims Audit — Competitor Comparison Pages

## Audit Date: April 29, 2026
## Rule: FTC Health Products Compliance Guidance + FTC Endorsement Guides

---

## app/vs/hims/page.tsx — 8 violations

| # | Line | Category | Current Text | Proposed Educational Replacement |
|---|------|----------|-------------|----------------------------------|
| 1 | 32 | Direct comparison | "Bloom Metabolics offers a more hands-on experience" | "Bloom Metabolics prioritizes individualized provider engagement throughout treatment." |
| 2 | 39 | Comparative superlative | "Bloom Metabolics's approach is more comprehensive" | "Bloom Metabolics offers quarterly monitoring as part of its standard approach." |
| 3 | 46 | Direct comparison | "Bloom Metabolics's individualized approach matters" | "Bloom Metabolics structures protocols around individual biomarker results." |
| 4 | 59 | Outcome testimonial | "within a month I felt significantly better" | Add enhanced typical-results disclaimer |
| 5 | 64 | Outcome testimonial | "The difference is night and day" | Add enhanced typical-results disclaimer |
| 6 | 207 | Star ratings | Five-star rating display on testimonials | Remove star ratings or add methodology disclosure |
| 7 | 222 | Weak disclosure | Generic "Results vary" at bottom | Replace with enhanced typical-results language per testimonial |
| 8 | 98 | Biased framing | "If quality of care and personalization matter more, Bloom Metabolics is designed for that" | "Hims emphasizes accessibility. Bloom Metabolics emphasizes individualized protocols." |

## app/vs/roman/page.tsx — 7 violations

| # | Line | Category | Current Text | Proposed Educational Replacement |
|---|------|----------|-------------|----------------------------------|
| 9 | 39 | Comparative superlative | "more comprehensive out of the box" | "Bloom Metabolics includes comprehensive lab panels as part of its standard intake." |
| 10 | 46 | "Wins" language | "Ro wins on pharmacy convenience. Bloom Metabolics wins on protocol precision." | "Ro emphasizes pharmacy delivery speed. Bloom Metabolics emphasizes protocol customization." |
| 11 | 52 | Outcome testimonial | "that never happened at Ro" | Add enhanced disclaimer |
| 12 | 57 | Outcome testimonial | "Within 6 weeks I felt noticeably better" | Add enhanced disclaimer |
| 13 | 200 | Star ratings | Five-star rating display | Remove or add methodology |
| 14 | 214 | Weak disclosure | Generic disclaimer at bottom | Enhanced per-testimonial disclosure |
| 15 | 32 | Comparative | "goes deeper on hormone optimization" | "Bloom Metabolics specializes in hormone optimization. Ro offers broader men's health services." |

## app/alternatives/best-online-trt-clinics/page.tsx — 14 violations (CRITICAL)

| # | Line | Category | Current Text | Proposed Educational Replacement |
|---|------|----------|-------------|----------------------------------|
| 16 | 18 | Self-serving ranking | "5 Best Online TRT Clinics in 2026" | "Choosing an Online TRT Clinic: A Patient's Guide (2026)" |
| 17 | 175 | Misleading framing | "An honest comparison of the top online TRT clinics" | "This guide, produced by Bloom Metabolics, examines five online TRT clinics." |
| 18 | 228 | Ranking language | "The Rankings" / "The 5 Best" | "Clinic Profiles" / "Overview of 5 Online TRT Clinics" |
| 19 | 240 | "Our Pick" badge | Bloom gets emerald highlight + "Our Pick" label | Replace with "Bloom Metabolics (publisher of this guide)" |
| 20 | 113-119 | Star ratings | Numerical 1-5 ratings for Lab Depth, Personalization, Provider Access | Replace with descriptive categories or remove entirely |
| 21 | 145 | Outcome testimonial | "within a month I felt significantly better" | Enhanced disclaimer |
| 22 | 150 | Outcome testimonial | "It's a different level of care" | Enhanced disclaimer |
| 23 | 155 | Outcome testimonial | "makes all the difference" | Enhanced disclaimer |
| 24 | 340 | Star ratings | Five-star display on testimonials | Remove or add methodology |
| 25 | 354 | Weak disclosure | Generic disclaimer at bottom | Enhanced typical-results per testimonial |
| 26 | 396 | Buried disclosure | "Bloom Metabolics produced this comparison" at bottom in small text | Move to TOP of page, prominent, before any content |
| 27 | 18-32 | Competitor weaknesses | "Standardized protocols — less personalization" / "Basic lab panels" | Factual: "Hims offers standardized protocol tiers" without "less" or "basic" |
| 28 | 113-114 | Numerical scoring | "Lab Depth: 5, 2, 3, 5, 3" | Replace with descriptive: "Comprehensive," "Standard," "Basic" with methodology |
| 29 | 112 | Numerical scoring | "Personalization: 5, 2, 3, 4, 3" | Replace with descriptive categories |

## Summary

| Page | Violations | Severity |
|------|-----------|----------|
| vs/hims | 8 | HIGH |
| vs/roman | 7 | HIGH |
| alternatives/best-online-trt-clinics | 14 | CRITICAL |
| **Total** | **29** | — |

## Remediation Approach (Per Strategic Posture)

All three pages will be reframed from competitive comparisons to educational content:

1. **Create `components/EditorialDisclosure.tsx`** — prominent disclosure of Bloom's authorship
2. **Remove all star ratings and numerical scoring** across all three pages
3. **Replace comparative superlatives** ("better," "more comprehensive," "wins," "deeper") with factual descriptions
4. **Enhance testimonial disclaimers** — per-testimonial typical-results language
5. **Move editorial disclosure to top** of each page (before any content)
6. **Reframe page titles** from "Best/Rankings" to educational framing
7. **Remove "Our Pick" badge** and visual highlighting of Bloom over competitors
8. **Replace biased competitor "considerations"** with neutral factual descriptions
