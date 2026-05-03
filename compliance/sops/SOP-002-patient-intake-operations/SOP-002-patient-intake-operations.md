---
sop_id: "SOP-002"
title: "Patient Intake Operations"
version: "0.1"
status: "Draft"
effective_date: "TBD (pending approval)"
next_review_date: "12 months from effective date"
owner: "Brian DeGuzman, MSO Owner / Registered Nurse"
approver: "Brian DeGuzman, MSO Owner (operational SOP per SOP-001 §2.3)"
classification: "INTERNAL — OPERATIONAL USE ONLY"
---

# Patient Intake Operations

**SOP ID:** SOP-002
**Version:** 0.1
**Status:** Draft
**Effective Date:** TBD (pending approval)
**Next Scheduled Review:** 12 months from effective date
**Document Owner:** Brian DeGuzman, MSO Owner / Registered Nurse
**Approving Authority:** Brian DeGuzman, MSO Owner (operational SOP per SOP-001 §2.3)
**Classification:** INTERNAL — OPERATIONAL USE ONLY

---

## Notice

### Standing Notice

This Standard Operating Procedure is the property of Bloom Metabolics and is intended exclusively for use by authorized Bloom Metabolics personnel and agents. This document does not constitute medical, legal, or regulatory advice and does not replace individualized clinical judgment by the covering physician. All clinical decisions remain the responsibility of the licensed prescribing clinician.

This SOP is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md). No section of this document may be modified, distributed, or implemented outside the workflow defined therein.

### Status Notice

> This document is in DRAFT status. It has not been reviewed, approved, or signed and is NOT operative. No clinical or operational decision shall be made on the basis of this document in its current state.

---

## 1. Purpose

This SOP establishes the operational procedures by which prospective Bloom Metabolics patients move from website inquiry to a complete intake record ready for clinical eligibility screening (governed by [SOP-003 — Clinical Eligibility Screening](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md)). This SOP defines:

- The intake form structure and field requirements
- The data flow across the Bloom website, GoHighLevel (GHL), and OptiMantra
- The data classification rules separating marketing data from clinical/PHI data
- The identity verification workflow performed by MSO staff
- The hard California-residency eligibility gate
- The age-capture-and-gate mechanism (with thresholds set by SOP-003)
- The HIPAA Notice of Privacy Practices and General Consent for Care delivery and acknowledgment workflow
- The Corepay payment processing workflow
- The handoff payload from MSO operational intake to PC clinical eligibility screening
- The handling of pre-intake inquiries that may include clinical questions

This SOP does not establish clinical eligibility criteria, contraindications, or any clinical decision rule. All clinical content is governed by [SOP-003 (Clinical Eligibility Screening)](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md), which is owned by the Covering Physician. The MSO operates the operational gate; the PC sets the criteria the gate enforces.

---

## 2. Scope

### 2.1 In Scope

- Patient acquisition flow from website CTA through completed intake
- Data capture in the Bloom website intake form
- Data routing through GHL pipeline stages
- Data delivery to OptiMantra patient record
- Identity verification by MSO staff (manual government-ID review)
- Document delivery: Notice of Privacy Practices (NPP), General Consent for Care, HIPAA Authorization for Release of PHI
- Payment processing through Corepay
- The operational handoff to [SOP-003 (Clinical Eligibility Screening)](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md)
- Pre-intake inquiry handling (phone, email, web chat) where the inquiry has not yet completed intake
- New patient intake only — refills, renewals, and re-intakes are governed by future SOPs

### 2.2 Out of Scope

- Any clinical decision-making about whether a patient is eligible for a service line — governed by [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md)
- Contraindication review or risk stratification — governed by [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md)
- Service-line-specific informed consent — governed by [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) and individual clinical SOPs
- Lab ordering and review — governed by future Lab Ordering SOP
- Synchronous telehealth visits — governed by future Telehealth Visit SOP
- Prescribing decisions — governed by future Prescribing SOPs
- Patient acquisition marketing campaigns — governed by future Marketing & Advertising Compliance SOP
- Multi-state patient onboarding — California residents only at launch; geographic expansion is a documented major revision per SOP-001 §5.11.2

---

## 3. Definitions

**Intake Form**
The web-based form hosted on bloommetabolics.com through which prospective patients initiate the intake process. The form captures identity, contact, demographic, service line interest, and eligibility self-attestation data. Field specification is provided in [Attachment A](attachments/attachment-A-intake-form-field-specification.md).

**Lead**
A prospective patient who has submitted the intake form but has not yet completed all operational gates (clinical intake, payment, identity verification). Leads are tracked in GHL.

**Prospective Patient**
A lead who has completed all operational gates defined in this SOP and whose record has been handed off to [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) for clinical eligibility screening. The term "prospective patient" applies until the Covering Physician makes a proceed/decline/refer-out determination.

