# Bloom Metabolics — Brand Identity

---

## Name
**Bloom Metabolics**

## Tagline Options
1. "Your metabolism, optimized." ← **Primary**
2. "Premium metabolic health, delivered."
3. "Where science meets vitality."
4. "Precision health for modern life."

---

## Brand Voice

**Tone:** Clinical authority + warm accessibility

| Do | Don't |
|----|-------|
| Confident, precise, reassuring | Aggressive, fear-based, salesy |
| Educational, empowering | Condescending, jargon-heavy |
| Warm, personal, human | Cold, corporate, clinical-only |
| Gender-neutral, inclusive | Bro-science, gendered assumptions |
| Evidence-based, measured | Absolute claims, guarantees |

**Example voice:**
- ✅ "Many patients report improved energy and focus within 4-6 weeks of starting TRT. Individual results vary."
- ❌ "You WILL feel amazing in 30 days — guaranteed!"
- ✅ "Your protocol is designed around your labs, your goals, and your body."
- ❌ "Our one-size-fits-all program works for everyone."

---

## Brand Personality

| Trait | Expression |
|-------|-----------|
| Precise | Data-driven, lab-focused, specific timelines and pricing |
| Premium | High-quality design, no clutter, intentional whitespace |
| Trustworthy | Real providers, real labs, transparent pricing, compliance-first |
| Modern | Tech-forward, AI-enhanced, digital-native experience |
| Gender-neutral | Imagery and copy that appeals equally to men and women |
| Warm | Personal, not transactional. You're a patient, not a user. |

---

## Visual Identity

### Color Palette

**Primary — Graphite (Dark backgrounds, text)**
| Token | Hex | Usage |
|-------|-----|-------|
| graphite-50 | #fafafa | Light backgrounds |
| graphite-100 | #f4f4f5 | Secondary light |
| graphite-200 | #e4e4e7 | Borders (light) |
| graphite-300 | #d4d4d8 | Disabled states |
| graphite-400 | #a1a1aa | Body text (light theme) |
| graphite-500 | #71717a | Secondary text |
| graphite-600 | #52525b | Labels |
| graphite-700 | #3f3f46 | Dark borders |
| graphite-800 | #27272a | Card backgrounds |
| graphite-900 | #18181b | Section backgrounds |
| graphite-950 | #09090b | Hero backgrounds, primary dark |

**Accent — Bloom (Silver/Chrome highlights)**
| Token | Hex | Usage |
|-------|-----|-------|
| bloom-50 | #fafafa | Lightest accent |
| bloom-100 | #f4f4f5 | Light accent |
| bloom-200 | #e5e5e7 | Subtle borders |
| bloom-300 | #d4d4d8 | Dividers |
| bloom-400 | #b8b8bd | Primary silver |
| bloom-500 | #8a8a8f | Medium accent |
| bloom-600 | #6b6b70 | Dark accent |
| bloom-700 | #4a4a4e | Heavy accent |
| bloom-800 | #2d2d30 | Accent dark |
| bloom-900 | #1a1a1d | Deepest accent |

**CTA — Ice (Blue accent, < 5% of surface area)**
| Token | Hex | Usage |
|-------|-----|-------|
| ice-400 | #93c5fd | Light CTA, hover backgrounds |
| ice-500 | #60a5fa | Primary CTA buttons, key data |
| ice-600 | #3b82f6 | CTA hover state, active links |

### Typography

| Role | Font | Weight | Tracking |
|------|------|--------|----------|
| Body | Inter | 400 | Normal |
| Body emphasis | Inter | 500–600 | Normal |
| Headings | Inter Tight | 600–700 | -0.015 to -0.04em |
| Data/Mono | JetBrains Mono | 400 | Normal |

**Type Scale:**
- display-xl: 4.5rem / 1.02 line-height (hero headlines)
- display-lg: 3.5rem / 1.05 (section headlines)
- display: 2.75rem / 1.08 (page titles)
- display-sm: 2rem / 1.12 (subsection titles)
- headline: 1.5rem / 1.3 (card titles)
- subheadline: 1.125rem / 1.5 (body large)
- body: 1rem / 1.6 (standard body)
- caption: 0.875rem / 1.5 (labels, metadata)

### Design Principles

1. **Apple-like clarity** — Generous whitespace, single-focus sections, one CTA per viewport
2. **Medical credibility** — Lab imagery, provider credentials, clinical language
3. **Premium restraint** — No clutter, no carousels, no competing visual elements
4. **Mobile-first** — Designed for thumb reach, fast load, readable on small screens
5. **Dark elegance** — Dark backgrounds as default, light used for contrast sections
6. **Motion with purpose** — Animations reveal content, never distract

### Effects & Treatments

**Glass Morphism:**
```css
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

**Gradient Backgrounds:**
- Hero: `linear-gradient(180deg, #09090b 0%, #18181b 100%)` with radial overlay
- Silver accent: `linear-gradient(135deg, #b8b8bd, #fff, #8a8a8f)`

**Text Gradients:**
- Chrome text: `linear-gradient(135deg, #e5e5e7, #fff, #a1a1aa)`
- White fade: `linear-gradient(135deg, #fff, #d4d4d8)`

**Animations (Framer Motion):**
- Fade in: 0.6s ease-out, opacity 0→1
- Slide up: 0.6s ease-out, translateY(20px→0)
- Shimmer: 2.5s linear infinite (for loading states)
- Stagger children: 0.1s delay between siblings

### Helix Visual Motif

Subtle DNA/metabolic helix used as:
- Background element in hero sections (low opacity, animated rotation)
- Section dividers (stylized helix line)
- Loading animation (helix spiral)
- 3D element on hover (for interactive sections)

Implementation: SVG paths with Framer Motion animation. Not a literal double helix — abstracted into flowing curves that suggest biological optimization.

### Photography Direction

- Real people, not stock models
- Diverse in age (35-55), gender, ethnicity
- Professional, active, confident
- Warm lighting, natural settings
- No lab coats unless showing actual provider
- No syringes, pills, or medical equipment as hero imagery
- Focus on outcomes: energy, vitality, confidence, wellness

### Iconography

- Library: Lucide React (already integrated)
- Style: 1.5px stroke weight, clean line icons
- Usage: Navigation, feature lists, process steps
- Never: Filled icons, emoji as icons, complex illustrations

### Logo Direction

- Wordmark: "Bloom Metabolics" in Inter Tight, weight 600
- Mark: Abstract helix/bloom shape — curves suggesting both DNA strands and plant growth
- Monogram: "MB" for app icons, favicons
- Colors: White on dark, or graphite-900 on light
- Minimum size: 24px height for mark, 120px width for wordmark

---

## Compliance-Safe Copy Rules

1. Never make absolute health claims — always qualify with "may," "commonly report," "individual results vary"
2. Include "Individual results vary" near any outcome mention
3. Testimonials require "Results not typical" or "Individual results vary" disclaimer
4. Never imply compounded medications are FDA-approved or equivalent to brand-name
5. Never position AI as making medical decisions
6. Include "This is not medical advice" on educational content
7. Emergency disclaimer: "If experiencing a medical emergency, call 911"
8. Pricing pages: "Medication costs included" only if true; otherwise specify what's included
