---
sop_id: "SOP-001"
title: "Document Control & SOP Lifecycle Management"
version: "0.2"
status: "Draft"
effective_date: "TBD (pending approval)"
next_review_date: "12 months from effective date"
owner: "Brian, Owner / Registered Nurse"
approver: "Covering Physician (TBD — pending Doctors for Providers retainer assignment)"
classification: "INTERNAL — CLINICAL & OPERATIONAL USE ONLY"
---

# Document Control & SOP Lifecycle Management

**SOP ID:** SOP-001
**Version:** 0.2
**Status:** Draft
**Effective Date:** TBD (pending approval)
**Next Scheduled Review:** 12 months from effective date
**Document Owner:** Brian, Owner / Registered Nurse
**Approving Authority:** Covering Physician (TBD — pending Doctors for Providers retainer assignment)
**Classification:** INTERNAL — CLINICAL & OPERATIONAL USE ONLY

---

## Notice

### Standing Notice

This Standard Operating Procedure is the property of Bloom Metabolics and is intended exclusively for use by authorized Bloom Metabolics personnel and agents. This document does not constitute medical, legal, or regulatory advice and does not replace individualized clinical judgment by the covering physician. All clinical decisions remain the responsibility of the licensed prescribing clinician.

This SOP is governed by its own terms as the foundational document control instrument for the Bloom Metabolics SOP system. No section of this document may be modified, distributed, or implemented outside the workflow defined herein.

### Status Notice

> This document is in DRAFT status. It has not been reviewed, approved, or signed and is NOT operative. No clinical or operational decision shall be made on the basis of this document in its current state.

---

## 1. Purpose

This SOP establishes the governance framework for all Standard Operating Procedures at Bloom Metabolics. It defines how SOPs are created, reviewed, approved, distributed, trained on, revised, retired, and audited. The objective is to ensure that every SOP governing clinical or operational practice at Bloom Metabolics is current, signed, version-controlled, and demonstrably operationalized within the company's clinical and business systems.

A robust document control system serves multiple functions: it produces auditable evidence of governance for regulatory bodies (California Medical Board, DEA, OCR, LegitScript); it ensures that clinical protocols are reviewed by competent medical authority before implementation; it prevents informal or undocumented changes to clinical workflows; and it provides a single source of truth for how the company operates at any given point in time.

---

## 2. Scope

### 2.1 In Scope

- All clinical SOPs governing patient care activities, including but not limited to: patient intake and eligibility screening, identity verification, synchronous telehealth visits, prescribing protocols (TRT, GLP-1/GIP, sexual health, peptide therapy), laboratory ordering and review, adverse event handling, treatment discontinuation, refill and renewal workflows, controlled substance handling, emergency escalation, and mental health screening and referral
- All operational SOPs governing business processes that support or interface with patient care, including but not limited to: patient communication protocols, records retention, business associate management, marketing and advertising compliance, pharmacy partner management, cold chain handling, and training and competency programs
- All compliance SOPs governing regulatory adherence, including but not limited to: HIPAA/PHI handling, this document control SOP itself, and incident reporting
- Patient-facing forms, consents, and educational documents derived from or referenced by SOPs
- OptiMantra configurations (order sets, charting templates, custom forms, task workflows) that operationalize SOPs
- GHL, n8n, and other system configurations that operationalize operational SOPs

### 2.2 Out of Scope

- Corporate governance documents (MSO Agreement, Shareholder Agreement, Medical Director Agreement) — governed by corporate counsel
- Marketing creative and brand assets (visual identity, photography, video) — governed separately under brand guidelines
- Individual patient medical records — governed under HIPAA and the Records Retention SOP (SOP-TBD)
- Vendor contracts and Business Associate Agreements — governed under Business Associate Management SOP (SOP-TBD)
- Software source code and technical architecture documentation — governed under standard software development practices within the repository
- Financial records, tax filings, and corporate accounting — governed by external CPA and corporate counsel

### 2.3 Corporate Structure Acknowledgment

Bloom Metabolics operates under a Management Services Organization (MSO) and Professional Corporation (PC) structure as required by California's corporate practice of medicine doctrine (California Business & Professions Code §2400 et seq.). This structure has direct implications for SOP ownership, approval authority, and the boundaries of MSO involvement in clinical practice.

**Entity roles under this SOP:**

- **The Professional Corporation (PC)** is the entity that practices medicine. The PC is owned by a licensed California physician and is the entity that employs or contracts the covering physician (Medical Director). All clinical SOPs are PC documents. Final authorship authority and approval authority for clinical SOPs rests with the PC's physician owner or designee.

- **The Management Services Organization (MSO)** provides administrative, operational, technology, marketing, and management services to the PC under a written Management Services Agreement. The MSO is owned by Brian (Owner / Registered Nurse). All operational SOPs that do not direct clinical practice are MSO documents.

**Application to SOP ownership:**

| SOP Type | Drafting Authority | Approval Authority | Document Owner of Record |
| --- | --- | --- | --- |
| Clinical SOPs (prescribing, telehealth visits, lab review, adverse events, patient screening, medical decision-making) | MSO may provide drafting and administrative support | Covering Physician (PC) | Covering Physician (PC), with operational delegation to MSO permitted |
| Hybrid SOPs (patient communication touching clinical advice, intake workflows, refill processes) | MSO drafts; physician reviews | Covering Physician (PC) | Co-owned: MSO operationally, PC clinically |
| Operational SOPs (marketing, IT, HR, vendor management, document control itself) | MSO | MSO Owner | MSO |

**MSO non-interference principle:** Nothing in this SOP system shall be construed as authorizing the MSO to direct, control, or override clinical decision-making by the covering physician. MSO support of clinical SOPs is limited to administrative, formatting, version control, and operationalization functions. Clinical content authority remains with the covering physician.

