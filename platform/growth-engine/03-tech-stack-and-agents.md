# Bloom Metabolics — Tech Stack & Agent Architecture

---

# PHASE 6 — TECH STACK

## Current Stack (Already Live)

| Layer | Tool | Cost | Status |
|-------|------|------|--------|
| Website | Next.js 14 + Vercel | Free tier | ✅ Live |
| Auth | Supabase | Free tier | ✅ Live |
| Payments | Stripe | 2.9% + 30¢ | ✅ Live |
| CRM + Email + SMS | GoHighLevel | ~$97-297/mo | ✅ Connected via MCP |
| Automation | n8n Cloud | ~$20/mo | ✅ Connected |
| AI Agents | Claude API + MCP | Usage-based | ✅ Connected |
| Clinic Dashboard | Custom (Next.js + Recharts) | — | ✅ Built |

## What to Add (All Free Tier)

| Tool | Purpose | Cost | Priority |
|------|---------|------|----------|
| Google Search Console | SEO monitoring, sitemap submission | Free | Day 1 |
| Google Analytics 4 | Traffic, conversions, behavior | Free | Day 1 |
| PostHog | Product analytics, session replay, A/B testing | Free (1M events/mo) | Week 2 |
| XML Sitemap | SEO indexing signal | Built into Next.js (app/sitemap.ts) | Day 1 |
| robots.txt | Crawl directives | Built into Next.js (app/robots.ts) | Day 1 |

**Total additional monthly cost: $0**

## Key Architecture Decisions

### Email & SMS → GoHighLevel
Already paying for GHL. Already connected via MCP. Has send_email, send_sms, workflow management. No reason to add another ESP.

If GHL email proves limiting (deliverability issues at scale), consider Resend for transactional ($0 for first 3k/mo) while keeping GHL for marketing sequences.

### Booking → GoHighLevel Calendars
MCP tools already available: `create_appointment`, `get_free_slots`, `get_calendars`. No additional booking tool needed.

### On-Site Forms → React Hook Form + Zod (existing)
Already in codebase. Forms POST to Next.js API routes → sync to GHL via `upsert_contact` MCP tool. Keep this pattern.

### Analytics Stack
- **GA4:** Traffic source, page views, conversions, demographics
- **Google Search Console:** Keywords, impressions, CTR, indexing status
- **PostHog:** Session replay, feature flags, A/B tests, funnels
- **GHL:** Pipeline metrics, email performance, SMS delivery
- **n8n:** Aggregates data from all sources into weekly report

### Reporting Dashboard
Extend existing `/clinic` dashboard. Add `/clinic/growth-ops` page pulling from GA4 API, Search Console API, GHL API, PostHog API — all via n8n data aggregation workflows.

---

## Implementation Order

### Day 1-2: Foundation
1. Google Search Console — verify ownership, submit sitemap
2. GA4 — add tracking snippet to layout.tsx
3. Deploy `app/sitemap.ts` (dynamic sitemap)
4. Deploy `app/robots.ts`

### Day 3-4: CRM Pipeline
5. GHL pipeline stages: New Lead → Engaged → High Intent → Booked → Consulted → Active Patient → Churned
6. GHL tags: `new_lead`, `engaged`, `high_intent`, `quiz_completed`, `booked`, `cold`
7. GHL 7-email welcome workflow
8. GHL 4-SMS follow-up workflow

### Week 1: Lead Sync
9. n8n workflow: Website form POST → GHL `upsert_contact` → trigger welcome workflow
10. n8n workflow: Booking event → update pipeline stage → trigger pre-consult sequence
11. Test end-to-end: form → GHL → email → SMS

### Week 2: Analytics
12. PostHog — install snippet, configure session replay, set up key events
13. GHL calendar — configure provider availability slots
14. Event tracking: form_submitted, quiz_completed, booking_started, booking_completed

