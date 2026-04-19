# EHR & HIPAA Tech Stack Evaluation

---

## Evaluation Criteria

| Criteria | Weight | Description |
|----------|--------|-------------|
| Launch Speed | 25% | How fast can we go live? |
| HIPAA/BAA | 20% | Is BAA available? Is the platform HIPAA-compliant? |
| Integration | 20% | APIs, webhooks, CRM/automation compatibility |
| Patient UX | 15% | Patient portal quality, mobile experience |
| E-Prescribe | 10% | EPCS capability for controlled substances |
| Cost | 10% | Monthly cost at launch scale |

---

## EHR Options Evaluated

### 1. Cerbo EHR ⭐ RECOMMENDED

**What:** Purpose-built EHR for cash-pay practices, integrative medicine, hormone therapy, and functional medicine.

| Attribute | Detail |
|-----------|--------|
| HIPAA/BAA | ✅ Full HIPAA compliance, BAA included |
| E-Prescribe | ✅ Yes, including EPCS for controlled substances (testosterone) |
| Telehealth | ✅ Built-in video visits |
| Patient Portal | ✅ Modern, mobile-friendly |
| Lab Integration | ✅ Quest, Labcorp direct integration |
| API | ✅ REST API for custom integrations |
| Scheduling | ✅ Built-in scheduling |
| Forms/Intake | ✅ Custom intake forms |
| Cost | $250-400/mo (varies by provider count) |
| Launch Speed | 1-2 weeks |

**Pros:**
- Built for exactly our use case (cash-pay hormone clinics)
- Many TRT/peptide clinics already use Cerbo
- Lab ordering + results built in
- E-prescribing including controlled substances
- Custom protocol templates
- Good API for automation

**Cons:**
- Not the most modern UI
- Limited marketing/CRM features (but we have GHL)
- Smaller company — support can be slow

### 2. Healthie

| Attribute | Detail |
|-----------|--------|
| HIPAA/BAA | ✅ Full HIPAA, BAA included |
| E-Prescribe | ❌ No (requires separate integration) |
| Telehealth | ✅ Built-in |
| Patient Portal | ✅ Modern, best-in-class |
| Lab Integration | ⚠️ Limited — manual upload or API |
| API | ✅ GraphQL API |
| Cost | $150-350/mo |
| Launch Speed | 1 week |

**Pros:** Best patient portal UX, great API, good for nutrition/coaching component
**Cons:** No e-prescribe is a dealbreaker for TRT (Schedule III)

### 3. DrChrono

| Attribute | Detail |
|-----------|--------|
| HIPAA/BAA | ✅ Full HIPAA, BAA included |
| E-Prescribe | ✅ Yes, including EPCS |
| Telehealth | ✅ Built-in |
| Patient Portal | ⚠️ Functional but dated |
| Lab Integration | ✅ Quest, Labcorp |
| API | ✅ REST API |
| Cost | $300-500/mo |
| Launch Speed | 2-3 weeks |

**Pros:** Full-featured EHR, strong e-prescribe, good lab integration
**Cons:** More complex than needed, higher cost, longer setup, designed for larger practices

### 4. Charm Health

| Attribute | Detail |
|-----------|--------|
| HIPAA/BAA | ✅ HIPAA compliant |
| E-Prescribe | ✅ Yes, including EPCS |
| Telehealth | ✅ Built-in |
| Patient Portal | ⚠️ Basic |
| Lab Integration | ⚠️ Limited |
| API | ❌ Limited API |
| Cost | Free tier available, $100-300/mo for full features |
| Launch Speed | 1 week |

**Pros:** Low cost entry, e-prescribe included
**Cons:** Limited API makes automation difficult, basic patient UX

### 5. Practice Better

| Attribute | Detail |
|-----------|--------|
| E-Prescribe | ❌ No |
| Focus | Wellness, nutrition, coaching |
| **Verdict** | ❌ Not suitable — no prescribing capability |

### 6. OpenLoop Health

**What:** Not an EHR — a physician network + compliance infrastructure. Provides access to licensed providers across all 50 states.

| Attribute | Detail |
|-----------|--------|
| What it does | Provides credentialed providers, compliance oversight, state licensing |
| What it doesn't do | EHR, patient portal, scheduling, billing |
| Cost | Revenue share or per-encounter fee |
| Best for | Brands that need providers fast without building a clinical team |

**Consideration:** Could use OpenLoop for provider network while using Cerbo for EHR. MEDVi uses OpenLoop for their provider network.

### 7. Wheel

