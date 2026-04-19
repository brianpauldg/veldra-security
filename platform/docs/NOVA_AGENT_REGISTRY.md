# Bloom Metabolics — Managed Agent Registry

> Operator-grade agent framework for Bloom Metabolics Clinical OS
> Compatible with: `platform/src/core/agent-registry.ts`, `dispatcher.ts`, `approval-gate.ts`, `workflow-engine.ts`
> Last updated: 2026-04-10

---

## Table of Contents

1. [Infrastructure Overlap Assessment](#1-infrastructure-overlap-assessment)
2. [Agent Definitions (11 Agents)](#2-agent-definitions)
3. [Agent-to-Agent Routing Map](#3-agent-to-agent-routing-map)
4. [Priority Hierarchy](#4-priority-hierarchy)
5. [Conflict Resolution Policy](#5-conflict-resolution-policy)
6. [Memory / Context Policy](#6-memory--context-policy)
7. [Patient Data Minimization Policy](#7-patient-data-minimization-policy)
8. [Approval Matrix](#8-approval-matrix)
9. [Agent Definition Schema (JSON)](#9-agent-definition-schema)
10. [Webhook Event Naming Convention](#10-webhook-event-naming-convention)
11. [n8n Workflow Naming Convention](#11-n8n-workflow-naming-convention)
12. [Daily Monitoring Checklist](#12-daily-monitoring-checklist)
13. [Weekly Optimization Checklist](#13-weekly-optimization-checklist)

---

## 1. Infrastructure Overlap Assessment

### What Already Exists and Is Production-Ready

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Agent registry (CRUD, cache, DB) | `platform/src/core/agent-registry.ts` | **Ready** | `registerAgent()`, `getAgentBySlug()`, `listAgents()`, `updateAgentStatus()`. In-memory cache + PG. No changes needed. |
| Job dispatcher + queues | `platform/src/core/dispatcher.ts` | **Ready** | BullMQ queues for LEAD_INTAKE, LEAD_QUALIFY, OUTREACH_GENERATE, BOOKING_HANDOFF, DEAD_LETTER. Priority + delay + idempotency built in. Extend with new queue names. |
| Approval gate system | `platform/src/core/approval-gate.ts` | **Ready** | `checkApproval()`, `decideApproval()`, `getPendingApprovals()`, `processAutoApprovals()`. Manual + auto_after_delay policies. No changes needed. |
| Workflow engine | `platform/src/core/workflow-engine.ts` | **Ready** | `registerWorkflow()`, `startRun()`, `completeStep()`, `failRun()`. Step-based with onFailure handling. No changes needed. |
| Audit logging | `platform/src/core/audit.ts` | **Ready** | `writeAudit()`, `getAuditTrail()`, `getRecentAudit()`. Entity-type scoped. No changes needed. |
| RBAC permissions | `lib/clinic/roles.ts` | **Ready** | 5 roles, 30+ permissions. Agents must inherit role-scoped permissions. No changes needed. |
| MCP tool layer | `lib/clinic/mcp-adapter.ts` | **Ready** | 9 MCP tools (getPatientSummary, flagPatientRisk, createFollowUpTask, etc.). Extend with new tools per agent. |
| Webhook ingest (n8n) | `app/api/clinic/n8n-webhook/route.ts` | **Ready** | 11 event types handled. Extend enum for new events. |
| Agent read API | `app/api/clinic/agents/route.ts` | **Ready** | 12 action types (overview, patients, labs, vitals, alerts, tasks, etc.). Extend with new actions. |
| Webhook router (inbound) | `platform/src/webhooks/router.ts` | **Ready** | HMAC verification, source normalization, idempotency keys. No changes needed. |
| Push notifications | `lib/clinic/push-notify.ts` | **Ready** | Severity-based routing (critical=SMS+email, high=email, medium/low=dashboard). No changes needed. |
| 8 agent configs | `lib/agents.ts` | **Extend** | qualifier, clinical-intake, content, bizop, outreach, research, data agents exist. Map to new registry. |

### Overlap Between Existing Agents and New Registry

| New Agent | Existing Agent in `lib/agents.ts` | Overlap Level | Action |
|-----------|-----------------------------------|---------------|--------|
| Nova Lead Intake Agent | `qualifier` | **HIGH** — qualifier already scores leads 1-100, segments HOT/WARM/COLD, outputs JSON with score + segment + reasoning | **Wrap, don't replace.** New agent extends qualifier with quiz scoring, missed-call intake, source attribution. Keep `qualifier` as the scoring engine inside Lead Intake. |
| Nova Booking Agent | `clinical-intake` (partially) | **MEDIUM** — clinical-intake handles symptom triage + red flag detection but also has booking handoff logic via `dispatchBookingHandoff()` | **Split.** Extract booking logic from clinical-intake into dedicated Booking Agent. Clinical-intake keeps symptom/intake scope only. |
| Nova Patient Concierge Agent | `content` | **MEDIUM** — content agent generates email/SMS for patient outreach, handles follow-up sequences | **Specialize.** Content agent is broad (marketing + clinical comms). Concierge Agent narrows to patient-facing conversational support only. Content agent stays for marketing sequences. |
| Nova Lab Ops Agent | None | **NONE** | **New build.** No lab coordination exists. |
| Nova Rx/Refill Agent | None | **NONE** | **New build.** `refill_request` webhook event exists but no handler logic. |
| Nova Retention Agent | None | **NONE** | **New build.** No retention logic exists. |
| Nova Winback Agent | None | **NONE** | **New build.** No reactivation sequences exist. |
| Nova Billing Agent | None (Stripe webhooks exist) | **LOW** — Stripe webhook handler exists at `app/api/stripe-webhook` but only confirms payments | **New build** on top of existing Stripe integration. |
| Nova CRM Data Quality Agent | None | **NONE** | **New build.** |
| Nova Executive Briefing Agent | `data` + `bizop` | **HIGH** — data agent does KPI tracking + integration monitoring, bizop does meeting notes + email drafting | **Consolidate.** Executive Briefing Agent replaces data agent's reporting function + bizop's summarization. Keep bizop for operational tasks, retire data agent's reporting into this new agent. |
| Nova Compliance Gatekeeper Agent | None | **NONE** | **New build.** |

### Existing Queue Names to Extend

Current queues in `dispatcher.ts`:
```
LEAD_INTAKE, LEAD_QUALIFY, OUTREACH_GENERATE, BOOKING_HANDOFF, DEAD_LETTER
```

New queues needed:
```
LAB_COORDINATION, REFILL_PROCESSING, RETENTION_OUTREACH, WINBACK_SEQUENCE,
BILLING_RECOVERY, CRM_HYGIENE, EXECUTIVE_BRIEFING, COMPLIANCE_REVIEW
```

### Existing Webhook Events to Extend

Current events in `n8n-webhook/route.ts`:
```
lead_qualified, clinical_intake_completed, content_generated,
ghl_contact_synced, ghl_opportunity_created, agent_action,
workflow_error, workflow_completed, patient_outreach_sent,
refill_request, lab_result_received
```

New events needed (see Section 10 for full convention):
```
booking.created, booking.noshow, booking.rescheduled,
lab.order_approved, lab.result_abnormal, lab.result_normal, lab.overdue,
rx.approved, rx.refill_due, rx.refill_confirmed, rx.refill_lapsed,
retention.risk_detected, retention.intervention_sent, retention.save_successful,
winback.sequence_started, winback.reactivated,
billing.payment_failed, billing.dunning_started, billing.recovered,
crm.duplicate_detected, crm.hygiene_completed,
compliance.message_blocked, compliance.review_required,
briefing.daily_generated, briefing.anomaly_detected
```

### What Does NOT Need Rebuilding

1. **Agent registration flow** — `registerAgent()` accepts arbitrary `config` JSON. New agents register through the same interface.
2. **Approval gates** — `checkApproval()` with `ApprovalPolicy` (manual | auto_after_delay) covers all use cases. New agents just declare which steps need approval.
3. **Audit trail** — `writeAudit()` is entity-agnostic. New agents log through the same function.
4. **Webhook signature verification** — HMAC-SHA256 in `router.ts` covers all inbound webhooks.
5. **MCP request handling** — `handleMCPRequest()` dispatches by tool name. New tools register in `MCP_TOOLS` object.
6. **Role-based permissions** — `hasPermission(role, permission)` already enforces 30+ permissions. Agents inherit role permissions.
7. **Push notification routing** — Severity-based routing (critical/high/medium/low/info) is agent-agnostic.

---

## 2. Agent Definitions

---

### AGENT 01: Nova Lead Intake Agent

**Slug:** `nova-lead-intake`
**Version:** `1.0.0`
**Extends:** `qualifier` agent from `lib/agents.ts`

#### Mission
Capture, normalize, score, and route every inbound lead within 60 seconds. Zero leads fall through. Every lead gets a score, a segment, a source tag, and enters the correct pipeline stage in GHL.

#### Primary Business KPI
**Speed-to-first-contact:** Time from form submission to first automated touchpoint. Target: < 90 seconds for HOT leads, < 5 minutes for WARM, < 1 hour for COLD.

**Secondary KPIs:**
- Lead score accuracy (% of leads scored 80+ that convert to booked consultation)
- Source attribution completeness (% of leads with UTM/source data)
- Duplicate detection rate

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `lead_captured` | Landing page form, `/quiz`, `/glp1-quiz`, `/contact` | P0 |
| `ghl.form_submitted` | GHL form webhook | P0 |
| `ghl.missed_call` | GHL missed call webhook | P0 |
| `ad_platform.lead` | Meta/Google lead form webhook | P0 |
| `partner.referral` | Partner referral webhook | P1 |
| `crm_import.csv` | Manual CSV upload | P2 |

#### Inputs Required
```
REQUIRED: email
OPTIONAL: firstName, lastName, phone, serviceInterest (trt|glp1|peptides|mixed),
          source, utmSource, utmMedium, utmCampaign, utmContent,
          quizResponses[], referralCode, landingPage, ipGeo
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| GHL Contacts API | Read + Write | Create/update contact, check duplicates, set pipeline stage |
| GHL Pipeline API | Write | Move to `Qualified` stage (`62455dc4-7f7f-44ec-aa5e-024b244baf59`) |
| Supabase | Write | Insert lead record, store quiz responses |
| Platform dispatcher | Write | `dispatchLeadIntake()`, `dispatchQualification()` |
| Platform audit | Write | Log scoring decision |
| n8n webhook | Write (outbound) | Trigger downstream workflows |

#### Allowed Actions
- Create GHL contact with tags (source, segment, service interest)
- Score lead 1-100 using qualifier logic
- Segment lead as HOT / WARM / COLD
- Trigger missed-call text-back SMS (via GHL, templated)
- Route HOT leads to Booking Agent
- Route WARM leads to nurture sequence (n8n)
- Route COLD leads to content drip (n8n)
- Flag duplicates for CRM Data Quality Agent
- Log all decisions to audit trail

#### Forbidden Actions
- Send clinical content or treatment information
- Make eligibility determinations
- Promise specific outcomes or pricing
- Access patient medical records
- Modify existing patient records (leads only)
- Override duplicate detection (must flag for human review)

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| Score override (manual rescore request) | `admin_ops` | Manual |
| Bulk import (>100 leads) | `admin_ops` | Manual |
| Partner referral source validation | `admin_ops` | Auto-approve after 48h |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| Score 90+ (ultra-high intent) | Immediate Slack ping to ops | `#ops-alerts` | 5 min response |
| Duplicate detected with conflicting data | CRM Data Quality Agent + ops flag | `#crm-hygiene` | 4h |
| Form submission with complaint language | Executive Briefing Agent | `#escalations` | 1h |
| Scoring engine error/timeout | Dead letter queue + ops alert | `#ops-alerts` + SMS | 15 min |
| 3+ leads from same IP in 5 min (bot detection) | Block + ops review | `#ops-alerts` | 30 min |

#### Output Format
```json
{
  "leadId": "uuid",
  "score": 87,
  "segment": "HOT",
  "serviceInterest": "trt",
  "source": "google_ads",
  "utmCampaign": "trt_spring_2026",
  "ghlContactId": "abc123",
  "ghlStage": "qualified",
  "nextAction": "route_to_booking",
  "routedTo": "nova-booking",
  "scoringReasons": [
    "male 35-55 age range (+15)",
    "TRT interest explicit (+20)",
    "Google Ads high-intent keyword (+25)",
    "phone number provided (+10)",
    "quiz completed with symptoms (+17)"
  ],
  "processingTimeMs": 1240,
  "timestamp": "2026-04-10T14:32:00Z"
}
```

#### Example Tasks
1. **Web form lead:** User submits form on `/trt` page with name, email, phone, selects TRT. Agent scores 82 (HOT), creates GHL contact tagged `trt_interest`, `google_organic`, moves to Qualified stage, triggers Booking Agent.
2. **Missed call:** GHL fires missed_call webhook with phone number. Agent checks for existing contact (found, WARM segment). Sends text-back SMS: "Sorry we missed your call! Book a free consultation: [link]". Logs to audit.
3. **Quiz completion:** User finishes `/glp1-quiz` with 8 responses indicating BMI 32+, no contraindications, high motivation. Agent scores 91, routes as ultra-HOT with Slack ping, creates GHL contact with quiz data as custom fields.
4. **CSV import:** Ops uploads 50 leads from a partner event. Agent processes each with P2 priority, deduplicates against existing contacts, scores batch, generates summary report.

#### Failure Modes
| Failure | Detection | Recovery |
|---------|-----------|----------|
| GHL API timeout | HTTP 504/timeout after 10s | Retry 3x with exponential backoff. If persistent → dead letter queue + manual GHL entry task |
| Duplicate scoring inconsistency | Same lead scored differently on retry | Idempotency key prevents re-scoring. If detected → flag for manual review |
| Quiz data malformed | Zod validation failure | Reject quiz data, process lead with base scoring only, create task to collect quiz data manually |
| Bulk import overwhelms queue | Queue depth > 500 | Throttle to 10/sec, notify ops of estimated completion time |

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Leads processed / hour | Varies | < 1 in business hours = alert |
| Avg processing time | < 3s | > 10s = warn, > 30s = alert |
| Score distribution | 20-30% HOT | < 10% or > 50% HOT = calibration review |
| GHL sync success rate | > 99% | < 95% = alert |
| Duplicate detection rate | Track only | > 20% = source quality review |
| Dead letter queue depth | 0 | > 5 = immediate ops alert |

---

### AGENT 02: Nova Booking Agent

**Slug:** `nova-booking`
**Version:** `1.0.0`
**Extracted from:** `clinical-intake` agent + `booking-handoff.ts` service

#### Mission
Convert qualified leads into booked consultations. Manage the full appointment lifecycle: booking, confirmation, reminders, rescheduling, and no-show recovery. Maximize show rate.

#### Primary Business KPI
**Qualified-to-booked rate:** % of HOT leads that book a consultation within 48 hours. Target: > 60%.

**Secondary KPIs:**
- Show rate (target: > 80%)
- Average time from qualification to booking (target: < 4 hours)
- Reschedule success rate (target: > 70% rebook within 7 days)
- No-show recovery rate (target: > 30% rebook after no-show)

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `lead_qualified` (segment=HOT) | Lead Intake Agent | P0 |
| `booking.requested` | Patient self-service | P0 |
| `booking.rescheduled` | Patient or ops | P1 |
| `booking.noshow` | Calendar check (20 min post-time) | P0 |
| `booking.reminder_due` | Scheduler (48h, 24h, 2h before) | P1 |
| `intake.completed` | Pre-consult intake form submitted | P1 |

#### Inputs Required
```
REQUIRED: leadId OR patientId, ghlContactId
FOR BOOKING: availableSlots[], patientTimezone, consultationType (initial|followup)
FOR NOSHOW: appointmentId, appointmentTime, providerName
FOR REMINDER: appointmentId, appointmentTime, intakeFormStatus
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| GHL Calendar API | Read + Write | Check availability, create/update appointments |
| GHL Contacts API | Read | Pull contact details for confirmation messages |
| GHL SMS/Email API | Write (templated) | Booking confirmation, reminders, no-show recovery |
| Supabase | Read + Write | Appointment records, intake form status |
| Platform scheduler | Write | Schedule reminder jobs |
| Platform dispatcher | Write | `dispatchBookingHandoff()` |

#### Allowed Actions
- Query provider availability from GHL Calendar
- Create appointment in GHL Calendar
- Send booking confirmation SMS + email (templated)
- Send pre-appointment reminders at 48h, 24h, 2h (templated)
- Send intake form reminder if incomplete 24h before appointment
- Detect no-show (20 min post-appointment, no check-in)
- Send no-show recovery SMS: "We missed you. Reschedule: [link]" (templated)
- Send no-show follow-up email at +2h, +24h (templated)
- Track reschedule attempts (max 3 before escalation)
- Route completed intake forms to provider pre-consult briefing

#### Forbidden Actions
- Book appointments outside provider availability
- Override provider blocked time
- Book follow-up appointments without prior consultation record
- Send clinical information in booking communications
- Guarantee specific provider assignment
- Waive consultation fees
- Contact patients after 3 failed reschedule attempts (must escalate)

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| Override provider availability | `physician` or `admin_ops` | Manual |
| Appointment type upgrade (initial → follow-up without record) | `clinician` | Manual |
| 4th+ reschedule attempt | `admin_ops` | Manual |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| No available slots within 72h | Ops alert to add provider availability | `#ops-alerts` | 4h |
| 3 consecutive no-shows, same patient | Retention Agent + ops flag | `#ops-alerts` | 24h |
| Patient complaint during booking | Executive Briefing Agent | `#escalations` | 1h |
| Calendar API failure | Dead letter + ops alert | `#ops-alerts` + SMS | 15 min |
| Provider cancels appointment | Immediate patient notification + rebooking | Automated + `#ops-alerts` | 30 min |

#### Output Format
```json
{
  "action": "booking.created",
  "appointmentId": "uuid",
  "patientId": "uuid",
  "ghlContactId": "abc123",
  "ghlAppointmentId": "ghl_appt_456",
  "provider": "Dr. Smith",
  "appointmentTime": "2026-04-15T10:00:00-07:00",
  "consultationType": "initial",
  "intakeFormStatus": "pending",
  "remindersScheduled": ["2026-04-13T10:00:00Z", "2026-04-14T10:00:00Z", "2026-04-15T08:00:00Z"],
  "confirmationSent": { "sms": true, "email": true },
  "processingTimeMs": 2100,
  "timestamp": "2026-04-10T14:35:00Z"
}
```

#### Example Tasks
1. **HOT lead booking:** Lead Intake routes HOT lead. Booking Agent checks availability, finds 3 slots in next 48h, sends SMS with booking link. Patient books 10AM Tuesday. Confirmation SMS + email sent. Reminders scheduled at 48h, 24h, 2h.
2. **No-show recovery:** Calendar check at 10:20 AM shows no check-in. Agent marks no-show, sends SMS at 10:20 ("We missed you, reschedule: [link]"), email at 12:20 PM with provider note, final SMS at 10:20 AM next day. Patient rebooks.
3. **Intake form chase:** 24h before appointment, intake form status = incomplete. Agent sends SMS reminder with form link. 4h before appointment, still incomplete — creates ops task for manual phone outreach.

#### Failure Modes
| Failure | Detection | Recovery |
|---------|-----------|----------|
| Double-booking | Calendar conflict check post-creation | Cancel duplicate, notify patient, rebook immediately |
| SMS delivery failure | GHL delivery callback | Fallback to email. If email fails → ops task for phone call |
| Provider no-show | Patient reports or no encounter created 30 min post-time | Immediate apology SMS + priority rebooking + ops escalation |
| Calendar sync lag | Appointment not reflected in GHL within 5 min | Retry sync. If persistent → manual GHL entry task |

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Qualified-to-booked (48h) | > 60% | < 40% = review |
| Show rate | > 80% | < 70% = immediate review |
| Avg booking time (lead → appt) | < 4h | > 24h = alert |
| No-show recovery rate | > 30% | < 15% = review sequences |
| SMS delivery rate | > 97% | < 90% = alert |
| Reminder completion rate | 100% | Any missed reminder = alert |

---

### AGENT 03: Nova Patient Concierge Agent

**Slug:** `nova-patient-concierge`
**Version:** `1.0.0`
**Specializes from:** `content` agent (patient-facing scope only)

#### Mission
Be the always-available, brand-safe first responder for patient questions between clinical touchpoints. Provide immediate answers to FAQs, appointment logistics, intake guidance, and general process questions. Escalate anything clinical immediately.

#### Primary Business KPI
**First-response time:** Median time from patient message to agent response. Target: < 2 minutes during business hours, < 15 minutes after hours.

**Secondary KPIs:**
- Resolution rate without human handoff (target: > 70% for non-clinical questions)
- Patient satisfaction (post-interaction survey, target: > 4.5/5)
- Clinical escalation accuracy (target: > 95% true positives)

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `ghl.message_received` | Patient replies in GHL conversation | P0 |
| `booking.created` | Booking Agent | P1 (send welcome + what-to-expect) |
| `intake.incomplete` (24h) | Scheduler | P1 |
| `patient.question` | Patient portal chat | P0 |
| `appointment.approaching` (2h) | Scheduler | P2 |

#### Inputs Required
```
REQUIRED: patientId OR ghlContactId, messageContent OR triggerEvent
CONTEXT: appointmentStatus, intakeFormStatus, currentPipelineStage,
         serviceInterest, recentInteractions[]
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| GHL Conversations API | Read + Write | Read patient messages, send templated responses |
| GHL Contacts API | Read | Pull patient context |
| Supabase | Read | Patient status, appointment records, intake status |
| Knowledge base (Obsidian) | Read | FAQ content, process guides, approved messaging |
| Platform audit | Write | Log all interactions |

#### Allowed Actions
- Respond to non-clinical questions using approved templates and FAQ content
- Send appointment prep instructions (what to bring, how to prepare)
- Send intake form reminders with link
- Explain the Bloom Metabolics process (how consultations work, timeline expectations)
- Confirm appointment details (time, provider name, format)
- Provide general information about service categories (TRT, GLP-1, peptides) using only approved marketing language from `.agents/product-marketing-context.md`
- Acknowledge clinical questions and route to clinical staff

#### Forbidden Actions
- Answer clinical questions (symptoms, side effects, dosing, lab interpretation)
- Provide medical advice of any kind
- Discuss specific treatment plans or pricing for specific patients
- Share other patients' information or experiences
- Make claims about treatment outcomes
- Override or modify appointments (must route to Booking Agent)
- Access lab results, prescriptions, or clinical notes
- Send non-templated messages without Compliance Gatekeeper review

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| New response template creation | `admin_ops` + Compliance Gatekeeper | Manual |
| Response to message containing legal language | `admin_ops` | Manual |
| Patient requesting to speak to "a real person" | Immediate human handoff | Manual (instant) |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| Clinical question detected (symptoms, meds, side effects) | Clinical staff handoff | `#clinical-escalations` | 30 min |
| Patient mentions emergency/urgent symptoms | Immediate: "Call 911 or go to nearest ER" + staff alert | SMS to on-call + `#clinical-escalations` | 5 min |
| Complaint or dissatisfaction expressed | Executive Briefing Agent + ops | `#escalations` | 1h |
| Message in language other than English | Human handoff | `#ops-alerts` | 2h |
| 3+ unanswered messages (agent can't match intent) | Human handoff | `#ops-alerts` | 30 min |

#### Output Format
```json
{
  "action": "concierge.responded",
  "patientId": "uuid",
  "ghlContactId": "abc123",
  "inboundMessage": "When is my appointment?",
  "responseTemplate": "appointment_confirmation",
  "responseSent": "Your consultation with Dr. Smith is scheduled for Tuesday, April 15 at 10:00 AM PT. Reply RESCHEDULE if you need to change.",
  "channel": "sms",
  "escalated": false,
  "resolutionType": "auto_resolved",
  "processingTimeMs": 890,
  "timestamp": "2026-04-10T15:00:00Z"
}
```

#### Example Tasks
1. **FAQ response:** Patient texts "How long does the TRT process take?" Agent responds from approved FAQ: "Most patients complete their initial consultation, labs, and receive their first prescription within 2-3 weeks. Your care team will guide you through each step."
2. **Clinical deflection:** Patient texts "I'm feeling dizzy since starting my medication." Agent responds: "Thank you for letting us know. I'm connecting you with your care team right away — they'll follow up within 30 minutes." Creates clinical escalation with message context.
3. **Intake nudge:** 24h before appointment, intake form incomplete. Agent sends: "Quick reminder — please complete your health questionnaire before your consultation tomorrow. It helps your provider prepare: [link]. Takes about 5 minutes."

#### Failure Modes
| Failure | Detection | Recovery |
|---------|-----------|----------|
| Intent classification miss (clinical as non-clinical) | Post-interaction audit, patient complaint | Immediately escalate. Retrain classification. Add to blocked patterns. |
| Template response feels robotic | Patient satisfaction < 3/5 | A/B test warmer variants. Review template library. |
| GHL conversation API latency | Response time > 30s | Queue response, send within SLA, log latency |
| Knowledge base gap (no FAQ match) | Agent can't find answer in 3 attempts | Human handoff + flag topic for FAQ addition |

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| First-response time (business hours) | < 2 min | > 5 min = alert |
| Auto-resolution rate | > 70% | < 50% = review |
| Clinical escalation accuracy | > 95% | < 90% = immediate review |
| Patient satisfaction score | > 4.5/5 | < 4.0 = alert |
| Messages per resolution | < 3 | > 5 = review conversation flow |
| False negative rate (missed clinical) | < 1% | Any confirmed miss = P0 incident |

---

### AGENT 04: Nova Lab Ops Agent

**Slug:** `nova-lab-ops`
**Version:** `1.0.0`
**New build — no existing equivalent**

#### Mission
Manage the entire lab lifecycle: from physician-approved order through patient instructions, specimen collection tracking, result ingestion, abnormal value flagging, and physician review routing. No lab result reaches a patient without physician sign-off.

#### Primary Business KPI
**Lab turnaround time:** Median days from lab order approval to physician review of results. Target: < 5 business days.

**Secondary KPIs:**
- Patient lab completion rate (target: > 85% complete labs within 14 days of order)
- Abnormal value detection accuracy (target: 100% — zero missed critical values)
- Physician review SLA compliance (target: > 90% reviewed within 72h of result receipt)

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `lab.order_approved` | Approval gate (physician) | P0 |
| `lab.result_received` | Lab partner webhook or manual upload | P0 |
| `lab.overdue` | Scheduler (7 days post-order, no result) | P1 |
| `lab.reminder_due` | Scheduler (3 days post-order, no specimen) | P1 |
| `lab.physician_review_overdue` | Scheduler (48h post-result, no review) | P0 |

#### Inputs Required
```
FOR ORDER: patientId, physicianId, labPanelCodes[], patientZip, consentRecordId
FOR RESULT: patientId, labOrderId, resultData (structured), labPartner, collectionDate
FOR FLAGGING: resultData, referenceRanges, patientHistory (medications, prior labs)
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| Supabase (patients, labs) | Read + Write | Patient records, lab orders, lab results |
| Lab partner API (Quest/LabCorp) | Read + Write | Submit orders, receive results (Phase 2) |
| Platform approval gate | Read + Write | Create physician review gates, check status |
| Platform scheduler | Write | Schedule overdue checks, reminders |
| GHL SMS/Email API | Write (templated) | Patient lab instructions, reminders |
| MCP tools | Write | `flagPatientRisk()`, `createFollowUpTask()` |
| Platform audit | Write | Log every lab lifecycle event |

#### Allowed Actions
- Generate lab requisition with order codes + patient demographics
- Send patient lab instructions SMS/email (templated): nearest lab location, what to bring, fasting requirements
- Track specimen collection status (via lab partner API or manual update)
- Ingest lab results and store in Supabase (encrypted)
- Flag out-of-range values against reference ranges
- Classify results as NORMAL / ABNORMAL / CRITICAL based on predefined thresholds
- Create physician review approval gate with full clinical context
- Send patient notification AFTER physician review: "Your results have been reviewed. [Schedule follow-up link]"
- Send overdue reminders to patients (3 days, 7 days, 14 days post-order)
- Escalate overdue physician reviews

#### Forbidden Actions
- **Interpret lab results** — flag values only, never explain what they mean
- **Communicate results to patients** before physician review
- **Recommend treatment changes** based on lab values
- **Cancel or modify lab orders** without physician approval
- **Share lab data** outside the clinical team
- Access lab results for patients not in the agent's current workflow

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| Lab order authorization | `physician` | Manual (always) |
| Critical value patient notification | `physician` | Manual (always — physician must personally review critical results) |
| Lab order modification (add/remove panels) | `physician` | Manual |
| Override overdue escalation (extend timeline) | `clinician` or `physician` | Manual |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| CRITICAL lab values (predefined thresholds) | Physician SMS + dashboard P0 alert | SMS to physician + `#clinical-escalations` | 15 min physician acknowledgment |
| Abnormal (non-critical) values | Physician dashboard alert | `#clinical-escalations` | 72h review |
| No specimen collected after 7 days | Patient reminder + ops task | Automated SMS + `#ops-alerts` | 24h |
| No specimen after 14 days | Ops phone outreach task | `#ops-alerts` | 4h |
| Physician review overdue 48h | Re-ping physician | SMS to physician | 4h |
| Physician review overdue 72h | Medical director escalation | SMS to medical director + `#clinical-escalations` | 2h |
| Lab partner API failure | Manual order creation task | `#ops-alerts` | 1h |

#### Output Format
```json
{
  "action": "lab.result_processed",
  "labOrderId": "uuid",
  "patientId": "uuid",
  "labPartner": "quest_diagnostics",
  "panelsOrdered": ["comprehensive_metabolic", "testosterone_total_free", "lipid_panel"],
  "collectionDate": "2026-04-08",
  "resultClassification": "ABNORMAL",
  "flaggedValues": [
    {
      "marker": "testosterone_total",
      "value": 180,
      "unit": "ng/dL",
      "referenceRange": "300-1000",
      "flag": "LOW",
      "severity": "abnormal"
    }
  ],
  "normalValues": 14,
  "abnormalValues": 1,
  "criticalValues": 0,
  "physicianReviewGateId": "uuid",
  "physicianReviewStatus": "pending",
  "patientNotified": false,
  "processingTimeMs": 3200,
  "timestamp": "2026-04-10T16:00:00Z"
}
```

#### Example Tasks
1. **Lab order processing:** Physician approves TRT baseline panel. Agent generates requisition (total T, free T, SHBG, CBC, CMP, lipid, PSA), finds nearest Quest location to patient zip 90210, sends SMS with instructions + requisition link, schedules 3-day and 7-day follow-ups.
2. **Result ingestion — abnormal:** Quest webhook delivers results. Agent flags testosterone_total at 180 ng/dL (ref 300-1000). Classifies as ABNORMAL (not critical). Creates physician review gate with full lab summary + patient history. Physician gets dashboard notification.
3. **Critical value:** Lab returns PSA of 12.5 ng/mL (critical threshold: >10). Agent classifies CRITICAL, sends immediate SMS to physician, creates P0 dashboard alert. Does NOT notify patient. Physician reviews, decides on referral.

#### Failure Modes
| Failure | Detection | Recovery |
|---------|-----------|----------|
| Lab result data malformed | Zod validation failure on ingestion | Reject result, create manual review task, alert ops |
| Reference range missing for marker | Marker not in threshold config | Flag as "UNCLASSIFIED", route to physician with raw values |
| Lab partner API downtime | HTTP failures on order submission | Manual requisition PDF generation + patient instructions |
| Result received for unknown patient | No matching patientId/labOrderId | Quarantine result + ops alert for manual matching |

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Lab turnaround (order → physician review) | < 5 business days | > 7 days = alert |
| Patient lab completion rate (14 days) | > 85% | < 70% = review |
| Critical value physician ack time | < 15 min | > 30 min = P0 incident |
| Physician review within 72h | > 90% | < 80% = escalation review |
| Result ingestion success rate | > 99% | < 95% = alert |
| Overdue lab orders (>14 days) | < 5% | > 10% = process review |

---

### AGENT 05: Nova Prescription / Refill Coordination Agent

**Slug:** `nova-rx-refill`
**Version:** `1.0.0`
**New build — webhook event `refill_request` exists but no handler**

#### Mission
Coordinate the prescription lifecycle: initial Rx processing after physician approval, refill scheduling, protocol-based lab requirements before refills, patient confirmation, and lapsed refill recovery. Never approve — only coordinate.

#### Primary Business KPI
**Refill on-time rate:** % of refills processed within 3 days of due date. Target: > 90%.

**Secondary KPIs:**
- Initial Rx delivery time (physician approval → patient notification). Target: < 24h
- Refill lapse rate (patients who miss refill window). Target: < 10%
- Protocol compliance (labs before refills when required). Target: 100%

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `rx.approved` | Approval gate (physician) | P0 |
| `rx.refill_due` | Scheduler (7 days before refill date) | P1 |
| `rx.refill_confirmed` | Patient confirms via SMS/link | P0 |
| `rx.refill_lapsed` | Scheduler (refill date passed, no confirmation) | P0 |
| `lab.result_reviewed` | Lab Ops Agent (physician completed review) | P1 (check if refill was waiting on labs) |

#### Inputs Required
```
FOR INITIAL RX: patientId, physicianId, medication, dosage, frequency, quantity, refillCount, pharmacyInfo
FOR REFILL: patientId, prescriptionId, refillDate, labRequirement (boolean), lastLabDate
FOR CONFIRMATION: patientId, prescriptionId, confirmationMethod (sms_link|call|portal)
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| Supabase (medications, prescriptions) | Read + Write | Prescription records, refill schedules |
| Supabase (labs) | Read | Check last lab date for protocol compliance |
| Platform approval gate | Read + Write | Physician approval for refills, dose changes |
| Platform scheduler | Write | Schedule refill reminders, lapse checks |
| GHL SMS/Email API | Write (templated) | Refill reminders, Rx ready notifications |
| Pharmacy partner API | Write (Phase 2) | Submit prescriptions |
| Platform audit | Write | Log every Rx lifecycle event |

#### Allowed Actions
- Send Rx ready notification after physician approval (templated)
- Schedule refill reminders (7 days, 3 days, 1 day before due)
- Check protocol-mandated lab requirements before refill (e.g., TRT requires labs every 90 days)
- If labs required → trigger Lab Ops Agent before allowing refill
- Send refill confirmation request to patient via SMS
- Route confirmed refills to physician approval gate (standard refill approval)
- Track refill lapse and initiate recovery sequence (3 day, 7 day, 14 day)
- Escalate lapsed refills to Retention Agent after 14 days

#### Forbidden Actions
- **Approve prescriptions or refills** — physician approval required for every refill
- **Modify dosage, frequency, or medication** — must create new physician approval request
- **Skip protocol lab requirements** — if labs are mandated before refill, they cannot be bypassed
- **Advise patients on medication** — side effects, interactions, usage instructions come from clinical staff only
- **Process refills for patients with unresolved critical alerts**

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| Initial prescription authorization | `physician` | Manual (always) |
| Standard refill (no changes, labs current) | `physician` | Auto-approve after 4h IF physician has pre-authorized refill protocol for patient |
| Refill with dose change request | `physician` | Manual (always) |
| Refill when labs are overdue but patient requests urgently | `physician` | Manual (always) |
| Skip lab requirement exception | `physician` + `admin_ops` | Dual manual approval |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| Patient reports side effects during refill | Clinical staff immediate | `#clinical-escalations` | 30 min |
| 2+ missed refills | Retention Agent | Automated routing | 24h |
| Physician refill approval overdue 48h | Re-ping + medical director | SMS to physician, then director | 4h after re-ping |
| Dose change request from patient | Physician review required | `#clinical-escalations` | 24h |
| Pharmacy API failure | Manual Rx processing task | `#ops-alerts` | 2h |
| Patient requesting controlled substance refill early | Physician review + compliance flag | `#clinical-escalations` + `#compliance` | 1h |

#### Output Format
```json
{
  "action": "rx.refill_processed",
  "prescriptionId": "uuid",
  "patientId": "uuid",
  "medication": "Testosterone Cypionate",
  "dosage": "200mg/mL",
  "frequency": "weekly",
  "refillNumber": 3,
  "refillsRemaining": 9,
  "labsRequired": true,
  "labsCurrent": true,
  "lastLabDate": "2026-03-15",
  "physicianApprovalGateId": "uuid",
  "approvalStatus": "approved",
  "pharmacySubmitted": true,
  "patientNotified": true,
  "nextRefillDate": "2026-05-08",
  "processingTimeMs": 1800,
  "timestamp": "2026-04-10T16:30:00Z"
}
```

#### Example Tasks
1. **Initial Rx:** Physician approves TRT. Agent creates prescription record, submits to pharmacy (or generates Rx document), sends patient SMS: "Your prescription is being processed. Expected delivery: [date]." Schedules first refill reminder for day 23 of 30-day supply.
2. **Refill with labs:** 7 days before refill. Agent checks protocol: TRT requires labs every 90 days. Last labs: 85 days ago. Triggers Lab Ops Agent for new labs. Tells patient: "Your refill is coming up. We need updated labs first — your lab order is ready: [instructions]." Holds refill until labs complete + physician review.
3. **Lapsed refill:** Refill date passed 3 days ago. Agent sends: "We noticed you haven't confirmed your refill. Your health is important to us — confirm here: [link] or call us." Day 7: second reminder. Day 14: escalate to Retention Agent for personal outreach.

#### Failure Modes
| Failure | Detection | Recovery |
|---------|-----------|----------|
| Pharmacy API rejection | Error response from pharmacy | Flag reason, create ops task, notify patient of delay |
| Protocol lab check incorrect (false pass) | Post-hoc audit finds labs were actually overdue | Immediate physician alert, potentially halt medication |
| Refill reminder sent for discontinued medication | Prescription status not updated | Check status before every reminder. If stale → update + apologize to patient |
| Auto-approval fires when it shouldn't | Audit detects auto-approve without valid pre-auth | Disable auto-approve for patient, physician review of all recent refills |

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Refill on-time rate | > 90% | < 80% = review |
| Initial Rx processing time | < 24h | > 48h = alert |
| Refill lapse rate | < 10% | > 15% = process review |
| Protocol lab compliance | 100% | Any violation = P0 incident |
| Physician refill approval SLA (48h) | > 90% | < 80% = escalation review |
| Pharmacy submission success rate | > 99% | < 95% = alert |

---

### AGENT 06: Nova Retention Agent

**Slug:** `nova-retention`
**Version:** `1.0.0`
**New build**

#### Mission
Detect churn risk signals before cancellation happens. Intervene with personalized, reason-based retention offers. Maximize patient lifetime value while respecting patient autonomy — max 2 retention touchpoints before honoring cancellation.

#### Primary Business KPI
**Monthly churn rate:** Target: < 5%.

**Secondary KPIs:**
- Save rate (% of at-risk patients retained after intervention). Target: > 30%
- Time from risk signal to intervention. Target: < 24h
- Average patient lifetime (months). Target: > 8 months

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `retention.risk_detected` | Engagement scoring (scheduler, daily) | P1 |
| `billing.payment_failed` | Billing Agent | P0 |
| `rx.refill_lapsed` (14+ days) | Rx/Refill Agent | P1 |
| `cancellation.requested` | Patient via GHL form / portal | P0 |
| `nps.score_low` | Survey response (NPS < 7) | P1 |
| `booking.noshow` (3+ times) | Booking Agent | P1 |

#### Inputs Required
```
REQUIRED: patientId, ghlContactId, riskSignal
CONTEXT: membershipTier, monthsActive, totalRevenue, recentEngagement[],
         lastAppointment, lastMessage, paymentHistory, serviceType,
         cancellationReason (if applicable)
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| Supabase | Read | Patient engagement data, appointment history, membership tier |
| Stripe API | Read | Payment history, subscription status |
| GHL Contacts/Conversations API | Read + Write | Engagement signals, send retention outreach |
| GHL SMS/Email API | Write (templated) | Retention messages, pause offers |
| Platform audit | Write | Log all retention actions |

#### Allowed Actions
- Calculate churn risk score based on: login frequency, message response rate, appointment attendance, refill adherence, payment history
- Send retention outreach (max 2 touches before honoring cancellation)
- Offer membership pause (1-3 months) as alternative to cancellation
- Offer tier downgrade as alternative to cancellation
- Route reason-based interventions:
  - **Price** → pause or downgrade offer
  - **Results** → schedule provider check-in
  - **Experience** → escalate to Executive Briefing Agent
  - **Personal/life change** → pause offer
- Trigger cancellation survey
- Trigger Winback Agent after cancellation is processed

#### Forbidden Actions
- Offer clinical incentives (free labs, extra consults) without ops approval
- Make treatment outcome promises to retain
- More than 2 retention touchpoints — must honor cancellation after 2 attempts
- Modify billing or subscription directly (routes to Billing Agent)
- Access clinical data for retention purposes (engagement and billing data only)
- Guilt-trip, fear-monger, or use manipulative language

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| Retention discount > 20% | Brian (owner) | Manual |
| Free month offer | Brian (owner) | Manual |
| Custom retention package (non-standard) | `admin_ops` | Manual |
| Cancellation of high-value patient ($500+/mo) | Brian (owner) — notification only, cannot block | Manual notification |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| High-value cancellation ($500+/mo) | Brian notification | Slack DM + SMS | 1h |
| Clinical dissatisfaction as reason | Clinical lead | `#clinical-escalations` | 4h |
| Complaint / negative review threat | Executive Briefing Agent | `#escalations` | 1h |
| Retention intervention fails (patient cancels) | Trigger Winback Agent at +30 days | Automated | N/A |
| Churn rate > 7% in rolling 30 days | Executive Briefing Agent anomaly alert | `#ceo-briefing` | 24h |

#### Output Format
```json
{
  "action": "retention.intervention_sent",
  "patientId": "uuid",
  "riskScore": 78,
  "riskSignals": ["payment_failed", "no_login_30d", "refill_lapsed"],
  "interventionType": "pause_offer",
  "messageSent": "sms",
  "templateUsed": "retention_pause_offer_v2",
  "touchpointNumber": 1,
  "maxTouchpoints": 2,
  "outcome": "pending",
  "membershipTier": "trt_premium",
  "monthsActive": 5,
  "lifetimeRevenue": 2495,
  "timestamp": "2026-04-10T17:00:00Z"
}
```

#### Failure Modes
| Failure | Detection | Recovery |
|---------|-----------|----------|
| Retention offer sent to already-cancelled patient | Status check missed | Apologize, process as reactivation if interested |
| Churn scoring false positive (engaged patient flagged) | Patient contacts confused | Suppress further retention messaging, tune scoring |
| More than 2 touchpoints sent (guardrail failure) | Audit check finds >2 | Immediate investigation, apologize to patient, fix counter logic |

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Monthly churn rate | < 5% | > 7% = immediate review |
| Save rate | > 30% | < 20% = review messaging |
| Risk detection → intervention time | < 24h | > 48h = alert |
| Avg patient lifetime | > 8 months | < 6 months = strategic review |
| Touchpoint limit compliance | 100% (max 2) | Any violation = P0 |

---

### AGENT 07: Nova Winback Agent

**Slug:** `nova-winback`
**Version:** `1.0.0`
**New build**

#### Mission
Re-engage cancelled patients through a structured 30/60/90-day outreach sequence. Convert former patients back to active members with time-sensitive, personalized offers.

#### Primary Business KPI
**Reactivation rate:** % of cancelled patients who return within 120 days. Target: > 10%.

**Secondary KPIs:**
- Revenue recovered from reactivated patients ($/month)
- Average time to reactivation (target: < 60 days)
- Unsubscribe rate from winback sequences (target: < 5%)

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `winback.sequence_started` | Retention Agent (30 days post-cancellation) | P2 |
| `winback.day_60` | Scheduler | P2 |
| `winback.day_90` | Scheduler | P2 |
| `winback.patient_engaged` | Patient clicks/replies to winback message | P1 |

#### Inputs Required
```
REQUIRED: patientId, ghlContactId, cancellationDate, cancellationReason
CONTEXT: serviceType, monthsActive, lifetimeRevenue, cancellationSurveyResponses,
         lastTreatmentDate, marketingOptIn (boolean)
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| GHL Email/SMS API | Write (templated) | Winback sequence messages |
| GHL Tags API | Write | Tag contacts in winback sequence, tag reactivated |
| Supabase | Read | Patient history, cancellation data |
| Stripe API | Write | Create new subscription on reactivation (via checkout link) |
| Platform scheduler | Write | Schedule sequence steps |
| Platform audit | Write | Log all winback activity |

#### Allowed Actions
- Send Day 30 email: "We've made improvements" + feature updates
- Send Day 60 SMS: "Checking in — ready to restart?"
- Send Day 90 email: "Exclusive return offer expires in 7 days" + time-limited discount
- Track engagement (opens, clicks, replies) to personalize follow-ups
- Route engaged former patients to Booking Agent for consultation
- Create reactivation checkout link with offer code
- Exit patient from sequence immediately upon reactivation
- Move to cold list after 90-day sequence (quarterly touchpoints)

#### Forbidden Actions
- Contact patients who have opted out of marketing (must check `marketingOptIn`)
- Reference specific clinical information from their treatment history
- Make claims about treatment outcomes
- Send more than 6 total messages in the 90-day sequence
- Offer discounts > 25% without owner approval
- Contact patients who cancelled due to medical adverse event (different workflow)

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| Discount offer > 25% | Brian (owner) | Manual |
| Custom winback for high-value former patient | Brian (owner) | Manual |
| Winback for patient who cancelled due to complaint | `admin_ops` review first | Manual |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| Former patient replies with complaint | Executive Briefing Agent | `#escalations` | 1h |
| Reactivated patient (celebration) | Ops notification + Booking Agent | `#ops-alerts` (positive) | N/A |
| Former patient requests medical records | `admin_ops` | `#ops-alerts` | 24h |
| Unsubscribe rate > 5% | Pause sequence, review messaging | `#ops-alerts` | 48h |

#### Output Format
```json
{
  "action": "winback.message_sent",
  "patientId": "uuid",
  "sequenceDay": 30,
  "channel": "email",
  "templateUsed": "winback_day30_improvements_v1",
  "offerIncluded": false,
  "cancellationReason": "price",
  "monthsSinceCancellation": 1,
  "previousLifetimeRevenue": 1497,
  "engagementStatus": "sent",
  "messagesRemainingInSequence": 5,
  "timestamp": "2026-04-10T17:30:00Z"
}
```

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Reactivation rate (120 days) | > 10% | < 5% = review |
| Revenue recovered / month | Track | Month-over-month decline = review |
| Avg reactivation time | < 60 days | N/A (trend) |
| Unsubscribe rate | < 5% | > 5% = pause + review |
| Sequence completion rate | > 80% | < 60% = deliverability review |

---

### AGENT 08: Nova Billing Agent

**Slug:** `nova-billing`
**Version:** `1.0.0`
**Extends:** existing Stripe webhook integration

#### Mission
Process payments, recover failed payments through intelligent dunning, generate invoices, and route refund requests. Every financial action is audit-logged. No refund issued without human approval.

#### Primary Business KPI
**Net revenue retention:** Target: > 95% of expected recurring revenue collected each month.

**Secondary KPIs:**
- Failed payment recovery rate (target: > 40%)
- Average dunning recovery time (target: < 7 days)
- Refund rate (target: < 3% of revenue)
- Involuntary churn from payment failure (target: < 2%)

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `stripe.payment_intent.succeeded` | Stripe webhook | P1 (confirmation) |
| `stripe.invoice.payment_failed` | Stripe webhook | P0 |
| `stripe.customer.subscription.deleted` | Stripe webhook | P0 |
| `billing.reminder_due` | Scheduler (3 days before renewal) | P2 |
| `billing.refund_requested` | Patient or ops | P1 |
| `stripe.charge.dispute.created` | Stripe webhook | P0 |

#### Inputs Required
```
FOR DUNNING: patientId, stripeCustomerId, invoiceId, failureReason, attemptCount
FOR REFUND: patientId, stripeChargeId, amount, reason, requestedBy
FOR REMINDER: patientId, stripeSubscriptionId, nextBillingDate, paymentMethodStatus
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| Stripe API | Read + Write | Payment status, subscription management, invoice generation, payment method validation |
| Supabase | Read + Write | Billing records, dunning status tracking |
| GHL SMS/Email API | Write (templated) | Payment confirmations, dunning messages, receipts |
| Platform approval gate | Write | Refund approval requests |
| Platform audit | Write | Every financial action logged |

#### Allowed Actions
- Send payment confirmation SMS/email after successful charge
- Send pre-renewal reminder (3 days before)
- Check payment method validity (card expiry, past failures)
- Send payment method update request if at-risk
- Execute dunning sequence on payment failure:
  - Day 0: SMS "Payment didn't go through. Update: [link]"
  - Day 2: Email with details + urgency
  - Day 5: SMS "Last chance before membership pauses"
  - Day 7: Pause membership + pause notice
  - Day 14: Route to Retention Agent
  - Day 30: Cancel subscription + route to Winback Agent
- Generate monthly invoice PDFs
- Route refund requests to approval gate
- Process approved refunds via Stripe
- Immediately freeze account on chargeback + alert ops

#### Forbidden Actions
- **Issue refunds without approval** — all refunds require human sign-off
- **Modify subscription tiers** without patient consent
- **Waive charges** without owner approval
- **Access clinical data** for billing purposes
- **Share payment details** (last 4 digits only in any output)
- **Re-charge a disputed payment**
- **Process refunds > $500** without owner approval (even if staff-approved)

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| Refund ≤ $200 | `admin_ops` | Manual |
| Refund $201-$500 | Brian (owner) | Manual |
| Refund > $500 | Brian (owner) | Manual (flagged as high-value) |
| Subscription comp (free month) | Brian (owner) | Manual |
| Chargeback response | Brian (owner) + `admin_ops` | Manual |
| Write-off of uncollectible balance | Brian (owner) | Manual |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| Chargeback received | Immediate account freeze + ops alert | `#billing-alerts` + Brian SMS | 1h |
| 3+ consecutive payment failures | Ops review (possible card fraud or patient issue) | `#billing-alerts` | 4h |
| Refund request with complaint | Executive Briefing Agent | `#escalations` | 1h |
| Monthly refund volume > 3% revenue | Brian anomaly alert | `#ceo-briefing` | 24h |
| Stripe API outage | Queue all billing operations + ops alert | `#ops-alerts` + Brian SMS | 15 min |

#### Output Format
```json
{
  "action": "billing.dunning_step",
  "patientId": "uuid",
  "stripeCustomerId": "cus_xxx",
  "invoiceId": "in_xxx",
  "dunningDay": 0,
  "failureReason": "card_declined",
  "attemptCount": 1,
  "messageSent": "sms",
  "templateUsed": "dunning_day0_sms_v2",
  "nextDunningStep": "day_2_email",
  "subscriptionStatus": "active",
  "amountDue": 29900,
  "currency": "usd",
  "timestamp": "2026-04-10T18:00:00Z"
}
```

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Net revenue retention | > 95% | < 92% = immediate review |
| Failed payment recovery rate | > 40% | < 25% = review dunning |
| Avg dunning recovery time | < 7 days | > 14 days = review |
| Refund rate (% of revenue) | < 3% | > 5% = alert |
| Chargeback rate | < 0.5% | > 1% = P0 (Stripe threshold risk) |
| Involuntary churn (payment failure) | < 2% | > 3% = review |

---

### AGENT 09: Nova CRM Data Quality Agent

**Slug:** `nova-crm-hygiene`
**Version:** `1.0.0`
**New build**

#### Mission
Maintain data integrity across GHL and Supabase. Detect duplicates, flag missing fields, verify sync consistency, and ensure pipeline stages reflect actual patient status. Data quality is the foundation — bad data corrupts every downstream agent.

#### Primary Business KPI
**CRM accuracy rate:** % of contact records with complete required fields and correct pipeline stage. Target: > 95%.

**Secondary KPIs:**
- Duplicate rate (target: < 2% of total contacts)
- Sync drift incidents/month (GHL ↔ Supabase mismatch). Target: < 5
- Stale pipeline contacts (in same stage >30 days without activity). Target: < 10%

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `crm.nightly_audit` | Scheduler (daily 2AM) | P2 |
| `crm.contact_created` | Lead Intake Agent (duplicate check) | P1 |
| `crm.monthly_deep_audit` | Scheduler (1st of month) | P2 |
| `crm.sync_mismatch_detected` | Any agent detects inconsistency | P0 |

#### Inputs Required
```
FOR NIGHTLY AUDIT: full GHL contact export, Supabase patient records
FOR DUPLICATE CHECK: newContact (email, phone, name), existingContacts[]
FOR SYNC CHECK: ghlContactId, supabasePatientId, fieldsToCompare[]
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| GHL Contacts API | Read | Pull contact records for audit |
| GHL Pipeline API | Read | Check pipeline stage accuracy |
| Supabase | Read | Patient records for cross-reference |
| Platform audit | Write | Log hygiene actions |

#### Allowed Actions
- Run nightly duplicate detection (email + phone + fuzzy name match)
- Generate merge recommendations (never auto-merge)
- Flag contacts with missing required fields (email, phone, name, service interest)
- Detect pipeline stage drift (patient marked "Qualified" but no activity in 30 days)
- Compare GHL contact fields vs Supabase patient records for drift
- Generate weekly data quality report
- Tag contacts needing attention in GHL (`data-review-needed`)

#### Forbidden Actions
- **Auto-merge contacts** — recommendations only, human executes
- **Delete any records** — flag only
- **Modify clinical data** in Supabase
- **Access lab results, prescriptions, or clinical notes** — CRM fields only
- **Contact patients** about data issues

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| Contact merge execution | `admin_ops` | Manual (always) |
| Bulk field update (>50 records) | `admin_ops` | Manual |
| Pipeline stage bulk correction | `admin_ops` | Manual |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| Patient record mismatch across systems (possible HIPAA issue) | Ops + compliance immediate | `#compliance` + `#ops-alerts` | 1h |
| Duplicate rate > 5% | Process review (intake source problem) | `#ops-alerts` | 24h |
| Sync drift > 20 records | Integration health check | `#ops-alerts` | 4h |

#### Output Format
```json
{
  "action": "crm.hygiene_completed",
  "auditType": "nightly",
  "totalContactsAudited": 1250,
  "duplicatesFound": 8,
  "mergeRecommendations": [
    { "primary": "ghl_contact_1", "duplicate": "ghl_contact_2", "matchType": "email_exact", "confidence": 0.98 }
  ],
  "missingFields": { "phone": 23, "serviceInterest": 45, "source": 12 },
  "stalePipelineContacts": 15,
  "syncDriftRecords": 3,
  "dataQualityScore": 94.2,
  "timestamp": "2026-04-10T02:15:00Z"
}
```

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| CRM accuracy rate | > 95% | < 90% = alert |
| Duplicate rate | < 2% | > 5% = alert |
| Sync drift incidents / month | < 5 | > 10 = integration review |
| Stale pipeline contacts (30d) | < 10% | > 15% = pipeline process review |
| Nightly audit completion | 100% | Any missed = alert |

---

### AGENT 10: Nova Executive Briefing Agent

**Slug:** `nova-executive-briefing`
**Version:** `1.0.0`
**Consolidates:** `data` agent (reporting) + `bizop` agent (summarization)

#### Mission
Deliver actionable operational intelligence to Brian daily. Aggregate metrics, surface anomalies, summarize escalations, list pending approvals, and highlight strategic signals. Make it possible to run the business from a Slack channel.

#### Primary Business KPI
**Decision latency:** Time from anomaly detection to Brian's awareness. Target: < 1 hour for critical, < 24 hours for routine.

**Secondary KPIs:**
- Briefing delivery reliability (target: 100% on-time)
- Anomaly detection precision (target: > 80% true positives)
- Pending approval visibility (target: 100% surfaced within 4h of creation)

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `briefing.daily_scheduled` | Scheduler (daily 7AM) | P1 |
| `briefing.weekly_scheduled` | Scheduler (Monday 8AM) | P1 |
| `briefing.anomaly_detected` | Any agent via anomaly flag | P0 |
| `escalation.*` | Any agent escalation | P0 |
| `briefing.on_demand` | Brian via OpenClaw | P0 |

#### Inputs Required
```
FOR DAILY: Supabase metrics, Stripe revenue, GHL pipeline snapshot,
           pendingApprovals[], openEscalations[], agentHealthStatus[]
FOR ANOMALY: metricName, currentValue, expectedRange, deviationPercent, sourceAgent
FOR ON-DEMAND: natural language query from Brian
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| Supabase | Read | Patient metrics, task counts, alert counts |
| Stripe API | Read | Revenue, subscription counts, churn data |
| GHL Pipeline API | Read | Pipeline stage distribution |
| Platform approval gate | Read | Pending approvals |
| Platform audit | Read | Recent agent activity |
| Platform workflow engine | Read | Running/failed workflows |
| Slack API | Write | Post briefings, anomaly alerts |
| GHL Email API | Write | Backup briefing delivery |

#### Allowed Actions
- Query all systems for metrics (read-only)
- Calculate day-over-day, week-over-week comparisons
- Detect anomalies (>20% deviation from 7-day rolling average)
- Aggregate open escalations across all agents
- List pending approval gates with age and context
- Generate structured daily briefing
- Generate weekly strategic summary with trend analysis
- Post to `#ceo-briefing` Slack channel
- Send email backup of briefing
- Surface any agent in error/degraded state

#### Forbidden Actions
- **Take action** on any insight — report only, Brian decides
- **Modify any records** — strictly read-only across all systems
- **Access individual patient clinical data** — aggregate metrics only
- **Send briefings to anyone other than Brian** without explicit config
- **Suppress or filter anomalies** — surface everything, let Brian prioritize

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| None — this agent is read-only and reports-only | N/A | N/A |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| Revenue anomaly > 30% deviation | Brian SMS + Slack DM | Direct | 15 min |
| Agent system failure (any agent in error state) | Brian Slack DM + `#ops-alerts` | Direct | 15 min |
| 3+ unresolved escalations older than 24h | Slack DM with digest | Direct | 30 min |
| Briefing generation failure | Fallback: send raw metric dump | Email | 1h |

#### Output Format (Daily Briefing)
```
NOVA HEALTH — DAILY BRIEFING — 2026-04-10

REVENUE
  Yesterday: $4,230 | MTD: $38,700 | vs Target: +8%
  Active subscriptions: 142 (+3 net)
  MRR: $42,600

PIPELINE
  New leads: 18 | Qualified: 11 (61%) | Booked: 7 (39%)
  No-shows: 2 | Show rate: 78%

CLINICAL
  Pending lab reviews: 4
  Overdue refills: 2
  Active alerts: 3 (0 critical)

PENDING YOUR APPROVAL
  1. Refund $149 — John D. (reason: shipping delay) — 18h old
  2. Lab order — Sarah M. (TRT baseline panel) — 4h old

OPEN ESCALATIONS
  1. Payment failure x3 — Mike R. — Billing Agent dunning day 5
  2. Complaint — Lisa T. — forwarded to you via #escalations 6h ago

AGENT HEALTH
  All 11 agents operational. CRM hygiene score: 94.2%.

ANOMALIES
  ⚠ Lead volume down 28% vs 7-day avg (12 vs 16.7) — check ad spend
```

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Briefing delivery time | 7:00 AM ± 5 min | > 7:30 AM = alert |
| Briefing delivery rate | 100% | Any miss = alert |
| Anomaly detection precision | > 80% | < 60% = tune thresholds |
| Metric query latency | < 30s total | > 60s = performance review |
| Approval surfacing latency | < 4h from creation | > 8h = alert |

---

### AGENT 11: Nova Compliance Gatekeeper Agent

**Slug:** `nova-compliance-gatekeeper`
**Version:** `1.0.0`
**New build — critical for healthcare operations**

#### Mission
Enforce messaging compliance, consent verification, template approval, and audit trail integrity across all patient-facing communications. This agent blocks — it does not create. It is the last line of defense before any message reaches a patient.

#### Primary Business KPI
**Compliance incident rate:** Target: 0 incidents per quarter.

**Secondary KPIs:**
- Message block rate (% of outbound messages reviewed that are blocked). Track for tuning — too high means templates need work, too low means the gate might not be catching issues.
- Consent verification coverage (target: 100% of outbound messages check consent)
- Audit trail completeness (target: 100% of agent actions logged)

#### Trigger Events
| Event | Source | Priority |
|-------|--------|----------|
| `compliance.review_required` | Any agent sending non-standard message | P0 |
| `compliance.consent_check` | Pre-send hook on all patient outbound | P0 |
| `compliance.weekly_audit` | Scheduler (weekly Friday 6AM) | P2 |
| `compliance.template_submitted` | New template for approval | P1 |
| `compliance.consent_expiring` | Scheduler (consent expiry check, 30 days) | P1 |

#### Inputs Required
```
FOR MESSAGE REVIEW: messageContent, templateId (if applicable), channel (sms|email),
                    patientId, senderAgentSlug, messageCategory (marketing|transactional|clinical)
FOR CONSENT CHECK: patientId, channel, messageCategory
FOR TEMPLATE REVIEW: templateContent, category, targetAudience, claimsContained[]
FOR AUDIT: dateRange, entityType, agentSlug
```

#### Systems / Tools Accessed
| System | Access | Purpose |
|--------|--------|---------|
| GHL Contacts API | Read | Consent status, opt-in/opt-out records |
| Supabase | Read | Consent records, patient communication preferences |
| Platform audit | Read + Write | Audit trail verification, log compliance actions |
| Template registry (Supabase) | Read + Write | Approved template management |

#### Allowed Actions
- **Block** outbound messages that fail compliance checks
- Verify patient consent (opt-in) before any outbound message
- Check message content against blocked phrase list:
  - Clinical claims without hedging ("will cure", "guaranteed results")
  - Specific dosage information in non-clinical channels
  - Lab result details in SMS
  - Unsupported health claims
- Verify message uses approved template (or flag for review if free-text)
- Review and approve/reject new message templates
- Generate weekly compliance audit report
- Flag audit trail gaps (agent actions without corresponding audit entries)
- Track consent expiry and trigger renewal requests

#### Forbidden Actions
- **Modify message content** — block or pass, never edit
- **Override physician decisions**
- **Access clinical data** beyond consent/preference records
- **Send messages** — this agent only reviews, never sends
- **Auto-approve templates** — all new templates require human review
- **Disable itself or reduce review scope**

#### Human Approval Checkpoints
| Checkpoint | Approver | Policy |
|------------|----------|--------|
| New message template approval | `admin_ops` + compliance review | Manual (always) |
| Exception to blocked phrase (context-dependent) | `admin_ops` | Manual |
| Consent override (patient verbally consents, not yet in system) | `admin_ops` | Manual, with documentation requirement |

#### Escalation Rules
| Condition | Escalation | Channel | SLA |
|-----------|------------|---------|-----|
| Clinical language in marketing message | Block + ops alert | `#compliance` | Immediate block, 1h review |
| Patient without consent record receiving outbound | Block + ops alert | `#compliance` + `#ops-alerts` | Immediate block, 30 min |
| Audit trail gap detected | Ops + engineering | `#ops-alerts` | 4h |
| Template with unsupported health claims submitted | Reject + notify submitter | `#compliance` | 24h |
| Agent attempting to send non-templated clinical content | Block + P0 alert | `#compliance` + Brian SMS | 15 min |
| Consent expiry for active patient (no renewal in 30 days) | Ops task to re-consent | `#ops-alerts` | 72h |

#### Output Format
```json
{
  "action": "compliance.message_reviewed",
  "messageId": "uuid",
  "senderAgent": "nova-patient-concierge",
  "channel": "sms",
  "patientId": "uuid",
  "templateId": "appointment_reminder_v3",
  "decision": "passed",
  "checksPerformed": [
    { "check": "consent_verified", "result": "pass", "detail": "sms_opt_in: 2026-01-15" },
    { "check": "template_approved", "result": "pass", "detail": "template approved 2026-03-01" },
    { "check": "clinical_language_scan", "result": "pass", "detail": "no clinical claims detected" },
    { "check": "phi_minimization", "result": "pass", "detail": "no PHI in message body" }
  ],
  "blockedPhrases": [],
  "processingTimeMs": 120,
  "timestamp": "2026-04-10T18:30:00Z"
}
```

#### Failure Modes
| Failure | Detection | Recovery |
|---------|-----------|----------|
| False positive block (valid message blocked) | Agent reports block, ops reviews | Override via approval checkpoint, tune blocked phrase list |
| False negative (non-compliant message passes) | Weekly audit catches it | Immediate ops alert, review patient impact, tune scanner |
| Consent database stale | Consent check fails for patient who opted in | Cross-check GHL + Supabase, update stale record |
| Agent bypasses compliance check | Audit trail shows message sent without compliance event | P0 incident: identify how bypass occurred, add enforcement |

#### Monitoring Metrics
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Compliance incidents | 0 / quarter | 1 = P0 investigation |
| Messages reviewed / day | Track (all outbound) | Sudden drop = integration issue |
| Block rate | 1-5% (tuning indicator) | > 10% = template quality issue, < 0.5% = check effectiveness |
| Consent coverage | 100% | < 100% = immediate fix |
| Audit trail completeness | 100% | Any gap = 4h investigation |
| Weekly audit report delivery | 100% | Any miss = alert |

---

## 3. Agent-to-Agent Routing Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ROUTING TOPOLOGY                                  │
│                                                                          │
│  INBOUND EVENTS                                                          │
│  ─────────────                                                           │
│  form_submit ──────────► LEAD INTAKE ──┬──► BOOKING (HOT)               │
│  missed_call ──────────►              │                                  │
│  quiz_complete ─────────►              ├──► n8n nurture (WARM)           │
│  ad_lead ───────────────►              └──► n8n content drip (COLD)      │
│                                                                          │
│  BOOKING FLOW                                                            │
│  ────────────                                                            │
│  BOOKING ──── appt_booked ────► CONCIERGE (welcome + prep)              │
│          ├─── no_show ────────► BOOKING (recovery) ──► RETENTION (3x)   │
│          └─── intake_done ────► Provider (clinical handoff)              │
│                                                                          │
│  CLINICAL FLOW                                                           │
│  ─────────────                                                           │
│  Physician approves lab ──► LAB OPS ── results ──► Physician review     │
│                                      └─ overdue ─► LAB OPS (reminder)   │
│  Physician approves Rx ───► RX/REFILL ── refill_due ──► RX/REFILL      │
│                                        └─ labs_needed ─► LAB OPS        │
│                                        └─ lapsed 14d ──► RETENTION      │
│                                                                          │
│  RETENTION FLOW                                                          │
│  ──────────────                                                          │
│  risk_signal ──────────► RETENTION ──┬──► save (stay)                   │
│  cancel_request ────────►            └──► cancel ──► WINBACK (30d)      │
│  payment_failed ─────────► BILLING ──────► RETENTION (14d)              │
│                                      └───► WINBACK (30d)                │
│                                                                          │
│  CROSS-CUTTING                                                           │
│  ─────────────                                                           │
│  ALL AGENTS ──── outbound_message ──► COMPLIANCE GATEKEEPER (pre-send)  │
│  ALL AGENTS ──── escalation ────────► EXECUTIVE BRIEFING (routing)      │
│  ALL AGENTS ──── new_contact ───────► CRM HYGIENE (duplicate check)     │
│  SCHEDULER  ──── daily 7AM ─────────► EXECUTIVE BRIEFING                │
│  SCHEDULER  ──── daily 2AM ─────────► CRM HYGIENE                       │
│  SCHEDULER  ──── weekly Fri ────────► COMPLIANCE GATEKEEPER (audit)     │
└─────────────────────────────────────────────────────────────────────────┘
```

### Direct Agent-to-Agent Calls

| From Agent | To Agent | Trigger Condition | Data Passed |
|------------|----------|-------------------|-------------|
| Lead Intake | Booking | segment = HOT | leadId, ghlContactId, serviceInterest, score |
| Lead Intake | CRM Hygiene | duplicate detected | newContact, matchedContacts[] |
| Booking | Concierge | appointment booked | appointmentId, patientId, appointmentTime |
| Booking | Retention | 3+ no-shows | patientId, noShowCount, lastNoShowDate |
| Lab Ops | Rx/Refill | labs complete + physician reviewed | patientId, labOrderId, reviewOutcome |
| Rx/Refill | Lab Ops | refill requires labs | patientId, prescriptionId, requiredPanels[] |
| Rx/Refill | Retention | 14+ day refill lapse | patientId, prescriptionId, lapseDays |
| Retention | Winback | cancellation processed | patientId, cancellationDate, reason |
| Retention | Billing | pause/downgrade offer accepted | patientId, newTier, effectiveDate |
| Billing | Retention | dunning day 14 (no recovery) | patientId, invoiceId, amountDue |
| Billing | Winback | subscription cancelled (payment failure) | patientId, cancellationDate |
| Any agent | Compliance Gatekeeper | pre-send outbound message | messageContent, templateId, channel, patientId |
| Any agent | Executive Briefing | escalation event | escalationType, context, sourceAgent, severity |
| Any agent | CRM Hygiene | data inconsistency noticed | ghlContactId, field, expectedValue, actualValue |

---

## 4. Priority Hierarchy

### Agent Execution Priority (when resources are constrained)

| Priority | Agents | Rationale |
|----------|--------|-----------|
| **P0 — Critical** | Compliance Gatekeeper, Lab Ops (critical values) | Patient safety + legal compliance. These agents can block other agents and take precedence over all others. |
| **P1 — High** | Lead Intake, Booking, Billing, Rx/Refill | Revenue-generating and patient-experience-critical. These are the core business loop. |
| **P2 — Standard** | Patient Concierge, Retention, Lab Ops (routine) | Important for experience and retention but not immediately revenue-blocking. |
| **P3 — Background** | Winback, CRM Hygiene, Executive Briefing | Valuable but deferrable. Can run in off-peak hours without impacting operations. |

### Queue Priority Mapping (BullMQ)

```typescript
// Lower number = higher priority in BullMQ
const QUEUE_PRIORITIES = {
  'compliance-review':    1,   // P0
  'lab-critical':         1,   // P0
  'lead-intake':          2,   // P1
  'booking':              2,   // P1
  'billing-dunning':      2,   // P1
  'rx-refill':            3,   // P1
  'patient-concierge':    4,   // P2
  'retention':            4,   // P2
  'lab-routine':          5,   // P2
  'winback':              6,   // P3
  'crm-hygiene':          7,   // P3
  'executive-briefing':   8,   // P3
  'dead-letter':          10,  // Cleanup
};
```

### Preemption Rules

- Compliance Gatekeeper can **block** any agent's outbound message at any time
- Lab Ops critical value alert **preempts** all other notifications to a physician
- Billing chargeback **preempts** all retention/winback sequences for that patient
- Executive Briefing anomaly alert **preempts** scheduled briefing with immediate delivery

---

## 5. Conflict Resolution Policy

### Same-Patient Conflicts

When multiple agents attempt to act on the same patient simultaneously:

| Conflict Type | Resolution Rule |
|---------------|----------------|
| Two agents trying to send a message to same patient within 5 minutes | Later message queued with 30-min delay. Compliance Gatekeeper merges if appropriate. |
| Retention Agent and Winback Agent both targeting same patient | Retention takes priority (patient is still active). Winback only activates after cancellation is finalized. |
| Booking Agent sending reminder while Concierge is responding to patient | Booking reminder deferred 1h if Concierge has active conversation (last message < 30 min). |
| Billing dunning and Retention outreach on same day | Billing dunning takes priority (financial). Retention deferred 48h. |
| Lab Ops and Rx/Refill both need physician attention for same patient | Lab Ops takes priority (clinical data needed before Rx decision). Rx/Refill waits for lab completion. |

### Cross-System Conflicts

| Conflict Type | Resolution Rule |
|---------------|----------------|
| GHL and Supabase have different data for same patient | **CRM Hygiene Agent flags immediately.** Resolution: GHL wins for CRM fields (name, email, phone, pipeline stage). Supabase wins for clinical fields (labs, vitals, medications). |
| n8n workflow and Platform engine both try to process same event | **Idempotency key prevents double-processing.** Key format: `{agent}:{event}:{entityId}:{timestamp_hour}` |
| Two agents try to create approval gate for same workflow run + step | **First gate wins.** Second attempt returns existing gate ID. |

### Deadlock Prevention

- No agent can wait on another agent synchronously. All inter-agent communication is async via queues.
- Maximum queue depth per agent: 1000 jobs. Beyond that, new jobs are rejected with backpressure signal.
- Dead letter queue catches all failed jobs after max retries (3 attempts default).
- Every agent has a 60-second execution timeout per task. Exceeding this → fail + dead letter.

---

## 6. Memory / Context Policy

### What Agents Remember (Short-Term)

Each agent maintains **workflow-scoped context** only — the data needed to complete its current task. This context is stored in the `WorkflowRun.stepResults` JSON field and is discarded when the workflow completes.

```typescript
// Workflow run carries context between steps
interface WorkflowRun {
  triggerData: Record<string, JsonValue>;     // Initial input
  stepResults: Record<string, StepResult>;    // Accumulated context per step
  // Context is scoped to THIS run. Agent cannot access other runs.
}
```

### What Agents Do NOT Remember

- **No cross-patient context.** An agent processing Patient A cannot access context from its work on Patient B.
- **No cross-session memory.** Each trigger starts a fresh workflow run. No "last time I talked to this patient" memory.
- **No learning/adaptation.** Agents do not modify their behavior based on past performance. Tuning is done by humans updating config.

### Where History Lives

| Data | Storage | Access Pattern |
|------|---------|----------------|
| What an agent did | `audit_log` table | Query by entity_type + entity_id |
| What happened in a workflow | `workflow_runs` table (step_results JSON) | Query by workflow_slug or run_id |
| Patient interaction history | GHL Conversations + Supabase | Agent queries at start of task |
| Agent performance metrics | Supabase `agent_metrics` table (new) | Executive Briefing Agent reads for reports |

### Context Loading Rules

When an agent starts a task, it loads context from systems — it does not rely on memory:

```
1. Lead Intake Agent starts → queries GHL for existing contact (duplicate check)
2. Booking Agent starts → queries GHL Calendar for availability + Supabase for patient status
3. Concierge responds → queries GHL Conversations for recent messages + Supabase for appointment status
4. Lab Ops processes result → queries Supabase for patient history, medications, prior labs
5. Rx/Refill checks → queries Supabase for prescription records, lab dates, protocol requirements
```

### OpenClaw Context

OpenClaw (Claude Code) maintains conversational context within a session and persistent memory via the memory system at `~/.claude/projects/.../memory/`. This is the ONLY component with cross-session memory. Agents themselves are stateless per task.

---

## 7. Patient Data Minimization Policy

### Principle
Each agent receives the **minimum data required** to complete its specific function. No agent gets a "full patient record" by default.

### Data Access Matrix

| Agent | PII (name, email, phone) | Demographics (age, zip, state) | Clinical (labs, vitals, meds) | Financial (billing, payments) | Engagement (logins, messages) | Marketing (UTM, source) |
|-------|--------------------------|-------------------------------|-------------------------------|-------------------------------|-------------------------------|------------------------|
| Lead Intake | Full | Full | None | None | None | Full |
| Booking | Full | Timezone only | None | None | Appointment history only | None |
| Concierge | First name + preferred channel | None | None | None | Recent messages only | None |
| Lab Ops | Name + DOB (for requisition) | Zip (for lab location) | Full (scoped to current order) | None | None | None |
| Rx/Refill | Name + DOB + pharmacy | None | Medications + recent labs only | None | Refill history only | None |
| Retention | First name + preferred channel | None | None | Membership tier + payment status | Full | None |
| Winback | First name + preferred channel | None | None | Previous tier + LTV | Cancellation data only | Opt-in status only |
| Billing | Name (for invoices) | State (for tax) | None | Full | None | None |
| CRM Hygiene | Full (for dedup) | Full (for validation) | None | None | None | Full |
| Executive Briefing | None (aggregates only) | None | None | Aggregate revenue only | Aggregate metrics only | Aggregate only |
| Compliance Gatekeeper | patientId only (for consent lookup) | None | None | None | None | None |

### Enforcement

Data minimization is enforced at the MCP tool layer. Each agent's MCP tool calls are scoped:

```typescript
// Example: Concierge Agent's available MCP tools
const CONCIERGE_TOOLS = [
  'getPatientName',           // first name only
  'getAppointmentStatus',     // appointment data only
  'getConversationHistory',   // last 10 messages only
  'getIntakeFormStatus',      // boolean complete/incomplete
  // NOT available: getPatientLabs, getPatientVitals, getPatientMedications
];
```

### PHI Handling Rules

1. **SMS/Email:** Never include lab values, medication names, or diagnoses in message body. Use "Your results are ready" not "Your testosterone level is 180 ng/dL."
2. **Logs:** Audit logs store patientId references, not PHI directly. To reconstruct, query Supabase with proper auth.
3. **Queue payloads:** Job data includes IDs and minimal context. Never full patient records in BullMQ payloads.
4. **Error messages:** Sanitize PHI from error messages before logging. Never include patient data in stack traces.

---

## 8. Approval Matrix

### By Action Type

| Action | Staff (`admin_ops`) | Clinician (`clinician`) | Physician | Owner (Brian) |
|--------|:-------------------:|:----------------------:|:---------:|:-------------:|
| **Lead score override** | Approve | — | — | — |
| **Bulk lead import** | Approve | — | — | — |
| **Override provider availability** | — | — | Approve | — |
| **Lab order** | — | — | Approve | — |
| **Lab order modification** | — | — | Approve | — |
| **Critical lab value notification to patient** | — | — | Approve | — |
| **Prescription (new)** | — | — | Approve | — |
| **Prescription refill (standard)** | — | — | Approve (or pre-auth) | — |
| **Prescription refill (dose change)** | — | — | Approve | — |
| **Skip lab requirement for refill** | — | — | Approve | Also approve |
| **Refund ≤ $200** | Approve | — | — | — |
| **Refund $201–$500** | — | — | — | Approve |
| **Refund > $500** | — | — | — | Approve |
| **Subscription comp (free month)** | — | — | — | Approve |
| **Chargeback response** | Co-approve | — | — | Co-approve |
| **Retention discount > 20%** | — | — | — | Approve |
| **Winback discount > 25%** | — | — | — | Approve |
| **Contact merge** | Approve | — | — | — |
| **New message template** | Co-approve | — | — | — |
| **Blocked phrase exception** | Approve | — | — | — |
| **Consent override** | Approve (with docs) | — | — | — |
| **Patient discharge** | — | Co-approve | — | Co-approve |

### Approval SLAs

| Approver | Standard SLA | Critical SLA | Escalation if missed |
|----------|-------------|-------------|---------------------|
| `admin_ops` | 4h | 1h | Brian |
| `clinician` | 8h | 2h | Physician |
| `physician` | 24h | 15 min (critical labs) | Medical director |
| Brian (owner) | 24h | 1h | Self (re-ping) |

### Auto-Approval Rules

Only two scenarios allow auto-approval:

1. **Standard refill, physician pre-authorized:** If physician has explicitly marked a patient's refill protocol as "pre-authorized for auto-refill" AND labs are current AND no active alerts → auto-approve after 4h if physician hasn't manually reviewed.
2. **Partner referral source validation:** Auto-approve after 48h if no manual review.

All other approvals require human action. No auto-approval by timeout.

---

## 9. Agent Definition Schema (JSON)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "NovaAgentDefinition",
  "description": "Schema for registering a managed agent in the Bloom Metabolics platform",
  "type": "object",
  "required": ["slug", "name", "version", "mission", "status", "config"],
  "properties": {
    "slug": {
      "type": "string",
      "pattern": "^nova-[a-z0-9-]+$",
      "description": "Unique identifier. Must start with 'nova-'. Kebab-case."
    },
    "name": {
      "type": "string",
      "description": "Human-readable agent name"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Semantic version"
    },
    "mission": {
      "type": "string",
      "description": "One-sentence agent mission"
    },
    "status": {
      "type": "string",
      "enum": ["active", "paused", "archived", "error", "draining"],
      "description": "Current operational status"
    },
    "priority": {
      "type": "string",
      "enum": ["P0", "P1", "P2", "P3"],
      "description": "Execution priority tier"
    },
    "config": {
      "type": "object",
      "required": ["kpi", "triggers", "tools", "allowedActions", "forbiddenActions", "escalationRules", "approvalCheckpoints"],
      "properties": {
        "kpi": {
          "type": "object",
          "properties": {
            "primary": { "type": "string" },
            "target": { "type": "string" },
            "secondaryKpis": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "target": { "type": "string" }
                }
              }
            }
          }
        },
        "triggers": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["event", "source", "priority"],
            "properties": {
              "event": { "type": "string" },
              "source": { "type": "string" },
              "priority": { "type": "string", "enum": ["P0", "P1", "P2"] }
            }
          }
        },
        "tools": {
          "type": "object",
          "description": "Systems this agent can access",
          "properties": {
            "read": {
              "type": "array",
              "items": { "type": "string" },
              "description": "Systems with read access"
            },
            "write": {
              "type": "array",
              "items": { "type": "string" },
              "description": "Systems with write access"
            },
            "mcpTools": {
              "type": "array",
              "items": { "type": "string" },
              "description": "Allowed MCP tool names"
            }
          }
        },
        "allowedActions": {
          "type": "array",
          "items": { "type": "string" }
        },
        "forbiddenActions": {
          "type": "array",
          "items": { "type": "string" }
        },
        "escalationRules": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["condition", "target", "channel", "sla"],
            "properties": {
              "condition": { "type": "string" },
              "target": { "type": "string", "description": "Agent slug or role" },
              "channel": { "type": "string" },
              "sla": { "type": "string", "description": "e.g., '15m', '4h', '24h'" }
            }
          }
        },
        "approvalCheckpoints": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["action", "approver", "policy"],
            "properties": {
              "action": { "type": "string" },
              "approver": { "type": "string", "description": "Role from roles.ts" },
              "policy": {
                "type": "string",
                "enum": ["manual", "auto_after_delay"],
                "description": "Maps to ApprovalPolicy.type"
              },
              "autoApproveAfterMs": {
                "type": "number",
                "description": "Only for auto_after_delay policy"
              }
            }
          }
        },
        "dataAccess": {
          "type": "object",
          "description": "Patient data minimization scope",
          "properties": {
            "pii": { "type": "string", "enum": ["full", "partial", "none"] },
            "clinical": { "type": "string", "enum": ["full", "scoped", "none"] },
            "financial": { "type": "string", "enum": ["full", "aggregate", "none"] },
            "engagement": { "type": "string", "enum": ["full", "scoped", "none"] },
            "marketing": { "type": "string", "enum": ["full", "none"] }
          }
        },
        "monitoring": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["metric", "target", "alertThreshold"],
            "properties": {
              "metric": { "type": "string" },
              "target": { "type": "string" },
              "alertThreshold": { "type": "string" }
            }
          }
        },
        "maxConcurrentJobs": { "type": "number", "default": 10 },
        "timeoutMs": { "type": "number", "default": 60000 },
        "maxRetries": { "type": "number", "default": 3 },
        "queueName": { "type": "string" },
        "queuePriority": { "type": "number", "description": "BullMQ priority (lower = higher)" }
      }
    },
    "skillIds": {
      "type": "array",
      "items": { "type": "string" },
      "description": "OpenClaw skill IDs this agent can invoke"
    },
    "ghlConfig": {
      "type": "object",
      "properties": {
        "pipelineId": { "type": "string" },
        "stageId": { "type": "string" },
        "tags": { "type": "array", "items": { "type": "string" } }
      }
    },
    "rolePermissions": {
      "type": "string",
      "description": "Role from roles.ts whose permissions this agent inherits",
      "enum": ["super_admin", "physician", "clinician", "rn_ma", "admin_ops"]
    }
  }
}
```

### Example Registration Call

```typescript
import { registerAgent } from '../core/agent-registry';

await registerAgent({
  name: 'Nova Lead Intake Agent',
  slug: 'nova-lead-intake',
  description: 'Captures, normalizes, scores, and routes inbound leads within 60 seconds',
  version: '1.0.0',
  config: {
    kpi: {
      primary: 'speed_to_first_contact',
      target: '<90s HOT, <5m WARM, <1h COLD',
      secondaryKpis: [
        { name: 'score_accuracy', target: '80%+ of HOT leads convert to booked' },
        { name: 'source_attribution', target: '>95% with UTM data' },
      ],
    },
    triggers: [
      { event: 'lead_captured', source: 'landing_page', priority: 'P0' },
      { event: 'ghl.form_submitted', source: 'ghl_webhook', priority: 'P0' },
      { event: 'ghl.missed_call', source: 'ghl_webhook', priority: 'P0' },
    ],
    tools: {
      read: ['ghl_contacts', 'supabase_leads'],
      write: ['ghl_contacts', 'ghl_pipeline', 'supabase_leads', 'platform_audit'],
      mcpTools: ['getPatientSummary', 'logAgentAction', 'sendNotification'],
    },
    allowedActions: [
      'create_ghl_contact', 'score_lead', 'segment_lead', 'route_to_booking',
      'trigger_nurture_sequence', 'trigger_content_drip', 'flag_duplicate',
    ],
    forbiddenActions: [
      'send_clinical_content', 'make_eligibility_determination',
      'access_patient_records', 'modify_existing_patient_records',
    ],
    escalationRules: [
      { condition: 'score >= 90', target: 'admin_ops', channel: '#ops-alerts', sla: '5m' },
      { condition: 'duplicate_conflict', target: 'nova-crm-hygiene', channel: '#crm-hygiene', sla: '4h' },
      { condition: 'scoring_error', target: 'dead_letter', channel: '#ops-alerts', sla: '15m' },
    ],
    approvalCheckpoints: [
      { action: 'manual_rescore', approver: 'admin_ops', policy: 'manual' },
      { action: 'bulk_import_100+', approver: 'admin_ops', policy: 'manual' },
    ],
    dataAccess: { pii: 'full', clinical: 'none', financial: 'none', engagement: 'none', marketing: 'full' },
    monitoring: [
      { metric: 'leads_per_hour', target: 'varies', alertThreshold: '<1 in biz hours' },
      { metric: 'avg_processing_time', target: '<3s', alertThreshold: '>10s' },
      { metric: 'ghl_sync_rate', target: '>99%', alertThreshold: '<95%' },
      { metric: 'dead_letter_depth', target: '0', alertThreshold: '>5' },
    ],
    maxConcurrentJobs: 20,
    timeoutMs: 30000,
    maxRetries: 3,
    queueName: 'lead-intake',
    queuePriority: 2,
  },
  skillIds: ['lead-scoring', 'source-attribution'],
  ghlConfig: {
    pipelineId: 'm57zaE23IRPcQ3EflzDV',
    stageId: '62455dc4-7f7f-44ec-aa5e-024b244baf59',
    tags: ['nova-lead', 'auto-scored'],
  },
  rolePermissions: 'admin_ops',
});
```

---

## 10. Webhook Event Naming Convention

### Format
```
{domain}.{action}[.{qualifier}]
```

### Rules
1. **Domain** = business area (lowercase, singular): `lead`, `booking`, `lab`, `rx`, `retention`, `winback`, `billing`, `crm`, `compliance`, `briefing`, `agent`
2. **Action** = what happened (past tense or state): `captured`, `qualified`, `created`, `completed`, `failed`, `overdue`, `approved`, `blocked`
3. **Qualifier** = optional specificity: `abnormal`, `critical`, `hot`, `day_30`
4. Dot-separated, all lowercase, no spaces
5. Maximum 3 segments

### Full Event Catalog

```
# LEAD DOMAIN
lead.captured                    # New lead from any source
lead.qualified                   # Lead scored and segmented (exists as 'lead_qualified')
lead.qualified.hot               # HOT segment specifically
lead.duplicate_detected          # Duplicate contact found

# BOOKING DOMAIN
booking.created                  # Appointment booked
booking.confirmed                # Patient confirmed appointment
booking.rescheduled              # Appointment rescheduled
booking.cancelled                # Appointment cancelled
booking.reminder_sent            # Reminder SMS/email sent
booking.noshow                   # Patient no-showed
booking.noshow_recovered         # Patient rebooked after no-show

# LAB DOMAIN
lab.order_requested              # Agent requests lab order
lab.order_approved               # Physician approves lab order
lab.requisition_sent             # Patient receives lab instructions
lab.specimen_collected           # Lab confirms specimen received
lab.result_received              # Results received from lab partner (exists as 'lab_result_received')
lab.result_normal                # All values in range
lab.result_abnormal              # One or more out of range
lab.result_critical              # Critical values detected
lab.physician_reviewed           # Physician completed review
lab.overdue                      # No results after expected window
lab.patient_notified             # Patient informed results reviewed

# PRESCRIPTION DOMAIN
rx.order_requested               # Agent requests new Rx
rx.approved                      # Physician approves Rx
rx.submitted_to_pharmacy         # Sent to pharmacy partner
rx.ready                         # Pharmacy confirms ready/shipped
rx.refill_due                    # Refill reminder triggered
rx.refill_confirmed              # Patient confirms refill
rx.refill_approved               # Physician approves refill
rx.refill_lapsed                 # Patient missed refill window
rx.dose_change_requested         # Patient/provider requests change

# RETENTION DOMAIN
retention.risk_detected          # Churn risk score threshold crossed
retention.intervention_sent      # Retention outreach delivered
retention.save_successful        # Patient retained after intervention
retention.save_failed            # Patient proceeded with cancellation
retention.cancellation_processed # Cancellation finalized

# WINBACK DOMAIN
winback.sequence_started         # 30-day post-cancel sequence begins
winback.message_sent             # Sequence message delivered
winback.patient_engaged          # Former patient interacted
winback.reactivated              # Former patient resubscribed
winback.sequence_completed       # 90-day sequence finished
winback.opted_out                # Patient unsubscribed from winback

# BILLING DOMAIN
billing.payment_succeeded        # Payment collected
billing.payment_failed           # Payment failed
billing.dunning_started          # Dunning sequence initiated
billing.dunning_step             # Dunning message sent (day 0/2/5/7)
billing.recovered                # Failed payment successfully recovered
billing.membership_paused        # Membership paused (dunning day 7)
billing.subscription_cancelled   # Subscription cancelled (dunning day 30)
billing.refund_requested         # Refund request submitted
billing.refund_approved          # Refund approved by human
billing.refund_processed         # Refund issued via Stripe
billing.chargeback_received      # Dispute opened

# CRM DOMAIN
crm.contact_created              # New contact in GHL
crm.contact_updated              # Contact fields changed
crm.duplicate_detected           # Duplicate flagged
crm.merge_recommended            # Merge recommendation created
crm.sync_completed               # GHL ↔ Supabase sync run
crm.sync_drift_detected          # Data mismatch found
crm.hygiene_completed            # Nightly audit finished

# COMPLIANCE DOMAIN
compliance.message_passed        # Outbound message approved
compliance.message_blocked       # Outbound message blocked
compliance.template_submitted    # New template for review
compliance.template_approved     # Template approved
compliance.template_rejected     # Template rejected
compliance.consent_verified      # Patient consent confirmed
compliance.consent_expired       # Patient consent needs renewal
compliance.audit_completed       # Weekly audit finished

# BRIEFING DOMAIN
briefing.daily_generated         # Daily briefing compiled
briefing.weekly_generated        # Weekly briefing compiled
briefing.anomaly_detected        # Metric anomaly found
briefing.delivered               # Briefing sent to Brian

# AGENT DOMAIN
agent.started                    # Agent began processing task
agent.completed                  # Agent finished task successfully
agent.failed                     # Agent task failed
agent.escalated                  # Agent escalated to human/other agent
agent.timeout                    # Agent exceeded timeout
agent.status_changed             # Agent status updated (active/paused/error)

# WORKFLOW DOMAIN (existing)
workflow.started                 # Workflow run began
workflow.completed               # Workflow run finished (exists as 'workflow_completed')
workflow.failed                  # Workflow run failed
workflow.error                   # Workflow step error (exists as 'workflow_error')
workflow.step_completed          # Individual step finished
```

### Migration from Existing Events

| Current Event (underscore) | New Event (dot notation) | Backward Compatible |
|---------------------------|-------------------------|---------------------|
| `lead_qualified` | `lead.qualified` | Accept both, emit new |
| `clinical_intake_completed` | `booking.intake_completed` | Accept both, emit new |
| `content_generated` | `agent.completed` (with agentSlug=content) | Accept both |
| `ghl_contact_synced` | `crm.sync_completed` | Accept both, emit new |
| `ghl_opportunity_created` | `crm.contact_updated` | Accept both |
| `workflow_error` | `workflow.error` | Accept both, emit new |
| `workflow_completed` | `workflow.completed` | Accept both, emit new |
| `patient_outreach_sent` | `retention.intervention_sent` or `winback.message_sent` | Route by context |
| `refill_request` | `rx.refill_confirmed` | Accept both, emit new |
| `lab_result_received` | `lab.result_received` | Accept both, emit new |

---

## 11. n8n Workflow Naming Convention

### Format
```
nova_{domain}_{action}_{version}
```

### Rules
1. Prefix: always `nova_`
2. Domain: matches webhook event domain (lead, booking, lab, rx, retention, winback, billing, crm, compliance, briefing)
3. Action: descriptive verb phrase in snake_case
4. Version: `v1`, `v2`, etc.
5. Maximum 50 characters

### Workflow Catalog

```
# LEAD WORKFLOWS
nova_lead_intake_v1                  # Form/webhook → qualify → route
nova_lead_missed_call_textback_v1    # GHL missed call → SMS response
nova_lead_quiz_pipeline_v1           # Quiz completion → scoring → GHL

# BOOKING WORKFLOWS
nova_booking_confirmation_v1         # Appt booked → SMS + email confirm
nova_booking_reminder_sequence_v1    # 48h, 24h, 2h reminders
nova_booking_noshow_recovery_v1      # No-show → SMS → email → reschedule
nova_booking_intake_chase_v1         # Incomplete intake → reminders

# LAB WORKFLOWS
nova_lab_order_process_v1            # Physician approval → requisition → patient instructions
nova_lab_result_ingest_v1            # Lab partner webhook → store → flag → physician route
nova_lab_overdue_check_v1            # Scheduled: check for overdue labs
nova_lab_physician_review_v1         # Physician review gate → patient notification

# PRESCRIPTION WORKFLOWS
nova_rx_initial_process_v1           # Physician approval → pharmacy → patient notify
nova_rx_refill_reminder_v1           # 7d before refill → lab check → patient confirm
nova_rx_refill_process_v1            # Patient confirms → physician gate → pharmacy
nova_rx_lapse_recovery_v1            # Missed refill → 3d/7d/14d recovery → retention

# RETENTION WORKFLOWS
nova_retention_risk_scoring_v1       # Daily: calculate churn risk scores
nova_retention_intervention_v1       # Risk detected → reason-based outreach
nova_retention_cancellation_v1       # Cancel request → survey → process → winback trigger

# WINBACK WORKFLOWS
nova_winback_sequence_v1             # 30/60/90 day outreach sequence
nova_winback_reactivation_v1         # Engaged former patient → booking

# BILLING WORKFLOWS
nova_billing_pre_renewal_v1          # 3d before renewal → payment method check
nova_billing_dunning_v1              # Payment failed → day 0/2/5/7/14/30 sequence
nova_billing_refund_process_v1       # Refund approved → Stripe refund → confirm
nova_billing_chargeback_v1           # Dispute received → freeze → ops alert

# CRM WORKFLOWS
nova_crm_nightly_audit_v1            # 2AM: duplicate detection, field validation
nova_crm_ghl_sync_v1                 # GHL ↔ Supabase bidirectional sync
nova_crm_monthly_deep_audit_v1       # 1st of month: full data quality report

# COMPLIANCE WORKFLOWS
nova_compliance_message_review_v1    # Pre-send: consent + content check
nova_compliance_weekly_audit_v1      # Friday: audit trail review
nova_compliance_consent_renewal_v1   # 30d before consent expiry → re-consent

# BRIEFING WORKFLOWS
nova_briefing_daily_v1               # 7AM: compile + deliver daily briefing
nova_briefing_weekly_v1              # Monday 8AM: weekly strategic summary
nova_briefing_anomaly_alert_v1       # Real-time: metric deviation → Brian alert

# INTERNAL
nova_escalation_router_v1            # Centralized escalation routing
nova_dead_letter_processor_v1        # Process failed jobs from dead letter queue
```

---

## 12. Daily Monitoring Checklist

**Run by:** Executive Briefing Agent (automated) + ops staff (manual verification)
**Time:** 7:30 AM (after daily briefing delivery at 7:00 AM)

### Automated Checks (Executive Briefing Agent)

```
□ Daily briefing delivered successfully
□ All 11 agents in 'active' status
□ Dead letter queue depth = 0 (or items triaged)
□ No workflows in 'failed' state without resolution
□ All scheduled jobs ran (nightly CRM audit, reminders, etc.)
□ Pending approval gates < 24h old (escalation if older)
□ GHL API healthy (last successful call < 5 min ago)
□ Stripe API healthy (last webhook received < 1h ago)
□ Supabase connection healthy
□ Redis/BullMQ connection healthy
□ n8n instance responsive
```

### Manual Checks (Ops Staff)

```
□ Review daily briefing for anomalies flagged
□ Check #clinical-escalations for unresolved items
□ Check #ops-alerts for unresolved items
□ Review pending approval gates and action or delegate
□ Spot-check 2-3 recent lead intakes for quality
□ Verify no-show recovery messages sent for yesterday's no-shows
□ Confirm dunning sequences active for failed payments
□ Check Compliance Gatekeeper — any blocked messages to review?
□ Verify daily revenue matches Stripe dashboard (±5%)
□ Review new patient onboarding pipeline — any stuck contacts?
```

### Alert Response Protocol

| Alert Severity | Response Time | Who |
|---------------|--------------|-----|
| P0 (Critical — safety, compliance, revenue loss) | < 15 min | Brian + on-call |
| P1 (High — degraded service, patient impact) | < 1h | Ops staff |
| P2 (Standard — non-urgent operational) | < 4h | Ops staff |
| P3 (Background — informational) | Next business day | Ops staff |

---

## 13. Weekly Optimization Checklist

**Run by:** Brian + ops staff
**Time:** Monday 9:00 AM (after weekly briefing delivery at 8:00 AM)

### Performance Review

```
□ Review weekly briefing — revenue trend, pipeline health, churn
□ Lead Intake Agent: score distribution shift? Conversion rates changing?
□ Booking Agent: show rate trend (target >80%). Adjust reminder timing if declining.
□ Concierge Agent: resolution rate (target >70%). Review unresolved topics for FAQ gaps.
□ Lab Ops Agent: turnaround time trend. Physician review SLA compliance.
□ Rx/Refill Agent: on-time rate trend. Any protocol violations?
□ Retention Agent: save rate trend. Which intervention type performing best?
□ Winback Agent: reactivation rate. Which sequence step has highest engagement?
□ Billing Agent: recovery rate trend. Dunning sequence effectiveness by day.
□ CRM Hygiene: data quality score trend. Duplicate sources.
□ Compliance Gatekeeper: block rate — too high means templates need work.
□ Executive Briefing: anomaly precision — too many false positives?
```

### Optimization Actions

```
□ Update lead scoring weights if conversion data shows miscalibration
□ A/B test one message template (pick worst-performing agent sequence)
□ Review and resolve all merge recommendations from CRM Hygiene
□ Update Compliance Gatekeeper blocked phrase list if new edge cases found
□ Review escalation log — any patterns suggesting process gaps?
□ Check agent timeout/failure rates — any needing config tuning?
□ Verify GHL pipeline stages match actual patient journeys
□ Review queue depths over the week — any sustained backlogs?
□ Update agent KPI targets if baselines have shifted
□ Archive any workflows that haven't triggered in 30 days
```

### Monthly Deep Review (First Monday)

```
□ Full CRM deep audit results review
□ Compliance quarterly report preparation
□ Agent version review — any agents needing major updates?
□ Stack cost review — API usage, infrastructure costs
□ Patient journey end-to-end audit (pick 5 random patients, trace full lifecycle)
□ Approval matrix review — any roles/permissions needing adjustment?
□ Data retention review — any data older than retention policy?
□ Disaster recovery test — verify backups, test restore procedure
```

---

## Appendix A: Existing `lib/agents.ts` to New Registry Migration Map

| Old Agent (`lib/agents.ts`) | Disposition | New Agent(s) |
|-----------------------------|------------|--------------|
| `qualifier` | **Wrapped** — becomes scoring engine inside Lead Intake | `nova-lead-intake` |
| `clinical-intake` | **Split** — intake logic stays, booking logic extracted | `nova-booking` (booking), remains for clinical intake |
| `content` | **Specialized** — patient comms → Concierge, marketing stays as content | `nova-patient-concierge` (patient-facing) |
| `bizop` | **Retained** — operational tasks remain (contracts, meeting notes) | Stays as `bizop` |
| `outreach` | **Retained** — B2B outreach is separate from patient operations | Stays as `outreach` |
| `research` | **Retained** — deep research is separate function | Stays as `research` |
| `data` | **Consolidated** — reporting function → Executive Briefing. Monitoring stays. | `nova-executive-briefing` (reporting), `data` retained for integration monitoring |

### Dispatcher Queue Extension

```typescript
// Add to dispatcher.ts
type QueueName =
  // Existing
  | 'LEAD_INTAKE' | 'LEAD_QUALIFY' | 'OUTREACH_GENERATE' | 'BOOKING_HANDOFF' | 'DEAD_LETTER'
  // New
  | 'LAB_COORDINATION' | 'REFILL_PROCESSING' | 'RETENTION_OUTREACH'
  | 'WINBACK_SEQUENCE' | 'BILLING_RECOVERY' | 'CRM_HYGIENE'
  | 'EXECUTIVE_BRIEFING' | 'COMPLIANCE_REVIEW' | 'PATIENT_CONCIERGE';
```

### n8n Webhook Handler Extension

```typescript
// Add to n8n-webhook/route.ts webhookPayloadSchema
event: z.enum([
  // Existing (keep for backward compatibility)
  'lead_qualified', 'clinical_intake_completed', 'content_generated',
  'ghl_contact_synced', 'ghl_opportunity_created', 'agent_action',
  'workflow_error', 'workflow_completed', 'patient_outreach_sent',
  'refill_request', 'lab_result_received',
  // New (dot notation)
  'booking.created', 'booking.noshow', 'booking.rescheduled',
  'lab.order_approved', 'lab.result_abnormal', 'lab.result_critical',
  'rx.approved', 'rx.refill_due', 'rx.refill_confirmed', 'rx.refill_lapsed',
  'retention.risk_detected', 'retention.intervention_sent',
  'winback.sequence_started', 'winback.reactivated',
  'billing.payment_failed', 'billing.dunning_started', 'billing.recovered',
  'crm.duplicate_detected', 'crm.hygiene_completed',
  'compliance.message_blocked', 'compliance.review_required',
  'briefing.daily_generated', 'briefing.anomaly_detected',
])
```
