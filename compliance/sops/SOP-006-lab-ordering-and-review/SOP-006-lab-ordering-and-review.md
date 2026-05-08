---
sop_id: "SOP-006"
title: "Lab Ordering & Review"
version: "0.3"
status: "Draft"
effective_date: "TBD (pending approval)"
next_review_date: "12 months from effective date"
owner: "Hybrid — Dr. Michael Napolitano, MD (clinical content) + Brian DeGuzman, RN (operational content)"
approver: "Dual — Dr. Michael Napolitano, MD (clinical components) + Brian DeGuzman, RN (operational components)"
classification: "INTERNAL — CLINICAL AND OPERATIONAL USE"
---

# Lab Ordering & Review

**SOP ID:** SOP-006
**Version:** 0.3
**Status:** Draft
**Effective Date:** TBD (pending approval)
**Next Scheduled Review:** 12 months from effective date
**Document Owner:** Hybrid — Dr. Michael Napolitano, MD (clinical content) + Brian DeGuzman, RN (operational content)
**Approving Authority:** Dual — Dr. Michael Napolitano, MD (clinical components) + Brian DeGuzman, RN (operational components)
**Classification:** INTERNAL — CLINICAL AND OPERATIONAL USE

---

## Notice

### Standing Notice

This Standard Operating Procedure is the property of Bloom Metabolics and is intended exclusively for use by authorized Bloom Metabolics personnel and agents. This document does not constitute medical, legal, or regulatory advice and does not replace individualized clinical judgment by the covering physician. All clinical decisions remain the responsibility of the licensed prescribing clinician.

This SOP is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md). No section of this document may be modified, distributed, or implemented outside the workflow defined therein.

### Status Notice

> This document is in DRAFT status. It has not been reviewed, approved, or signed and is NOT operative. No clinical or operational decision shall be made on the basis of this document in its current state.

### Hybrid Ownership Notice

> This SOP is a **hybrid document** as defined in [SOP-001 section 2.3](../SOP-001-document-control/SOP-001-document-control.md). Clinical components — including lab panel selection, monitoring cadence, results interpretation thresholds, abnormal and critical value definitions, results review SLAs, and patient communication criteria for clinically significant results — are owned by the Covering Physician. Operational components — including LabCorp vendor management, OptiMantra integration, requisition delivery, patient routing to patient service centers, bundled pricing administration, cost tracking, manual fallback procedures, and intake staff workflows — are owned by Brian DeGuzman, RN (MSO Owner).
>
> **Dual signature is required for full approval.** The Covering Physician signs for clinical components; the MSO Owner signs for operational components. Neither signature alone renders the entire SOP operative.
>
> **Provisional operation:** Per [SOP-001 section 5.6](../SOP-001-document-control/SOP-001-document-control.md), if the MSO Owner has signed but the Covering Physician has not, operational sections may operate Provisionally with industry-standard clinical defaults (Endocrine Society guidelines for TRT panels, Obesity Medicine Association guidelines for GLP-1 panels) until the Covering Physician reviews and populates all `[CLINICAL — PENDING COVERING PHYSICIAN]` markers. No lab results may be communicated to patients and no clinical interpretation may occur until the Covering Physician's signature is obtained. If the Covering Physician has signed but the MSO Owner has not, clinical content is approved but operational workflows are not operative.

---

## 1. Purpose

This SOP establishes the operational workflow and clinical framework for laboratory ordering, results delivery, results review, abnormal results escalation, and patient communication across all Bloom Metabolics service lines.

Specifically, this SOP defines:

- The two lab pathways: **pre-visit labs** (gating the clinical visit per [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) and [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md)) and **post-visit monitoring labs** (ordered following the clinical visit and prescribing decision)
- The LabCorp vendor relationship, account structure, and electronic integration with OptiMantra
- Service-line-specific lab panels for baseline and monitoring draws
- Monitoring cadence by service line
- Bundled pricing administration — Bloom pays LabCorp directly; the patient pays a single service tier price that includes labs
- Results delivery workflow from LabCorp to OptiMantra (electronic integration with manual PDF fallback)
- Physician results review workflow with SLA-driven timelines for normal, abnormal, and critical results
- Patient communication protocols stratified by result severity
- Escalation pathways for critical values, unreachable patients, integration failures, and cost variances
- Interfaces with upstream and downstream SOPs: [SOP-003 (Clinical Eligibility Screening)](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md), [SOP-005 (Synchronous Telehealth Visit)](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md), and future Prescribing SOPs

This SOP does not govern clinical interpretation of lab results for the purpose of prescribing decisions. That interpretation occurs within the clinical visit (SOP-005) and within service-line-specific Prescribing SOPs. This SOP governs the logistics, routing, review, and communication of results — the operational infrastructure that supports clinical decision-making.

---

## 2. Scope

### 2.1 In Scope

- **Pre-visit lab ordering** for all active service lines: Testosterone Replacement Therapy (TRT), GLP-1/GIP Weight Management, Sexual Health (PT-141, tadalafil, sildenafil), and Longevity (NAD+, glutathione)
- **Post-visit monitoring lab ordering** triggered by [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) and future Prescribing SOPs
- **LabCorp as sole laboratory vendor** at launch — account management, credentialing, and ongoing relationship
- **Patient routing to LabCorp Patient Service Centers (PSCs)** within California
- **Results delivery to OptiMantra** via LabCorp electronic integration (HL7 interface) with manual PDF fallback
- **Physician results review** — SLA-driven timelines for acknowledgment, documentation, and action
- **Abnormal and critical result flagging** — classification criteria, escalation timelines, and documentation
- **Patient communication of results** — stratified by result severity and clinical significance
- **Bundled lab pricing administration** — LabCorp invoicing, per-service-line cost allocation, margin tracking
- **Cost tracking and variance monitoring** — Lab Cost Watch threshold management
- **Integration health monitoring** — OptiMantra-LabCorp interface uptime, fallback trigger criteria

### 2.2 Out of Scope

- **Multi-vendor laboratory arrangements** — at launch, LabCorp is the sole vendor; expansion to Quest Diagnostics or other vendors will require an SOP revision
- **At-home phlebotomy or mobile draw services** — not offered at launch; future consideration requires SOP amendment
- **Insurance billing for laboratory services** — Bloom is a cash-pay practice; labs are bundled into the service tier price and are not billed to insurance
- **Lab interpretation for prescribing decisions** — clinical interpretation that informs prescribing is governed by future Prescribing SOPs per service line; this SOP governs the logistics of getting results to the physician and communicating outcomes to the patient
- **Specialty or esoteric laboratory testing** — tests requiring reference laboratories beyond LabCorp's standard panels (e.g., genetic panels, advanced endocrine assays) are not covered and require ad hoc ordering outside this SOP
- **Peptide therapy-related labs** — deferred pending LegitScript certification and SP Bio Labs 503A licensure

