---
sop_id: "SOP-008"
title: "Adverse Event & Incident Reporting"
version: "0.2"
status: "Draft"
effective_date: "TBD (pending approval)"
next_review_date: "12 months from effective date"
owner: "Dr. Michael Napolitano, MD — Covering Physician / Medical Director (assignment pending final retainer paperwork via Doctors for Providers as of v0.2 issuance)"
approver: "Dr. Michael Napolitano, MD — Covering Physician / Medical Director (clinical SOP per SOP-001 §2.3)"
classification: "INTERNAL — CLINICAL USE ONLY"
governing_sop: "SOP-001 (Document Control & SOP Lifecycle Management)"
related_documents:
  - "SOP-001 (Document Control)"
  - "SOP-005 (Synchronous Telehealth Visit)"
  - "SOP-006 (Lab Ordering & Review)"
  - "SOP-007 (Prescribing Protocols)"
  - "Future Emergency & Mental Health Escalation SOP"
  - "Future Treatment Discontinuation & Tapering SOP"
  - "Future HIPAA & PHI Handling SOP"
---

# Adverse Event & Incident Reporting

**SOP ID:** SOP-008
**Version:** 0.2
**Status:** Draft
**Effective Date:** TBD (pending approval)
**Next Scheduled Review:** 12 months from effective date
**Document Owner:** Dr. Michael Napolitano, MD — Covering Physician / Medical Director (assignment pending final retainer paperwork via Doctors for Providers as of v0.2 issuance)
**Approving Authority:** Dr. Michael Napolitano, MD — Covering Physician / Medical Director (clinical SOP per SOP-001 §2.3)
**Classification:** INTERNAL — CLINICAL USE ONLY

---

## Notice

### Standing Notice

This Standard Operating Procedure is the property of Bloom Metabolics and is intended exclusively for use by authorized Bloom Metabolics personnel and agents. This document does not constitute medical, legal, or regulatory advice and does not replace individualized clinical judgment by the covering physician. All clinical decisions remain the responsibility of the licensed prescribing clinician.

This SOP is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md). No section of this document may be modified, distributed, or implemented outside the workflow defined therein.

### Status Notice

> This document is in DRAFT status. It has not been reviewed, approved, or signed and is NOT operative. No incident response, adverse event assessment, causality determination, external reporting, patient notification, or quality improvement action shall be conducted on the basis of this document in its current state. No adverse event handling may occur under this SOP until the Covering Physician has signed and the effective date has been populated.

### Clinical Authority Notice