### Week 3: Reporting
15. n8n workflow: Weekly report aggregation (GA4 + GSC + GHL + PostHog)
16. `/clinic/growth-ops` dashboard page
17. Automated weekly email digest to operator

### Month 2: Scale
18. Consider Sanity or Contentlayer for blog CMS (if publishing >4 posts/mo)
19. PostHog experiments for A/B testing
20. GHL social posting (or Buffer) if social strategy launches

---

## Manual First, Automate Later

| Activity | Manual Phase | Automate When |
|----------|-------------|---------------|
| Directory submissions | Submit manually, track in spreadsheet | Month 2 — automate verification checks |
| Blog publishing | Create Next.js pages manually | Month 2 — headless CMS if >4 posts/mo |
| Social media | Manual posting | Month 2 — Buffer or GHL social |
| A/B testing | Manual page variants | Month 2 — PostHog experiments |
| Reporting | Pull data manually from each tool | Week 3 — n8n aggregation workflow |
| Lead scoring | Manual tag assignment | Month 2 — GHL workflow automation |

---

## Metrics from Day 1

### Traffic (GA4)
- Unique visitors, page views, bounce rate, avg session duration
- Top pages by views
- Traffic source breakdown (organic, direct, referral)

### SEO (Search Console)
- Total impressions, clicks, avg CTR, avg position
- Top queries driving impressions and clicks
- Index coverage status

### Forms (PostHog + Custom Events)
- Form submission rate (submissions / page views)
- Email capture rate
- Quiz completion rate
- Quiz-to-email conversion (if gated)

### Email (GHL)
- Open rate, click rate, unsubscribe rate per email
- Sequence completion rate
- Sequence-to-booking conversion

### Pipeline (GHL)
- New leads created per week
- Stage progression rates
- Booking rate (leads → consultations)
- Show rate (booked → attended)

### Revenue
- Consultations booked per week
- Revenue per consultation
- Patient activation rate (consulted → active)

### Track Later (Month 2+)
- Customer acquisition cost by channel
- Email sequence attribution (which email drove booking)
- Content ROI (which blog posts drive bookings)
- Cohort retention rates
- Lifetime value projections

---

# PHASE 7 — AGENT ARCHITECTURE

## System Overview

```
                        ┌──────────────────┐
                        │  Human Operator   │
                        │  (Weekly goals,   │
                        │   exceptions)     │
                        └────────┬─────────┘
                                 │
                        ┌────────▼─────────┐
                        │   PM Agent        │
                        │  (Orchestrator)   │
                        └────────┬─────────┘
                                 │
         ┌───────────┬───────────┼───────────┬───────────┐
         │           │           │           │           │
    ┌────▼───┐  ┌────▼───┐  ┌───▼────┐  ┌──▼─────┐  ┌─▼──────┐
    │SEO     │  │Directory│  │Web     │  │Email   │  │CRM     │
    │Research│  │Listing  │  │Convert │  │Nurture │  │Pipeline│
    └────┬───┘  └────────┘  └────────┘  └────────┘  └────────┘
         │
    ┌────▼───┐
    │SEO     │
    │Content │
    └────────┘
         │
    All outputs pass through:
    ┌────▼───┐      ┌──────────┐
    │QA Agent│ ←──→ │Analytics │
    └────────┘      │Agent     │
                    └──────────┘
```

---

## Agent Specifications

### 1. Project Manager Agent

**Mission:** Orchestrate all growth activities. Assign tasks, track progress, enforce deadlines, escalate blockers. Single source of truth for what's happening.

**Ownership:** Central coordinator — no agent acts without PM awareness

**Inputs:**
- Weekly goals from human operator
- Task completion signals from all agents
- Performance data from Analytics Agent
- Blocker reports from any agent

**Outputs:**
- Daily task assignments (morning briefing)
- Weekly progress report (Monday)
- Blocker alerts (real-time)
- Priority adjustments (as needed)

**Tools:**
- GHL: `create_contact_task`, `search_location_tasks`, `update_task_completion`
- n8n: Workflow triggers for automated reports
- Google Sheets: Master tracking spreadsheet

