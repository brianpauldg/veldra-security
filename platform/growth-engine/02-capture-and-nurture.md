# Bloom Metabolics — Lead Capture System & Nurture Automation

---

# PHASE 4 — WEBSITE LEAD CAPTURE SYSTEM

## Lead Magnet Options (Ranked by Leverage)

| # | Lead Magnet | Effort | Impact | Launch Speed |
|---|------------|--------|--------|--------------|
| 1 | **Email gate on quiz results** (/quiz, /glp1-quiz) | Low — already built, add gate | High — captures high-intent | Day 1 |
| 2 | **"Men's Hormone Optimization Guide" PDF** | Medium — write 8-10 pages | High — evergreen, shareable | Week 1 |
| 3 | **Symptom Checker Tool** | Medium — interactive build | High — engagement + capture | Week 2 |
| 4 | **"Am I a Candidate?" mini-assessment** | Low — 5 questions | Medium — quick qualify | Week 1 |
| 5 | **Treatment comparison chart** (downloadable) | Low — design asset | Medium — decision-stage | Week 2 |

**Fastest to launch:** Add email gate before quiz results (Day 1)
**Most effective long-term:** PDF guide (evergreen authority piece, shareable)

---

## Capture Strategy by Page Location

### Homepage (/)
- **Hero:** Primary CTA "Book Your Consultation" + secondary "Take the Free Assessment"
- **Mid-page (after trust section):** Embedded email capture — "Get the Men's Hormone Optimization Guide"
- **Bottom:** Full EmailCapture component (already exists)

### Scroll-Triggered Popup
- **Trigger:** 60% scroll depth OR 45 seconds on page (whichever first)
- **Rules:** NOT on first pageview — show on second pageview or return visit only
- **Frequency:** Once per session max
- **Content:** Quiz offer
- **Design:** Centered modal on desktop, full-screen on mobile, dark overlay, nova green accent

### Treatment Pages (/trt, /glp1, /peptides)
- **Location:** Inline form after "Ideal Candidates" section
- **Offer:** Personalized guide or quiz entry
- **Fields:** First name + email

### Blog Posts
- **Mid-article:** Inline CTA banner (guide offer)
- **End-of-article:** Full capture form with contextual copy

### Comparison Pages (/vs/*)
- **After comparison table:** "Still deciding? Get our guide to choosing the right provider"

### Footer (all pages)
- **Persistent:** Email + service interest dropdown
- **Low-friction:** Single field primary, dropdown optional

### Pre-Booking (/booking)
- **Logic:** If visitor is unknown (no cookie/session), show lightweight form before calendar
- **Fields:** First name, email, phone
- **Purpose:** Capture even if they don't complete booking

### Exit Intent
- **Trigger:** Mouse moves to close tab/window (desktop) or back button (mobile)
- **Rules:** Once per session, only if no popup shown yet
- **Offer:** Free guide download

---

## Production-Ready Conversion Copy

### 1. Homepage Lead Capture Section

**Headline:** Get the Men's Hormone Optimization Guide

**Subheadline:** Evidence-based insights on TRT, GLP-1, and peptide therapy — what the research says, what to expect, and how to evaluate if treatment is right for you.

**Form Fields:** Email address

**CTA Button:** Get the Free Guide

**Trust Line:** Join thousands of men staying informed. No spam. Unsubscribe anytime.

---

### 2. Scroll-Triggered Popup

**Headline:** Curious if you're a candidate?

**Body:** Take our 2-minute clinical assessment. Science-backed questions designed to help you understand your options — no commitment required.

**CTA Button:** Start the Free Assessment

**Dismiss:** No thanks, I'll keep reading

---

### 3. Treatment Page Inline Form

**Context Line:** Wondering if this treatment could work for you?

**Headline:** Get personalized insights delivered to your inbox

**Fields:** First name, Email

**CTA Button:** Send Me the Guide

**Trust Line:** We respect your privacy. Unsubscribe anytime.

