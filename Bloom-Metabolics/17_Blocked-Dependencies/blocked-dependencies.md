# Blocked Dependencies — Requiring Human Action

---

## Status Key
- 🔴 BLOCKED — Cannot proceed without this
- 🟡 IN PROGRESS — Started, awaiting completion
- 🟢 RESOLVED — Completed

---

| # | Dependency | Status | Owner | What's Needed | Impact If Delayed | Est. Time |
|---|-----------|--------|-------|---------------|-------------------|-----------|
| 1 | **Domain Registration** | 🔴 | Founder | Registrar access + credit card. Register bloommetabolics.com + .health | Site cannot go live | 30 min |
| 2 | **Attorney Engagement** | 🔴 | Founder | Find and hire healthcare attorney for telehealth consent, ToS, privacy policy, compliance review | Legal risk on all patient-facing docs | 1-2 weeks |
| 3 | **Provider Recruitment** | 🔴 | Founder | MD/DO or NP with: prescribing authority, DEA registration, multi-state licenses (TX, FL, CA, AZ, CO minimum) | Zero patients possible | 5-14 days |
| 4 | **Pharmacy Partnership** | 🔴 | Founder | Contact Empower, Hallandale, Precision Medicine, or similar 503A compounding pharmacy. Need: BAA, competitive pricing, 2-5 day shipping | Cannot fulfill prescriptions | 7-14 days |
| 5 | **Lab Partnership** | 🔴 | Founder | Quest Diagnostics and/or Labcorp direct account. Need: electronic requisition, results delivery, BAA | Cannot order lab work | 3-7 days |
| 6 | **EHR Account** | 🔴 | Founder | Sign up for Cerbo EHR (recommended). Need: account creation, contract, BAA, configuration | No compliant medical records | 3-7 days |
| 7 | **Stripe Products** | 🔴 | Founder | Access Stripe dashboard. Create 7 products with subscription prices | Checkout will fail | 1-2 hours |
| 8 | **SendGrid Templates** | 🟡 | Dev/Founder | Access SendGrid dashboard. Create email templates for all sequences | Nurture emails won't send | 2-4 hours |
| 9 | **Google Ads Account** | 🔴 | Founder | Create Google Ads account, billing, campaign setup | No paid acquisition channel | 1-2 hours |
| 10 | **State Licensing Verification** | 🔴 | Founder + Provider | Verify provider's active licenses in target launch states | Cannot treat patients in unlicensed states | 1-2 days |
| 11 | **BAA Signatures** | 🔴 | Founder + Attorney | Execute BAAs with: Supabase (upgrade to Pro), Stripe, SendGrid, Twilio, GHL, EHR, pharmacy, lab | HIPAA violation risk | 1-4 weeks |
| 12 | **Insurance/Liability Coverage** | 🔴 | Founder | Professional liability insurance for the practice + general business insurance | Legal exposure | 1-2 weeks |

---

## Parallel Workstreams While Blocked

These can proceed regardless of blocked dependencies:

| Workstream | Status | Details |
|-----------|--------|---------|
| ✅ Codebase rename (Nova → Bloom Metabolics) | Ready to execute | All 70 files mapped, replacement strings defined |
| ✅ Email sequence copy | Complete | 11 emails written, ready to deploy |
| ✅ Website copy (homepage, TRT, GLP-1) | Complete | Full copy for 3 pages |
| ✅ Intake form specifications | Complete | 16 forms specified |
| ✅ Dashboard specification | Complete | 14 modules defined |
| ✅ CRM pipeline schema | Ready to deploy | 4 pipelines, custom fields, tags |
| ✅ Automation workflows | Mapped | 20 automations documented |
| ✅ SOP documentation | 6 of 18 complete | Critical launch SOPs written |
| ✅ Partner outreach assets | Complete | Email templates, referral program |
| ✅ Compliance checklist | Complete | All items categorized and assigned |
| ✅ Brand identity | Complete | Colors, typography, voice, design system |
| ✅ Competitor analysis | Complete | 10+ competitors analyzed |

---

## Handoff Instructions

### For Attorney
- Review consent frameworks at `/04_Compliance/consent-frameworks.md`
- Review compliance checklist at `/04_Compliance/compliance-checklist.md`
- Priority deliverables: Telehealth informed consent, Terms of Service, Privacy Policy/NPP
- Timeline: Need first drafts within 5 business days

### For Provider
- Review clinical protocols needed for TRT and GLP-1
- Confirm state licenses and DEA registration
- Review intake form specifications at `/06_Intake-Forms/intake-forms-spec.md`
- Configure EHR with standardized templates
- Timeline: Need to be operational within 8-9 days

### For Pharmacy Partner
- We need: BAA, competitive pricing for testosterone cypionate + compounded semaglutide
- We offer: Predictable prescription volume, electronic ordering, fast-growing patient base
- Timeline: Need partnership confirmed within 7 days

### For Lab Partner
- We need: BAA, electronic requisition capability, results delivery (API or portal)
- We offer: Growing test volume, standardized panel orders, multi-state patients
- Timeline: Need partnership confirmed within 5 days
