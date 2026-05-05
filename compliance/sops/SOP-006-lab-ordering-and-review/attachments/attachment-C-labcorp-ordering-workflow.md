# Attachment C — LabCorp Ordering Workflow

**Parent Document:** [SOP-006 — Lab Ordering & Review](../SOP-006-lab-ordering-and-review.md)
**Ownership:** Operational — MSO Owner

---

## Overview

This attachment provides the step-by-step operational workflow for ordering labs through LabCorp, managing the clinic account, routing patients to Patient Service Centers (PSCs), and handling results delivery. This is MSO-operational content; clinical panel selection is governed by the Covering Physician per Attachments A and B.

---

## 1. LabCorp Account Structure

- **Account type:** Physician clinic account under the Covering Physician's National Provider Identifier (NPI) and DEA registration (where applicable for controlled-substance-related testing)
- **Billing arrangement:** Direct-bill to Bloom Metabolics; patients are never billed by LabCorp
- **Account credentials:** Stored in the MSO Owner's password manager (1Password or equivalent); access limited to MSO Owner and trained MSO Intake Staff
- **Account contact:** MSO Owner is the primary administrative contact for the LabCorp account; the Covering Physician is the ordering provider of record

---

## 2. OptiMantra-LabCorp Integration

- **Configuration:** The MSO Owner configures the LabCorp integration in OptiMantra's EHR admin panel under Settings > Lab Integrations
- **Capabilities:** Electronic order transmission (requisition generated in OptiMantra, transmitted to LabCorp electronically), electronic results delivery (LabCorp results delivered to OptiMantra patient record)
- **Integration health monitoring:** The MSO Owner verifies integration health weekly by confirming that orders placed within the past 7 days have corresponding results or pending status in LabCorp's system
- **Integration failure:** If the integration is down, the MSO Owner invokes the manual fallback per SOP-006 §5.8

---

## 3. Lab Order Generation

### Electronic Ordering (Primary)

1. The Covering Physician selects the lab panel for the patient in OptiMantra (pre-configured order sets per service line per Attachment A or B)
2. OptiMantra generates a LabCorp requisition with: patient demographics, ordering physician NPI, test codes, diagnosis codes (ICD-10), and billing indicator (bill to clinic account)
3. The requisition is transmitted electronically to LabCorp
4. OptiMantra generates a patient-facing requisition summary (PDF) including:
   - LabCorp requisition number
   - Tests ordered
   - Pre-draw instructions (fasting requirements, hydration, medications to hold)
   - LabCorp PSC locator link
   - Scheduling instructions

### Manual Requisition (Fallback)

1. If electronic ordering is unavailable, the MSO Owner or MSO Intake Staff generates a PDF requisition in OptiMantra with the same information
2. The PDF is emailed to the patient via OptiMantra secure messaging
3. The patient prints the requisition (or displays on mobile) and brings it to the PSC
4. Results are retrieved manually per section 6 of this attachment

---

## 4. Patient Routing to LabCorp PSCs

1. Upon order generation, the patient receives an OptiMantra portal notification containing:
   - The requisition (electronic or PDF)
   - A link to LabCorp's PSC locator: https://www.labcorp.com/labs-and-appointments
   - Instructions: "Schedule your lab draw at any LabCorp Patient Service Center in California. Bring your requisition (printed or on your phone) and a government-issued photo ID. No appointment is required, but scheduling in advance reduces wait times."
2. Pre-draw instructions are included per the physician's specifications:
   - **Fasting:** "Fast for 8-12 hours before your draw (water is okay). Schedule your draw in the morning."
   - **Hydration:** "Drink plenty of water the day before and the morning of your draw to make the blood draw easier."
   - **Medications:** "Take your usual medications unless your physician has specifically instructed you to hold a medication before the draw."
3. A reminder is sent at 3 days and 7 days if the draw has not been completed (tracked by the absence of results in OptiMantra)

---

## 5. Standing Orders vs. One-Time Orders

- **At launch:** All lab orders are one-time orders generated per patient per clinical event (pre-visit, post-visit monitoring)
- **Standing orders:** Not used at launch. Standing orders (recurring lab panels at defined intervals) may be implemented in a future SOP revision when the Prescribing SOPs define monitoring cadences that are sufficiently standardized to support standing orders
- **Rationale:** One-time orders provide tighter physician control at launch when panel selection and timing may vary significantly between patients during the practice's initial operating period

---

## 6. Results Delivery

### Electronic Delivery (Primary)

1. LabCorp transmits results electronically to OptiMantra upon completion (typical turnaround: 24-72 hours for standard panels)
2. Results appear in the patient's OptiMantra record under the Lab Results section
3. OptiMantra generates a notification to the Covering Physician that results are available for review
4. The MSO Owner or MSO Intake Staff verifies that results have been received by checking the patient's OptiMantra record

### Manual Upload (Fallback)

1. If electronic delivery fails (integration issue, LabCorp processing delay, or results delivered to LabCorp portal but not to OptiMantra):
   a. The MSO Owner or MSO Intake Staff logs into the LabCorp provider portal
   b. Retrieves the patient's results as a PDF
   c. Uploads the PDF to the patient's OptiMantra record under Lab Results
   d. Notifies the Covering Physician that results are available
2. Manual upload is documented in OptiMantra with a note: "Results manually uploaded from LabCorp portal on [date] due to [reason: integration failure / delayed electronic delivery / other]."

---

## 7. Vendor Relationship Management

- **Monthly invoicing:** LabCorp invoices Bloom Metabolics monthly for all draws performed under the clinic account. The MSO Owner reviews invoices within 5 business days of receipt, verifies line items against OptiMantra order records, and processes payment.
- **Billing discrepancies:** If the invoice includes draws not ordered by Bloom Metabolics, or if pricing differs from the contracted rate, the MSO Owner contacts LabCorp customer service for resolution.
- **Customer service escalation:** The MSO Owner maintains the LabCorp customer service contact number and account manager relationship. Issues requiring escalation (sustained integration failures, systematic billing errors, PSC closures affecting patient access) are routed through the account manager.
- **Contract review:** The LabCorp services agreement is reviewed annually by the MSO Owner. Pricing renegotiation is initiated if lab costs exceed the 15% cost watch threshold per Attachment F.

---

## 8. Order Tracking and Pipeline Integration

Lab order status is tracked in both OptiMantra and GHL:

| Lab Status | OptiMantra Record | GHL Pipeline State |
| --- | --- | --- |
| Order generated | Lab order entry with requisition number | "Pre-Visit Labs Ordered" or note in active treatment record |
| Patient notified | Communication log entry | No change |
| Draw completed | LabCorp draw confirmation (if available) | "Pre-Visit Labs Drawn" (if pre-visit) |
| Results delivered | Lab results in patient record | "Pre-Visit Labs Available" (if pre-visit) |
| Physician review complete | Physician review note with timestamp | "Ready for Clinical Review (Labs Complete)" (if pre-visit) |

For post-visit monitoring labs, GHL pipeline does not change; tracking is within OptiMantra's treatment record.

---

*Bloom Metabolics — Confidential*
