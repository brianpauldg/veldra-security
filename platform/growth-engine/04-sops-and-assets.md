# Bloom Metabolics — SOPs & Ready-to-Deploy Assets

---

# PHASE 8 — SOP LIBRARY

## SOP 1: Local SEO Page Creation

**Objective:** Create a new SEO-optimized page for Bloom Metabolics

**Inputs:** Target keyword, page type (service/location/condition/blog), content brief from SEO Research Agent

**Steps:**
1. Receive content brief with: target keyword, secondary keywords, search intent, word count target, competitor analysis
2. Create page file at correct route: `app/[type]/[slug]/page.tsx`
3. Write metadata export: title (<60 chars including brand), description (<155 chars with CTA), keywords array
4. Structure content: single H1 (primary keyword), H2s (secondary keywords), body (word count per type)
   - Service pages: 1,500-2,500 words
   - Location pages: 800-1,200 words
   - Condition pages: 1,200-1,800 words
   - Blog posts: 1,500-2,500 words
5. Add FAQ section: minimum 5 questions targeting long-tail keywords, format for FAQPage schema
6. Add internal links: minimum 3 to other Bloom Metabolics pages, minimum 1 to /pricing or /checkout
7. Add trust signals: "Board-certified providers," HIPAA badge, compliance disclaimers
8. Add CTA sections: primary ("Book Your Consultation" → /pricing), secondary ("Take the Assessment" → /quiz)
9. Implement schema: BreadcrumbList + page-type-specific schema (MedicalTherapy, Article, LocalBusiness, etc.)
10. Submit to QA Agent

**Completion Criteria:** Page renders, all metadata present, schema validates, internal links work, mobile responsive

**QA Checklist:**
- [ ] Title tag under 60 chars, includes primary keyword
- [ ] Meta description under 155 chars, includes CTA
- [ ] Single H1 with primary keyword
- [ ] H2s include secondary keywords
- [ ] Word count meets minimum for page type
- [ ] FAQ section: 5+ questions
- [ ] Schema validates (Google Rich Results Test)
- [ ] 3+ internal links
- [ ] CTA to /pricing present
- [ ] Trust signals visible
- [ ] Compliance disclaimers present
- [ ] Mobile responsive
- [ ] Page loads under 3 seconds
- [ ] No broken links
- [ ] Images have alt text (if applicable)
- [ ] No absolute health claims

**Output:** Deployed page URL + metadata summary + QA results
**Log Location:** SEO Content Tracker (Google Sheet)

---

## SOP 2: Service Page Optimization

**Objective:** Optimize an existing service page for better rankings and conversions

**Inputs:** Page URL, keyword data (from Research Agent), current ranking, conversion rate

**Steps:**
1. Audit current page: title, description, H-tags, word count, keyword usage, internal links, schema, trust signals, CTAs
2. Pull Search Console data: current keywords, impressions, clicks, CTR, position
3. Identify gaps: missing keywords, thin sections, weak CTAs, missing trust signals, no FAQ, no schema
4. Update title and description if not optimized (match Phase 2 specifications)
5. Expand thin sections to reach 2,000+ words
6. Add or improve FAQ with 5+ questions (new long-tail keywords)
7. Strengthen CTAs: above fold + mid-page + bottom-of-page (3 minimum)
8. Add/update schema markup
9. Improve internal links: ensure 3+ other pages link TO this page
10. Add social proof or trust signals if available
11. Submit to QA Agent

**Completion Criteria:** All gaps addressed, word count ≥2,000, schema validates, 3+ CTAs present

**QA Checklist:**
- [ ] Title optimized with primary keyword
- [ ] Description compelling with CTA
- [ ] Content ≥2,000 words
- [ ] FAQ: 5+ questions
- [ ] Schema validates
- [ ] 3+ CTAs (above fold, mid, bottom)
- [ ] Internal links added from other pages
- [ ] Trust signals visible
- [ ] Compliance disclaimers present
- [ ] Keyword density 1-2% (not stuffed)
- [ ] No absolute health claims

**Output:** Before/after comparison + changes list + QA results
**Log Location:** SEO Optimization Tracker

---

## SOP 3: Location Page Creation

**Objective:** Create a state-level location page targeting "[service] in [state]" queries

**Inputs:** State name, primary service focus, keyword data

