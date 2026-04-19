# Rename Map — Nova Health → Bloom Metabolics

---

## Global String Replacements

| Search | Replace | Context |
|--------|---------|---------|
| `Nova Health` | `Bloom Metabolics` | Brand name (all user-facing text) |
| `nova health` | `metabolic blooms` | Lowercase brand references |
| `NOVA HEALTH` | `BLOOM METABOLICS` | Uppercase references |
| `Nova Health's` | `Bloom Metabolics'` | Possessive form |
| `novahealth` | `bloommetabolics` | Package name, slugs, URLs |
| `nova-health` | `bloom-metabolics` | Kebab-case references |
| `NovaHealth` | `BloomMetabolics` | PascalCase references |
| `NOVA_` | `BLOOM_` | Env variable prefixes (e.g., NOVA_AGENT_API_KEY) |
| `novahealth.app.n8n.cloud` | `bloommetabolics.app.n8n.cloud` | n8n instance URL (if renamed) |

## CSS / Design Token Renames

| Search | Replace | File |
|--------|---------|------|
| `nova-50` through `nova-900` | `bloom-50` through `bloom-900` | tailwind.config.ts |
| All `nova-` color references in TSX/CSS | `bloom-` equivalents | All component/page files |

---

## Execution Order

### Phase 1: Foundation (Day 1)

**1. package.json**
- `"name": "novahealth"` → `"name": "bloommetabolics"`

**2. .env.local / .env.example**
- `NEXT_PUBLIC_APP_NAME="Nova Health"` → `"Bloom Metabolics"`
- `NEXT_PUBLIC_SITE_URL` → `https://bloommetabolics.com`
- `NOVA_AGENT_API_KEY` → `BLOOM_AGENT_API_KEY` (or keep both during transition)

**3. tailwind.config.ts**
- Rename `nova` color scale to `bloom` (all 10 shades)

### Phase 2: Core Libraries (Day 1-2)

**4. lib/agents.ts** — All 8 agent system prompts reference "Nova Health"
**5. lib/types.ts** — Service types and schemas
**6. lib/clinic/types.ts** — Protocol types
**7. lib/attribution.ts** — Attribution tracking
**8. lib/notify.ts** — Notification templates
**9. lib/pricing.ts** — ROI calculations
**10. lib/clinic/data-service.ts** — Data queries
**11. lib/clinic/alerts.ts** — Alert generation
**12. lib/clinic/audit.ts** — Audit logging
**13. lib/clinic/push-notify.ts** — Push notifications
**14. lib/clinic/roles.ts** — RBAC definitions
**15. lib/clinic/seed-data.ts** — Demo data

### Phase 3: Components (Day 2)

**16. components/Header.tsx** — Logo text, brand link
**17. components/Footer.tsx** — Brand name, copyright
**18. components/SchemaMarkup.tsx** — JSON-LD "Nova Health" in Organization schema
**19. components/MedicalDirectorBio.tsx** — Provider credential text

### Phase 4: App Pages (Day 2)

**20-32. All app/ pages** (13 marketing + 3 checkout + 7 clinic + others):
- `/app/page.tsx` — Homepage hero, value props
- `/app/about/page.tsx` — Company info
- `/app/services/page.tsx` — Service overview
- `/app/pricing/page.tsx` — Pricing table
- `/app/how-it-works/page.tsx` — Process walkthrough
- `/app/faq/page.tsx` — FAQ content
- `/app/contact/page.tsx` — Contact form
- `/app/trt/page.tsx` — TRT landing page
- `/app/glp1/page.tsx` — GLP-1 landing page
- `/app/peptides/page.tsx` — Peptides page
- `/app/vs/hims/page.tsx` — Comparison page
- `/app/vs/roman/page.tsx` — Comparison page
- `/app/book/page.tsx` — Booking form
- `/app/booking/page.tsx` — Alt booking
- `/app/checkout/page.tsx` — Checkout
- `/app/layout.tsx` — Root layout metadata
- `/app/clinic/` — All clinic dashboard pages

### Phase 5: API Routes (Day 2)

**33-37. API routes:**
- `/app/api/leads/route.ts` — Health check response
- `/app/api/clinic/agents/route.ts` — Agent service description
- `/app/api/checkout/route.ts` — Stripe integration
- `/app/api/clinic/n8n-webhook/route.ts` — Webhook handler
- `/app/api/clinic/notify/route.ts` — Notification routing

### Phase 6: Platform Code (Day 2)

**38-45. platform/src/ files:**
- `index.ts` — Express app name
- `config.ts` — Constants
- `core/workflow-engine.ts` — Workflow names
- `core/agent-registry.ts` — Agent references
- `queue/lead-intake.ts` — Queue names
- `webhooks/router.ts` — Webhook names
- `services/lead-service.ts` — Service references
- All other platform files with brand references

### Phase 7: Agent & Marketing Files (Day 2-3)

**46. .agents/product-marketing-context.md** — Central positioning doc (CRITICAL)
**47-65. .agents/skills/*/SKILL.md** — All 35 skill files
**66-70. .agents/prospecting/*.md** — All 5 prospecting docs
**71. .agents/tools/REGISTRY.md** — Tool registry

### Phase 8: Documentation (Day 3)

**72. BUILD_COMPLETE.md**
**73. QUICK_START.md**
**74. VELDRA_README.md**
**75. FEATURE_MATRIX.md**
**76. SECURITY_AUDIT.md**
**77. IMPLEMENTATION_CHECKLIST.md**
**78. CLAUDE.md**
**79. README.md**
**80. platform/docs/NOVA_AGENT_REGISTRY.md**
**81. platform/growth-engine/*.md** — All 5 growth engine docs

### Phase 9: Configuration & Workflows (Day 3)

**82. n8n-nova-health-workflow.json** — Workflow name + webhook names
**83. .mcp.json** — Check for brand references
**84. next.config.js** — Comments
**85. supabase-schema.sql** — Comments only (no schema changes needed)
**86. supabase-setup.sql** — Comments only

---

## Color Token Migration

In `tailwind.config.ts`, rename the `nova` color scale:

```
nova-50: '#fafafa'    →    bloom-50: '#fafafa'
nova-100: '#f4f4f5'   →    bloom-100: '#f4f4f5'
nova-200: '#e5e5e7'   →    bloom-200: '#e5e5e7'
nova-300: '#d4d4d8'   →    bloom-300: '#d4d4d8'
nova-400: '#b8b8bd'   →    bloom-400: '#b8b8bd'
nova-500: '#8a8a8f'   →    bloom-500: '#8a8a8f'
nova-600: '#6b6b70'   →    bloom-600: '#6b6b70'
nova-700: '#4a4a4e'   →    bloom-700: '#4a4a4e'
nova-800: '#2d2d30'   →    bloom-800: '#2d2d30'
nova-900: '#1a1a1d'   →    bloom-900: '#1a1a1d'
```

Then find-and-replace all `nova-` color class references across all TSX and CSS files.

---

## Verification Checklist

After rename is complete:
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run dev` starts without errors
- [ ] All pages render correctly with new brand name
- [ ] Grep for "Nova Health" returns 0 results (excluding git history)
- [ ] Grep for "nova-" in TSX/CSS returns 0 results (colors renamed to bloom-)
- [ ] All API endpoints respond correctly
- [ ] Lead capture form submits to GHL with correct tags
- [ ] Schema markup (JSON-LD) shows "Bloom Metabolics"
- [ ] Browser tab titles show "Bloom Metabolics"
- [ ] Footer copyright shows "Bloom Metabolics"
