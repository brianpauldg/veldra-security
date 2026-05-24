# SOP-009 Attachment A — Classification Decision Tree

**Parent Document:** [SOP-009 Vendor & Contractor Management (1099 Operations)](../SOP-009-vendor-contractor-management.md)
**Version:** 0.1
**Last Updated:** 2026-05-11

---

## Purpose

This attachment provides the operational decision tree that the MSO Owner uses to classify every new vendor or contractor engagement before the first payment is issued. The classification determines whether the engagement is structured as W-2 employment, 1099 independent contractor, or corp-to-corp — and identifies engagements that belong under the future Provider Credentialing SOP rather than SOP-009.

This decision tree is designed to be executed by the MSO Owner (or a future operations manager) without external help. When in doubt, the default action is to consult legal counsel before proceeding.

---

## Decision Tree

### Step 0 — Is This a Clinical Provider Engagement?

**Question:** Is this engagement for licensed clinical services delivered to Bloom Metabolics patients?

- **YES** → **STOP. Use the future Provider Credentialing, Insurance & Coverage SOP (planned; not yet drafted) instead.** SOP-009 does not govern clinical provider relationships. Examples: Covering Physician, backup physician (per-consult), locum tenens provider, future APN.
- **NO** → Proceed to Step 1.

---

### Step 1 — California ABC Test (Primary Classification Test)

California Labor Code § 2775 (AB 5) presumes that every worker is an employee. The hiring entity must prove all three prongs to classify the worker as an independent contractor. Apply each prong below.

#### Prong (A) — Free from Control and Direction

**Question:** Will the vendor be free from Bloom's control and direction over how the work is performed — both under the contract and in fact?

Evaluate:
- Does Bloom specify only the deliverable or outcome (IC indicator) — or does Bloom dictate the methods, schedule, tools, and day-to-day activities (employee indicator)?
- Does the vendor set their own working hours?
- Does the vendor use their own equipment and workspace?
- Is the vendor supervised by Bloom personnel on a day-to-day basis?

| Indicator | Points to IC | Points to Employee |
| --- | --- | --- |
| Schedule | Vendor sets own hours | Bloom sets hours or requires availability windows |
| Methods | Vendor chooses how to perform work | Bloom prescribes methods or processes |
| Supervision | No day-to-day supervision | Regular check-ins, task assignments, performance reviews |
| Equipment | Vendor uses own tools/software | Bloom provides equipment, licenses, workspace |
| Deliverable focus | Contract specifies outcomes | Contract specifies activities or hours |

**Answer:**
- **YES — free from control** → Prong (A) PASSES. Proceed to Prong (B).
- **NO — Bloom controls how the work is performed** → Prong (A) FAILS. **Go to Step 2 (Failed ABC).**
- **UNCERTAIN** → Document the specific concern and **go to Step 2 (Failed ABC).**

---

#### Prong (B) — Outside Bloom's Usual Course of Business

**Question:** Is the work performed outside Bloom Metabolics' usual course of business?

**Bloom Metabolics' usual course of business is telehealth hormone optimization.** This includes: patient intake, clinical consultations, medical eligibility screening, prescribing, lab ordering and review, injection education, patient communication related to clinical services, and clinical care coordination.

| Work Type | Inside or Outside Usual Course? | (B) Result |
| --- | --- | --- |
| Bookkeeping / accounting | Outside — financial operations, not healthcare delivery | PASSES |
| Legal counsel | Outside — legal services, not healthcare delivery | PASSES |
| Content production (blog, social media, photography) | Outside — marketing, not healthcare delivery | PASSES |
| Web development / software engineering | Outside — technology services, not healthcare delivery | PASSES |
| Marketing agency / paid ads management | Outside — marketing, not healthcare delivery | PASSES |
| Virtual assistant (scheduling, admin, non-clinical) | Outside — administrative support, not healthcare delivery | PASSES (if no clinical tasks) |
| CPA / tax preparation | Outside — financial services, not healthcare delivery | PASSES |
| Photography / videography | Outside — creative services, not healthcare delivery | PASSES |
| Patient intake coordinator | **INSIDE** — intake is part of Bloom's clinical workflow | **FAILS** |
| Medical scribe | **INSIDE** — scribing supports clinical care delivery | **FAILS** |
| Clinical care coordinator | **INSIDE** — care coordination is core clinical workflow | **FAILS** |
| Patient support (clinical questions) | **INSIDE** — clinical patient support is healthcare delivery | **FAILS** |

**Answer:**
- **YES — outside usual course** → Prong (B) PASSES. Proceed to Prong (C).
- **NO — inside usual course** → Prong (B) FAILS. **Go to Step 2 (Failed ABC).**
- **UNCERTAIN** → Document the specific concern and **go to Step 2 (Failed ABC).**