**Steps:**
1. Create page at `app/locations/[state-slug]/page.tsx`
2. Research state-specific keywords: "[service] in [state]", "[service] [state]", "telehealth [state]"
3. Write metadata: Title = "[Service] Telehealth in [State] — Bloom Metabolics", Description with state name
4. Write location-specific content (NOT generic with state name swapped):
   - H1: "Men's Health Telehealth in [State]"
   - Intro: How Bloom Metabolics serves [state] patients specifically
   - State telehealth regulations and licensing info
   - Services available
   - How it works for [state] residents (lab locations, shipping)
   - Local health statistics if relevant
   - FAQ: 5+ questions with state-specific answers
5. Add LocalBusiness schema with state details
6. Internal links from service pages and from /locations hub (if exists)
7. Submit to QA

**Completion Criteria:** Content genuinely location-specific, schema present, FAQ targets local queries

**QA Checklist:**
- [ ] Content is genuinely state-specific (not just state name swapped into template)
- [ ] State telehealth regulation info accurate and current
- [ ] LocalBusiness schema present
- [ ] Links from service pages
- [ ] FAQ targets "[state] trt" / "[state] telehealth" queries
- [ ] Compliance disclaimers present
- [ ] State licensing info accurate

**Output:** Published page URL + metadata + keyword targets
**Log Location:** Location Pages Tracker

---

## SOP 4: Directory Submission

**Objective:** Submit Bloom Metabolics to a directory platform

**Inputs:** Platform name/URL, credentials, submission kit (from Phase 3)

**Steps:**
1. Search platform for existing Bloom Metabolics listing (by name, phone, website)
2. If exists: claim and update. If not: create new listing
3. Fill all fields using submission kit:
   - Business name: "Bloom Metabolics" (exact, consistent every time)
   - Address: [standard format — identical across all platforms]
   - Phone: [standard format — identical]
   - Website: https://bloommetabolics.com
   - Description: Use short/medium/long version as platform requires
   - Categories: Select closest matches from platform options
   - Services: Use standardized service list
   - Hours: As specified in kit
4. Upload assets: logo, cover photo (if platform supports)
5. Initiate verification (email, phone, or postcard as required)
6. Update tracker: platform, date, status, login email, verification method
7. Screenshot confirmation page for records
8. Set 7-day reminder to check verification status

**Completion Criteria:** Listing submitted, tracker updated, verification initiated

**QA Checklist:**
- [ ] Business name exactly matches standard format
- [ ] NAP identical to all other listings
- [ ] Website URL correct (https, no trailing slash variation)
- [ ] Description appropriate for platform
- [ ] Categories correct
- [ ] Logo/images uploaded
- [ ] Verification initiated
- [ ] Tracker updated with all fields

**Output:** Submission confirmation + tracker entry + verification status
**Log Location:** Directory Submission Tracker

---

## SOP 5: Lead Capture Implementation

**Objective:** Implement a new lead capture element on the website

**Inputs:** Capture type (popup, inline, exit intent), page, copy, design specs

**Steps:**
1. Review approved copy from Web Conversion Agent
2. Create React component using existing design system:
   - Import Section, Card, Button from components/ui/
   - Use Tailwind CSS v4 classes matching Bloom Metabolics palette
   - Use Framer Motion for animations (fade-in, slide-up)
3. Implement form with React Hook Form + Zod validation (match EmailCapture.tsx pattern)
4. Wire submission to API route:
   - POST to /api/leads (or relevant endpoint)
   - Sync to GHL via upsert_contact
   - Trigger GHL workflow for nurture sequence
5. Add event tracking: `trackEvent('lead_captured', { source, page, formType })`
6. Test:
   - Submit test entry
   - Verify GHL contact created
   - Verify nurture sequence triggered
   - Check mobile rendering
   - Check all validation states (success, error, loading)
7. Deploy and monitor 48 hours

**Completion Criteria:** Form renders, validates, submits, syncs to GHL, triggers nurture, tracks events

**QA Checklist:**
- [ ] Renders correctly desktop + mobile
- [ ] Validation works (email format, required fields)
- [ ] Error states display
- [ ] Success state displays
- [ ] Data reaches GHL as contact
- [ ] Nurture sequence triggered
- [ ] Event tracked in analytics
- [ ] No console errors
- [ ] Loading state during submission
- [ ] Accessible (keyboard nav, labels)