**Active Patient**
A prospective patient who has been approved by the Covering Physician under [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) and has completed at least one clinical telehealth visit. Active patients are governed by clinical SOPs beyond the scope of SOP-002.

**Eligibility Gate**
An operational checkpoint that must be passed before a lead can advance to the next pipeline stage. SOP-002 defines operational gates (California residency, age minimum, identity verification, payment). [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) defines clinical gates (contraindication review, risk stratification).

**California Residency**
Current residence in the state of California, verified by one of the following: (a) a California driver's license, (b) a California state identification card, or (c) a US passport accompanied by a California residency document (utility bill, residential lease agreement, or bank statement dated within 60 days). California residency is a hard operational gate — patients residing outside California are declined at intake.

**Identity Verification Review**
The manual review performed by MSO staff to confirm the prospective patient's identity. The standard requires: matching legal name across government ID, intake form, and payment method; a visible, non-expired government-issued photo ID; a visible photograph on the ID; and California issuance or accompanying California residency proof. The workflow is detailed in [Attachment C](attachments/attachment-C-id-verification-workflow.md).

**Handoff Payload**
The structured data summary delivered to the Covering Physician at the point of transition from SOP-002 to [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md). The payload confirms that all operational gates have been passed and provides the Covering Physician with the information needed to begin clinical eligibility screening. The specification is provided in [Attachment E](attachments/attachment-E-handoff-payload-specification.md).

**Pre-Intake Inquiry**
Any contact from a prospective patient (phone, email, web chat, social media) that occurs before the patient has completed the intake form. Pre-intake inquiries are handled with non-clinical scripted responses only, per [Attachment D](attachments/attachment-D-pre-intake-inquiry-scripts.md).

**Notice of Privacy Practices (NPP)**
The HIPAA-required document informing patients of how their protected health information (PHI) is used and disclosed. Delivered electronically through OptiMantra during clinical intake.

**General Consent for Care**
The patient's informed consent to receive telehealth medical services from Bloom Metabolics, including acknowledgment of the telehealth modality, its limitations, and the patient's rights. Delivered electronically through OptiMantra during clinical intake.

**GHL Pipeline Stage**
A named status within the GoHighLevel CRM that tracks a lead's progress through the intake process. Pipeline stages are defined in §5.4 of this SOP.

**OptiMantra Patient Record**
The clinical electronic health record maintained in OptiMantra for each patient. OptiMantra is the system of record for all clinical data, identity verification documentation, consent acknowledgments, and clinical decisions.

**Corepay Transaction Reference**
The unique identifier returned by Corepay upon successful payment processing. This reference is stored in OptiMantra as part of the patient record. No card data passes through Bloom Metabolics systems.

**Service Line**
A category of clinical services offered by Bloom Metabolics. Service lines at launch: Testosterone Replacement Therapy (TRT), GLP-1/GIP Weight Management (semaglutide, tirzepatide), Sexual Health (PT-141, tadalafil, sildenafil), and Longevity (NAD+, glutathione). Phentermine and peptide therapy are deferred pending DEA registration and LegitScript certification, respectively.

---

## 4. Roles & Responsibilities

| Role | Primary Responsibilities Under This SOP |
| --- | --- |
| **MSO Owner (Brian DeGuzman, RN)** | Approves SOP and revisions; conducts manual identity verification review at launch volume; manages GHL pipeline configuration; manages OptiMantra patient record creation workflow; serves as escalation point for pre-intake inquiries that approach clinical territory; maintains data classification matrix; sets and reviews operational SLAs |
| **MSO Intake Staff (future hire)** | Performs identity verification review under MSO Owner supervision; processes intake completions; handles pre-intake inquiries using approved scripts per [Attachment D](attachments/attachment-D-pre-intake-inquiry-scripts.md); routes inquiries that exceed scope to MSO Owner |
| **Covering Physician (PC)** | NO ROLE in SOP-002. Patient intake operations are MSO-owned per [SOP-001 §2.3](../SOP-001-document-control/SOP-001-document-control.md). The Covering Physician's role begins at [SOP-003 (Clinical Eligibility Screening)](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) after the SOP-002 handoff is complete. |
| **Prospective Patient** | Completes website intake form; completes OptiMantra clinical intake; uploads government ID; acknowledges NPP, General Consent for Care, and HIPAA Authorization; processes payment via Corepay; provides accurate information |

---

## 5. Procedure

### 5.1 Pre-Intake Inquiry Handling

All inquiries from prospective patients who have not yet completed intake are classified as pre-intake inquiries and are handled with non-clinical scripted responses only.

**Governing rule:** MSO staff and the MSO Owner do not provide clinical advice, clinical opinions, or representations about treatment efficacy or appropriateness. When in doubt, the response defers to the Medical Director and the completed intake process.