---

### 4. Footer Form

**Headline:** Stay informed on men's health optimization

**Description:** Evidence-based content on hormones, weight management, and performance. Delivered weekly.

**Fields:** Email

**CTA Button:** Subscribe

---

### 5. Thank-You Page

**Headline:** Your guide is on the way

**Body:**
Check your inbox in the next few minutes. While you wait, here are your next steps:

1. **Read the guide** — understand the science behind hormone optimization
2. **Take the assessment** — find out if treatment may be right for you
3. **Book a consultation** — speak with a licensed provider when you're ready

**Secondary CTA:** Book Your Consultation Now →

**Footer Note:** Questions? Reply to any of our emails — a real person reads every one.

---

### 6. Pre-Booking Lead Capture

**Headline:** One quick step before booking

**Body:** So your provider can prepare for your consultation, we'll need a few details.

**Fields:** First name, Email, Phone number

**CTA Button:** Continue to Booking

**Trust Line:** Your information is encrypted and HIPAA-compliant. We never share your data.

---

### 7. Exit Intent Popup

**Headline:** Before you go

**Body:** Get the free Hormone Optimization Guide — the same resource our providers recommend to new patients.

**Field:** Email

**CTA Button:** Send the Guide

**Dismiss:** Maybe later

---

### CTA Button Copy Library (Ranked)

| # | CTA Text | Use Case |
|---|----------|----------|
| 1 | Book Your Consultation | Primary, everywhere |
| 2 | Start the Free Assessment | Quiz entry, popups |
| 3 | Get the Free Guide | Lead magnets |
| 4 | See If You Qualify | Treatment pages |
| 5 | Talk to a Provider | High-intent moments |
| 6 | Get Started | General entry points |
| 7 | View Treatment Options | Educational context |
| 8 | Check Your Eligibility | Quiz entry variant |
| 9 | Continue to Booking | Pre-booking flow |
| 10 | Subscribe | Newsletter/footer |

---

## Trust-Builder Copy Elements

Use across all capture points:

- "Board-certified providers" — every page
- "Lab-informed protocols" — treatment pages
- "HIPAA-compliant platform" — near forms, footer
- "Personalized to your bloodwork" — treatment pages
- "No spam. Unsubscribe anytime." — near email forms
- "Your information is encrypted" — near forms with phone/name
- "Licensed in [X] states" — about page, footer
- "Secure payment via Stripe" — near checkout
- Results statements always include: "Individual results vary. All treatments supervised by licensed providers."

---

# PHASE 5 — NURTURE AUTOMATION

## 7-Email Welcome Sequence

### Email 1 — Welcome + Guide Delivery
**Send:** Immediate (on signup)
**Goal:** Deliver value, establish credibility, set expectations

**Subject:** Your Hormone Optimization Guide is here
**Preview:** Plus what to know before your first consultation

**Body:**
```
[First Name],

Welcome to Bloom Metabolics.

Your Men's Hormone Optimization Guide is attached below. It covers:

• The 8 most common signs of hormone imbalance
• How TRT, GLP-1, and peptide therapy work
• What to expect from a telehealth consultation
• How to read your lab results

This isn't generic wellness content. It's the same framework our 
providers use when evaluating new patients.

[Download Your Guide →]

If you have questions after reading it, our team is here. Reply to 
this email or book a consultation when you're ready.

— The Bloom Metabolics Team

P.S. Over the next few weeks, we'll send you a few more evidence-based 
resources on men's health optimization. No spam. Just substance.
```

**CTA:** Download Your Guide → PDF link

---

### Email 2 — Education: Understanding Your Hormones
**Send:** Day 2
**Goal:** Educate, position as authority

**Subject:** What your testosterone levels actually mean
**Preview:** Most men don't know their numbers — here's why they matter

