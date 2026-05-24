---
sop_id: "SOP-009"
title: "Vendor & Contractor Management (1099 Operations)"
version: "0.2"
status: "Draft v0.2 (MSO-Only — Pending MSO Owner Approval)"
effective_date: "TBD (pending approval)"
next_review_date: "12 months from effective date"
owner: "Brian DeGuzman, MSO Owner / Registered Nurse"
approver: "Brian DeGuzman, MSO Owner (per SOP-001 §2.3 — operational SOPs approved by MSO Owner)"
classification: "INTERNAL — OPERATIONAL USE ONLY"
governing_sop: "SOP-001 (Document Control & SOP Lifecycle Management)"
related_documents:
  - "SOP-001 (Document Control)"
  - "Future Provider Credentialing, Insurance & Coverage SOP — boundary clarified in §5.8 (planned; number assigned at draft time per SOP-001 §5.1)"
  - "Bloom Metabolics LLC Operating Agreement"
  - "Bookkeeping Services Engagement Letter"
  - "Future HIPAA Compliance SOP (BAA workflow for vendors with PHI access)"
---

# Vendor & Contractor Management (1099 Operations)

**SOP ID:** SOP-009
**Version:** 0.2
**Status:** Draft v0.2 (MSO-Only — Pending MSO Owner Approval)
**Effective Date:** TBD (pending approval)
**Next Scheduled Review:** 12 months from effective date
**Document Owner:** Brian DeGuzman, MSO Owner / Registered Nurse
**Approving Authority:** Brian DeGuzman, MSO Owner (per SOP-001 §2.3 — operational SOPs approved by MSO Owner)
**Classification:** INTERNAL — OPERATIONAL USE ONLY

---

## Notice

### Standing Notice

This Standard Operating Procedure is the property of Bloom Metabolics and is intended exclusively for use by authorized Bloom Metabolics personnel and agents. This document does not constitute medical, legal, tax, or regulatory advice and does not replace individualized guidance from qualified legal counsel, a certified public accountant, or a licensed tax professional. All tax classification and reporting decisions described herein are operational guidance subject to professional review.

This SOP is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md). No section of this document may be modified, distributed, or implemented outside the workflow defined therein.

### Status Notice

> This document is in DRAFT status. It has not been reviewed, approved, or signed and is NOT operative. No vendor onboarding, contractor classification, payment processing, or 1099 issuance shall be conducted on the basis of this document in its current state.

### Operational Authority Notice

> This is an MSO-only operational SOP per [SOP-001 §2.3](../SOP-001-document-control/SOP-001-document-control.md). All content herein concerns the administrative, financial, and compliance operations of Bloom Metabolics LLC (the MSO). There is no clinical content in this SOP, and the Covering Physician has no review or approval burden. The MSO Owner (Brian DeGuzman) serves as both Document Owner and Approving Authority. This SOP does not govern licensed clinical provider relationships — those are governed by the future Provider Credentialing, Insurance & Coverage SOP (planned; not yet drafted). The boundary between that future SOP and SOP-009 is clarified in §5.8.

---

## 1. Purpose

This SOP establishes the operational framework for engaging, classifying, paying, monitoring, and offboarding every non-licensed-provider paid relationship that Bloom Metabolics LLC enters into. It ensures that every vendor and contractor relationship is properly classified (W-2 vs. 1099 independent contractor vs. corp-to-corp), properly documented (W-9, contract, certificate of insurance where applicable, HIPAA Business Associate Agreement where applicable), properly tracked (year-to-date payment ledger, classification status), and properly closed out (year-end 1099-NEC issuance, record retention).

Specifically, this SOP defines:

- The **classification decision process** (W-2 vs. 1099 vs. corp-to-corp), referencing both the federal IRS 20-factor test and California's stricter ABC test under AB 5 (California Labor Code § 2775)
- The **pre-engagement onboarding workflow** — W-9 collection, contractor agreement execution, certificate of insurance requirements (where applicable), HIPAA BAA execution (where applicable)
- **Ongoing payment tracking**: per-vendor year-to-date payment ledger, payment-method documentation, expense categorization
- **Year-end 1099-NEC reconciliation**, generation, filing, and delivery
- **Record retention** specific to vendor and contractor records
- **Vendor offboarding**: final payment, contract closeout, file archival
- **Bookkeeper-specific provisions** codifying the existing bookkeeping engagement
- The **boundary between the future Provider Credentialing SOP and SOP-009** for backup provider engagements

This SOP does NOT address:

- **Licensed clinical providers** (Covering Physician, backup physicians, future APNs) — governed by the future Provider Credentialing, Insurance & Coverage SOP (planned; not yet drafted)
- **W-2 employees** — Bloom Metabolics has no W-2 employees at v0.1. If Bloom hires W-2 employees, this SOP is amended or a separate Employee Onboarding SOP is created
- **SaaS subscription vendors** that issue invoices, charge a flat subscription fee, and require no contract beyond click-through Terms of Service (e.g., GoHighLevel, OptiMantra, n8n Cloud, Bland.ai, Vercel, Stripe). These vendors are tracked operationally for expense and compliance purposes but do not require 1099 issuance (corporate vendors with EIN on file are generally exempt). Section 5.7 clarifies this treatment
- **HIPAA Business Associate Agreement workflow** for non-1099-relevant SaaS vendors — governed by future HIPAA Compliance SOP

---

## 2. Scope

### 2.1 In Scope

- All individual independent contractors (sole proprietors, single-member LLCs, freelancers) paid by Bloom Metabolics LLC
- All non-individual contractors (multi-member LLCs, S-Corps, professional service firms) where 1099 reporting may apply
- All vendors paid for services — legal, accounting, consulting, content production, marketing, photography, virtual assistance, and other professional or administrative services
- Vendors engaged for one-off projects and vendors engaged on recurring retainers
- The bookkeeping role (currently filled by a family member) — explicitly in scope at v0.1 and codified in §5.4
- Vendor classification analysis under California's ABC test (AB 5) and the federal IRS 20-factor test
- Year-end 1099-NEC issuance for all non-exempt vendors paid $600 or more in nonemployee compensation during the calendar year

### 2.2 Out of Scope