**Triggers:**
- Daily at 8:00 AM — generate morning briefing
- On task completion — reassign or advance pipeline
- On blocker — assess and route

**Dependencies:** All agents report to PM

**Failure Conditions:**
- Agent unresponsive for 2+ hours
- Task overdue by 24+ hours
- 3+ tasks blocked simultaneously

**Escalation:** Alert human via GHL `send_sms` + `send_email`

**Retry Logic:** Retry failed task once with same agent → reassign to different agent → escalate to human

**Report Format:**
```
DAILY DIGEST
- Completed: [list]
- In Progress: [list]
- Blocked: [list with reasons]
- Key Metrics: [traffic, leads, bookings — yesterday]

WEEKLY SUMMARY
- Tasks completed: X/Y
- Key wins: [top 3]
- Concerns: [top 3]
- Next week priorities: [top 5]
- Metrics: [full dashboard snapshot]
```

---

### 2. SEO Research Agent

**Mission:** Identify keyword opportunities, monitor rankings, analyze competitors, surface content gaps

**Ownership:** All keyword data, ranking tracking, competitive intelligence

**Inputs:**
- Target keyword clusters (from CLAUDE.md / product context)
- Competitor URLs (Hims, Roman, Marek, Peter MD)
- Search Console data (via n8n)

**Outputs:**
- Keyword maps: keyword, volume, difficulty, intent, target page
- Content briefs: topic, target keyword, H2 outline, competitor analysis
- Ranking reports: keyword, current position, delta, target page
- Gap analysis: keywords competitors rank for that we don't

**Tools:** WebSearch, WebFetch, Search Console API (n8n), Google Sheets

**Triggers:**
- Weekly: keyword review and ranking check
- On new page creation: keyword assignment
- Monthly: full competitor audit

**Dependencies:** Feeds SEO Content Agent and Implementation Agent

**Failure Conditions:** No keyword data returned, Search Console access lost

**Escalation:** PM Agent → human operator

**Retry:** Switch data source, retry with modified query parameters

**Report:** Weekly keyword opportunity spreadsheet + ranking delta report

---

### 3. SEO Content Agent

**Mission:** Write all SEO-optimized content — service pages, blog posts, location pages, condition pages, metadata, FAQ blocks

**Ownership:** All content creation for organic search

**Inputs:**
- Content briefs from SEO Research Agent
- Keyword targets with volume and intent
- Brand voice: `.agents/product-marketing-context.md`
- Compliance rules: no absolute health claims, use "may support," disclaimers required

**Outputs:**
- Complete page content (markdown or JSX)
- Title tag (under 60 chars)
- Meta description (under 155 chars)
- FAQ blocks (5+ questions, schema-ready)
- Internal link suggestions

**Tools:** Write, Read, product-marketing-context.md reference

**Triggers:**
- Content brief approved by PM
- Weekly content calendar execution
- Monthly content refresh cycle

**Dependencies:** Requires briefs from Research Agent, reviewed by QA Agent before publish

**Failure Conditions:**
- Content fails compliance check
- Keyword density off target (>3% or absent)
- Readability below Grade 8 level

**Escalation:** QA flags → Content Agent revises → 2 revision failures → PM → human

**Retry:** Revise with specific QA feedback, max 2 cycles

**Report:** Content delivery log (title, URL, keyword, word count, status, publish date)

---

### 4. Directory Listing Agent

**Mission:** Submit and maintain Bloom Metabolics listings across all relevant directories

**Ownership:** All directory profiles, submissions, verifications, consistency

**Inputs:**
- Submission kit (descriptions, assets, NAP — from Phase 3)
- Directory database (prioritized list)
- Platform credentials

**Outputs:**
- Submission confirmations
- Verified listing URLs
- NAP inconsistency reports
- New directory opportunity recommendations

**Tools:** WebFetch, WebSearch, GHL contact management, Google Sheets (tracker)