**Process:**

1. Identify the inquiry as pre-intake (patient has not yet submitted the intake form or has not completed all pipeline stages)
2. Classify the inquiry against the patterns in [Attachment D — Pre-Intake Inquiry Scripts](attachments/attachment-D-pre-intake-inquiry-scripts.md)
3. Respond using the approved script for the matching pattern
4. If no matching pattern exists, or if the inquiry approaches diagnosis, treatment recommendation, or specific medical advice, escalate to the MSO Owner
5. The MSO Owner evaluates whether the inquiry can be addressed with a conservative non-clinical response or must be deferred entirely to the completed intake process
6. Under no circumstances does MSO staff or the MSO Owner provide clinical advice prior to intake completion. The standard response for any ambiguous clinical inquiry is: "That's a clinical question that our Medical Director will address after reviewing your complete intake. Would you like me to send you the intake link?"

**Documentation:** Pre-intake inquiries are logged in GHL with: inquiry channel (phone/email/chat), inquiry category (from Attachment D), response provided, escalation (if any). No clinical content from the inquiry is logged in GHL. If the patient discloses clinical information during a pre-intake inquiry, the staff member does not record it in GHL and does not act on it.

### 5.2 Website Intake Form Submission

The intake process begins when a prospective patient submits the Bloom Metabolics website intake form hosted on bloommetabolics.com.

**Form structure:** The intake form fields are specified in [Attachment A — Intake Form Field Specification](attachments/attachment-A-intake-form-field-specification.md). The form captures:

- **Identity and contact:** Legal first name, legal last name, date of birth, email address, phone number, mailing address (street, city, state, ZIP)
- **Service line interest:** Which category of treatment the patient is exploring (TRT, GLP-1/GIP Weight Management, Sexual Health, Longevity)
- **Marketing attribution:** UTM source, UTM medium, UTM campaign, referral source (auto-captured, not patient-facing)
- **Eligibility self-attestation:** California residency confirmation (checkbox + state dropdown must equal California), age confirmation against service-line minimum
- **Initial routing context:** Brief selection of primary concern from a predefined dropdown list (e.g., "low energy/fatigue," "weight management," "sexual wellness," "general optimization") — this is used for pipeline routing only, NOT clinical history

**Data classification:** All form fields are classified per the data classification matrix in [Attachment B](attachments/attachment-B-data-classification-matrix.md). Contact and demographic data are mirrored to both GHL and OptiMantra. Marketing attribution data goes to GHL only. No clinical data is captured at this stage.

**Submission triggers:**
1. A new lead is created in GHL in the "Intake Started" pipeline stage
2. An automated email is sent to the patient with a secure link to the OptiMantra clinical intake portal
3. The GHL pipeline stage advances to "Intake Form Pending" when the automated email is delivered

### 5.3 California Residency Gate

The intake form includes a hard gate on California residency. This gate operates at form submission, before any payment is processed.

**Mechanism:**
1. The state dropdown field is required. Patient must select a state.
2. A separate California residency attestation checkbox is required: "I confirm that I currently reside in the state of California."
3. If the state dropdown does not equal "California" OR the attestation checkbox is not checked, the form submission is blocked with the message: "Bloom Metabolics currently provides telehealth services to California residents only. We are unable to proceed with your intake at this time. If you believe you have received this message in error, please contact us at [support email]."

**Logging:** If a non-California submission is attempted, the event is logged in GHL with reason code "Out of State — [State Selected]" and the lead is moved to the "Declined — Geographic Ineligibility" pipeline stage. No automated email is sent. No payment is collected.

**Note on future expansion:** Geographic expansion beyond California is a major revision per SOP-001 §5.11.2 and requires full re-review, updated regulatory citations, and potentially multi-state physician licensing arrangements.

### 5.4 GHL Pipeline Stages and Data Routing

The GHL pipeline tracks each lead's operational progress through intake. Pipeline stages are:

| Stage | Description | Entry Trigger | Exit Trigger |
| --- | --- | --- | --- |
| **Intake Started** | Form submitted; automated email queued | Website form submission | Automated email delivery confirmed |
| **Intake Form Pending** | Patient directed to OptiMantra clinical intake; not yet complete | Automated email delivered | OptiMantra webhook: clinical intake marked complete |
| **Intake Form Complete** | Clinical intake complete in OptiMantra; payment not yet processed | OptiMantra webhook | Payment link sent |
| **Payment Pending** | Payment link sent to patient via Corepay | Payment link generation | Corepay webhook: transaction confirmed |
| **Payment Complete** | Corepay transaction confirmed | Corepay webhook | ID upload prompt sent |
| **ID Verification Pending** | Patient has uploaded government ID; awaiting MSO staff review | ID upload detected in OptiMantra | MSO staff completes review |
| **ID Verified** | ID review passed; all operational gates cleared | MSO staff marks review complete | All gates confirmed; handoff triggered |
| **Ready for Clinical Review** | Handoff to [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) complete; this is the SOP-002 exit state | All operational gates confirmed | Covering Physician begins clinical review (SOP-003) |
| **Declined — [Reason]** | Terminal state; reason code from defined list | Any gate failure | None (terminal) |
| **Abandoned — [Reason]** | Terminal state; patient did not complete intake | Timeout thresholds exceeded | None (terminal) |