**Body:**
```
[First Name],

Most men have no idea where their testosterone levels sit — or what 
"normal" even means.

Here's the reality: "normal" is a range, not a number. A man with 
total testosterone of 350 ng/dL is technically "normal" but may 
experience fatigue, brain fog, low motivation, and declining body 
composition.

That's why we don't just look at one number. Our providers evaluate:

• Total testosterone
• Free testosterone
• SHBG (sex hormone-binding globulin)
• Estradiol
• CBC and metabolic panel

The picture these paint together is far more useful than a single 
lab value.

If you've been told your levels are "fine" but you still don't feel 
right — that disconnect is worth investigating.

[Take the 2-Minute Assessment →]

— Bloom Metabolics
```

**CTA:** Take the 2-Minute Assessment → /quiz

---

### Email 3 — Social Proof: Real Results
**Send:** Day 4
**Goal:** Build trust through patient outcomes (compliant)

**Subject:** Why men are switching to telehealth for TRT
**Preview:** Convenience, better protocols, and providers who listen

**Body:**
```
[First Name],

Here's what we hear from patients who switched to Bloom Metabolics:

"I spent 3 months trying to get my doctor to take my symptoms 
seriously. Bloom Metabolics had me on a personalized protocol within 
two weeks." — Michael K., 42

"The convenience alone was worth it. But the level of care — 
regular check-ins, lab monitoring, protocol adjustments — that's 
what made me stay." — David T., 45

"I lost 28 lbs on the GLP-1 program. Having a real physician 
managing everything gave me confidence this was done right." 
— Jason R., 38

These aren't outliers. They're the experience we've designed for.

Individual results vary. All treatments are prescribed and 
supervised by licensed providers.

[Book Your Consultation →]

— Bloom Metabolics
```

**CTA:** Book Your Consultation → /pricing

---

### Email 4 — Process Demystified
**Send:** Day 7
**Goal:** Remove friction, make process transparent

**Subject:** What actually happens during a Bloom Metabolics consultation
**Preview:** No surprises. Here's the full process, step by step.

**Body:**
```
[First Name],

If you're considering a consultation but aren't sure what to expect, 
here's the full process:

Step 1: Book online (takes under 2 minutes)
Step 2: Complete our digital intake — health history, symptoms, goals
Step 3: Meet with a licensed provider via secure video
Step 4: Your provider orders appropriate lab work
Step 5: Lab review and personalized protocol design
Step 6: Treatment ships to your door
Step 7: Ongoing monitoring, adjustments, and check-ins

The entire experience is designed to be efficient, private, and 
medically rigorous.

A few things worth noting:

• Consultations are with real, licensed clinicians — not chatbots
• Not everyone qualifies for treatment (and that's by design)
• You're never locked in — the consultation is just a starting point

[See Pricing & Book →]

— Bloom Metabolics
```

**CTA:** See Pricing & Book → /pricing

---

### Email 5 — Objection Crusher
**Send:** Day 10
**Goal:** Address common concerns head-on

**Subject:** Is online TRT actually safe?
**Preview:** The concerns we hear most — and honest answers

**Body:**
```
[First Name],

We get it. Managing hormone therapy through a screen can feel 
unfamiliar. Here are the questions we hear most:

"Is this safe?"
Every protocol is designed and supervised by a licensed provider. We 
require lab work before treatment, monitor levels regularly, and 
adjust protocols based on bloodwork — not guesswork.

"Is it legitimate?"
Bloom Metabolics operates within all applicable telehealth regulations. 
Our providers are board-eligible and licensed in the states where 
they practice.

"What about cost?"
Transparent pricing. You see exactly what treatment costs before you 
commit. No hidden fees, no surprise charges. Most patients find our 
pricing comparable to or below traditional clinic costs.

"What if I don't qualify?"
That's a feature, not a bug. We don't prescribe to everyone. If 
you're not a candidate, we'll tell you — and recommend next steps.

Still have questions? Reply to this email. A real person reads 
every response.

[Book Your Consultation →]

— Bloom Metabolics
```