**Operational delegation:** Where a clinical SOP names "the document owner" for procedural roles (initiating reviews, maintaining the master index, coordinating signatures), the covering physician may delegate these procedural functions to the MSO Owner without delegating content authority. Such delegation is documented in the SOP's revision history.

---

## 3. Definitions

**Standard Operating Procedure (SOP)**
A controlled document that defines a specific clinical or operational process in sufficient detail that qualified personnel can execute the process consistently, correctly, and in compliance with applicable law and professional standards.

**Document Owner**
The individual responsible for drafting, maintaining, and ensuring the operationalization of a specific SOP. The document owner initiates the lifecycle, manages revisions, and is accountable for the document's accuracy and currency. At Bloom Metabolics, the default document owner is Brian (Owner / Registered Nurse) unless explicitly delegated.

**Approving Authority**
The individual with the clinical or operational authority to approve an SOP for implementation. For all clinical SOPs, the approving authority is the covering physician (Medical Director). For purely operational SOPs that do not affect patient care, the owner may serve as approving authority; however, any SOP that could reasonably affect patient safety, clinical outcomes, or regulatory compliance requires physician approval.

**Effective Date**
The date on which an approved SOP becomes operative and binding on all affected personnel. The effective date is populated only after all required signatures are obtained and may be set to a future date to allow for training and operationalization.

**Review Cycle**
The maximum interval between formal reviews of an active SOP. The default review cycle is 12 months. Clinical SOPs may have shorter review cycles based on the volatility of the underlying clinical guidelines or regulatory environment.

**Major Revision**
A substantive change to an SOP that alters procedures, scope, roles, compliance requirements, or clinical protocols. Major revisions require full re-review and re-signature by the approving authority. The version number increments the major digit (e.g., v1.2 becomes v2.0). The previous version is marked Superseded.

**Minor Revision**
A non-substantive change to an SOP, such as clarifications, formatting corrections, typographical fixes, updated cross-references, or contact information changes. Minor revisions are owner-approved and do not require re-signature by the approving authority (though the approving authority is notified). The version number increments the minor digit (e.g., v1.2 becomes v1.3).

**Active**
An SOP that has been approved, signed, distributed, and is currently governing practice. Personnel are bound by the procedures defined in Active SOPs.

**Provisional**
A status applied to an SOP that has been approved by the document owner and approving authority but has not yet received required external legal, compliance, or regulatory counsel review. A Provisional SOP is operative — personnel are bound by it — but its provisional status is explicitly disclosed on the document, in the master index, and in any external audit package. Provisional status is time-limited per Section 5.6.

**Draft**
An SOP that is in development and has not yet entered formal review. Draft SOPs have no governing authority and shall not be relied upon for clinical or operational decisions.

**Under Review**
An SOP that has been submitted for formal review by the approving authority or designated reviewers. The document is frozen during review; changes are captured as reviewer feedback, not inline edits to the document under review.

**Approved**
An SOP that has received all required signatures but may not yet be Active (e.g., pending operationalization in clinical systems or pending training completion by affected personnel).

**Retired**
An SOP that previously governed practice but has been withdrawn because the activity it governs has been discontinued. Retired SOPs are archived and never deleted.

**Superseded**
An SOP that has been replaced by a newer version or a different SOP covering the same scope. The superseding document is identified in the master index. Superseded SOPs are archived and never deleted.

**Change Request**
A formal proposal to modify an active or approved SOP. Change requests are submitted as git pull requests with a description of the proposed change and rationale.

**Acknowledgment of Receipt**
A signed attestation by affected personnel confirming that they have read, understood, and agree to comply with a specific SOP. Acknowledgment is a prerequisite to performing work governed by that SOP.

**Controlled Document**
Any document subject to the lifecycle management processes defined in this SOP. All SOPs are controlled documents. Forms, consents, and educational materials derived from SOPs are controlled documents.

**Master Index**
The authoritative registry of all controlled documents, their current status, version, owner, approver, effective date, and next review date. Maintained at `compliance/master-index.md`.

**Document Library**
The rendered collection of all active SOPs, accessible to all authorized personnel. Generated from source Markdown files using the build scripts in `compliance/build/`.

**Operationalization**
The process of configuring clinical and business systems (OptiMantra, GHL, n8n, etc.) to implement and enforce the procedures defined in an SOP. An SOP is not considered fully Active until operationalization is verified.

---

## 4. Roles & Responsibilities

| Role | Primary Responsibilities Under This SOP |
| --- | --- |
| **Owner (Brian, RN)** | Initiates SOPs; drafts content; maintains the master index; maintains the document library; coordinates review and signature workflow; ensures operationalization in OptiMantra, GHL, n8n, and other systems; triages change requests; conducts quarterly audit readiness verification; schedules and tracks review cycles |
| **Approving Authority (Covering Physician)** | Reviews all clinical SOPs for clinical accuracy, safety, and alignment with evidence-based guidelines; signs as approving authority on clinical SOPs; may delegate review of operational SOPs but retains final approval authority for any SOP affecting patient care; signs review memos for clinical SOPs; available for expedited review when triggered by regulatory change or adverse event |
| **Reviewer (Subject Matter Expert)** | May be internal (owner reviewing operational SOPs) or external (compliance counsel for HIPAA SOP, legal counsel for telehealth visit SOP, pharmacist for controlled substance SOP); provides written review feedback before approval; review is advisory — approval authority remains with the designated approver |
| **Affected Personnel** | All Bloom Metabolics employees, contractors, and agents whose work is governed by an SOP; must sign acknowledgment of receipt within 14 calendar days of notification; must complete any required training before performing work governed by that SOP; must report deviations and proposed changes through the change request workflow |

---

## 5. Procedure

### 5.1 SOP Identification & Numbering Convention

All SOPs are identified by a unique, permanent identifier in the format `SOP-NNN` where NNN is a zero-padded three-digit sequential number.

