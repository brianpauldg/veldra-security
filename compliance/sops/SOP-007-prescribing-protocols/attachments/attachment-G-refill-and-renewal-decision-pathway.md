# Attachment G -- Refill and Renewal Decision Pathway

**Parent Document:** SOP-007 Prescribing Protocols
**Classification:** INTERNAL -- CLINICAL & OPERATIONAL
**Ownership:** Hybrid -- Operational workflow (MSO Owner); Clinical eligibility criteria (Covering Physician)
**Version:** 0.1
**Date:** 2026-05-06

---

## G.1 Refill Request Sources

Refill requests may originate from any of the following channels:

- OptiMantra patient portal (patient-initiated)
- Secure message through OptiMantra
- Pharmacy auto-refill notification transmitted to OptiMantra
- Patient phone call to MSO Intake Staff
- Patient email to Bloom Metabolics

All refill requests are logged in OptiMantra regardless of source. MSO Intake Staff enters requests received by phone or email into OptiMantra within one business day.

---

## G.2 Refill Eligibility Pre-Checks (Operational)

Before routing a refill request to the covering physician, MSO Intake Staff performs the following pre-checks:

1. **Active prescription.** Confirm the patient has an active prescription on file in OptiMantra.
2. **Refills remaining.** Confirm the current prescription has authorized refills remaining. If no refills remain, route to renewal pathway (Section G.7).
3. **Treatment phase.** Identify the patient's current treatment phase (titration, maintenance, monitoring).
4. **Last synchronous visit.** Identify the date of the patient's most recent synchronous visit with the covering physician.
5. **Last lab date.** Identify the date of the patient's most recent lab results on file.

Pre-check findings are summarized in the refill request note in OptiMantra before physician review.

---

## G.3 Async Refill Pathway (Non-Controlled Medications)

Per SOP-007 Section 5.5. This pathway applies to non-controlled medications including GLP-1 agonists (branded and compounded), PDE5 inhibitors, peptides, and other non-scheduled therapies.

**Eligibility Criteria.**

`[CLINICAL -- PENDING COVERING PHYSICIAN]`

The covering physician is responsible for defining the following criteria for async refill eligibility:

- Acceptable lab value ranges by service line (e.g., metabolic panel thresholds for GLP-1 patients, hormone panel thresholds for peptide therapy patients)
- Maximum interval since last synchronous visit, by service line
- Maximum interval since last lab draw, by service line
- Conditions that automatically disqualify a patient from async refill (e.g., recent adverse event, dose change within defined window)

`[END CLINICAL -- PENDING COVERING PHYSICIAN]`

**Workflow.**

1. MSO Intake Staff completes pre-checks (Section G.2).
2. Pre-check results are attached to the refill request in OptiMantra.
3. Covering physician reviews the request asynchronously.
4. Physician either authorizes the refill or escalates to synchronous visit.
5. If authorized, MSO Intake Staff processes the refill in OptiMantra and the prescription is transmitted to the appropriate pharmacy per Attachment E routing logic.
6. If escalated, MSO Intake Staff contacts the patient to schedule a synchronous visit.

---

## G.4 Modified-Async Refill Pathway (Controlled Substances / TRT)

Per SOP-007 Section 5.6. This pathway applies to all Schedule III prescriptions, including testosterone cypionate.

**Additional Requirements.** In addition to the standard pre-checks in Section G.2, the following are required before physician review:

- **CURES check.** A current CURES check must be performed per Attachment F, Section F.3.
- **Synchronous visit interval.** The patient must have completed a synchronous visit within the preceding 6 months.
- **Schedule III refill limits.** The current prescription must have authorized refills remaining and must not have exceeded the 6-month validity window (Attachment F, Section F.6).

**New Prescription Requirement.** If the current prescription has exhausted its 5 authorized refills or has exceeded 6 months from issuance, a new prescription is required. This triggers the renewal pathway (Section G.7), not a refill.

**Workflow.**

1. MSO Intake Staff completes pre-checks (Section G.2) plus CURES status verification and last synchronous visit date confirmation.
2. If synchronous visit is overdue (greater than 6 months), the refill request is held and the patient is scheduled for a synchronous visit.
3. If pre-checks pass, covering physician performs the CURES check.
4. Physician reviews the refill request with CURES results.
5. Physician authorizes, modifies, or declines.
6. If authorized, MSO Intake Staff processes the refill in OptiMantra. Prescription is transmitted to Strive Pharmacy per Attachment E routing logic.
7. If declined or modified, workflow follows escalation procedures in Section G.5.

---

## G.5 Refill Escalation Triggers

The following conditions trigger escalation from the refill pathway to a synchronous visit:

- **Labs outdated.** Most recent lab results exceed the maximum interval defined by the covering physician.
- **Symptom change reported.** Patient reports new or worsening symptoms since last visit.
- **Recent dose adjustment.** Dose was adjusted within a timeframe defined by the covering physician.
- **Adverse event reported.** Patient reports any adverse event, regardless of severity.
- **Synchronous visit overdue.** Last synchronous visit exceeds the maximum interval for the applicable service line.
- **CURES concern.** CURES check reveals findings requiring physician evaluation (per Attachment F, Section F.4).

When any escalation trigger is present, the refill is held and MSO Intake Staff schedules a synchronous visit. The refill request remains open in OptiMantra, linked to the scheduled visit.

---

## G.6 Refill Denial Communication

When a refill request cannot be processed and requires a synchronous visit or updated labs, MSO Intake Staff communicates to the patient using the following framework:

- Notification is sent within one business day of the physician's decision.
- Language is non-clinical. The communication does not disclose clinical reasoning, lab values, or CURES findings.
- The patient is informed that their refill requires an updated visit or updated labs before it can be processed.
- The patient is offered scheduling assistance for the required visit or lab order.

**Template language:**

> Your refill request requires an updated visit with your provider before we can process it. This is part of our standard care protocol to ensure your treatment remains appropriate. Please contact us to schedule your visit, or we can reach out to arrange a convenient time.

Variations of this template may be used. All patient-facing refill denial communications must avoid clinical detail and maintain a supportive tone.

---

## G.7 Renewal vs. Refill

**Refill.** A refill is dispensed against an existing, active prescription that has remaining authorized refills within its validity period. No new prescription is generated.

**Renewal.** A renewal is a new prescription issued after the existing prescription has expired or exhausted its authorized refills. A renewal requires clinical re-evaluation by the covering physician at minimum.

**Schedule III Renewal.** For Schedule III controlled substances, a renewal is a new prescription subject to all requirements of SOP-007 Section 5.6, including:

- Current CURES check
- Synchronous visit within the preceding 6 months (or a new synchronous visit if overdue)
- Full Schedule III documentation per Attachment F, Section F.5
- New refill count (up to 5) and new 6-month validity window

**Renewal Trigger.** MSO Intake Staff identifies patients approaching renewal (refills exhausted or prescription expiration within 30 days) and initiates the renewal workflow proactively. Patients are contacted to schedule any required visit or lab work in advance of prescription expiration.

---

*Bloom Metabolics -- Confidential*