> This is a clinical SOP per [SOP-001 §2.3](../SOP-001-document-control/SOP-001-document-control.md). All clinical content — including severity assessment, causality determination, clinical response to adverse events, voluntary FDA MedWatch reporting decisions, patient communication of clinical findings, and quality improvement clinical thresholds — is the exclusive authority of the Covering Physician. The MSO Owner (Brian DeGuzman, RN) provides operational scaffolding only: incident intake, operational triage, AE Register maintenance, pharmacy partner notification, malpractice carrier notification via Doctors for Providers (DfP), HIPAA breach response coordination (operational steps only; legal determination is counsel's), and quality improvement tracking infrastructure. The MSO Owner does not assess causality, does not determine severity, does not make clinical response decisions, and does not determine whether voluntary FDA reports are filed. This boundary is absolute and is not subject to delegation.

### Reporting Authority Notice

> FDA MedWatch reporting by Bloom Metabolics is **voluntary** under 21 CFR 314.80 voluntary provisions for healthcare providers. Bloom Metabolics is NOT a "user facility" as defined in 21 CFR 803.3 and is therefore not subject to mandatory device reporting under 21 CFR Part 803. The Covering Physician determines whether to file voluntary reports on Form FDA 3500. Mandatory reporting obligations under 21 CFR 314.80(c) rest with manufacturers; mandatory adverse event reporting obligations for compounded products rest with 503A/503B compounding partners under their own FDA obligations; and mandatory reporting by the prescriber's malpractice carrier (if any) is governed by the carrier's policy terms. This SOP establishes a default presumption in favor of voluntary reporting for serious adverse events, but the Covering Physician retains sole clinical authority to determine whether a specific event warrants voluntary FDA submission.

---

## 1. Purpose

This SOP establishes the comprehensive operational and clinical framework for identifying, documenting, assessing, responding to, reporting, and learning from every patient-related incident that occurs in connection with Bloom Metabolics' telehealth hormone optimization services. It is the central incident management instrument governing the full lifecycle of adverse events — from initial intake through clinical resolution, external notification, patient communication, and quality improvement — and it defines the shared architecture that applies uniformly across all incident categories.

Specifically, this SOP governs eight categories of patient-related incidents:

1. **Adverse drug events (ADEs)** — any injury resulting from medical intervention related to a drug prescribed under [SOP-007 (Prescribing Protocols)](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md), including adverse drug reactions, side effects, and drug interactions across all four Bloom service lines (TRT, GLP-1/GIP Weight Management, Sexual Health, Longevity)
2. **Serious adverse events (SAEs)** — adverse events meeting the FDA severity threshold defined in 21 CFR 312.32(a): death, life-threatening, hospitalization, persistent or significant disability, congenital anomaly, or other medically important condition requiring intervention to prevent one of these outcomes
3. **Sentinel events** — unexpected occurrences involving death or serious physical or psychological injury, or the risk thereof, adapted from Joint Commission framing for the telehealth context (Bloom is not Joint Commission-accredited)
4. **Medication errors** — any preventable event that may cause or lead to inappropriate medication use or patient harm while the medication is in the control of the prescriber, pharmacy, or patient, per NCC MERP definition
5. **Fill errors** — errors originating at the pharmacy level (wrong drug, wrong dose, wrong patient, wrong quantity, wrong formulation, labeling error) for prescriptions written under SOP-007
6. **Injection-related incidents** — complications arising from patient self-administration of injectable medications, including but not limited to injection site reactions, infections, nerve injury, and self-administration technique errors, interfacing with [SOP-004 (Injection Education)](../SOP-004-injection-education/SOP-004-injection-education.md)
7. **Privacy incidents and HIPAA breaches** — unauthorized access, use, or disclosure of protected health information (PHI) per 45 CFR 164.402, including both incidents that are determined not to constitute a breach after four-factor risk assessment and incidents that are determined to constitute a breach triggering the notification cascade under 45 CFR 164.404, 164.406, and 164.408
8. **Controlled substance diversion** — suspected or confirmed diversion of Schedule III testosterone cypionate prescribed under SOP-007, including patient diversion (selling, sharing, or misusing prescribed medication) and supply chain diversion (theft, loss, or unaccounted inventory at the pharmacy level)
9. **Pharmacy operational incidents** — systemic failures at the pharmacy partner level (Strive Pharmacy or 503A/503B compounding partner) that affect patient safety, including but not limited to compounding errors, contamination events, recall notifications, cold chain failures, and regulatory enforcement actions against the pharmacy

The framework established by this SOP follows a structured lifecycle: **intake → operational triage → severity and causality assessment → standard or escalated handling → documentation → external reporting (where applicable) → patient communication → quality improvement**. Each step in this lifecycle has clearly delineated clinical and operational authority:

- **Clinical authority** — causality determination, severity assessment, clinical response decisions, voluntary FDA MedWatch reporting decisions, and physician-led patient communication — rests entirely with the Covering Physician. The Covering Physician is the sole clinical decision-maker for every adverse event processed under this SOP.
- **Operational authority** — incident intake, operational triage (routing by urgency, not clinical assessment), AE Register maintenance, pharmacy partner notification, malpractice carrier notification through Doctors for Providers (DfP), HIPAA breach response coordination (operational steps; legal determination deferred to counsel), and quality improvement tracking infrastructure — rests with the MSO Owner (Brian DeGuzman, RN).

This SOP picks up where [SOP-007 §5.8](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md) (Patient-Reported Symptom Intake and Routing) leaves off: when the Covering Physician determines that a patient-reported symptom constitutes an adverse event rather than an expected treatment effect requiring routine clinical management, the chart entry in OptiMantra is cross-referenced to a new AE Register entry and this SOP governs all subsequent handling. The handoff point is the Covering Physician's clinical determination that an adverse event has occurred — not the patient's initial report, which remains within SOP-007's symptom intake workflow until the physician's assessment is complete.

This SOP does NOT govern mental health crises during treatment (suicidal ideation, acute psychiatric decompensation, severe anxiety or depression exacerbation). Mental health crisis response requires a specialized escalation pathway with crisis intervention resources, emergency services coordination, and mental health professional referral — capabilities that are outside the scope of this adverse event framework. Mental health crises during treatment are routed to the future Emergency & Mental Health Escalation SOP. Until that SOP is drafted and approved, any mental health crisis is escalated immediately to the Covering Physician and, where the patient presents imminent danger to self or others, to emergency services (911).

---

## 2. Scope

### 2.1 In Scope

- **Adverse drug events (ADEs)** across all four Bloom service lines: testosterone cypionate (TRT), semaglutide and tirzepatide (GLP-1/GIP Weight Management), PT-141, tadalafil, and sildenafil (Sexual Health), and NAD+, glutathione, BPC-157, and other peptides (Longevity). Includes both FDA-approved products dispensed through Strive Pharmacy and compounded products dispensed through the 503A/503B compounding partner. Covers the full severity spectrum from mild expected side effects that cross the threshold into adverse events through serious adverse events and sentinel events.

- **Serious adverse events (SAEs)** meeting 21 CFR 312.32(a) criteria: death, life-threatening condition, inpatient hospitalization or prolongation of existing hospitalization, persistent or significant incapacity or substantial disruption of the ability to conduct normal life functions, congenital anomaly or birth defect, or other medically important event that may jeopardize the patient and may require medical or surgical intervention to prevent one of the above outcomes. SAEs trigger the escalated handling pathway in §5.4 regardless of causality assessment.

- **Sentinel events** adapted from Joint Commission framing: unexpected occurrences involving death or serious physical or psychological injury, or the risk thereof. Bloom Metabolics is not Joint Commission-accredited, but the sentinel event framework provides a structured approach to the most serious incidents. Sentinel events trigger the time-critical escalation pathway in §5.5.

- **Medication errors** per NCC MERP definition: any preventable event that may cause or lead to inappropriate medication use or patient harm while the medication is in the control of the healthcare professional, patient, or consumer. Includes prescribing errors (wrong drug, wrong dose, wrong frequency, wrong route, drug interaction missed), dispensing errors, and administration errors during patient self-injection.

- **Fill errors** originating at Strive Pharmacy or the 503A/503B compounding partner: wrong drug dispensed, wrong concentration or dose, wrong patient, wrong quantity, labeling errors, compounding errors (wrong ingredients, wrong proportions, contamination), and packaging errors. Fill errors are documented under this SOP regardless of whether the error reached the patient.

- **Injection-related incidents** arising from patient self-administration of injectable medications prescribed under SOP-007 and educated under [SOP-004 (Injection Education)](../SOP-004-injection-education/SOP-004-injection-education.md): injection site reactions (erythema, induration, abscess), infection at the injection site, nerve injury, accidental subcutaneous injection of an intramuscular medication (or vice versa), needle breakage, and self-administration technique errors resulting in subtherapeutic dosing or overdosing.

- **Privacy incidents and HIPAA breaches** involving Bloom Metabolics patient PHI: unauthorized access to OptiMantra or other clinical systems, misdirected communications containing PHI, unauthorized disclosure of patient information to third parties, lost or stolen devices containing PHI, business associate breaches reported to Bloom under 45 CFR 164.410, and any other impermissible use or disclosure under the HIPAA Privacy Rule. Includes both incidents that are determined not to constitute a breach after the four-factor risk assessment under 45 CFR 164.402 and incidents that are confirmed breaches triggering notification under 45 CFR 164.404/406/408.

- **Controlled substance diversion** involving Schedule III testosterone cypionate prescribed under SOP-007: patient-level diversion (selling, sharing, or stockpiling prescribed medication; using medication for purposes other than prescribed; obtaining prescriptions from multiple providers), pharmacy-level diversion (theft, loss, unaccounted inventory), and supply chain diversion. Bloom does not stock controlled substances on-site; all testosterone cypionate is dispensed through Strive Pharmacy. Diversion concerns are reported to the DEA on Form 106 (loss/theft) per 21 CFR 1301.76 where applicable — pharmacy-level reporting is Strive's obligation, but Bloom documents and coordinates.

- **Pharmacy operational incidents** at Strive Pharmacy or the 503A/503B compounding partner that affect patient safety: product recalls, contamination events, FDA enforcement actions (Form 483, warning letters, consent decrees), state board of pharmacy enforcement actions, cold chain failures affecting product integrity, systemic compounding errors, and any other pharmacy-level event that creates risk to Bloom patients.

### 2.2 Out of Scope

- **Mental health crises during treatment** (suicidal ideation, acute psychiatric decompensation, severe anxiety or depression exacerbation) — governed by the future Emergency & Mental Health Escalation SOP. Until drafted, immediate escalation to the Covering Physician and emergency services (911) where imminent danger exists.
- **Routine clinical reassessment of treatment effectiveness** — governed by [SOP-007 §5.7](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md) (dose adjustment) and [SOP-007 §5.8](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md) (patient-reported symptom intake and routing). Expected treatment effects managed within normal clinical parameters remain within SOP-007 until the Covering Physician determines an adverse event has occurred.
- **Patient complaints about non-clinical matters** (scheduling, billing, communication preferences, service quality) — governed by the future Patient Communication Protocols SOP.
- **Personnel disciplinary incidents** (staff misconduct, policy violations unrelated to patient safety) — governed by the future Training & Competency Program SOP.
- **Marketing and advertising compliance incidents** (non-compliant claims, unapproved testimonials, FTC or FDA advertising violations) — governed by the future Marketing & Advertising Compliance SOP.
- **Vendor and business associate compliance incidents other than HIPAA breach** (contract violations, service-level failures, financial disputes) — governed by the future Business Associate Management SOP.
- **In-office controlled substance handling** — Bloom Metabolics does not stock, store, or dispense controlled substances on-site. All Schedule III testosterone cypionate is routed to Strive Pharmacy for dispensing. In-office handling protocols are not applicable.
- **Manufacturer-side mandatory FDA reporting** — mandatory adverse event reporting under 21 CFR 314.80(c) is the manufacturer's obligation. Mandatory adverse event reporting for compounded products is the 503A/503B compounding partner's obligation under their own FDA registration. Bloom's reporting posture is voluntary under §5.9.

---

## 3. Definitions

**Adverse Event (AE)**
Any untoward medical occurrence in a patient receiving treatment through Bloom Metabolics, whether or not considered related to the treatment. An adverse event does not necessarily have a causal relationship with the treatment; it is a temporal association that requires clinical assessment. The AE definition is intentionally broad to ensure that all patient-reported incidents enter the documentation and assessment pipeline, even those ultimately determined to be unrelated to Bloom's treatment.

**Adverse Drug Reaction (ADR)**
Per the World Health Organization (WHO) definition: a response to a drug which is noxious and unintended and which occurs at doses normally used in humans for the prophylaxis, diagnosis, or therapy of disease, or for the modification of physiological function. An ADR implies a causal relationship between the drug and the event — it is a subset of adverse events where causality has been assessed as at least "possible."

**Serious Adverse Event (SAE)**
Per 21 CFR 312.32(a) and 21 CFR 314.80(a): any adverse event occurring at any dose that results in any of the following outcomes: death, a life-threatening adverse experience, inpatient hospitalization or prolongation of existing hospitalization, a persistent or significant disability or incapacity, a congenital anomaly or birth defect, or other medically important events that may jeopardize the patient and may require medical or surgical intervention to prevent one of the preceding outcomes. The SAE classification is based on outcome severity, not on causality — an event meeting SAE criteria triggers the escalated pathway in §5.4 regardless of whether causality is determined to be related or unrelated.

**Sentinel Event**
Adapted from The Joint Commission Sentinel Event Policy: an unexpected occurrence involving death or serious physical or psychological injury, or the risk thereof. "Serious injury" specifically includes loss of limb or function. The phrase "or the risk thereof" includes any process variation for which a recurrence would carry a significant chance of a serious adverse outcome. Bloom Metabolics is not Joint Commission-accredited; the sentinel event framework is adopted as a voluntary quality standard to structure the response to the most serious incidents. Sentinel events trigger the time-critical pathway in §5.5.

**Causality Categories**
The framework for determining the relationship between an adverse event and the suspected medication. Bloom Metabolics uses the following causality categories, adapted from the WHO-UMC (Uppsala Monitoring Centre) system:

- **Definite** — a clinical event occurring in a plausible time relationship to drug administration, which cannot be explained by concurrent disease or other drugs/chemicals, and which shows a clinically reasonable response upon withdrawal (dechallenge) and, if applicable, upon re-administration (rechallenge)
- **Probable** — a clinical event with a reasonable time relationship to drug administration, unlikely to be attributed to concurrent disease or other drugs/chemicals, and which follows a clinically reasonable response on withdrawal
- **Possible** — a clinical event with a reasonable time relationship to drug administration, but which could also be explained by concurrent disease or other drugs/chemicals
- **Unlikely** — a clinical event with a temporal relationship to drug administration which makes a causal relationship improbable, and in which other drugs, chemicals, or underlying disease provide plausible explanations
- **Unrelated** — a clinical event with no temporal or pharmacological relationship to drug administration, or with a clear alternative explanation

`[CLINICAL — PENDING COVERING PHYSICIAN: Confirm or modify the causality framework above. Define the specific clinical criteria each category requires for the major product categories (testosterone cypionate, GLP-1/GIP agonists, sexual health compounds, longevity peptides). Specify whether the Naranjo Algorithm, WHO-UMC system, or clinical judgment is the primary assessment tool, and under what circumstances a formal algorithm score is required versus physician narrative assessment.]`

**Severity Categories**
The framework for classifying the clinical severity of an adverse event. Bloom Metabolics uses the following severity categories, aligned with the Common Terminology Criteria for Adverse Events (CTCAE v5.0):

- **Mild** — asymptomatic or mild symptoms; clinical or diagnostic observations only; intervention not indicated
- **Moderate** — minimal, local, or noninvasive intervention indicated; limiting age-appropriate instrumental activities of daily living (ADL)
- **Severe** — medically significant but not immediately life-threatening; hospitalization or prolongation of hospitalization indicated; disabling; limiting self-care ADL

`[CLINICAL — PENDING COVERING PHYSICIAN: Confirm or modify the severity framework above. Define the specific clinical criteria for each severity tier for each major product category (testosterone cypionate — e.g., polycythemia thresholds, PSA elevation thresholds; GLP-1/GIP — e.g., nausea severity grading, pancreatitis indicators; sexual health — e.g., priapism duration thresholds; longevity peptides — e.g., injection site reaction grading). Specify whether CTCAE v5.0 is adopted as-is or modified for the telehealth hormone optimization context.]`

**Medication Error**
Per the National Coordinating Council for Medication Error Reporting and Prevention (NCC MERP): any preventable event that may cause or lead to inappropriate medication use or patient harm while the medication is in the control of the health care professional, patient, or consumer. Such events may be related to professional practice, health care products, procedures, and systems, including prescribing, order communication, product labeling, packaging, and nomenclature, compounding, dispensing, distribution, administration, education, monitoring, and use. Medication errors are documented under this SOP regardless of whether harm occurred.

**Fill Error**
An error originating at the pharmacy level — Strive Pharmacy or the 503A/503B compounding partner — in the dispensing, compounding, labeling, or packaging of a prescription written under [SOP-007](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md). Fill errors include wrong drug dispensed, wrong concentration or dose, wrong patient, wrong quantity, labeling errors (wrong directions, wrong patient name, wrong drug name on label), compounding errors (wrong ingredients, wrong proportions, contamination, beyond-use-date errors), and packaging errors. Fill errors are the pharmacy's primary operational responsibility, but Bloom documents all fill errors that are discovered or reported to Bloom, regardless of whether the error reached the patient.

**Injection-Related Incident**
Any complication arising from patient self-administration of an injectable medication prescribed under SOP-007 and educated under [SOP-004 (Injection Education)](../SOP-004-injection-education/SOP-004-injection-education.md). Includes injection site reactions (erythema, induration, pain, swelling, abscess formation), infection at the injection site (cellulitis, localized abscess), nerve injury, hematoma, accidental subcutaneous injection of an intramuscular medication (or vice versa), needle breakage, vasovagal syncope during self-injection, and self-administration technique errors resulting in subtherapeutic dosing or overdosing.

**Privacy Incident**
Per the HIPAA Privacy Rule (45 CFR 164.502): any impermissible use or disclosure of protected health information (PHI) that compromises the security or privacy of PHI. Not every privacy incident constitutes a "breach" under 45 CFR 164.402 — a privacy incident becomes a breach only after the four-factor risk assessment determines that the incident poses more than a low probability that PHI has been compromised. All privacy incidents are documented in the AE Register regardless of breach determination.

**HIPAA Breach**
Per 45 CFR 164.402: the acquisition, access, use, or disclosure of PHI in a manner not permitted by the Privacy Rule which compromises the security or privacy of the PHI. A breach is presumed unless the covered entity demonstrates through the four-factor risk assessment that there is a low probability that the PHI has been compromised. The four factors are: (1) the nature and extent of the PHI involved, including the types of identifiers and the likelihood of re-identification; (2) the unauthorized person who used the PHI or to whom the disclosure was made; (3) whether the PHI was actually acquired or viewed; and (4) the extent to which the risk to the PHI has been mitigated. A confirmed breach triggers the notification cascade: individual notification (45 CFR 164.404), media notification for breaches affecting 500+ residents of a state (45 CFR 164.406), and HHS Secretary notification (45 CFR 164.408).

**Controlled Substance Diversion**
Suspected or confirmed diversion of a DEA-scheduled controlled substance from its intended medical use. In the Bloom Metabolics context, diversion applies exclusively to Schedule III testosterone cypionate prescribed under SOP-007 and dispensed through Strive Pharmacy. Diversion may occur at the patient level (selling, sharing, stockpiling, or misusing prescribed medication) or at the pharmacy/supply chain level (theft, loss, unaccounted inventory). Pharmacy-level diversion reporting to the DEA on Form 106 per 21 CFR 1301.76 is Strive Pharmacy's obligation; Bloom documents, coordinates, and reports any diversion concerns discovered at the prescriber level.

**Pharmacy Operational Incident**
A systemic failure at a Bloom pharmacy partner (Strive Pharmacy or the 503A/503B compounding partner) that affects or has the potential to affect patient safety. Includes product recalls, contamination events, FDA enforcement actions (Form 483 observations, warning letters, consent decrees, injunctions), state board of pharmacy enforcement actions, cold chain failures affecting product integrity, systemic compounding errors, and any other pharmacy-level event that creates risk to Bloom patients. Pharmacy operational incidents are documented under this SOP to the extent that they affect Bloom patients; the pharmacy's internal incident response is the pharmacy's own operational responsibility.

**AE Register**
The centralized, access-controlled registry maintained by the MSO Owner that documents every incident processed under this SOP. The AE Register is the single source of truth for incident tracking, status monitoring, external notification documentation, and quality improvement trending. Required fields are specified in §5.7.

**Voluntary FDA Reporting**
Submission of adverse event information to the FDA through the MedWatch Voluntary Reporting Program using Form FDA 3500. Voluntary reporting is distinct from mandatory reporting (Form FDA 3500A). Healthcare providers — including prescribers like the Covering Physician — are encouraged but not required to report adverse events voluntarily under 21 CFR 314.80 voluntary provisions. Bloom Metabolics establishes a default presumption in favor of voluntary reporting for serious adverse events (§5.4, §5.9), but the Covering Physician retains sole clinical authority over filing decisions.

**Quality Improvement Action (QIA)**
A documented corrective or preventive action taken in response to an adverse event or incident, intended to reduce the probability of recurrence. QIAs may include SOP revision (via [SOP-001 §5.13](../SOP-001-document-control/SOP-001-document-control.md)), training updates, vendor changes, workflow modifications, system configuration changes, or clinical protocol adjustments. Each QIA is linked to its triggering incident(s) in the QIA register maintained alongside the AE Register.

**Root Cause Analysis (RCA)**
A structured, systematic process for identifying the fundamental cause(s) of an adverse event or incident — the factor(s) whose correction would prevent recurrence. RCA is required for all sentinel events (§5.5) and recommended for SAEs and recurring incidents. The RCA methodology is determined by the Covering Physician and MSO Owner based on the incident's complexity; options include the "5 Whys" technique, fishbone (Ishikawa) diagram, or a narrative-based analysis for simpler incidents.

---

## 4. Roles & Responsibilities

| Role | Primary Responsibilities Under This SOP |
| --- | --- |
| **Covering Physician (Dr. Michael Napolitano, MD) — Document Owner & Approving Authority** | Performs severity assessment and causality determination for all adverse events. Determines the clinical response (monitoring, dose adjustment, medication hold, treatment discontinuation, referral). Leads all physician-led patient communication regarding adverse events. Determines whether voluntary FDA MedWatch reports are filed and serves as the named reporter. Conducts or directs root cause analysis for sentinel events. Reviews quarterly trending data and determines clinical corrective actions. Populates all `[CLINICAL — PENDING COVERING PHYSICIAN]` markers in this SOP. Signs and approves this SOP as the clinical authority per SOP-001 §2.3. |
| **MSO Owner (Brian DeGuzman, RN)** | Manages all operational incident handling: intake infrastructure, operational triage routing, AE Register creation and maintenance, pharmacy partner notification, malpractice carrier notification via DfP, HIPAA breach response coordination (operational steps; legal determination deferred to counsel). Conducts quarterly trending reviews with the Covering Physician. Maintains QIA register. Populates all `[OPERATIONAL — PENDING MSO OWNER]` markers in this SOP. Coordinates with legal counsel for HIPAA breach notifications and subpoena/legal process responses. Does NOT assess causality, determine severity, make clinical response decisions, or determine FDA reporting. |
| **MSO Intake Staff** | Performs first-contact incident intake: logs initial report in the AE Register, classifies by operational urgency tier (Urgent/High/Standard), routes to the appropriate queue (Covering Physician for clinical assessment, MSO Owner for operational coordination). Provides receipt confirmation to reporting parties. Handles non-clinical logistics (scheduling, follow-up appointment coordination). Does NOT communicate clinical content, severity assessments, causality determinations, or clinical plans to patients or external parties. Does NOT perform clinical triage — operational urgency classification only. |
| **Pharmacy Partners (Strive Pharmacy, 503A/503B Compounding Partner) — Informational Role** | External parties that receive adverse event and fill error notifications from Bloom per §5.10. Fulfill their own independent FDA reporting obligations, state board reporting obligations, and DEA reporting obligations (for controlled substance diversion/loss). Provide fill error investigation reports and corrective action documentation to Bloom upon request. Bloom does not direct pharmacy partners' internal incident response; this SOP governs Bloom's notification obligations and documentation requirements. |
| **Patient** | Reports symptoms, adverse effects, and incidents through the channels specified in §5.1 (OptiMantra portal, phone, email, secure message). Receives physician-led clinical communication regarding adverse events per §5.8. Provides or withholds consent for communications with family members. Cooperates with clinical recommendations to the extent they are willing and able. Patients are not required to consent to FDA MedWatch reporting (voluntary reports do not require patient consent, though patient identity is protected). |

---

## 5. Procedure

### 5.1 AE Intake

All patient-related incidents enter the SOP-008 pipeline through the AE intake process, regardless of the incident category, the reporting channel, or the identity of the reporter. The intake process is an operational function performed by MSO Intake Staff or the MSO Owner — it does not involve clinical assessment.

**Entry points.** Incidents may be reported through any of the following channels:

- **OptiMantra patient portal** — patient-initiated symptom reports, secure messages
- **Phone** — patient calls, pharmacy partner calls, external provider calls
- **Email** — patient emails, pharmacy partner notifications, external reports
- **Secure message** — OptiMantra secure messaging, GHL secure messaging
- **Pharmacy notification** — Strive Pharmacy or compounding partner notifies Bloom of a fill error, recall, or other pharmacy-originated incident
- **MSO Owner observation** — the MSO Owner identifies a potential incident during routine operational activities (e.g., payment anomaly suggesting diversion, access log anomaly suggesting privacy incident)
- **Automated system triggers** — CURES anomaly (unexpected fill pattern, early refill flagged by PDMP), lab result anomaly flagged during [SOP-006](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md) review (e.g., critically elevated hematocrit, critically elevated PSA), or OptiMantra system alert
- **Covering Physician determination** — the Covering Physician, during clinical assessment under [SOP-007 §5.8](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md) (patient-reported symptom intake), determines that a patient-reported symptom constitutes an adverse event. This is the primary handoff point from SOP-007 to SOP-008.

**Intake logging.** Upon receiving a report through any channel, the MSO Intake Staff (or MSO Owner, if the MSO Intake Staff role is not yet filled) logs the following information in the AE Register:

- Date and time of report receipt
- Reporter identity (patient, pharmacy, provider, MSO staff, automated system)
- Reporting channel (OptiMantra, phone, email, secure message, pharmacy notification, staff observation, automated trigger)
- Patient identifier (OptiMantra patient ID; name redacted from any external-facing documentation)
- Incident category (preliminary — may be reclassified after physician assessment)
- Narrative summary of the reported incident (verbatim patient language where possible)
- Medications involved (if identifiable at intake)
- Date of incident occurrence (if known; may differ from date of report)

**Three-tier operational triage.** After logging, the MSO Intake Staff classifies the incident by operational urgency using the following triage matrix. This is an operational routing decision, NOT a clinical severity assessment — the Covering Physician performs clinical severity assessment in §5.2.

| Tier | Criteria | Routing SLA | Action |
| --- | --- | --- | --- |
| **Urgent** | Patient reports: emergency department visit, hospitalization, life-threatening symptoms, loss of consciousness, anaphylaxis, chest pain, difficulty breathing, seizure, suicidal ideation (route to Emergency SOP if available), suspected stroke or cardiac event. OR: Pharmacy reports product contamination, recall affecting dispensed product, or confirmed diversion. OR: HIPAA breach involving 500+ individuals. | **Immediate** — within 15 minutes of intake | MSO Intake Staff calls the MSO Owner directly (not secure message). MSO Owner calls the Covering Physician directly (not secure message). If the patient is in immediate danger, MSO Intake Staff instructs the patient to call 911 before completing intake logging. |
| **High** | Patient reports: moderate adverse effects requiring medical attention (urgent care visit, new prescription from outside provider), injection site infection, suspected medication error. OR: Pharmacy reports fill error that reached the patient. OR: Privacy incident involving PHI of identifiable patient(s). OR: CURES anomaly suggesting potential diversion. | **4 business hours** from intake | MSO Intake Staff routes to the Covering Physician's priority queue in OptiMantra and notifies the MSO Owner by secure message. Covering Physician responds within 4 business hours. |
| **Standard** | Patient reports: mild side effects that have persisted or worsened beyond the expected timeframe, injection site reactions (non-infected), minor self-administration errors. OR: Pharmacy reports near-miss fill error (caught before dispensing). OR: Privacy incident involving no identifiable PHI or involving de-identified data only. | **1 business day** from intake | MSO Intake Staff routes to the Covering Physician's standard queue in OptiMantra. Covering Physician responds within 1 business day. |

**Bridge from SOP-007.** When the Covering Physician, during clinical assessment under [SOP-007 §5.8](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md), determines that a patient-reported symptom constitutes an adverse event:

1. The Covering Physician documents the AE determination in the patient's OptiMantra chart note with a cross-reference notation indicating that the event is being entered into the AE Register under SOP-008.
2. The Covering Physician notifies the MSO Owner (or MSO Intake Staff) that a new AE Register entry is required.
3. The MSO Owner (or MSO Intake Staff) creates the AE Register entry, linking it to the SOP-007 chart note.
4. From this point forward, the incident is governed by SOP-008. The Covering Physician proceeds to severity and causality assessment (§5.2).

### 5.2 Severity & Causality Assessment

Severity and causality assessment is a clinical function performed exclusively by the Covering Physician. The MSO Owner and MSO Intake Staff do not participate in clinical assessment.

**Two-axis assessment.** Every adverse event receives a two-axis clinical assessment:

- **Severity axis:** Mild / Moderate / Severe (per the severity categories defined in §3)
- **Causality axis:** Definite / Probable / Possible / Unlikely / Unrelated (per the causality categories defined in §3)

The two axes are independent — a severe event may be unrelated to treatment, and a mild event may have definite causality. Both axes inform the handling pathway but through different mechanisms: severity determines the intensity of the response (standard vs. escalated); causality informs clinical decision-making (dose adjustment, medication hold, discontinuation) and reporting decisions (voluntary FDA MedWatch).

`[CLINICAL — PENDING COVERING PHYSICIAN: Define the specific clinical criteria for each severity tier (Mild/Moderate/Severe) for each major product category. For testosterone cypionate: polycythemia thresholds (hematocrit levels), PSA elevation thresholds, cardiovascular symptom grading, mood/behavioral change severity criteria, injection site reaction grading. For GLP-1/GIP agonists: nausea/vomiting severity grading, pancreatitis clinical indicators and severity thresholds, gallbladder disease indicators, injection site reaction grading. For sexual health compounds: priapism duration thresholds and severity grading, cardiovascular contraindication response criteria. For longevity peptides: injection site reaction grading, systemic reaction criteria. Define the specific clinical criteria for each causality tier — whether the Naranjo Algorithm score, WHO-UMC narrative criteria, or clinical judgment is the primary assessment tool, and under what circumstances a formal algorithm score is documented versus a physician narrative assessment.]`

**Special routing.** During assessment, the Covering Physician determines whether the event meets SAE or sentinel criteria:

- If the event meets **SAE criteria** (per 21 CFR 312.32(a) as defined in §3), the Covering Physician flags the AE Register entry as SAE and proceeds immediately to §5.4 (Serious Adverse Event Handling). Standard handling in §5.3 is bypassed.
- If the event meets **sentinel criteria** (per The Joint Commission framing as defined in §3), the Covering Physician flags the AE Register entry as sentinel and proceeds immediately to §5.5 (Sentinel Event Handling). Both standard handling (§5.3) and SAE handling (§5.4) are bypassed — sentinel handling subsumes SAE handling.
- If the event does not meet SAE or sentinel criteria, the Covering Physician proceeds to §5.3 (Standard Incident Handling).

**Documentation.** The Covering Physician documents the severity and causality assessment in the patient's OptiMantra chart note, including:

- Severity classification with clinical rationale
- Causality classification with clinical rationale (including temporal relationship, dechallenge/rechallenge data if available, alternative explanations considered)
- SAE or sentinel flag (if applicable) with the specific criterion met
- Cross-reference to the AE Register incident ID

### 5.3 Standard Incident Handling (Mild/Moderate AEs, Medication Errors, Fill Errors, Injection-Related Non-Serious)

Standard handling applies to incidents that do not meet SAE or sentinel criteria. This includes mild and moderate adverse events, medication errors (regardless of whether harm occurred), fill errors (regardless of whether the error reached the patient), and non-serious injection-related incidents.

**Clinical response.** The Covering Physician determines the clinical response based on severity, causality, and the patient's overall clinical picture. Clinical response options include:

- **Reassurance and monitoring** — the event is mild, self-limiting, or expected to resolve without intervention. The Covering Physician documents the monitoring plan (follow-up interval, parameters to monitor, criteria for re-escalation).
- **Dose adjustment** — the event is potentially related to the current dose and may resolve or improve with dose modification. The Covering Physician adjusts the dose per [SOP-007 §5.7](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md) (dose adjustment workflow) and documents the AE as the clinical rationale for the adjustment.
- **Medication hold** — the event requires a temporary hold on the suspected medication pending further evaluation (labs, clinical assessment, specialist consultation). The Covering Physician documents the hold with expected duration and re-evaluation criteria.
- **Treatment discontinuation** — the event warrants permanent discontinuation of the suspected medication. The Covering Physician documents the discontinuation rationale. Discontinuation procedures will be governed by the future Treatment Discontinuation & Tapering SOP; until that SOP is drafted, the Covering Physician determines the discontinuation approach on a case-by-case basis.
- **Referral** — the event requires evaluation by a specialist, emergency department, or primary care provider beyond Bloom's telehealth scope. The Covering Physician documents the referral with clinical rationale and urgency.

**Pharmacy partner notification.** If the incident involves a fill error or a compounded product is implicated in the adverse event, the MSO Owner notifies the relevant pharmacy partner (Strive Pharmacy or 503A/503B compounding partner) per §5.10.

**Medication error documentation.** For medication errors — whether prescribing errors, dispensing errors, or administration errors — the MSO Owner documents the error using the NCC MERP taxonomy (error category A through I) in the AE Register, regardless of whether harm occurred. Near-miss events (categories A through C) are documented with the same rigor as harm events to support trending and quality improvement.

**Patient communication.** The Covering Physician leads all clinical communication with the patient per §5.8. MSO Intake Staff may provide non-clinical logistical support (appointment scheduling, receipt confirmation) but does not communicate clinical content.

**Closure.** A standard incident is closed when: (a) the Covering Physician has documented the clinical assessment, response, and outcome; (b) the patient's condition has resolved or stabilized; (c) any pharmacy partner notifications have been completed; and (d) any applicable QIAs have been identified and documented. If the incident remains unresolved after 14 calendar days, the MSO Owner escalates to the Covering Physician for status review and re-assessment.

### 5.4 Serious Adverse Event Handling

SAE handling is activated when the Covering Physician determines that an adverse event meets the SAE criteria defined in §3. SAE handling is more intensive than standard handling and includes mandatory notifications, a default presumption of voluntary FDA reporting, and a structured closure process.

**Initial 24-hour actions.** Upon SAE determination by the Covering Physician:

1. The Covering Physician documents the SAE determination in the patient's OptiMantra chart note, including the specific SAE criterion met (death, life-threatening, hospitalization, persistent disability, congenital anomaly, or other medically important event) and the initial clinical narrative.
2. The MSO Owner is notified immediately (within 1 hour of the Covering Physician's determination).
3. The AE Register entry is flagged as SAE with the date and time of determination.
4. The MSO Owner initiates malpractice carrier notification through Doctors for Providers (DfP) within 24 hours per §5.11.
5. The MSO Owner and Covering Physician conduct an initial case review (phone or video, not asynchronous) within 24 hours to align on immediate clinical response, notification obligations, and patient communication plan.

**Voluntary FDA MedWatch reporting.** The default presumption for SAEs involving FDA-approved products prescribed under SOP-007 is that a voluntary FDA MedWatch report (Form FDA 3500) is filed. The Covering Physician may determine that a report is not warranted in a specific case — for example, if the SAE is clearly unrelated to treatment (causality assessment: "Unrelated" with documented alternative explanation) or if the event is a well-characterized, labeled adverse reaction that does not represent a new safety signal. If the Covering Physician determines that a voluntary report is not filed, the rationale is documented in the AE Register and the patient's chart note.

`[CLINICAL — PENDING COVERING PHYSICIAN: Confirm or modify the default presumption in favor of voluntary FDA reporting for SAEs. Define the clinical decision tree for report vs. do not report — specifically, which causality categories warrant filing (Definite and Probable only? All categories except Unrelated?), whether the "well-characterized, labeled adverse reaction" exception applies to all products or only specific products, and whether there are specific SAE types that are always reported regardless of causality (e.g., death, hospitalization). Define who files the report — the Covering Physician personally, or the MSO Owner under the Covering Physician's direction and signature — and the physician's review/approval workflow for the report content before submission.]`

**Pharmacy partner notification.** If the SAE involves a product dispensed by Strive Pharmacy or the 503A/503B compounding partner, the MSO Owner notifies the pharmacy partner within 48 hours per §5.10. The notification includes the incident category, severity, de-identified narrative, product details, and dates. The pharmacy partner's own reporting obligations are independent of Bloom's.

**Patient and family communication.** The Covering Physician leads all clinical communication with the patient (and, with the patient's consent, the patient's family) regarding the SAE. Communication includes the clinical assessment, the treatment plan, and the expected course. The Covering Physician documents all communications in the patient's chart note. MSO Intake Staff does not communicate SAE details to the patient or family.

**Counsel engagement.** If the SAE presents potential malpractice exposure — as determined by the MSO Owner, the Covering Physician, or the malpractice carrier — counsel is engaged through the malpractice carrier's panel per §5.11. All communications with counsel are privileged. The MSO Owner coordinates logistics; the Covering Physician provides clinical information as requested by counsel.

**Closure.** An SAE is closed only when all of the following are complete: (a) the Covering Physician has documented the full clinical assessment, response, outcome, and follow-up plan; (b) the patient's condition has resolved, stabilized, or is under active specialist management with documented handoff; (c) all required notifications (DfP, pharmacy partner, voluntary FDA report if applicable) have been completed and documented in the AE Register; (d) all applicable QIAs have been identified and documented or scheduled; and (e) the Covering Physician and MSO Owner have signed off on closure. SAEs are never closed by the MSO Owner alone.

### 5.5 Sentinel Event Handling

Sentinel event handling is the most intensive response pathway in this SOP. It is activated when the Covering Physician determines that an incident meets sentinel event criteria — unexpected occurrence involving death or serious physical or psychological injury, or the risk thereof. Sentinel handling is time-critical with explicit milestones.

**Timeline of required actions:**

**Within 1 hour of sentinel determination:**
- The MSO Owner calls the Covering Physician directly (phone call, not secure message, not email). If the Covering Physician identified the sentinel event, the MSO Owner is called directly.
- The MSO Owner and Covering Physician verbally confirm the sentinel determination and agree on immediate patient safety actions.
- If the patient is in immediate danger and is not already receiving emergency care, the Covering Physician directs the patient to emergency services (911) or the nearest emergency department.

**Within 4 hours of sentinel determination:**
- The MSO Owner notifies Doctors for Providers (DfP) per §5.11 to initiate malpractice carrier notification.
- The Covering Physician documents the initial clinical narrative in the patient's OptiMantra chart note — including the sentinel event criteria met, the patient's current clinical status, the immediate clinical response taken, and the preliminary causality assessment.
- The AE Register entry is flagged as sentinel with the date, time, and criterion met.

**Within 24 hours of sentinel determination:**
- The malpractice carrier is formally notified through DfP. The notification includes a factual summary without admission of liability.
- The Covering Physician and MSO Owner conduct a structured initial review (phone or video) to assess: patient status, immediate clinical response adequacy, notification obligations, patient/family communication plan, counsel engagement need, and preliminary identification of contributing factors.
- The MSO Owner sends pharmacy partner notification per §5.10 if a pharmacy product is implicated.

**Within 72 hours of sentinel determination:**
- Counsel is engaged through the malpractice carrier's panel if the sentinel event presents potential malpractice exposure. All counsel communications are privileged.
- The preliminary root cause analysis (RCA) is initiated. The Covering Physician leads the clinical component; the MSO Owner leads the operational component.
- The MSO Owner prepares a preliminary incident summary for the AE Register, documenting all actions taken, all notifications sent, and the current status.

**Within 14 calendar days of sentinel determination:**
- Full root cause analysis is completed. The RCA documents contributing factors (clinical, operational, systemic), the root cause(s) identified, and recommended corrective actions.
- A corrective action plan is documented, with responsible parties, timelines, and measurable outcomes for each action item.
- The Covering Physician determines whether a voluntary FDA MedWatch report is filed per §5.9. The default presumption for sentinel events is to file.

**Within 30 calendar days of sentinel determination:**
- All QIAs are implemented or scheduled with documented timelines.
- The sentinel event report is finalized — a comprehensive document combining the clinical narrative, RCA findings, corrective action plan, notification log, and follow-up plan.
- The finalized report is filed in the AE Register and retained per §5.7.

**90-day post-event review:**
- The Covering Physician and MSO Owner conduct a structured 90-day review assessing: patient outcome (if known), effectiveness of corrective actions, whether similar incidents have occurred, and whether additional QIAs are needed.
- The 90-day review is documented in the AE Register.

**Communication restrictions:**
- The Covering Physician personally leads all patient and family communication regarding sentinel events. MSO Intake Staff does NOT communicate sentinel event details to the patient, family, or any external party.
- Media inquiries regarding a sentinel event are routed to counsel. No Bloom Metabolics personnel — including the MSO Owner and the Covering Physician — speaks to media without counsel's explicit approval and guidance.
- All internal documentation of sentinel events may be subject to attorney-client privilege or work product protection if counsel is engaged. The MSO Owner coordinates with counsel regarding privilege designations before sharing sentinel event documentation outside the immediate care team.

### 5.6 Privacy Incident & HIPAA Breach Handling

All privacy incidents involving Bloom Metabolics patient PHI enter the AE Register under this SOP, regardless of whether the incident is ultimately determined to constitute a HIPAA breach. The privacy incident handling pathway runs parallel to — and may overlap with — the clinical AE handling pathways in §§5.3–5.5 if the privacy incident also involves a clinical adverse event.

**Initial documentation.** Upon discovery or notification of a privacy incident, the MSO Owner (or MSO Intake Staff) logs the incident in the AE Register with the category "Privacy Incident" and the following additional fields:

- Nature of the PHI involved (clinical records, billing data, demographic data, lab results, prescription data)
- Volume of records/individuals potentially affected (exact count if known; best estimate if not)
- How the incident was discovered (staff observation, patient report, system alert, business associate notification, external report)
- Whether the PHI was encrypted or otherwise protected at the time of the incident
- Immediate containment actions taken (access revoked, device recovered, communication recalled, etc.)

**Four-factor risk assessment.** The MSO Owner conducts the four-factor risk assessment per 45 CFR 164.402 to determine whether the privacy incident constitutes a breach:

1. **Nature and extent of PHI involved.** What types of PHI were involved (names, Social Security numbers, diagnoses, treatment records, financial information)? What types of identifiers were included? What is the likelihood of re-identification if the data was de-identified or partially de-identified?

2. **Unauthorized person who used or received the PHI.** Who was the unauthorized recipient? Was it another covered entity or business associate (lower risk) or an unknown third party (higher risk)? Does the unauthorized recipient have obligations under HIPAA or other privacy laws?

3. **Whether PHI was actually acquired or viewed.** Was the PHI actually accessed, viewed, downloaded, or copied? Or was the PHI exposed but there is no evidence of actual access (e.g., a misdirected email that was returned unread, a lost device that was recovered with no evidence of access)?

4. **Extent to which risk has been mitigated.** What containment and mitigation actions have been taken? Has the unauthorized recipient provided assurance of destruction or non-use? Has access been revoked? Has the PHI been recovered?

The MSO Owner documents the four-factor assessment in the AE Register. The assessment is reviewed by HIPAA-competent counsel before a final breach determination is made. The MSO Owner does NOT make the legal determination of whether a breach has occurred — counsel makes that determination based on the MSO Owner's factual assessment.

**If determined NOT to be a breach:** The privacy incident remains documented in the AE Register with the four-factor assessment, the rationale for the no-breach determination, and counsel's concurrence. No notification cascade is triggered. QIAs are identified and documented to prevent recurrence.

**If determined to be a breach:** The following notification cascade is triggered:

- **Individual notification (45 CFR 164.404):** Written notification to each affected individual without unreasonable delay, and in no case later than 60 calendar days from the date of discovery of the breach. Notification content must include: a brief description of what happened including the date of the breach and the date of discovery; a description of the types of unsecured PHI involved; steps individuals should take to protect themselves; a brief description of what Bloom is doing to investigate, mitigate, and prevent future occurrences; and contact procedures for individuals to ask questions. HIPAA-competent counsel reviews all individual notification letters before they are sent.

- **Media notification (45 CFR 164.406):** If the breach affects 500 or more residents of a single state or jurisdiction, Bloom provides notice to prominent media outlets serving that state or jurisdiction. Same 60-day ceiling. Same content requirements. Counsel drafts or reviews all media notifications.

- **HHS Secretary notification (45 CFR 164.408):** If the breach affects 500 or more individuals, Bloom notifies the HHS Secretary through the HHS breach portal without unreasonable delay, and in no case later than 60 calendar days from the date of discovery. If the breach affects fewer than 500 individuals, Bloom maintains a log of such breaches and submits the log to the HHS Secretary within 60 calendar days of the end of the calendar year in which the breaches were discovered.

- **Business associate notification (45 CFR 164.410):** If the breach was caused by a business associate, the business associate is required to notify Bloom (the covered entity) without unreasonable delay and no later than 60 calendar days from the date of discovery. Bloom monitors business associate compliance with this obligation.

**California-specific obligations:** California may impose additional or overlapping breach notification requirements under the following statutes. These citations are included for operational awareness and require validation by HIPAA-competent counsel before reliance:

- **California Health & Safety Code §1280.15** — requires clinics, health facilities, and certain other healthcare entities to report unauthorized access to patient medical information to the California Department of Public Health (CDPH) and affected patients within specific timelines. **PENDING COUNSEL VALIDATION:** Applicability to Bloom Metabolics as a telehealth MSO/PC structure; whether Bloom qualifies as a "clinic" or "health facility" under this statute; specific timeline and content requirements if applicable.

- **California Civil Code §1798.82** — California's general data breach notification statute requiring notification to California residents whose unencrypted personal information was, or is reasonably believed to have been, acquired by an unauthorized person. **PENDING COUNSEL VALIDATION:** Interaction with HIPAA breach notification (does HIPAA preempt, or do both apply?); specific content, timing, and California Attorney General notification requirements.

- **California Confidentiality of Medical Information Act (CMIA), Cal. Civ. Code §56 et seq.** — California's medical information confidentiality statute imposing obligations beyond HIPAA for the protection of medical information. **PENDING COUNSEL VALIDATION:** Whether CMIA breach provisions create separate notification obligations beyond HIPAA; specific penalties and enforcement mechanisms; applicability to the MSO/PC structure.

**Counsel engagement requirement.** HIPAA-competent counsel engagement is REQUIRED before any breach notification is sent — individual, media, or HHS Secretary. The MSO Owner does not send breach notifications without counsel review and approval. Counsel engagement is initiated upon the preliminary determination that a breach may have occurred, not after the formal determination is finalized.

**Records retention.** All privacy incident and HIPAA breach documentation — including the four-factor risk assessment, breach determination, notification letters, HHS portal submissions, California state notifications (if applicable), and counsel correspondence — is retained for a minimum of 6 years from the date of creation or last effective date per 45 CFR 164.530(j)(2).

**Large-breach escalation.** If a breach involves 500 or more individuals, the escalation pathway in §7.10 is activated in addition to the standard breach notification cascade. Large breaches require immediate HHS notification, media notification, and heightened coordination with counsel.

### 5.7 Documentation and AE Register

The AE Register is the single source of truth for all incidents processed under this SOP. Every incident — regardless of category, severity, or outcome — receives an AE Register entry. The AE Register is maintained by the MSO Owner and is access-controlled to authorized Bloom personnel only.

**Required fields for every AE Register entry:**

| Field | Description |
| --- | --- |
| Incident ID | Unique identifier assigned at intake (format: AE-YYYY-NNN, e.g., AE-2026-001) |
| Date discovered | Date the incident was first reported to or discovered by Bloom |
| Date occurred | Date the incident actually occurred (may differ from date discovered) |
| Patient identifier | OptiMantra patient ID; full name in access-controlled fields only |
| Category | Incident category: ADE, SAE, Sentinel, Medication Error, Fill Error, Injection-Related, Privacy Incident, HIPAA Breach, Diversion, Pharmacy Operational |
| Severity | Mild / Moderate / Severe (assigned by Covering Physician in §5.2) |
| Causality | Definite / Probable / Possible / Unlikely / Unrelated (assigned by Covering Physician in §5.2) |
| Reporter | Identity of the person who reported the incident (patient, pharmacy, provider, MSO staff, automated system) |
| Channel | Reporting channel (OptiMantra, phone, email, secure message, pharmacy notification, staff observation, automated trigger) |
| Narrative | Factual summary of the incident, including verbatim patient language where available |
| Medications involved | Medication name(s), dose(s), formulation(s), pharmacy source (Strive or compounding partner) |
| Physician assigned | Covering Physician (or designee if applicable) |
| Clinical response | Physician's clinical response: monitoring, dose adjustment, medication hold, discontinuation, referral, or combination |
| Operational response | MSO Owner's operational actions: pharmacy notification, carrier notification, HIPAA assessment, etc. |
| External notifications | Each notification sent, with date, recipient, method, and content summary: DfP/carrier, pharmacy partner, FDA MedWatch, HHS OCR, individual breach notification, media notification |
| Status | Open / Under Investigation / Pending Physician Review / Pending Notifications / Closed |
| Closure date | Date the incident was formally closed per the applicable closure criteria (§5.3, §5.4, or §5.5) |
| QIA links | Cross-references to any Quality Improvement Actions triggered by this incident |

**Location and system.** The AE Register is maintained in OptiMantra if OptiMantra's incident reporting and tracking capabilities are sufficient for the required fields and workflow. If OptiMantra's capabilities are insufficient, the AE Register is maintained in a supplementary system (secure spreadsheet, dedicated incident management tool, or equivalent) with cross-references to OptiMantra patient chart notes.

`[OPERATIONAL — PENDING MSO OWNER: Verify OptiMantra's incident reporting capability before launch. Specifically: (a) can OptiMantra support a custom incident register with all required fields listed above? (b) can OptiMantra support incident-to-chart-note cross-referencing? (c) can OptiMantra support access controls limiting AE Register visibility to authorized personnel? If OptiMantra is insufficient, document the supplementary system selected and the cross-reference workflow between the supplementary system and OptiMantra chart notes.]`

**Retention.** AE Register entries and all supporting documentation are retained for the longer of:
- 6 years from the date of creation or last effective date per 45 CFR 164.530(j)(2) (HIPAA documentation retention)
- 7 years from the date of the incident per California medical records retention requirements for adult patients
- 25 years from the date of the incident for incidents involving minors (California requirement; currently not applicable as Bloom serves adults 18+ only, but included for completeness)
- Any longer period required by litigation hold, regulatory investigation, or counsel direction

**Privileged entries.** AE Register entries for sentinel events and incidents under active counsel review may be designated as privileged (attorney-client privilege or attorney work product) at counsel's direction. Privileged entries are maintained in the AE Register but are access-restricted to the MSO Owner, the Covering Physician, and counsel. The MSO Owner coordinates privilege designations with counsel.

### 5.8 Patient Communication During AE Management

Patient communication during adverse event management follows a strict clinical/operational boundary: the Covering Physician leads all clinical content; MSO Intake Staff handles non-clinical logistics.

**Clinical communication — Covering Physician-led:**
- Clinical assessment findings (severity, causality)
- Treatment plan modifications (dose adjustment, medication hold, discontinuation, referral)
- Expected clinical course and follow-up plan
- Responses to patient questions about their medical condition, prognosis, or treatment options
- SAE and sentinel event communication with the patient and (with patient consent) family members

**Operational communication — MSO Intake Staff:**
- Receipt confirmation ("We have received your report and it has been logged")
- Scheduling logistics ("Dr. [Napolitano] would like to schedule a call with you — are you available [date/time]?")
- Non-clinical follow-up ("Your follow-up appointment is confirmed for [date/time]")
- Document collection ("We need [specific document] to complete your file")

MSO Intake Staff does NOT communicate: severity assessments, causality determinations, clinical plans, medication changes, or any information that constitutes clinical advice or clinical findings.

**Communication channels by severity:**

| Severity | Primary Channel | Secondary Channel | Notes |
| --- | --- | --- | --- |
| Mild | Secure message (OptiMantra or GHL) | — | Physician uses secure messaging for straightforward mild AE communication |
| Moderate | Secure message or scheduled phone call | Follow-up secure message documenting call content | Physician's discretion based on clinical complexity |
| Severe | Scheduled phone call | Follow-up secure message documenting call content | Phone call preferred for severe events to ensure patient comprehension and answer questions in real time |
| SAE | Scheduled phone call | Follow-up secure message documenting call | Phone call required. Family communication with patient consent. |
| Sentinel | Physician-initiated phone call | Follow-up secure message documenting call; potential in-person or video follow-up | Physician personally initiates contact. Family communication with patient consent. Counsel may review communication before delivery. |

**Documentation.** Every patient communication regarding an adverse event — regardless of channel — is documented in the patient's OptiMantra chart note with the date, time, channel, participants, and content summary. For phone calls, the Covering Physician (or MSO Intake Staff for logistical calls) documents a summary of the conversation within 24 hours.

**Post-resolution check-in.** The Covering Physician determines whether a post-resolution check-in is appropriate. Post-resolution check-ins are typically conducted for all SAEs and sentinel events and for moderate AEs where the clinical response involved medication hold or discontinuation. The check-in is documented in the patient's chart note and the AE Register.

### 5.9 Voluntary FDA MedWatch Reporting

Bloom Metabolics' FDA adverse event reporting posture is **voluntary** under 21 CFR 314.80 voluntary provisions for healthcare providers. This section establishes the operational framework for voluntary reporting decisions.

**Bloom is NOT a "user facility."** Under 21 CFR 803.3, a "user facility" is a hospital, ambulatory surgical facility, nursing home, or outpatient treatment or diagnostic facility (other than a physician's office). Bloom Metabolics — a telehealth MSO/PC that does not operate a physical treatment facility — is not a "user facility" and is not subject to mandatory medical device reporting under 21 CFR Part 803. Bloom's reporting obligations for drugs and biologics are limited to voluntary reporting under 21 CFR 314.80.

**Default reporting posture.** The default presumption established by §5.4 is that SAEs involving FDA-approved products prescribed under SOP-007 are voluntarily reported to the FDA via MedWatch unless the Covering Physician documents a specific reason not to file. This default is a quality and safety commitment, not a legal obligation.

`[CLINICAL — PENDING COVERING PHYSICIAN: Confirm or modify the default voluntary reporting posture. Specifically: (1) Define incident categories where voluntary reporting is automatic regardless of severity (e.g., all deaths regardless of causality; all hospitalizations regardless of causality). (2) Define categories where reporting is presumptively NOT filed unless specific criteria are met (e.g., mild AEs that are well-characterized labeled reactions). (3) Define the causality threshold for filing — are reports filed for all causality categories except "Unrelated," or only for "Definite," "Probable," and "Possible"? (4) Define whether compounded product AEs are reported through MedWatch in addition to pharmacy partner notification, or whether the pharmacy partner's own reporting is relied upon as sufficient. (5) Define any product-specific reporting rules (e.g., testosterone cypionate AEs always reported; GLP-1/GIP AEs reported only if meeting specific criteria).]`

**Reporting mechanism.** Voluntary reports are submitted on Form FDA 3500, distinguished from mandatory reports on Form FDA 3500A. The preferred submission method is electronic via the FDA MedWatch online portal. Paper submission is acceptable but electronic is preferred for tracking, confirmation receipt, and auditability.

**Timeline.** Voluntary FDA MedWatch reports are submitted within 15 business days of the Covering Physician's determination that a report is warranted. For urgent reports (death, life-threatening event), the timeline is compressed to as soon as practicable, with a target of 5 business days.

**Reporter identity.** The Covering Physician is the named reporter on all voluntary FDA MedWatch reports filed by Bloom Metabolics. The MSO Owner may prepare the report draft and handle submission logistics, but the Covering Physician reviews and approves the report content before submission and is identified as the healthcare professional reporter.

**Compounded product AEs.** For adverse events involving compounded products dispensed by the 503A/503B compounding partner, the compounding pharmacy has its own independent FDA reporting obligations. Bloom notifies the compounding partner per §5.10 and documents the notification. Bloom does not duplicate-file a voluntary MedWatch report for compounded products unless the Covering Physician determines that an additional voluntary report from the prescriber's perspective is appropriate — for example, when the compounding partner's report may not capture the full clinical picture visible to the prescriber.

**Documentation.** For every SAE and every incident where voluntary FDA reporting is considered, the AE Register entry documents: (a) whether a voluntary report was filed (yes/no); (b) if yes, the date filed, the method (electronic/paper), the MedWatch confirmation number, and the report content summary; (c) if no, the Covering Physician's documented rationale for not filing.

### 5.10 Pharmacy Partner Notification

When an adverse event, fill error, or pharmacy operational incident involves a product dispensed by one of Bloom's pharmacy partners, the MSO Owner notifies the pharmacy partner per the following procedures.

**Strive Pharmacy (FDA-approved products, including Schedule III testosterone cypionate):**
- **Timeline:** Within 48 hours of the Covering Physician's adverse event determination for AEs involving Strive-dispensed products. Immediately (within 4 hours) for sentinel events. Within 24 hours for fill errors reported to Bloom by patients.
- **Information shared:** Incident category, severity classification, de-identified narrative summary (patient name withheld unless Strive requires it for their own investigation and the patient has consented or HIPAA permits the disclosure for treatment/operations), product details (drug name, NDC, lot number if available, dose, formulation), dates of prescription, fill, and incident occurrence.
- **Method:** Secure email or phone call followed by written confirmation. The MSO Owner documents the notification in the AE Register.

**503A/503B Compounding Partner (compounded products):**
- **Timeline:** Within 48 hours of the Covering Physician's adverse event determination for AEs involving compounded products. Immediately (within 4 hours) for sentinel events. Within 24 hours for compounding errors or contamination concerns.
- **Information shared:** Same as Strive notifications, with additional emphasis on compounding-specific details (formulation, concentration, beyond-use date, lot number, compounding date if available).
- **Method:** Same as Strive notifications.

**Pharmacy partner obligations.** Pharmacy partners' internal incident response, FDA reporting, state board reporting, and DEA reporting obligations are independent of Bloom's. Bloom's notification obligation is to inform the pharmacy partner of the incident so that the pharmacy partner can fulfill its own obligations. Bloom does not direct the pharmacy partner's investigation or response.

**Notification log.** Every pharmacy partner notification is logged in the AE Register with the date, time, recipient (pharmacy name and contact person), method (email, phone, letter), and content summary. Confirmation of receipt from the pharmacy partner is documented when received.

### 5.11 Malpractice Carrier Notification

Malpractice carrier notification is required for any SAE, sentinel event, or incident with potential malpractice exposure. This section governs the notification process through Doctors for Providers (DfP), the retainer arrangement through which the Covering Physician's malpractice coverage is administered.

**Trigger criteria:**
- All SAEs (§5.4) — notified within 24 hours of SAE determination
- All sentinel events (§5.5) — notified within 4 hours of sentinel determination
- Any incident where the MSO Owner or Covering Physician identifies potential malpractice exposure — regardless of severity classification
- Any incident where the patient or patient's representative expresses dissatisfaction with care, mentions legal action, or retains counsel

**Routing through DfP.** Malpractice carrier notification for the Covering Physician's coverage is routed through the Doctors for Providers (DfP) retainer arrangement. The MSO Owner initiates the notification by contacting DfP per the retainer's notification procedures. DfP routes the notification to the appropriate carrier and facilitates the engagement of panel counsel if needed.

**MSO E&O coverage.** The MSO (Bloom Metabolics LLC) maintains separate errors and omissions (E&O) or general liability coverage for operational malpractice exposure (e.g., administrative errors, HIPAA breach-related liability, operational negligence). MSO E&O carrier notification follows the policy's specific procedures and timelines, which are separate from the DfP clinical malpractice notification.

`[OPERATIONAL — PENDING MSO OWNER: Confirm MSO E&O policy is in place before SOP-008 becomes operative. Document: (a) carrier name; (b) policy number; (c) notification procedures (phone, email, online portal); (d) policy-specific notification timelines; (e) whether the policy requires notification for all incidents or only incidents meeting specific criteria; (f) whether the policy provides panel counsel for HIPAA breach defense.]`

**Initial notification content.** The initial malpractice carrier notification is a factual summary that includes:
- Patient identifier (de-identified to the extent permitted by the carrier's requirements)
- Date of incident
- Incident category and severity
- Factual description of what occurred (no admission of liability, no legal conclusions, no speculative statements about causation)
- Current patient status
- Actions taken to date

**Counsel engagement.** When the malpractice carrier determines that counsel engagement is appropriate, counsel is engaged through the carrier's panel. Engaging carrier panel counsel (rather than independent counsel) avoids coverage disputes. All communications with counsel are privileged (attorney-client privilege). The MSO Owner coordinates logistics; the Covering Physician provides clinical information as requested by counsel.

**Documentation.** All malpractice carrier notifications, carrier acknowledgments, counsel engagement records, and counsel communications are documented in the AE Register (notification dates, recipients, and methods) and retained in a separate privileged file (substantive communications with counsel). The AE Register notation for carrier notification is factual only — "DfP notified [date], carrier acknowledged [date], counsel engaged [date]" — without privileged content.

### 5.12 Quality Improvement and Trending

Every adverse event processed under this SOP contributes to Bloom Metabolics' quality improvement program. The QI framework ensures that incidents are not merely documented and closed but are analyzed for patterns, root causes, and opportunities to prevent recurrence.

**Mandatory review triggers:**
- Every SAE triggers a documented review by the Covering Physician and MSO Owner within 14 calendar days of closure
- Every sentinel event triggers a full root cause analysis (§5.5) and a 90-day post-event review
- Every fill error triggers a documented review by the MSO Owner, with pharmacy partner corrective action follow-up

**Quarterly trending review.** The MSO Owner and Covering Physician conduct a quarterly trending review analyzing AE Register data for the preceding quarter. The quarterly review examines:

- Total incident volume by category
- Severity distribution (mild/moderate/severe)
- Causality distribution by product category
- Medication error types and frequency
- Fill error frequency by pharmacy partner
- Privacy incident and breach volume
- Time-to-closure by incident category
- Notification compliance (percentage of notifications sent within SLA timelines)
- QIA implementation status (percentage of QIAs implemented on schedule)

`[CLINICAL — PENDING COVERING PHYSICIAN: Define specific trending thresholds that trigger mandatory corrective action. For example: (a) N incidents of the same type within X weeks triggers an RCA regardless of individual severity; (b) N medication errors involving the same drug within X months triggers a prescribing protocol review; (c) any increase in SAE frequency above baseline triggers an immediate clinical review. Define the Covering Physician's expected role in the quarterly trending review — attending physician review of all data, or review of clinical subset only with MSO Owner handling operational trending? Define whether the quarterly review produces a written report or is documented as a meeting note.]`

**Corrective action types.** Quality improvement actions identified through individual incident review or quarterly trending may include:

- **SOP revision** — identified via the SOP-001 change process ([SOP-001 §5.13](../SOP-001-document-control/SOP-001-document-control.md))
- **Training update** — additional or refresher training for MSO Intake Staff, MSO Owner, or (at the Covering Physician's direction) clinical protocols
- **Vendor change** — pharmacy partner corrective action, alternative pharmacy evaluation, business associate agreement enforcement
- **Workflow change** — intake process modification, triage criteria adjustment, notification workflow optimization
- **System configuration** — OptiMantra alert configuration, automated trigger adjustment, access control modification
- **Clinical protocol adjustment** — at the Covering Physician's sole authority: dosing parameter changes, monitoring frequency changes, contraindication additions, prescribing protocol modifications via SOP-007 attachments

**QIA register.** A QIA register is maintained alongside the AE Register, with each QIA entry linked to the triggering incident(s). QIA entries include: QIA ID, triggering incident(s), corrective action description, responsible party, target completion date, actual completion date, outcome measurement, and effectiveness review date.

---

## 6. Documentation Requirements

The following table specifies the documentation requirements for each event type governed by this SOP. All documentation is maintained in OptiMantra (patient chart notes) and the AE Register (incident tracking). Where both locations apply, the chart note contains the clinical record and the AE Register contains the operational and tracking record, with cross-references between them.

| Event | Documentation | Location | Responsible Party | Timeline |
| --- | --- | --- | --- | --- |
| Incident received | Intake log: date, time, reporter, channel, narrative, preliminary category | AE Register | MSO Intake Staff or MSO Owner | At time of intake |
| Operational triage completed | Urgency tier assigned (Urgent/High/Standard), routing action taken | AE Register | MSO Intake Staff or MSO Owner | At time of triage |
| Severity & causality assessment | Severity classification, causality classification, clinical rationale for each, SAE/sentinel flag if applicable | OptiMantra chart note + AE Register cross-reference | Covering Physician | Per triage SLA (immediate/4 hrs/1 business day) |
| Clinical response determined | Treatment plan: monitoring, dose adjustment, hold, discontinuation, referral — with rationale | OptiMantra chart note + AE Register | Covering Physician | Concurrent with severity/causality assessment |
| Standard incident closed | Closure documentation: outcome, resolution, any residual monitoring plan | OptiMantra chart note + AE Register | Covering Physician (clinical) + MSO Owner (operational) | Upon meeting closure criteria (§5.3) |
| SAE handling activated | SAE flag, specific SAE criterion met, initial clinical narrative, notification plan | OptiMantra chart note + AE Register | Covering Physician (clinical) + MSO Owner (operational) | Within 24 hours of SAE determination |
| Sentinel event handling activated | Sentinel flag, specific criterion met, initial clinical narrative, milestone tracking sheet | OptiMantra chart note + AE Register | Covering Physician (clinical) + MSO Owner (operational) | Within 1 hour of sentinel determination |
| Privacy incident risk assessment | Four-factor risk assessment per 45 CFR 164.402, supporting facts for each factor | AE Register + separate privacy incident file | MSO Owner | Within 5 business days of discovery |
| HIPAA breach determination | Breach or no-breach determination, counsel concurrence, rationale | AE Register + separate privacy incident file | MSO Owner (factual assessment) + counsel (legal determination) | Within 10 business days of discovery |
| Patient notification sent (HIPAA breach) | Notification letter, date sent, method, recipients, content summary | AE Register + privacy incident file + patient chart note | MSO Owner (logistics) + counsel (review and approval) | Within 60 calendar days of breach discovery (45 CFR 164.404) |
| HHS Secretary notification | HHS portal submission confirmation, date, breach details submitted | AE Register + privacy incident file | MSO Owner | Immediate if 500+; annual log if fewer (45 CFR 164.408) |
| Pharmacy partner notification | Date, time, recipient, method, content summary, receipt confirmation | AE Register | MSO Owner | Per §5.10 timelines (48 hrs standard; 4 hrs sentinel) |
| Malpractice carrier notification | Date, time, DfP contact, carrier acknowledgment, counsel engagement status | AE Register (factual notation only; privileged content in separate file) | MSO Owner | 24 hrs for SAE; 4 hrs for sentinel (§5.11) |
| Voluntary FDA MedWatch report filed | Report filed (yes/no), date, method, MedWatch confirmation number, content summary; if not filed, physician's rationale | AE Register + OptiMantra chart note | Covering Physician (decision + approval) + MSO Owner (submission logistics) | Within 15 business days of physician determination (§5.9) |
| Patient communication during AE | Date, time, channel, participants, content summary | OptiMantra chart note | Covering Physician (clinical content) + MSO Intake Staff (logistical content) | Within 24 hours of each communication |
| Quality improvement action documented | QIA ID, triggering incident(s), corrective action, responsible party, timeline, outcome measure | QIA Register (linked to AE Register) | MSO Owner (documentation) + Covering Physician (clinical QIAs) | Within 14 days of incident closure |
| AE Register entry closure | Closure date, closure criteria met, final status, any open follow-up items | AE Register | MSO Owner (with Covering Physician sign-off for SAE/sentinel) | Upon meeting applicable closure criteria |
| Post-event 90-day review (sentinel) | Patient outcome, corrective action effectiveness, recurrence assessment, additional QIA needs | AE Register + QIA Register | Covering Physician + MSO Owner | 90 calendar days post-sentinel determination |

---

## 7. Escalation & Exception Handling

### 7.1 Contradictory Clinical Assessments

**Trigger:** The Covering Physician's severity or causality assessment for an adverse event is contradicted by an external provider (the patient's PCP, an emergency physician, or a specialist who independently evaluated the patient).

**Pathway:**
1. The MSO Owner documents both assessments in the AE Register.
2. The Covering Physician reviews the external assessment and documents a reconciliation note: whether the external assessment changes the Covering Physician's clinical determination and the rationale for either adopting or maintaining the original assessment.
3. If the external assessment suggests a higher severity than the Covering Physician's original assessment, the Covering Physician re-evaluates and, if warranted, upgrades the severity classification and activates the appropriate handling pathway (§5.4 or §5.5).
4. If the assessments remain contradictory after review, the Covering Physician's assessment governs Bloom's internal handling. The contradictory assessments are documented and available for review.

### 7.2 Patient Refuses to Allow AE Reporting

**Trigger:** A patient requests that Bloom not report an adverse event to the FDA, pharmacy partner, or other external party.

**Pathway:**
1. The Covering Physician explains to the patient that: (a) voluntary FDA MedWatch reporting does not include the patient's identity (reports can be submitted anonymously or with patient identity withheld); (b) pharmacy partner notifications may include limited product and clinical information but can be de-identified; (c) Bloom's internal documentation obligation (AE Register, chart note) is not subject to patient opt-out — Bloom is required to maintain accurate medical records.
2. If the patient continues to refuse external reporting after the Covering Physician's explanation, the Covering Physician documents the patient's refusal and rationale in the chart note.
3. The Covering Physician determines whether to file the voluntary FDA report without patient identifying information (which does not require patient consent) or to defer to the patient's wishes. The decision is documented.
4. Internal documentation (AE Register, chart note) proceeds regardless of the patient's reporting preferences.

### 7.3 Pharmacy Disputes Causality or Refuses to Acknowledge Fill Error

**Trigger:** A pharmacy partner (Strive or compounding partner) disputes that a fill error occurred, disputes causality between their product and the adverse event, or refuses to investigate.

**Pathway:**
1. The MSO Owner documents the pharmacy's response in the AE Register.
2. The MSO Owner escalates to the Covering Physician if the dispute involves clinical causality.
3. The Covering Physician's causality assessment governs Bloom's internal handling regardless of the pharmacy's position.
4. If the pharmacy refuses to investigate a fill error that Bloom has documented, the MSO Owner: (a) sends a formal written notification to the pharmacy documenting the reported error and requesting investigation; (b) documents the pharmacy's non-response; (c) evaluates whether the pharmacy's conduct warrants escalation to the MSO Owner for vendor relationship review.
5. Bloom's documentation, reporting, and patient communication obligations are fulfilled regardless of the pharmacy's response.

### 7.4 Unreachable Patient During AE Management

**Trigger:** The Covering Physician or MSO Intake Staff is unable to reach a patient during active AE management (no response to secure messages, phone calls, or emails for 48+ hours).

**Pathway:**
1. The MSO Intake Staff attempts contact through all available channels: OptiMantra secure message, GHL secure message, phone (with voicemail), and email.
2. After 48 hours of no response, the MSO Owner is notified.
3. After 72 hours, the MSO Owner sends a formal written communication (letter or certified email) documenting: the adverse event reported, the clinical follow-up recommended, the consequences of non-response, and Bloom's contact information.
4. The AE Register entry is updated to document all contact attempts and the patient's non-response.
5. If the AE is classified as SAE or sentinel, the MSO Owner escalates to the Covering Physician for a clinical determination of whether additional outreach measures are warranted (e.g., contacting the patient's emergency contact if one is on file and the patient consented to emergency contact use).
6. The incident remains open in the AE Register until the patient responds or the Covering Physician determines that continued outreach is not clinically productive.

### 7.5 Regulatory Inquiry (FDA, State Board, OCR)

**Trigger:** Bloom Metabolics receives a regulatory inquiry, investigation notice, or request for information from the FDA, California Medical Board, California Board of Pharmacy, HHS Office for Civil Rights (OCR), or any other regulatory body related to an adverse event or incident.

**Pathway:**
1. **DO NOT RESPOND** to the inquiry without counsel. No Bloom personnel — including the MSO Owner and the Covering Physician — provides substantive information to the regulatory body without counsel's review and guidance.
2. The MSO Owner acknowledges receipt of the inquiry (if a response deadline is stated) and states that Bloom will respond through counsel.
3. The MSO Owner engages counsel within 24 hours of receiving the inquiry. If the inquiry involves clinical malpractice exposure, counsel is engaged through the malpractice carrier's panel via DfP per §5.11. If the inquiry involves HIPAA/OCR, HIPAA-competent counsel is engaged.
4. The MSO Owner preserves all documents, records, and communications related to the inquiry. No documents are destroyed, modified, or moved after a regulatory inquiry is received.
5. Counsel directs the response. The MSO Owner and Covering Physician cooperate with counsel's requests for information and documentation.

### 7.6 Media Inquiry

**Trigger:** Bloom Metabolics receives a media inquiry (journalist, news outlet, social media reporter, blogger) related to a patient safety incident, adverse event, HIPAA breach, or any matter governed by this SOP.

**Pathway:**
1. **DO NOT RESPOND.** No Bloom Metabolics personnel — including the MSO Owner and the Covering Physician — speaks to media about any matter governed by this SOP without counsel's explicit approval and guidance.
2. The MSO Owner routes the media inquiry to counsel within 24 hours.
3. Counsel determines whether and how to respond. If counsel approves a response, counsel prepares or reviews the response before delivery.
4. The media inquiry and Bloom's response (or non-response) are documented in the AE Register if the inquiry relates to a specific incident.

### 7.7 Subpoena or Legal Process

**Trigger:** Bloom Metabolics receives a subpoena, court order, discovery request, or other legal process related to a patient, adverse event, or incident governed by this SOP.

**Pathway:**
1. **DO NOT RESPOND** to the legal process without counsel. Do not produce documents, provide testimony, or communicate with the requesting party's counsel without Bloom's own counsel's direction.
2. The MSO Owner notifies counsel within 24 hours of receiving the legal process. The malpractice carrier is notified via DfP if the legal process involves clinical malpractice exposure.
3. The MSO Owner preserves all documents, records, and communications within the scope of the legal process. No documents are destroyed, modified, or moved.
4. Counsel directs the response, including any objections, privilege assertions, or protective order requests.
5. HIPAA-protected records are not produced without counsel's confirmation that production is authorized under HIPAA's judicial and administrative proceeding exception (45 CFR 164.512(e)) or another applicable exception.

### 7.8 Physician Unavailable During Sentinel Event

**Trigger:** A sentinel event occurs and the Covering Physician (Dr. Michael Napolitano, MD) is unreachable within 1 hour.

**Pathway:**
1. The MSO Owner attempts all available contact channels for the Covering Physician: phone, text, secure message, email.
2. If the Covering Physician is unreachable within 1 hour, the MSO Owner contacts DfP to request backup physician coverage per the DfP retainer terms.
3. If a backup physician is available through DfP, that physician is briefed on the sentinel event and provides interim clinical guidance. All clinical decisions by the backup physician are documented.
4. If no backup physician is available through DfP and the patient is in immediate danger, the MSO Owner ensures the patient is directed to emergency services (911) or the nearest emergency department.
5. The MSO Owner documents all attempts to reach the Covering Physician and all interim actions taken.
6. The Covering Physician is briefed upon becoming available. The Covering Physician reviews all interim clinical decisions and documents concurrence or modification.

### 7.9 Discovery of Past Unreported Incident

**Trigger:** Bloom Metabolics discovers that an adverse event or incident occurred in the past but was not documented or reported under this SOP at the time of occurrence.

**Pathway:**
1. The MSO Owner creates a retroactive AE Register entry, documenting the date of occurrence, the date of discovery, and the reason the incident was not reported at the time.
2. The Covering Physician performs a retroactive severity and causality assessment if sufficient clinical information is available.
3. The MSO Owner assesses whether any external notifications (pharmacy partner, DfP, voluntary FDA report) are still warranted. For HIPAA breaches, the 60-day notification clock runs from the date of discovery (not the date of occurrence), so late-discovered breaches may still require timely notification.
4. The MSO Owner assesses the root cause of the reporting failure and documents a QIA to prevent recurrence.
5. Counsel is consulted if the unreported incident involves potential malpractice exposure, a HIPAA breach, or a regulatory reporting obligation.

### 7.10 HIPAA Breach Exceeding 500 Individuals

**Trigger:** A HIPAA breach is determined to affect 500 or more individuals.

**Pathway:**
1. HIPAA-competent counsel is engaged immediately if not already involved.
2. HHS Secretary notification is submitted through the HHS breach portal without unreasonable delay, and in no case later than 60 calendar days from the date of discovery (45 CFR 164.408). Note: for breaches of 500+, the notification to HHS is contemporaneous with individual notification — it is NOT deferred to the annual log.
3. Media notification is provided to prominent media outlets serving the state(s) where affected individuals reside, without unreasonable delay and no later than 60 calendar days from discovery (45 CFR 164.406).
4. Individual notification proceeds per §5.6.
5. The MSO Owner establishes a dedicated incident response team (at minimum: MSO Owner, Covering Physician, HIPAA counsel, and IT/security support as needed).
6. The MSO Owner prepares a breach response FAQ and designates a single point of contact for individual inquiries (typically a dedicated phone line or email address).
7. Counsel reviews all external communications (HHS notification, media notification, individual notification letters, FAQ, press statements) before release.
8. The MSO Owner documents all actions, timelines, and communications in a comprehensive breach response log retained alongside the AE Register entry.

---

## 8. Training & Competency

### 8.1 Covering Physician

The Covering Physician is presumed clinically competent in adverse event assessment, causality determination, and clinical management of adverse drug reactions by virtue of medical licensure, board certification, and ongoing continuing medical education. The Covering Physician's SOP-008 onboarding requirements are:

1. Review SOP-008 in full, including all attachments when populated.
2. Populate all `[CLINICAL — PENDING COVERING PHYSICIAN]` markers with clinically appropriate content.
3. Confirm access to the FDA MedWatch online reporting portal and ability to submit Form FDA 3500 electronically.
4. Review and approve the AE Register structure (§5.7) and confirm that the required fields support the clinical documentation needs.
5. Sign SOP-008 as Document Owner and Approving Authority.

### 8.2 MSO Owner

The MSO Owner (Brian DeGuzman, RN) completes the following training before SOP-008 becomes operative:

1. **AE Register operation** — creating entries, updating fields, cross-referencing to OptiMantra chart notes, generating reports, and maintaining access controls.
2. **Intake triage matrix** — applying the three-tier operational triage (Urgent/High/Standard) correctly. This is operational routing only — the MSO Owner does not perform clinical triage.
3. **Pharmacy partner notification procedures** — preparing and sending notifications per §5.10, documenting receipt confirmations, and following up on pharmacy corrective actions.
4. **DfP malpractice notification procedures** — initiating carrier notification through DfP, understanding the retainer terms, and coordinating counsel engagement.
5. **HIPAA breach four-factor risk assessment** — conducting the factual assessment per §5.6. The MSO Owner performs the factual analysis; the legal determination of breach vs. no-breach is counsel's responsibility.
6. **Counsel engagement procedures** — knowing when and how to engage HIPAA counsel, malpractice counsel (via DfP), and general counsel for the escalation scenarios in §7.

Training completion is documented with the date, training method (self-study of SOP-008, supervised walkthrough by counsel, or external training course), and the MSO Owner's self-attestation.

### 8.3 MSO Intake Staff

MSO Intake Staff completes the following training before performing AE intake functions:

1. **Intake logging** — collecting required intake fields, documenting verbatim patient language, and creating accurate AE Register entries.
2. **Three-tier operational triage** — correctly applying the Urgent/High/Standard criteria and routing to the appropriate queue within the specified SLAs.
3. **Routing to physician queue** — placing incidents in the Covering Physician's priority or standard queue in OptiMantra and sending appropriate notifications.
4. **AE Register data entry** — entering and updating AE Register fields accurately and completely.
5. **Patient communication boundaries** — understanding and strictly observing the boundary between permitted logistical communication and prohibited clinical communication. MSO Intake Staff does NOT communicate clinical content to patients under any circumstances.
6. **Escalation to MSO Owner** — recognizing situations that require immediate MSO Owner involvement (Urgent tier incidents, media inquiries, legal process, regulatory inquiries, any situation outside the intake staff's training).

Training completion is documented with the date, training method, and the MSO Intake Staff member's signed acknowledgment that they understand and will comply with the clinical/operational communication boundary.

### 8.4 Training Boundary

The following boundary statement is absolute and applies to all personnel at all times:

**The MSO Owner and MSO Intake Staff perform operational adverse event handling only.** This includes intake, logging, operational triage (routing by urgency), AE Register maintenance, pharmacy partner notification, malpractice carrier notification, HIPAA breach response coordination (factual assessment and logistics), and quality improvement tracking.

**Clinical adverse event assessment — including severity determination, causality determination, clinical response decisions, voluntary FDA reporting decisions, and physician-led patient communication — is the Covering Physician's exclusive authority.** No MSO personnel may perform, substitute for, or override the Covering Physician's clinical judgment at any point in the adverse event lifecycle. This boundary cannot be delegated, waived, or modified except by revision of this SOP through the [SOP-001](../SOP-001-document-control/SOP-001-document-control.md) change process with the Covering Physician's approval.

---

## 9. Compliance & Regulatory References

| Authority | Relevance to This SOP |
| --- | --- |
| **21 CFR 314.80** | Postmarketing reporting of adverse drug experiences. Voluntary provisions for healthcare providers are the basis for Bloom's voluntary MedWatch reporting posture (§5.9). Mandatory reporting provisions (§314.80(c)) apply to manufacturers, not healthcare providers. |
| **21 CFR 312.32** | IND safety reports. Referenced for the definition of Serious Adverse Event (SAE) used in §3 and throughout §5. The SAE criteria (death, life-threatening, hospitalization, persistent disability, congenital anomaly, other medically important) are adopted from this regulation. |
| **21 CFR Part 803** | Medical Device Reporting (MDR). Referenced for the definition of "user facility" (21 CFR 803.3). Bloom Metabolics is NOT a "user facility" and is not subject to mandatory device reporting. Included for definitional clarity and to document the basis for Bloom's voluntary-only reporting posture. |
| **21 U.S.C. 353a (Section 503A)** | Compounded drug pathway for traditional compounding pharmacies. Relevant to AE routing for compounded products dispensed by 503A compounding partners. Compounding partners have their own FDA adverse event reporting obligations under this section. |
| **21 U.S.C. 353b (Section 503B)** | Outsourcing facility compounding pathway. Relevant to AE routing for compounded products dispensed by 503B outsourcing facilities. 503B facilities have enhanced FDA reporting obligations including mandatory adverse event reporting. |
| **45 CFR 164.402** | Definition of "breach" under the HIPAA Breach Notification Rule. The four-factor risk assessment for determining whether a privacy incident constitutes a breach is codified in §5.6. |
| **45 CFR 164.404** | Individual notification requirements for HIPAA breaches. 60-day ceiling from date of discovery. Content requirements specified in §5.6. |
| **45 CFR 164.406** | Media notification requirements for HIPAA breaches affecting 500+ residents of a state or jurisdiction. Applicable when triggered per §5.6 and §7.10. |
| **45 CFR 164.408** | HHS Secretary notification requirements. Immediate for 500+ individual breaches; annual log for fewer than 500. Specified in §5.6 and §7.10. |
| **45 CFR 164.410** | Business associate breach notification to covered entity. 60-day ceiling. Referenced in §5.6 for business associate breach handling. |
| **45 CFR 164.412** | Law enforcement delay of breach notification. Allows delay of individual notification if law enforcement provides a written statement that notification would impede a criminal investigation or cause damage to national security. Referenced for completeness. |
| **45 CFR 164.414** | Administrative requirements and burden of proof for breach notification. The covered entity bears the burden of demonstrating that notification was not required (i.e., that the four-factor assessment demonstrates low probability of compromise). |
| **45 CFR 164.530(j)(2)** | HIPAA documentation retention requirement. All documentation required by the HIPAA Privacy Rule must be retained for 6 years from the date of creation or last effective date. Governs AE Register retention for privacy incidents and breaches. |
| **California Health & Safety Code §1280.15** | California clinic/healthcare facility breach notification to CDPH and affected patients. **PENDING COUNSEL VALIDATION** of applicability to Bloom's MSO/PC telehealth structure, specific timelines, and content requirements. |
| **California Civil Code §1798.82** | California general data breach notification statute. **PENDING COUNSEL VALIDATION** of interaction with HIPAA, specific requirements, and California AG notification thresholds. |
| **California CMIA, Cal. Civ. Code §56 et seq.** | California Confidentiality of Medical Information Act. **PENDING COUNSEL VALIDATION** of whether CMIA creates separate breach notification obligations beyond HIPAA, specific penalties, and applicability to MSO/PC structure. |
| **DEA 21 CFR 1301.76** | Security requirements for controlled substance registrants, including loss/theft reporting. Referenced for controlled substance diversion documentation. Bloom does not stock controlled substances; pharmacy-level DEA reporting is Strive's obligation. |
| **DEA Form 106** | Report of theft or loss of controlled substances. Referenced for pharmacy-level diversion reporting. Filed by Strive Pharmacy (not Bloom) for pharmacy-level loss/theft events. |
| **The Joint Commission Sentinel Event Policy** | Definitional reference for sentinel event classification (§3). Bloom Metabolics is not Joint Commission-accredited; the framework is adopted voluntarily as a quality standard. |
| **CTCAE v5.0 (Common Terminology Criteria for Adverse Events)** | Severity classification framework referenced in §3 and §5.2. Published by the National Cancer Institute; adapted for Bloom's hormone optimization and metabolic therapy context. |
| **WHO-UMC Causality Assessment System** | Causality classification framework referenced in §3 and §5.2. Published by the Uppsala Monitoring Centre. Provides the Definite/Probable/Possible/Unlikely/Unrelated categories. |
| **NCC MERP Index for Categorizing Medication Errors** | Medication error definition and severity index referenced in §3 and §5.3. Published by the National Coordinating Council for Medication Error Reporting and Prevention. Categories A through I classify errors from no error to error contributing to death. |
| **AUA Guidelines / Endocrine Society Clinical Practice Guidelines** | TRT-specific adverse event baselines: polycythemia monitoring thresholds, PSA monitoring intervals, cardiovascular risk assessment. Referenced as clinical context for testosterone-related AE assessment. |
| **FDA MedWatch Voluntary Reporting Program (Form FDA 3500)** | Voluntary adverse event submission mechanism for healthcare providers. Electronic submission via MedWatch online portal is preferred. Form FDA 3500 (voluntary) is distinguished from Form FDA 3500A (mandatory manufacturer reporting). |

---

## 10. Related Documents

### Upstream and Parallel SOPs

| SOP | Relationship to SOP-008 |
| --- | --- |
| [SOP-001 — Document Control & SOP Lifecycle Management](../SOP-001-document-control/SOP-001-document-control.md) | Governing SOP. All revisions to SOP-008 follow the SOP-001 change process. QIAs that result in SOP revisions are processed per SOP-001 §5.13. |
| [SOP-004 — Patient Self-Administration Injection Education](../SOP-004-injection-education/SOP-004-injection-education.md) | SOP-004 governs injection education; SOP-008 governs injection-related incidents when they occur. SOP-004 is the upstream prevention SOP; SOP-008 is the downstream incident response SOP. |
| [SOP-005 — Synchronous Telehealth Visit](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) | Synchronous encounters may surface adverse events during patient-physician interaction. SOP-005 governs the encounter workflow; SOP-008 governs adverse event handling when an AE is identified during a visit. |
| [SOP-006 — Lab Ordering & Review](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md) | Lab result anomalies (critically elevated hematocrit, PSA, liver function) may trigger AE assessment. SOP-006 governs the lab workflow; SOP-008 governs incident handling when a lab anomaly is determined to constitute an adverse event. |
| [SOP-007 — Prescribing Protocols](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md) | Primary upstream SOP. SOP-007 §5.8 (patient-reported symptom intake) is the main handoff point to SOP-008 when the Covering Physician determines a symptom constitutes an AE. SOP-007 §5.7 (dose adjustment) is the clinical response mechanism for dose-related AEs. SOP-007 §7.6 (patient-reported adverse effect escalation) routes to SOP-008 for formal AE documentation and handling. |

### Future SOPs Referenced in This Document

| Document | Relationship |
| --- | --- |
| Emergency & Mental Health Escalation SOP | Will govern mental health crisis response during treatment, which is out of scope for SOP-008. Until drafted, mental health crises are escalated to the Covering Physician and emergency services (911) where imminent danger exists. |
| Treatment Discontinuation & Tapering SOP | Will govern formal treatment discontinuation procedures when an AE requires permanent medication discontinuation. Until drafted, the Covering Physician determines the discontinuation approach case-by-case. |
| Records Retention & Destruction SOP | Will consolidate retention periods across all SOPs. AE Register retention is governed by §5.7 of this SOP until the Records Retention SOP is drafted. |
| HIPAA & PHI Handling SOP | Will govern comprehensive HIPAA compliance including BAA management, PHI access controls, and privacy program administration. §5.6 of this SOP governs HIPAA breach handling specifically. |
| Business Associate Management SOP | Will govern vendor HIPAA compliance and BAA tracking. Referenced in §2.2 (out of scope for non-HIPAA vendor compliance incidents). |
| Marketing & Advertising Compliance SOP | Will govern marketing compliance incidents. Referenced in §2.2 (out of scope). |
| Patient Communication Protocols SOP | Will govern standardized patient communication. §5.8 of this SOP governs AE-specific patient communication. |
| Identity Verification SOP | Will govern patient identity verification at scale. Referenced for completeness as part of the overall compliance architecture. |
| Controlled Substance Handling SOP | Will govern DEA compliance, CURES reporting, and controlled substance security. §2.1 of this SOP covers controlled substance diversion; the Controlled Substance Handling SOP will provide the broader framework. |

### Attachments (Pending — To Be Populated in Future Revisions)

| Attachment | Title | Status |
| --- | --- | --- |
| Attachment A | AE Intake Form and Triage Worksheet | Pending — operational template to be built |
| Attachment B | Severity and Causality Assessment Worksheet | Pending — requires Covering Physician clinical content |
| Attachment C | SAE Handling Checklist and Timeline Tracker | Pending — operational template to be built |
| Attachment D | Sentinel Event Response Checklist and Milestone Tracker | Pending — operational template to be built |
| Attachment E | HIPAA Breach Risk Assessment Worksheet | Pending — to be built in coordination with HIPAA counsel |
| Attachment F | Pharmacy Partner Notification Templates | Pending — operational templates to be built |
| Attachment G | Voluntary FDA MedWatch Reporting Workflow | Pending — requires Covering Physician clinical input on decision tree |

---

## 11. Revision History

| Version | Date | Author | Description of Change | Approver |
| --- | --- | --- | --- | --- |
| 0.2 | 2026-05-08 | Brian DeGuzman, RN (MSO Owner) — operational scaffolding | Initial draft. All 12 sections structurally complete. Governance sections (1-4, 6-12) fully drafted with no clinical markers. Section 5 (Procedure) contains `[CLINICAL — PENDING COVERING PHYSICIAN]` markers in subsections 5.2 (severity/causality criteria), 5.4 (voluntary FDA reporting default presumption), 5.9 (voluntary reporting clinical decision tree), and 5.12 (trending thresholds). Section 5.7 contains an `[OPERATIONAL — PENDING MSO OWNER]` marker for OptiMantra incident reporting capability verification. Section 5.11 contains an `[OPERATIONAL — PENDING MSO OWNER]` marker for MSO E&O policy confirmation. Section 5.6 (Privacy Incident & HIPAA Breach Handling) and Section 9 (Compliance References) include "pending counsel validation" annotations for California-specific statutory citations (Cal. H&S §1280.15, Cal. Civil Code §1798.82, CMIA). Attachments A through G listed as pending future revisions. Initial version designated v0.2 (not v0.1) to align with the post-physician-naming version state of the broader SOP system; the document is built with Dr. Napolitano named from the start. This SOP is a clinical SOP per SOP-001 §2.3; clinical content authority and final approval are the Covering Physician's responsibility. | Dr. Michael Napolitano, MD (signature pending) |

---

## 12. Approval & Signature

This SOP becomes effective only when signed by the Document Owner and Approving Authority below. Until the signature is present and the effective date is populated, this document is **DRAFT** and shall not govern operational practice.

This is a clinical SOP per [SOP-001 §2.3](../SOP-001-document-control/SOP-001-document-control.md). The Covering Physician serves as Document Owner and Approving Authority. The MSO Owner acknowledges operational responsibilities but does not approve clinical content.

---

**Document Owner & Approving Authority**

Name: Dr. Michael Napolitano, MD
Title: Covering Physician / Medical Director
DEA Registration: ___________________________________________
California Medical License: ___________________________________________
Signature: ___________________________________________
Date: _______________________________________________

---

**MSO Owner Acknowledgment**

By signing below, the MSO Owner acknowledges that: (a) the operational scaffolding in this SOP accurately reflects the MSO's intended operational procedures; (b) the MSO Owner understands and will comply with the clinical/operational boundary defined throughout this SOP; and (c) the MSO Owner will populate all `[OPERATIONAL — PENDING MSO OWNER]` markers before this SOP becomes operative.

Name: Brian DeGuzman
Title: MSO Owner / Registered Nurse
Signature: ___________________________________________
Date: _______________________________________________

---

**Acknowledgment of Receipt and Review**

By signing below, the personnel listed acknowledge they have read, understood, and agree to comply with this SOP.

| Name | Role | Signature | Date |
| --- | --- | --- | --- |
| Dr. Michael Napolitano, MD | Covering Physician / Medical Director |  |  |
| Brian DeGuzman | MSO Owner / Registered Nurse |  |  |
| | MSO Intake Staff |  |  |

---

*Bloom Metabolics — Confidential*
*This document is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md).*