**Numbering rules:**

- SOP-001 is permanently assigned to this document (Document Control & SOP Lifecycle Management).
- SOP IDs are assigned sequentially as SOPs are initiated. There is no permanent reservation of specific numbers for specific subject matter — the next SOP initiated receives the next available number.
- The master index (`compliance/master-index.md`) maintains a "Planned SOPs" section listing future SOPs in priority order without pre-assigning numbers. SOP IDs are assigned only when drafting begins.
- Once an SOP ID is assigned, it is permanent. If an SOP is never completed (drafting abandoned), the SOP ID is retired and not reused.
- Once an SOP is retired or superseded, its SOP ID remains permanently associated with the original document and is not reused.
- Each SOP resides in its own directory: `compliance/sops/SOP-NNN-short-title/`.

**Short title conventions:**
- Use lowercase, hyphen-separated descriptive titles (e.g., `patient-intake`, `telehealth-visit`, `adverse-event-reporting`)
- The short title is a filesystem convenience; the authoritative title is the one in the document's frontmatter

### 5.2 SOP Lifecycle States

Every SOP exists in exactly one of the following states at any given time. The lifecycle state diagram is provided in [Attachment A](attachments/attachment-A-sop-lifecycle-flowchart.md).

**Draft**
- Entry criteria: SOP ID assigned; template instantiated; initial content authored
- Exit criteria: Owner certifies structural completeness and submits for review
- Authorization to transition: Document Owner
- Documentation generated: Git commit history; draft file in repository

**Under Review**
- Entry criteria: Owner submits for review; all template sections populated; no placeholder text remaining (except TBD items genuinely pending external input)
- Exit criteria: All designated reviewers have submitted feedback; owner has addressed all feedback (accepted, rejected with rationale, or deferred with rationale)
- Authorization to transition: Document Owner (to submit); Reviewer (to return feedback)
- Documentation generated: Review memo(s) committed to SOP directory under `attachments/`; feedback resolution log

**Approved**
- Entry criteria: Approving authority has signed the signature page; effective date has been set
- Exit criteria: Effective date arrives; operationalization verified; affected personnel notified
- Authorization to transition: Approving Authority (to approve); Document Owner (to activate)
- Documentation generated: Signed signature page (PDF); master index update

**Active**
- Entry criteria: Effective date has passed; operationalization verified in clinical/business systems; affected personnel notified and acknowledgment period initiated
- Exit criteria: Superseded by new version, retired, or review cycle triggers re-evaluation
- Authorization to transition: Document Owner (for review initiation); Approving Authority (for retirement or supersession)
- Documentation generated: Personnel acknowledgment log entries; operationalization verification note in revision history

**Superseded**
- Entry criteria: A new version of the SOP (major revision) has been approved and activated
- Exit criteria: None (terminal state; document is archived permanently)
- Authorization to transition: Automatic upon activation of superseding version
- Documentation generated: Master index update with supersession date and reference to new version; file moved to `compliance/sops/_archive/`

**Retired**
- Entry criteria: The activity governed by the SOP has been permanently discontinued, or the SOP has been consolidated into another document
- Exit criteria: None (terminal state; document is archived permanently)
- Authorization to transition: Document Owner with Approving Authority concurrence
- Documentation generated: Retirement memo with rationale; master index update; file moved to `compliance/sops/_archive/`

### 5.3 Drafting an SOP

1. Assign the next available SOP ID from the master index
2. Create the SOP directory: `compliance/sops/SOP-NNN-short-title/`
3. Copy `compliance/templates/sop-master-template.md` into the directory and rename to `SOP-NNN-short-title.md`
4. Create subdirectories: `attachments/` and `signed/`
5. Populate all frontmatter fields (use "TBD" only for items genuinely pending external input, such as the effective date or approver name if the covering physician has not yet been assigned)
6. Populate all 12 sections of the template with substantive content appropriate to the SOP's subject matter
7. Set status to `Draft` in the frontmatter and header
8. Open a git branch named `sop/SOP-NNN-short-title-vX.Y` for the draft work
9. Commit early and often with clear, descriptive commit messages referencing the SOP ID
10. When the draft is structurally complete, the owner self-reviews against the template reference guide ([Attachment B](attachments/attachment-B-sop-template-reference.md)) before submitting for formal review

### 5.4 Internal Review

1. The document owner conducts an initial review for:
   - Structural completeness (all 12 template sections populated)
   - Consistency with the master template format
   - Internal coherence (no contradictions between sections)
   - Correct cross-references to other SOPs and documents
   - Appropriate use of defined terminology from Section 3
2. The owner identifies whether external review is required:
   - **Clinical SOPs** — always require covering physician review (see Section 5.5)
   - **HIPAA/compliance SOPs** — require compliance counsel review (see Section 5.6)
   - **Telehealth/prescribing SOPs** — require California telehealth legal counsel review (see Section 5.6)
   - **Operational SOPs with no patient care nexus** — owner may approve without external review
3. The owner updates the SOP status to `Under Review` in the frontmatter and master index
4. Reviewer feedback is captured as:
   - Inline comments on a DOCX export (for physician or counsel review), or
   - A review memo committed to `attachments/review-memo-vX.Y.md` (for internal review)

### 5.5 External Review — Clinical SOPs

All clinical SOPs are routed to the covering physician via the Doctors for Providers retainer arrangement. The physician review must address:

1. **Clinical accuracy** — Are the clinical statements, protocols, and decision criteria medically accurate and consistent with the current standard of care?
2. **Patient safety** — Does the procedure adequately protect patient safety, including appropriate screening, contraindication checks, monitoring intervals, and dose limitations?
3. **Evidence-based alignment** — Is the protocol consistent with current evidence-based guidelines (e.g., AUA, Endocrine Society, Obesity Medicine Association, FDA prescribing information)?
4. **Scope-of-practice compliance** — Does the procedure respect California scope-of-practice boundaries for all personnel involved?
5. **Controlled substance handling** — Where applicable, does the procedure comply with DEA requirements (Ryan Haight Act, CURES reporting, prescription monitoring)?
6. **Adverse event escalation** — Are escalation pathways clearly defined, clinically appropriate, and achievable within the operational model?