**Output:** Component path + API route + GHL workflow ID + test results
**Log Location:** Implementation Tracker

---

## SOP 6: Nurture Sequence Deployment

**Objective:** Deploy a new email/SMS sequence in GoHighLevel

**Inputs:** Approved copy (emails + SMS), timing, triggers, tags

**Steps:**
1. Create GHL workflow: trigger = "Contact Tag Added" → [sequence_tag]
2. Configure each email step:
   - Subject line, preview text, body (HTML matching Bloom Metabolics brand)
   - Wait step between emails (per specified timing)
3. Configure SMS steps at specified intervals
4. Add conditional branches:
   - If books consultation → exit workflow, remove tag, add "booked" tag
   - If unsubscribes → exit workflow, add "unsubscribed" tag
   - If no opens after 3 emails → branch to re-engagement
5. Send test emails to internal addresses
   - Check rendering: Gmail, Apple Mail, Outlook
6. Send test SMS — verify delivery, link tracking
7. Activate workflow
8. Monitor first 48 hours for deliverability issues

**Completion Criteria:** All emails/SMS configured, tests pass, workflow active, monitoring in place

**QA Checklist:**
- [ ] All emails match approved copy exactly
- [ ] Timing/delays correct
- [ ] Conditional branches work (book → exit, unsub → exit)
- [ ] Renders correctly: Gmail, Apple Mail, Outlook
- [ ] SMS delivered, links work
- [ ] Unsubscribe link in all emails
- [ ] Sender name and reply-to correct
- [ ] Tracking links active
- [ ] Tags applied at each stage
- [ ] No compliance issues in copy

**Output:** GHL workflow ID + test results + activation confirmation
**Log Location:** Automation Tracker

---

## SOP 7: Weekly Reporting

**Objective:** Generate weekly growth performance report

**Inputs:** GA4 data, Search Console data, GHL pipeline data, email metrics

**Steps:**
1. Pull traffic: sessions, users, bounce rate, top pages, source breakdown (GA4)
2. Pull SEO: impressions, clicks, CTR, avg position, top queries, indexing (Search Console)
3. Pull pipeline: new leads, stage progression, bookings, revenue (GHL)
4. Pull email: sends, opens, clicks, unsubscribes per sequence (GHL)
5. Calculate week-over-week deltas for all metrics
6. Identify top 3 wins (biggest improvements)
7. Identify top 3 concerns (biggest declines or missed targets)
8. Write 3 actionable recommendations for next week
9. Format report and distribute

**Completion Criteria:** All data current, calculations verified, report distributed

**QA Checklist:**
- [ ] All data sources accessed and current
- [ ] 3 metrics spot-checked manually
- [ ] WoW comparisons accurate
- [ ] Wins and concerns correctly identified
- [ ] Recommendations are specific and actionable
- [ ] Report formatting clean

**Output:** Markdown report + 5-bullet executive summary
**Log Location:** Weekly Reports folder

---

## SOP 8: QA Review

**Objective:** Quality-check any deliverable before deployment

**Inputs:** Deliverable from any agent (content, code, email, listing)

**Steps:**
1. Identify deliverable type, load appropriate checklist
2. **Brand consistency:** Tone, voice, terminology match product-marketing-context.md
3. **Compliance:** No absolute health claims, disclaimers present, "may support" language, no unapproved outcome stats
4. **Technical:** Links work, forms submit, pages render, no errors
5. **SEO:** Metadata present, schema validates, keywords natural
6. **Content quality:** Grammar, readability (Grade 8 target), no fluff, accurate claims
7. If code: mobile responsive, no console errors, accessible
8. If email: renders across clients, links work, unsubscribe present
9. Document all issues with specific locations and fix instructions
10. Return to originating agent: pass / fail / pass-with-notes

**Completion Criteria:** All items reviewed, issues documented, verdict clear

**QA Checklist:**
- [ ] Appropriate checklist used for type
- [ ] Compliance check done
- [ ] Brand consistency check done
- [ ] Technical check done
- [ ] All issues documented with fix instructions
- [ ] Verdict clear (pass / fail / pass-with-notes)

**Output:** QA report (verdict, issues, fix instructions, reviewer notes)
**Log Location:** QA Log

---

# PHASE 9 — READY-TO-DEPLOY ASSETS

## Asset 1: Schema Markup Templates

