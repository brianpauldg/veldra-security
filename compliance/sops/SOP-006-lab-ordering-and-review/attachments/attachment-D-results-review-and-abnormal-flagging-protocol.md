# Attachment D — Results Review and Abnormal Flagging Protocol

**Parent Document:** [SOP-006 — Lab Ordering & Review](../SOP-006-lab-ordering-and-review.md)
**Ownership:** Hybrid — Operational workflow (MSO Owner); Clinical SLAs and interpretation (Covering Physician)

---

## Overview

This attachment defines the end-to-end workflow for lab results review, from delivery to OptiMantra through physician acknowledgment and clinical action. It establishes the operational mechanics of results routing and the clinical response time expectations for different result severity levels.

---

## 1. Results Delivery Verification

Upon LabCorp results delivery to OptiMantra (electronic or manual upload):

1. The MSO Owner or MSO Intake Staff verifies that the results are correctly associated with the patient record
2. Verifies that all ordered tests are present in the results (partial results are flagged)
3. If results are incomplete: contact LabCorp to determine status of pending tests; notify the Covering Physician that partial results are available with an expected completion date for the remainder
4. Update the patient's GHL pipeline state if applicable (e.g., "Pre-Visit Labs Available")

---

## 2. Physician Notification

1. OptiMantra generates an automatic notification to the Covering Physician when results are available
2. The MSO Owner verifies that the notification was generated (check OptiMantra notification log)
3. If the automatic notification system is unavailable, the MSO Owner sends a manual notification to the Covering Physician via secure email: "Lab results available for [Patient Name], OptiMantra ID [ID], ordered [date]."

---

## 3. Result Severity Classification

Results are classified into three severity levels. The classification determines the review SLA and communication pathway.

| Severity | Definition | Review SLA | Communication Pathway |
| --- | --- | --- | --- |
| **Critical** | Values flagged by LabCorp as critical per their critical value notification protocol; values posing immediate health risk | Physician notification within 1 business hour of delivery; physician acknowledgment within 4 business hours | LabCorp contacts physician directly (phone); physician contacts patient directly (phone) within 1 business day |
| **Abnormal** | Values outside the lab's reference range; values outside service-line-specific clinical thresholds that require physician assessment | Physician acknowledgment within 1 business day | Physician reviews and determines communication pathway: portal message for non-actionable, direct contact for actionable |
| **Normal** | All values within reference range | Physician acknowledgment within 3 business days | Patient notified via OptiMantra portal (operational communication) |

`[CLINICAL — PENDING COVERING PHYSICIAN: Confirm the review SLAs above. These are operational targets drafted by the MSO Owner. The physician may modify based on clinical judgment and retainer availability. In particular:
- Is the 1-business-hour notification SLA for Critical results achievable under the Doctors for Providers retainer arrangement?
- Is the 4-business-hour acknowledgment SLA for Critical results realistic?
- Are there service-line-specific thresholds that should be classified as "Critical" beyond LabCorp's standard critical value list? (e.g., hematocrit >54% for TRT patients, eGFR <30 for GLP-1 patients)]`

---

## 4. Critical Value Protocol

LabCorp's critical value notification protocol requires direct telephone contact with the ordering physician for results meeting critical thresholds. Bloom Metabolics' response:

1. The Covering Physician receives the LabCorp critical value call
2. The Covering Physician acknowledges receipt verbally to LabCorp
3. The Covering Physician reviews the critical result in OptiMantra
4. The Covering Physician documents the critical result review: value, clinical interpretation, action taken
5. The Covering Physician contacts the patient by phone within 1 business day
6. If the patient cannot be reached after 3 phone attempts within 24 hours:
   - The Covering Physician documents the contact attempts in OptiMantra
   - The MSO Owner is notified
   - If the result indicates immediate health risk (e.g., severely elevated hematocrit, critically abnormal potassium), the Covering Physician evaluates whether welfare check coordination with local authorities is warranted
   - The Covering Physician may send an urgent OptiMantra portal message and/or secure email as supplementary contact methods
7. Once the patient is reached, the Covering Physician discusses the finding, recommended action, and next steps
8. All communications are documented in OptiMantra

---

## 5. Abnormal Value Review

For non-critical abnormal results:

1. The Covering Physician reviews the result in OptiMantra within the 1-business-day SLA
2. The Covering Physician determines:
   - **Non-actionable abnormal:** Value is outside reference range but within expected parameters for the patient's treatment (e.g., slightly elevated hematocrit in a TRT patient within the acceptable range). Document acknowledgment in OptiMantra. Patient notified via portal with non-alarming language.
   - **Actionable abnormal:** Value requires clinical response (e.g., hematocrit approaching intervention threshold, liver enzymes elevated above acceptable range, A1c significantly changed). Document the clinical interpretation and action plan in OptiMantra. Physician contacts patient directly per SOP-006 §5.5.
3. Action options for actionable abnormals:
   - Order additional labs (re-draw, expanded panel)
   - Adjust treatment per applicable Prescribing SOP
   - Schedule an expedited follow-up visit
   - Refer to specialist
   - Discontinue treatment
4. All decisions are documented with clinical reasoning in OptiMantra

---

## 6. Normal Result Acknowledgment

1. The Covering Physician reviews and acknowledges normal results in OptiMantra within the 3-business-day SLA
2. Acknowledgment is a brief notation: "Results reviewed. All values within reference range. No action required."
3. The MSO Owner or MSO Intake Staff sends the patient a portal notification using the normal results template from [Attachment E](attachment-E-patient-lab-communication-templates.md)

---

## 7. Re-Draw Protocol

If the Covering Physician determines that a result requires re-drawing:

1. Physician documents the reason for re-draw in OptiMantra (suspected lab error, hemolyzed sample, value inconsistent with clinical picture, partial results requiring additional testing)
2. A new lab order is generated per SOP-006 §5.1 or §5.2
3. The patient is notified using the re-draw template from [Attachment E](attachment-E-patient-lab-communication-templates.md): "Your physician has requested a repeat of [test(s)] to confirm the results. Please schedule a new draw at your convenience. There is no additional charge."
4. Re-draw costs are absorbed into the bundled pricing model per [Attachment F](attachment-F-lab-cost-and-bundling-operational-notes.md)

---

## 8. Overdue Review Escalation

If results remain unacknowledged by the Covering Physician beyond the applicable SLA:

| Severity | SLA | Escalation Action |
| --- | --- | --- |
| Critical | 4 business hours | MSO Owner contacts Covering Physician directly (phone/text) within 1 hour of SLA expiry |
| Abnormal | 1 business day | MSO Owner sends reminder notification at SLA expiry; escalates via phone if no response within 4 additional hours |
| Normal | 3 business days | MSO Owner sends reminder notification at SLA expiry |

Repeated SLA misses (3+ in a 30-day period) are documented in the SOP-006 revision log and discussed between the MSO Owner and Covering Physician to identify systemic issues (volume, notification failures, scheduling conflicts).

---

*Bloom Metabolics — Confidential*
