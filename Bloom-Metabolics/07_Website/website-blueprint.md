# Website Blueprint — Bloom Metabolics

---

## Creative Direction

- **Palette:** Black/charcoal backgrounds, silver/chrome accents, ice-blue CTAs (<5%)
- **Typography:** Inter (body) + Inter Tight (headings) + JetBrains Mono (data)
- **Effects:** Glass morphism, gradient backgrounds, chrome text, Framer Motion fade-in/slide-up
- **Motif:** Subtle DNA/metabolic helix in backgrounds, dividers, loading states
- **Feel:** Apple-like clarity, medical credibility, premium restraint, mobile-first

---

## Sitemap (19 Pages)

| # | Route | Purpose | Priority |
|---|-------|---------|----------|
| 1 | `/` | Homepage — primary conversion page | P0 |
| 2 | `/trt` | TRT treatment page | P0 |
| 3 | `/glp1` | GLP-1 weight loss page | P0 |
| 4 | `/peptides` | Peptide therapy page | P1 |
| 5 | `/about` | Company story, team, mission | P1 |
| 6 | `/pricing` | Transparent pricing table | P0 |
| 7 | `/how-it-works` | 4-step process | P0 |
| 8 | `/faq` | FAQ accordion | P1 |
| 9 | `/book` | Consultation booking + checkout | P0 |
| 10 | `/quiz` | TRT symptom assessment | P0 |
| 11 | `/glp1-quiz` | GLP-1 eligibility quiz | P0 |
| 12 | `/vs/hims` | Comparison page | P2 |
| 13 | `/vs/roman` | Comparison page | P2 |
| 14 | `/vs/marek` | Comparison page (new) | P2 |
| 15 | `/blog` | Content hub (future) | P3 |
| 16 | `/privacy` | Privacy policy | P0 |
| 17 | `/terms` | Terms of service | P0 |
| 18 | `/disclaimer` | Medical disclaimer | P0 |
| 19 | `/success` | Post-booking confirmation | P0 |

---

## Homepage (`/`) — Detailed Specification

### Hero Section
- **Background:** gradient-dark (graphite-950 → graphite-900) with subtle radial glow
- **Headline:** display-xl, gradient-text (white → graphite-300)
- **Subheadline:** subheadline, graphite-400
- **CTA:** Primary button (ice-500), "Start Your Free Assessment"
- **Secondary CTA:** Ghost button, "See Pricing"
- **Visual:** Abstract helix animation (low opacity, slow rotation) in background
- **Mobile:** Stack headline/sub/CTA vertically, full-width button

### Social Proof Bar
- **Background:** graphite-900 with top/bottom borders (graphite-800)
- **Items:** 3-4 trust metrics in a row
- **Examples:** "Licensed Physicians" | "Comprehensive Labs" | "Cancel Anytime"
- **Mobile:** Horizontal scroll or 2x2 grid

### Problem / Solution Section
- **Background:** graphite-950
- **Layout:** Left text, right visual (or stacked on mobile)
- **Headline:** "Your metabolism is talking. Are you listening?"
- **Body:** 3-4 short paragraphs addressing common symptoms
- **Visual:** Subtle body/metabolism illustration or abstract helix

### Services Overview
- **Background:** graphite-900
- **Layout:** 3 glass cards in a row
- **Cards:** TRT, GLP-1, Peptides — each with icon, title, 3 bullet benefits, "Learn More" link
- **Animation:** Stagger fade-in on scroll
- **Mobile:** Stack vertically

### How It Works
- **Background:** graphite-950
- **Layout:** 4 steps in horizontal timeline (vertical on mobile)
- **Steps:**
  1. Take Assessment (quiz icon)
  2. Consult with Provider (video icon)
  3. Get Labs & Treatment Plan (lab icon)
  4. Treatment Delivered (shipping icon)
- **Animation:** Progressive reveal on scroll

### Pricing Preview
- **Background:** graphite-900
- **Layout:** Starting prices for each service line
- **CTA:** "See Full Pricing" → `/pricing`
- **Key message:** "All-inclusive. No hidden fees. Cancel anytime."

### Trust Section
- **Background:** graphite-950
- **Content:** Provider credentials, lab partner logos, compliance badges
- **Layout:** Left = provider photo + credentials, Right = badges/logos
- **Include:** "HIPAA Compliant" | "Licensed Physicians" | "Comprehensive Labs" | "Real Results"