- **Licensed clinical providers** — governed by the future Provider Credentialing SOP (planned). A backup physician engaged on a per-consult basis through the Professional Corporation (PC) is governed by that future SOP; the boundary is clarified in §5.8
- **W-2 employees** — Bloom Metabolics has no W-2 employees at v0.1
- **SaaS subscription vendors** with click-through Terms of Service and no separate contract (GoHighLevel, OptiMantra, Stripe, Bland.ai, n8n Cloud, Vercel, etc.) — tracked as operating expenses; corporate exemption from 1099 reporting applies per §5.7
- **Pharmacy partners** (SP Bio Labs, Strive Pharmacy, future 503A/503B partners) — governed by Strategic Partnership Agreements and a future Pharmacy Partner Management SOP
- **Lab vendors** (LabCorp) — governed by [SOP-006 (Lab Ordering & Review)](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md) and the LabCorp Services Agreement
- **Investors and equity holders** — governed by the Operating Agreement, Shareholder Agreement, and any executed SAFE or convertible note instruments
- **Banking, payment processing, and merchant services** — governed by separate financial operations workflow

---

## 3. Definitions

**Vendor**
Any external party paid by Bloom Metabolics LLC for services, regardless of legal form (sole proprietor, LLC, S-Corp, C-Corp) and regardless of payment cadence (one-off, recurring, retainer). The term "vendor" is used broadly in this SOP to encompass both entity-level and individual-level service providers.

**Contractor**
A vendor that is an individual or single-member LLC providing services as an independent contractor rather than as a W-2 employee. Contractors are subject to the classification analysis in §5.3 and [Attachment A](attachments/attachment-A-classification-decision-tree.md).

**Independent Contractor (IC)**
A contractor that, when tested under both the IRS 20-factor test and California's ABC test, qualifies as a 1099 worker rather than a W-2 employee. The ABC test is the primary classification test for California work relationships. The IC designation must be supported by a documented classification analysis in the vendor file.

**Corp-to-Corp (C2C)**
A vendor relationship where the contractor operates through a corporation (LLC, S-Corp, C-Corp) and Bloom Metabolics pays the corporation, not the individual. C2C arrangements may exempt the vendor from 1099-NEC reporting depending on entity type, subject to the medical/legal exception described in §5.7.

**W-9 (IRS Form W-9)**
Request for Taxpayer Identification Number and Certification. Required from every vendor before the first payment is issued. The W-9 provides the vendor's legal name, business name, entity type, exemption codes, address, and taxpayer identification number (TIN). Bloom Metabolics does not issue payment to any vendor without a complete, signed W-9 on file.

**1099-NEC (IRS Form 1099-NEC)**
Nonemployee Compensation. Required for non-corporate vendors paid $600 or more in a calendar year for services. Bloom Metabolics issues 1099-NEC forms annually by the January 31 filing deadline for the preceding calendar year.

**1099-MISC (IRS Form 1099-MISC)**
Miscellaneous Information. Required for certain payments including rents, prizes, and attorney fees paid to the attorney's firm. Limited applicability at v0.1 but governed by this SOP if needed.

**Backup Withholding**
Federal income tax withholding at 24% required when a vendor fails to provide a valid TIN on Form W-9, or the IRS notifies Bloom that the vendor's TIN is incorrect. Bloom Metabolics' operational policy is to not engage vendors who refuse to provide a W-9. Backup withholding is an enforcement mechanism of last resort.

**EIN / TIN**
Employer Identification Number (EIN) and Taxpayer Identification Number (TIN). EIN is assigned to business entities; Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN) is used for individuals. Provided on W-9.

**Certificate of Insurance (COI)**
Evidence of a vendor's general liability, professional liability (errors and omissions), or other applicable insurance coverage. Required for vendors whose work creates risk to Bloom Metabolics — including on-site contractors, professional service providers with errors-and-omissions exposure, and vendors whose negligence could create third-party liability for Bloom.

**BAA (Business Associate Agreement)**
A HIPAA-required agreement with any vendor that creates, receives, maintains, or transmits protected health information (PHI) on Bloom's behalf. BAA execution is required before the vendor accesses any PHI. Coordination with a future HIPAA Compliance SOP is anticipated.

**ABC Test (California)**
California's three-prong test for independent contractor classification under AB 5 (California Labor Code § 2775). A worker is presumed to be an employee unless the hiring entity demonstrates all three prongs:

- **(A)** The worker is free from the control and direction of the hiring entity in connection with the performance of the work, both under the contract for the performance of the work and in fact
- **(B)** The worker performs work that is outside the usual course of the hiring entity's business
- **(C)** The worker is customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed

If any prong fails, the worker is presumed to be an employee under California law.

**IRS 20-Factor Test (Federal)**
The federal test for independent contractor classification, organized around three categories: behavioral control (instructions, training, evaluation), financial control (investment, expenses, opportunity for profit or loss), and relationship type (written contracts, benefits, permanency, whether services are key to the business). Used as backup analysis when the ABC test is ambiguous or when federal classification must be independently documented.

**Vendor File**
The MSO-maintained file (digital, access-controlled) containing every artifact for a single vendor: W-9, signed agreement, COI and BAA where applicable, classification analysis, payment log, and correspondence. Vendor files are stored at `compliance/vendor-files/[vendor-name]/` and retained per [Attachment F](attachments/attachment-F-record-retention-schedule.md).

**YTD Payment Ledger**
Running total of payments to each vendor in the current calendar year, maintained in the accounts payable tool (QuickBooks or equivalent) and reconciled monthly. Used to determine 1099 issuance threshold ($600) and to support year-end reconciliation.

---

## 4. Roles & Responsibilities

