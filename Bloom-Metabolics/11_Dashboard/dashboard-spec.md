# Dashboard & Agent Architecture Specification

---

## Dashboard Modules

### 1. Lead Pipeline
**Purpose:** Track leads from capture to conversion
**Data source:** GHL API + Supabase
**Update frequency:** Real-time (webhook-driven)

| Metric | Display |
|--------|---------|
| New leads (today/week/month) | Counter with trend |
| Qualified (HOT/WARM/COLD) | Segmented bar chart |
| Contacted | Counter |
| Booked | Counter with conversion rate |
| Converted to patient | Counter with conversion rate |
| Lost | Counter with top reasons |

### 2. Booked Consults
**Purpose:** Manage upcoming consultations
**Data source:** Calendly API / EHR scheduling
**Update frequency:** Real-time

| View | Details |
|------|---------|
| Today's appointments | Time, patient name, service interest, intake status |
| This week | Calendar view with appointment density |
| Upcoming (next 30 days) | List sorted by date |
| No-shows (last 7 days) | Count + follow-up status |

### 3. Pending Forms
**Purpose:** Track incomplete patient intake
**Data source:** Supabase patient_intakes table
**Automation trigger:** Auto-reminder at 24hr, 48hr, 72hr

| Column | Details |
|--------|---------|
| Patient name | Link to patient record |
| Forms outstanding | Which forms are incomplete |
| Days since booking | Time elapsed |
| Last reminder sent | Timestamp |
| Action | "Send Reminder" button |

### 4. Pending Labs
**Purpose:** Track patients waiting for lab results
**Data source:** EHR / Lab partner API
**Update frequency:** Polling every 4 hours or webhook

| Column | Details |
|--------|---------|
| Patient name | — |
| Lab ordered date | — |
| Lab type | TRT panel, metabolic panel, etc. |
| Status | Ordered, Drawn, Processing, Results received |
| Days waiting | Highlighted if > 5 days |

### 5. Provider Review Queue
**Purpose:** Intakes and lab results awaiting physician sign-off
**Data source:** Supabase tasks + EHR
**Priority:** Sorted by wait time (longest first)

| Column | Details |
|--------|---------|
| Patient name | — |
| Review type | New intake, Lab review, Protocol adjustment, Red flag |
| Submitted | Timestamp |
| Wait time | Highlighted if > 24 hours |
| Red flags | Any contraindications flagged |
| Action | "Review" → opens patient detail |

### 6. Ready-to-Start Patients
**Purpose:** Patients approved, labs clear, payment confirmed — ready for prescription
**Data source:** Pipeline stage = "Approved"

| Column | Details |
|--------|---------|
| Patient name | — |
| Treatment track | TRT, GLP-1, Peptides |
| Subscription plan | Standard, Premium, etc. |
| Labs reviewed | ✅/❌ |
| Consents signed | ✅/❌ |
| Action | "Send Prescription" |

### 7. Active Treatment
**Purpose:** Monitor current patients
**Data source:** EHR + Supabase

| Column | Details |
|--------|---------|
| Patient name | — |
| Protocol | Current treatment |
| Start date | — |
| Last check-in | Date + satisfaction score |
| Next check-in | Date (highlighted if overdue) |
| Adherence | On track / Missed doses / Flagged |

### 8. Refill Due
**Purpose:** Patients approaching refill date
**Data source:** Prescription dates + supply duration
**Automation:** Auto-notify 7 days before, auto-request if no flags

| Column | Details |
|--------|---------|
| Patient name | — |
| Medication | — |
| Supply remaining | Days |
| Refill date | — |
| Status | Pending patient confirmation / Sent to pharmacy / Shipped |
| Flags | Side effects reported, labs overdue |

### 9. Churn Risk
**Purpose:** Predict and prevent patient dropout
**Scoring model:** Composite of: missed check-ins, declining satisfaction, overdue refills, support tickets, payment failures

| Risk Score | Definition |
|------------|-----------|
| 80-100 | Critical — likely to cancel within 7 days |
| 60-79 | High — engagement declining |
| 40-59 | Medium — minor signals |
| 0-39 | Low — engaged and satisfied |

**Actions:** High risk triggers: provider outreach, retention offer, satisfaction survey

### 10. Support Issues
**Data source:** Support form submissions + GHL tasks

| View | Details |
|------|---------|
| Open tickets | By type and urgency |
| SLA tracking | Time to first response, time to resolution |
| Trending issues | Most common issue types this week |

### 11. Revenue Overview
**Data source:** Stripe API

