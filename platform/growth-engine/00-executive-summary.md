# Bloom Metabolics Growth Engine — Executive Summary & 30-Day Roadmap

## Executive Summary

Bloom Metabolics's growth engine is a lean, agent-operated patient acquisition system built for zero-to-traction speed. It converts organic search traffic and directory visibility into qualified consultation bookings through a five-stage pipeline:

**Discovery → Visit → Capture → Nurture → Book**

The system runs on infrastructure already deployed: Next.js on Vercel, GoHighLevel CRM, n8n automation, and Claude managed agents. Total additional monthly cost: **$0** (all additions are free-tier tools).

### Core Thesis
Men searching for TRT, GLP-1, and hormone optimization are high-intent, high-value leads. The funnel from search to booking requires:
1. **Visibility** — rank for commercial and informational keywords, appear in health directories
2. **Credibility** — premium brand, licensed provider messaging, trust signals everywhere
3. **Capture** — never let a visitor leave without an email or quiz completion
4. **Nurture** — 7-email + 4-SMS sequence that educates and moves leads to book
5. **Conversion** — frictionless booking flow with Stripe checkout

### Key Numbers to Hit (30-Day Targets)
| Metric | Target |
|--------|--------|
| Organic impressions | 5,000+ |
| Website sessions | 500+ |
| Email captures | 50+ |
| Quiz completions | 30+ |
| Consultation bookings | 5-10 |
| Directory listings live | 15+ |
| Blog posts published | 4 |
| Pages created/optimized | 12+ |

---

## 30-Day Rollout Roadmap

### Week 1 — Foundation (Days 1-7)

**Day 1-2: SEO Foundation**
- [ ] Set up Google Search Console, verify site ownership
- [ ] Install GA4 tracking snippet
- [ ] Create and submit XML sitemap
- [ ] Create robots.txt
- [ ] Optimize homepage metadata (title, description, schema)
- [ ] Add Organization + MedicalBusiness schema to homepage
- [ ] Set up Google Business Profile (if applicable)

**Day 2-3: Page Creation**
- [ ] Deploy /about page (trust + credibility)
- [ ] Deploy /services hub page
- [ ] Optimize all existing treatment page metadata (/trt, /glp1, /peptides)
- [ ] Add FAQPage schema to all pages with FAQ sections
- [ ] Implement BreadcrumbList schema site-wide

**Day 3-4: Lead Capture Enhancement**
- [ ] Add email gate to quiz results (capture before showing results)
- [ ] Implement scroll-triggered popup (quiz offer)
- [ ] Add inline capture form to treatment pages
- [ ] Upgrade footer email capture copy
- [ ] Wire all forms → GHL contact creation via API

**Day 5-7: Nurture Setup**
- [ ] Configure 7-email welcome sequence in GHL
- [ ] Configure 4-SMS follow-up sequence in GHL
- [ ] Set up GHL pipeline stages (New → Engaged → Booked → Consulted → Patient)
- [ ] Test full flow: form submission → GHL contact → nurture trigger
- [ ] Set up GHL tags for segmentation (new_lead, engaged, high_intent, booked)

### Week 2 — Content & Listings (Days 8-14)

**Day 8-9: Directory Submissions (Batch 1 — P1)**
- [ ] Google Business Profile (complete and verify)
- [ ] Bing Places
- [ ] Yelp
- [ ] Healthgrades
- [ ] Zocdoc
- [ ] Trustpilot
- [ ] BBB
- [ ] Apple Maps Connect

**Day 10-11: Content Production**
- [ ] Publish blog post 1: "Signs of Low Testosterone: 8 Symptoms Most Men Ignore"
- [ ] Publish blog post 2: "TRT vs. Testosterone Boosters: What Actually Works?"
- [ ] Create /blog hub page
- [ ] Add Article schema to blog posts
- [ ] Internal link blog posts → treatment pages → booking

**Day 12-14: Location Pages**
- [ ] Deploy location pages for top 5 states: Texas, Florida, California, Arizona, Georgia
- [ ] Add LocalBusiness schema per state
- [ ] Internal link from service pages to location pages

### Week 3 — Expansion & Optimization (Days 15-21)

**Day 15-16: Directory Submissions (Batch 2 — P2)**
- [ ] Vitals.com
- [ ] WebMD
- [ ] RealSelf
- [ ] Foursquare / Factual
- [ ] Better Doctor
- [ ] CareDash
- [ ] Doctor.com
- [ ] Sharecare

**Day 17-18: Content Production**
- [ ] Publish blog post 3: "Is Online TRT Safe? What the Research Says"
- [ ] Publish blog post 4: "GLP-1 for Weight Loss: A Complete Guide for Men"
- [ ] Create condition pages: /conditions/low-testosterone, /conditions/weight-management
- [ ] Internal linking audit and fixes