| Role | Primary Responsibilities Under This SOP |
| --- | --- |
| **MSO Owner (Brian DeGuzman)** | Approves all new vendor engagements. Drafts or executes contractor agreements. Runs or reviews classification analyses using [Attachment A](attachments/attachment-A-classification-decision-tree.md). Approves COI and BAA requirements per vendor scope. Reviews bookkeeper's monthly vendor file maintenance. Signs annual 1099-NEC filings. Conducts annual vendor file self-audit. Escalates classification concerns to legal counsel. |
| **Bookkeeper (currently filled by family member)** | Operationally executes this SOP day-to-day. Collects W-9s and COIs from new vendors upon MSO Owner direction. Creates and maintains vendor files. Tracks YTD payments per vendor in the accounts payable tool. Reconciles vendor payments to bank statements monthly. Runs year-end 1099 reconciliation per [Attachment E](attachments/attachment-E-year-end-1099-NEC-issuance-procedure.md). Generates and files 1099-NEC forms. Reports any classification concerns to MSO Owner immediately. |
| **Legal Counsel (engaged ad-hoc)** | Reviews any vendor classification that fails the ABC test or has ambiguous IC vs. W-2 status. Reviews contractor agreements involving substantial IP, confidentiality, or restrictive covenants. Consulted before any vendor relationship that may trigger AB 5 reclassification risk. |
| **Tax Preparer / CPA (engaged annually)** | Reviews 1099 reconciliation in January. Confirms 1099-NEC filings are complete and accurate. May handle 1099 filing on behalf of Bloom (delegation documented in writing). Reviews classification decisions during annual tax preparation. Advises on California state 1099 filing requirements. |
| **Vendor / Contractor** | Provides completed W-9 before first payment. Provides COI and executes BAA where required. Notifies Bloom of EIN, address, or legal name changes. Operates as a true independent contractor in conduct — not merely on paper. Submits invoices per agreed schedule and format. |

---

## 5. Procedure

### 5.1 Vendor Engagement Decision

When the MSO Owner identifies a need for a new vendor or contractor, the following workflow governs the engagement decision:

1. **Define scope of work.** MSO Owner documents the scope of services, expected duration (one-off, recurring, indefinite), and expected total payment (one-time or annualized). This documentation is informal at this stage — a brief written description is sufficient.

2. **Run preliminary classification.** MSO Owner completes the classification decision tree in [Attachment A](attachments/attachment-A-classification-decision-tree.md). The classification analysis determines whether the engagement is:
   - **1099 Independent Contractor** — proceed to onboarding (§5.2)
   - **Corp-to-Corp** — proceed to onboarding (§5.2) with entity-level documentation
   - **W-2 Employee** — stop. Bloom Metabolics does not have W-2 employment infrastructure at v0.1. If the classification analysis indicates W-2, the MSO Owner escalates to legal counsel before proceeding. The engagement may need to be restructured (e.g., engage through a staffing agency, restructure scope to satisfy ABC test) or deferred until W-2 infrastructure is established
   - **Use the future Provider Credentialing SOP instead** — the engagement is for licensed clinical services and is governed by the future Provider Credentialing SOP (planned; not yet drafted)

3. **Document classification analysis.** The completed [Attachment A](attachments/attachment-A-classification-decision-tree.md) worksheet is filed in the vendor file before the first payment is issued. The analysis must include a written rationale (1–3 sentences per ABC prong) and the MSO Owner's signature.

4. **Legal review trigger.** If any ABC prong is answered "No" or "Uncertain," the MSO Owner must consult legal counsel before proceeding. The legal review is documented in the vendor file. The MSO Owner does not proceed with the engagement until legal counsel has confirmed the classification or recommended a restructured arrangement.

5. **Proceed to onboarding.** Upon confirmed classification (1099 IC or C2C), the MSO Owner initiates the onboarding workflow in §5.2.

### 5.2 Vendor Onboarding

Every vendor must complete the onboarding workflow defined in [Attachment B (Vendor Onboarding Checklist)](attachments/attachment-B-vendor-onboarding-checklist.md) before receiving the first payment. The onboarding workflow includes:

1. **Vendor agreement execution.** MSO Owner drafts the contractor agreement using Bloom's standard Independent Contractor Agreement template `[OPERATIONAL — TO BE BUILT OR LEGAL-REVIEWED]`. Legal review of vendor agreements is required when:
   - **(a)** Bloom's standard Independent Contractor Agreement template is being legal-reviewed for the first time (one-time master template review). This review is required before the template can be used for any engagement.
   - **(b)** The proposed agreement deviates from the legal-reviewed master template — including but not limited to non-standard IP assignment, custom confidentiality terms, restrictive covenants (non-compete, non-solicitation), warranty or indemnification modifications, governing law changes, or any other material departure from the template.
   - **(c)** As a secondary trigger, any engagement with annualized value exceeding $10,000, regardless of whether the template is otherwise unmodified — to ensure that high-value relationships have counsel-confirmed alignment between scope, deliverables, and template language.

   For engagements using the master template without modification and below the $10,000 threshold, no additional legal review is required beyond the one-time master template review. Both parties sign the agreement.

2. **W-9 collection.** The vendor completes IRS Form W-9 and returns a signed copy. The bookkeeper collects the W-9 using the templates in [Attachment C](attachments/attachment-C-w9-and-coi-collection-templates.md). The W-9 must be received before the first payment. There are no exceptions to this requirement. If the vendor fails to provide a W-9, the engagement does not proceed and no payment is issued.

3. **COI collection (where applicable).** A certificate of insurance is required for:
   - Vendors performing on-site work at any Bloom-controlled location
   - Professional service providers with errors-and-omissions exposure (legal counsel, accountants, consultants providing deliverables with professional liability risk)
   - Any vendor whose work creates third-party liability exposure for Bloom
   - COI requirements are determined by the MSO Owner based on the vendor's scope of work. [Attachment C](attachments/attachment-C-w9-and-coi-collection-templates.md) includes a COI request template with minimum coverage requirements.

4. **HIPAA BAA execution (where applicable).** A Business Associate Agreement is required for any vendor that will create, receive, maintain, or transmit PHI on Bloom's behalf. Examples include:
   - Bookkeeper, if she accesses patient billing data, invoicing records, or any information that could identify a patient
   - Contractor developers with access to OptiMantra or any system containing PHI
   - Scribes or virtual assistants with access to patient records
   - Marketing contractors if provided with patient testimonials, before-and-after data, or any PHI for content creation
   - The default posture for any vendor whose role includes any access to payment, invoicing, or operational data that could include individually identifiable patient information is that a BAA is required. Where a vendor's scope is structurally limited to non-PHI data (e.g., a web developer with access only to public-facing marketing pages and no backend systems), the MSO Owner documents the no-BAA decision in the vendor file with a written rationale.
   - BAA execution uses Bloom's standard HIPAA BAA template `[OPERATIONAL — TO BE BUILT OR LEGAL-REVIEWED, COORDINATE WITH FUTURE HIPAA SOP]`. [Attachment C](attachments/attachment-C-w9-and-coi-collection-templates.md) includes a BAA cover email template.