### Organization + MedicalBusiness (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Bloom Metabolics",
  "description": "Premium telehealth clinic for men's hormone optimization, TRT, GLP-1 weight loss, and peptide therapy.",
  "url": "https://bloommetabolics.com",
  "logo": "https://bloommetabolics.com/logo.png",
  "image": "https://bloommetabolics.com/og-image.jpg",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "support@bloommetabolics.com",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@bloommetabolics.com",
    "availableLanguage": "English"
  },
  "medicalSpecialty": ["Endocrinology", "Men's Health", "Weight Management"],
  "availableService": [
    {
      "@type": "MedicalTherapy",
      "name": "Testosterone Replacement Therapy (TRT)",
      "description": "Personalized TRT protocols from licensed providers, informed by bloodwork and biomarkers."
    },
    {
      "@type": "MedicalTherapy",
      "name": "GLP-1 Medical Weight Loss",
      "description": "Clinician-supervised weight loss with semaglutide and tirzepatide."
    },
    {
      "@type": "MedicalTherapy",
      "name": "Peptide Therapy",
      "description": "Advanced peptide protocols for recovery, performance, and wellness."
    }
  ],
  "sameAs": []
}
```

### FAQPage Schema Template
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text here."
      }
    }
  ]
}
```

### BreadcrumbList Template
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bloommetabolics.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Page Name",
      "item": "https://bloommetabolics.com/page-slug"
    }
  ]
}
```

### Article Schema Template (Blog)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article meta description",
  "author": {
    "@type": "Organization",
    "name": "Bloom Metabolics"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Bloom Metabolics",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bloommetabolics.com/logo.png"
    }
  },
  "datePublished": "2026-04-11",
  "dateModified": "2026-04-11",
  "mainEntityOfPage": "https://bloommetabolics.com/blog/article-slug"
}
```

### Service Schema Template
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  "name": "Service Name",
  "description": "Service description",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Bloom Metabolics",
    "url": "https://bloommetabolics.com"
  },
  "relevantSpecialty": {
    "@type": "MedicalSpecialty",
    "name": "Endocrinology"
  }
}
```

---

## Asset 2: Blog Post Outlines

### Post 1: "Signs of Low Testosterone: 8 Symptoms Most Men Ignore"
- **Target keyword:** low testosterone symptoms (12,100/mo)
- **Meta description:** Fatigue, brain fog, low motivation — these could be signs of low testosterone. Learn the 8 symptoms most men miss and what to do about them.
- **Word count:** 2,000
- **H2 outline:**
  1. What Is Testosterone and Why Does It Matter?
  2. 8 Signs of Low Testosterone
     - Persistent Fatigue
     - Reduced Muscle Mass
     - Increased Body Fat
     - Brain Fog and Poor Concentration
     - Low Libido
     - Mood Changes and Irritability
     - Sleep Disruption
     - Decreased Motivation
  3. What "Normal" Testosterone Levels Actually Mean
  4. When to Get Tested
  5. Treatment Options: What the Research Says
  6. FAQ (5 questions)
- **Internal links:** /trt, /quiz, /conditions/low-testosterone, /pricing
- **CTA:** "Take the 2-Minute Assessment" → /quiz

### Post 2: "TRT vs. Testosterone Boosters: What Actually Works?"
- **Target keyword:** trt vs testosterone boosters (1,900/mo)
- **Meta description:** Supplements promise to boost testosterone, but do they work? An evidence-based comparison of TRT vs. testosterone boosters.
- **Word count:** 1,800
- **H2 outline:**
  1. The Testosterone Supplement Industry
  2. What Are Testosterone Boosters?
  3. What the Research Says About Boosters
  4. What Is TRT and How Is It Different?
  5. Side-by-Side Comparison
  6. Who Should Consider TRT vs. Supplements
  7. FAQ
- **Internal links:** /trt, /quiz, /pricing
- **CTA:** "Book Your Consultation" → /pricing

### Post 3: "What to Expect During Your First TRT Consultation"
- **Target keyword:** trt consultation what to expect (720/mo)
- **Meta description:** Considering TRT? Here's exactly what happens during your first telehealth consultation — from intake to treatment plan.
- **Word count:** 1,500
- **H2 outline:**
  1. Before Your Consultation
  2. The Intake Process
  3. During the Video Consultation
  4. After the Consultation: Lab Work
  5. Your Personalized Protocol
  6. Ongoing Monitoring
  7. FAQ
- **Internal links:** /how-it-works, /trt, /pricing, /quiz
- **CTA:** "Book Your Consultation" → /pricing

### Post 4: "GLP-1 for Weight Loss: A Complete Guide for Men"
- **Target keyword:** glp-1 weight loss men (1,300/mo)
- **Meta description:** GLP-1 medications like semaglutide and tirzepatide are changing weight loss. Here's what men need to know about medical weight loss with GLP-1.
- **Word count:** 2,200
- **H2 outline:**
  1. What Are GLP-1 Medications?
  2. How GLP-1 Causes Weight Loss
  3. Semaglutide vs. Tirzepatide
  4. Expected Results (with disclaimer)
  5. Who Is a Good Candidate
  6. Side Effects and Safety
  7. GLP-1 and Exercise: What to Know
  8. Getting Started with GLP-1 Telehealth
  9. FAQ
- **Internal links:** /glp1, /glp1-quiz, /pricing
- **CTA:** "Check Your Eligibility" → /glp1-quiz

### Post 5: "Is Online TRT Safe? What the Research Says"
- **Target keyword:** is online trt safe (2,100/mo)
- **Meta description:** Is getting TRT online safe? We look at the research, regulations, and what makes a telehealth TRT provider legitimate.
- **Word count:** 1,800
- **H2 outline:**
  1. The Rise of Online TRT
  2. How Online TRT Clinics Work
  3. What Makes a Provider Legitimate
  4. Regulatory Framework for Telehealth TRT
  5. Red Flags to Watch For
  6. How Bloom Metabolics Approaches Safety
  7. FAQ
- **Internal links:** /trt, /about, /pricing, /how-it-works
- **CTA:** "Book Your Consultation" → /pricing

### Posts 6-10: [Titles and keywords defined in Phase 2 blog strategy — outlines follow same format]

---

## Asset 3: Agent Task Prompts

### SEO Content Writing Prompt
```
You are writing SEO-optimized content for Bloom Metabolics, a premium men's health 
telehealth brand. Read .agents/product-marketing-context.md for brand voice and 
positioning.