---

## 3. Definitions

**Pre-Visit Labs**
Laboratory tests ordered prior to the initial clinical telehealth visit. Pre-visit labs serve as a gating requirement: the patient may not proceed to a clinical visit under [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) until the Covering Physician has received and reviewed baseline lab results. Pre-visit lab panels are service-line-specific and are defined in Attachment A.

**Post-Visit Labs**
Laboratory tests ordered after the initial clinical telehealth visit, typically as part of a treatment monitoring protocol. Post-visit labs track treatment response, safety markers, and dose-dependent parameters. Post-visit lab panels and cadences are defined in Attachment B.

**Monitoring Labs**
A general term encompassing all post-visit laboratory testing ordered on a recurring schedule to assess ongoing treatment safety and efficacy. Monitoring labs are a subset of post-visit labs. The monitoring cadence is service-line-specific and is defined in Attachment B.

**Baseline Labs**
The initial set of laboratory values obtained prior to or concurrent with the start of treatment. Baseline labs establish the patient's pre-treatment reference values against which monitoring labs are compared. Baseline labs may be pre-visit labs (if drawn before the first visit) or may include additional tests ordered during the first visit.

**LabCorp Patient Service Center (PSC)**
A LabCorp-operated facility where patients present for blood draws. Bloom Metabolics patients are routed to LabCorp PSCs within California. PSC locations are provided to the patient via the LabCorp online locator tool referenced in the requisition delivery workflow.

**Lab Requisition**
The order document — electronic or paper — that authorizes LabCorp to perform specified laboratory tests on a specific patient. Requisitions are generated in OptiMantra and transmitted to LabCorp electronically. A PDF copy is provided to the patient as backup.

**Standing Order**
A lab requisition that authorizes recurring draws at specified intervals without requiring a new order for each draw. Standing orders are used for monitoring labs with defined cadences. Standing orders have an expiration date set by the Covering Physician and must be renewed upon expiration.

**One-Time Order**
A lab requisition for a single draw event. Pre-visit labs and ad hoc orders are one-time orders.

**Results Delivery (Electronic)**
The transmission of laboratory results from LabCorp to OptiMantra via the HL7 electronic interface. Electronic delivery is the primary pathway. Results appear in the patient's OptiMantra chart automatically upon completion by LabCorp.

**Results Delivery (Manual / PDF Fallback)**
The manual process by which MSO Intake Staff downloads lab results from the LabCorp provider portal as a PDF and uploads them to the patient's OptiMantra chart. Manual delivery is used when the electronic interface is unavailable or when results fail to transmit electronically.

**Abnormal Result**
A laboratory value that falls outside the laboratory reference range but does not meet the criteria for a critical result. Abnormal results require physician review within the SLA defined in section 5.4 and may or may not require clinical action. The distinction between actionable and non-actionable abnormals is a clinical determination made by the Covering Physician.

**Critical Result**
A laboratory value that represents an immediate or near-immediate threat to patient health and requires urgent physician notification. Critical value thresholds are defined by LabCorp's Critical Value Protocol and supplemented by physician-defined thresholds in Attachment D. Critical results trigger the most aggressive notification SLA defined in section 5.4.

**Lab Review Cadence**
The frequency at which the Covering Physician reviews incoming lab results. The review cadence defines the maximum interval between result availability and physician review, stratified by result severity (normal, abnormal, critical).

**Bundled Lab Pricing**
The pricing model under which laboratory costs are included in the patient's service tier price. Bloom Metabolics pays LabCorp directly for all patient lab work. The patient does not receive a separate lab bill. Lab costs are a component of the service tier margin and are tracked per service line.

**Service Tier Inclusion**
The set of laboratory panels included in each service tier's bundled price. Service tier inclusion is defined per service line in Attachment F. Tests outside the included panels are either upgraded to a higher tier or billed as add-ons.

**Lab Cost Watch**
An operational monitoring threshold set at 15% above the budgeted per-patient lab cost for each service line. When actual lab costs exceed the Lab Cost Watch threshold for a service line in any billing period, the variance triggers the escalation defined in section 7.7.

---

## 4. Roles & Responsibilities

| Role | Primary Responsibilities Under This SOP |
| --- | --- |
| **Covering Physician (PC) — Clinical Content Owner & Clinical Approver** | Approves all clinical content in this SOP (lab panels, monitoring cadences, review SLAs, abnormal/critical thresholds, escalation criteria); reviews all lab results within SLA timelines; flags abnormal and critical results per Attachment D criteria; communicates clinically significant results directly to the patient when required by section 5.5; determines whether abnormal results are actionable or non-actionable; documents clinical reasoning for abnormal result actions in OptiMantra; sets standing order parameters and expiration dates; signs as Clinical Approver on this SOP |
| **MSO Owner (Brian DeGuzman, RN) — Operational Content Owner & Operational Approver** | Approves all operational content in this SOP (LabCorp relationship, integration, pricing, cost tracking, patient routing, fallback procedures); manages the LabCorp account, credentials, and contract; processes LabCorp invoices and reconciles costs per service line; manages OptiMantra-LabCorp integration health; triggers manual fallback when integration fails; tracks Lab Cost Watch thresholds and escalates variances; signs as Operational Approver on this SOP; does NOT interpret lab results or make clinical determinations |
| **MSO Intake Staff** | Generates and transmits lab requisitions in OptiMantra per physician orders; delivers requisition and pre-draw instructions to the patient; troubleshoots PSC access issues (locator, hours, walk-in availability); monitors results delivery and flags missing results; uploads manual PDF results when fallback is active; updates pipeline stages upon results availability; routes results to physician review queue; does NOT interpret lab results, communicate clinical significance, or make clinical determinations |
| **Patient** | Schedules and attends LabCorp PSC draw appointments within the instructed timeframe; brings printed or digital requisition and valid government-issued photo ID to the PSC; follows pre-draw instructions (fasting, medication hold, timing); notifies Bloom of draw completion or any issues at the PSC; reviews normal results via the patient portal when notified |

---

## 5. Procedure

### 5.1 Pre-Visit Lab Ordering

Pre-visit labs are the first laboratory event in the Bloom Metabolics patient lifecycle. They are triggered when a patient's pipeline stage in [SOP-003 (Clinical Eligibility Screening)](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) indicates that baseline labs are required before the patient may proceed to a clinical visit under [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md).

