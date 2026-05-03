# Attachment B — Data Classification Matrix

**Parent Document:** [SOP-002 — Patient Intake Operations](../SOP-002-patient-intake-operations.md)

---

## Overview

This matrix defines which data categories may reside in each system in the Bloom Metabolics operational stack. The classification rule exists to prevent PHI leakage from clinical systems (OptiMantra) into marketing/CRM systems (GHL) and to ensure HIPAA compliance across the data lifecycle.

**Governing principle:** GoHighLevel (GHL) is a CRM with marketing-grade access controls and audit capabilities. OptiMantra is an EHR with HIPAA-compliant access controls and audit capabilities. Data that constitutes Protected Health Information (PHI) under HIPAA or medical information under CMIA must reside in OptiMantra. Data that is purely operational or marketing-related may reside in GHL.

**MSO Non-Interference Reminder (per [SOP-001 §2.3](../../SOP-001-document-control/SOP-001-document-control.md)):** Nothing in this data classification matrix authorizes the MSO to access, review, interpret, or act on clinical data in OptiMantra beyond the operational functions defined in SOP-002 (identity verification, document acknowledgment verification, pipeline management).

---

## Classification Matrix

| Data Category | Permitted in GHL | Permitted in OptiMantra | Permitted in Corepay | Notes |
| --- | --- | --- | --- | --- |
| **Marketing / Lead Data** | | | | |
| UTM source, medium, campaign, content, term | YES | NO | NO | GHL-only; irrelevant to clinical record |
| Referral source | YES | NO | NO | GHL-only |
| Landing page URL | YES | NO | NO | GHL-only |
| Device type | YES | NO | NO | GHL-only |
| Lead score | YES | NO | NO | GHL-only |
| Campaign attribution | YES | NO | NO | GHL-only |
| **Contact Information** | | | | |
| Legal name (first, last) | YES | YES | YES (transaction name) | Mirrored at handoff; primary identifier |
| Email address | YES | YES | YES (receipt email) | Mirrored at handoff |
| Phone number | YES | YES | NO | Mirrored at handoff |
| Mailing address | YES | YES | NO | Mirrored at handoff |
| Preferred name | YES | YES | NO | Optional; convenience field |
| **Demographic Data** | | | | |
| Date of birth / age | YES (for eligibility gate) | YES | NO | Used for age gate in SOP-002; clinical use in SOP-003 |
| State of residence | YES (for eligibility gate) | YES | NO | Used for California gate in SOP-002 |
| **Service Line Interest** | | | | |
| Service line selected | YES | YES | NO | Marketing attribution + clinical routing |
| Primary concern (dropdown) | YES | NO | NO | GHL-only; routing/marketing, not clinical |
| **Identity Verification** | | | | |
| Government ID images | NO | YES | NO | Direct upload to OptiMantra; NEVER in GHL |
| ID verification outcome | YES (status code only) | YES (full log entry) | NO | GHL receives "Verified"/"Declined" status only; OptiMantra holds full reviewer log |
| **Clinical / PHI Data** | | | | |
| Medical history | NO | YES | NO | OptiMantra only |
| Current medications | NO | YES | NO | OptiMantra only |
| Allergies | NO | YES | NO | OptiMantra only |
| Surgical history | NO | YES | NO | OptiMantra only |
| Family medical history | NO | YES | NO | OptiMantra only |
| Lifestyle factors | NO | YES | NO | OptiMantra only |
| Self-reported lab values | NO | YES | NO | OptiMantra only |
| Uploaded lab reports (PDFs) | NO | YES | NO | OptiMantra only |
| Reason for seeking treatment | NO | YES | NO | OptiMantra only; free-text clinical narrative |
| Service-line-specific intake fields | NO | YES | NO | Defined by Covering Physician in SOP-003 |
| **Consent & Authorization** | | | | |
| NPP acknowledgment (timestamp) | NO | YES | NO | OptiMantra record of acknowledgment |
| General Consent for Care (timestamp + signature) | NO | YES | NO | OptiMantra record |
| HIPAA Authorization (timestamp + signature) | NO | YES | NO | OptiMantra record |
| Telehealth acknowledgment (from web form) | YES (attestation checkbox status) | YES | NO | Web form attestation mirrored; full consent in OptiMantra |
| **Payment Data** | | | | |
| Credit/debit card number | NO | NO | YES (PCI-DSS scope) | Corepay-only; never touches Bloom systems |
| Card expiration, CVV | NO | NO | YES (PCI-DSS scope) | Corepay-only |
| Billing address | NO | NO | YES | Corepay-only |
| Transaction reference ID | YES (reference only) | YES (reference only) | YES | Cross-system reference; no card data |
| Transaction amount and date | NO | YES | YES | OptiMantra for patient record; GHL receives no payment details |
| **Clinical Decisions** | | | | |
| Eligibility determination | NO | YES | NO | Covering Physician's clinical decision per SOP-003 |
| Prescriber notes | NO | YES | NO | OptiMantra only |
| Lab orders | NO | YES | NO | OptiMantra only |
| Prescriptions | NO | YES | NO | OptiMantra only |
| **Operational Status** | | | | |
| GHL pipeline stage | YES | NO | NO | Operational tracking |
| Stage transition timestamps | YES | NO | NO | Operational tracking |
| Decline/abandonment reason codes | YES | YES | NO | GHL for pipeline; OptiMantra for patient record |

---

## Enforcement

### Prevention

- GHL custom fields are configured to include ONLY the fields marked "YES" in the GHL column above
- No free-text fields are configured in GHL that could be used to enter clinical data
- GHL automation workflows are reviewed quarterly to confirm no clinical data is captured, stored, or transmitted
- Staff training (SOP-002 §8) includes data classification as a core competency

### Detection

- Quarterly audit of GHL custom fields and pipeline data to identify any clinical data that has been entered in violation of this matrix
- Any violation triggers: immediate deletion of the offending data from GHL, incident documentation, staff re-training, and evaluation of whether a HIPAA breach notification is required per 45 CFR §164.402

### Response to Violations

1. The offending data is deleted from GHL within 24 hours of detection
2. The incident is documented in the SOP-002 revision log
3. The staff member responsible is identified and undergoes immediate re-training on this matrix
4. The MSO Owner evaluates whether the incident constitutes a HIPAA breach requiring notification under 45 CFR §164.402
5. If the incident constitutes a breach, the MSO Owner follows the Breach Notification procedures (governed by future HIPAA SOP)

---

## Retention

| System | Retention Period | Authority |
| --- | --- | --- |
| GHL | Marketing data: per GHL data retention policy; contact data: deleted upon patient request or 7 years from last activity, whichever is later | California data privacy requirements |
| OptiMantra | Minimum 7 years from last date of service per California medical records retention; 10 years recommended | Cal. Bus. & Prof. Code §2220.7; HIPAA 45 CFR §164.530(j) |
| Corepay | Per Corepay's merchant agreement and PCI-DSS requirements | PCI-DSS; Corepay merchant terms |

---

*Bloom Metabolics — Confidential*