**Day 19-21: Conversion Optimization**
- [ ] Install PostHog for session replay
- [ ] Review first 2 weeks of analytics data
- [ ] A/B test headline copy on quiz pages
- [ ] Optimize email subject lines based on open rates
- [ ] Review and adjust nurture sequence timing if needed

### Week 4 — System Hardening & Scale Prep (Days 22-30)

**Day 22-23: Analytics & Reporting**
- [ ] Build marketing metrics dashboard (add to /clinic)
- [ ] Set up n8n workflow for weekly automated report
- [ ] Configure conversion tracking (form submission → booking events)
- [ ] First weekly performance review

**Day 24-25: Content Pipeline**
- [ ] Publish blog post 5: "Semaglutide vs. Tirzepatide"
- [ ] Deploy location pages for next 5 states
- [ ] Create more comparison content if vs/ pages performing well

**Day 26-28: Nurture Optimization**
- [ ] Review email sequence metrics (open rates, click rates)
- [ ] Implement warm-lead branch (clicked but didn't book)
- [ ] Set up cold-lead reactivation sequence
- [ ] A/B test email subject lines

**Day 29-30: Review & Plan Month 2**
- [ ] Full performance review: traffic, leads, bookings, revenue
- [ ] Identify top-performing pages and content
- [ ] Plan month 2 priorities based on data
- [ ] Consider minimal paid spend (Google Ads for high-intent keywords)

---

## Highest-Leverage Actions (Zero Spend)

1. **Google Search Console + Sitemap** — free, immediate SEO visibility
2. **Homepage metadata optimization** — free, immediate ranking signal
3. **Email gate on quiz results** — free, captures high-intent visitors who already took the quiz
4. **GHL nurture sequence** — free (already paying for GHL), converts captured leads
5. **Google Business Profile** — free, local SEO + trust signal
6. **Directory listings** — mostly free, builds trust + backlinks + referral traffic
7. **Blog content** — free, builds topical authority + long-tail keyword rankings
8. **Schema markup** — free, rich results in search + AI citation signals

## Highest-Leverage Actions (Minimal Spend, <$500/mo)

1. **Google Ads for "online trt clinic" + "trt telehealth"** — $200-300/mo, high-intent traffic
2. **Retargeting ads for site visitors** — $100/mo, recaptures bounced visitors
3. **PostHog (free to start)** — session replay to identify conversion blockers
4. **Content writer for blog acceleration** — $200-500/mo for 4-8 posts

## What Can Wait (Month 2-3)

- City-level location pages (state pages come first)
- Headless CMS migration (manual blog is fine at 4 posts/mo)
- Social media content strategy (focus on search first)
- Referral program (need patients first)
- A/B testing infrastructure (need traffic volume first)
- Paid ads scaling (prove organic funnel first)
- Community building (premature at current stage)

---

## System Architecture Overview

```
EXTERNAL FLOW:
Google Search / Directories → Website Visit → Trust Building → Lead Capture → GHL Nurture → Booking

INTERNAL FLOW:
PM Agent assigns → Research Agent plans → Content Agent writes → QA Agent reviews → Implementation → Analytics Agent reports → PM Agent optimizes

TECH STACK:
Next.js (Vercel) ← Supabase Auth ← Stripe Payments
                ↕
        GoHighLevel CRM ← n8n Automation ← Claude Agents (MCP)
                ↕
GA4 + Search Console + PostHog → Marketing Dashboard (/clinic/growth-ops)
```

## Deliverables Index

| # | Deliverable | Location |
|---|-------------|----------|
| 1 | Executive Summary & Roadmap | `platform/growth-engine/00-executive-summary.md` |
| 2 | Growth Blueprint + Local SEO + Directories | `platform/growth-engine/01-growth-blueprint.md` |
| 3 | Lead Capture System + Nurture Sequences | `platform/growth-engine/02-capture-and-nurture.md` |
| 4 | Tech Stack + Agent Architecture | `platform/growth-engine/03-tech-stack-and-agents.md` |
| 5 | SOPs + Ready-to-Deploy Assets | `platform/growth-engine/04-sops-and-assets.md` |
| 6 | About Page | `app/about/page.tsx` |
| 7 | Services Hub Page | `app/services/page.tsx` |
| 8 | Sitemap Generator | `app/sitemap.ts` |
| 9 | Robots.txt | `app/robots.ts` |
| 10 | Schema Markup Component | `components/SchemaMarkup.tsx` |
| 11 | Popup Lead Capture Component | `components/LeadPopup.tsx` |