5. **Vendor file creation.** The bookkeeper creates the vendor file at `compliance/vendor-files/[vendor-name]/` containing all collected artifacts: signed agreement, W-9, COI (where applicable), BAA (where applicable), classification analysis, and payment log.

6. **Accounts payable setup.** The bookkeeper enters the vendor into the accounts payable tool (QuickBooks, Bill.com, or current AP platform) with the vendor's legal name, TIN, payment method, and address from the W-9.

7. **Payment clearance.** The MSO Owner certifies that all required onboarding items are present by signing the [Attachment B](attachments/attachment-B-vendor-onboarding-checklist.md) checklist. The vendor is cleared for first payment only after all required artifacts are complete and filed. The signed checklist is filed in the vendor file.

### 5.3 Classification — IRS 20-Factor Test and California ABC Test

This section provides the substantive classification framework. [Attachment A (Classification Decision Tree)](attachments/attachment-A-classification-decision-tree.md) is the operational tool used to execute the analysis.

#### 5.3.1 California ABC Test (Primary Test)

The ABC test, codified by California Labor Code § 2775 (enacted through AB 5, effective January 1, 2020, and amended by AB 2257, effective September 4, 2020), is the default classification test for California work relationships. The test creates a presumption of employment that the hiring entity must rebut by demonstrating all three prongs:

**(A) Free from control and direction.** The worker must be free from the control and direction of the hiring entity in connection with the performance of the work, both under the contract and in fact. This means Bloom Metabolics cannot dictate how, when, or where the vendor performs the work — only what the deliverable or outcome is. The vendor sets their own schedule, uses their own methods, and is not subject to Bloom's day-to-day supervision.

**(B) Outside the usual course of business.** The worker must perform work that is outside the usual course of the hiring entity's business. Bloom Metabolics' usual course of business is telehealth hormone optimization — including patient intake, clinical consultations, prescribing, lab management, and patient communication related to clinical services. Vendors performing work outside that scope — bookkeeping, content production, photography, virtual assistance for non-clinical tasks, legal counsel, marketing, web development — generally pass prong (B). Vendors performing work inside that scope — clinical intake coordination, patient support for clinical questions, in-house medical scribing — likely fail prong (B) and must be classified as W-2 or the engagement must be restructured.

**(C) Independently established trade.** The worker must be customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed for Bloom. This means the vendor has (or has the ability to have) other clients, maintains their own business presence, and holds themselves out to the public as available for the same type of work. A vendor who works exclusively for Bloom with no other clients and no independent business presence may fail prong (C).

**If all three prongs are satisfied:** the worker is classified as an independent contractor. Proceed with 1099 IC onboarding.

**If any prong fails:** the default presumption is W-2 employment. The MSO Owner must consult legal counsel before proceeding. The engagement may need to be restructured to satisfy the ABC test, engaged through a staffing agency that employs the worker as W-2, or deferred until Bloom establishes W-2 employment infrastructure.

#### 5.3.2 AB 5 Exemptions (AB 2257)

Certain professional service categories are exempt from the ABC test under AB 2257 and instead use the older Borello multifactor test. Relevant exemptions may include licensed professionals (attorneys, accountants, architects, engineers), certain business-to-business relationships, and other enumerated categories. The MSO Owner must consult legal counsel before relying on an AB 5 exemption, as the exemption criteria are specific and subject to ongoing legislative and judicial interpretation.

#### 5.3.3 Federal IRS 20-Factor Test (Backup Analysis)

The federal IRS 20-factor test serves as backup analysis when the ABC test is ambiguous or when federal classification must be independently documented (e.g., for IRS audit defense). The 20 factors are organized into three categories:

**Behavioral control:**
- Does Bloom provide instructions on when, where, or how the work is performed?
- Does Bloom provide training?
- Does Bloom evaluate the vendor's work methods (not just results)?

**Financial control:**
- Does the vendor have a significant investment in their own equipment or facilities?
- Does the vendor incur unreimbursed business expenses?
- Does the vendor have the opportunity for profit or loss?
- Does the vendor offer services to the general market?

**Relationship type:**
- Is there a written contract specifying IC status?
- Does Bloom provide employee-type benefits (insurance, retirement, paid leave)?
- Is the relationship indefinite or project-based?
- Are the vendor's services a key aspect of Bloom's regular business?

No single factor is determinative. The IRS analysis considers the totality of the relationship. The MSO Owner documents the analysis in the vendor file using the [Attachment A](attachments/attachment-A-classification-decision-tree.md) worksheet.

### 5.4 Bookkeeper-Specific Provisions

The bookkeeping role is currently filled by a family member at a monthly retainer of $300–400. This section codifies the existing arrangement and ensures full documentation compliance.

#### 5.4.1 Engagement Documentation

The bookkeeper engagement is governed by a written Bookkeeping Services Engagement Letter `[OPERATIONAL — TO BE EXECUTED IF NOT ALREADY]`. The engagement letter specifies:
- Scope of services (bookkeeping, accounts payable, accounts receivable, bank reconciliation, vendor file maintenance, 1099 preparation)
- Compensation: $300–400/month retainer (specific amount per current engagement letter)
- Term and termination provisions
- Confidentiality obligations
- Independent contractor status acknowledgment

#### 5.4.2 Classification Analysis

The bookkeeper is classified as a 1099 independent contractor. The classification analysis is documented in the vendor file with the following justification:

- **(A) Free from control:** The bookkeeper sets her own schedule, uses her own methods, and determines how to perform bookkeeping tasks. Bloom specifies what deliverables are expected (monthly reconciliation, vendor file maintenance, 1099 preparation) but does not control how, when, or where the work is performed.
- **(B) Outside usual course of business:** Bookkeeping is a financial operations function. Bloom Metabolics' usual course of business is telehealth hormone optimization. Bookkeeping is not part of Bloom's clinical service delivery, patient-facing operations, or core healthcare mission. Prong (B) is satisfied.
- **(C) Independently established trade:** The bookkeeper performs (or has the ability to perform) bookkeeping services for other clients. Bookkeeping is an independently established trade with its own body of professional knowledge. Prong (C) is satisfied.

ABC test result: all three prongs satisfied. Classification: 1099 independent contractor.

#### 5.4.3 Required Documentation

The bookkeeper's vendor file must contain:
- Signed Bookkeeping Services Engagement Letter
- Completed and signed W-9
- Executed HIPAA Business Associate Agreement (BAA). The bookkeeper's scope of work includes access to payment records, invoicing, and accounts payable / accounts receivable data. Whether any individual data element constitutes Protected Health Information (PHI) depends on whether it is individually identifiable and relates to a patient's health care or payment for health care. Because Bloom Metabolics operates a healthcare service line and the bookkeeper's role does not include systematic de-identification of patient billing records, Bloom Metabolics adopts the defensive posture that the bookkeeper may encounter PHI and an executed BAA is required as a condition of engagement. The BAA is executed concurrent with the Bookkeeping Services Engagement Letter and filed in the vendor file
- Classification analysis (documented per [Attachment A](attachments/attachment-A-classification-decision-tree.md))
- YTD payment log

#### 5.4.4 Annual 1099-NEC Issuance

At the current retainer rate ($300–400/month), annual compensation is approximately $3,600–$4,800 — well above the $600 threshold. A 1099-NEC is issued annually per §5.6.

#### 5.4.5 Structural Separation from LLC Membership

The bookkeeper holds a 10% membership interest in Bloom Metabolics LLC per the Operating Agreement. The 1099 contractor relationship and the LLC member relationship are kept structurally separate:

- **Contractor payments** for bookkeeping services are 1099-reportable and governed by this SOP. These payments are for services rendered and are reported on Form 1099-NEC.
- **LLC member distributions** are governed by the Operating Agreement and reported on Schedule K-1 (Form 1065). Member distributions are not contractor payments and are NOT reported on 1099.

These two income streams are tracked in separate ledger accounts and reconciled separately at year-end. The bookkeeper's 1099-NEC reflects only contractor payments for bookkeeping services. The K-1 reflects only member distributions per the Operating Agreement. Commingling these streams creates tax reporting errors and must be avoided.

### 5.5 Payment Tracking

Ongoing payment tracking is governed by [Attachment D (Payment Tracking and 1099 Workflow)](attachments/attachment-D-payment-tracking-and-1099-workflow.md). The operational workflow is:

1. **Per-payment logging.** Every payment to a vendor is logged in the YTD payment ledger (maintained in the accounts payable tool) with: date, amount, payment method (check, ACH, credit card, Zelle, Venmo, wire), invoice reference, and expense category.

2. **Monthly reconciliation.** The bookkeeper reconciles vendor payments to bank statements, credit card statements, and any payment platform records (Stripe, PayPal, Venmo) monthly. Discrepancies are investigated and resolved within 5 business days. Unresolved discrepancies are escalated to the MSO Owner.

3. **Quarterly YTD review.** The MSO Owner reviews YTD payment totals per vendor quarterly (at minimum in March, June, September, and December). The review confirms:
   - YTD totals are accurate and reconciled
   - Vendors approaching the $600 threshold have current W-9s on file
   - No unexpected vendors have appeared in the payment ledger
   - Expense categorization is consistent