**Process:**
- Owner generates a DOCX export of the SOP using `compliance/build/build-docx.mjs`
- DOCX is transmitted to the covering physician via the mechanism specified in the Medical Director Agreement (secure email or shared drive)
- Physician provides feedback as redlines on the DOCX or as a signed review memo
- Owner incorporates feedback, documents any items where owner and physician disagree (physician decision is final on clinical matters), and re-submits if the physician requires a second review
- Physician review is a gating step — no clinical SOP advances to Approved without physician sign-off

### 5.6 External Review — Compliance & Legal SOPs

The following SOPs require external legal or compliance review before approval:

| SOP Subject Matter | Required Reviewer |
| --- | --- |
| HIPAA/PHI handling | HIPAA-competent compliance counsel |
| Telehealth visit protocols | California telehealth legal counsel |
| Prescribing protocols | California telehealth legal counsel |
| Identity verification | California telehealth legal counsel |
| Marketing & advertising | FDA-competent regulatory counsel |
| Controlled substance handling | DEA-competent regulatory counsel |
| Records retention | HIPAA-competent compliance counsel |

**Provisional approval and time-limited duration:** Where Bloom Metabolics does not currently retain the required external counsel, an SOP may be approved with a status notation of `Provisional` in the master index. Provisional status is governed by the following constraints:

1. **Operative status:** A Provisional SOP is fully operative — affected personnel are bound by it as if it were a fully Approved SOP.
2. **Disclosure:** Provisional status is explicitly disclosed in:
   - The master index (status field reads `Provisional`)
   - The document header (a Provisional Notice block immediately following the Notice section)
   - Any external audit package or response to regulatory inquiry
3. **Maximum duration:** Provisional status carries a maximum duration of **180 calendar days** from the date of provisional approval.
4. **90-day milestone:** Within 90 days of provisional approval, the document owner must produce a written counsel retention plan committed to the SOP's directory under `attachments/counsel-retention-plan.md`. The plan identifies target counsel, engagement timeline, and budget.
5. **180-day disposition:** At 180 days, if external review has not been completed, the SOP must be resolved through one of three paths:
   - **(a) Complete external review:** External counsel review is completed and the SOP transitions to standard Approved status.
   - **(b) Re-approve as Provisional with documented exception:** The covering physician (for clinical SOPs) or the MSO Owner (for operational SOPs) reaffirms the SOP as Provisional with a written exception rationale. Re-approval extends Provisional status for one additional 180-day period only. Two consecutive Provisional periods (360 days total) is the absolute maximum.
   - **(c) Retire:** The SOP is retired and the activity it governs ceases until the SOP can be replaced with a fully reviewed version.
6. **Quarterly reporting:** Every quarterly audit verification (per §5.14) explicitly lists all Provisional SOPs with their days-in-status and disposition path. Provisional SOPs approaching the 180-day mark are flagged for owner action 30 days in advance.

### 5.7 Approval & Signature

1. Upon completion of all required reviews, the document owner prepares the final version for signature
2. The owner verifies that all reviewer feedback has been addressed and documented
3. The owner populates the effective date (may be a future date to allow for training and operationalization)
4. The approving authority (covering physician for clinical SOPs; owner for purely operational SOPs) signs the signature page
5. The document owner signs the signature page
6. The signature is captured via one of two methods, with the choice made per SOP at the time of approval and documented in the revision history:

   **Method A — Electronic Signature:**
   - Captured via a reputable e-signature platform (DocuSign, HelloSign, Adobe Sign, or equivalent platforms providing legally recognized e-signature under California Civil Code §1633.1 et seq. — Uniform Electronic Transactions Act)
   - The platform-generated audit trail (capturing signer identity, timestamp, IP address, and document hash) is retained alongside the signed PDF
   - Storage path: `compliance/sops/SOP-NNN-short-title/signed/SOP-NNN-vX.Y-signed.pdf` and `signed/SOP-NNN-vX.Y-audit-trail.pdf`

   **Method B — Wet Signature:**
   - Captured on a printed copy of the SOP signature page
   - The signed physical copy is scanned to PDF at minimum 300 DPI
   - The original signed physical copy is retained in the corporate records vault per the Records Retention SOP (SOP-TBD)
   - Storage path: `compliance/sops/SOP-NNN-short-title/signed/SOP-NNN-vX.Y-signed.pdf`
   - The location of the original physical copy is recorded in the SOP's revision history

   Either method satisfies the signature requirement. The choice may be driven by the approving authority's preference, the malpractice carrier's preference, or document criticality. Foundational governance documents (this SOP, the Medical Director Agreement, the Management Services Agreement) and any SOP at the request of the covering physician should default to Method B (wet signature with retained physical original).

7. The signed PDF (and audit trail PDF if Method A) is committed to the repository (the signed PDF is the legal record; the Markdown source is the working document)
8. The master index is updated: status changes to `Approved`, effective date is populated
9. On the effective date, the master index status transitions to `Active`

### 5.8 Distribution & Acknowledgment

1. Upon activation, the document owner:
   - Renders the SOP to the internal HTML document library using `compliance/build/build-html.mjs`
   - Notifies all affected personnel via the established communication channel (email or internal messaging)
   - Provides a direct link to the rendered SOP in the document library
2. All affected personnel are required to sign the Acknowledgment of Receipt section within **14 calendar days** of notification
3. Acknowledgment is tracked in:
   - The signature page of the SOP itself (physical or electronic signature)
   - A personnel acknowledgment log maintained by the document owner
