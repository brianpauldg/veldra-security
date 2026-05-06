# Attachment F -- CURES Reporting and Controlled Substance Documentation

**Parent Document:** SOP-007 Prescribing Protocols
**Classification:** INTERNAL -- CLINICAL & OPERATIONAL
**Ownership:** Hybrid -- Operational components (MSO Owner); Clinical components (Covering Physician)
**Version:** 0.1
**Date:** 2026-05-06

---

## F.1 CURES Enrollment

The covering physician must be enrolled in the California Controlled Substance Utilization Review and Evaluation System (CURES) prior to prescribing any controlled substance through Bloom Metabolics.

**Verification.** MSO Owner verifies CURES enrollment during physician onboarding. Verification is documented in the physician's credentialing file.

**Annual Re-Verification.** CURES enrollment status is re-verified annually by MSO Owner as part of the credentialing maintenance cycle.

**Lapse.** If CURES enrollment lapses or cannot be verified, controlled substance prescribing is suspended until enrollment is confirmed. This constitutes an operational halt per SOP-007 Section 7.1.

---

## F.2 California DEA Verification

An active California DEA registration is required for prescribing Schedule III controlled substances, including testosterone cypionate.

**Onboarding Verification.** MSO Owner verifies the covering physician's DEA registration during onboarding. DEA number, registration state, expiration date, and authorized schedules are documented in the credentialing file.

**Annual Re-Verification.** DEA registration status is re-verified annually by MSO Owner.

**Lapse or Expiration.** If the covering physician's DEA registration lapses, expires, or is restricted, all controlled substance prescribing ceases immediately. This constitutes an operational halt per SOP-007 Section 7.1. MSO Owner is responsible for detecting the lapse and initiating the halt.

---

## F.3 CURES Check Workflow

**Required Check Points.** The covering physician performs a CURES check at each of the following events:

- Initial TRT prescription
- Each refill authorization
- Each dose adjustment

**Timing.** The CURES check must be performed within 24 hours before the prescription is generated in OptiMantra.

**Documentation.** The CURES check result is documented in the patient's OptiMantra chart, including:

- Date and time of query
- Summary of findings
- Clinical disposition (proceed, evaluate further, or decline)

**Integration.** If OptiMantra-CURES integration is available, the query is performed within OptiMantra and results are automatically documented. If integration is not available, the physician performs a manual CURES query and documents the result in the patient chart.

---

## F.4 CURES Result Interpretation

`[CLINICAL -- PENDING COVERING PHYSICIAN]`

The covering physician is responsible for defining the clinical interpretation framework for CURES results. The following categories require physician-authored criteria:

- **No concerning findings.** Criteria for proceeding with prescribing without further action.
- **Recent prescriptions from other providers.** Criteria for evaluating concurrent controlled substance prescriptions, including threshold quantities and time windows that warrant further review.
- **Pattern consistent with doctor-shopping.** Criteria for identifying patterns that indicate likely decline, including the requirement for a synchronous visit before any prescribing decision.
- **Active controlled substance prescription from another provider.** Protocol for coordination of care, including required outreach to the other prescriber and documentation standards.

`[END CLINICAL -- PENDING COVERING PHYSICIAN]`

---

## F.5 Schedule III Documentation Requirements

Each Schedule III prescription generated through Bloom Metabolics must be accompanied by the following documentation in OptiMantra:

- Covering physician's DEA number
- CURES check date and time
- CURES check result summary
- Patient identity verification reference (per SOP-002 Section 5.8)
- Clinical eligibility reference (per SOP-003)
- Informed consent reference (per SOP-005)
- Prescription details: medication, strength, quantity, directions, refills authorized

MSO Owner audits a sample of Schedule III prescriptions monthly to confirm documentation completeness.

---

## F.6 Schedule III Refill Rules

Federal and California law govern refill limitations for Schedule III controlled substances:

- **Maximum refills per prescription:** 5
- **Maximum prescription validity:** 6 months from date of issuance
- **New prescription required:** after all authorized refills are exhausted or after 6 months, whichever occurs first
- **No automatic refill:** each refill requires physician authorization per the modified-async pathway (SOP-007 Section 5.6)

MSO Intake Staff tracks refill counts and prescription expiration dates in OptiMantra. Patients approaching refill exhaustion or prescription expiration are flagged for renewal workflow per Attachment G.

---

## F.7 EPCS Compliance

**California Mandate.** California requires electronic prescribing for controlled substances (EPCS). All Schedule III prescriptions generated through Bloom Metabolics must be transmitted electronically.

**OptiMantra EPCS Capability.** OptiMantra must be configured to support EPCS-compliant transmission. MSO Owner verifies EPCS capability during system setup and after any system updates.

**Physician Identity Proofing.** The covering physician must complete identity proofing as required by DEA EPCS regulations prior to generating electronic controlled substance prescriptions.

**Two-Factor Authentication.** Each EPCS transaction requires two-factor authentication by the prescribing physician, consistent with DEA requirements. The authentication method is configured within OptiMantra.

**Compliance Verification.** MSO Owner verifies EPCS compliance annually and documents the verification in the system administration file.

---

*Bloom Metabolics -- Confidential*