**Triggers:**
- Weekly: new submission batch (per priority schedule)
- Monthly: verification audit of all live listings
- On discovery: new relevant directory found

**Dependencies:** Submission kit must be complete, human needed for phone/mail verification codes

**Failure Conditions:** Submission rejected, verification code unreceived, listing info incorrect

**Escalation:** PM → human for manual verification steps

**Retry:** Resubmit with corrected info once, flag for human if platform requires manual steps

**Report:** Directory tracker update (platform, status, verified date, referral traffic)

---

### 5. Web Conversion Agent

**Mission:** Optimize website conversion rates — forms, CTAs, popups, page layouts, user flows

**Ownership:** All on-site CRO

**Inputs:**
- PostHog session replays and heatmaps
- GA4 conversion data
- Form submission rates by page
- Bounce rates by page

**Outputs:**
- CRO recommendations with expected impact
- A/B test designs (hypothesis, variants, success metric)
- Copy variants for testing
- Implementation specs (code changes needed)

**Tools:** Read/Edit (code), PostHog API, GA4 API, webapp-testing skill

**Triggers:**
- Weekly: conversion rate review
- On significant metric drop (>20% WoW)
- Monthly: full optimization cycle

**Dependencies:** Analytics Agent provides data, Content Agent implements copy changes

**Failure Conditions:** Insufficient data for significance, test implementation breaks page

**Escalation:** PM → rollback change → human review

**Retry:** Extend test duration for more data, try alternative variant

**Report:** CRO experiment log (hypothesis, variant, result, confidence level, next action)

---

### 6. Email Nurture Agent

**Mission:** Manage all email and SMS nurture sequences, optimize performance, create new sequences as needed

**Ownership:** All automated post-capture communication

**Inputs:**
- Lead data from GHL (new contacts, engagement events)
- Sequence performance metrics (opens, clicks, conversions)
- New content from Content Agent (for fresh emails)

**Outputs:**
- Email/SMS copy (new sequences or variants)
- GHL workflow configurations
- Performance reports per sequence and per email
- Segment recommendations

**Tools:**
- GHL: `send_email`, `send_sms`, `cancel_scheduled_email`, `cancel_scheduled_message`
- GHL: `add_contact_to_workflow`, `remove_contact_from_workflow`, `ghl_get_workflows`
- GHL: `add_contact_tags`, `remove_contact_tags`

**Triggers:**
- On new lead → verify welcome sequence triggered
- On sequence completion → evaluate outcome
- Weekly → performance review

**Dependencies:** Leads from Web Conversion captures, content from Content Agent

**Failure Conditions:**
- Deliverability drops below 95%
- Unsubscribe rate exceeds 2% for any email
- Bounce rate exceeds 5%

**Escalation:** Pause sequence → PM → human review

**Retry:** Resend to soft bounces after 24h, permanently skip hard bounces

**Report:** Sequence dashboard — sends, opens, clicks, conversions per email, overall sequence conversion rate, revenue attributed

---

### 7. CRM / Pipeline Agent

**Mission:** Maintain clean CRM data, manage lead pipeline, ensure no leads fall through cracks

**Ownership:** GHL contact management, pipeline stages, data hygiene

**Inputs:**
- Form submissions (via API routes / n8n)
- Booking events
- Email engagement data (opens, clicks)
- Payment events (Stripe webhooks)

**Outputs:**
- Created/updated contact records
- Pipeline stage transitions
- Lead score updates
- Stale lead alerts (no activity 14+ days)
- Duplicate merge reports

**Tools:**
- GHL: `create_contact`, `update_contact`, `upsert_contact`, `search_contacts`
- GHL: `get_pipelines`, `create_opportunity`, `update_opportunity`, `update_opportunity_status`
- GHL: `get_duplicate_contact`

**Triggers:**
- On form submission → create/update contact, add to pipeline
- On booking → update stage to "Booked"
- On payment → update stage to "Active Patient"
- Daily → pipeline review (stale leads, missing data)