**Trigger:** The Covering Physician, during eligibility screening under SOP-003, determines that pre-visit labs are required for the patient's requested service line. The physician identifies the appropriate panel from Attachment A — Pre-Visit Lab Panels by Service Line.

`[CLINICAL — PENDING COVERING PHYSICIAN]` The specific pre-visit lab requirements per service line — including which panels are mandatory versus conditional, which prior external labs (if any) may be accepted in lieu of a new draw, recency requirements for accepted external labs, and any patient-specific modifications to the standard panel — are set by the Covering Physician and documented in Attachment A.

**Order generation:**

1. The Covering Physician selects the pre-visit lab panel in OptiMantra based on the patient's service line and any patient-specific considerations identified during eligibility screening.
2. OptiMantra generates a lab requisition and transmits it to LabCorp via the electronic interface.
3. MSO Intake Staff confirms successful transmission by verifying the order appears in the LabCorp provider portal within 1 business hour of submission.
4. MSO Intake Staff generates a PDF copy of the requisition from OptiMantra.

**Patient notification and routing:**

5. MSO Intake Staff sends the patient the following via secure message (OptiMantra patient portal) and email:
   - PDF copy of the lab requisition
   - Link to the LabCorp PSC locator (labcorp.com/labs-and-appointments)
   - Pre-draw instructions specific to the ordered panel (fasting requirements, medication hold instructions, timing guidance)
   - Instruction to bring printed or digital requisition and valid government-issued photo ID to the PSC
   - Deadline for completing the draw (set by the Covering Physician or defaulting to 14 calendar days from order date)
6. The patient's pipeline stage is updated to **"Pre-Visit Labs Ordered."**

**Draw and results:**

7. The patient schedules and completes the draw at a LabCorp PSC.
8. Upon draw completion, LabCorp processes the specimens and transmits results to OptiMantra via the electronic interface. Typical turnaround: 2 to 5 business days depending on the panel.
9. Upon results availability in OptiMantra, MSO Intake Staff updates the pipeline stage to **"Drawn"** and then to **"Available"** once results are confirmed in the patient's chart.
10. MSO Intake Staff routes the results to the physician review queue in OptiMantra.

**Physician review:**

11. The Covering Physician reviews the pre-visit lab results per the Results Review Workflow defined in section 5.4.
12. Upon completion of the physician's review, the pipeline stage is updated to **"Ready for Clinical Review (Labs Complete)."**
13. The patient is now eligible to proceed to visit scheduling under [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md), subject to any additional eligibility requirements under [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md).

**Pipeline stage summary for pre-visit labs:**

| Stage | Meaning | Owner |
| --- | --- | --- |
| Pre-Visit Labs Ordered | Requisition sent to LabCorp; patient notified | MSO Intake Staff |
| Drawn | Patient has completed the draw at PSC | MSO Intake Staff (confirmed by patient or LabCorp status) |
| Available | Results received in OptiMantra | MSO Intake Staff |
| Ready for Clinical Review (Labs Complete) | Physician has reviewed results; patient cleared to proceed | Covering Physician |

### 5.2 Post-Visit Lab Ordering

Post-visit monitoring labs are triggered by the clinical telehealth visit under [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) or by future service-line-specific Prescribing SOPs. When the Covering Physician initiates a treatment plan, the monitoring lab schedule is established at the same time.

**Trigger:** The Covering Physician, during or following the telehealth visit, determines the monitoring lab panel and cadence based on the treatment initiated. The physician identifies the appropriate panel and schedule from Attachment B — Post-Visit Monitoring Lab Panels and Cadences.

`[CLINICAL — PENDING COVERING PHYSICIAN]` The specific monitoring cadence per service line — including initial post-treatment draw timing, ongoing monitoring intervals, dose-adjustment re-check intervals, criteria for extending or shortening monitoring intervals, and criteria for discontinuing routine monitoring — is set by the Covering Physician and documented in Attachment B.

**Order generation:**

1. The Covering Physician selects the monitoring lab panel and order type (one-time or standing order) in OptiMantra.
2. For standing orders: the physician sets the order frequency, start date, and expiration date. Standing orders default to a 12-month expiration unless the physician specifies otherwise.
3. OptiMantra generates the requisition and transmits to LabCorp via the electronic interface.
4. MSO Intake Staff confirms successful transmission.

**Patient notification and routing:**

5. MSO Intake Staff sends the patient the requisition, PSC locator link, pre-draw instructions, and draw deadline per the same process defined in section 5.1 steps 5 and 6.
6. For standing orders, MSO Intake Staff sends a reminder notification to the patient 7 calendar days before each scheduled draw date.

**Draw, results, and review:**

7. The draw, results delivery, and physician review follow the same workflow as section 5.1 steps 7 through 12, with the following modification: post-visit monitoring results do not gate a visit — they feed back into the treatment monitoring cycle and may trigger a follow-up visit, dose adjustment, or treatment modification per the applicable Prescribing SOP.

**Standing order renewal:**

8. MSO Intake Staff monitors standing order expiration dates and alerts the Covering Physician 30 calendar days before expiration.
9. The Covering Physician reviews the patient's treatment status and either renews, modifies, or discontinues the standing order.

### 5.3 LabCorp Vendor Relationship

This section governs the operational management of Bloom Metabolics' relationship with LabCorp as the sole laboratory vendor at launch. All content in this section is operational and is fully owned by the MSO Owner.

**Account structure:**

- Bloom Metabolics maintains a single LabCorp client account under the Professional Corporation's name and NPI.
- The account is configured for direct billing to Bloom Metabolics (not patient billing, not insurance billing).
- Account credentials are held by the MSO Owner and stored in the practice's credential management system with access restricted to the MSO Owner and designated MSO Intake Staff.
- The LabCorp account representative is the primary vendor contact for account issues, pricing changes, and service disruptions.

**OptiMantra integration:**

- The OptiMantra-LabCorp electronic interface is configured during onboarding and uses LabCorp's standard HL7 integration pathway.
- Order transmission: OptiMantra sends lab orders to LabCorp electronically. Orders appear in LabCorp's system and are available at any PSC.
- Results delivery: LabCorp transmits completed results to OptiMantra electronically. Results populate the patient's chart automatically.
- The integration is bidirectional: orders flow out, results flow in. No manual intervention is required when the integration is healthy.

**Integration health monitoring:**

- MSO Intake Staff performs a weekly integration health check every Monday by verifying that at least one order transmitted and one result was received in the prior 7 days (or, if no orders were placed, by sending a test order to a designated test patient record and confirming round-trip delivery).
- Integration health check results are logged in a shared operational log (OptiMantra task or spreadsheet).
- Any failed health check triggers the manual fallback procedure defined in section 5.8.