4. Personnel who fail to sign within 14 days are reminded at day 7 and day 12; if unsigned at day 14, escalation to the document owner for direct follow-up
5. New personnel (new hires, new contractors, new agents) sign acknowledgment for all relevant active SOPs as part of onboarding, before beginning work governed by those SOPs

### 5.9 Operationalization in Clinical and Business Systems

Every SOP that defines a procedure executable in a clinical or business system must be operationalized in that system before the SOP is considered fully Active. Operationalization means the system is configured to support, enforce, or prompt the procedure defined in the SOP.

**Clinical system operationalization (OptiMantra):**
- Charting templates that prompt the documentation required by the SOP
- Order sets that implement the clinical protocols defined in the SOP
- Custom forms for intake, consent, or assessment instruments referenced by the SOP
- Task workflows that route work according to the escalation paths defined in the SOP
- Alert configurations for monitoring triggers (e.g., lab values requiring physician review)

**Operational system operationalization (GHL, n8n, other):**
- Communication sequences that implement patient notification requirements
- Automation workflows that enforce timing requirements (e.g., follow-up intervals)
- Form configurations that capture required data elements
- Reporting configurations that surface compliance metrics

**Verification:**

The required operationalization window depends on the complexity of the systems configuration required. The document owner classifies the SOP at the time of approval and the master index reflects the target operationalization completion date.

| Complexity Tier | Definition | Operationalization Window |
| --- | --- | --- |
| **Simple** | A single charting template, single order set, single automation, or single form configuration | 14 calendar days from effective date |
| **Moderate** | A multi-step workflow within a single system, custom forms with dependent logic, or coordinated configurations across two systems | 30 calendar days from effective date |
| **Complex** | Cross-system integration, new vendor configuration, custom development, or coordinated configurations across three or more systems | 60 calendar days from effective date, with a written operationalization plan committed to the SOP's directory under `attachments/operationalization-plan.md` within 14 days of effective date |

Verification is documented as an entry in the SOP's revision history: "Operationalization verified in [system(s)] on [date]."

If operationalization cannot be completed within the applicable window, the SOP remains in `Approved (pending operationalization)` status. The owner documents the delay, the cause, and the revised expected completion date in the SOP's revision history. Delays exceeding the applicable window by more than 50% (i.e., a Simple SOP exceeding 21 days, a Moderate SOP exceeding 45 days, a Complex SOP exceeding 90 days) trigger an escalation to the approving authority and a written assessment of whether the SOP requires revision to accommodate system limitations.

### 5.10 Review Cycle

All active SOPs are subject to periodic review to ensure continued accuracy, relevance, and compliance.

**Default review cycle:** 12 months from effective date (or from most recent review completion date)

**Accelerated review triggers:**
- Regulatory change affecting the SOP's subject matter (new law, updated regulation, enforcement guidance)
- Clinical guideline change (updated professional society guidelines, new FDA safety communication, updated prescribing information)
- Adverse event or near-miss implicating the SOP (root cause analysis identifies SOP gap or ambiguity)
- Change in service line scope (new service added, existing service discontinued or modified)
- Change in covering physician (new physician may have different clinical preferences within the standard of care)
- Change in operational systems (e.g., EHR migration, CRM change) requiring procedure updates
- Change in vendor or supplier (e.g., new compounding pharmacy partner, new lab partner, new e-prescribing vendor, new EHR module) where the change affects procedures defined in any SOP referencing the prior vendor
- External audit finding identifying a gap

**Review process:**
1. The document owner initiates review by re-reading the SOP against current practice, current regulations, and current clinical guidelines
2. The owner determines the review outcome:
   - **No Change** — SOP remains current and accurate; next review date is reset to 12 months from review completion; a "Reviewed — no change" entry is added to the revision history
   - **Minor Revision** — Non-substantive updates needed; follows minor revision workflow (Section 5.11)
   - **Major Revision** — Substantive changes needed; follows major revision workflow (Section 5.11)
3. The master index `next_review_date` is updated regardless of outcome

**Tracking:** Review deadlines are tracked in the master index and monitored via calendar reminders set by the document owner. Overdue reviews (more than 30 days past next_review_date) are flagged in the master index with a `REVIEW OVERDUE` notation.

### 5.11 Revisions

#### 5.11.1 Minor Revisions

Minor revisions address non-substantive changes that do not alter the meaning, scope, or clinical content of the SOP.

**Examples of minor revisions:**
- Typographical corrections
- Formatting improvements
- Updated contact information or role titles
- Clarified language that does not change the substantive meaning
- Updated cross-references to other documents
- Addition of helpful but non-binding notes or examples

**Process:**
1. Document owner makes the changes directly in the Markdown source
2. Version number increments the minor digit (e.g., v1.2 to v1.3)
3. Revision history is updated with a description of the change
4. The approving authority is notified of the change but does not need to re-sign
5. The master index version is updated
6. Affected personnel are notified if the clarification is material to their daily work
7. No new acknowledgment cycle is required unless the owner determines the clarification warrants re-acknowledgment
8. All dates in revision histories, master index entries, and SOP frontmatter are recorded in ISO 8601 format (YYYY-MM-DD) for unambiguous parsing and consistent sorting across all controlled documents.

#### 5.11.2 Major Revisions

Major revisions alter the substantive content of the SOP — procedures, scope, roles, compliance requirements, or clinical protocols.

**Examples of major revisions:**
- New or removed procedural steps
- Changed clinical protocols (doses, monitoring intervals, contraindications)
- Expanded or narrowed scope
- Changed roles or responsibilities
- New compliance requirements
- Changed escalation pathways

