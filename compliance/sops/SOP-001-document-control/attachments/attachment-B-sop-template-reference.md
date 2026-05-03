# Attachment B — SOP Template Reference Guide

**Parent Document:** [SOP-001 — Document Control & SOP Lifecycle Management](../SOP-001-document-control.md)

---

## Overview

This guide provides annotated instructions for each section of the [SOP Master Template](../../../templates/sop-master-template.md). Use this reference when drafting a new SOP to ensure each section is populated with appropriate, substantive content.

---

## Frontmatter (YAML)

```yaml
---
sop_id: "SOP-NNN"           # Assigned from master index; never reused
title: "Full Title"          # Authoritative title; used in all references
version: "X.Y"              # Major.Minor; starts at 0.1 for drafts
status: "Draft"             # Draft | Under Review | Approved | Active | Retired | Superseded
effective_date: "YYYY-MM-DD" # Populated only after approval signatures obtained
next_review_date: "YYYY-MM-DD" # 12 months from effective date (default)
owner: "Name, Title"        # Person responsible for maintenance
approver: "Name, Title"     # Person with approval authority
classification: "INTERNAL — CLINICAL & OPERATIONAL USE ONLY"
---
```

**What good looks like:** All fields populated. "TBD" used only for genuinely pending external input (e.g., approver name before physician is assigned, effective date before signatures). Version starts at 0.1 for initial drafts, 1.0 for first approved version.

---

## Section 1 — Purpose

**What to write:** One to two paragraphs explaining:
- Why this SOP exists (what problem it solves, what risk it manages)
- What outcome it produces when followed correctly
- What would happen if this SOP did not exist

**What good looks like:** Clear, specific, and grounded in operational reality. Avoid generic language like "to ensure quality." Instead: "To establish a consistent, auditable process for verifying patient identity prior to prescribing controlled substances, preventing unauthorized prescription access and satisfying Ryan Haight Act requirements for telehealth prescribing."

**Common mistakes:**
- Too vague ("to ensure compliance")
- Too long (more than 3 paragraphs)
- Restating the scope instead of the purpose

---

## Section 2 — Scope

### 2.1 In Scope

**What to write:** A bulleted list of the specific activities, personnel, service lines, locations, and scenarios governed by this SOP.

**What good looks like:** Specific and bounded. Each bullet identifies a concrete activity or category. Example:
- Synchronous video consultations for new TRT patients
- Follow-up consultations for existing TRT patients at 6-week and 12-week intervals
- Provider documentation requirements during and after each consultation

### 2.2 Out of Scope

**What to write:** Activities explicitly NOT governed by this SOP, with a cross-reference to the SOP that does govern them.

**What good looks like:** Prevents scope ambiguity by naming the boundary cases. Example:
- Asynchronous messaging between patients and providers — governed by SOP-XXX (Patient Communication)
- Laboratory ordering and result interpretation — governed by SOP-XXX (Lab Review & Management)

**Common mistakes:**
- Omitting the cross-reference (leaves the reader without a path to the right SOP)
- Listing items that are obviously out of scope (e.g., "manufacturing automobiles")

---

## Section 3 — Definitions

**What to write:** A glossary of terms used in the SOP that have specific, precise meanings in this context. Include terms that might be ambiguous, terms of art, abbreviations, and terms defined differently across regulatory frameworks.

**What good looks like:** Rigorous definitions that eliminate ambiguity. Each definition is self-contained and could be understood by a new employee reading the SOP for the first time.

**Common mistakes:**
- Defining commonly understood terms unnecessarily
- Circular definitions
- Definitions that are too long (a definition should be 1-3 sentences)

---

## Section 4 — Roles & Responsibilities

**What to write:** A table identifying every role involved in executing this SOP and their specific responsibilities under this SOP.

**What good looks like:** Roles map to real positions (not hypothetical future positions). Responsibilities are specific and actionable. Each role has a clear, non-overlapping set of responsibilities.

| Role | Primary Responsibilities Under This SOP |
| --- | --- |
| Prescribing Physician | Reviews lab results; makes prescribing decisions; documents clinical rationale; escalates adverse events |
| Owner (Brian, RN) | Coordinates patient scheduling; ensures documentation completeness; manages refill workflow; escalates clinical questions to physician |

**Common mistakes:**
- Listing roles that have no responsibilities under this specific SOP
- Vague responsibilities ("supports the process")
- Overlapping responsibilities without clear delineation of who decides

---

## Section 5 — Procedure

