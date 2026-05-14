# Bloom Metabolics — Color System Reference

**Last updated:** 2026-05-14
**Migration complete.** All customer-facing pages use the warm brand palette. Cool zinc scale retained for clinic admin pages only.

---

## The Two-Layer Color System

### Layer 1: Warm Brand Palette (canonical)

**Defined in:** `app/globals.css` `@theme` block
**Usage:** All brand-aligned visual surfaces on customer-facing pages.

| Token | CSS Variable | Hex | Semantic Role |
|-------|-------------|-----|---------------|
| obsidian | `--color-obsidian` | `#050404` | Dark surfaces, card backgrounds |
| ink | `--color-ink` | `#0d0c0a` | Lifted dark surfaces, dropdown backgrounds |
| graphite | `--color-graphite` | `#1a1814` | Borders, dividers, card outlines |
| steel | `--color-steel` | `#2a2620` | De-emphasized microcopy (disclaimer text) |
| brass | `--color-brass` | `#8a8268` | Muted accent, labels, eyebrow text, body text |
| gold | `--color-gold` | `#c9b88c` | Premium accent, emphasized callouts, check marks, key visual punctuation |
| champagne | `--color-champagne` | `#d8cfbe` | Headline text, card titles, emphasized text |
| parchment | `--color-parchment` | `#f5ecd9` | Bright headline gradient top, selection bg |

**Brand-correct usage examples:** Homepage, Header, Footer, Pricing table, FAQ, How-it-Works, Peptides page, Waitlist modal.

These pages use inline hex values from the warm palette or CSS custom properties. They look correct.

### Layer 2: Cool Zinc Scale (utility-only)

**Defined in:** `tailwind.config.ts` as `colors.zinc`
**Previous name:** `graphite` (renamed 2026-05-14 to resolve naming collision)
**Usage:** Limited to genuinely neutral structural elements OR pages pending warm-migration.

| Token | Hex | Note |
|-------|-----|------|
| zinc-50 | `#fafafa` | Near-white, light section backgrounds |
| zinc-100 | `#f4f4f5` | Light card backgrounds, borders |
| zinc-200 | `#e4e4e7` | Borders, dividers in light sections |
| zinc-300 | `#d4d4d8` | Icon tints, muted light-theme text |
| zinc-400 | `#a1a1aa` | Secondary text in light and dark contexts |
| zinc-500 | `#71717a` | Muted text, disclaimers |
| zinc-600 | `#52525b` | Body text in light sections |
| zinc-700 | `#3f3f46` | Emphasized text in dark contexts |
| zinc-800 | `#27272a` | Dark borders in admin/clinic UI |
| zinc-900 | `#18181b` | Dark section backgrounds |
| zinc-950 | `#020202` | Near-black, hero backgrounds |

**Current usage:** These tokens appear across 49 files. Most are **accidental** (pages built before the warm palette was locked) and are Phase 2 migration targets.

---

## Naming Rule

If you need a color that signals "brand-aligned," use the warm palette (Layer 1). Reference CSS custom properties or inline hex values from the warm palette.

If you need a true neutral that has no brand connotation, use the cool palette (Layer 2) — `zinc-{n}`. Only invoke zinc tokens if a section is deliberately light-themed and that is a documented design decision.

**The two layers are deliberately separated to make brand drift visible.** After the rename, any file using `zinc-*` classes is immediately identifiable as either:
- A page pending warm-migration (Phase 2 target)
- A deliberate cool-neutral usage (should be documented)

---

## Phase 2 Migration Inventory

Each file using `zinc-{n}` tokens is classified below. Phase 2 will convert category A files to the warm palette.

### Classification Key

- **A — ACCIDENTAL:** Used cool gray thinking it was the brand neutral. Convert to warm palette in Phase 2.
- **B — DELIBERATELY LIGHT:** Intentionally light-themed section. Flag for design review.
- **C — STRUCTURAL NEUTRAL:** Single-purpose use (borders, focus rings) where cool/warm doesn't matter. Keep on zinc.
- **D — CLINIC ADMIN:** Internal-only clinic portal pages. Not customer-facing. Keep on zinc (separate design system).