TASK: Write a [page type] page targeting the keyword "[target keyword]"

REQUIREMENTS:
- Title tag: under 60 characters, include "[target keyword]" and "Bloom Metabolics"
- Meta description: under 155 characters, include keyword, end with CTA
- H1: include primary keyword naturally, only one H1
- H2s: include secondary keywords: [list]
- Word count: [target] words minimum
- FAQ section: 5+ questions targeting long-tail variations
- Internal links: link to [specific pages] naturally within content
- CTA: "Book Your Consultation" linking to /pricing (minimum 2 placements)
- Trust signals: mention "board-certified providers," "lab-informed protocols"

COMPLIANCE (MANDATORY):
- Never make absolute health claims
- Use "may support," "commonly report," "individual results vary"
- Include disclaimer at bottom: "Individual results vary. All treatments 
  supervised by licensed providers."
- Do not promise specific outcomes or timelines without "may" qualifier

TONE: Premium, confident, clinically informed, solution-oriented. Not salesy, 
not aggressive, not casual. Write for educated men 30-55.

OUTPUT: Complete page content in markdown with metadata block at top.
```

### Email Sequence Writing Prompt
```
You are writing a nurture email sequence for Bloom Metabolics. Read 
.agents/product-marketing-context.md for brand context.

TASK: Write a [X]-email sequence for [segment: new/warm/cold/booked] leads

REQUIREMENTS per email:
- Subject line (under 50 chars, no spam words)
- Preview text (under 90 chars)
- Full body copy (150-300 words)
- CTA with link destination
- Send timing (relative to trigger)
- Goal statement

SEQUENCE ARC:
Email 1: Deliver immediate value (guide, resource, confirmation)
Email 2: Educate (position as authority)
Email 3: Social proof (patient experiences — compliant)
Email 4: Demystify process (reduce friction)
Email 5: Handle objections (cost, safety, legitimacy)
Email 6: Create gentle urgency
Email 7: Graceful close (leave door open)

COMPLIANCE:
- "Individual results vary" on any outcome mention
- "May support" not "will fix"
- Include unsubscribe mention
- No false urgency or scarcity

