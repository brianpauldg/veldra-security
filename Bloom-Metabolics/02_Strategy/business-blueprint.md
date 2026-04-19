# Business Blueprint — Bloom Metabolics

---

## Business Model

**Type:** Cash-pay telehealth subscriptions
**Revenue:** Monthly recurring revenue (MRR) from treatment subscriptions
**Margin drivers:** AI-powered operations (lean team), direct-to-patient (no insurance overhead), subscription retention
**No insurance billing.** Patients pay directly. This eliminates: credentialing with payers, claims processing, denied claims, delayed payments, and compliance with insurer formularies.

---

## Offer Ladder

| Tier | Price | What's Included | Target |
|------|-------|-----------------|--------|
| **Consultation** | $49 one-time | 15-min video consult with licensed provider, lab order, treatment recommendation. Refundable if patient doesn't qualify. | All new patients |
| **TRT Standard** | $149/mo | Testosterone therapy, labs every 6 months, provider messaging, quarterly check-ins | Men seeking reliable TRT |
| **TRT Premium** | $199/mo | Everything in Standard + comprehensive labs every 3 months, peptide add-on option, priority scheduling | Optimization-focused patients |
| **GLP-1 Core** | $249/mo | Compounded semaglutide, monthly check-ins, nutrition guide, provider messaging | Weight loss patients |
| **GLP-1 Complete** | $349/mo | Everything in Core + comprehensive metabolic labs, coaching support, meal planning guide | Premium weight loss patients |
| **Peptide Protocol** | $199-299/mo | Curated peptide protocols (BPC-157, sermorelin, etc.), monitoring, provider oversight | Longevity/recovery focused |
| **Optimization Bundle** | $399/mo | TRT + GLP-1 + Peptides, full metabolic panel, priority everything | Maximum optimization |

**Upsell paths:**
- Consultation → any treatment tier
- TRT Standard → TRT Premium
- GLP-1 Core → GLP-1 Complete
- Any single service → Optimization Bundle
- All tiers → add peptide protocol

---

## Patient Journey

```
AWARENESS                    CONSIDERATION                 CONVERSION
─────────────────────────────────────────────────────────────────────
Google Ad / SEO / Referral → Landing Page → Quiz/Assessment
                                                    ↓
                                              Results Page
                                              (Score + Pricing)
                                                    ↓
                                              Book Consultation
                                              ($49 via Stripe)
                                                    ↓
ONBOARDING                                    Calendly Booking
─────────────────────────────────────────────────────────────────────
                                              Intake Forms
                                              (Medical history,
                                               symptoms, goals)
                                                    ↓
                                              Video Consultation
                                              (15 min with provider)
                                                    ↓
                                              Lab Order
                                              (Quest/Labcorp
                                               requisition sent)
                                                    ↓
                                              Patient Gets Labs
                                              (Walk-in, 1-3 days
                                               for results)
                                                    ↓
TREATMENT                                     Provider Review
─────────────────────────────────────────────────────────────────────
                                              Treatment Plan +
                                              Subscription Selection
                                                    ↓
                                              Prescription →
                                              Pharmacy Fulfillment
                                              (Ships in 2-5 days)
                                                    ↓
RETENTION                                     Active Treatment
─────────────────────────────────────────────────────────────────────
                                              Monthly Check-Ins
                                              (automated + provider)
                                                    ↓
                                              Scheduled Labs
                                              (quarterly or biannual)
                                                    ↓
                                              Refill Processing
                                              (auto-request, pharmacy
                                               ships direct)
                                                    ↓
                                              Protocol Adjustments
                                              (based on labs + symptoms)
                                                    ↓
                                              Cross-Sell / Upsell
                                              (additional services
                                               based on lab insights)
```

---

## Clinical Operations

### Provider Network
- **Launch:** 1 provider (MD/DO or NP with prescribing authority + DEA registration)
- **Day 30:** 1-2 providers covering 10+ states
- **Day 90:** 3-5 providers covering 20+ states
- **Model:** Independent contractor agreements with defined clinical protocols
- **Backup:** Physician network partnership (OpenLoop or Wheel) for surge/coverage

### Prescription Workflow
1. Provider completes consult and reviews labs
2. Provider selects treatment protocol from standardized options
3. Provider sends e-prescription to pharmacy partner
4. Pharmacy compounds/fills and ships directly to patient
5. Provider documents in EHR with treatment rationale

### Lab Workflow
1. Provider orders lab panel based on treatment track
2. Patient receives requisition (email/portal)
3. Patient walks into Quest/Labcorp (nationwide locations)
4. Results returned electronically (1-3 business days)
5. Dashboard flags out-of-range values automatically
6. Provider reviews and communicates results to patient