**What to write:** The substantive heart of the SOP. Step-by-step procedures organized in numbered subsections (5.1, 5.2, 5.3...). Every decision point must specify:
- Who decides
- What the decision criteria are
- What documentation is required
- What the escalation path is if criteria are not met

**What good looks like:** A new employee could follow the procedure without asking questions. Procedures are ordered logically (usually chronologically). Decision criteria are objective and measurable where possible. Escalation paths are unambiguous.

**Formatting guidance:**
- Use numbered subsections for major procedural phases
- Use numbered lists for sequential steps within a phase
- Use tables for decision matrices or criteria sets
- Reference attachments for flowcharts or complex decision trees
- Use bold for critical decision points or safety-critical steps

**Common mistakes:**
- Procedures that assume institutional knowledge
- Missing decision criteria ("use clinical judgment" without specifying what factors to consider)
- Missing escalation paths at decision points
- Steps that combine multiple actions (each numbered step should be one discrete action)

---

## Section 6 — Documentation Requirements

**What to write:** What must be documented in the systems of record (OptiMantra, GHL, etc.) when this SOP is executed. Be specific about what gets documented, where, and when.

**What good looks like:** A compliance auditor could verify that the SOP is being followed by checking the documentation trail. Example:
- Chart note in OptiMantra documenting: chief complaint, relevant history reviewed, assessment, plan, prescriptions ordered, follow-up timeline
- Order set activated: "TRT New Start — Standard"
- Patient consent form signed and uploaded to OptiMantra document store

**Common mistakes:**
- Stating that documentation is required without specifying what or where
- Not specifying timing (document during the encounter vs. within 24 hours)

---

## Section 7 — Escalation & Exception Handling

**What to write:** What happens when the normal procedure cannot be followed. Cover:
- Common exception scenarios
- Who is contacted for each type of exception
- How the exception is documented
- Whether and how the SOP is updated in response

**What good looks like:** Acknowledges that real-world scenarios do not always fit neatly into procedures. Provides clear guidance for edge cases without requiring personnel to make unguided judgment calls.

**Common mistakes:**
- Claiming the procedure covers all scenarios (it never does)
- Exception handling that is more complex than the normal procedure
- Missing documentation requirements for exceptions

---

## Section 8 — Training & Competency

**What to write:** How personnel are trained on this SOP, how competency is assessed, and how training is documented.

**What good looks like:** Proportionate to the complexity and risk of the SOP. A simple operational SOP may require only reading and acknowledgment. A clinical SOP for controlled substance prescribing may require supervised practice, competency assessment, and annual re-certification.

**Common mistakes:**
- Requiring elaborate training for low-risk procedures
- Insufficient training requirements for high-risk procedures
- Not specifying how training records are maintained

---

## Section 9 — Compliance & Regulatory References

**What to write:** Citations to applicable laws, regulations, professional standards, and clinical guidelines that this SOP operationalizes or is required by.

**What good looks like:** Specific citations (statute section numbers, regulation parts, guideline document titles). Brief explanation of relevance. Example:
- DEA 21 CFR Part 1306 — Federal controlled substance prescribing requirements; this SOP's identity verification and CURES check procedures operationalize these requirements
- AUA/Endocrine Society Guidelines on Testosterone Deficiency (2018) — Clinical protocol in Section 5 is aligned with these guidelines

**Common mistakes:**
- Citing regulations without explaining their relevance
- Missing key regulations (every clinical SOP should cite relevant California B&P Code sections)
- Citing regulations that are not actually applicable

---

## Section 10 — Related Documents

**What to write:** Cross-references to other SOPs, forms, consents, and reference materials that relate to this SOP.

**What good looks like:** Relative Markdown links that resolve correctly within the repository. Brief description of the relationship. Example:
- [SOP-002 — Patient Intake & Eligibility](../SOP-002-patient-intake/SOP-002-patient-intake.md) — Governs the intake process that precedes the telehealth visit defined in this SOP
- [New Patient Consent Form](../../../forms/new-patient-consent.pdf) — Signed during the intake process; verified at the start of the telehealth visit

---

## Section 11 — Revision History

**What to write:** A table tracking every change to the SOP. Populated by the document owner each time a revision is made.

**Format:** Use the standard table from the template. Never delete rows — the history is append-only.

---

## Section 12 — Approval & Signature

**What to write:** Use the standard signature blocks from the template without modification. Additional signature blocks may be added for SOPs requiring multiple approvers (e.g., both a physician and a pharmacist for controlled substance SOPs).

---

*Bloom Metabolics — Confidential*