| Metric | Display |
|--------|---------|
| MRR | Current + trend (week-over-week) |
| New subscriptions (this month) | Count + revenue |
| Churn (this month) | Count + revenue lost |
| ARPU | Average revenue per user |
| Failed payments | Count + recovery rate |
| LTV estimate | Based on current retention |

### 12. CAC / Funnel Metrics
**Data source:** GHL + Stripe + Google Analytics

| Metric | Display |
|--------|---------|
| Leads → Booked | Conversion rate |
| Booked → Paid | Conversion rate |
| Paid → Active patient | Conversion rate |
| Overall lead → patient | Conversion rate |
| CAC by channel | Google Ads, organic, referral, social |
| Cost per lead | By channel |

### 13. Retention Metrics
**Data source:** Stripe + Supabase

| Metric | Display |
|--------|---------|
| Monthly retention rate | % + trend |
| Average patient lifetime | Months |
| Cohort analysis | Retention curve by signup month |
| NPS score | From satisfaction surveys |

### 14. Operational Alerts
**Data source:** System monitoring + n8n + EHR

| Alert Type | Severity | Description |
|------------|----------|-------------|
| Critical lab value | CRITICAL | Out-of-range lab result needing immediate attention |
| Integration error | HIGH | API failure (Stripe, GHL, lab partner, pharmacy) |
| Compliance flag | HIGH | Missing consent, expired BAA, licensing gap |
| Overdue review | MEDIUM | Patient in provider queue > 48 hours |
| Failed automation | MEDIUM | n8n workflow failure |
| System health | LOW | Uptime, response time, error rates |

---

## Claude Agent Architecture

### What Agents Can READ (Non-PHI)
- Pipeline counts (leads by stage, patients by status)
- Aggregate metrics (MRR, conversion rates, retention)
- Task lists (without patient-identifying details)
- Operational alerts (system health, integration status)
- Content library (marketing copy, email templates)
- Knowledge base (protocols, SOPs, compliance rules — non-PHI portions)
- Support ticket categories and counts (without patient details)

### What Agents Can WRITE
- Task creation (follow-up reminders, outreach tasks)
- Alert acknowledgment (marking alerts as reviewed)
- Content generation (email drafts, social posts, marketing copy)
- Report generation (weekly summaries, KPI dashboards)
- Workflow trigger (initiate n8n automation for non-PHI tasks)

### What Agents Must NEVER Access
- Individual patient medical records
- Lab results (individual or identifiable)
- Medication/prescription details
- Patient contact information (name, email, phone)
- Clinical notes
- Consent documents with patient signatures
- Billing details linked to patient identity
- Audit logs containing PHI

### PHI Segmentation Model

```
┌─────────────────────────────────────────────────┐
│              NON-PHI WORKSPACE                  │
│         (Agents can access freely)              │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Pipeline │  │ Metrics  │  │ Content  │     │
│  │ Counts   │  │ & KPIs   │  │ Library  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Tasks    │  │ Alerts   │  │ SOPs     │     │
│  │ (no PHI) │  │ (system) │  │          │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                 │
│  MCP Adapter Layer (anonymizes/aggregates)      │
├─────────────────────────────────────────────────┤
│              PHI WORKSPACE                      │
│     (Clinical staff only, via EHR)              │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Patient  │  │ Lab      │  │ Rx       │     │
│  │ Records  │  │ Results  │  │ History  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Clinical │  │ Consents │  │ Messages │     │
│  │ Notes    │  │          │  │          │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                 │
│  Access: Role-based, audit-logged, encrypted    │
└─────────────────────────────────────────────────┘
```

### Permission Model

| Agent | Read Access | Write Access | Restrictions |
|-------|-----------|-------------|-------------|
| Qualifier | Lead data (name, email, quiz score) | Lead score, segment, pipeline stage | No medical data |
| Clinical Intake | Intake form responses (during intake session only) | Intake summary | Access expires after intake complete |
| Content | Marketing copy, templates, campaign metrics | Email/SMS drafts, social content | No patient data |
| BizOps | Aggregate business metrics, vendor info | Reports, contract summaries | No individual patient data |
| Outreach | Partner contact info, outreach templates | Email sequences, partner notes | No patient data |
| Research | Public information, published studies | Content drafts, analysis reports | No internal data |
| Data | Aggregate metrics, system logs | Reports, anomaly alerts | No PHI |
| Service Ops | Support ticket categories, SLA metrics | Ticket routing, response drafts | No clinical details |

### Audit Logging Requirements
- Every agent action logged: agent_id, action_type, data_accessed (category, not content), timestamp
- Failed access attempts logged and alerted
- Monthly audit review by ops team
- Logs retained for minimum 6 years (HIPAA)
- Logs are immutable (append-only table)