**What:** Clinician marketplace for telehealth brands. Similar to OpenLoop.

| Attribute | Detail |
|-----------|--------|
| What it does | On-demand clinicians, quality assurance, compliance |
| What it doesn't do | EHR, billing, patient relationship management |
| Cost | Per-encounter fee ($30-60 per visit) |
| Best for | Scaling provider coverage quickly |

### 8. SteadyMD

**What:** White-label telehealth infrastructure with dedicated providers.

| Attribute | Detail |
|-----------|--------|
| What it does | Dedicated providers (not marketplace), white-label, full clinical services |
| What it doesn't do | Marketing, patient acquisition |
| Cost | Higher — dedicated provider model |
| Best for | Brands wanting their own clinical team without recruiting |

---

## Rankings

### Fastest to Launch
1. **Cerbo EHR** — 1-2 weeks, built for our exact use case
2. Charm Health — 1 week, but limited integrations
3. Healthie — 1 week, but no e-prescribe

### Best Long-Term Scalability
1. **Cerbo EHR** — Scales with cash-pay practices, good API
2. DrChrono — More features for larger practices
3. Healthie — Best API, but needs e-prescribe add-on

### Best Integration Flexibility
1. Healthie — GraphQL API, modern architecture
2. **Cerbo EHR** — REST API, good webhooks
3. DrChrono — REST API, comprehensive

### Best Patient UX
1. Healthie — Modern, intuitive patient portal
2. **Cerbo EHR** — Good, purpose-built for wellness practices
3. DrChrono — Functional but dated

---

## Recommendation

### Primary Stack: Cerbo EHR

**Why:** It is the only EHR that checks every box for a cash-pay TRT/GLP-1/peptide telehealth practice at launch:
- HIPAA + BAA ✅
- E-prescribe including EPCS (testosterone) ✅
- Lab integration (Quest, Labcorp) ✅
- Telehealth built-in ✅
- Patient portal ✅
- API for custom integrations ✅
- Used by many hormone clinics already ✅
- Reasonable cost ($250-400/mo) ✅

### Backup Stack: DrChrono

**Why:** Full-featured alternative if Cerbo doesn't meet needs. More complex but more comprehensive.

### Provider Network: OpenLoop or Wheel (as needed)

**Why:** For surge capacity or rapid state expansion without recruiting individual providers.

---

## Data Architecture

```
                    ┌─────────────────┐
                    │   PATIENT       │
                    │   (Website)     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  MARKETING SITE │
                    │  (Next.js)      │
                    │  Quiz, Booking  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
    │  CRM (GHL)     │ │ PAYMENTS │ │ AUTOMATION  │
    │  Lead tracking │ │ (Stripe) │ │ (n8n)       │
    │  Pipelines     │ │ Subs     │ │ Workflows   │
    │  Tags/Fields   │ │ Invoices │ │ Triggers    │
    └─────────┬──────┘ └────┬─────┘ └──────┬──────┘
              │              │              │
              └──────────────┼──────────────┘
                             │
                    ┌────────▼────────┐
                    │  EHR (Cerbo)    │
                    │  Patient chart  │    ← PHI BOUNDARY
                    │  Labs           │    All PHI lives here
                    │  E-prescribe    │    BAA required
                    │  Telehealth     │
                    │  Notes          │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
    │  LAB PARTNER   │ │ PHARMACY │ │ DASHBOARD   │
    │  (Quest/       │ │ (Empower/│ │ (Next.js    │
    │   Labcorp)     │ │  Other)  │ │  /clinic)   │
    │  Orders +      │ │ Rx fill  │ │  Ops view   │
    │  Results       │ │ + ship   │ │  Non-PHI    │
    └────────────────┘ └──────────┘ └──────┬──────┘
                                           │
                                  ┌────────▼────────┐
                                  │  CLAUDE AGENTS  │
                                  │  (MCP Adapter)  │
                                  │  Aggregated     │
                                  │  Non-PHI data   │
                                  │  only           │
                                  └─────────────────┘
```

### PHI Boundary Rules
- **PHI stays in EHR.** Patient medical records, lab results, prescriptions, clinical notes — all in Cerbo.
- **CRM gets PII only.** Name, email, phone, service interest, pipeline stage — no medical data.
- **Dashboard shows operational data.** Patient counts, pipeline metrics, task lists — no individual PHI.
- **Agents access aggregated/anonymized data only.** Through MCP adapter layer, never direct DB access to PHI.
- **Supabase stores operational data.** Non-PHI business data, agent tasks, audit logs, analytics.