4. **$500 backstop flag (secondary control).** W-9 collection is the primary control and occurs pre-engagement per §5.2 — no vendor receives a first payment without a W-9 on file. The $500 YTD threshold flag is a **secondary backstop** that prompts the bookkeeper to confirm three things when any vendor crosses $500 in YTD payments: (a) the W-9 on file is still current (vendor has not moved, changed legal name, or changed EIN since the W-9 was signed), (b) the W-9 is signed within the IRS-acceptable freshness window (W-9s do not formally expire but Bloom's standard is to refresh W-9s older than 3 years), and (c) the vendor is queued for January 1099-NEC generation. If the W-9 is found to be stale or incomplete, the bookkeeper immediately requests a refreshed W-9 per [Attachment C](attachments/attachment-C-w9-and-coi-collection-templates.md), and no further payments are issued until the refresh is received.

5. **Missing W-9 enforcement.** If a vendor who has already received payment is discovered to lack a W-9, all future payments are held until the W-9 is received. The MSO Owner is notified immediately. This policy avoids the operational complexity of backup withholding (24% federal withholding) by ensuring W-9 compliance at the point of engagement rather than retroactively.

### 5.6 Year-End 1099-NEC Issuance

The year-end 1099-NEC workflow is executed per [Attachment E (Year-End 1099-NEC Issuance Procedure)](attachments/attachment-E-year-end-1099-NEC-issuance-procedure.md). The summary procedure is:

1. **Early January (by January 10).** The bookkeeper pulls YTD payment totals per vendor from the accounts payable tool (QuickBooks or equivalent). This is the authoritative data source for 1099 amounts.

2. **Identify reportable vendors.** The bookkeeper identifies all vendors with YTD nonemployee compensation of $600 or more.

3. **Apply corporate exemption.** Vendors that are C-Corps or S-Corps (as indicated by the entity type checked on their W-9) are generally exempt from 1099-NEC reporting. However, the following exception applies: **medical and healthcare payments** and **attorney payments** require 1099-NEC reporting regardless of the vendor's corporate status. The bookkeeper applies this exemption carefully — when in doubt, issue the 1099.

4. **Generate 1099-NEC forms.** The bookkeeper generates 1099-NEC for each non-exempt vendor using Track1099, QuickBooks 1099 module, or an equivalent 1099 filing service. Each 1099-NEC must include:
   - Bloom Metabolics LLC as payer (with EIN)
   - Vendor as payee (with TIN from W-9)
   - Total nonemployee compensation paid during the calendar year
   - State tax withheld (if any — typically none for California at v0.1)

5. **File with IRS by January 31.** The bookkeeper e-files all 1099-NECs with the IRS using an approved e-file service. Paper filing is permitted for fewer than 10 forms but e-filing is preferred for auditability.

6. **Deliver to vendors by January 31.** The bookkeeper delivers a copy of each 1099-NEC to the vendor. E-delivery is acceptable if the vendor has provided written consent to electronic delivery. Mail delivery uses the address on the vendor's W-9.

7. **California state filing posture (by January 31).** California participates in the IRS Combined Federal/State Filing (CF/SF) Program. Federal e-filing through an approved 1099 service (Track1099, QuickBooks 1099 module, or equivalent) generally satisfies the California state filing requirement, and California-resident contractor records are forwarded by the IRS to the California Franchise Tax Board automatically. Separate California state 1099 filing is required only in narrow circumstances — including but not limited to California state tax withholding from contractor payments. The bookkeeper confirms with the CPA annually whether any Bloom-specific circumstances require separate California state filing. At v0.1 (no state tax withholding), no separate California filing is anticipated.

8. **Reconciliation.** The bookkeeper reconciles 1099 totals against W-9 records and vendor files. Any discrepancies (total mismatch, missing W-9, vendor name mismatch) are escalated to the MSO Owner same day and resolved before filing.

9. **CPA review.** The CPA reviews and confirms 1099 filings as part of annual tax preparation. Any corrections identified during CPA review are filed using IRS Form 1099 corrected procedures.

10. **Retention.** All 1099-NEC copies (payer copy, IRS copy, vendor copy, state copy) are retained per [Attachment F](attachments/attachment-F-record-retention-schedule.md).

### 5.7 SaaS Vendor and Corporate Vendor Treatment

This section clarifies the 1099 treatment of SaaS subscription vendors and incorporated vendors.

**Corporate exemption:** SaaS vendors (GoHighLevel, OptiMantra, Stripe, Bland.ai, n8n Cloud, Vercel, etc.) typically operate as C-Corps or LLCs taxed as corporations. Per IRS 1099-NEC instructions, payments to corporations are generally exempt from 1099-NEC reporting.

**W-9 collection from SaaS vendors:** Bloom collects a W-9 from every SaaS vendor, even when the corporate exemption is expected to apply. This serves two purposes: (a) confirming the exemption by documenting the vendor's corporate entity type, and (b) documenting the classification decision in the vendor file for audit defense.

**Subscription payment tracking:** Subscription payments to SaaS vendors are tracked as operating expenses in the appropriate expense category but are typically not 1099-reported. The bookkeeper maintains a list of all SaaS vendors with their entity type, W-9 status, and exemption rationale.

**Annual exemption confirmation:** At the start of each calendar year (concurrent with the 1099 issuance cycle), the bookkeeper reviews SaaS vendor W-9s to confirm that corporate status has not changed. If a SaaS vendor has changed entity type (e.g., from C-Corp to sole proprietor), the vendor's 1099 exemption is removed and 1099-NEC is issued for the applicable calendar year.

**Medical/legal exception:** Payments for medical and healthcare services and payments to attorneys are reportable on 1099-NEC regardless of the vendor's corporate status. This exception applies to: legal counsel (regardless of whether counsel operates through an LLC or professional corporation), healthcare consultants, and certain medical service vendors. The bookkeeper applies this exception: if the vendor provides medical or legal services, issue the 1099 regardless of entity type.

### 5.8 Boundary with Future Provider Credentialing SOP

This section clarifies the jurisdictional boundary between the future Provider Credentialing, Insurance & Coverage SOP (planned; not yet drafted) and SOP-009.

**The future Provider Credentialing SOP will govern** licensed clinical providers — the Covering Physician (Dr. Michael Napolitano, MD), backup physicians engaged on a per-consult or locum tenens basis, and future Advanced Practice Nurses (APNs). These are clinicians who deliver medical care to Bloom Metabolics patients under the authority of the Covering Physician's medical license.

**SOP-009 governs** every other paid relationship — bookkeepers, virtual assistants, content contractors, photographers, marketing agencies, software vendors, legal counsel, CPAs, and all other non-clinical service providers.

**Backup provider boundary:** A backup physician engaged on a per-consult basis technically receives compensation through the Professional Corporation (PC), not the MSO. The backup physician's contractor-side documentation — W-9, engagement letter, malpractice COI — is administered using SOP-009's documentation processes for consistency and operational rigor. However, the engagement itself is formally governed by the Backup Provider Engagement Letter under the future Provider Credentialing SOP. The backup provider's clinical credentialing, license verification, DEA verification, and malpractice coverage requirements will be governed exclusively by the future Provider Credentialing SOP.

**Conflict resolution:** Where the future Provider Credentialing SOP and SOP-009 overlap operationally (e.g., W-9 collection for a backup provider, COI verification for malpractice insurance), the future Provider Credentialing SOP will control in case of conflict. SOP-009 provides the documentation discipline and payment tracking infrastructure; the future Provider Credentialing SOP will provide the clinical governance and credentialing requirements.

**Clear delineation:** If there is any question about whether a vendor relationship falls under the future Provider Credentialing SOP or SOP-009, the test is: does the vendor deliver licensed clinical services to Bloom patients? If yes, the future Provider Credentialing SOP. If no, SOP-009.

### 5.9 Vendor Offboarding

When a vendor relationship ends — whether by contract expiration, mutual agreement, termination for cause, or termination for convenience — the following offboarding workflow is executed:

1. **Final invoice.** The vendor submits a final invoice covering all outstanding work. The MSO Owner reviews and approves the final invoice.

2. **Final payment.** The bookkeeper issues the final payment and logs it in the YTD payment ledger. The final payment amount and date are recorded in the vendor file.

3. **Contract closeout.** The MSO Owner reviews the signed contractor agreement for post-termination obligations:
   - Non-disclosure agreement (NDA) provisions — confirm the vendor's ongoing confidentiality obligations
   - IP assignment provisions — confirm that all work product created during the engagement has been delivered and assigned to Bloom
   - Return of confidential information — confirm the vendor has returned or destroyed all Bloom confidential information, documentation, and access credentials
   - Any restrictive covenant provisions — document their duration and scope

4. **Access revocation.** The MSO Owner revokes the vendor's access to all Bloom systems, accounts, and data within 24 hours of the final payment date. This includes OptiMantra access, GHL access, shared drives, Slack channels, email distribution lists, and any other system the vendor was provisioned to access.

5. **Vendor file update.** The bookkeeper marks the vendor file "INACTIVE" with the effective date of termination. The vendor file is not deleted — it is retained per [Attachment F](attachments/attachment-F-record-retention-schedule.md).

6. **1099 issuance scope.** The vendor remains in scope for 1099-NEC issuance for the calendar year in which the final payment was made. The 1099-NEC is issued in January of the following year per §5.6, even if the vendor relationship ended mid-year.

7. **Vendor file retention.** The vendor file is retained per [Attachment F](attachments/attachment-F-record-retention-schedule.md). Bloom's standard retention period is 7 years post-engagement-end.

### 5.10 Recordkeeping and Audit

#### 5.10.1 Vendor File Retention

All vendor files are retained per [Attachment F (Record Retention Schedule)](attachments/attachment-F-record-retention-schedule.md). Key retention periods:

- **W-9s:** 7 years post-final-payment (IRS minimum is 4 years; Bloom standard is 7 years to align with corporate record retention)
- **Signed contractor agreements:** 7 years post-engagement-end (or longer if state law requires)
- **1099-NEC copies:** 7 years post-filing-date (IRS minimum is 4 years; Bloom standard is 7 years)
- **Payment ledgers:** 7 years from end of calendar year
- **HIPAA BAAs:** 6 years post-engagement-end (HIPAA minimum per 45 CFR § 164.530(j))
- **Classification analyses:** 7 years post-engagement-end

#### 5.10.2 Annual Self-Audit

The MSO Owner conducts an annual self-audit of every active vendor file. The audit confirms that the following items are present and current for each active vendor:

- Current, signed W-9 (not expired, correct address and TIN)
- Signed contractor agreement (executed, not expired)
- COI (where required — current, not expired, correct named insured)
- BAA (where required — executed)
- Classification analysis (documented, signed by MSO Owner)
- YTD payment log (reconciled to AP tool)

Audit findings are logged in the SOP-009 audit log, including the date of the audit, the MSO Owner's signature, any deficiencies identified, and the corrective actions taken. Deficiencies must be remediated within 10 business days of the audit finding.

---

## 6. Forms, Documents, and Templates

The following forms, documents, and templates support this SOP:

**Attachments (maintained alongside this SOP):**
- [Attachment A — Classification Decision Tree](attachments/attachment-A-classification-decision-tree.md) — Operational decision tree for W-2 vs. 1099 vs. C2C classification
- [Attachment B — Vendor Onboarding Checklist](attachments/attachment-B-vendor-onboarding-checklist.md) — Pre-engagement checklist with sign-off
- [Attachment C — W-9 and COI Collection Templates](attachments/attachment-C-w9-and-coi-collection-templates.md) — Email templates for document collection
- [Attachment D — Payment Tracking and 1099 Workflow](attachments/attachment-D-payment-tracking-and-1099-workflow.md) — Monthly reconciliation and quarterly review procedures
- [Attachment E — Year-End 1099-NEC Issuance Procedure](attachments/attachment-E-year-end-1099-NEC-issuance-procedure.md) — Step-by-step January workflow
- [Attachment F — Record Retention Schedule](attachments/attachment-F-record-retention-schedule.md) — Retention periods by document type

**External Forms and References:**
- IRS Form W-9, Request for Taxpayer Identification Number and Certification — https://www.irs.gov/forms-pubs/about-form-w-9
- IRS Form 1099-NEC, Nonemployee Compensation — https://www.irs.gov/forms-pubs/about-form-1099-nec
- IRS Instructions for Forms 1099-MISC and 1099-NEC — https://www.irs.gov/instructions/i1099mec
- California EDD — AB 5 (Assembly Bill 5) Resources — https://www.edd.ca.gov/payroll_taxes/ab-5.htm

**Templates to Be Built:**
- Standard Independent Contractor Agreement template `[OPERATIONAL — TO BE BUILT OR LEGAL-REVIEWED]`
- Standard HIPAA Business Associate Agreement template `[OPERATIONAL — TO BE BUILT OR LEGAL-REVIEWED, COORDINATE WITH FUTURE HIPAA SOP]`

---

## 7. Escalation and Exception Handling

### 7.1 Classification Escalation

If the classification analysis in [Attachment A](attachments/attachment-A-classification-decision-tree.md) results in a failed ABC prong or an ambiguous determination, the MSO Owner:

1. Does not proceed with the engagement
2. Documents the analysis and the specific prong(s) that failed or are ambiguous
3. Engages legal counsel for classification review within 5 business days
4. Documents legal counsel's recommendation in the vendor file
5. Proceeds only after legal counsel has confirmed the classification or recommended a restructured arrangement

### 7.2 Missing W-9 Escalation

If a vendor refuses to provide a W-9 or provides an incomplete W-9:

1. The bookkeeper notifies the MSO Owner immediately
2. The MSO Owner contacts the vendor directly to resolve
3. If the vendor continues to refuse, the engagement does not proceed and no payment is issued
4. If payments have already been made to the vendor, the MSO Owner consults the CPA regarding backup withholding obligations

### 7.3 1099 Discrepancy Escalation

If the year-end 1099 reconciliation reveals discrepancies (total mismatch, missing vendor, vendor name or TIN mismatch):

1. The bookkeeper escalates to the MSO Owner same day
2. The MSO Owner and bookkeeper investigate and resolve within 3 business days
3. If resolution requires CPA consultation, the CPA is engaged immediately
4. Corrected 1099s are filed per IRS corrected return procedures

### 7.4 AB 5 Reclassification Risk

If the MSO Owner becomes aware — through legal counsel, CPA advice, vendor complaint, or EDD inquiry — that an existing vendor may be misclassified:

1. The MSO Owner immediately suspends the engagement pending review
2. Legal counsel is engaged within 48 hours
3. The vendor file is preserved (no documents deleted or modified)
4. Legal counsel's recommendation is documented and implemented
5. If reclassification to W-2 is required, the MSO Owner works with legal counsel and CPA to address back taxes, penalties, and restructured employment terms

---

## 8. Training and Competency

- **Bookkeeper annual self-attestation.** The bookkeeper completes an annual self-attestation confirming that she has reviewed SOP-009 in full at the start of each calendar year. The self-attestation is signed, dated, and filed in the SOP-009 training records.
- **MSO Owner 1099 training.** The MSO Owner receives 1099 reconciliation training from the CPA at the first year-end and at any accounts payable tool migration (e.g., when a new AP tool replaces an interim solution). Training completion is documented.
- **New bookkeeper onboarding.** If the bookkeeper role is transitioned to a new individual, the incoming bookkeeper completes a full review of SOP-009 and all attachments, shadows the current bookkeeper for at least one monthly reconciliation cycle, and completes the self-attestation before assuming independent responsibility.

---

## 9. Compliance and Regulatory References

| Authority | Relevance to This SOP |
| --- | --- |
| **IRS Publication 15-A (Employer's Supplemental Tax Guide)** | Primary IRS guidance on IC vs. employee classification, including the 20-factor test |
| **IRS Form 1099-NEC Instructions (current year)** | Filing requirements, thresholds, corporate exemptions, medical/legal exceptions |
| **Backup Withholding (26 U.S.C. § 3406)** | Federal backup withholding rate (currently 24%) for vendors who fail to provide a valid TIN. Rate is subject to legislative change; the bookkeeper confirms the current rate with the CPA at each annual 1099 cycle |
| **California Labor Code § 2775 (AB 5 — ABC Test)** | Default classification test for California work relationships; three-prong test presumes employment |
| **California Labor Code §§ 2776–2787 (AB 5 Exemptions / AB 2257)** | Enumerated exemptions from the ABC test for specific professional categories and business-to-business relationships |
| **26 U.S.C. § 6041** | Federal requirement to file information returns for payments of $600 or more for services |
| **26 CFR § 1.6041-1** | Regulations implementing the $600 information return requirement |
| **26 U.S.C. § 3509** | Federal penalties and liability for worker misclassification |
| **HIPAA Privacy Rule (45 CFR § 164.500 et seq.)** | BAA requirements for vendors that create, receive, maintain, or transmit PHI |
| **45 CFR § 164.530(j)** | HIPAA documentation retention requirement (6 years) |
| **California Consumer Privacy Act (CCPA) and CPRA** | Relevant where a vendor accesses personal information of California residents beyond HIPAA-protected PHI |

---

## 10. Related Documents

- [SOP-001 — Document Control & SOP Lifecycle Management](../SOP-001-document-control/SOP-001-document-control.md)
- Future Provider Credentialing, Insurance & Coverage SOP (planned; number assigned at draft time per SOP-001 §5.1) — boundary clarified in §5.8
- [Attachment A — Classification Decision Tree](attachments/attachment-A-classification-decision-tree.md)
- [Attachment B — Vendor Onboarding Checklist](attachments/attachment-B-vendor-onboarding-checklist.md)
- [Attachment C — W-9 and COI Collection Templates](attachments/attachment-C-w9-and-coi-collection-templates.md)
- [Attachment D — Payment Tracking and 1099 Workflow](attachments/attachment-D-payment-tracking-and-1099-workflow.md)
- [Attachment E — Year-End 1099-NEC Issuance Procedure](attachments/attachment-E-year-end-1099-NEC-issuance-procedure.md)
- [Attachment F — Record Retention Schedule](attachments/attachment-F-record-retention-schedule.md)
- Bloom Metabolics LLC Operating Agreement
- Bookkeeping Services Engagement Letter `[OPERATIONAL — TO BE EXECUTED IF NOT ALREADY]`
- Future HIPAA Compliance SOP (BAA workflow for vendors with PHI access)
- Future Pharmacy Partner Management SOP (governs pharmacy partners separately)

---

## 11. Revision History

| Version | Date | Author | Description of Change | Approver |
| --- | --- | --- | --- | --- |
| 0.1 | 2026-05-11 | Brian DeGuzman, MSO Owner | Initial draft. MSO-only operational SOP per SOP-001 §2.3. Approval path: MSO Owner sign-off. No clinical content; no Covering Physician review burden. | Brian DeGuzman, MSO Owner |
| 0.2 | 2026-05-11 | Brian DeGuzman, MSO Owner | Minor revision per SOP-001 §5.11.1. Substantive fixes: §12 acknowledgment table populated; §5.6 California state filing language corrected (CF/SF Program participation); §5.4.3 and §5.2 BAA scope language clarified (defensive PHI posture); §5.2 step 1 legal review trigger restructured (template-deviation primary, $10K dollar threshold secondary). Minor fixes: §5.5 step 4 $500 flag recharacterized as secondary backstop; §9 backup withholding reference added; cross-reference paths verified. No scope expansion. | Brian DeGuzman, MSO Owner |

---

## 12. Approval & Signature

This SOP becomes effective only when signed by the document owner and approving authority below. Until the signature is present and the effective date is populated, this document is **DRAFT** and shall not govern operational practice.

For operational SOPs per [SOP-001 §2.3](../SOP-001-document-control/SOP-001-document-control.md), the Document Owner and Approving Authority may be the same individual (the MSO Owner).

---

**Document Owner & Approving Authority**

Name: Brian DeGuzman
Title: MSO Owner / Registered Nurse
Signature: ___________________________________________
Date: _______________________________________________

---

**Acknowledgment of Receipt and Review**

By signing below, the personnel listed acknowledge they have read, understood, and agree to comply with this SOP.

For this MSO-only operational SOP, acknowledgment is required from the MSO Owner and the Bookkeeper. The Bookkeeper's acknowledgment is collected concurrent with execution of the Bookkeeping Services Engagement Letter.

| Name | Role | Signature | Date |
| --- | --- | --- | --- |
| Brian DeGuzman | MSO Owner / Registered Nurse |  |  |
| [Bookkeeper Name] | Bookkeeper |  |  |

---

*Bloom Metabolics — Confidential*
*This document is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md).*