**CTA:** Book Your Consultation → /pricing

---

### Email 6 — Gentle Urgency
**Send:** Day 14
**Goal:** Create movement toward booking

**Subject:** A question worth asking yourself
**Preview:** Where will you be in 90 days if nothing changes?

**Body:**
```
[First Name],

Here's a question most men avoid:

If you change nothing about how you manage your health, where will 
you be in 90 days?

The fatigue doesn't resolve itself. The weight doesn't come off by 
thinking about it. The brain fog doesn't clear because you downloaded 
another supplement guide.

We're not trying to manufacture urgency. We're pointing out that the 
men who see results are the ones who took one small step: they 
booked a consultation.

That's 30 minutes with a licensed provider who can actually evaluate 
your situation and tell you what's going on.

No commitment beyond the visit. No pressure. Just clarity.

[Book Your Consultation →]

— Bloom Metabolics

P.S. Consultations fill up weekly. If you've been considering it, 
this is a good time.
```

**CTA:** Book Your Consultation → /pricing

---

### Email 7 — Last Touch
**Send:** Day 21
**Goal:** Graceful close, leave door open

**Subject:** Still on your mind?
**Preview:** We're here when you're ready

**Body:**
```
[First Name],

This is our last scheduled email in this series.

If you've read the guide, taken the assessment, or just been 
thinking about it — you already know more than most men about 
what's available.

The next step, whenever you're ready, is a consultation. A 
straightforward conversation with a licensed provider about your 
health, your goals, and whether treatment makes sense for you.

No rush. No pressure. We'll be here.

[Book When You're Ready →]

If the timing isn't right, that's completely fine. You can always 
come back to bloommetabolics.com when you're ready.

Thanks for being here.

— The Bloom Metabolics Team
```

**CTA:** Book When You're Ready → /pricing

---

## SMS Follow-Up Sequence

| # | Timing | Message |
|---|--------|---------|
| 1 | Immediate | "Welcome to Bloom Metabolics. Your Hormone Optimization Guide just hit your inbox. Questions? Text us back." |
| 2 | Day 3 | "Quick question — what's your #1 health goal right now? We can point you to the right resource." |
| 3 | Day 7 | "Most men who book with Bloom Metabolics do it within their first week. Ready? bloommetabolics.com/pricing" |
| 4 | Day 14 | "Still thinking about it? Our providers are here when you're ready. Book anytime: bloommetabolics.com/pricing" |

**Compliance notes:**
- Include opt-out in first SMS: "Reply STOP to unsubscribe"
- All SMS must comply with TCPA — explicit consent required at capture
- Keep under 160 characters where possible

---

## Segmentation Logic

### Segment 1: New Leads (tag: `new_lead`)
- Enter 7-email welcome sequence
- Enter 4-SMS sequence
- **Auto-tag rules:**
  - Opens 3+ emails → add tag: `engaged`
  - Clicks any booking link → add tag: `high_intent`
  - Completes quiz → add tag: `quiz_completed`

### Segment 2: Warm Leads (tag: `high_intent`, no booking after Day 14)
- Pause main sequence
- Enter 3-email consideration branch:

**Consideration Email 1 — "What's holding you back?"**
Subject: The #1 reason men hesitate (and why it shouldn't stop you)
Body: Address top 3 objections — cost, safety, time commitment. End with "Reply and tell us what's on your mind."

**Consideration Email 2 — "Here's what your first consultation looks like"**
Subject: Your consultation, minute by minute
Body: Detailed walkthrough of the 30-minute session. Remove all mystery.

**Consideration Email 3 — "We have openings this week"**
Subject: Consultation spots available this week
Body: Specific availability mention. Gentle urgency without pressure.

### Segment 3: Booked Leads (tag: `booked`)
- Exit all nurture sequences immediately
- Enter pre-consultation sequence:

