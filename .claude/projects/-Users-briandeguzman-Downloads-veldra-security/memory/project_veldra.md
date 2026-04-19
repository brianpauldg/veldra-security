---
name: Bloom Metabolics Platform
description: Bloom Metabolics TRT telehealth practice with patient-facing site + internal clinical dashboard (Clinical OS). Stack, goals, and key architecture decisions.
type: project
---

Bloom Metabolics (repo: veldra-security) is a premium telehealth platform for TRT, GLP-1, and peptide therapy.

**Two surfaces:**
1. Patient-facing marketing site (public pages: /, /trt, /glp1, /peptides, /pricing, /booking, etc.)
2. Internal Clinical OS dashboard at `/clinic` — auth-gated to super_admin + physician only

**Stack:** Next.js 14, TypeScript, Tailwind CSS 4, React 18, Supabase, Zod, Recharts, Lucide icons, Framer Motion

**Clinical OS (built 2026-04-09):**
- Command Center dashboard with KPIs, alerts, tasks, refills, AI insights
- Patient list with search/sort/filter
- Patient profile with lab trend charts, vitals charts, medications, encounters, symptoms, AI panel
- Alerts page with severity filtering
- Tasks + Refills page with priority-based workflow
- Settings page with team/roles, MCP integration, notifications, security
- MCP adapter layer at `lib/clinic/mcp-adapter.ts` with 9 agent tools
- Alert/risk engine at `lib/clinic/alerts.ts`
- RBAC at `lib/clinic/roles.ts`
- Audit logging at `lib/clinic/audit.ts`
- API endpoint at `/api/clinic/mcp` for agent integration
- 22 seed patients with realistic TRT/GLP-1 lab histories

**Key design decisions:**
- Clinic layout is separate from public site (LayoutShell conditionally renders Header/Footer)
- Dashboard link added to public site Header for authenticated access
- Dark theme for clinical dashboard, light theme for public site
- Agent tools use Zod schemas for contract validation
- Notification system built in for agent-to-provider alerts

**Why:** Brian is building the founding infrastructure for a venture-scale TRT telehealth company. Dashboard must feel like a serious internal clinical operating system.

**How to apply:** All clinical features go under `/clinic`. Public site stays clean and marketing-focused. MCP agent integration is a first-class concern.
