# Bloom Metabolics — Executive Summary

**Date:** 2026-04-15
**Status:** Pre-Launch | Sprint to First Patient

---

## Vision

Bloom Metabolics is a premium telehealth platform delivering testosterone replacement therapy (TRT), GLP-1 weight loss programs, and peptide therapy protocols to adults aged 35–55. We combine the clinical depth of boutique hormone clinics with the digital experience of modern consumer health brands — at a price point between them.

**Positioning:** "The clinical depth of Marek Health with the UX of Hims, at a price between them."

---

## Target Market

- **Demographics:** Adults 35–55, both men and women
- **Household Income:** $150K+ HHI
- **Psychographic:** Health-conscious professionals who value quality, convenience, and medical credibility. They would never sign up for a $99/mo TRT mill but don't want to pay $7,000/yr for boutique care either.
- **Geographic:** US-based, initially targeting states with favorable telehealth prescribing laws (excluding NY, NJ, MA for TRT until licensing is confirmed)

---

## Service Lines & Pricing

| Service | Tier | Monthly Price |
|---------|------|--------------|
| Initial Consultation | One-time | $49 (refundable if patient doesn't qualify) |
| TRT Standard | Monthly | $149/mo |
| TRT Premium | Monthly | $199/mo |
| GLP-1 Core | Monthly | $249/mo |
| GLP-1 Complete | Monthly | $349/mo |
| Peptide Protocol | Monthly | $199–299/mo |
| Optimization Bundle | Monthly | $399/mo (TRT + GLP-1 + Peptides) |

**Revenue Model:** Cash-pay subscriptions. No insurance billing. Cancel anytime. All-inclusive pricing covers medication, labs (at scheduled intervals), provider oversight, and secure messaging.

---

## Current State

The existing codebase (currently branded "Nova Health," previously "Veldra") is an MVP-ready Next.js 14 application with significant infrastructure already built:

**What's Built:**
- 32 pages/routes (20 marketing, 3 checkout, 7 clinic dashboard, 2 layout/system)
- 13 React components with premium dark-theme design system
- 10 API routes (lead capture, checkout, clinic agents, webhooks, health check)
- 8 Claude managed agents (Qualifier, Clinical Intake, Content, BizOps, Outreach, Research, Data, Service Ops)
- 4 MCP integrations (Obsidian, Google Workspace, GoHighLevel CRM, n8n automation)
- Supabase database with 12 tables, RLS policies, AES-256-GCM encryption for PHI
- Lead capture → CRM → qualification → nurture pipeline (functional)
- Clinic dashboard with patient management, labs, vitals, alerts, tasks, RBAC
- n8n automation workflows (lead intake, follow-up, booking, alert escalation)
- 35 marketing skills for content generation
- Platform backend (Express) with BullMQ job queues, workflow engine, approval gates

**What's Missing (Critical):**
- No physician/provider on board
- Stripe products not configured (checkout will fail in production)
- No EHR system selected or integrated
- No pharmacy partner for prescription fulfillment
- No lab partner for blood work orders
- No BAAs signed with any vendor
- Email/SMS templates not created

---

## Competitive Advantage

1. **AI-Powered Operations:** 8 Claude managed agents handle lead qualification, clinical intake, content generation, outreach, and data analysis — enabling lean operations from day one
2. **Comprehensive Labs:** Positioned against competitors who skip thorough lab work. Every protocol starts with comprehensive bloodwork.
3. **Proactive Care Model:** "We reach out to you" — scheduled check-ins, lab reminders, refill automation. Most competitors are reactive.
4. **Premium UX:** Apple-like clarity. Dark theme, silver accents, smooth animations. Not the typical clinical/sterile healthcare look.
5. **Multi-Service Platform:** TRT + GLP-1 + Peptides under one roof. Only Marek Health offers comparable breadth, at 2–3x the price.
6. **Compliance-First:** In a market where MEDVi just received an FDA warning letter and faces a class action, building trust through genuine compliance is a strategic moat.

---

## Key Risk: Regulatory Environment

The telehealth/compounded medication space is under intense regulatory scrutiny as of 2026:
- MEDVi received FDA Warning Letter (Feb 2026) for misbranding compounded semaglutide
- Henry Meds received similar FDA warning (March 2026)
- 30+ telehealth companies received FDA warnings in Q1 2026
- MEDVi faces class action for deceptive affiliate marketing
- FTC increasing scrutiny of health claims in telehealth advertising

**Our advantage:** Building compliance into the DNA from day one. We will never imply compounded medications are FDA-approved, never use AI-generated fake doctors, never make specific health outcome guarantees, and never use uncontrolled affiliate marketing.

---

## 14-Day Sprint Goal

**First paying patient by Day 14.**

Critical path: Domain registration → Provider recruitment → Attorney engagement → Stripe configuration → Brand rename → Email templates → End-to-end testing → Soft launch to warm network → First patient.

---

## Financial Targets

| Metric | Day 14 | Day 30 | Day 90 |
|--------|--------|--------|--------|
| Active Patients | 1–5 | 15–30 | 100+ |
| MRR | $500–1,500 | $4,000–8,000 | $25,000–50,000 |
| Providers | 1 | 1–2 | 3–5 |
| States Licensed | 3–5 | 10+ | 20+ |
| CAC Target | N/A (warm network) | <$200 | <$150 |
| Monthly Churn Target | N/A | <5% | <5% |

---

## Decision Required

**Brand Name:** "Bloom Metabolics" has all 7 domains available and no trademark conflicts, but the "Bloom" root is crowded in wellness (BloomMD is a direct telehealth competitor). Recommendation: Proceed with Bloom Metabolics but register immediately. Fallbacks: Vitalis Medical, Lumis Health.

**Next Step:** Review this executive summary and confirm brand direction. All other work proceeds in parallel.
