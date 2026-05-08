# Claude Code Prompt — Build QR-Routed Injection Protocol Pages on bloommetabolics.com

> **Context:** This prompt is saved as part of SOP-004 (Patient Self-Administration Injection Education) and is designed to be executed in a separate Claude Code session to build the patient-facing web pages. The clinical content for each protocol is sourced from the Markdown protocol attachments in `compliance/sops/SOP-004-injection-education/attachments/`.

---

## Task: Build Injection Education System with QR-Routed Protocol Pages

### Context
You are working in the Bloom Metabolics Next.js application deployed on Vercel. This task builds a patient-facing injection education system accessed via QR codes printed on medication packaging inserts. Three QR codes route to three protocol-specific pages (two future-state protocols are architecture-ready but not rendered until activated). The system must be production-ready, compliance-aware, and aesthetically consistent with the existing Bloom Metabolics dark serif brand system.

**Governing Document:** SOP-004 (Patient Self-Administration Injection Education) at `compliance/sops/SOP-004-injection-education/SOP-004-injection-education.md`

**Content Source:** Protocol Markdown attachments at:
- `compliance/sops/SOP-004-injection-education/attachments/protocol-001-trt-intramuscular/protocol-001-trt-intramuscular.md`
- `compliance/sops/SOP-004-injection-education/attachments/protocol-002-glp1-gip-subcutaneous/protocol-002-glp1-gip-subcutaneous.md`
- `compliance/sops/SOP-004-injection-education/attachments/protocol-003-hcg-subcutaneous/protocol-003-hcg-subcutaneous.md`

### Brand System (LOCKED — match existing codebase)
- **Backgrounds:** `bg-graphite-950` (#020202) for hero/CTA, `bg-ink` (#0d0c0a) for content, `bg-obsidian` (#050404) for cards
- **Typography:** `text-champagne` (#d8cfbe) for headlines via `font-display` (Fraunces), default body color (#a89878), `text-brass` (#8a8268) for accents
- **Classes:** Use existing `.text-display`, `.text-headline`, `.eyebrow`, `.glass` utility classes from `app/globals.css`
- **Tone:** Editorial, clinical, restrained. No emojis. No exclamation points.

### Architecture

**Routing:** Next.js App Router dynamic segment `app/inject/[protocol]/page.tsx` with `generateStaticParams` returning three slugs:
- `/inject/trt-im` — Testosterone Cypionate Intramuscular
- `/inject/glp1-subq` — Semaglutide / Tirzepatide Subcutaneous
- `/inject/hcg-subq` — HCG Subcutaneous

Protocol slugs match SOP-004 §5.4.

**Data Model:** Define in `lib/protocols/types.ts` — a `ProtocolContent` interface with syringe specs, angle, sites, rotation, aspiration, troubleshooting, storage, frequency, physician review date, and content version. Protocol data files at `lib/protocols/trt-im.ts`, `lib/protocols/glp1-subq.ts`, `lib/protocols/hcg-subq.ts` with a barrel export at `lib/protocols/index.ts`.

**Clinical content in the data files should be sourced from the Markdown protocol attachments** — do not hardcode content that diverges from the SOP-004 attachments. When the Covering Physician modifies protocol content, the Markdown source is updated first, then the web data files are synchronized per SOP-004 §5.8.

### Required Components

**File structure:**
```
app/inject/
  [protocol]/
    page.tsx
    not-found.tsx
    components/
      ProtocolHero.tsx
      SyringeIdentifier.tsx
      InjectionSiteMap.tsx
      AngleGuide.tsx
      VideoPlayer.tsx
      RotationTracker.tsx
      Troubleshooting.tsx
      AcknowledgmentForm.tsx
      EscalationCard.tsx
      Disclaimer.tsx
  layout.tsx
lib/
  protocols/
    types.ts
    trt-im.ts
    glp1-subq.ts
    hcg-subq.ts
    index.ts
  acknowledgment/
    submit.ts
```

**Component specifications:**

1. **ProtocolHero** — Full-width `bg-graphite-950` section. Fraunces headline with medication name and route. Bronze italic subhead. Metadata strip: review date, version, "Bloom Metabolics Clinical Team." **Must include a PROVISIONAL STATUS banner** while SOP-004 is in Provisional status — prominent, warm-tinted callout box stating the content is provisionally approved.

2. **SyringeIdentifier** — Two-column comparison (stacks on mobile). Active syringe card gets `border-brass` and "This Protocol" badge. Inactive card dimmed to 40% opacity with "Not for this medication" label. **Critical safety component.**

3. **InjectionSiteMap** — Inline React SVG anatomical diagrams (front body, back body). Recommended sites in brass, cautioned sites in muted steel with warning. Tap/hover reveals technique notes. SVGs as React components for theming.

4. **AngleGuide** — Cross-section SVG showing needle entry angle (90° or 45°). Shows skin/fat/muscle layers. Caption for pinch technique.

5. **VideoPlayer** — HTML5 `<video>` with placeholder card until videos are filmed. Chapter markers. Captions track (placeholder VTT).

6. **RotationTracker** — Printable rotation grid. "Print this page" button with print CSS.

7. **Troubleshooting** — Accordion of common scenarios from protocol data. Each answer ends with care team portal reference.

8. **EscalationCard** — Bronze-bordered card: Message care team (OptiMantra portal), Call clinic, 911 emergency.

9. **AcknowledgmentForm** — Client component. Checkbox + patient identifier + submit. Server Action posts to stub endpoint (TODO: wire to OptiMantra per SOP-004 §5.5). localStorage persistence for returning patients.

10. **Disclaimer** — Required compliance language per SOP-004. Physician name and review date from protocol data.

### Compliance Requirements

- JSON-LD `MedicalWebPage` structured data with `medicalAudience: "Patient"` and `lastReviewed`
- `robots: { index: true, follow: true }` per content gating decision (public with disclaimer)
- All SVGs include `<title>` and `<desc>` for screen readers
- WCAG AA color contrast (verify brass on dark surfaces)
- Keyboard navigation with visible focus states
- 404 handling via `not-found.tsx` for invalid slugs

### QR Code Generation
After pages are built, generate three QR codes:
- `https://bloommetabolics.com/inject/trt-im`
- `https://bloommetabolics.com/inject/glp1-subq`
- `https://bloommetabolics.com/inject/hcg-subq`

Output: 1200x1200 PNG, error correction level H, saved to `public/inject/qr/`. Use `qrcode` npm package. No logo overlay in v1.

### Acceptance Criteria
1. All three URLs render on desktop and mobile
2. Visual consistency with Bloom brand system
3. Syringe identifier clearly distinguishes correct vs. incorrect syringe
4. Anatomical SVGs render inline, are theme-able
5. Acknowledgment form submits (stub endpoint OK) and persists in localStorage
6. Print stylesheet produces clean rotation tracker
7. Lighthouse 95+ Performance, 100 Accessibility, 100 SEO
8. QR code PNGs generated
9. TypeScript strict mode passes
10. PROVISIONAL STATUS banner visible on all pages

### Out of Scope
- OptiMantra webhook integration (stub the server action)
- Actual injection videos (placeholder cards)
- Patient portal authentication gating
- BPC-157 / TB-500 pages (architecture supports; content post-LegitScript)