**Decline reason codes:** Geographic Ineligibility, Age Ineligibility, ID Verification Failed, Payment Failed (after retry exhaustion), Suspected Fraud, Patient Withdrew.

**Abandonment reason codes:** No OptiMantra Completion (30 days), No Payment (14 days), No ID Upload (14 days after payment).

**Data classification enforcement:** GHL custom fields are limited to: pipeline stage, stage transition timestamps, marketing attribution (UTM parameters, referral source, lead score), contact data (name, email, phone), service line interest, and decline/abandonment reason codes. NO clinical content (medical history, medications, allergies, reason for treatment, ID images, lab values) is stored in GHL. Clinical content resides in OptiMantra exclusively. The complete data classification matrix is in [Attachment B](attachments/attachment-B-data-classification-matrix.md).

### 5.5 OptiMantra Clinical Intake

After passing the California residency gate and completing the website form, the automated email directs the patient to a secure OptiMantra patient portal where they complete the full clinical intake.

**Portal characteristics:**
- OptiMantra-native patient portal with HTTPS encryption
- Patient creates an OptiMantra account or logs into an existing account
- All data entered in the portal is stored directly in OptiMantra — it does not pass through GHL

**Clinical intake content captured:**
- Complete medical history (current conditions, past conditions, hospitalizations, surgeries)
- Current medications (prescription, OTC, supplements) with dosages
- Allergies (drug, food, environmental) with reaction descriptions
- Surgical history
- Family medical history (first-degree relatives: cardiovascular disease, diabetes, cancer, thyroid disorders, blood disorders)
- Lifestyle factors (alcohol use, tobacco use, recreational drug use, exercise frequency, dietary patterns)
- Current labs (if available; patient may upload PDF lab reports)
- Reason for seeking treatment (free-text narrative)
- Service-line-specific intake fields as defined by the Covering Physician in [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md)
- Patient-completed consent acknowledgments (NPP, General Consent for Care, HIPAA Authorization)

**MSO boundary:** MSO staff do NOT review the clinical content entered in OptiMantra. The clinical intake content is reviewed by the Covering Physician under [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md). MSO staff interact with OptiMantra only for identity verification (§5.8), document acknowledgment verification (§5.6), and operational pipeline management.

**Completion trigger:** When the patient marks the clinical intake complete in OptiMantra, an automated webhook updates the GHL pipeline stage to "Intake Form Complete" and triggers the payment workflow (§5.7).

**Abandonment threshold:** If the clinical intake is not completed within 30 calendar days of the automated email, the lead is moved to "Abandoned — No OptiMantra Completion" in GHL. An automated reminder email is sent at day 7, day 14, and day 21.

### 5.6 Document Delivery and Acknowledgment

The following documents are delivered to the patient within OptiMantra as part of the clinical intake workflow. Patient must electronically acknowledge each document before clinical intake submission is permitted.

| Document | Regulatory Basis | Delivery Method | Acknowledgment Method |
| --- | --- | --- | --- |
| Notice of Privacy Practices (NPP) | HIPAA Privacy Rule, 45 CFR §164.520 | OptiMantra patient portal, presented inline | Electronic checkbox with timestamp |
| General Consent for Care | California Bus. & Prof. Code §2242 (telehealth); general medical consent | OptiMantra patient portal, presented inline | Electronic signature with timestamp |
| HIPAA Authorization for Release of PHI | HIPAA Privacy Rule, 45 CFR §164.508 | OptiMantra patient portal, presented inline | Electronic signature with timestamp |

**Verification:** The MSO Owner or intake staff confirms that all three acknowledgments are recorded in OptiMantra before advancing the pipeline. Acknowledgment timestamps are part of the handoff payload to [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md).

**Document versioning:** Current versions of the NPP, General Consent for Care, and HIPAA Authorization are maintained as controlled documents per [SOP-001](../SOP-001-document-control/SOP-001-document-control.md). When these documents are revised, the revision is reflected in the OptiMantra configuration and in this SOP's related documents list.

### 5.7 Payment Processing via Corepay

After clinical intake completion, the patient receives an automated Corepay payment link for the initial intake evaluation fee.

