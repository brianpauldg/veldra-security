# Transferable Patterns — Implementation Plan

What works across the industry and how we implement it.

---

## 1. Quiz-First Intake

**Pattern:** All high-converting telehealth sites lead with a 2-3 minute health assessment quiz. The quiz qualifies leads, pre-sells the service, and reduces booking friction.

**Current State:** We have `/quiz` (TRT) and `/glp1-quiz` (GLP-1) pages already built.

**Implementation:**
- Make quiz the primary CTA on homepage, treatment pages, and all ads
- Add scoring logic that produces a personalized results page
- Results page shows: risk/suitability score, recommended service, transparent pricing, immediate booking CTA
- Quiz completions auto-submit to `/api/leads` with `variant="quiz"` and score
- Qualifier Agent receives quiz data for enhanced lead scoring

**Effort:** 2-3 days (enhance existing quiz pages)
**Compliance:** Never diagnose. Frame as "assessment" or "screening." Include "This is not a diagnosis — results reviewed by a licensed provider."

---

## 2. Transparent Pricing Display

**Pattern:** Companies showing exact monthly cost on the page convert higher than those hiding pricing until consultation. TRT Nation ($99/mo flat), Fountain ($199/mo flat) lead with price.

**Current State:** Pricing page exists at `/pricing` with PricingTable component.

**Implementation:**
- Show exact monthly cost on every treatment page (not just /pricing)
- Format: "$149/mo — everything included" with bullet list of what's included
- Add comparison table: "What other clinics charge vs. what you pay here"
- "Cancel anytime" badge next to every price
- Include "What's included" breakdown (medication, labs, provider access, messaging)

**Effort:** 1 day (update existing PricingTable + treatment pages)
**Compliance:** Specify exactly what's included. If labs are only at scheduled intervals, say so.

---

## 3. Comprehensive Lab Storytelling

**Pattern:** Marek Health's biggest differentiator is "most comprehensive labs in the industry." Patients trust providers who test more thoroughly.

**Current State:** Lab reference ranges defined in `lib/clinic/types.ts`. No patient-facing lab education content.

**Implementation:**
- Create "Our Lab Panel" page or section on treatment pages
- Show side-by-side: "Budget TRT clinics test 3 markers. We test 15+" with specific marker names
- Educational content: What each marker means, why it matters
- Position comprehensive labs as the reason our treatment works better
- Add lab panel comparison to `/vs/` competitor pages

**Effort:** 2-3 days (new content sections + comparison data)
**Compliance:** Frame as "our approach to monitoring" not "other clinics are dangerous."

---

## 4. Multi-Service Bundling

**Pattern:** MEDVi's expansion from GLP-1 to meals + men's health + peptides shows the market wants a one-stop optimization platform.

**Current State:** We already offer TRT + GLP-1 + Peptides. Offer ladder defined but not fully implemented in checkout.

**Implementation:**
- Create the Optimization Bundle ($399/mo) as a cross-sell
- After initial consultation, provider recommends additional services based on labs
- In-app upgrade flow: "Your labs suggest you may benefit from [additional service]"
- Bundle discount messaging: "Save $50/mo with the Optimization Bundle"
- Stripe product for each tier + bundle

**Effort:** 1-2 days (Stripe products + pricing page update + cross-sell logic)
**Compliance:** Additional services always require provider review and approval.

---

## 5. Cancel Anytime Guarantee

**Pattern:** "Cancel anytime, no commitment" reduces purchase anxiety dramatically. MEDVi, Henry Meds, Fountain all lead with this.

**Current State:** Not explicitly stated on site.

**Implementation:**
- Add "Cancel Anytime" badge to all pricing displays
- Add to checkout page: "No contracts. No commitment. Cancel anytime from your account."
- Make cancellation genuinely easy: account settings → "Pause or Cancel" → immediate confirmation
- Add cancellation flow that offers pause option before cancel
- Track cancellation reasons for product improvement

**Effort:** 0.5 days (copy updates + cancellation flow design)
**Compliance:** FTC requires cancellation to be as easy as signup. Build this in from day one.

---

## 6. Speed-to-Treatment Metrics

**Pattern:** MEDVi's "24hr approval, 2-5 day shipping" wins because speed matters in DTC health. The fastest path from awareness to medication wins.