TONE: Direct, respectful, medically aware. Write like a trusted advisor, 
not a marketer. Premium but approachable.
```

### Directory Research Prompt
```
You are the Directory Research Agent for Bloom Metabolics, a premium men's health 
telehealth brand (TRT, GLP-1, peptides).

TASK: Research new directory listing opportunities

SEARCH CATEGORIES:
1. Healthcare provider directories
2. Telehealth-specific directories
3. Men's health and wellness directories
4. General business directories with high domain authority
5. Review platforms

FOR EACH DIRECTORY FOUND:
- Platform name and URL
- Free or paid (and cost if paid)
- Domain authority estimate
- Benefit type: SEO backlink / referral traffic / trust signal / direct bookings
- Required fields for submission
- Priority recommendation: P1 (this week) / P2 (this month) / P3 (later)

CHECK: Is this directory already in our tracker? Skip if already listed.

OUTPUT: Table of new directories with all fields, sorted by priority.
```

### Weekly Report Prompt
```
You are the Analytics Agent for Bloom Metabolics.

TASK: Generate weekly growth performance report for week of [date]

DATA SOURCES:
1. GA4: sessions, users, bounce rate, top 10 pages, traffic sources
2. Search Console: impressions, clicks, CTR, avg position, top 20 queries
3. GHL: new leads, pipeline by stage, bookings, email metrics
4. PostHog: key events, funnel completion rates

FOR EACH METRIC:
- This week's value
- Last week's value
- Week-over-week change (% and absolute)
- Status vs. target (on track / at risk / behind)

ANALYSIS:
- Top 3 wins (biggest improvements with explanation)
- Top 3 concerns (biggest declines or misses with root cause)
- 3 specific recommendations for next week

FORMAT: Markdown report with executive summary (5 bullets), then detailed 
sections for Traffic, SEO, Pipeline, Email, and Recommendations.
```

### QA Review Prompt
```
You are the QA Agent for Bloom Metabolics. Your job is to review deliverables 
before they go live.

TASK: Review [deliverable type] from [originating agent]

CHECK AGAINST:
1. COMPLIANCE
   - No absolute health claims ("will cure," "guaranteed results")
   - Uses "may support," "commonly report," "individual results vary"
   - Disclaimers present where required
   - No unapproved statistics or outcome claims
   
2. BRAND CONSISTENCY
   - Matches tone in .agents/product-marketing-context.md
   - Premium, confident, clinically informed
   - Not salesy, aggressive, or casual
   - Terminology consistent (e.g., "providers" not "doctors," 
     "protocols" not "prescriptions")

3. TECHNICAL
   - Links work and point to correct destinations
   - Forms submit correctly
   - Pages render on mobile
   - Schema validates
   - No console errors

4. SEO (if content)
   - Title under 60 chars with keyword
   - Description under 155 chars
   - H1 unique with primary keyword
   - Internal links present

OUTPUT: Pass / Fail / Pass-with-notes
For each issue: location, description, severity (blocker/warning/note), 
fix instruction.
```

### CRO Analysis Prompt
```
You are the Web Conversion Agent for Bloom Metabolics.

TASK: Analyze conversion performance and recommend optimizations

DATA TO REVIEW:
- Page-level conversion rates (form submissions / unique visitors)
- Bounce rates by page and traffic source
- Session replay insights (PostHog)
- Form completion rates and drop-off points
- CTA click-through rates

ANALYSIS FRAMEWORK:
1. Where are visitors dropping off? (funnel gaps)
2. Which pages have high traffic but low conversion? (optimization opportunities)
3. Which CTAs are performing vs. underperforming?
4. Are there mobile-specific issues?
5. What patterns appear in session replays?

FOR EACH RECOMMENDATION:
- Hypothesis: "If we [change], then [metric] will improve because [reason]"
- Specific change: exact copy, design, or flow modification
- Expected impact: low / medium / high
- Implementation effort: quick win / moderate / significant
- Measurement: how to know if it worked

PRIORITIZE: Quick wins with high expected impact first.