**Fee:** [MSO OWNER TO SET — placeholder $99] for initial clinical evaluation.

**Process:**
1. Upon clinical intake completion (GHL stage: "Intake Form Complete"), an automated payment link is generated via Corepay and delivered to the patient by email
2. Patient completes payment on Corepay's hosted payment page
3. No card data passes through Bloom Metabolics systems — Corepay is the payment processor and card data custodian
4. Corepay returns a transaction reference ID via webhook, which updates the GHL pipeline to "Payment Complete"
5. The transaction reference ID is recorded in OptiMantra as part of the patient record

**Payment failure handling:**
- **Declined transaction:** Patient is notified immediately by Corepay with instructions to retry or use a different payment method
- **24-hour retry:** Automated retry email sent by GHL with a fresh payment link
- **72-hour manual outreach:** MSO staff contacts patient by phone or email to resolve payment issue
- **14-day abandonment:** If no successful payment within 14 calendar days, the lead is moved to "Abandoned — No Payment" in GHL

**High-risk merchant processor considerations:** Corepay operates as a high-risk merchant processor commonly used in telehealth and hormone optimization. The MSO Owner maintains awareness of: extended hold periods on disbursements, stricter chargeback ratio thresholds, documentation requirements for chargeback disputes, and potential for account review or termination if chargeback ratios exceed Corepay's thresholds. Audit-ready transaction records are maintained for every intake payment to support any chargeback dispute.

**Refund policy:** Defined in the patient-facing Terms of Service (separate document). Refund processing follows Corepay's merchant procedures. This SOP does not define refund policy.

### 5.8 Identity Verification Review

After payment is complete, the patient is prompted within OptiMantra to upload a government-issued photo ID for identity verification.

**Acceptable identification documents:**
- California driver's license (preferred)
- California state identification card
- US passport accompanied by a separate California residency document (utility bill, residential lease agreement, or bank statement dated within 60 calendar days)

**Upload location:** All ID images are uploaded directly to OptiMantra. ID images are NEVER stored in GHL per the data classification matrix ([Attachment B](attachments/attachment-B-data-classification-matrix.md)).

**Manual review process (detailed in [Attachment C](attachments/attachment-C-id-verification-workflow.md)):**