**Process:**
1. Document owner creates a new git branch: `sop/SOP-NNN-short-title-vX.0`
2. Changes are made in the branch; the document status is set to `Draft` for the new version
3. The full review workflow (Sections 5.4 through 5.6) is repeated for the new version
4. Upon approval, the new version is signed and the previous version is marked Superseded
5. Version number increments the major digit (e.g., v1.3 to v2.0)
6. The superseded version is moved to `compliance/sops/_archive/` with its original filename
7. A new acknowledgment cycle is initiated for all affected personnel
8. Operationalization is re-verified for any changes affecting clinical or business system configurations

### 5.12 Retirement & Supersession

**Retirement:**
- An SOP is retired when the activity it governs is permanently discontinued (e.g., a service line is shut down, a process is eliminated)
- Retirement requires concurrence from both the document owner and the approving authority
- The retirement decision and rationale are documented in a retirement memo committed to the SOP's directory
- The master index is updated with the retirement date and rationale
- The retired SOP and all associated documents are moved to `compliance/sops/_archive/`
- Retired SOPs are NEVER deleted from the repository — they are part of the permanent audit record
- Personnel are notified that they are no longer bound by the retired SOP

**Supersession:**
- An SOP is superseded when a new version (major revision) or a different SOP replaces its scope
- Supersession occurs automatically when a new version is activated
- The superseded version's master index entry is updated to reference the superseding document
- The superseded SOP is moved to `compliance/sops/_archive/`
- Superseded SOPs are NEVER deleted

**Archive directory:** `compliance/sops/_archive/` contains all retired and superseded SOPs in their final state. Each archived SOP retains its full directory structure (attachments, signed PDFs, review memos). The archive is organized by SOP ID and version.

### 5.13 Change Request Workflow

Any personnel may propose a change to any active SOP. Change requests are the mechanism for continuous improvement of the SOP system.

**Submission paths:**