OUTPUT: Ranked list of 5 recommendations with full specs.
```

---

## Asset 4: Tracking Templates

### SEO Content Tracker
| Page | URL | Target Keyword | Est. Volume | Status | Published | Words | Position | Notes |
|------|-----|---------------|-------------|--------|-----------|-------|----------|-------|
| Homepage | / | premium telehealth | 1,600 | ✅ Live | — | — | — | Optimize metadata |
| TRT | /trt | online trt clinic | 8,100 | ✅ Live | — | — | — | Optimize metadata |
| GLP-1 | /glp1 | glp-1 weight loss online | 2,900 | ✅ Live | — | — | — | Optimize metadata |
| About | /about | — | — | 🔲 Build | — | — | — | Week 1 |
| Services | /services | — | — | 🔲 Build | — | — | — | Week 1 |
| Blog Hub | /blog | — | — | 🔲 Build | — | — | — | Week 2 |
| Blog Post 1 | /blog/signs-low-testosterone | low testosterone symptoms | 12,100 | 🔲 Write | — | 2,000 | — | Week 2 |

### Email Sequence Performance Tracker
| Email # | Name | Subject | Sends | Opens | Open % | Clicks | CTR | Bookings | Conv % |
|---------|------|---------|-------|-------|--------|--------|-----|----------|--------|
| 1 | Welcome | Your guide is here | — | — | — | — | — | — | — |
| 2 | Education | What your T levels mean | — | — | — | — | — | — | — |
| 3 | Social Proof | Why men switch | — | — | — | — | — | — | — |
| 4 | Process | What happens in consult | — | — | — | — | — | — | — |
| 5 | Objections | Is online TRT safe? | — | — | — | — | — | — | — |
| 6 | Urgency | A question worth asking | — | — | — | — | — | — | — |
| 7 | Last Touch | Still on your mind? | — | — | — | — | — | — | — |

### Weekly Metrics Dashboard
| Metric | This Week | Last Week | Delta | Target | Status |
|--------|-----------|-----------|-------|--------|--------|
| Sessions | — | — | — | 500/mo | — |
| Organic Sessions | — | — | — | 200/mo | — |
| Bounce Rate | — | — | — | <60% | — |
| Leads Captured | — | — | — | 50/mo | — |
| Quiz Completions | — | — | — | 30/mo | — |
| Email Open Rate | — | — | — | 35% | — |
| Bookings | — | — | — | 5-10/mo | — |
| Revenue | — | — | — | — | — |

### Lead Pipeline Tracker
| Stage | Count | Conv Rate | Avg Days | Revenue |
|-------|-------|-----------|----------|---------|
| New Lead | — | — | — | — |
| Engaged | — | — | — | — |
| High Intent | — | — | — | — |
| Booked | — | — | — | — |
| Consulted | — | — | — | — |
| Active Patient | — | — | — | — |
| Churned | — | — | — | — |

### Implementation Checklist
| Task | Owner | Priority | Status | Due | Notes |
|------|-------|----------|--------|-----|-------|
| Google Search Console | Human | P1 | ⬜ | Day 1 | |
| GA4 install | Human | P1 | ⬜ | Day 1 | |
| Sitemap + robots.txt | Dev Agent | P1 | ⬜ | Day 1 | |
| Homepage metadata | SEO Agent | P1 | ⬜ | Day 1 | |
| Quiz email gate | Dev Agent | P1 | ⬜ | Day 2 | |
| Schema markup | Dev Agent | P1 | ⬜ | Day 2-3 | |
| About page | Content + Dev | P1 | ⬜ | Day 2-3 | |
| Services hub | Content + Dev | P1 | ⬜ | Day 2-3 | |
| GHL nurture setup | Nurture Agent | P1 | ⬜ | Day 3-5 | |
| GHL pipeline config | CRM Agent | P1 | ⬜ | Day 3 | |
| Directory batch 1 | Listing Agent | P1 | ⬜ | Week 2 | 8 platforms |
| Blog post 1 | Content Agent | P1 | ⬜ | Week 2 | |
| Blog post 2 | Content Agent | P1 | ⬜ | Week 2 | |
| Location pages (5) | Content + Dev | P2 | ⬜ | Week 2-3 | TX, FL, CA, AZ, GA |
| Directory batch 2 | Listing Agent | P2 | ⬜ | Week 3 | 8 platforms |
| Blog post 3-4 | Content Agent | P2 | ⬜ | Week 3 | |
| Condition pages (2) | Content + Dev | P2 | ⬜ | Week 3 | |
| PostHog install | Dev | P2 | ⬜ | Week 2 | |
| Marketing dashboard | Dev | P3 | ⬜ | Week 4 | |
| Weekly report workflow | Analytics | P3 | ⬜ | Week 4 | |