**Vendor relationship management:**

- The MSO Owner reviews LabCorp invoices monthly against expected volume and per-test pricing.
- The MSO Owner conducts a quarterly vendor review covering: pricing accuracy, turnaround time trends, PSC availability in California service areas, integration uptime, and any patient-reported PSC issues.
- Contract renewal or renegotiation is managed by the MSO Owner with notice provided to the Covering Physician for awareness (vendor selection does not require clinical approval, but the Covering Physician is informed of any changes that affect panel availability or turnaround time).

### 5.4 Results Review Workflow

This section defines the SLA-driven timelines and workflow by which the Covering Physician reviews lab results. The detailed decision tree for results classification is provided in Attachment D — Results Review Decision Tree.

`[CLINICAL — PENDING COVERING PHYSICIAN]` The following SLAs are proposed based on industry-standard clinical practice and LabCorp's own Critical Value Protocol. The Covering Physician reviews and confirms or modifies these SLAs upon assignment. Until confirmed, these SLAs serve as Provisional defaults per the Hybrid Ownership Notice.

**Results classification:**

| Classification | Definition | Notification SLA | Acknowledgment SLA |
| --- | --- | --- | --- |
| **Critical** | Value meets LabCorp Critical Value Protocol thresholds or physician-defined critical thresholds in Attachment D | 1 hour from result availability | 4 hours from result availability |
| **Abnormal — Actionable** | Value outside reference range AND requires clinical action (dose change, follow-up order, patient communication, treatment hold) | 1 business day from result availability | 1 business day from result availability |
| **Abnormal — Non-Actionable** | Value outside reference range but clinically insignificant in context (e.g., mildly elevated value expected given treatment) | 1 business day from result availability | 3 business days from result availability |
| **Normal** | Value within reference range | 3 business days from result availability | 3 business days from result availability |

**Review workflow:**

1. Results arrive in OptiMantra via electronic delivery (or manual upload per section 5.8).
2. LabCorp flags critical values per its Critical Value Protocol and contacts the ordering provider directly by phone. MSO Intake Staff additionally monitors OptiMantra for incoming critical flags and immediately notifies the Covering Physician by phone and secure message if LabCorp's direct notification has not been confirmed.
3. For non-critical results, MSO Intake Staff routes results to the physician review queue in OptiMantra during the next business-day processing cycle.
4. The Covering Physician reviews all results in the queue, classifies each result per the table above, and documents the classification and any required action in the patient's OptiMantra chart.
5. For abnormal results requiring action, the Covering Physician documents the specific action taken (or planned) in the chart note, including clinical reasoning.
6. The Covering Physician marks the result as "Reviewed" in OptiMantra upon completion.

**SLA monitoring:**

- MSO Intake Staff monitors the physician review queue daily and flags any results that are approaching or have exceeded their SLA.
- Results that exceed the acknowledgment SLA by more than 24 hours are escalated to the MSO Owner, who contacts the Covering Physician directly.

### 5.5 Abnormal Results Communication

This section defines how lab results are communicated to patients, stratified by the result classification established in section 5.4. The communication templates are provided in Attachment E — Patient Results Communication Templates.

**Communication matrix:**