Change requests may be submitted through either of two paths. Both paths produce the same artifact (a tracked revision in the SOP's `revision-log.md`) and receive the same triage treatment.

**Path A — Technical (Pull Request):**

For requestors comfortable with git-based version control. Suitable for the document owner, technical contractors, and any future technical staff.

1. The requestor creates a git branch from the current active version of the SOP
2. The requestor makes the proposed changes in the branch
3. The requestor opens a pull request against the main branch with:
   - Title: `[SOP-NNN] Brief description of proposed change`
   - Body: what is being changed, why, what triggered the request, and whether the requestor believes this is a minor or major revision
4. The pull request is the change request — no separate form is required.

**Path B — Non-Technical (Intake Form):**

For requestors not working directly in the repository. Suitable for the covering physician, contracted clinical staff, virtual assistants, business associates, and any personnel encountering an SOP gap during day-to-day work.

1. The requestor submits a change request via one of the following intake mechanisms:
   - A standardized email to the document owner (template: [change-request-email-template.md](../../templates/change-request-email-template.md))
   - A change request task in OptiMantra (where the requestor is clinical staff)
   - A direct verbal report to the document owner during a regular check-in (the document owner is responsible for capturing the request in writing within 24 hours)
2. The intake submission must include:
   - Which SOP is affected (by SOP ID or title)
   - What is being changed or what gap is being identified
   - The clinical or operational situation that prompted the request
   - The requestor's recommended resolution (if any)
3. The document owner converts the intake submission into a properly-formatted change request within **5 business days**, including opening the corresponding pull request on behalf of the requestor and tagging the requestor as the originator in the revision log.

**Equivalence:** A change request submitted via Path B carries the same weight, receives the same triage timeline, and produces the same audit trail as one submitted via Path A. The non-technical path exists to ensure that clinical and operational personnel — particularly the covering physician — can contribute improvements without requiring git proficiency.

**Triage:**
1. The document owner triages all change requests within **5 business days** of submission
2. The owner determines:
   - Whether the change is warranted
   - Whether it constitutes a minor or major revision
   - Whether additional review (clinical, legal, compliance) is required
3. The owner communicates the disposition to the requestor

**Dispositions:**
- **Accepted — Minor Revision:** Owner merges or incorporates the change per Section 5.11.1
- **Accepted — Major Revision:** Owner initiates the major revision workflow per Section 5.11.2, using the change request as the starting point
- **Deferred:** Change is warranted but not urgent; scheduled for the next review cycle
- **Rejected:** Change is not warranted; rationale is documented in the pull request and in the SOP's revision history

**Tracking:** All change requests (accepted, deferred, and rejected) are tracked in the SOP's `revision-log.md` for audit purposes.

### 5.14 Audit Readiness

The SOP system must be capable of producing a complete audit package within **24 hours** upon request from any of the following:

- Covering physician (Medical Director)
- Legal counsel (corporate or regulatory)
- Regulatory authority (California Medical Board, DEA, FDA, OCR/HHS for HIPAA)
- LegitScript (healthcare merchant certification)
- Malpractice insurance carrier
- Business associate requesting evidence of HIPAA compliance

**Audit package contents:**
1. Master index showing all SOPs, their status, version, and review dates
2. Current active version of each SOP (Markdown source and/or rendered HTML/DOCX)
3. Signed signature pages (PDF) for all active SOPs
4. Personnel acknowledgment logs showing who has signed each SOP
5. Training records (where required by specific SOPs)
6. Revision histories showing the complete change history of each SOP
7. Review memos from external reviewers (physician, legal, compliance)
8. Evidence of operationalization in clinical and business systems

**Quarterly verification:**
The document owner conducts a quarterly verification (every 90 days) to ensure:
- The master index is accurate and current
- All signed PDFs are present and legible
- No active SOP has an overdue review
- All personnel acknowledgments are current
- The audit package can be assembled within the 24-hour target

Verification is documented as a brief log entry in `compliance/sops/SOP-001-document-control/revision-log.md`.

---

## 6. Documentation Requirements

When this SOP is executed (i.e., when any SOP lifecycle event occurs), the following documentation is generated and maintained:

| Event | Documentation Required | Location |
| --- | --- | --- |
| SOP initiated (Draft created) | New SOP file; master index entry | `compliance/sops/SOP-NNN-*/`; `compliance/master-index.md` |
| Status change | Master index update | `compliance/master-index.md` |
| Review submitted | Review memo or redlined DOCX | `compliance/sops/SOP-NNN-*/attachments/` |
| Approval & signature | Signed signature page (PDF) | `compliance/sops/SOP-NNN-*/signed/` |
| Distribution | Notification record; rendered HTML | `compliance/build/output/html/` |
| Acknowledgment received | Signature on SOP; acknowledgment log entry | SOP signature page; personnel log |
| Operationalization verified | Revision history entry | SOP Section 11 |
| Review cycle completed | Revision history entry; master index update | SOP Section 11; `compliance/master-index.md` |
| Revision (minor or major) | Updated SOP; revision history entry; master index update | SOP file; Section 11; `compliance/master-index.md` |
| Retirement or supersession | Retirement memo; master index update; archive | `compliance/sops/_archive/` |
| Change request | Pull request; revision log entry | Git; `revision-log.md` |
| Quarterly audit verification | Verification log entry | `compliance/sops/SOP-001-document-control/revision-log.md` |

---

## 7. Escalation & Exception Handling

### 7.1 SOP Cannot Be Followed as Written

When a specific clinical or operational scenario arises in which an active SOP cannot be followed as written:

1. **Clinical SOPs:** The personnel encountering the situation escalates immediately to the covering physician. The physician makes the clinical decision and documents the rationale in the patient chart. The deviation is reported to the document owner within 24 hours.
2. **Operational SOPs:** The personnel encountering the situation escalates to the document owner. The owner makes the operational decision and documents the rationale.
3. In both cases, the deviation is documented in writing with:
   - The SOP that could not be followed
   - The specific section(s) that could not be followed
   - The circumstances that prevented compliance
   - The alternative action taken
   - The clinical or operational rationale for the alternative action
   - The outcome
4. The document owner evaluates whether the deviation reveals a gap in the SOP that warrants revision and initiates a change request if appropriate.

### 7.2 Conflicting SOPs

If an SOP is found to conflict with another SOP:

1. Both SOPs are immediately flagged in the master index with a `CONFLICT` notation
2. The document owner triages the conflict within 2 business days
3. The owner determines which SOP takes precedence pending resolution (clinical safety takes priority in all cases)
4. An expedited revision is initiated for one or both SOPs to resolve the conflict
5. The covering physician is consulted if the conflict has clinical implications
6. The conflict, resolution, and rationale are documented in both SOPs' revision histories

### 7.3 Conflict with Regulation or Law

The response to an SOP-regulation conflict depends on whether the conflict creates immediate patient safety risk.

**Tier 1 — Critical (immediate patient safety risk):**

If the SOP-regulation conflict creates immediate or imminent patient safety risk:

1. The SOP is immediately frozen — personnel are instructed to cease following the conflicting provision via the fastest available communication channel
2. The covering physician is contacted within **4 hours** by phone or other direct synchronous channel
3. The covering physician determines interim clinical practice within **24 hours**, communicated to all affected personnel in writing
4. Legal/compliance counsel is engaged within 24 hours (or, if not yet retained, the document owner documents the inability to engage counsel and proceeds with covering physician guidance)
5. Full SOP revision is completed within **5 business days** following the emergency revision workflow
6. The conflict, freeze, interim practice, and resolution are documented in the SOP's revision history with timestamps for each step

**Tier 2 — Standard (regulatory conflict without immediate safety risk):**

If the SOP-regulation conflict does not create immediate patient safety risk but represents a compliance gap:

1. The SOP is flagged in the master index with a `REGULATORY CONFLICT` notation
2. The covering physician and (if retained) legal/compliance counsel are notified within 24 hours
3. The document owner determines whether the conflicting provision should be frozen pending revision (default: yes, unless freezing creates a worse compliance gap)
4. Full SOP revision is completed within **10 business days**
5. The conflict, decision on freezing, and resolution are documented in the SOP's revision history

**Determination of tier:** The covering physician makes the tier determination for clinical SOPs. The document owner makes the tier determination for operational SOPs, escalating to the covering physician if there is any uncertainty about clinical implications.

### 7.4 SOP Cannot Be Operationalized

If an approved SOP cannot be operationalized in the required clinical or business systems:

1. The SOP remains in `Approved` status but does not transition to `Active`
2. The document owner documents the operationalization barrier and expected resolution date
3. The master index reflects the status as `Approved (pending operationalization)`
4. The owner works with system administrators or vendors to resolve the barrier
5. If the barrier cannot be resolved within 30 days, the owner evaluates whether the SOP requires revision to accommodate system limitations

---

## 8. Training & Competency

### 8.1 Training on This Meta-SOP

All personnel who will draft, review, approve, or maintain SOPs must demonstrate competency in this meta-SOP before being authorized to participate in the SOP lifecycle. Competency is demonstrated by:

1. Reading this SOP in its entirety
2. Signing the Acknowledgment of Receipt on the signature page
3. Completing a brief written attestation confirming understanding of:
   - The SOP lifecycle states and transitions
   - The numbering convention
   - The review and approval workflow
   - The change request process
   - The audit readiness requirements

The attestation form template will be developed and attached as Attachment B-2 in a future minor revision.

### 8.2 Training on Individual SOPs

Each SOP specifies its own training requirements in Section 8. At minimum, all SOPs require:
- Reading the SOP
- Signing the Acknowledgment of Receipt

Some SOPs may require additional training (e.g., hands-on demonstration of a clinical procedure, completion of a competency assessment, observation of procedure execution by a qualified supervisor). These requirements are specified in each SOP's Section 8.

### 8.3 Training Records

Training records are maintained by the document owner and include:
- Personnel name and role
- SOP(s) trained on
- Date of training completion
- Method of training (self-study, instructor-led, supervised practice)
- Attestation of competency (where required)
- Signature of trainee and trainer (where applicable)

Training records are part of the audit package and must be producible within 24 hours upon request.

---

## 9. Compliance & Regulatory References

The following standards and regulations provide the basis for maintaining a formal document control system at Bloom Metabolics. These citations are reference anchors for the document control framework, not exhaustive regulatory analysis. Specific clinical and operational SOPs will cite the regulations they each operationalize.

| Standard / Regulation | Relevance to Document Control |
| --- | --- |
| **ISO 9001:2015 Section 7.5** (Documented Information) | International standard for quality management systems; establishes best-practice framework for document creation, review, approval, distribution, and control |
| **21 CFR Part 820 Section 820.40** (Document Controls) | FDA Quality System Regulation for device manufacturers; applied here as a best-practice reference for document control procedures in a healthcare organization |
| **45 CFR Section 164.316(b)(1)** (HIPAA Security Rule — Documentation) | Federal requirement for covered entities and business associates to maintain written policies and procedures, retain documentation for six years, and update as needed |
| **45 CFR Section 164.530(j)** (HIPAA Privacy Rule — Documentation) | Federal requirement to maintain privacy policies and procedures in written form and retain for six years from date of creation or last effective date |
| **California Civil Code §56 et seq.** (Confidentiality of Medical Information Act — CMIA) | California-specific medical information confidentiality law that imposes obligations beyond federal HIPAA. CMIA is enforced separately by California regulators and applies to all California-domiciled providers and to information of California residents. SOPs governing patient information handling must comply with both HIPAA and CMIA. |
| **California Civil Code §1798 et seq.** (Information Practices Act of 1977) | California's general data privacy statute applicable to personal information held by businesses operating in California. Provides additional rights and obligations relevant to electronic patient records and patient communication. |
| **The Joint Commission** (Policy and Procedure Standards) | National accreditation standards for healthcare organizations; establishes expectations for policy and procedure governance (applied as best-practice reference) |
| **LegitScript Healthcare Merchant Certification** | Certification program requiring operational policies and procedures; document control demonstrates governance maturity |
| **California Business & Professions Code Section 2242 et seq.** | California telehealth practice standards; grounds the requirement that telehealth-specific SOPs be written, maintained, and followed |
| **California Business & Professions Code Section 2220.05** | Establishes the Medical Board's authority to investigate and discipline; written SOPs demonstrate standard-of-care compliance |
| **DEA 21 CFR Part 1306** (Prescriptions) | Federal controlled substance prescribing requirements; document control ensures prescribing SOPs remain current with regulatory changes |

---

## 10. Related Documents

- [SOP Master Template](../../templates/sop-master-template.md) — Template used to create all new SOPs
- [Signature Page Template](../../templates/signature-page-template.md) — Standalone signature page for SOPs requiring additional signatories
- [Revision History Template](../../templates/revision-history-template.md) — Standalone revision history block
- [Master Index](../../master-index.md) — Authoritative registry of all controlled documents
- [Attachment A — SOP Lifecycle Flowchart](attachments/attachment-A-sop-lifecycle-flowchart.md) — Visual lifecycle state diagram
- [Attachment B — SOP Template Reference](attachments/attachment-B-sop-template-reference.md) — Writer's guide for SOP authors
- [Attachment C — Roles & Responsibilities Matrix](attachments/attachment-C-roles-and-responsibilities-matrix.md) — RACI matrix for all lifecycle activities
- Bloom-3-Medical-Director-Agreement.docx — Corporate document defining covering physician relationship (maintained outside this repository by corporate counsel)

---

## 11. Revision History

| Version | Date | Author | Description of Change | Approver |
| --- | --- | --- | --- | --- |
| 0.1 | 2026-05-02 | Brian | Initial draft. Pending covering physician review and approval. | TBD |
| 0.2 | 2026-05-03 | Brian | Minor revision incorporating pre-physician-review structural and content refinements. Changes: (1) added §2.3 Corporate Structure Acknowledgment for MSO/PC framing; (2) defined Provisional status in §3; (3) added Provisional status guardrails (180-day max, 90-day counsel retention plan, quarterly reporting) in §5.6; (4) tiered operationalization windows (14/30/60 days) in §5.9; (5) two-path change request workflow (technical and non-technical) in §5.13; (6) wet signature alternative in §5.7; (7) clarified numbering convention (no pre-reservation) in §5.1; (8) added vendor change as accelerated review trigger in §5.10; (9) added Critical tier for regulatory conflicts with 4-hour physician contact in §7.3; (10) added CMIA and California Information Practices Act references in §9; (11) standardized ISO 8601 date format in §5.11.1; (12) restructured Notice block in master template and SOP-001. Classified as minor revision per SOP-001 §5.11 because the document remains in Draft status with no signatures or operationalization to disrupt. Subject to legal counsel review on items 1, 3, 6, and 10. | TBD |

---

## 12. Approval & Signature

This SOP becomes effective only when signed by the document owner and approving authority below. Until both signatures are present and the effective date is populated, this document is **DRAFT** and shall not govern clinical or operational practice.

---

**Document Owner**

Name: _______________________________________________
Title: Owner / Registered Nurse
Signature: ___________________________________________
Date: _______________________________________________

---

**Approving Authority — Covering Physician (Medical Director)**

Name: _______________________________________________
Title: _______________________________________________
Medical License #: ___________________________________
State: California
DEA # (if applicable): ________________________________
Signature: ___________________________________________
Date: _______________________________________________

---

**Acknowledgment of Receipt and Review**

By signing below, the personnel listed acknowledge they have read, understood, and agree to comply with this SOP.

| Name | Role | Signature | Date |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

---

*Bloom Metabolics — Confidential*
*This document is self-governing as the foundational document control instrument for Bloom Metabolics.*