### Customer-Facing Marketing Pages

| File | Refs | Tokens Used | Class | Notes |
|------|------|-------------|-------|-------|
| `app/about/page.tsx` | 14 | zinc-50/100/300/400/500/600/900/950 | **A** | Light "What We Stand For" card, light trust signals section. Breaks dark brand. |
| `app/services/page.tsx` | 21 | zinc-50/100/200/300/400/500/600/700/800/900/950 | **A** | Alternating light/dark sections. Service cards use light bg. |
| `components/TreatmentPage.tsx` | 21 | zinc-50/100/200/300/400/500/600/700/900/950 | **A** | Shared template for /trt and /glp1. Multiple light sections (benefits, process, FAQ, ideal-for). |
| `app/vs/hims/page.tsx` | 31 | zinc-50/100/300/400/500/600/700/800/900/950 | **A** | Light comparison cards, light testimonials, light detailed sections. |
| `app/vs/roman/page.tsx` | 31 | zinc-50/100/300/400/500/600/700/800/900/950 | **A** | Same pattern as vs/hims. |
| `app/pricing/page.tsx` | 14 | zinc-50/100/200/300/400/500/600/800/900/950 | **A** | Light "What you get" section, light FAQ cards. Dark sections already use warm palette inline. |
| `app/alternatives/best-online-trt-clinics/page.tsx` | 38 | zinc-50/100/300/400/500/600/800/900/950 | **A** | Full comparison page in cool grays. |
| `app/quiz/page.tsx` | 33 | zinc-50/100/200/300/400/500/600/700/800/900/950 | **A** | Quiz UI in cool palette. |
| `app/glp1-quiz/page.tsx` | 35 | zinc-50/100/200/300/400/500/600/700/800/900/950 | **A** | GLP-1 quiz UI in cool palette. |
| `app/book/page.tsx` | 32 | zinc-50/100/200/400/500/600/700/800/950 | **A** | Application form. Light form sections, dark hero. |
| `app/contact/page.tsx` | 15 | zinc-200/300/400/500/700/800/950 | **A** | Contact form page. |
| `app/success/page.tsx` | 8 | zinc-100/400/500/600/800/950 | **A** | Post-payment success page. |
| `app/faq/page.tsx` | 2 | zinc-400/950 | **C** | Only 2 refs, minimal usage — hero bg and disclaimer text. |
| `app/booking/page.tsx` | 2 | zinc-950 | **C** | Single bg reference. |

### Injection Guide Pages

| File | Refs | Tokens Used | Class | Notes |
|------|------|-------------|-------|-------|
| `app/inject/page.tsx` | 3 | zinc-950 | **C** | Hub page, dark bg only. |
| `app/inject/layout.tsx` | 1 | zinc-950 | **C** | Layout bg. |
| `app/inject/[protocol]/page.tsx` | 2 | zinc-950 | **C** | Dark bg only. |
| `app/inject/[protocol]/components/*.tsx` (7 files) | 1-2 each | zinc-950 | **C** | All use zinc-950 for dark backgrounds. Functionally identical to `#020202`. |
| `app/inject/[protocol]/not-found.tsx` | 1 | zinc-950 | **C** | Dark bg only. |

### Shared Components

| File | Refs | Tokens Used | Class | Notes |
|------|------|-------------|-------|-------|
| `components/ui/Card.tsx` | 5 | zinc-100/200/700/800/900 | **A** | Card component with light/dark variants. Light variant uses cool grays. |
| `components/ui/Button.tsx` | 6 | zinc-50/100/200/300/400/600/700/800/900/950 | **A** | Button with light/dark variants. |
| `components/MedicalDirectorBio.tsx` | 13 | zinc-50/200/500/600/950 | **A** | Light-bg bio card. |
| `components/LeadPopup.tsx` | 13 | zinc-200/300/400/500/600/800/950 | **A** | Lead popup with mixed light/dark elements. |
| `components/EmailCapture.tsx` | 2 | zinc-200/300/400/800/900/950 | **C** | Minimal structural usage. |