1. Open the uploaded ID image in the patient's OptiMantra record
2. Confirm: ID is a government-issued photo identification document
3. Confirm: ID is non-expired (expiration date is on or after today's date)
4. Confirm: photograph is visible, legible, and consistent with a recent photograph of the patient (where a comparison image is available)
5. Confirm: legal name on ID matches the legal name on the intake form
6. Confirm: legal name on ID matches the name on the Corepay payment method (to the extent visible in the transaction record)
7. Confirm: California residency — the ID is California-issued, OR the patient has provided an accompanying California residency document
8. Document the review in OptiMantra: reviewer name, review date and time, outcome (Verified / Declined / Hold for Additional Information), and the reviewer affirmation statement: "I have reviewed the uploaded government identification for [Patient Name] and confirm that the identification is non-expired, the photograph is visible, the name matches the intake form and payment record, and California residency is confirmed. Review outcome: [Verified/Declined/Hold]."
9. Update the GHL pipeline to "ID Verified" or "Declined — ID Verification Failed" or hold in "ID Verification Pending" with a note

**Service level agreement:**
- Target: review completed within 1 business day of upload
- Maximum: 3 business days from upload
- Backlog exceeding 3 business days triggers escalation to MSO Owner for staffing review and interim direct processing by MSO Owner

**Escalation triggers:**
- Suspected fraudulent ID (altered images, inconsistent formatting, mismatched data)
- Expired ID with no alternative provided
- Name mismatch between ID and intake form or payment method
- Illegible or low-quality image that cannot be verified
- Non-US identification document
- Patient requests to use a third party's ID or payment method

All escalations are routed to the MSO Owner for second review. The patient is contacted for additional information using the language in [Attachment D](attachments/attachment-D-pre-intake-inquiry-scripts.md) (ID verification follow-up scripts).

**Volume threshold for SOP revision:** When sustained intake volume exceeds 50 identity verifications per week for 4 consecutive weeks, the MSO Owner must initiate a SOP revision to evaluate adding an automated identity verification tier (Stripe Identity, Persona, Veriff, or equivalent). This threshold is documented as a forward-looking operational constraint.

**Clinical-prerequisite significance:** This identity verification is the operational basis on which the Covering Physician relies for confirming patient identity prior to issuing prescriptions, including for any future controlled-substance prescribing under DEA Ryan Haight Act requirements (21 U.S.C. §829(e)). The rigor of this manual review is therefore a clinical-prerequisite gate, not merely a fraud-prevention measure. The Covering Physician (per [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md)) confirms identity verification status before completing the Good Faith Examination.

### 5.9 Handoff to SOP-003 (Clinical Eligibility Screening)

When all of the following conditions are confirmed:

1. Clinical intake complete in OptiMantra (§5.5)
2. NPP, General Consent for Care, and HIPAA Authorization acknowledged (§5.6)
3. Payment complete in Corepay (§5.7)
4. Identity verification status: Verified (§5.8)
5. California residency confirmed (§5.3 and §5.8)
6. Age meets the applicable service-line minimum as defined in [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md)

The GHL pipeline stage transitions to "Ready for Clinical Review." This transition is the formal handoff from SOP-002 (MSO operational) to [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) (PC clinical eligibility screening).

**Handoff payload:** The data delivered to the Covering Physician is specified in [Attachment E — Handoff Payload Specification](attachments/attachment-E-handoff-payload-specification.md). The payload includes:

- Patient identifier (OptiMantra patient ID)
- Verified legal name and contact information
- Service line of interest
- Identity verification outcome (Verified) with reviewer name, date, and affirmation statement
- California residency confirmation method (CA driver's license / CA state ID / passport + residency document)
- Date of birth and age, with confirmation that age meets the SOP-003 service-line minimum
- Reference to completed OptiMantra clinical intake (the Covering Physician accesses the clinical content directly in OptiMantra — the handoff payload does not duplicate clinical content)
- Acknowledgment confirmations with timestamps for: NPP, General Consent for Care, HIPAA Authorization
- Corepay transaction reference ID and payment date

**MSO boundary at handoff:** The MSO confirms that operational gates are passed. The MSO does NOT pre-screen, summarize, or interpret the clinical content in the OptiMantra intake. The Covering Physician evaluates the clinical content independently.

### 5.10 Decline Handling

If a prospective patient is declined at any operational gate, the decline is processed as follows:

1. The GHL pipeline is moved to the appropriate "Declined — [Reason]" terminal stage
2. The patient is notified using the approved decline language from [SOP-003 Attachment B — Decline and Refer-Out Language](../SOP-003-clinical-eligibility-screening/attachments/attachment-B-decline-and-refer-language.md) to ensure consistency between operational declines and clinical declines
3. Decline notification is sent via email from OptiMantra (not from GHL, to avoid marketing-system PHI exposure)
4. The decline reason, notification timestamp, and notification method are documented in OptiMantra
5. No clinical explanation is provided for operational declines (geographic, age, identity). The decline language acknowledges the gate that was not met without providing clinical commentary.

**Operational decline reasons and corresponding language:**
- Geographic ineligibility: "Bloom Metabolics currently provides telehealth services to California residents only. We are unable to offer services at this time."
- Age ineligibility: "Based on the information provided, you do not meet the minimum age requirement for the requested service. If you believe this is an error, please contact us."
- Identity verification failure (after escalation and second review): "We were unable to verify your identity from the documentation provided. Please contact us if you would like to resubmit identification."
- Payment failure (after retry exhaustion): "We were unable to process your payment. Your intake is on hold. Please contact us to resolve."

### 5.11 Documentation Requirements

For every patient intake processed under this SOP, the following documentation is generated and maintained:

**In OptiMantra (system of record):**
- Patient record with all clinical intake data
- Identity verification log entry (reviewer, timestamp, outcome, affirmation statement)
- Document acknowledgment records (NPP, General Consent, HIPAA Authorization) with timestamps
- Payment reference (Corepay transaction ID)
- Handoff trigger entry documenting the transition to "Ready for Clinical Review"
- Decline documentation (if applicable): reason, notification sent, timestamp

**In GHL (operational tracking only):**
- Pipeline stage history with timestamps for each transition
- Marketing attribution data (UTM source, medium, campaign, referral source)
- Contact data (name, email, phone)
- Service line interest
- Decline/abandonment reason codes
- NO clinical content, NO ID images, NO medical history, NO payment card data

**In Corepay:**
- Transaction record with patient name, amount, date, and transaction reference ID
- Chargeback documentation (if applicable)

---

## 6. Documentation Requirements

The documentation requirements for individual intake processing are defined in §5.11. At the SOP level, the following documentation is maintained:

| Event | Documentation Required | Location |
| --- | --- | --- |
| SOP approved or revised | Master index update; revision history entry | `compliance/master-index.md`; this SOP §11 |
| GHL pipeline configuration change | Configuration change log with before/after | GHL admin; referenced in this SOP's revision log |
| OptiMantra intake form modification | Form change log; SOP revision if field changes affect data classification | OptiMantra admin; referenced in this SOP's revision log |
| Data classification matrix update | [Attachment B](attachments/attachment-B-data-classification-matrix.md) revision; SOP minor or major revision per SOP-001 §5.11 | This SOP's attachments directory |
| Intake volume threshold reached (50/week) | Written assessment of automated verification need | This SOP's revision log |

---

## 7. Escalation & Exception Handling

### 7.1 Identity Verification Uncertainty

When MSO staff are uncertain about an identity verification outcome, the escalation path is:

1. Staff places the pipeline in "ID Verification Pending" with a hold note describing the uncertainty
2. Staff escalates to MSO Owner within 1 business day
3. MSO Owner conducts second review and makes a determination: Verified, Declined, or Request Additional Information
4. If requesting additional information, the patient is contacted using the language in [Attachment D](attachments/attachment-D-pre-intake-inquiry-scripts.md) (ID verification follow-up section)
5. If the patient does not respond within 7 calendar days, the lead is moved to "Abandoned — No ID Response"

### 7.2 Payment Processing Issues

- **Corepay system outage:** Intake pipeline pauses at "Intake Form Complete" until Corepay service is restored. Patient is notified that payment processing is temporarily delayed. No manual payment workaround is authorized.
- **Chargeback received:** MSO Owner reviews transaction record, patient communication history, and intake documentation. Chargeback response is prepared within Corepay's dispute window using audit-ready records maintained per §5.7.
- **Suspected fraudulent payment:** Pipeline is held. MSO Owner reviews. If fraud is confirmed, the lead is moved to "Declined — Suspected Fraud" and the patient record is flagged in OptiMantra.

### 7.3 Inconsistent Patient Information

If information provided across systems (website form, OptiMantra, Corepay, ID) is inconsistent:

1. Pipeline is held at the stage where the inconsistency is detected
2. MSO Owner reviews the inconsistency
3. Patient is contacted for clarification using non-clinical language
4. If the inconsistency is resolved (e.g., typo, legal name vs. preferred name), the resolution is documented in OptiMantra and the pipeline resumes
5. If the inconsistency cannot be resolved or suggests fraud, the lead is moved to "Declined — Suspected Fraud"

### 7.4 Pre-Intake Inquiry Approaching Clinical Territory

When a pre-intake inquiry exceeds the scripted responses in [Attachment D](attachments/attachment-D-pre-intake-inquiry-scripts.md):

1. Staff defers to the standard clinical-deferral response: "That's a clinical question that our Medical Director will address after reviewing your complete intake."
2. Staff escalates to MSO Owner
3. MSO Owner evaluates whether any non-clinical response is appropriate or whether the inquiry must be fully deferred
4. Under no circumstances is a clinical response provided. If the inquiry reveals an urgent medical situation (patient reports active chest pain, suicidal ideation, or other emergent symptoms), the staff member instructs the patient to call 911 or go to the nearest emergency department immediately. This is a safety response, not a clinical response.

### 7.5 System Outage

| System | Impact | Response |
| --- | --- | --- |
| Bloom website | Intake form unavailable | No workaround; patients are directed to retry when the site is restored |
| GHL | Pipeline tracking unavailable | Intake processing pauses; OptiMantra intake may continue but handoff is held until GHL is restored |
| OptiMantra | Clinical intake unavailable | Intake processing pauses; patients are notified of delay; no alternative intake method is authorized |
| Corepay | Payment processing unavailable | Pipeline pauses at "Intake Form Complete"; patients are notified; no alternative payment method is authorized |

For any outage exceeding 4 hours during business hours, the MSO Owner documents the outage, impact, and resolution in the SOP revision log.

### 7.6 Suspected Fraudulent Intake

If patterns suggest fraudulent intake activity (multiple intakes with similar data, use of known fraud indicators, inconsistent identity documents):

1. All affected pipelines are held immediately
2. MSO Owner reviews within 1 business day
3. If fraud is confirmed or strongly suspected, affected leads are moved to "Declined — Suspected Fraud"
4. Patient records in OptiMantra are flagged
5. If the pattern suggests a coordinated attack (e.g., bot submissions), the MSO Owner implements technical countermeasures (CAPTCHA, rate limiting) and documents the incident

---

## 8. Training & Competency

### 8.1 Required Training

All MSO staff performing intake operations must complete training on:

1. This SOP (complete reading and signed acknowledgment)
2. The data classification matrix — [Attachment B](attachments/attachment-B-data-classification-matrix.md)
3. The identity verification workflow — [Attachment C](attachments/attachment-C-id-verification-workflow.md)
4. The pre-intake inquiry scripts — [Attachment D](attachments/attachment-D-pre-intake-inquiry-scripts.md)
5. The OptiMantra patient intake interface (operational functions only; staff do not access clinical content)
6. The GHL pipeline configuration and stage management
7. HIPAA Privacy and Security Rule basics as applicable to the data handling in this SOP

### 8.2 Competency Demonstration

Competency is demonstrated by:
- Reading this SOP and all four attachments
- Signing the Acknowledgment of Receipt
- Completing 5 supervised intake processings (from form submission through handoff) with the MSO Owner observing and verifying correct execution of: data classification compliance, ID verification procedure, pre-intake inquiry handling, and pipeline stage management
- After 5 supervised processings, the MSO Owner certifies the staff member as competent to perform solo intakes

### 8.3 Ongoing Competency

- Quarterly review of the pre-intake inquiry scripts to incorporate new inquiry patterns encountered in practice
- Annual re-acknowledgment of this SOP and the data classification matrix
- Immediate re-training triggered by any data classification violation (clinical data appearing in GHL) or ID verification error

---

## 9. Compliance & Regulatory References

| Standard / Regulation | Relevance to Patient Intake Operations |
| --- | --- |
| **HIPAA Privacy Rule (45 CFR Part 164, Subpart E)** | Governs the Notice of Privacy Practices delivery, patient authorization for PHI release, and the data classification rules separating GHL (marketing) from OptiMantra (clinical) |
| **HIPAA Security Rule (45 CFR Part 164, Subpart C)** | Governs the technical and administrative safeguards for electronic PHI in OptiMantra, including access controls on clinical intake data and ID verification documents |
| **California Confidentiality of Medical Information Act (Cal. Civ. Code §56 et seq.)** | California-specific medical information confidentiality law imposing obligations beyond HIPAA; applies to all patient data handled in this SOP |
| **California Information Practices Act (Cal. Civ. Code §1798 et seq.)** | California general data privacy statute applicable to personal information collected during intake |
| **California Bus. & Prof. Code §2242 et seq.** | Telehealth practice standards; grounds the General Consent for Care requirement and the California residency gate |
| **DEA Ryan Haight Act (21 U.S.C. §829(e))** | Requires identity verification and a valid prescriber-patient relationship before controlled substance prescribing; the identity verification in §5.8 provides the operational foundation for this requirement |
| **FTC Health Breach Notification Rule (16 CFR Part 318)** | Applicable to non-HIPAA-covered health data; relevant if any patient health data were to reside outside OptiMantra's HIPAA-covered environment (reinforces the data classification rule) |
| **California Consumer Protection Statutes** | Applicable to cash-pay healthcare pricing, refund practices, and representations made during the intake process |

---

## 10. Related Documents

- [SOP-001 — Document Control & SOP Lifecycle Management](../SOP-001-document-control/SOP-001-document-control.md)
- [SOP-003 — Clinical Eligibility Screening](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) — coupled SOP, simultaneously developed
- [Attachment A — Intake Form Field Specification](attachments/attachment-A-intake-form-field-specification.md)
- [Attachment B — Data Classification Matrix](attachments/attachment-B-data-classification-matrix.md)
- [Attachment C — ID Verification Workflow](attachments/attachment-C-id-verification-workflow.md)
- [Attachment D — Pre-Intake Inquiry Scripts](attachments/attachment-D-pre-intake-inquiry-scripts.md)
- [Attachment E — Handoff Payload Specification](attachments/attachment-E-handoff-payload-specification.md)
- Patient-facing forms: Notice of Privacy Practices, General Consent for Care, HIPAA Authorization for Release of PHI (maintained as controlled documents per SOP-001)
- Future SOPs: Synchronous Telehealth Visit, Prescribing Protocols (TRT, GLP-1/GIP, Sexual Health, Longevity), Refill & Renewal, Treatment Discontinuation

---

## 11. Revision History

| Version | Date | Author | Description of Change | Approver |
| --- | --- | --- | --- | --- |
| 0.1 | 2026-05-03 | Brian DeGuzman | Initial draft. SOP-002 is an operational SOP per SOP-001 §2.3 and is approved by the MSO Owner. Coupled with SOP-003 (Clinical Eligibility Screening) which is PC-owned and pending Covering Physician assignment. | Brian DeGuzman, MSO Owner |

---

## 12. Approval & Signature

This SOP becomes effective only when signed by the document owner and approving authority below. Until both signatures are present and the effective date is populated, this document is **DRAFT** and shall not govern operational practice.

For operational SOPs per [SOP-001 §2.3](../SOP-001-document-control/SOP-001-document-control.md), the Document Owner and Approving Authority may be the same individual (the MSO Owner).

---

**Document Owner & Approving Authority**

Name: Brian DeGuzman
Title: MSO Owner / Registered Nurse
Signature: ___________________________________________
Date: _______________________________________________

---

**Acknowledgment of Receipt and Review**

By signing below, the personnel listed acknowledge they have read, understood, and agree to comply with this SOP.

| Name | Role | Signature | Date |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

---

*Bloom Metabolics — Confidential*
*This document is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md).*
