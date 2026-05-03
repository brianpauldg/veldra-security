# Attachment E — Handoff Payload Specification

**Parent Document:** [SOP-002 — Patient Intake Operations](../SOP-002-patient-intake-operations.md)

---

## Overview

This attachment defines the exact data payload delivered to the Covering Physician at the transition from SOP-002 (Patient Intake Operations) to [SOP-003 (Clinical Eligibility Screening)](../../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md). The handoff payload confirms that all operational gates have been passed and provides the structured summary the Covering Physician needs to begin clinical eligibility screening.

This specification must align with [SOP-003 §5.1](../../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) (Receipt of Handoff Payload). The two documents define opposite sides of the same interface.

---

## Handoff Trigger

The handoff is triggered when ALL of the following conditions are confirmed:

1. Clinical intake complete in OptiMantra (SOP-002 §5.5)
2. NPP, General Consent for Care, and HIPAA Authorization acknowledged (SOP-002 §5.6)
3. Payment complete in Corepay (SOP-002 §5.7)
4. Identity verification status: Verified (SOP-002 §5.8)
5. California residency confirmed (SOP-002 §5.3 and §5.8)
6. Age meets the applicable service-line minimum per SOP-003

Upon confirmation, the GHL pipeline transitions to "Ready for Clinical Review."

---

## Payload Fields

The following data elements constitute the handoff payload. The payload is presented to the Covering Physician as a structured summary within OptiMantra (either as a dedicated intake summary view or as a chart note in a standardized format).

### Section 1 — Patient Identification

| Field | Source | Value |
| --- | --- | --- |
| OptiMantra Patient ID | OptiMantra (auto-generated) | [Patient ID] |
| Legal First Name | Intake form → OptiMantra | [First Name] |
| Legal Last Name | Intake form → OptiMantra | [Last Name] |
| Preferred Name | Intake form → OptiMantra | [Preferred Name, if provided] |
| Date of Birth | Intake form → OptiMantra | [YYYY-MM-DD] |
| Age at Handoff | Calculated | [Age in years] |
| Email | Intake form → OptiMantra | [Email] |
| Phone | Intake form → OptiMantra | [Phone] |
| Mailing Address | Intake form → OptiMantra | [Full address, California] |

### Section 2 — Service Line

| Field | Source | Value |
| --- | --- | --- |
| Service Line of Interest | Intake form → OptiMantra | [TRT / GLP-1/GIP / Sexual Health / Longevity] |

### Section 3 — Operational Gate Confirmations

Each gate includes an MSO affirmation statement confirming the gate was passed, the date it was confirmed, and the staff member who confirmed it.

| Gate | Status | Confirmed By | Confirmed Date | Affirmation |
| --- | --- | --- | --- | --- |
| California Residency | Confirmed | [Reviewer Name] | [YYYY-MM-DD] | "California residency confirmed via [CA driver's license / CA state ID / passport + residency document]." |
| Age Minimum | Confirmed | System (auto-calculated) | [YYYY-MM-DD] | "Patient age [X] meets the SOP-003 minimum of [Y] for [Service Line]." |
| Identity Verification | Verified | [Reviewer Name] | [YYYY-MM-DD] | [Full reviewer affirmation statement per Attachment C, Step 8] |
| Payment | Complete | Corepay (webhook) | [YYYY-MM-DD] | "Corepay transaction [Transaction ID] confirmed on [Date] for $[Amount]." |
| Clinical Intake | Complete | OptiMantra (patient submission) | [YYYY-MM-DD] | "Patient completed clinical intake in OptiMantra on [Date]." |
| NPP Acknowledged | Confirmed | OptiMantra (electronic acknowledgment) | [YYYY-MM-DD HH:MM] | "Patient acknowledged Notice of Privacy Practices on [Timestamp]." |
| General Consent for Care | Confirmed | OptiMantra (electronic signature) | [YYYY-MM-DD HH:MM] | "Patient signed General Consent for Care on [Timestamp]." |
| HIPAA Authorization | Confirmed | OptiMantra (electronic signature) | [YYYY-MM-DD HH:MM] | "Patient signed HIPAA Authorization for Release of PHI on [Timestamp]." |

### Section 4 — Clinical Intake Reference

| Field | Value |
| --- | --- |
| Clinical Intake Location | OptiMantra patient record — [Patient ID] |
| Clinical Intake Completion Date | [YYYY-MM-DD] |
| Note to Physician | "The complete clinical intake (medical history, medications, allergies, labs, reason for treatment, and service-line-specific fields) is accessible directly in the patient's OptiMantra record. The MSO has not reviewed, summarized, or interpreted the clinical content." |

---

## MSO Boundary Statement

The handoff payload confirms operational gate passage only. The MSO has NOT:

- Reviewed the patient's medical history, medications, or allergies
- Assessed the patient's clinical eligibility for any service line
- Made any clinical judgment about the patient's suitability for treatment
- Summarized or interpreted the clinical intake content
- Communicated any clinical information to the patient beyond the scripted responses in [Attachment D](attachment-D-pre-intake-inquiry-scripts.md)

All clinical review, eligibility determination, and risk stratification are the sole responsibility of the Covering Physician under [SOP-003](../../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md).

---

## Payload Format

At launch, the handoff payload is compiled manually by the MSO Owner or trained intake staff as a structured chart note in OptiMantra using the field template above. When intake volume warrants, the payload generation may be automated via OptiMantra's workflow engine or via an n8n integration. Automation is a future operational enhancement and does not require a SOP revision unless the payload fields change.

---

*Bloom Metabolics — Confidential*