---

#### Prong (C) — Independently Established Trade

**Question:** Is the vendor customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed for Bloom?

Evaluate:
- Does the vendor have (or have the ability to have) other clients?
- Does the vendor maintain their own business presence (website, business cards, professional licenses, business registration)?
- Does the vendor hold themselves out to the public as available for this type of work?
- Has the vendor performed this type of work for other clients before?

| Indicator | Points to IC | Points to Employee |
| --- | --- | --- |
| Other clients | Vendor serves or can serve multiple clients | Vendor works exclusively for Bloom |
| Business presence | Vendor has own website, LLC, or professional registration | No independent presence |
| Public availability | Vendor markets services to others | Vendor does not seek other clients |
| Prior experience | Vendor has performed this work independently before | First time performing this work |

**Answer:**
- **YES — independently established** → Prong (C) PASSES. **Go to Step 3 (ABC Passes).**
- **NO — not independently established** → Prong (C) FAILS. **Go to Step 2 (Failed ABC).**
- **UNCERTAIN** → Document the specific concern and **go to Step 2 (Failed ABC).**

---

### Step 2 — Failed ABC Test

**One or more ABC prongs failed or were uncertain.** Under California law, the worker is presumed to be an employee.

**Actions:**

1. **Do not proceed with the engagement as 1099.**
2. **Check for AB 5 exemption.** Certain professional categories are exempt from the ABC test under AB 2257 (California Labor Code §§ 2776–2787) and instead use the Borello multifactor test. Potentially relevant exemptions include:
   - Licensed professionals (attorneys, accountants, architects, engineers, certain healthcare professionals)
   - Business-to-business relationships meeting specific criteria
   - Consult legal counsel to determine if an exemption applies. Do not self-determine exemption status without legal review.
3. **If no exemption applies:**
   - The engagement must be structured as W-2 employment, or
   - The scope must be restructured to satisfy all three ABC prongs, or
   - The engagement must be routed through a staffing agency that employs the worker as W-2, or
   - The engagement is deferred until Bloom establishes W-2 employment infrastructure
4. **Document the analysis** in the vendor file, including the specific prong(s) that failed, the legal counsel consultation, and the final disposition.

---

### Step 3 — ABC Test Passes (All Three Prongs Satisfied)

**All three ABC prongs are satisfied.** The worker may be classified as an independent contractor under California law.

**Proceed to Step 4 — Entity Classification.**

As a secondary precaution, the MSO Owner may also run the federal IRS 20-factor test (Step 5) to document the federal classification analysis. This is recommended but not required when the ABC test clearly passes.

---

### Step 4 — Entity Classification

**Question:** What is the vendor's legal entity type?

- **Individual / sole proprietor / single-member LLC (disregarded entity):**
  → **1099 Independent Contractor path.** Vendor will receive 1099-NEC if paid $600+ in a calendar year. Collect W-9 (individual TIN — SSN or ITIN). Proceed to onboarding (SOP-009 §5.2).

- **Multi-member LLC:**
  → **Corp-to-Corp path.** Verify entity's tax classification on W-9 (Box 3). If LLC is taxed as C-Corp or S-Corp, the corporate exemption from 1099 may apply (subject to medical/legal exception). If LLC is taxed as a partnership, 1099-NEC is required for payments $600+. Collect W-9 (EIN). Proceed to onboarding.

- **S-Corp:**
  → **Corp-to-Corp path.** Generally exempt from 1099-NEC reporting, EXCEPT for medical/healthcare payments and attorney payments, which require 1099 regardless. Collect W-9 (EIN). Proceed to onboarding.

- **C-Corp:**
  → **Corp-to-Corp path.** Generally exempt from 1099-NEC reporting, EXCEPT for medical/healthcare payments and attorney payments, which require 1099 regardless. Collect W-9 (EIN). Proceed to onboarding.

- **Professional service firm (LLC of professionals — accounting firm, law firm, medical consulting firm):**
  → **Corp-to-Corp path.** Typically structured as LLC, S-Corp, or professional corporation. Verify entity type on W-9. Apply medical/legal exception: if the firm provides medical or legal services, issue 1099 regardless of entity type. Collect W-9 (EIN). Proceed to onboarding.

---

### Step 5 — Federal IRS 20-Factor Test (Optional Backup Analysis)

Use this step when:
- The ABC test result is borderline (all prongs pass but with qualifications)
- Federal classification must be independently documented (e.g., for IRS audit defense)
- The MSO Owner wants additional assurance before proceeding

#### Behavioral Control