| Result Classification | Communication Channel | Communicator | Timing |
| --- | --- | --- | --- |
| **Normal** | Patient portal notification (OptiMantra) | MSO Intake Staff (using approved template) | Within 3 business days of physician review |
| **Abnormal — Non-Actionable** | Patient portal notification with brief clinical context | MSO Intake Staff (using physician-approved template that includes context language drafted by the Covering Physician) | Within 3 business days of physician review |
| **Abnormal — Actionable** | Direct physician communication (secure message, phone, or video follow-up at physician's discretion) | Covering Physician | Within 1 business day of physician review |
| **Critical** | Physician phone call to patient | Covering Physician | Within 1 business day of physician acknowledgment; best effort within same day |

**Boundary rule:** MSO Intake Staff and MSO Owner never communicate the clinical significance of abnormal or critical results to the patient. MSO staff may inform the patient that results are available and that the physician will be in contact, but may not characterize results as "good," "bad," "concerning," or any other qualitative term. All clinical communication of abnormal and critical results is performed by the Covering Physician.

**Documentation:** All patient communications regarding lab results — regardless of channel — are documented in the patient's OptiMantra chart with the date, time, channel, communicator, and content summary.

### 5.6 Bundled Lab Pricing

This section governs the financial administration of laboratory costs under Bloom Metabolics' bundled pricing model. All content in this section is operational and is fully owned by the MSO Owner.

**Pricing model:**

- Bloom Metabolics operates a bundled pricing model in which laboratory costs are included in the patient's service tier price. The patient pays a single price for the service tier; there is no separate lab bill.
- Bloom Metabolics pays LabCorp directly for all laboratory services under the negotiated client pricing schedule.
- Lab costs are a component of the service tier margin and must be tracked to ensure pricing sustainability.

**LabCorp billing:**

- LabCorp bills Bloom Metabolics monthly via consolidated invoice.
- The MSO Owner reconciles the LabCorp invoice against OptiMantra order records within 10 business days of invoice receipt.
- Discrepancies (tests billed but not ordered, incorrect pricing, duplicate charges) are disputed with LabCorp within 15 business days of invoice receipt.

**Per-service-line cost allocation:**

- Lab costs are allocated to service lines based on the ordering panel. Each order in OptiMantra is tagged with the patient's service line.
- The MSO Owner maintains a monthly cost-per-patient-per-service-line metric.
- Service-line cost allocation informs pricing reviews and margin analysis conducted by the MSO Owner.

**Service tier inclusion:** The specific panels included in each service tier's bundled price are documented in Attachment F — Bundled Lab Pricing Schedule. Tests ordered outside the included panels (physician-ordered add-ons for clinical reasons) are tracked separately and absorbed by Bloom unless the volume warrants a tier adjustment.

**Lab Cost Watch threshold:**

- The Lab Cost Watch threshold is set at **15% above the budgeted per-patient lab cost** for each service line.
- The MSO Owner calculates actual versus budgeted lab cost per patient per service line monthly.
- If actual costs exceed the Lab Cost Watch threshold for any service line in any billing period, the variance triggers the escalation defined in section 7.7.

### 5.7 Patient Routing to PSCs

This section governs the operational workflow for routing patients to LabCorp Patient Service Centers for blood draws. All content in this section is operational and is fully owned by the MSO Owner.

**Requisition delivery:**

- MSO Intake Staff delivers the lab requisition to the patient via two channels: (a) secure message through the OptiMantra patient portal, and (b) email to the patient's verified email address on file.
- The requisition delivery includes: the requisition PDF, a link to the LabCorp PSC locator (labcorp.com/labs-and-appointments), service-line-specific pre-draw instructions, and the draw deadline.

**PSC locator guidance:**

- Patients are instructed to use the LabCorp online locator to find the nearest PSC to their location within California.
- MSO Intake Staff does not select the PSC for the patient. The patient chooses the most convenient location.
- If a patient reports difficulty finding a nearby PSC, MSO Intake Staff assists by searching the LabCorp locator on the patient's behalf and providing the three nearest options with addresses, hours, and walk-in versus appointment availability.

**Pre-draw instructions:**

- Pre-draw instructions are standardized per panel type and included with every requisition delivery. Standard instructions cover:
  - Fasting requirements (duration, permitted water intake, medication exceptions)
  - Timing requirements (e.g., morning draw for testosterone, timing relative to injection schedule)
  - Medication hold instructions if applicable
  - Hydration guidance
  - What to bring to the PSC (requisition, government-issued photo ID)
- Pre-draw instruction templates are maintained by MSO Intake Staff and reviewed by the Covering Physician annually or upon panel changes.

**California coverage:**

- At launch, Bloom Metabolics serves California residents only. LabCorp maintains PSC coverage across all major California metropolitan areas and most suburban and rural areas.
- If a patient resides in an area without a LabCorp PSC within 30 miles, MSO Intake Staff escalates to the MSO Owner for case-by-case resolution (options may include mobile phlebotomy referral outside this SOP or alternative specimen collection arrangements negotiated with LabCorp).

### 5.8 Integration Failure and Manual Fallback

This section governs the procedure when the OptiMantra-LabCorp electronic interface fails. All content in this section is operational and is fully owned by the MSO Owner.

**Failure detection:**

- Integration failure is detected by any of the following: (a) the weekly health check defined in section 5.3 fails, (b) an order submitted in OptiMantra does not appear in the LabCorp provider portal within 4 business hours, (c) results expected based on LabCorp turnaround times do not appear in OptiMantra within 2 business days of the expected date, or (d) LabCorp or OptiMantra notifies Bloom of a system outage.

**Manual fallback — order transmission:**

1. MSO Intake Staff generates the lab requisition PDF from OptiMantra.
2. MSO Intake Staff manually enters the order in the LabCorp provider portal using the patient's demographics and the ordered panel.
3. MSO Intake Staff delivers the requisition PDF to the patient per section 5.7.
4. MSO Intake Staff logs the manual order in the operational log with the date, patient identifier, panel, and reason for fallback.

**Manual fallback — results retrieval:**

1. MSO Intake Staff checks the LabCorp provider portal daily for completed results.
2. Upon result availability, MSO Intake Staff downloads the results PDF from the LabCorp portal.
3. MSO Intake Staff uploads the PDF to the patient's OptiMantra chart and tags it with the order reference, date, and "Manual Upload" flag.
4. MSO Intake Staff routes the result to the physician review queue per the standard workflow in section 5.4.

**Sustained fallback trigger:**

- If the manual fallback is required for more than 14 consecutive calendar days, the MSO Owner initiates a formal review with OptiMantra and LabCorp support teams.
- If the integration cannot be restored within 30 calendar days, the MSO Owner initiates an SOP revision to formalize the manual workflow as the primary pathway and evaluates alternative integration solutions or laboratory vendors.

**Return to electronic workflow:**

- When the integration is restored, MSO Intake Staff verifies the restoration before resuming electronic operations using one of the following methods:
  - **Method A (preferred):** The next live patient lab order serves as the verification. MSO Intake Staff confirms the order transmits successfully to LabCorp's provider portal within 1 business hour and that results return to OptiMantra electronically when LabCorp completes processing. If the live order succeeds, the integration is considered verified.
  - **Method B (fallback):** If no live patient lab order is pending and verification cannot wait for the next live order, the MSO Owner contacts the OptiMantra and LabCorp support teams to request a vendor-side test transmission confirming the integration is operational. This avoids creating a fake patient record while still verifying restoration.
- Until the integration is verified by Method A or Method B, MSO Intake Staff continues manual fallback for any pending orders to avoid duplicate or lost transmissions.
- All orders and results processed during the fallback period are reconciled against both OptiMantra and LabCorp records to ensure no results were lost.

### 5.9 Handoff to Downstream SOPs

Lab results generated under this SOP feed into multiple downstream clinical workflows. This section defines the handoff points.

**Handoff to SOP-003 (Clinical Eligibility Screening):**

- Pre-visit lab results reviewed under section 5.1 are a gating input to the eligibility determination under [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md). When the Covering Physician completes the pre-visit lab review and updates the pipeline to "Ready for Clinical Review (Labs Complete)," SOP-003's eligibility determination may proceed or the patient advances to visit scheduling under [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) depending on when in the workflow labs were ordered.

**Handoff to SOP-005 (Synchronous Telehealth Visit):**

- The Covering Physician accesses the patient's lab results directly in OptiMantra during the telehealth visit. The results, as reviewed under this SOP, form part of the clinical picture evaluated during the Good Faith Examination.
- If the Covering Physician identifies during the visit that additional labs are needed (not covered by the pre-visit panel), those labs are ordered under the post-visit pathway defined in section 5.2 of this SOP.

**Handoff to future Prescribing SOPs:**

- Monitoring lab results reviewed under section 5.2 feed into prescribing decisions governed by future service-line-specific Prescribing SOPs.
- When a monitoring result triggers a dose adjustment, treatment hold, or treatment discontinuation, the Covering Physician documents the decision in OptiMantra and follows the applicable Prescribing SOP.
- This SOP is responsible for getting the result to the physician and ensuring the patient is informed; the Prescribing SOP governs what happens next clinically.

---

## 6. Documentation Requirements

All lab-related events generate documentation. The following table defines the required documentation for each event.

| Event | Documentation Required | Location |
| --- | --- | --- |
| Pre-visit lab order placed | Order record with panel, date, patient ID, service line, ordering physician | OptiMantra (lab order module) |
| Post-visit / monitoring lab order placed | Order record with panel, date, patient ID, service line, ordering physician, order type (one-time/standing), standing order expiration if applicable | OptiMantra (lab order module) |
| Requisition delivered to patient | Date, delivery channel(s), patient confirmation of receipt if available | OptiMantra (patient communication log) |
| Draw completed | Draw date, PSC location (if reported), confirmation source (patient report or LabCorp status) | OptiMantra (lab order status) |
| Results received — electronic | Date/time results populated in chart, panel, result values, LabCorp reference ranges, LabCorp flags | OptiMantra (lab results module — auto-populated) |
| Results received — manual upload | Date/time of upload, staff member performing upload, source (LabCorp portal PDF), "Manual Upload" flag | OptiMantra (document upload with metadata tag) |
| Physician review completed | Date/time of review, result classification (normal/abnormal non-actionable/abnormal actionable/critical), clinical action taken or planned, physician name | OptiMantra (chart note linked to lab result) |
| Patient communication — normal | Date, channel, template used, staff member | OptiMantra (patient communication log) |
| Patient communication — abnormal or critical | Date, channel, communicator (physician), content summary, patient response/acknowledgment | OptiMantra (chart note) |
| LabCorp invoice reconciled | Invoice date, amount, discrepancies identified, resolution status | Operational financial records (accounting system / spreadsheet) |
| Lab Cost Watch variance triggered | Service line, billing period, budgeted cost, actual cost, variance percentage, escalation actions | Operational financial records; MSO Owner incident log |
| Integration failure detected | Date/time, detection method, nature of failure, fallback initiated | Operational log (OptiMantra task or shared log) |
| Standing order renewal / discontinuation | Date, physician decision, rationale if discontinued, new expiration date if renewed | OptiMantra (lab order module) |

---

## 7. Escalation

### 7.1 Critical Result Notification

**Trigger:** LabCorp reports a critical value per its Critical Value Protocol, or the Covering Physician identifies a critical value during results review per Attachment D criteria.

**Escalation pathway:**

1. LabCorp contacts the ordering provider (Covering Physician) directly by phone per LabCorp's Critical Value Protocol.
2. MSO Intake Staff, upon detecting a critical flag in OptiMantra, immediately contacts the Covering Physician by phone and secure message if LabCorp's direct notification has not been confirmed within 30 minutes of result availability.
3. The Covering Physician acknowledges the critical result within the 4-hour SLA defined in section 5.4.
4. The Covering Physician contacts the patient by phone within 1 business day of acknowledgment (best effort same day) per section 5.5.
5. The Covering Physician documents the critical result, notification, patient contact, and clinical action in the patient's OptiMantra chart.

### 7.2 Unable to Reach Patient with Critical Result

**Trigger:** The Covering Physician is unable to reach the patient by phone within 1 business day of acknowledging a critical result.

**Escalation pathway:**

1. The Covering Physician makes a minimum of three phone call attempts across the first business day, documented in the chart with date, time, and outcome of each attempt.
2. If the patient is unreachable after three attempts, MSO Intake Staff sends a secure portal message and email requesting urgent callback, marked as high priority.
3. If the patient remains unreachable after 2 business days from the first contact attempt, the Covering Physician documents a "Patient Unreachable — Critical Result" note in the chart and determines the appropriate next step based on clinical judgment. Options include:
   - Sending a certified letter to the patient's address on file
   - Contacting the patient's emergency contact if one is on file and the patient has authorized such contact
   - Continuing attempts at varied times of day
4. The inability to reach a patient with a critical result is logged as a clinical incident and reviewed by the Covering Physician for any systemic issues (incorrect contact information, pattern of unreachability).

### 7.3 Patient Refuses Pre-Visit Draw

**Trigger:** A patient declines to complete the pre-visit lab draw required under section 5.1 after being informed of the requirement.

**Escalation pathway:**

1. MSO Intake Staff documents the patient's refusal and the date in the patient's OptiMantra chart and pipeline.
2. MSO Intake Staff informs the patient that pre-visit labs are required before a clinical visit can be scheduled and that the pipeline will be placed on hold pending draw completion.
3. The patient's pipeline stage is updated to **"Pre-Visit Labs — Patient Hold (Refusal)."**
4. If the patient does not complete the draw within 30 calendar days of the refusal, MSO Intake Staff sends a final outreach notifying the patient that the case will be closed if labs are not completed within 14 additional calendar days.
5. If the patient does not complete the draw within 44 calendar days of the original refusal, the pipeline is moved to **"Closed — Incomplete Labs"** and the patient is removed from the active queue. The patient may re-enter the intake process under [SOP-002](../SOP-002-patient-intake-operations/SOP-002-patient-intake-operations.md) at any time.

### 7.4 LabCorp PSC Issues

**Trigger:** A patient reports an issue at a LabCorp PSC (long wait, requisition not on file, PSC closed unexpectedly, specimen collection error, patient turned away).

**Escalation pathway:**

1. MSO Intake Staff documents the reported issue, date, PSC location, and patient description in the operational log.
2. MSO Intake Staff troubleshoots the immediate issue:
   - Requisition not on file: re-transmit the order or provide the patient with a printed requisition PDF.
   - PSC closed: identify the nearest alternative PSC and provide updated directions.
   - Specimen collection error: coordinate with LabCorp to schedule a re-draw at no additional cost to the patient.
   - Patient turned away: contact LabCorp account representative to resolve the access issue.
3. If the issue is systemic (affecting multiple patients or recurring at the same PSC), the MSO Owner contacts the LabCorp account representative to escalate.
4. Recurring PSC issues are noted in the quarterly vendor review defined in section 5.3.

### 7.5 Result Discrepancy / Re-Draw

**Trigger:** The Covering Physician identifies a lab result that is clinically implausible, inconsistent with the patient's clinical picture, or potentially the result of a specimen or processing error.

**Escalation pathway:**

1. The Covering Physician documents the suspected discrepancy and clinical reasoning in the patient's OptiMantra chart.
2. The Covering Physician orders a repeat draw for the suspect analyte(s) via one-time order under section 5.2.
3. MSO Intake Staff processes the re-draw order and notifies the patient with expedited draw instructions (target: draw within 7 calendar days).
4. If the Covering Physician suspects a LabCorp processing error, the MSO Owner contacts the LabCorp account representative to request investigation and corrected results if applicable.
5. Re-draw costs are absorbed by Bloom Metabolics and tracked separately from standard lab costs in the cost allocation records.

### 7.6 Integration Outage

**Trigger:** The OptiMantra-LabCorp electronic interface is unavailable per the detection criteria in section 5.8.

**Escalation pathway:**

1. MSO Intake Staff activates the manual fallback procedure defined in section 5.8.
2. MSO Intake Staff notifies the MSO Owner of the outage via internal communication channel (Slack, email, or phone) within 1 business hour of detection.
3. The MSO Owner contacts OptiMantra support and LabCorp IT support to report the issue and obtain an estimated resolution timeline.
4. The MSO Owner sends a status update to the Covering Physician for awareness (the physician does not need to take action but should be aware that manual fallback is in effect and turnaround times may be longer).
5. If the outage exceeds 5 business days, the MSO Owner provides a written status update to the Covering Physician with the resolution timeline and any impact on pending patient results.
6. The sustained fallback trigger at 14 calendar days and the SOP revision trigger at 30 calendar days proceed per section 5.8.

### 7.7 Lab Cost Variance Beyond Watch Threshold

**Trigger:** Actual per-patient lab cost for any service line exceeds the budgeted cost by more than 15% (the Lab Cost Watch threshold) in any monthly billing period.

**Escalation pathway:**

1. The MSO Owner identifies the variance during the monthly cost reconciliation defined in section 5.6.
2. The MSO Owner investigates the root cause. Common causes include: LabCorp pricing changes, increased physician-ordered add-on tests, panel composition changes, specimen re-draws, or volume shifts across service lines.
3. The MSO Owner documents the variance, root cause, and proposed corrective action in the Lab Cost Watch log.
4. If the variance is driven by LabCorp pricing changes, the MSO Owner initiates renegotiation with the LabCorp account representative.
5. If the variance is driven by increased physician-ordered add-on tests, the MSO Owner discusses the trend with the Covering Physician to determine whether the add-ons should be incorporated into the standard panel (and the service tier price adjusted) or whether the ordering pattern can be modified.
6. If the variance persists for 3 consecutive months, the MSO Owner conducts a formal pricing review and, if necessary, proposes a service tier price adjustment. Price changes require MSO Owner approval and are communicated to patients per the practice's pricing change notification policy.

---

## 8. Training

### 8.1 Covering Physician

The Covering Physician is presumed competent in laboratory ordering, results interpretation, abnormal and critical value management, and patient communication of clinically significant results by virtue of licensure, training, and credentialing. No additional training under this SOP is required for the Covering Physician beyond a review of the operational workflow (sections 5.1 through 5.9) and the SLA timelines (section 5.4) to ensure alignment with Bloom Metabolics' specific processes.

The Covering Physician reviews this SOP upon assignment and confirms understanding by signing the Approval & Signature block in section 12.

### 8.2 MSO Owner and MSO Intake Staff

MSO Owner and MSO Intake Staff are trained on the following components of this SOP before performing any lab-related work:

| Training Component | Content | Trained By |
| --- | --- | --- |
| SOP-006 full document review | All 12 sections; emphasis on sections 5 and 7 | MSO Owner (self-study + acknowledgment) |
| LabCorp account operations | Portal login, order entry, results retrieval, invoice access, account representative contact | MSO Owner (vendor training + internal walkthrough) |
| OptiMantra lab workflow | Order generation, requisition PDF generation, results routing, manual upload, physician review queue, pipeline stage updates | MSO Owner (EHR training + internal walkthrough) |
| Patient communication protocols | Requisition delivery, pre-draw instructions, normal result notification, boundary rule for abnormal/critical results | MSO Owner |
| Bundled pricing and cost tracking | Invoice reconciliation, cost-per-patient calculation, Lab Cost Watch monitoring | MSO Owner |
| Manual fallback procedure | Order transmission, results retrieval, upload, reconciliation | MSO Owner |

### 8.3 Training Boundary

The training boundary between clinical and operational roles is absolute:

- **MSO staff perform operational lab work:** order transmission, requisition delivery, patient routing, results upload, pipeline updates, cost tracking, integration monitoring, and patient communication of normal results using approved templates.
- **The Covering Physician performs clinical lab work:** panel selection, results interpretation, abnormal/critical classification, clinical action determination, and direct patient communication of clinically significant results.
- MSO staff are trained to recognize the boundary and to route any clinical question, patient inquiry about result meaning, or request for interpretation to the Covering Physician without providing their own assessment.

---

## 9. Compliance References

| Reference | Relevance to This SOP |
| --- | --- |
| **Clinical Laboratory Improvement Amendments (CLIA), 42 CFR Part 493** | Federal regulations governing laboratory testing quality; LabCorp maintains CLIA certification — Bloom relies on LabCorp's CLIA compliance for all testing performed under this SOP |
| **California Clinical Laboratory Act, California Business & Professions Code sections 1200-1327** | State law governing clinical laboratories in California; LabCorp maintains California state licensure |
| **CLIA Regulations 42 CFR §493.1241 (Test Request)** | Federal regulations require laboratories to report results to the authorized person responsible for using the test results; supports the critical value reporting workflow in section 7.1 and aligns with LabCorp's Critical Value Protocol |
| **HIPAA Privacy Rule, 45 CFR Part 164 Subpart E** | Governs the use and disclosure of protected health information, including lab results; all results delivery, storage, and communication under this SOP must comply with HIPAA minimum necessary and patient access requirements |
| **HIPAA Security Rule, 45 CFR Part 164 Subpart C** | Governs the security of electronic protected health information; the OptiMantra-LabCorp electronic interface, results storage in OptiMantra, and patient portal communication must meet HIPAA security standards |
| **California Confidentiality of Medical Information Act (CMIA), California Civil Code section 56 et seq.** | California state law providing additional privacy protections beyond HIPAA; applies to all lab result handling, storage, and communication under this SOP |
| **LabCorp Critical Value Protocol** | LabCorp's internal protocol for identifying and reporting critical laboratory values to ordering providers; integrated into section 7.1 escalation pathway |
| **Endocrine Society Clinical Practice Guidelines — Testosterone Therapy** | Evidence-based guidelines informing TRT-related lab panels, monitoring cadences, and reference ranges referenced in Attachments A and B |
| **Obesity Medicine Association (OMA) Guidelines — GLP-1 Receptor Agonist Therapy** | Evidence-based guidelines informing GLP-1-related lab panels, monitoring cadences, and safety monitoring referenced in Attachments A and B |

---

## 10. Related Documents

### Upstream SOPs

| Document | Relationship |
| --- | --- |
| [SOP-001 — Document Control & SOP Lifecycle Management](../SOP-001-document-control/SOP-001-document-control.md) | Governs this SOP's lifecycle, versioning, approval, and hybrid ownership framework (section 2.3) |
| [SOP-002 — Patient Intake Operations](../SOP-002-patient-intake-operations/SOP-002-patient-intake-operations.md) | Upstream intake workflow; patient identity, residency, and payment verification precede lab ordering |
| [SOP-003 — Clinical Eligibility Screening](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) | Triggers pre-visit lab ordering; eligibility determination may depend on lab results |
| [SOP-005 — Synchronous Telehealth Visit](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) | Consumes pre-visit lab results during the visit; triggers post-visit monitoring lab orders |

### Downstream SOPs (Future)

| Document | Relationship |
| --- | --- |
| Prescribing SOPs (per service line) | Consume monitoring lab results for dose adjustment, treatment modification, and safety decisions |
| Follow-Up Visit SOP | May be triggered by abnormal monitoring results requiring physician re-evaluation |
| Refill & Renewal SOP | Monitoring lab completion may be a gating requirement for prescription renewals |
| Adverse Event Reporting SOP | Critical or severely abnormal lab results may constitute a reportable adverse event |

### Attachments to This SOP

| Attachment | Title | Status |
| --- | --- | --- |
| Attachment A | Pre-Visit Lab Panels by Service Line | Pending — requires Covering Physician clinical content |
| Attachment B | Post-Visit Monitoring Lab Panels and Cadences | Pending — requires Covering Physician clinical content |
| Attachment C | LabCorp Account and Integration Reference | Pending — operational; to be completed upon LabCorp onboarding |
| Attachment D | Results Review Decision Tree (Normal / Abnormal / Critical Classification) | Pending — requires Covering Physician clinical content |
| Attachment E | Patient Results Communication Templates | Pending — clinical templates require Covering Physician approval; operational templates drafted |
| Attachment F | Bundled Lab Pricing Schedule by Service Line | Pending — operational; to be completed upon LabCorp pricing finalization |

---

## 11. Revision History

| Version | Date | Author | Change Summary |
| --- | --- | --- | --- |
| 0.1 | 2026-05-05 | Brian DeGuzman, RN (MSO Owner) | Initial draft. All 12 sections structurally complete. Operational sections fully drafted. Clinical sections contain `[CLINICAL — PENDING COVERING PHYSICIAN]` markers where physician input is required. Attachments A through F listed but not yet populated. |
| 0.2 | 2026-05-05 | Brian DeGuzman, RN (MSO Owner) | Minor revision applying second-pass audit findings before MSO Owner signature on operational components. Changes: (1) §12 Provisional Operation Notice updated to align hybrid SOP Provisional timing with SOP-001 §5.6 standard 180-day clock instead of introducing a separate 60-day mechanism that would have required SOP-001 amendment; (2) §9 California regulatory citation corrected from B&P §1288 (which addresses bioanalyst training program approval) to CLIA 42 CFR §493.1241 (test result reporting); (3) §5.8 integration restoration verification process clarified to specify two operationally-executable verification methods (next live order or vendor-side test transmission) instead of unspecified "test order" that would have required a fake patient record. Classified as minor revision per SOP-001 §5.11.1 — non-substantive clarifications and citation corrections with no procedural or scope changes. Five additional issues identified in audit (SLA realism, Provisional fallback symmetry across service lines, Lab Cost Watch threshold change pathway, service tier add-on volume trigger, and attachment naming consistency) are deferred to Covering Physician's first review pass since they are clinical-adjacent or require operational experience to calibrate. |
| 0.3 | 2026-05-08 | Brian DeGuzman, RN (MSO Owner) | Minor revision: (1) named Dr. Michael Napolitano, MD as Covering Physician in clinical owner/approver fields, header metadata, and signature block; (2) removed phentermine references — permanently out of scope. Classified as minor per SOP-001 §5.11.1. |

---

## 12. Approval & Signature

### Clinical Components — Covering Physician Approval

By signing below, the Covering Physician certifies that the clinical content of this SOP — including lab panel definitions (Attachment A), monitoring cadences (Attachment B), results review SLAs (section 5.4), abnormal and critical value thresholds (Attachment D), patient communication criteria (section 5.5), and all content marked `[CLINICAL — PENDING COVERING PHYSICIAN]` as populated — has been reviewed for clinical accuracy, alignment with evidence-based guidelines, and patient safety, and is approved for implementation.

| Field | Value |
| --- | --- |
| Name | Dr. Michael Napolitano, MD |
| Title | Covering Physician, Bloom Metabolics Professional Corporation |
| Signature | __________________________________________ |
| Date | __________________________________________ |

### Operational Components — MSO Owner Approval

By signing below, the MSO Owner certifies that the operational content of this SOP — including LabCorp vendor management (section 5.3), bundled pricing administration (section 5.6), patient routing (section 5.7), integration management and fallback procedures (section 5.8), cost tracking (section 5.6), and all operational workflow steps — has been reviewed for operational accuracy, feasibility, and compliance with applicable privacy and data handling requirements, and is approved for implementation.

| Field | Value |
| --- | --- |
| Name | Brian DeGuzman, RN |
| Title | Owner, Bloom Metabolics Management Services Organization |
| Signature | __________________________________________ |
| Date | __________________________________________ |

### Acknowledgment of Receipt

All personnel whose work is governed by this SOP must sign below within 14 calendar days of notification, confirming that they have read, understood, and agree to comply with the procedures defined herein.

| Name | Role | Signature | Date |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |

### Provisional Operation Notice

> If only one of the two approval signatures above has been obtained, this SOP operates **Provisionally** under [SOP-001 section 5.6](../SOP-001-document-control/SOP-001-document-control.md). Provisional operation means:
>
> - If the **MSO Owner has signed but the Covering Physician has not:** Operational workflows (sections 5.3, 5.6, 5.7, 5.8) may be operationalized and tested. Clinical workflows (sections 5.1, 5.2, 5.4, 5.5) operate using industry-standard clinical defaults (Endocrine Society for TRT, OMA for GLP-1) until the Covering Physician reviews, populates all `[CLINICAL — PENDING COVERING PHYSICIAN]` markers, and signs. No lab results may be communicated to patients and no clinical interpretation may occur until the Covering Physician's signature is obtained.
> - If the **Covering Physician has signed but the MSO Owner has not:** Clinical content is approved, but operational workflows are not operative. No lab orders may be transmitted, no requisitions may be delivered, and no cost tracking may occur until the MSO Owner signs.
> - **Provisional status timing follows SOP-001 §5.6.** When this SOP operates Provisionally with one of two signatures, the Provisional period follows the standard 180-day maximum from initial Provisional approval as defined in [SOP-001 §5.6](../SOP-001-document-control/SOP-001-document-control.md), with the 90-day milestone for documenting plans for completing the second signature. The MSO Owner is responsible for tracking the Provisional clock and ensuring the second signature is obtained within the standard timeline. Quarterly reporting on Provisional status is included in SOP-001 §5.6 reporting obligations. If the second signature is not obtained within the 180-day Provisional period, the SOP follows the SOP-001 §5.6 reapproval-or-retirement decision pathway.