### Pharmacy Partnerships
- **Primary:** Compounding pharmacy (503A licensed) for testosterone cypionate, compounded semaglutide
- **Secondary:** Retail pharmacy partner for branded medications
- **Requirements:** BAA signed, competitive pricing, 2-5 day shipping, electronic ordering

---

## Non-Clinical Operations

### Marketing
- Paid ads (Google, Meta) managed by founder initially
- SEO/content via Claude Research Agent + human review
- Email/SMS nurture via GHL + SendGrid + Content Agent
- Social media (Instagram, LinkedIn) 3x/week

### Sales
- No sales team at launch. Website + quiz + booking flow handles conversion.
- Future: SDR for partner outreach (Day 30+)

### Support
- AI-first triage (Service Ops Agent handles routine questions)
- Human escalation for clinical questions (routed to provider)
- Support channels: In-app messaging, email
- SLA: Routine < 24 hours, Clinical < 4 hours, Emergency → 911 redirect

### Billing
- Stripe handles all subscription billing, invoicing, receipts
- Failed payment → automatic retry (Day 3, Day 5) + email notification
- Cancellation → retention flow → easy cancel if patient insists

---

## Required Vendor Stack

| Function | Recommended | Backup | Priority |
|----------|-------------|--------|----------|
| EHR | Cerbo EHR | Healthie | CRITICAL — Week 1 |
| Pharmacy (compounding) | Empower Pharmacy | Hallandale | CRITICAL — Week 1 |
| Pharmacy (retail) | Alto / Amazon Pharmacy | Local retail | MEDIUM — Week 3 |
| Lab Partner | Quest Diagnostics | Labcorp | CRITICAL — Week 1 |
| Payment | Stripe (existing) | — | ✅ Ready |
| CRM | GoHighLevel (existing) | — | ✅ Ready |
| Automation | n8n (existing) | — | ✅ Ready |
| Email | SendGrid (existing) | Resend | ✅ SDK ready |
| SMS | Twilio (existing) | GHL built-in | ✅ SDK ready |
| Scheduling | Calendly | Cal.com | ✅ Integrated |
| Video Consult | EHR-native / Zoom HIPAA | Doxy.me | MEDIUM — Week 1 |
| Hosting | Vercel | AWS Amplify | HIGH — Day 1 |
| Database | Supabase (existing) | — | ✅ Ready |

---

## 14-Day Sprint to First Patient

| Day | Focus | Key Deliverables |
|-----|-------|-----------------|
| 1 | Foundation | Register domain, create Stripe products, begin brand rename |
| 2 | Legal + Brand | Complete rename, engage attorney, research pharmacy/lab partners |
| 3 | Provider + Tech | Post provider jobs, configure Stripe, deploy website |
| 4-5 | Integrations | Pharmacy/lab outreach, Stripe webhooks, email templates, end-to-end test |
| 6-7 | Marketing | Email sequences, Google Ads setup, social profiles, blog posts |
| 8-9 | Clinical Readiness | Provider signed, protocols documented, consents finalized, EHR configured |
| 10-11 | Testing | Full flow test, automation test, bug fixes |
| 12-13 | Soft Launch | Warm network (friends, family), first 5-10 consultations |
| 14 | Public Launch | Ads on, social announce, partner outreach begins |

---

## 30-Day Stabilization (Day 15-44)

- **Week 3:** Optimize funnel from conversion data, adjust ad spend, 15-20 active patients
- **Week 4:** Launch peptide offering, first partner signed, 2nd provider if needed
- **Week 5-6:** 30-50 active patients, implement retention workflows, launch referral program
- **Target MRR:** $4,000-8,000

---

## 90-Day Scale (Day 45-104)

- **Month 2:** Expand to 10+ states, 100+ patients, 3+ providers, automate refill processing
- **Month 3:** Advanced analytics, cohort tracking, insurance pathway for branded GLP-1, consider fundraising
- **Target MRR:** $25,000-50,000

---

## Unit Economics

| Metric | Target |
|--------|--------|
| Average Revenue Per User (ARPU) | $225/mo |
| Cost of Goods (medication + labs + pharmacy) | ~$60-80/mo |
| Provider cost per patient per month | ~$20-30/mo |
| Gross margin | ~55-65% |
| Customer Acquisition Cost (CAC) | <$200 |
| Lifetime Value (LTV) at 12-month avg retention | $2,700 |
| LTV:CAC Ratio | >10:1 |
| Monthly churn target | <5% |
| Payback period | <1 month |