**Current State:** No speed claims on site.

**Implementation:**
- Advertise specific timelines: "Approved within 48 hours. Medication at your door within 5 days."
- Show timeline on How It Works page: Day 1 (quiz + book), Day 2-3 (consult + labs), Day 5-7 (provider review), Day 7-10 (medication shipped)
- Track actual time-to-treatment and display real averages
- Priority scheduling for TRT Premium and GLP-1 Complete tiers

**Effort:** 0.5 days (copy updates + process documentation)
**Compliance:** Only advertise timelines you can consistently deliver. "Typical" not "guaranteed."

---

## 7. Proactive Care Model

**Pattern:** This is our most defensible differentiator. "We reach out to you" is a claim almost no competitor can make at scale. Most competitors are reactive — patients must initiate contact.

**Current State:** Alert system exists in clinic dashboard. Monthly check-in forms specified.

**Implementation:**
- Automated monthly check-in: Email + in-app notification asking about symptoms, side effects, satisfaction
- Automated lab reminders: "Your labs are due in 2 weeks — here's how to schedule"
- Automated refill processing: "Your refill is due in 7 days — confirm your address"
- Provider-initiated messages after lab results: "Your labs look great, here's what we recommend"
- Churn prediction: Missed check-ins or declining scores trigger proactive outreach
- Market this heavily: "Unlike other clinics, we don't wait for you to call us."

**Effort:** 3-5 days (automation workflows + email/SMS templates + dashboard integration)
**Compliance:** Patient must consent to proactive communications. Include opt-out in every message.

---

## 8. Trust Signal Architecture

**Pattern:** Trustpilot ratings, media logos, patient counts, and provider credentials are table stakes. Fountain TRT (4.9/5 Trustpilot) converts at high rates partly because of review strength.

**Current State:** SchemaMarkup component exists. No Trustpilot integration. MedicalDirectorBio component exists.

**Implementation:**
- Set up Trustpilot business page (Day 1)
- Add Trustpilot widget to homepage and all treatment pages
- Request reviews from every satisfied patient (automated email at Day 30, 60, 90)
- Display provider credentials prominently (real name, real photo, real license)
- Pursue 1-2 legitimate press mentions (Forbes Health, Healthline contributor articles)
- Add trust badges: "Licensed Physicians," "Comprehensive Labs," "HIPAA Compliant"
- Add patient count when we have it: "Trusted by X patients"

**Effort:** 1-2 days (Trustpilot setup + badge design + widget integration)
**Compliance:** Never fabricate reviews. Never use AI-generated provider images. Display real credentials.

---

## 9. Results Guarantee

**Pattern:** Calibrate offers "10% weight loss or 50% refund." A meaningful guarantee builds trust and reduces purchase anxiety.

**Current State:** No guarantee on site.

**Implementation:**
- Offer: "Measurable improvement in your labs within 90 days, or we'll adjust your protocol at no extra cost."
- This is a process guarantee (we'll keep working) not an outcome guarantee (you'll lose X pounds)
- Alternative framing: "If you don't see improvement in your lab markers within 90 days, your 4th month is free."
- Track lab improvements to build case studies and refine guarantee terms

**Effort:** 0.5 days (copy + terms of guarantee)
**Compliance:** Never guarantee specific health outcomes. Guarantee the process, not the result. "Individual results vary" on all guarantee messaging.

---

## Priority Matrix

| Pattern | Effort | Conversion Impact | Launch Priority |
|---------|--------|-------------------|-----------------|
| Cancel Anytime | 0.5 days | HIGH | Day 1 |
| Transparent Pricing | 1 day | HIGH | Day 1 |
| Speed Metrics | 0.5 days | MEDIUM-HIGH | Day 1 |
| Results Guarantee | 0.5 days | MEDIUM-HIGH | Day 1 |
| Quiz-First Intake | 2-3 days | HIGH | Day 2-3 |
| Trust Signals | 1-2 days | HIGH | Day 3-4 |
| Proactive Care | 3-5 days | HIGH (retention) | Day 5-10 |
| Lab Storytelling | 2-3 days | MEDIUM | Day 7-10 |
| Multi-Service Bundling | 1-2 days | MEDIUM | Day 10-14 |