**Pre-Consult 1** (Immediate): Booking confirmation + what to prepare (health history, medication list, goals)
**Pre-Consult 2** (Day before): Reminder + link to join + what to expect
**Pre-Consult 3** (Day after): Follow-up — how did it go? Next steps if prescribed. Link to support if not.

### Segment 4: Cold Leads (no engagement 30+ days, tag: `cold`)
- Reactivation sequence (3 emails, spaced 7 days apart):

**Reactivation 1:** "It's been a while — here's what's new at Bloom Metabolics" + latest blog content
**Reactivation 2:** New educational content (different from original sequence)
**Reactivation 3:** "Last check-in" — explicit option to stay subscribed or unsubscribe. Clean the list.

---

## Sequence Flow Diagram

```
[Email Captured]
     ↓
[Tag: new_lead] → 7-Email Sequence + 4-SMS Sequence
     ↓
[Opens 3+?] → Tag: engaged
[Clicks booking?] → Tag: high_intent
     ↓
[Books consultation?]
  YES → Tag: booked → Exit nurture → Pre-consultation sequence
  NO + high_intent → Consideration branch (3 emails)
     ↓
[Books after consideration?]
  YES → Pre-consultation sequence
  NO → Wait 30 days → Tag: cold → Reactivation sequence (3 emails)
     ↓
[Reactivation engagement?]
  YES → Re-enter consideration or main content
  NO → Unsubscribe or suppress
```

---

## Agent Ownership

### Copy Generation Agent
- **Inputs:** Sequence type, target segment, brand voice (.agents/product-marketing-context.md), compliance rules
- **Outputs:** Complete email/SMS copy — subject, preview, body, CTA
- **Triggers:** New sequence needed, A/B variant request, quarterly refresh
- **Completion:** All emails written, compliance-reviewed, formatted for GHL import

### Automation Setup Agent
- **Inputs:** Approved copy, sequence logic, trigger conditions, tag rules
- **Outputs:** Configured GHL workflow with steps, waits, conditions, tags
- **Triggers:** Copy approved by QA Agent
- **Completion:** Workflow active, test emails sent, all branches verified

### Testing Agent
- **Inputs:** GHL workflow ID, test email addresses
- **Outputs:** Rendering test results (Gmail, Apple Mail, Outlook), link checks, deliverability
- **Triggers:** Workflow configured
- **Completion:** All emails render correctly, links work, tags fire, unsubscribe works

### Segmentation Agent
- **Inputs:** GHL contact engagement data, tag rules
- **Outputs:** Updated contact tags, segment transitions
- **Triggers:** Daily engagement scan, on booking event, on 30-day inactivity
- **Completion:** All contacts in correct segment with correct tags

### Reporting Agent
- **Inputs:** GHL email/SMS metrics
- **Outputs:** Weekly sequence performance report
- **Triggers:** Monday morning
- **Completion:** Report with opens, clicks, conversions per email, overall funnel metrics

---

## KPI Targets

| Metric | Target | Red Flag |
|--------|--------|----------|
| Email open rate | 35%+ | Below 20% |
| Email click rate | 5%+ | Below 2% |
| Sequence-to-booking rate | 8-12% | Below 3% |
| SMS response rate | 15%+ | Below 5% |
| Unsubscribe rate | <1.5% | Above 3% |
| Bounce rate | <3% | Above 5% |
| Spam complaint rate | <0.1% | Above 0.3% |

---

## Implementation Priority

| Week | Task |
|------|------|
| Week 1 | Configure 7-email sequence in GHL, set up pipeline stages and tags |
| Week 1 | Wire website forms → GHL contact creation → workflow trigger |
| Week 1 | Configure 4-SMS sequence, test delivery |
| Week 2 | Build consideration branch for warm leads |
| Week 2 | Build pre-consultation sequence for booked leads |
| Week 3 | Build reactivation sequence for cold leads |
| Week 3 | Set up automated segmentation rules |
| Week 4 | First performance review, A/B test subject lines |