| # | Factor | IC Indicator | Employee Indicator | This Vendor |
| --- | --- | --- | --- | --- |
| 1 | Instructions | Vendor determines how to perform work | Bloom gives detailed instructions | |
| 2 | Training | No training provided by Bloom | Bloom trains the vendor | |
| 3 | Integration | Vendor's work is separate from Bloom's operations | Vendor's work is integrated into Bloom's operations | |
| 4 | Personal services | Vendor may delegate or subcontract | Bloom requires the specific individual | |
| 5 | Hiring assistants | Vendor hires own assistants | Bloom hires assistants for vendor | |

#### Financial Control

| # | Factor | IC Indicator | Employee Indicator | This Vendor |
| --- | --- | --- | --- | --- |
| 6 | Continuing relationship | Project-based or term-limited | Indefinite, ongoing relationship | |
| 7 | Set hours | Vendor sets own hours | Bloom sets hours | |
| 8 | Full time | Vendor works for multiple clients | Vendor works full-time for Bloom | |
| 9 | Work location | Vendor chooses location | Bloom designates location | |
| 10 | Order of work | Vendor determines sequence | Bloom dictates order of tasks | |
| 11 | Reports | No regular status reports required | Regular reports to Bloom | |
| 12 | Payment method | Per-project, per-deliverable, or retainer | Hourly or salaried | |
| 13 | Expenses | Vendor bears own expenses | Bloom reimburses expenses | |
| 14 | Tools | Vendor provides own tools | Bloom provides tools/equipment | |

#### Relationship Type

| # | Factor | IC Indicator | Employee Indicator | This Vendor |
| --- | --- | --- | --- | --- |
| 15 | Investment | Vendor has significant investment in own business | No investment in own business | |
| 16 | Profit/loss | Vendor can profit or lose from the engagement | No risk of financial loss | |
| 17 | Multiple clients | Vendor serves or can serve other clients | Works only for Bloom | |
| 18 | Marketing | Vendor markets services to the public | Does not market to others | |
| 19 | Termination | Either party can terminate per contract terms | At-will termination by Bloom | |
| 20 | Benefits | No employee benefits provided | Bloom provides benefits | |

**Federal analysis result:** ______ IC indicators / ______ Employee indicators

**Federal classification:** ☐ Independent Contractor ☐ Employee ☐ Ambiguous — consult legal counsel

---

## Classification Output

Complete this section for every vendor before the first payment is issued.

**Vendor Name:** ____________________________________________

**Vendor Entity Type:** ☐ Individual / Sole Proprietor ☐ Single-Member LLC ☐ Multi-Member LLC ☐ S-Corp ☐ C-Corp ☐ Other: ___________

**ABC Test Result:**
- Prong (A) — Free from control: ☐ PASS ☐ FAIL ☐ UNCERTAIN
- Prong (B) — Outside usual course: ☐ PASS ☐ FAIL ☐ UNCERTAIN
- Prong (C) — Independently established: ☐ PASS ☐ FAIL ☐ UNCERTAIN
- **Overall ABC Result:** ☐ PASSES (all three pass) ☐ FAILS (one or more fail/uncertain)

**Federal 20-Factor Test (if performed):** ☐ IC ☐ Employee ☐ Ambiguous

**Classification Decision:** ☐ 1099 Independent Contractor ☐ Corp-to-Corp ☐ W-2 Employee (escalate to legal) ☐ Clinical provider (future Provider Credentialing SOP)

**1099-NEC Reporting Required?**
☐ Yes — individual, sole proprietor, single-member LLC, or partnership; expected to exceed $600/year
☐ Yes — medical/legal exception applies regardless of entity type
☐ No — corporate exemption applies (C-Corp or S-Corp, non-medical, non-legal)
☐ TBD — entity type to be confirmed on W-9

**Reasoning (1–3 sentences per prong):**

(A): ____________________________________________

(B): ____________________________________________

(C): ____________________________________________

**MSO Owner Signature:** ___________________________________________
**Date:** _______________________________________________

---

## Worked Examples

### Example 1 — Bookkeeper (Mom)

**Vendor:** Family member providing bookkeeping services
**Entity Type:** Individual / sole proprietor
**Engagement:** $300–400/month retainer for bookkeeping, AP/AR, bank reconciliation, vendor file maintenance, 1099 preparation

**ABC Analysis:**

- **(A) Free from control:** PASSES. The bookkeeper sets her own schedule and determines how to perform bookkeeping tasks. Bloom specifies what deliverables are expected (monthly reconciliation, vendor files, 1099s) but does not dictate the methods, schedule, or tools. She works from her own location using her own equipment.
- **(B) Outside usual course of business:** PASSES. Bloom Metabolics' usual course of business is telehealth hormone optimization. Bookkeeping is a financial operations function — it is not part of Bloom's clinical service delivery, patient-facing operations, or core healthcare mission. Every business needs bookkeeping; it is an administrative support function, not a healthcare service.
- **(C) Independently established trade:** PASSES. Bookkeeping is an independently established trade with its own professional body of knowledge. The bookkeeper performs (or has the ability to perform) bookkeeping services for other clients. She is not restricted to working exclusively for Bloom.