### Clinic Admin Pages (internal, not customer-facing)

| File | Refs | Tokens Used | Class | Notes |
|------|------|-------------|-------|-------|
| `app/clinic/layout.tsx` | 26 | zinc-300/400/500/700/800/900/950 | **D** | Admin layout, dark theme. |
| `app/clinic/page.tsx` | 38 | zinc-400/500/600/700/800/900 | **D** | Dashboard. |
| `app/clinic/patients/*.tsx` | 97 | zinc-300-900 | **D** | Patient management. |
| `app/clinic/tasks/page.tsx` | 18 | zinc-400-900 | **D** | Task board. |
| `app/clinic/settings/page.tsx` | 21 | zinc-400-900 | **D** | Settings panel. |
| `app/clinic/alerts/page.tsx` | 13 | zinc-400-800 | **D** | Alert management. |
| `app/clinic/cures/*.tsx` | 24 | zinc-500/800 | **D** | CURES attestation. |
| `app/clinic/rx-justifications/*.tsx` | 29 | zinc-400-900 | **D** | Rx justification forms. |
| `app/clinic/login/page.tsx` | 11 | zinc-100-950 | **D** | Login page. |
| `app/clinic/ai-suggestions/page.tsx` | 11 | zinc-400-900 | **D** | AI suggestions. |
| `components/clinic/CURESAttestation.tsx` | 13 | zinc-300-900 | **D** | Clinic component. |
| `components/clinic/CompoundedRxJustification.tsx` | 11 | zinc-300-900 | **D** | Clinic component. |
| `lib/clinic/alerts.ts` | 1 | zinc-400/500 | **D** | Alert utility. |

---

## Phase 2 Summary

**Total files:** 49
**Category A (warm-migrate):** 18 files across customer-facing pages and shared components
**Category C (keep as zinc):** ~13 files with minimal/structural-only usage
**Category D (clinic admin, separate concern):** ~18 files, not customer-facing, keep on zinc

Phase 2 work targets Category A files. The migration strategy:
1. Replace light sections (bg-zinc-50, bg-white) with warm dark equivalents (bg-[#050404], bg-[#0d0c0a])
2. Replace cool text colors (text-zinc-950, text-zinc-600) with warm equivalents (text-[#d8cfbe], text-[#8a8268])
3. Replace cool borders (border-zinc-200) with warm borders (border-[#1a1814])
4. Replace emerald accent (text-emerald-500) with brass or champagne check marks
5. Update Card.tsx and Button.tsx light variants to warm dark variants

---

## Inline Hex Values — Resolved

| Hex | Resolution | Status |
|-----|-----------|--------|
| `#c9b88c` | Added as `--color-gold` token. All 102 inline refs replaced with `gold` class. | Done |
| `#a89878` | Recognized as the `body` text color (`globals.css:50`). Component refs are redundant overrides of body default — left as-is. Not a named token because it's the CSS body color, not a semantic brand token. | Documented |
| `#0a0908` | Replaced with `#0d0c0a` (ink). Single occurrence in peptides hero gradient. | Done |
| `#0a0a0a` | Replaced with `#0d0c0a` (ink). Single occurrence in PricingTable peptide card. | Done |
| `#c4b9a5` | Exists only in CSS `@theme` graphite-700 legacy alias. Not used in components. | N/A |

---

## Migration Complete — 2026-05-14

**Final state:**
- **8 named warm palette tokens:** obsidian, ink, graphite, steel, brass, gold, champagne, parchment
- **0 zinc references** in customer-facing pages, shared components, and injection guides
- **313 zinc references** in clinic admin pages (Category D) — correct, separate design system
- **All customer-facing pages** render on the warm brand palette
- **Card.tsx and Button.tsx** are dark-warm-only (light variants removed)
- **Blog content CSS** uses `var(--color-gold)` and `var(--color-champagne)` instead of inline hex