**Dependencies:** Web Conversion Agent (new leads), Nurture Agent (engagement data), Stripe webhooks (payments)

**Failure Conditions:** Duplicate contacts unresolved, missing required fields, pipeline stage inconsistency

**Escalation:** Auto-merge clear duplicates → flag ambiguous → PM → human

**Retry:** API retry with exponential backoff (1s, 2s, 4s), log failed syncs for manual review

**Report:** Pipeline snapshot — leads per stage, conversion rates between stages, avg time in stage, revenue forecast

---

### 8. Analytics Agent

**Mission:** Collect, analyze, and report on all growth metrics across every channel

**Ownership:** All data aggregation, dashboards, trend analysis, anomaly detection

**Inputs:**
- GA4: traffic, conversions, behavior
- Search Console: keywords, impressions, CTR, positions
- PostHog: session data, funnel completion, experiment results
- GHL: pipeline data, email metrics, SMS metrics
- Stripe: revenue data

**Outputs:**
- Daily metrics snapshot (key numbers)
- Weekly performance report (full breakdown)
- Monthly trend analysis
- Anomaly alerts (real-time)

**Tools:**
- GA4 API (via n8n workflow)
- Search Console API (via n8n workflow)
- PostHog API
- GHL reporting endpoints
- Google Sheets (dashboard data)

**Triggers:**
- Daily at 7:00 AM → pull yesterday's metrics
- Monday at 8:00 AM → generate weekly report
- Real-time → on anomaly detection (>30% deviation from baseline)

**Dependencies:** All agents provide data points indirectly

**Failure Conditions:** API connection lost, data gaps >24 hours, calculation errors

**Escalation:** PM → attempt API reconnection → human if persistent

**Retry:** 3x with exponential backoff, use cached data if fresh data unavailable

**Report Format:**
```
WEEKLY GROWTH REPORT — Week of [Date]

EXECUTIVE SUMMARY
• Traffic: X sessions (+Y% WoW)
• Leads captured: X (+Y% WoW)
• Consultations booked: X (+Y% WoW)
• Revenue: $X (+Y% WoW)

CHANNEL BREAKDOWN
[Organic, Direct, Referral, Paid — sessions, leads, bookings per channel]

SEO PERFORMANCE
[Top 10 keywords by impressions, position changes, new rankings]

EMAIL PERFORMANCE
[Sequence metrics — opens, clicks, conversions]

PIPELINE
[Stage snapshot, conversion rates, stale leads]

RECOMMENDATIONS
[Top 3 actions for next week based on data]
```

---

### 9. QA Agent

**Mission:** Review all outputs from every agent before deployment. Quality gate for content, code, emails, listings, and data.

**Ownership:** Final approval on all deliverables

**Inputs:** Deliverables from all agents

**Outputs:**
- Pass/fail verdict with specific feedback
- Compliance check results
- Brand consistency score
- Technical validation results

**Tools:** Read, webapp-testing skill, compliance checklist, brand guidelines (.agents/product-marketing-context.md)

**Triggers:**
- On any agent deliverable submission
- Before any deployment or publication
- Weekly: audit sample of live content

**Dependencies:** Blocks deployment until approval. All agents must route through QA.

**Failure Conditions:**
- QA backlog exceeds 48 hours
- Same issue flagged 3+ times across deliverables (systemic problem)

**Escalation:** Systemic issues → PM → human for process fix

**Retry:** Return to originating agent with specific feedback, max 2 revision rounds → human review

**QA Checklist (applied to all deliverables):**
- [ ] **Compliance:** No absolute health claims, disclaimers present, "may support" language
- [ ] **Brand:** Tone matches product-marketing-context.md, terminology consistent
- [ ] **Technical:** Links work, forms submit, pages render, mobile responsive
- [ ] **SEO:** Metadata present, schema validates, keywords included naturally
- [ ] **Accuracy:** Facts verifiable, no made-up statistics, sources available

