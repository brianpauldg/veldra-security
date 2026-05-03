# Attachment C — Identity Verification Workflow

**Parent Document:** [SOP-002 — Patient Intake Operations](../SOP-002-patient-intake-operations.md)

---

## Overview

This attachment provides the step-by-step workflow for manual identity verification of prospective Bloom Metabolics patients. This workflow is performed by the MSO Owner or trained MSO Intake Staff after payment completion and ID upload.

Identity verification serves dual purposes: (1) fraud prevention for operational integrity, and (2) a clinical-prerequisite gate upon which the Covering Physician relies for confirming patient identity prior to the Good Faith Examination and any future controlled-substance prescribing under DEA Ryan Haight Act requirements.

---

## Prerequisites

Before beginning an identity verification review, confirm:
- The patient's GHL pipeline stage is "ID Verification Pending"
- Payment has been confirmed (pipeline passed through "Payment Complete")
- The patient has uploaded at least one identification document in OptiMantra

---

## Acceptable Identification Documents

| Document Type | Acceptable Alone? | Notes |
| --- | --- | --- |
| California Driver's License | YES | Preferred; confirms identity + California residency in a single document |
| California State Identification Card | YES | Confirms identity + California residency |
| US Passport | NO — requires accompanying California residency document | Confirms identity only; does not confirm California residency |
| US Military ID | NO — requires accompanying California residency document | Confirms identity only |
| Other US state driver's license or ID | NO | Does not confirm California residency; patient must provide California residency document |
| Foreign passport or ID | NO | Not accepted at launch; future SOP revision may address |

**Acceptable California residency documents (when required):**
- Utility bill (electric, gas, water, internet) dated within 60 calendar days, showing California address
- Residential lease agreement showing California address and current date coverage
- Bank or credit union statement dated within 60 calendar days, showing California address

---

## Verification Steps

### Step 1 — Access the Uploaded Document

1. Log in to OptiMantra
2. Navigate to the patient's record
3. Open the uploaded identification document(s) in the Documents section
4. Verify that the image is legible — if the image is too dark, blurry, cropped, or otherwise unreadable, proceed to Escalation (below)

### Step 2 — Verify Document Type

Confirm that the uploaded document is one of the acceptable identification types listed above. If the document is not acceptable (e.g., expired credit card, student ID, non-government document), proceed to Escalation.

### Step 3 — Verify Expiration

Check the expiration date on the ID. The ID must be non-expired as of the date of review. If the ID is expired, proceed to Escalation.

### Step 4 — Verify Photograph

Confirm that a photograph is visible on the ID. The photograph should be consistent with a reasonable expectation of the patient's appearance. If no photograph is present (e.g., the photo section is obscured) or the photograph appears inconsistent with expectations, proceed to Escalation.

Note: At launch, there is no secondary photograph for comparison (e.g., selfie verification). The reviewer confirms only that a photograph is present and visible on the ID. Automated selfie-matching may be added in a future SOP revision.

### Step 5 — Verify Name Match — Intake Form

Compare the legal name on the ID to the legal first name and legal last name fields on the intake form (visible in OptiMantra).

- Exact match: proceed
- Minor variation (e.g., "Robert" on ID vs. "Rob" on form, or "Smith-Jones" vs. "Smith Jones"): note the variation and proceed if the reviewer is confident the names refer to the same individual
- Significant mismatch (different first name, different last name): proceed to Escalation

### Step 6 — Verify Name Match — Payment Method

Compare the legal name on the ID to the name associated with the Corepay transaction (visible in the transaction reference record in OptiMantra).

- Match or close match: proceed
- Mismatch: proceed to Escalation. A common reason is that the patient paid with a spouse's or family member's card. This is not automatically disqualifying but requires escalation and documentation.

### Step 7 — Verify California Residency

- If the ID is a California driver's license or California state ID: California residency is confirmed by the ID itself
- If the ID is a US passport or other non-California ID: verify that the patient has uploaded an accompanying California residency document (utility bill, lease, or bank statement within 60 days). Confirm the name on the residency document matches the ID and that the address is in California.
- If California residency cannot be confirmed: proceed to Escalation

### Step 8 — Document the Review

Enter the following in the OptiMantra patient record (in the designated ID Verification section or as a chart note):

**Reviewer affirmation statement:**

> "I, [Reviewer Name], have reviewed the uploaded government identification for [Patient Legal Name] on [Date, YYYY-MM-DD] at [Time, HH:MM]. The identification is a [Document Type], is non-expired (expiration: [Expiration Date]), the photograph is visible, the name matches the intake form and payment record, and California residency is confirmed via [CA-issued ID / accompanying residency document: type and date]. Review outcome: [Verified / Declined / Hold for Additional Information]."

### Step 9 — Update Pipeline

- **Verified:** Update GHL pipeline to "ID Verified"
- **Declined:** Update GHL pipeline to "Declined — ID Verification Failed" and initiate decline notification per SOP-002 §5.10
- **Hold:** GHL pipeline remains at "ID Verification Pending" with a hold note; patient is contacted for additional information

---

## Escalation Triggers and Procedures

| Trigger | Action |
| --- | --- |
| Illegible or low-quality image | Contact patient requesting re-upload; hold pipeline; if no response within 7 days, abandon |
| Expired ID | Contact patient requesting current ID; hold pipeline; if no response within 7 days, abandon |
| Name mismatch (ID vs. intake form) | Escalate to MSO Owner; patient contacted for clarification; document resolution |
| Name mismatch (ID vs. payment method) | Escalate to MSO Owner; may indicate third-party payment; document rationale if approved |
| Suspected altered or fraudulent ID | Immediate escalation to MSO Owner; DO NOT contact patient until MSO Owner reviews; if fraud confirmed, decline and flag record |
| Non-US identification | Decline at launch; document; future SOP revision may address international patients |
| California residency not confirmable | Contact patient requesting residency documentation; hold pipeline; if not provided within 7 days, decline |
| Patient requests use of third party's ID | Decline; the patient's own government ID is required |

---

## Common Red Flags

The following patterns may indicate fraudulent identification and warrant immediate escalation to the MSO Owner:

- Image appears digitally altered (inconsistent fonts, misaligned text, visible editing artifacts)
- ID format does not match the issuing state's known format
- Multiple patients uploading IDs with sequential ID numbers
- ID photograph appears to be a photograph of a screen rather than a physical document
- Patient's stated date of birth does not match the date of birth on the ID
- Address on ID does not match the mailing address on the intake form (not automatically disqualifying but warrants review)

---

## Record Retention

- The uploaded ID image is retained in OptiMantra as part of the patient record
- The reviewer affirmation statement is retained as part of the patient record
- Both are subject to the retention requirements in [Attachment B](attachment-B-data-classification-matrix.md) (minimum 7 years)
- ID images are NEVER copied to GHL, email, shared drives, or any system outside OptiMantra

---

*Bloom Metabolics — Confidential*
