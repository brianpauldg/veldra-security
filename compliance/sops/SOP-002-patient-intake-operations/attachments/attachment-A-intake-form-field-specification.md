# Attachment A — Intake Form Field Specification

**Parent Document:** [SOP-002 — Patient Intake Operations](../SOP-002-patient-intake-operations.md)

---

## Overview

This attachment defines every field in the Bloom Metabolics website intake form. Each field is documented with its name, type, validation rules, required/optional status, target system(s), and data classification per [Attachment B](attachment-B-data-classification-matrix.md).

---

## Form Fields

### Identity & Contact

| # | Field Name | Type | Required | Validation | Target System | Data Classification |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Legal First Name | Text | Required | Min 1 char, max 100 chars, alpha + hyphens + spaces | GHL + OptiMantra | Contact |
| 2 | Legal Last Name | Text | Required | Min 1 char, max 100 chars, alpha + hyphens + spaces | GHL + OptiMantra | Contact |
| 3 | Date of Birth | Date picker | Required | Must be a valid past date; patient must be at least 18 years old | GHL + OptiMantra | Demographic |
| 4 | Email Address | Email | Required | Valid email format; unique per patient | GHL + OptiMantra | Contact |
| 5 | Phone Number | Phone | Required | US phone format (10 digits); SMS-capable preferred | GHL + OptiMantra | Contact |
| 6 | Mailing Address — Street | Text | Required | Min 1 char, max 200 chars | GHL + OptiMantra | Contact |
| 7 | Mailing Address — City | Text | Required | Min 1 char, max 100 chars | GHL + OptiMantra | Contact |
| 8 | Mailing Address — State | Dropdown | Required | US states; must equal "California" to pass residency gate (§5.3) | GHL + OptiMantra | Demographic |
| 9 | Mailing Address — ZIP | Text | Required | 5-digit US ZIP code | GHL + OptiMantra | Contact |
| 10 | Preferred Name (optional) | Text | Optional | Max 100 chars | GHL + OptiMantra | Contact |

### Service Line Interest

| # | Field Name | Type | Required | Validation | Target System | Data Classification |
| --- | --- | --- | --- | --- | --- | --- |
| 11 | Service Line of Interest | Dropdown (single select) | Required | Options: "Testosterone Replacement Therapy (TRT)", "GLP-1/GIP Weight Management", "Sexual Health", "Longevity (NAD+, Glutathione)" | GHL + OptiMantra | Service Line Interest |
| 12 | Primary Concern | Dropdown (single select) | Required | Options: "Low energy / fatigue", "Weight management", "Sexual wellness", "General optimization", "Other" | GHL only | Service Line Interest |

### Eligibility Self-Attestation

| # | Field Name | Type | Required | Validation | Target System | Data Classification |
| --- | --- | --- | --- | --- | --- | --- |
| 13 | California Residency Attestation | Checkbox | Required | Must be checked; text: "I confirm that I currently reside in the state of California." | GHL + OptiMantra | Demographic |
| 14 | Age Attestation | Checkbox | Required | Must be checked; text: "I confirm that I am at least [service-line minimum] years of age." Age minimum is dynamically populated from SOP-003 thresholds. | GHL + OptiMantra | Demographic |
| 15 | Acknowledgment of Telehealth Services | Checkbox | Required | Must be checked; text: "I understand that Bloom Metabolics provides telehealth medical services and that an in-person visit is not required." | GHL + OptiMantra | Consent |

### Marketing Attribution (Auto-Captured)

| # | Field Name | Type | Required | Validation | Target System | Data Classification |
| --- | --- | --- | --- | --- | --- | --- |
| 16 | UTM Source | Hidden | Auto | URL parameter capture | GHL only | Marketing |
| 17 | UTM Medium | Hidden | Auto | URL parameter capture | GHL only | Marketing |
| 18 | UTM Campaign | Hidden | Auto | URL parameter capture | GHL only | Marketing |
| 19 | UTM Content | Hidden | Auto | URL parameter capture | GHL only | Marketing |
| 20 | UTM Term | Hidden | Auto | URL parameter capture | GHL only | Marketing |
| 21 | Referral Source | Hidden | Auto | HTTP referrer or manual referral code | GHL only | Marketing |
| 22 | Landing Page URL | Hidden | Auto | Full URL of the page where form was submitted | GHL only | Marketing |
| 23 | Device Type | Hidden | Auto | Mobile / Desktop / Tablet | GHL only | Marketing |

### System Fields (Auto-Generated)

| # | Field Name | Type | Required | Validation | Target System | Data Classification |
| --- | --- | --- | --- | --- | --- | --- |
| 24 | Form Submission Timestamp | Timestamp | Auto | ISO 8601 format | GHL + OptiMantra | Operational |
| 25 | Form Version | Hidden | Auto | Semantic version of the intake form | GHL + OptiMantra | Operational |
| 26 | IP Address | Hidden | Auto | IPv4 or IPv6 | GHL only | Operational |
| 27 | Lead ID | Auto-generated | Auto | GHL-assigned unique identifier | GHL only | Operational |

---

## Notes

- Fields 1-15 are patient-facing. Fields 16-27 are system-captured and not visible to the patient.
- The "Primary Concern" field (12) is used for pipeline routing and marketing segmentation only. It is NOT clinical data and does NOT appear in OptiMantra.
- The age attestation field (14) dynamically references the service-line minimum age set by the Covering Physician in SOP-003. If SOP-003 thresholds are not yet set (physician pending), the minimum defaults to 18 years.
- No clinical history, medications, allergies, or treatment-specific medical questions appear on the website form. All clinical data is captured in the OptiMantra clinical intake (SOP-002 §5.5).

---

*Bloom Metabolics — Confidential*