**Report:** QA log (item, originating agent, pass/fail, issues found, resolution status)

---

## Handoff Logic

```
CONTENT PIPELINE:
SEO Research Agent → content brief → PM approves → SEO Content Agent → draft
→ QA Agent → approve/revise → Implementation → Deploy → Analytics tracks

LEAD PIPELINE:
Visitor → Website (Web Conversion Agent monitors) → Form submission
→ CRM Agent creates GHL contact → Nurture Agent triggers sequence
→ Lead engages → CRM Agent updates tags → Lead books
→ CRM Agent updates pipeline → Analytics Agent records conversion

OPTIMIZATION LOOP:
Analytics Agent → weekly data → PM Agent → identifies priorities
→ Assigns to relevant agent → Execute → QA → Deploy → Measure → Repeat
```

---

## Quality Control Checkpoints

| Checkpoint | What's Reviewed | Who Reviews | Blocks |
|------------|----------------|-------------|--------|
| Content created | Compliance, brand, SEO, accuracy | QA Agent | Publishing |
| Email copy written | Compliance, tone, links, rendering | QA Agent | Workflow activation |
| Code changes | Functionality, mobile, performance | QA Agent | Deployment |
| Listing submitted | NAP accuracy, description, categories | QA Agent | N/A (submitted) |
| Metrics reported | Data integrity, calculation accuracy | QA Agent | Report distribution |

---

## Execution Cadence

### Daily
| Time | Activity | Owner |
|------|----------|-------|
| 7:00 AM | Pull yesterday's metrics | Analytics Agent |
| 8:00 AM | Morning briefing — metrics + today's tasks | PM Agent |
| 8:30 AM | Agents begin assigned tasks | All |
| 12:00 PM | Mid-day progress check | PM Agent |
| 4:00 PM | Review day's deliverables | QA Agent |
| 5:00 PM | Submit completion reports | All agents |
| 5:30 PM | Compile daily summary | PM Agent |

### Weekly
| Day | Activity | Owner |
|-----|----------|-------|
| Monday | Publish weekly report, set priorities | Analytics + PM |
| Tue-Thu | Execution sprint | All agents |
| Friday | Weekly QA audit, plan next week | QA + PM |

### Monthly
| Activity | Owner |
|----------|-------|
| Full competitor SEO audit | SEO Research Agent |
| Directory verification sweep | Directory Agent |
| Content performance review (prune/update) | Content + Analytics |
| Nurture sequence optimization | Nurture Agent |
| Full pipeline health check | CRM Agent |

---

## Exception Handling

```
1. Agent encounters error
   → Log: error type, context, attempted action, timestamp

2. Agent retries with adjusted approach (1 retry max)
   → If success: log resolution, continue
   → If fail: proceed to step 3

3. Notify PM Agent
   → PM assesses severity:
     - Low: reassign to same agent with guidance
     - Medium: reassign to different agent
     - High: escalate to human immediately

4. Human resolves
   → PM documents: what happened, root cause, resolution
   → Update agent instructions to prevent recurrence
```

---

## Growth Ops Dashboard Concept (/clinic/growth-ops)

### Section 1: Pipeline Overview
- Leads by stage (bar chart)
- Conversion rates between stages
- Revenue this week / month
- Bookings this week / month

### Section 2: Traffic & SEO
- Sessions trend (line chart, 30 days)
- Top 10 keywords by impressions
- Organic click trend
- New pages indexed

### Section 3: Email Performance
- Sequence funnel (enrolled → opened → clicked → booked)
- Per-email metrics table
- Deliverability health

### Section 4: Content Pipeline
- Pages published this week
- Content in QA review
- Content in progress
- Rankings gained/lost

### Section 5: Task Board
- Completed today
- In progress
- Blocked (with reasons)
- Upcoming this week

### Section 6: Alerts
- Metric anomalies (>30% deviation)
- Agent failures
- Escalations pending human action