### Testimonials
- **Background:** graphite-900
- **Layout:** 3 testimonial cards (glass effect)
- **Each:** Quote, first name + last initial, service type, result summary
- **Disclaimer:** "Individual results vary. Testimonials reflect individual experiences."
- **Mobile:** Horizontal scroll carousel

### FAQ Preview
- **Background:** graphite-950
- **Layout:** Accordion (5 most common questions)
- **CTA:** "See All FAQs" → `/faq`

### Final CTA Section
- **Background:** Gradient with subtle glow effect
- **Headline:** "Ready to feel like yourself again?"
- **Subheadline:** "Start with a free assessment. Your personalized protocol is 15 minutes away."
- **CTA:** Large primary button, "Start Your Assessment"

### Footer
- **Background:** graphite-950 (darkest)
- **Columns:** Services, Company, Legal, Contact
- **Bottom bar:** © 2026 Bloom Metabolics. Medical disclaimer. "This website is for informational purposes. Not a substitute for professional medical advice."

---

## Treatment Pages (`/trt`, `/glp1`, `/peptides`)

### Structure (shared template — TreatmentPage.tsx)
1. **Hero:** Service-specific headline, subheadline, CTA
2. **Symptom/Problem Section:** "Does this sound familiar?" + checklist
3. **What Is [Treatment]:** Educational, 2-3 short paragraphs
4. **Our Approach:** What makes us different (labs, personalization, monitoring)
5. **Pricing:** Tier comparison (Standard vs Premium or Core vs Complete)
6. **How It Works:** 4 steps (same as homepage but service-specific context)
7. **FAQ:** 8-10 service-specific questions
8. **CTA:** "Start Your [Service] Assessment"

### Compliance notes for treatment pages:
- Never claim specific outcomes
- "May support," "commonly report," "individual results vary"
- Include compounded medication disclosure where applicable
- Emergency disclaimer in footer

---

## Pricing Page (`/pricing`)

### Structure
1. **Hero:** "Transparent Pricing. No Surprises."
2. **Pricing Table:** All tiers side by side
   - Consultation: $49 (one-time)
   - TRT Standard: $149/mo
   - TRT Premium: $199/mo
   - GLP-1 Core: $249/mo
   - GLP-1 Complete: $349/mo
   - Peptide Protocol: $199-299/mo
   - Optimization Bundle: $399/mo
3. **What's Included:** Detailed breakdown for each tier
4. **Comparison:** "How we compare" vs competitors (table)
5. **Guarantee:** "Cancel anytime. No contracts."
6. **FAQ:** Pricing-specific questions
7. **CTA:** "Book Your Consultation"

---

## Quiz Pages (`/quiz`, `/glp1-quiz`)

### Structure
1. **Intro screen:** "Take our free [X] assessment — 2 minutes"
2. **Questions:** One question per screen, progress bar at top
3. **Animation:** Slide transitions between questions
4. **Results screen:** Score + personalized recommendation + pricing + CTA
5. **CTA:** "Book Your Consultation" (with quiz score passed to booking form)

### UX principles:
- Maximum 10 questions
- Multiple choice (large tap targets on mobile)
- Never medical diagnosis language
- Results are "assessment" not "diagnosis"
- Capture email on results screen (required to see full results)

---

## Comparison Pages (`/vs/hims`, `/vs/roman`, `/vs/marek`)

### Structure
1. **Hero:** "Bloom Metabolics vs [Competitor]"
2. **Comparison Table:** Feature-by-feature (labs, pricing, services, personalization, monitoring)
3. **Key Differences:** 3-4 highlighted advantages
4. **FAQ:** "Why choose Bloom Metabolics over [Competitor]?"
5. **CTA:** "Start Your Assessment"

### Compliance: Fair, factual comparisons. Cite specific differences. No disparaging language.

---

## Global UX Rules

1. **Max 2 CTAs per viewport:** Primary (book/quiz) and Secondary (learn more/pricing)
2. **Pricing visible on every treatment page** — never hidden behind a consultation
3. **Mobile nav:** Hamburger menu + persistent "Book Now" button (ice-500, bottom right or sticky header)
4. **Scroll animations:** fade-in (0.6s) + slide-up (20px), stagger children by 0.1s
5. **Loading states:** Subtle helix spinner animation
6. **Forms:** Max 4 visible fields at once, progressive disclosure for longer forms
7. **Typography hierarchy:** One display-size per section, clear visual hierarchy
8. **Images:** WebP format, lazy loaded, responsive srcset
9. **Performance:** Lighthouse score > 90 (performance, accessibility, SEO)
10. **Accessibility:** WCAG 2.1 AA compliance minimum