**Classification Decision:** 1099 Independent Contractor
**1099-NEC Required:** Yes — individual, expected annual compensation $3,600–$4,800 (above $600 threshold)
**Additional Notes:** Bookkeeper also holds 10% LLC membership. K-1 and 1099 tracked in separate ledger accounts per SOP-009 §5.4.5.

---

### Example 2 — Healthcare Consultant on Contract

**Vendor:** Licensed healthcare consultant engaged to advise on clinical workflow optimization
**Entity Type:** Single-member LLC
**Engagement:** $2,500 one-time project fee for clinical workflow assessment

**ABC Analysis:**

- **(A) Free from control:** PASSES. The consultant determines how to conduct the assessment, sets their own schedule, and uses their own tools and methodology. Bloom specifies the deliverable (assessment report with recommendations) but does not supervise the consultant's day-to-day activities.
- **(B) Outside usual course of business:** PASSES. The consultant advises on clinical workflow optimization — a consulting service. The consultant does not deliver clinical care to Bloom patients. Healthcare consulting is outside Bloom's usual course of telehealth hormone optimization, even though the subject matter relates to healthcare.
- **(C) Independently established trade:** PASSES. The consultant operates an independent consulting practice, maintains their own LLC, and serves multiple healthcare clients.

**Classification Decision:** 1099 Independent Contractor
**1099-NEC Required:** Yes — medical/healthcare exception applies. Even if the consultant operated through an S-Corp or C-Corp, the medical/healthcare payment exception would require 1099-NEC issuance. Because the consultant is a single-member LLC, 1099 is required regardless.

---

### Example 3 — Photographer for Content Session

**Vendor:** Freelance photographer engaged for brand photography
**Entity Type:** Sole proprietor
**Engagement:** $800 per session, estimated 2–4 sessions per year

**ABC Analysis:**

- **(A) Free from control:** PASSES. The photographer uses their own equipment, sets their own creative approach, and determines how to capture the images. Bloom provides a creative brief (desired shots, brand guidelines) but does not supervise the photographer's technique or method.
- **(B) Outside usual course of business:** PASSES. Photography is a creative service. Bloom's usual course of business is telehealth hormone optimization. Photography is outside Bloom's core operations.
- **(C) Independently established trade:** PASSES. The photographer operates their own photography business, serves multiple clients, maintains a portfolio, and markets services to the public.

**Classification Decision:** 1099 Independent Contractor
**1099-NEC Required:** Yes — sole proprietor, expected annual compensation $1,600–$3,200 (above $600 threshold)

---

### Example 4 — Hypothetical Patient Intake Virtual Assistant (FAILS ABC)

**Vendor:** Virtual assistant engaged to handle patient intake calls, collect patient information, schedule consultations, and manage the intake queue
**Entity Type:** Individual / sole proprietor
**Engagement:** $20/hour, estimated 20 hours/week

**ABC Analysis:**

- **(A) Free from control:** UNCERTAIN. While the VA may set their own hours within a window, Bloom would need to prescribe specific intake scripts, require adherence to SOP-002 procedures, and provide training on OptiMantra. The level of control required for clinical-adjacent intake work is significant.
- **(B) Outside usual course of business:** **FAILS.** Patient intake is a core part of Bloom's clinical workflow. SOP-002 (Patient Intake Operations) governs the intake process as a clinical-operational function. A virtual assistant performing intake is doing work squarely within Bloom's usual course of business.
- **(C) Independently established trade:** UNCERTAIN. If the VA is a generalist virtual assistant who also serves non-healthcare clients, prong (C) may pass. However, if the VA works exclusively for Bloom performing healthcare-specific intake, prong (C) is weak.

**Classification Decision:** **FAILS ABC TEST — presumed W-2.**
**Action Required:** This engagement cannot proceed as 1099. Options:
1. Engage through a staffing agency that employs the VA as W-2
2. Restructure the role to remove clinical intake tasks (e.g., limit to scheduling only, which may pass (B))
3. Defer until Bloom establishes W-2 employment infrastructure
4. Consult legal counsel for alternative structure

**This is exactly the scenario AB 5 was designed to address.** A worker performing the hiring entity's core business functions should be classified as an employee, not a contractor.

---

*Bloom Metabolics — Confidential*
*This document is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../../SOP-001-document-control/SOP-001-document-control.md).*
