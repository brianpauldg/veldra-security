# Attachment C — Visit Documentation Template

**Parent Document:** [SOP-005 — Synchronous Telehealth Visit](../SOP-005-synchronous-telehealth-visit.md)

---

## Overview

This template defines the complete visit note structure as created in the OptiMantra EHR for each synchronous telehealth encounter. It wraps the Good Faith Examination (documented per [Attachment B](attachment-B-good-faith-examination-template.md)) with the operational metadata required for billing, compliance, and continuity of care.

In practice, the GFE documentation and this visit note are a single record within OptiMantra. This template and Attachment B are separated for clarity of purpose: Attachment B specifies the clinical examination record; this template specifies the full encounter note including operational and administrative elements.

---

## Visit Metadata

| Field | Value |
| --- | --- |
| **Visit Date** | |
| **Time Started** | |
| **Time Ended** | |
| **Total Duration (minutes)** | |
| **Visit Modality** | Synchronous Video / Audio-Only Fallback |
| **Audio-Only Justification (if applicable)** | |
| **Telehealth Platform** | OptiMantra |
| **Alternative Platform Used** | No / Yes -- specify: _______________ |
| **Reason for Alternative Platform (if applicable)** | |
| **Physician Name** | |
| **Physician License Number** | |
| **Physician NPI** | |
| **Patient Name** | |
| **Patient OptiMantra ID** | |
| **Service Line** | TRT / GLP-1/GIP / Sexual Health / Longevity |
| **Visit Type** | Initial Consultation / Follow-Up / Lab Review / Dose Adjustment |

---

## Identity Confirmation

Per SOP-005 SS5.4: Patient identity confirmed via synchronous video against government-issued photo ID. Patient verbally confirmed full legal name, date of birth, and current California residency.

- [ ] Identity confirmed
- [ ] Identity could not be confirmed -- visit not conducted. Reason: _______________

---

## Good Faith Examination

The Good Faith Examination documentation is the core clinical record of this encounter. See [Attachment B -- Good Faith Examination Template](attachment-B-good-faith-examination-template.md) for the complete documentation structure.

In OptiMantra, the GFE content is embedded directly within this visit note. The sections below (Informed Consent Record through Physician Signature) supplement the GFE with operational elements not captured in the clinical examination template.

---

## Informed Consent Record

| Element | Detail |
| --- | --- |
| **Consent Form ID / Version** | |
| **Service Line** | |
| **Patient Acknowledged** | Yes / No |
| **Electronic Signature Obtained** | Yes / No |
| **Electronic Signature Timestamp** | |
| **Clarifying Discussion** | None / See notes below |

**Clarifying discussion notes (if any):**

_______________________________________________________________

---

## Prescribing Decision

### Pathway Selected

- [ ] **Within-visit prescribing** — Clinical criteria met; prescription issued during encounter.
- [ ] **Post-visit prescribing** — Additional information required before prescribing decision can be made.
- [ ] **Treatment not indicated** — Clinical evaluation determined treatment is not appropriate at this time.

**Rationale for selected pathway:**

_______________________________________________________________

### Within-Visit Prescribing (if applicable)

| Field | Detail |
| --- | --- |
| **Medication** | |
| **Dose** | |
| **Route** | |
| **Frequency** | |
| **Duration / Quantity** | |
| **Pharmacy** | |
| **E-Prescription Reference Number** | |
| **Transmission Confirmed** | Yes / No |

### Post-Visit Prescribing (if applicable)

| Field | Detail |
| --- | --- |
| **Additional information required** | |
| **Expected timeline for prescribing decision** | |
| **Patient informed of timeline** | Yes / No |
| **Follow-up method** | Portal message / Phone / Scheduled visit |

---

## Lab Orders

| Lab Test | Rationale | Lab Facility | Expected Turnaround | Order Reference |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |

- [ ] No labs ordered during this visit.

---

## Follow-Up Plan

| Element | Detail |
| --- | --- |
| **Next visit date or timeframe** | |
| **Follow-up type** | Lab Review / Dose Adjustment / Re-Evaluation / Routine Check-In |
| **Scheduling method** | Scheduled during visit / Patient to self-schedule / MSO to schedule |
| **Patient communication** | Patient informed of follow-up plan and timeline verbally during visit |

**Additional follow-up notes:**

_______________________________________________________________

---

## Visit Outcome

### Pipeline State Transition

Per SOP-005 SS5.9, document the patient's pipeline state at the conclusion of this visit.

| Field | Detail |
| --- | --- |
| **State before visit** | |
| **State after visit** | |
| **Transition rationale** | |

Reference the applicable pipeline states defined in SOP-005 SS5.9. Common transitions include:

- Scheduled --> Active Treatment (within-visit prescribing completed)
- Scheduled --> Pending Labs (additional labs required before prescribing)
- Scheduled --> Declined (patient declined treatment)
- Scheduled --> Not Eligible (clinical criteria not met)
- Active Treatment --> Active Treatment (follow-up, no change)
- Active Treatment --> Dose Adjustment (medication modification)

---

## Patient Questions Log

| # | Patient Question (Summary) | Physician Response (Summary) |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |

- [ ] No patient questions were raised during this visit.

---

## Physician Signature

| Field | Value |
| --- | --- |
| **Physician Name** | |
| **Physician License Number** | |
| **Electronic Signature** | |
| **Signature Timestamp** | |
| **OptiMantra Session ID** | |

---

*Bloom Metabolics -- Confidential*
