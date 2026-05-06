---
sop_id: "SOP-007"
title: "Prescribing Protocols"
version: "0.2"
status: "Draft"
effective_date: "TBD (pending approval)"
next_review_date: "12 months from effective date"
owner: "Covering Physician (TBD — pending Doctors for Providers assignment)"
approver: "Covering Physician (clinical SOP per SOP-001 §2.3)"
classification: "INTERNAL — CLINICAL USE ONLY"
---

# Prescribing Protocols

**SOP ID:** SOP-007
**Version:** 0.2
**Status:** Draft
**Effective Date:** TBD (pending approval)
**Next Scheduled Review:** 12 months from effective date
**Document Owner:** Covering Physician (TBD — pending Doctors for Providers assignment)
**Approving Authority:** Covering Physician (clinical SOP per SOP-001 §2.3)
**Classification:** INTERNAL — CLINICAL USE ONLY

---

## Notice

### Standing Notice

This Standard Operating Procedure is the property of Bloom Metabolics and is intended exclusively for use by authorized Bloom Metabolics personnel and agents. This document does not constitute medical, legal, or regulatory advice and does not replace individualized clinical judgment by the covering physician. All clinical decisions remain the responsibility of the licensed prescribing clinician.

This SOP is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md). No section of this document may be modified, distributed, or implemented outside the workflow defined therein.

### Status Notice

> This document is in DRAFT status. It has not been reviewed, approved, or signed and is NOT operative. No clinical or operational decision shall be made on the basis of this document in its current state. No prescriptions may be generated, no pharmacy orders may be routed, and no refill requests may be processed under this SOP until the Covering Physician has signed and the effective date has been populated.

### Clinical Authority Notice

> This is a clinical SOP per [SOP-001 section 2.3](../SOP-001-document-control/SOP-001-document-control.md). All prescribing content — including medication selection, dosing parameters, treatment phase criteria, dose-adjustment thresholds, refill eligibility criteria, controlled substance protocols, and compounded medication medical necessity standards — is the exclusive authority of the Covering Physician. The MSO Owner (Brian DeGuzman, RN) provides operational scaffolding only: pharmacy vendor management, integration configuration, refill workflow routing, fill-status tracking, patient communication of non-clinical logistics, and CURES enrollment infrastructure. The MSO Owner does not prescribe, does not determine doses, does not authorize refills, and does not make clinical decisions of any kind. This boundary is absolute and is not subject to delegation.

### Controlled Substance Notice

> This SOP governs the prescribing of Schedule III controlled substances — specifically testosterone cypionate (200 mg/mL injectable solution) — under the Covering Physician's California DEA registration. The Covering Physician must maintain active California DEA registration, active CURES enrollment, and compliance with all applicable federal and state controlled substance regulations as a condition of prescribing under this SOP. Phentermine (Schedule IV) is explicitly deferred and out of scope at launch; no phentermine prescribing may occur under this SOP until a future SOP revision incorporates phentermine-specific protocols and the Covering Physician's DEA registration is verified for the applicable schedule. Any controlled substance prescribing that occurs outside the protocols defined herein constitutes a deviation requiring immediate documentation and escalation per section 7 of this SOP.

---

## 1. Purpose

This SOP establishes the meta-framework governing all prescribing activity at Bloom Metabolics. It is the central prescribing instrument from which service-line-specific protocols derive their authority, and it defines the shared architecture — treatment phases, pharmacy routing, refill management, dose-adjustment workflow, controlled substance compliance, and prescribing documentation — that applies uniformly across all service lines.

Specifically, this SOP defines:

- The **three-phase treatment model** (Initiation, Titration, Maintenance) that structures every patient's prescribing lifecycle from first prescription through stable long-term therapy
- The **service-line protocol architecture**, implemented through Attachments A through D, which contain service-line-specific clinical parameters populated by the Covering Physician
- The **hybrid pharmacy architecture**: Strive Pharmacy for FDA-approved testosterone cypionate (Schedule III); a 503A/503B compounding partner for compounded products (GLP-1, peptides, sexual health compounded formulations)
- **Schedule III controlled substance prescribing protocols** for testosterone cypionate, including DEA verification, CURES check requirements, electronic prescribing of controlled substances (EPCS), and Schedule III-specific refill rules
- The **async refill pathway** for non-controlled medications in stable maintenance, enabling operationally efficient refill processing without requiring a synchronous encounter at every refill cycle
- The **modified-async refill pathway** for controlled substances (TRT), requiring a CURES check at every refill event and a mandatory synchronous encounter at minimum every six months
- The **dose-adjustment workflow**, governing physician-initiated changes to medication dose, formulation, or frequency
- **Prescribing documentation requirements** that produce a complete, auditable medico-legal record in OptiMantra for every prescribing event
- **Pharmacy coordination** protocols covering prescription transmission, fill-status tracking, pharmacy communication, and supply-chain disruption management
- **Compounded GLP-1 exception pathway** for patients requiring compounded semaglutide or tirzepatide under FDA 503A medical necessity when FDA-approved branded products are the default
- Interfaces with [SOP-005 (Synchronous Telehealth Visit)](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md), [SOP-006 (Lab Ordering & Review)](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md), and future SOPs governing adverse events, treatment discontinuation, follow-up visits, and patient communication

This SOP does NOT define specific medication doses, titration schedules, or clinical decision thresholds. Those parameters are set by the Covering Physician in the service-line attachments (Attachments A through D) and in the `[CLINICAL — PENDING COVERING PHYSICIAN]` markers within section 5. This SOP provides the structural and operational framework within which those clinical parameters operate.

---

## 2. Scope

### 2.1 In Scope

- All four active Bloom Metabolics service lines: Testosterone Replacement Therapy (TRT), GLP-1/GIP Weight Management, Sexual Health, and Longevity
- Schedule III controlled substance prescribing for testosterone cypionate (200 mg/mL injectable solution) under the Covering Physician's California DEA registration
- The hybrid pharmacy architecture: Strive Pharmacy (FDA-approved testosterone cypionate) and 503A/503B compounding partner (compounded formulations across all service lines)
- The three treatment phases: Initiation, Titration, and Maintenance
- Prescription generation in OptiMantra and transmission to the designated pharmacy
- Pharmacy routing logic by medication type, formulation, and controlled substance status
- Async refill pathway for non-controlled medications meeting stable maintenance criteria
- Modified-async refill pathway for controlled substances (TRT), including CURES check at every refill and six-month mandatory synchronous encounter
- Physician-initiated dose adjustments across all service lines
- Patient-reported symptom intake and routing to the Covering Physician
- Compounded GLP-1 exception pathway under FDA 503A medical necessity
- Prescribing documentation in OptiMantra as the medico-legal record of all prescribing events
- Fill-status tracking and pharmacy coordination
- EPCS (Electronic Prescribing of Controlled Substances) via OptiMantra for all Schedule III prescriptions
- Service-line-specific clinical parameters defined in Attachments A through D

### 2.2 Out of Scope

- **Phentermine prescribing** — Schedule IV; deferred at launch pending future SOP revision, DEA verification for the applicable schedule, and CURES protocol extension
- **Peptide therapy prescribing details** — the Longevity service line is included in the structural framework, but specific peptide protocols (NAD+, glutathione, BPC-157) are deferred pending LegitScript certification and 503A/503B partner finalization; Attachment D will be populated upon resolution
- **Other controlled substances** — no controlled substances other than Schedule III testosterone cypionate are prescribed under this SOP at launch
- **Out-of-state prescribing** — Bloom Metabolics operates in California only at launch; multi-state prescribing requires SOP revision, state-specific DEA registration, and state-specific PDMP enrollment
- **Insurance billing for prescriptions** — Bloom is a cash-pay practice; prescriptions are not billed to insurance and pharmacy benefits coordination is not within scope
- **In-office dispensing** — Bloom does not dispense medications; all prescriptions are routed to external pharmacies (Strive or compounding partner)
- **Pediatric prescribing** — Bloom serves adult patients (18+) only
- **Pharmacy contract negotiation** — vendor contract terms are managed by the MSO Owner outside this SOP; this SOP governs the clinical and operational workflow once pharmacy relationships are established
- **Injection education and self-administration training** — governed by [SOP-004 (Injection Education)](../SOP-004-injection-education/SOP-004-injection-education.md)
- **Lab ordering and review** — governed by [SOP-006 (Lab Ordering & Review)](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md); this SOP references lab results as inputs to prescribing decisions but does not govern the lab workflow itself

---

## 3. Definitions

**Prescribing Decision**
The clinical determination, made exclusively by the Covering Physician, to initiate, continue, modify, or discontinue a medication for a specific patient. A prescribing decision requires a documented clinical rationale and is the predicate for any prescription generation. Prescribing decisions occur within the synchronous telehealth visit ([SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md)), during a dose-adjustment review, or during a refill authorization review.

**Treatment Phases**
The three sequential stages of a patient's prescribing lifecycle under Bloom Metabolics. Every patient progresses through these phases for each service line:

- **Initiation** — the period from the first prescription through the initial treatment response assessment. The patient is on a starting dose and is being monitored for tolerability, early adverse effects, and initial clinical response.
- **Titration** — the period during which the Covering Physician adjusts the dose, formulation, or frequency to achieve the patient's treatment goals. Titration may involve one or more dose changes. The patient is monitored at a higher frequency than during Maintenance.
- **Maintenance** — the period during which the patient is on a stable, effective regimen and the prescribing focus shifts from optimization to sustained monitoring. Maintenance is the phase in which async and modified-async refill pathways become available.

**Within-Visit Prescription**
A prescription generated as a direct result of a prescribing decision made during a synchronous telehealth visit under [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md). The prescription is submitted to the pharmacy within 24 hours of the visit.

**Post-Visit Prescription**
A prescription generated following a post-visit prescribing pathway under [SOP-005 section 5.7](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md), where the Covering Physician deferred the prescribing decision pending additional evaluation. The prescription is submitted upon completion of the deferred evaluation.

**FDA-Approved Medication**
A medication that has received approval from the U.S. Food and Drug Administration for a specific indication, with an FDA-approved label specifying indications, dosing, contraindications, warnings, and precautions. At Bloom Metabolics, FDA-approved medications include branded testosterone cypionate (e.g., Depo-Testosterone), branded semaglutide (Wegovy, Ozempic), branded tirzepatide (Zepbound, Mounjaro), tadalafil, and sildenafil.

**Compounded Medication**
A medication prepared by a licensed compounding pharmacy to meet an individual patient's specific medical need when an FDA-approved alternative is not clinically appropriate, is unavailable, or cannot be used by the patient. Compounded medications are not FDA-approved and are prepared under either section 503A or section 503B of the Federal Food, Drug, and Cosmetic Act.

**503A Compounding Pharmacy**
A pharmacy operating under section 503A of the Federal Food, Drug, and Cosmetic Act that compounds medications pursuant to individual patient prescriptions based on a prescriber's determination of medical necessity. 503A compounding requires a patient-specific prescription and a documented clinical rationale for why the FDA-approved product is not appropriate for the individual patient.

**503B Outsourcing Facility**
A facility registered with the FDA under section 503B of the Federal Food, Drug, and Cosmetic Act that may compound medications without individual patient prescriptions, subject to current good manufacturing practice (cGMP) requirements and FDA inspection. 503B facilities may produce larger quantities and are subject to more rigorous manufacturing standards than 503A pharmacies.

**Schedule III Controlled Substance**
A substance classified under Schedule III of the Controlled Substances Act (21 U.S.C. section 812). Schedule III substances have a moderate to low potential for physical and psychological dependence. Testosterone cypionate is a Schedule III anabolic steroid. Schedule III prescriptions may be transmitted electronically, by fax, or orally. Under federal law, Schedule III prescriptions may be refilled up to five times within six months of the date of issue, after which a new prescription is required.

**CURES (Controlled Substance Utilization Review and Evaluation System)**
California's Prescription Drug Monitoring Program (PDMP), maintained by the California Department of Justice under Health and Safety Code section 11165. CURES contains a record of all Schedule II through V controlled substance prescriptions dispensed in California. Under Cal. Health & Safety Code § 11165.4, California prescribers are required to consult CURES at the time of the first prescription of a Schedule II through IV controlled substance to a patient, and at least once every six months thereafter if the substance remains part of the patient's treatment. Under this SOP, the Covering Physician checks CURES at every controlled substance prescribing event, including initial prescription, every refill, and every dose adjustment — substantially exceeding the statutory minimum.

**Async Refill**
A refill authorization pathway for non-controlled medications in which the Covering Physician reviews the patient's chart, current labs, and refill request without a synchronous encounter and authorizes the refill if all stable maintenance criteria are met. The async refill pathway is available only for patients in the Maintenance phase on non-controlled medications.

**Modified-Async Refill**
A refill authorization pathway for controlled substances (TRT/testosterone cypionate) that combines asynchronous chart review with mandatory CURES consultation at every refill event and a mandatory synchronous encounter at minimum every six months. Between synchronous encounters, the physician may authorize refills asynchronously provided the CURES check is completed and documented and all stable maintenance criteria are met.

**Stable Maintenance Criteria**
The set of clinical and operational conditions that must be satisfied before a patient qualifies for async or modified-async refill pathways. At minimum, stable maintenance criteria include: the patient is in the Maintenance treatment phase; the most recent labs are within acceptable ranges and are not outdated; the patient has not reported new symptoms, adverse effects, or medication concerns; and the patient is adherent to the prescribed regimen and monitoring schedule. Service-line-specific stable maintenance criteria are defined by the Covering Physician in the applicable service-line attachment.

**Dose Adjustment**
A physician-initiated change to the dose, formulation, frequency, or route of administration of a prescribed medication. Dose adjustments are clinical decisions made exclusively by the Covering Physician. Patients do not self-adjust doses. A dose adjustment generates a new prescription or a modified prescription and resets relevant monitoring intervals.

**Pharmacy Routing**
The process by which a prescription is directed to the appropriate pharmacy based on the medication type, formulation, and controlled substance status. Under Bloom Metabolics' hybrid pharmacy architecture, FDA-approved testosterone cypionate routes to Strive Pharmacy; compounded medications route to the 503A/503B compounding partner; and FDA-approved non-controlled medications (tadalafil, sildenafil, branded GLP-1) route to Strive Pharmacy or a patient-preferred retail pharmacy as applicable.

**Fill Status**
The current state of a prescription at the pharmacy: transmitted, received, in process, filled, shipped, delivered, or rejected. Fill status is tracked by MSO Intake Staff and documented in OptiMantra.

**Compounded GLP-1 Medical Necessity**
The patient-specific clinical justification, documented by the Covering Physician, for prescribing a compounded semaglutide or tirzepatide formulation instead of the FDA-approved branded product. Medical necessity for compounded GLP-1 must be based on one or more of the following: the FDA-approved product is on the FDA Drug Shortage List; the patient has a documented adverse reaction, allergy, or intolerance to an inactive ingredient in the FDA-approved formulation; the patient requires a dose or formulation not commercially available in the FDA-approved product; or another patient-specific clinical reason documented by the Covering Physician.

**EPCS (Electronic Prescribing of Controlled Substances)**
The electronic transmission of controlled substance prescriptions in compliance with DEA regulations (21 CFR Part 1311). California mandates electronic prescribing for controlled substances effective January 1, 2022 (Cal. Bus. & Prof. Code § 688). All Schedule III prescriptions under this SOP are transmitted via EPCS through OptiMantra.

---

## 4. Roles & Responsibilities

| Role | Primary Responsibilities Under This SOP |
| --- | --- |
| **Covering Physician (PC) — Document Owner & Approving Authority** | Makes all prescribing decisions (initiation, continuation, modification, discontinuation); generates prescriptions in OptiMantra; performs CURES checks for all controlled substance prescribing and refill events; maintains active California DEA registration and CURES enrollment; determines treatment phase for each patient; authorizes all refills (async and modified-async); initiates all dose adjustments; reviews patient-reported symptoms and determines clinical response; documents compounded GLP-1 medical necessity; documents prescribing rationale in OptiMantra for every prescribing event; sets service-line-specific clinical parameters in Attachments A through D; populates all `[CLINICAL — PENDING COVERING PHYSICIAN]` markers; reviews and signs this SOP as both Document Owner and Approving Authority per [SOP-001 section 2.3](../SOP-001-document-control/SOP-001-document-control.md) |
| **MSO Owner (Brian DeGuzman, RN)** | Manages pharmacy vendor relationships (Strive Pharmacy, compounding partner); configures and maintains OptiMantra prescribing and EPCS integration; manages CURES enrollment infrastructure and technical setup (the physician performs the clinical CURES check); coordinates pharmacy onboarding and ongoing vendor communication; manages prescription billing and cost reconciliation; designs and maintains refill workflow routing (intake, triage, physician queue); tracks fill status and coordinates pharmacy follow-up for rejected or delayed prescriptions; manages supply-chain disruption communication; maintains SOP infrastructure (versioning, master index, document library) per [SOP-001 section 2.3](../SOP-001-document-control/SOP-001-document-control.md); does NOT prescribe; does NOT authorize refills; does NOT determine doses; does NOT make clinical decisions |
| **MSO Intake Staff** | Receives and triages incoming refill requests from patients; verifies operational prerequisites (current labs, payment, last visit date) before routing to physician queue; tracks fill status with pharmacies and updates OptiMantra; communicates non-clinical prescription logistics to patients (shipping status, pharmacy contact, pickup instructions); routes patient-reported symptoms to physician review queue; does NOT prescribe; does NOT authorize refills; does NOT communicate clinical information about prescriptions (dose rationale, clinical status, side effect management) |
| **Patient** | Receives prescriptions as directed by the Covering Physician; completes required labs per [SOP-006](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md) monitoring schedule; reports symptoms, adverse effects, and medication concerns through designated intake channels; adheres to the prescribed regimen and does NOT self-adjust doses; attends mandatory synchronous encounters as scheduled; acknowledges informed consent for all treatment changes |

---

## 5. Procedure

### 5.1 Receipt from SOP-005 — Prescribing Decision Handoff

The prescribing workflow under this SOP begins when the Covering Physician documents a prescribing decision during or following a synchronous telehealth visit under [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md).

**Entry conditions (all must be satisfied before a prescription is generated):**

1. The patient has a documented visit outcome of "Within-Visit Approved" or "Post-Visit Pending" (with subsequent prescribing decision) under [SOP-005 section 5.9](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md)
2. The Covering Physician has performed a Good Faith Examination and documented the visit note per [SOP-005 section 5.8](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md)
3. The patient has acknowledged service-line-specific informed consent per [SOP-005 section 5.6](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md)
4. Current laboratory results are on file and reviewed per [SOP-006](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md)
5. For controlled substance prescriptions (testosterone cypionate): the Covering Physician has verified active DEA registration, completed a CURES check for the patient, and confirmed the patient's identity per [SOP-005 section 5.4](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md)
6. The patient's GHL pipeline status is "Prescription Pending" or "Post-Visit Review" (resolved to prescribing decision)

**Handoff documentation:** The Covering Physician's visit note in OptiMantra serves as the bridge document between [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) and this SOP. The visit note must contain, at minimum: the prescribing decision (medication, formulation, and intended regimen); the clinical rationale supporting the decision; the treatment phase assignment (Initiation); and, for controlled substances, the CURES check result and DEA verification confirmation.

If any entry condition is not met, the prescription is not generated and the deficiency is routed back to the originating SOP for resolution.

### 5.2 Treatment Phase Determination

Every patient is assigned to one of three treatment phases for each service line. The treatment phase governs monitoring frequency, refill pathway eligibility, and follow-up cadence. The Covering Physician determines the treatment phase and documents it in OptiMantra.

**Phase 1 — Initiation:**

- **Entry:** First prescription for the service line
- **Characteristics:** Starting dose per the applicable service-line attachment; highest monitoring frequency; no refill pathway eligibility (all refills require physician review with full clinical assessment); mandatory follow-up visit scheduled per the applicable cadence
- **Exit criteria:** The Covering Physician determines that the patient has tolerated the initial regimen, labs are within acceptable parameters, and the patient is ready for dose optimization or confirms that the starting dose is the target dose

`[CLINICAL — PENDING COVERING PHYSICIAN: Define the service-line-specific Initiation phase parameters for each service line in Attachments A through D, including: starting dose and formulation; minimum duration of Initiation before a patient may transition to Titration; lab requirements during Initiation (timing, panels); follow-up visit cadence during Initiation; and criteria for determining that a patient has successfully completed Initiation.]`

**Phase 2 — Titration:**

- **Entry:** Covering Physician determines the patient requires dose adjustment to reach therapeutic target
- **Characteristics:** Active dose optimization; monitoring frequency may be higher than Maintenance but may be reduced from Initiation depending on clinical response; no async refill pathway (all refills require physician review); each dose change resets the titration monitoring clock
- **Exit criteria:** The Covering Physician determines that the patient has reached a stable, effective dose; labs confirm the regimen is safe and effective; the patient reports satisfactory symptom response; and no further dose changes are anticipated in the near term

`[CLINICAL — PENDING COVERING PHYSICIAN: Define the service-line-specific Titration phase parameters for each service line in Attachments A through D, including: dose adjustment increments and ceilings; monitoring lab timing after each dose change; follow-up visit cadence during Titration; maximum number of titration cycles before clinical reassessment of the treatment approach; and criteria for determining that a patient has reached stable maintenance.]`

**Phase 3 — Maintenance:**

- **Entry:** Covering Physician documents that the patient meets stable maintenance criteria
- **Characteristics:** Stable dose; reduced monitoring frequency; eligible for async refill (non-controlled) or modified-async refill (controlled); scheduled synchronous encounters at defined intervals
- **Exit criteria:** Maintenance does not have a terminal exit — the patient remains in Maintenance as long as the regimen is stable and effective. Exit occurs only upon dose adjustment (returns to Titration), treatment discontinuation, adverse event, or patient request

`[CLINICAL — PENDING COVERING PHYSICIAN: Define the service-line-specific Maintenance phase parameters for each service line in Attachments A through D, including: stable maintenance criteria (lab ranges, symptom status, adherence); monitoring lab cadence during Maintenance; mandatory synchronous encounter interval; and criteria for returning a patient from Maintenance to Titration.]`

**Phase transitions:** All phase transitions are documented in OptiMantra by the Covering Physician with the date, the new phase, and the clinical rationale for the transition. MSO Intake Staff updates the GHL pipeline to reflect the current treatment phase.

### 5.3 Prescription Generation and Pharmacy Routing

This section defines the operational workflow for generating prescriptions and routing them to the correct pharmacy. All routing logic is operational and is fully drafted. Clinical content (medication selection, dosing) is governed by the Covering Physician's prescribing decision.

**Prescription generation in OptiMantra:**

1. The Covering Physician enters the prescription in OptiMantra's e-prescribing module, including: medication name, strength, formulation, quantity, directions for use, number of refills (where applicable), and the designated pharmacy
2. For controlled substances (testosterone cypionate): the prescription is transmitted via EPCS in compliance with DEA 21 CFR Part 1311 and California Bus. & Prof. Code § 688
3. For non-controlled medications: the prescription is transmitted electronically via standard e-prescribing (Surescripts or direct pharmacy integration)
4. The Covering Physician confirms successful transmission in OptiMantra before closing the prescribing workflow

**Pharmacy routing logic:**

| Medication Category | Pharmacy | Routing Method | Notes |
| --- | --- | --- | --- |
| FDA-approved testosterone cypionate (Schedule III) | Strive Pharmacy | EPCS via OptiMantra | Schedule III; CURES check required before transmission; Strive is the sole pharmacy for controlled substance prescriptions at launch |
| FDA-approved branded semaglutide (Wegovy/Ozempic) | Strive Pharmacy | Standard e-prescribe via OptiMantra | Default GLP-1 pathway; branded product is default unless compounded exception pathway applies |
| FDA-approved branded tirzepatide (Zepbound/Mounjaro) | Strive Pharmacy | Standard e-prescribe via OptiMantra | Default GLP-1/GIP pathway; branded product is default unless compounded exception pathway applies |
| Compounded semaglutide or tirzepatide (503A) | 503A Compounding Partner | Standard e-prescribe or fax per partner protocol | Exception pathway only; requires documented medical necessity per section 5.9 |
| Compounded sexual health formulations (PT-141, combination products) | 503A/503B Compounding Partner | Standard e-prescribe or fax per partner protocol | Service-line-specific formulations not available as FDA-approved products |
| FDA-approved tadalafil | Strive Pharmacy or patient-preferred retail pharmacy | Standard e-prescribe via OptiMantra | Patient may request routing to preferred pharmacy |
| FDA-approved sildenafil | Strive Pharmacy or patient-preferred retail pharmacy | Standard e-prescribe via OptiMantra | Patient may request routing to preferred pharmacy |
| Compounded longevity formulations (NAD+, glutathione) | 503A/503B Compounding Partner | Standard e-prescribe or fax per partner protocol | Deferred pending LegitScript and partner finalization |

**Pharmacy routing rules:**

- All Schedule III controlled substance prescriptions are routed exclusively to Strive Pharmacy at launch. Patients may not redirect controlled substance prescriptions to alternative pharmacies without Covering Physician authorization and verification that the alternative pharmacy accepts EPCS and is CURES-compliant.
- All compounded medications are routed to the designated 503A or 503B compounding partner. The MSO Owner maintains the current compounding partner information in OptiMantra's pharmacy directory.
- FDA-approved non-controlled medications may be routed to the patient's preferred retail pharmacy upon patient request. The patient provides the pharmacy name and address; MSO Intake Staff verifies the pharmacy is in OptiMantra's directory (or adds it) before the Covering Physician transmits the prescription.
- If a pharmacy rejects a prescription (formulary issue, insurance requirement irrelevant to cash-pay, inventory issue), MSO Intake Staff documents the rejection reason, notifies the Covering Physician, and coordinates re-routing per the physician's instruction.

**Fill-status tracking:**

- MSO Intake Staff monitors fill status for all prescriptions transmitted under this SOP.
- For Strive Pharmacy and the compounding partner: MSO Intake Staff checks fill status within 2 business days of transmission and follows up if the prescription has not been received or is not in process.
- For retail pharmacies: fill-status tracking is limited to confirming transmission; the patient is responsible for coordinating with their retail pharmacy.
- Fill-status updates are documented in OptiMantra under the patient's prescription record.
- If a prescription remains unfilled for more than 5 business days after transmission, MSO Intake Staff contacts the pharmacy to determine the cause and escalates per section 7.4 if the issue cannot be resolved operationally.

### 5.4 Schedule III Controlled Substance Prescribing

This section defines the specific requirements for prescribing Schedule III controlled substances (testosterone cypionate) at Bloom Metabolics. These requirements supplement the general prescribing workflow in sections 5.1 through 5.3 and apply to every controlled substance prescribing event — initial prescriptions, refills, and dose adjustments.

**DEA registration verification:**

1. The Covering Physician must maintain an active, unrestricted DEA registration in California that authorizes prescribing of Schedule III controlled substances
2. DEA registration status is verified by the MSO Owner upon physician onboarding and annually thereafter. Verification is documented in the physician's credentialing file.
3. If the Covering Physician's DEA registration is suspended, restricted, or revoked, all controlled substance prescribing ceases immediately per section 7.1
4. The DEA registration number is on file in OptiMantra's EPCS configuration and is included on every controlled substance prescription

**CURES check requirement:**

1. The Covering Physician checks CURES before every controlled substance prescribing event — including the initial prescription, every refill authorization, and every dose adjustment
2. This substantially exceeds the statutory minimum of California Health & Safety Code § 11165.4, which requires a CURES check at the time of the first prescription and at least every six months thereafter if the substance remains part of the patient's treatment. The more frequent check under this SOP is a risk-management measure appropriate for a telehealth-only practice prescribing Schedule III controlled substances
3. The CURES check must be performed on the same business day as the prescribing event and before the prescription is transmitted
4. The Covering Physician documents the CURES check in OptiMantra: date of check, patient name, findings summary (no concerning results / concerning results identified), and action taken if concerning results are identified
5. If the CURES check reveals concerning results (e.g., concurrent controlled substance prescriptions from other providers, patterns suggesting misuse, quantities exceeding expected use), the Covering Physician follows the escalation pathway in section 7.2

`[CLINICAL — PENDING COVERING PHYSICIAN: Define the specific CURES findings that constitute "concerning results" for the purposes of this SOP, including: concurrent opioid prescriptions, concurrent testosterone prescriptions from other providers, patterns of early refill requests, prescriptions from multiple providers for the same controlled substance class, and any other findings the physician deems clinically significant. Define the clinical decision tree for each category of concerning finding: continue prescribing with documentation, hold prescription pending patient discussion, refer for substance use evaluation, or discontinue controlled substance prescribing.]`

**Schedule III prescription rules (federal):**

- A Schedule III prescription may include up to five refills within six months of the date of issue (21 CFR section 1306.22)
- After five refills or after six months from the date of issue (whichever comes first), a new prescription is required
- The Covering Physician determines the number of refills authorized per prescription based on clinical judgment, treatment phase, and monitoring schedule
- All Schedule III prescriptions are transmitted via EPCS; paper prescriptions are not used except as a contingency documented in section 7

**EPCS compliance:**

- OptiMantra is configured for EPCS in compliance with DEA 21 CFR Part 1311
- The Covering Physician completes identity proofing and two-factor authentication setup for EPCS as part of OptiMantra onboarding
- The MSO Owner is responsible for maintaining OptiMantra's EPCS certification and technical configuration
- The Covering Physician is responsible for safeguarding EPCS credentials and reporting any suspected compromise immediately

`[CLINICAL — PENDING COVERING PHYSICIAN: Define the standard number of refills to be authorized on initial testosterone cypionate prescriptions for each treatment phase (Initiation, Titration, Maintenance), considering that the physician checks CURES at every refill event regardless of the number of refills authorized on the prescription. Define whether the physician prefers to authorize the federal maximum (5 refills / 6 months) for Maintenance patients or prefers a shorter authorization period requiring more frequent new prescriptions.]`

### 5.5 Async Refill Pathway (Non-Controlled Medications)

The async refill pathway enables operationally efficient prescription renewal for non-controlled medications when the patient is in stable Maintenance and all clinical prerequisites are met. This pathway does not require a synchronous telehealth encounter for each refill cycle.

**Eligibility criteria (all must be satisfied):**

1. The medication is a non-controlled substance (GLP-1 branded or compounded, sexual health medications, longevity formulations)
2. The patient is in the Maintenance treatment phase as documented by the Covering Physician
3. The patient's most recent labs are on file, reviewed by the Covering Physician, and within acceptable ranges per [SOP-006](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md)
4. Labs are not outdated — the most recent draw is within the monitoring cadence window defined in the applicable service-line attachment

`[CLINICAL — PENDING COVERING PHYSICIAN: Define "acceptable lab ranges" and "not outdated" for each service line's async refill eligibility. Specify: the maximum age of labs (in days or weeks) that qualifies a patient for async refill; the specific lab values or ranges that, if exceeded, disqualify the patient from async refill and require a synchronous encounter; and any service-line-specific lab markers that must be current for async refill eligibility.]`

5. The patient has not reported new symptoms, adverse effects, or medication concerns since the last prescribing event
6. The patient is adherent to the prescribed regimen (no evidence of non-adherence such as early refill requests, missed labs, or missed follow-up visits)
7. The patient has attended the most recent mandatory synchronous encounter within the service-line-specific interval

**Async refill workflow:**

1. **Request intake:** The patient submits a refill request through a designated channel (OptiMantra patient portal, secure message, or phone to MSO Intake Staff). MSO Intake Staff logs the request in OptiMantra with the date, medication, and requesting patient.
2. **Operational pre-screening:** MSO Intake Staff verifies the operational prerequisites before routing to the physician queue:
   - Patient is in Maintenance phase (per OptiMantra treatment phase field)
   - Most recent labs are on file and within the acceptable date window
   - No outstanding balance or payment issues
   - Last mandatory synchronous encounter is within the required interval
   - No patient-reported symptoms flagged since the last prescribing event
3. **Physician queue routing:** If all operational prerequisites are met, MSO Intake Staff routes the refill request to the Covering Physician's async refill review queue in OptiMantra. If any prerequisite is not met, MSO Intake Staff notifies the patient of the specific requirement that must be fulfilled (lab draw, visit scheduling, or payment) and holds the refill request pending resolution.
4. **Physician async review:** The Covering Physician reviews the patient's chart, current labs, symptom history, and adherence record. The physician determines one of the following:
   - **Approve refill** — the prescription is renewed; the physician documents the review and authorization in OptiMantra
   - **Approve refill with lab order** — the refill is approved, but the physician orders monitoring labs to be completed before the next refill cycle
   - **Deny refill — require synchronous encounter** — the physician identifies a clinical concern that requires a synchronous visit before the refill can be authorized; the patient is notified and a visit is scheduled
   - **Deny refill — discontinue** — the physician determines the medication should be discontinued; the patient is notified and the discontinuation is documented
5. **Prescription generation:** If approved, the Covering Physician generates the prescription per the standard workflow in section 5.3. The prescription is routed to the appropriate pharmacy per the routing table.
6. **Patient notification:** MSO Intake Staff notifies the patient of the refill status (approved, approved with lab order, denied with reason and next steps) within 1 business day of the physician's determination.

**Async refill SLA:** The Covering Physician completes the async refill review within 3 business days of the request entering the physician queue. MSO Intake Staff monitors the queue and escalates requests approaching the SLA deadline.

### 5.6 Modified-Async Refill Pathway (Controlled Substances / TRT)

The modified-async refill pathway applies to all controlled substance refills — at launch, this means testosterone cypionate. This pathway imposes additional safeguards beyond the standard async refill pathway: a CURES check at every refill event and a mandatory synchronous encounter at defined intervals.

**Eligibility criteria (all must be satisfied):**

1. The medication is testosterone cypionate (Schedule III)
2. The patient is in the Maintenance treatment phase
3. All criteria from section 5.5 (async refill eligibility) are met
4. The patient has attended a synchronous telehealth encounter with the Covering Physician within the preceding six months
5. The patient's CURES history does not contain unresolved concerning findings from the most recent check

**Mandatory synchronous encounter requirement:**

- At minimum every six months, the Covering Physician conducts a synchronous telehealth encounter with every patient receiving controlled substance prescriptions under this SOP
- The synchronous encounter serves as a clinical reassessment: treatment response, symptom review, adverse effect screening, adherence confirmation, continued medical necessity, and assessment of the risk-benefit profile of continued controlled substance therapy
- The six-month synchronous encounter resets the eligibility clock for modified-async refills
- Between synchronous encounters, the physician may authorize refills via modified-async review provided all eligibility criteria are met
- If a patient's six-month synchronous encounter is overdue, no further modified-async refills are authorized until the encounter is completed

**Modified-async refill workflow:**

1. **Request intake and operational pre-screening:** Same as section 5.5 steps 1 and 2, with the addition of verifying that the most recent synchronous encounter is within six months
2. **Physician queue routing:** MSO Intake Staff routes the refill request to the Covering Physician's controlled substance refill review queue in OptiMantra, flagged as "Modified-Async — CURES Required"
3. **CURES check:** The Covering Physician performs a CURES check for the patient per section 5.4 before authorizing the refill. The CURES check must be performed on the same business day as the refill authorization.
4. **Physician modified-async review:** The Covering Physician reviews the patient's chart, current labs, symptom history, adherence record, and CURES results. The physician determines one of the following:
   - **Approve refill** — CURES clear, all criteria met; the prescription is renewed; the physician documents the CURES check and review in OptiMantra
   - **Approve refill with conditions** — the refill is approved, but the physician orders labs, schedules a synchronous encounter sooner than the six-month cycle, or adds monitoring instructions
   - **Deny refill — require synchronous encounter** — the physician identifies a clinical concern, a CURES concern, or a lab concern that requires a synchronous visit
   - **Deny refill — CURES concern** — the CURES check reveals concerning findings per section 5.4; the prescription is held pending the escalation in section 7.2
   - **Deny refill — discontinue** — the physician determines testosterone should be discontinued; the discontinuation is documented and the patient is notified
5. **Prescription generation and routing:** If approved, the prescription is generated via EPCS and routed to Strive Pharmacy per section 5.3
6. **Patient notification:** Same as section 5.5 step 6

**Schedule III refill tracking:**

- MSO Intake Staff maintains a refill tracker for all Schedule III prescriptions that records: original prescription date, number of refills authorized, number of refills used, remaining refills, six-month expiration date, and next CURES check date
- When a patient approaches the fifth refill or the six-month prescription expiration (whichever comes first), MSO Intake Staff notifies the Covering Physician that a new prescription will be required and ensures the patient is scheduled for any required synchronous encounter
- The refill tracker is maintained in OptiMantra and is available for audit upon request

### 5.7 Dose Adjustment Workflow

Dose adjustments are physician-initiated changes to a patient's prescribed regimen. Patients do not self-adjust doses. All dose adjustments are clinical decisions made by the Covering Physician.

**Dose adjustment triggers:**

- Monitoring lab results indicating the current dose is subtherapeutic, supratherapeutic, or producing safety-relevant changes
- Patient-reported inadequate symptom response after an adequate trial period at the current dose
- Patient-reported adverse effects that may be dose-related
- Clinical reassessment during a synchronous encounter indicating a dose change is warranted
- Change in patient weight, comorbidity status, or concurrent medication that affects dosing

`[CLINICAL — PENDING COVERING PHYSICIAN: Define the service-line-specific dose adjustment triggers for each service line in Attachments A through D, including: specific lab values or ranges that trigger a dose increase or decrease; minimum trial period at a given dose before a dose adjustment is considered; maximum dose ceilings for each medication; step-up and step-down increment sizes; and any contraindications to dose adjustment (e.g., lab values at which the medication must be held rather than adjusted).]`

**Dose adjustment process:**

1. **Trigger identification:** The Covering Physician identifies a dose adjustment trigger through lab review, synchronous encounter, or patient-reported symptom review
2. **Clinical assessment:** The Covering Physician reviews the patient's complete prescribing history, current labs, symptom reports, and treatment goals to determine the appropriate adjustment
3. **Patient communication:** The Covering Physician communicates the dose adjustment to the patient, including: the rationale for the change, the new dose and administration instructions, expected timeline for reassessment, any changes to monitoring labs or follow-up cadence, and what to watch for (expected effects, potential adverse effects)
4. **Prescription generation:** The Covering Physician generates a new prescription at the adjusted dose per section 5.3. For controlled substances, a CURES check is performed before the new prescription is transmitted.
5. **Phase update:** If the dose adjustment moves the patient from Maintenance back to Titration, the Covering Physician updates the treatment phase in OptiMantra. MSO Intake Staff updates the GHL pipeline accordingly.
6. **Monitoring reset:** The Covering Physician orders follow-up labs per the post-dose-adjustment monitoring cadence defined in the applicable service-line attachment. The monitoring clock resets from the date of the dose change.
7. **Documentation:** The Covering Physician documents the dose adjustment in OptiMantra, including: previous dose, new dose, clinical rationale, CURES check (if applicable), patient communication, and updated monitoring plan

### 5.8 Patient-Reported Symptom Workflow

Patients may report symptoms, adverse effects, or medication concerns between scheduled encounters. This section defines the intake, routing, and triage of those reports.

**Intake channels:**

- OptiMantra patient portal secure message
- Phone call to Bloom Metabolics (received by MSO Intake Staff)
- Email to the designated patient communication address

**MSO Intake Staff role (operational — non-clinical):**

1. MSO Intake Staff receives the patient report and documents it in OptiMantra under the patient's chart with the date, time, channel, and verbatim or close-paraphrase content of the patient's report
2. MSO Intake Staff does NOT assess the clinical significance of the report, does NOT provide clinical advice, and does NOT characterize the symptom as serious or non-serious
3. MSO Intake Staff routes all patient-reported symptoms to the Covering Physician's symptom review queue in OptiMantra

**Severity classification and routing priority:**

MSO Intake Staff applies the following operational triage to determine routing priority. This triage is based on keywords and patient self-report, not on clinical assessment.

| Routing Priority | Patient Report Characteristics | Routing SLA |
| --- | --- | --- |
| **Urgent** | Patient reports: chest pain, difficulty breathing, severe allergic reaction, fainting, suicidal ideation, or states they believe they are having a medical emergency | Immediately route to Covering Physician by phone and secure message; instruct patient to call 911 if they believe they are in immediate danger |
| **High** | Patient reports: significant adverse effect (persistent nausea/vomiting, injection site infection signs, mood changes, visual disturbances, priapism), new symptom onset since starting medication, or requests to stop medication due to side effects | Route to Covering Physician within 4 business hours |
| **Standard** | Patient reports: mild side effects previously discussed during informed consent, questions about administration technique, non-urgent medication questions, symptom improvement reports | Route to Covering Physician within 1 business day |

**Covering Physician response:**

The Covering Physician reviews the patient-reported symptom and determines the clinical response. The physician's determination is documented in OptiMantra and may include: reassurance and monitoring, dose adjustment (per section 5.7), medication hold, treatment discontinuation, synchronous encounter scheduling, referral to emergency services or specialist, or additional lab ordering per [SOP-006](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md).

### 5.9 Compounded GLP-1 Exception Pathway

FDA-approved branded semaglutide and tirzepatide are the default GLP-1/GIP medications at Bloom Metabolics. Compounded GLP-1 formulations are prescribed only when the Covering Physician documents patient-specific medical necessity under FDA section 503A.

**Criteria for compounded GLP-1 medical necessity (at least one must apply):**

1. **FDA Drug Shortage:** The FDA-approved branded product is listed on the FDA Drug Shortage List (checked at the time of prescribing)
2. **Patient-specific intolerance or allergy:** The patient has a documented adverse reaction, allergy, or intolerance to an inactive ingredient in the FDA-approved formulation that is not present in the compounded formulation
3. **Dose or formulation unavailability:** The patient requires a dose or formulation that is not commercially available in the FDA-approved product (e.g., a microdose for initiation that is below the commercially available minimum)
4. **Other patient-specific clinical reason:** `[CLINICAL — PENDING COVERING PHYSICIAN: Define the specific clinical circumstances, beyond shortage, intolerance, and dose unavailability, that justify compounded GLP-1 prescribing under FDA 503A medical necessity. Define the documentation standard required for these circumstances — specifically, what level of clinical detail must appear in the chart note to support the medical necessity determination, and whether any additional documentation (e.g., a structured medical necessity attestation, a second physician concurrence if available, periodic utilization review) is required. The default posture of this SOP is conservative — compounded GLP-1 is the exception, not the rule — and the physician's clinical standard for this catch-all category should reflect that posture.]`

`[CLINICAL — PENDING COVERING PHYSICIAN: Review and confirm or modify the medical necessity criteria above. Define the specific clinical content for criterion (4) per the inline marker. Define whether the physician requires a specific documentation format for medical necessity (e.g., a standardized medical necessity attestation form) or whether a narrative chart note is sufficient. Define the clinical standard for "intolerance" — what level of adverse effect at what duration qualifies as intolerance justifying a switch to compounded product. The conservative default-branded posture of this SOP should be preserved unless the physician documents a clinical rationale for a more permissive standard.]`

**Prescribing workflow for compounded GLP-1:**

1. The Covering Physician determines that compounded GLP-1 is medically necessary and documents the specific criterion (from the list above) in the patient's OptiMantra chart
2. The Covering Physician generates the prescription and routes it to the 503A compounding partner per the pharmacy routing table in section 5.3
3. The prescription includes: the specific compounded formulation, strength, quantity, directions for use, and a notation that the prescription is pursuant to a 503A medical necessity determination
4. MSO Intake Staff confirms receipt of the prescription by the compounding partner within 1 business day and tracks fill status per section 5.3

**Periodic re-evaluation:**

- The medical necessity for compounded GLP-1 is re-evaluated at every refill cycle
- If the basis for medical necessity was FDA Drug Shortage, the Covering Physician (or MSO Intake Staff at physician direction) checks the FDA Drug Shortage List at each refill. If the shortage has resolved, the patient is transitioned to the FDA-approved branded product at the next refill unless another medical necessity criterion applies
- If the basis was patient-specific intolerance, the medical necessity continues without re-evaluation unless the FDA-approved formulation changes (new inactive ingredient profile) or the patient requests a trial of the branded product
- Re-evaluation is documented in OptiMantra at each refill event

**Compounded GLP-1 documentation requirements:**

| Element | Documentation Location |
| --- | --- |
| Medical necessity criterion | Patient chart note in OptiMantra |
| FDA Drug Shortage List check (if applicable) | Patient chart note with date and source URL |
| Patient-specific intolerance documentation (if applicable) | Patient chart note with adverse event description, date of occurrence, and causal assessment |
| 503A compounding partner prescription | OptiMantra prescription record |
| Periodic re-evaluation | Patient chart note at each refill cycle |

### 5.10 Prescribing Documentation Requirements

Every prescribing event under this SOP generates documentation in OptiMantra. The following table defines the comprehensive documentation requirements.

| Prescribing Event | Required Documentation Elements | Location |
| --- | --- | --- |
| **Initial prescription (Initiation phase)** | Medication name, strength, formulation, quantity, directions, refills authorized, pharmacy routed to, clinical rationale, treatment phase assignment, informed consent reference, CURES check (if controlled), DEA verification (if controlled), visit note reference from SOP-005 | OptiMantra — prescription record + chart note |
| **Refill — async (non-controlled)** | Medication name, strength, quantity, refills remaining/authorized, physician review date, lab review summary, symptom review summary, stable maintenance criteria verification, pharmacy routed to | OptiMantra — prescription record + refill review note |
| **Refill — modified-async (controlled)** | All async elements plus: CURES check date, CURES findings summary, last synchronous encounter date, next synchronous encounter due date, DEA number on prescription | OptiMantra — prescription record + refill review note |
| **Dose adjustment** | Previous dose, new dose, clinical rationale, trigger for adjustment, patient communication summary, CURES check (if controlled), monitoring plan update, phase transition (if applicable) | OptiMantra — chart note + new prescription record |
| **Compounded GLP-1 prescription** | All initial prescription elements plus: medical necessity criterion, supporting documentation (shortage list check, intolerance history, formulation unavailability), 503A notation | OptiMantra — prescription record + medical necessity chart note |
| **Prescription discontinuation** | Medication discontinued, date, clinical rationale, patient communication summary, taper instructions (if applicable), follow-up plan | OptiMantra — chart note |
| **Pharmacy routing** | Pharmacy name, routing method (EPCS, e-prescribe, fax), transmission confirmation, date/time | OptiMantra — prescription record |
| **Fill status update** | Current fill status, date of status change, any pharmacy communication notes | OptiMantra — prescription record |
| **Patient-reported symptom (prescribing-relevant)** | Symptom description, date reported, routing priority, physician review date, physician determination, action taken | OptiMantra — chart note |

---

## 6. Documentation Requirements

This section consolidates the documentation requirements for all prescribing-related events governed by this SOP. Documentation is maintained in OptiMantra as the system of record. All entries include the date, time, author, and patient identifier.

| Event | Documentation Required | Location |
| --- | --- | --- |
| Prescribing decision made (initial) | Visit note with prescribing decision, clinical rationale, treatment phase, medication details, CURES check (if controlled) | OptiMantra — visit note (linked from SOP-005) |
| Prescription generated and transmitted | Prescription record: medication, strength, formulation, quantity, directions, refills, pharmacy, routing method, transmission confirmation | OptiMantra — e-prescribe module |
| CURES check performed | Date, patient name, findings summary, action taken | OptiMantra — chart note (controlled substance section) |
| DEA verification confirmed | Verification date, DEA number, registration status | Physician credentialing file + OptiMantra EPCS configuration |
| Refill request received | Date, patient, medication, request channel, intake staff initials | OptiMantra — refill request log |
| Refill operational pre-screening completed | Prerequisites verified (labs, visit, payment, phase), deficiencies identified (if any) | OptiMantra — refill request log |
| Refill authorized (async or modified-async) | Physician review date, lab review, symptom review, stable maintenance verification, CURES check (if controlled), authorization or denial with rationale | OptiMantra — refill review note |
| Dose adjustment documented | Previous dose, new dose, rationale, trigger, patient communication, monitoring plan, phase update | OptiMantra — chart note + prescription record |
| Treatment phase transition | Previous phase, new phase, date, clinical rationale | OptiMantra — chart note |
| Pharmacy fill status updated | Status, date, pharmacy communication notes | OptiMantra — prescription record |
| Pharmacy rejection documented | Rejection reason, date, physician notification, re-routing decision | OptiMantra — prescription record + chart note |
| Patient-reported symptom received | Verbatim report, date, channel, routing priority, physician review and determination | OptiMantra — chart note |
| Compounded GLP-1 medical necessity documented | Criterion, supporting evidence, 503A notation, re-evaluation schedule | OptiMantra — chart note |
| Adverse event flag (prescribing-related) | Event description, date, severity, medication suspected, physician assessment, action taken | OptiMantra — chart note (flagged for future AE SOP) |
| Patient communication (prescribing-related) | Date, channel, communicator, content summary, patient response | OptiMantra — patient communication log |

---

## 7. Escalation & Exception Handling

### 7.1 DEA Registration Lapse, Suspension, or Restriction

**Trigger:** The Covering Physician's DEA registration expires, is suspended, is restricted, or is revoked.

**Escalation pathway:**

1. All controlled substance prescribing ceases immediately upon discovery of the lapse, suspension, or restriction. No new prescriptions, no refills, and no dose adjustments for testosterone cypionate are processed.
2. The MSO Owner documents the event, including the date of discovery and the nature of the DEA status change.
3. The MSO Owner notifies the Covering Physician immediately if the physician is not already aware (e.g., if the lapse was discovered during routine annual verification).
4. For patients with active controlled substance prescriptions:
   - Patients with remaining refills on existing prescriptions may continue to fill those refills at the pharmacy (the pharmacy validates DEA status at the time of dispensing; if the pharmacy declines to fill, the patient is notified).
   - No new controlled substance prescriptions are issued until the DEA registration is restored or a substitute prescriber with valid DEA registration is engaged.
5. The MSO Owner contacts the Doctors for Providers retainer to determine the timeline for resolution (reinstatement, new registration, or substitute prescriber).
6. If the lapse cannot be resolved within 30 calendar days, the MSO Owner initiates an operational contingency plan, which may include: engaging a substitute prescriber for controlled substance prescriptions only, transitioning patients to non-controlled alternatives if clinically appropriate (physician decision), or suspending the TRT service line pending resolution.
7. The event and all actions taken are documented in the SOP-007 revision log and reported in the next quarterly audit verification per [SOP-001 section 5.14](../SOP-001-document-control/SOP-001-document-control.md).

### 7.2 CURES Check — Concerning Results

**Trigger:** The Covering Physician's CURES check reveals concerning results as defined in section 5.4.

**Escalation pathway:**

1. The Covering Physician does NOT transmit the controlled substance prescription until the concerning finding is resolved.
2. The Covering Physician documents the CURES finding in the patient's OptiMantra chart, including the specific concern identified.
3. The Covering Physician determines the appropriate clinical response:
   - **Explainable finding requiring documentation only** — the finding has a clinical explanation (e.g., the patient disclosed the concurrent prescription during intake), the physician documents the explanation, and prescribing proceeds
   - **Finding requiring patient discussion** — the physician contacts the patient to discuss the CURES finding before making a prescribing decision. The discussion and outcome are documented in OptiMantra.
   - **Finding requiring prescription hold** — the physician holds the prescription pending further evaluation (additional CURES review, patient discussion, consultation with a colleague, or referral for substance use evaluation)
   - **Finding requiring discontinuation** — the physician determines that controlled substance prescribing is not appropriate and discontinues testosterone therapy. The patient is notified, the discontinuation is documented, and the patient is offered non-controlled treatment alternatives if clinically appropriate.
4. If the concerning finding suggests potential diversion, fraud, or a pattern consistent with substance use disorder, the Covering Physician documents the clinical assessment and determines whether a referral for substance use evaluation is warranted. The physician's clinical judgment governs the referral decision.
5. All CURES-related escalations are documented in OptiMantra with sufficient detail to support audit review.

### 7.3 Compounded GLP-1 Supply Disruption

**Trigger:** The 503A compounding partner is unable to fill a compounded GLP-1 prescription due to ingredient shortage, regulatory action, or operational disruption.

**Escalation pathway:**

1. MSO Intake Staff documents the disruption upon notification from the compounding partner, including the cause, expected duration, and affected medications.
2. MSO Intake Staff notifies the MSO Owner and the Covering Physician within 1 business day.
3. The MSO Owner contacts the compounding partner to obtain a detailed timeline for resolution.
4. The Covering Physician determines the clinical response for affected patients:
   - **Transition to FDA-approved branded product** — if the branded product is available and clinically appropriate, the physician transitions the patient. This is the preferred pathway.
   - **Alternative compounding partner** — if a second 503A or 503B partner is available and vetted, the physician may route to the alternative. The MSO Owner manages the alternative vendor relationship.
   - **Temporary treatment hold** — if no alternative is available and the clinical situation permits, the physician may place the patient on a temporary hold with documented monitoring plan.
5. Affected patients are notified of the disruption and the planned response within 2 business days.
6. When the disruption resolves, the Covering Physician determines whether patients who were transitioned should return to the compounded formulation or remain on the branded product.

### 7.4 Pharmacy Fill Failure

**Trigger:** A prescription remains unfilled, is rejected by the pharmacy, or encounters a fill error.

**Escalation pathway:**

1. MSO Intake Staff identifies the fill failure through routine fill-status tracking (section 5.3) or patient report.
2. MSO Intake Staff contacts the pharmacy to determine the cause:
   - **Inventory/stock issue:** MSO Intake Staff confirms expected restock date. If restock exceeds 5 business days, MSO Intake Staff notifies the Covering Physician for potential re-routing.
   - **Prescription error (wrong NDC, missing information, unclear directions):** MSO Intake Staff notifies the Covering Physician to correct and re-transmit.
   - **Controlled substance verification failure:** The pharmacy cannot verify the prescription, DEA number, or patient identity. MSO Intake Staff notifies the Covering Physician immediately.
   - **Patient non-pickup (retail pharmacy):** MSO Intake Staff contacts the patient to confirm intent. If the patient no longer wishes to fill the prescription, the physician is notified.
3. The Covering Physician re-transmits, corrects, or re-routes the prescription as needed.
4. All fill failures are documented in OptiMantra with the cause, resolution, and timeline.
5. If a pattern of fill failures emerges with a specific pharmacy (3 or more failures in 90 days), the MSO Owner escalates to the pharmacy vendor for resolution and evaluates whether a pharmacy change is warranted.

### 7.5 Outdated Labs on Refill Request

**Trigger:** A patient submits a refill request, but their most recent labs are outdated (beyond the acceptable window defined in the applicable service-line attachment).

**Escalation pathway:**

1. MSO Intake Staff identifies the outdated labs during operational pre-screening (section 5.5 step 2 or section 5.6 step 1).
2. MSO Intake Staff notifies the patient that the refill cannot be processed until current labs are completed.
3. MSO Intake Staff initiates a lab order per [SOP-006](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md) if a standing order exists, or routes to the Covering Physician for a new lab order if no standing order is in place.
4. The refill request is held in the queue pending lab completion and physician review.
5. If the patient does not complete the required labs within 14 calendar days of notification, MSO Intake Staff sends a second notification and escalates to the Covering Physician. The physician determines whether to extend the deadline, authorize a limited refill to bridge the gap (physician's clinical judgment), or hold the refill until labs are completed.
6. If the patient does not complete labs within 30 calendar days, the Covering Physician evaluates whether continued prescribing is appropriate without current labs and documents the decision.

### 7.6 Patient-Reported Adverse Effect

**Trigger:** A patient reports an adverse effect through the symptom intake workflow (section 5.8) that is potentially related to a medication prescribed under this SOP.

**Escalation pathway:**

1. MSO Intake Staff routes the report to the Covering Physician per the priority classification in section 5.8.
2. The Covering Physician assesses the report and determines causality (definitely related, probably related, possibly related, unlikely related, unrelated).
3. The Covering Physician determines the clinical response: continue current regimen with monitoring, dose adjustment (section 5.7), medication hold, treatment discontinuation, or referral to emergency services or specialist.
4. If the adverse effect is serious (as defined by FDA: results in death, is life-threatening, requires hospitalization, results in persistent or significant disability, or is a congenital anomaly), the Covering Physician documents the event and flags it for reporting under the future Adverse Event Reporting SOP.
5. All adverse effect assessments and responses are documented in OptiMantra with the date, patient's report, physician's assessment, causality determination, and action taken.

### 7.7 Strive Pharmacy or Compounding Partner Operational Disruption

**Trigger:** Strive Pharmacy or the 503A/503B compounding partner experiences a systemic operational disruption (system outage, regulatory action, business closure, shipping disruption) that prevents prescription fulfillment.

**Escalation pathway:**

1. The MSO Owner confirms the disruption and documents the scope, expected duration, and affected prescriptions.
2. The MSO Owner notifies the Covering Physician within 4 business hours.
3. For Strive Pharmacy disruptions affecting controlled substances:
   - The MSO Owner identifies an alternative pharmacy capable of receiving EPCS for Schedule III substances and verifies the pharmacy's DEA compliance.
   - The Covering Physician authorizes re-routing to the alternative pharmacy and re-transmits affected prescriptions.
   - The alternative pharmacy arrangement is documented in OptiMantra for each affected patient.
4. For compounding partner disruptions:
   - The MSO Owner contacts alternative 503A/503B partners (if identified in advance) to determine capacity.
   - For compounded GLP-1 patients, the Covering Physician evaluates transition to FDA-approved branded product per section 7.3.
   - For other compounded formulations, the Covering Physician determines the clinical response on a per-patient basis.
5. Affected patients are notified of the disruption and the planned resolution within 2 business days.
6. When the disruption resolves, the MSO Owner verifies that the pharmacy is operational before resuming routine routing. Prescriptions routed to alternative pharmacies during the disruption are tracked to ensure completion.

### 7.8 Physician-Initiated Treatment Discontinuation

**Trigger:** The Covering Physician determines that a patient's medication should be discontinued for clinical reasons (adverse effect, inefficacy, patient non-adherence, clinical contraindication, or patient safety concern).

**Escalation pathway:**

1. The Covering Physician documents the discontinuation decision in OptiMantra, including: the medication being discontinued, the clinical rationale, whether a taper is required, and the date of discontinuation.
2. The Covering Physician communicates the discontinuation to the patient directly, including: the reason for discontinuation, any taper instructions, expected withdrawal or discontinuation effects (if applicable), alternative treatment options (if available), and follow-up plan.
3. If a taper is required, the Covering Physician generates a taper prescription with specific instructions and monitoring.
4. MSO Intake Staff updates the patient's treatment phase and GHL pipeline to reflect the discontinuation.
5. All pending refill requests for the discontinued medication are closed.
6. The pharmacy is notified if the patient has remaining refills that should be cancelled.
7. Follow-up labs and/or a follow-up visit are scheduled per the Covering Physician's instructions to monitor the patient post-discontinuation.

### 7.9 Patient Declines Required Synchronous Encounter

**Trigger:** A patient on the modified-async refill pathway (controlled substances) or the async refill pathway declines or fails to schedule a required synchronous encounter, preventing refill authorization.

**Escalation pathway:**

1. MSO Intake Staff notifies the patient that the mandatory synchronous encounter is required before further refills can be authorized, and provides scheduling options.
2. If the patient does not schedule within 14 calendar days of the first notification, MSO Intake Staff sends a second notification with a clear statement: "Your prescription refill cannot be processed until the required follow-up visit is completed."
3. If the patient does not schedule within 30 calendar days:
   - For controlled substances: the Covering Physician is notified. No further controlled substance refills are authorized. The Covering Physician documents the patient's non-compliance and determines whether to: extend one final refill to bridge the patient to a visit (physician's clinical judgment, considering the risks of abrupt testosterone discontinuation), close the patient's controlled substance prescribing, or take other appropriate clinical action.
   - For non-controlled medications: the Covering Physician determines whether to authorize a limited bridge refill or hold further refills pending the encounter.
4. If the patient remains unresponsive after 60 calendar days, the patient's treatment status is updated to "Inactive — Non-Compliant" and the Covering Physician documents a treatment discontinuation note. The patient may re-enter active treatment by completing the required encounter.

---

## 8. Training & Competency

### 8.1 Covering Physician

The Covering Physician is presumed competent in all clinical prescribing activities governed by this SOP by virtue of their medical training, California medical licensure, board certification, DEA registration, and CURES enrollment. Upon assignment, the Covering Physician:

1. Reviews this SOP in its entirety
2. Populates all `[CLINICAL — PENDING COVERING PHYSICIAN]` markers with clinical content per their clinical judgment
3. Reviews and completes the service-line-specific attachments (Attachments A through D) with medication-specific parameters, dosing protocols, treatment phase criteria, and clinical thresholds
4. Verifies active DEA registration and CURES enrollment
5. Completes OptiMantra EPCS identity proofing and two-factor authentication setup
6. Confirms competency with OptiMantra's e-prescribing module, including EPCS workflow
7. Signs the Approval & Signature page (section 12)

The Covering Physician is not required to complete a separate training program on the operational sections of this SOP. Operational workflows (pharmacy coordination, fill tracking, refill routing, cost management) are the responsibility of the MSO Owner and MSO Intake Staff.

### 8.2 MSO Owner and MSO Intake Staff

The MSO Owner and any MSO Intake Staff involved in prescribing-related workflows must be trained on the following components of this SOP before performing prescribing-related work:

| Training Component | Content | Trained By |
| --- | --- | --- |
| SOP-007 governance sections (1-4, 6-12) | Scope, definitions, roles, documentation, escalation, compliance | MSO Owner (self-study + acknowledgment) |
| Pharmacy routing and coordination (5.3) | Routing logic, fill-status tracking, pharmacy communication | MSO Owner (vendor training + internal walkthrough) |
| Async refill operational workflow (5.5) | Request intake, operational pre-screening, queue routing, patient notification | MSO Owner |
| Modified-async refill operational workflow (5.6) | All async elements plus CURES flag awareness, synchronous encounter tracking, Schedule III refill tracker | MSO Owner |
| Patient-reported symptom intake (5.8) | Intake logging, priority triage, physician routing — no clinical assessment | MSO Owner |
| Escalation pathways (7) | Operational components of each escalation — patient communication, pharmacy follow-up, pipeline updates | MSO Owner |
| OptiMantra prescribing module (operational) | Prescription record navigation, fill status, refill request log, patient communication log — NOT e-prescribing or EPCS | MSO Owner (EHR training) |

### 8.3 Training Boundary

The training boundary between clinical and operational roles is absolute and is reinforced during all training:

- **MSO staff perform operational prescribing support:** refill request intake, operational pre-screening, fill-status tracking, pharmacy communication, patient logistics communication, pipeline updates, and refill tracker maintenance.
- **The Covering Physician performs all clinical prescribing activities:** prescribing decisions, CURES checks, dose adjustments, refill authorizations, medical necessity determinations, adverse effect assessments, and all clinical communication with patients regarding their prescriptions.
- MSO staff are trained to recognize and articulate this boundary. If a patient asks an MSO staff member a clinical question about their prescription (dose rationale, side effect management, whether to take their medication, what a lab result means for their dose), the staff member routes the question to the Covering Physician without providing their own assessment.

---

## 9. Compliance & Regulatory References

| Standard / Regulation | Relevance to This SOP |
| --- | --- |
| **California Bus. & Prof. Code section 2242** | Requires a Good Faith Examination before prescribing; the prescribing decision under this SOP is predicated on the GFE performed under SOP-005 |
| **California Bus. & Prof. Code section 4170** | Governs the dispensing of drugs and devices; relevant to pharmacy routing and the prohibition on in-office dispensing without appropriate licensure |
| **California Bus. & Prof. Code section 2241.5** | Internet prescribing restrictions; requires a bona fide prescriber-patient relationship established through appropriate examination before prescribing via telehealth |
| **California Health & Safety Code section 11165** | Establishes the CURES Prescription Drug Monitoring Program; mandates prescriber enrollment and consultation before prescribing Schedule II-IV controlled substances |
| **California Code of Regulations, Title 16, section 1748** | Board of Pharmacy regulations on controlled substance prescribing and dispensing; applicable to pharmacy routing and Schedule III refill rules |
| **Ryan Haight Online Pharmacy Consumer Protection Act (21 U.S.C. section 829(e))** | Requires a qualifying examination before prescribing controlled substances via the internet; the synchronous audiovisual GFE under SOP-005 satisfies this requirement |
| **DEA Schedule III Prescribing Rules (21 CFR section 1306.22)** | Federal rules for Schedule III prescriptions: up to 5 refills within 6 months, EPCS permitted, oral/fax/electronic transmission |
| **DEA EPCS Regulations (21 CFR Part 1311)** | Technical and procedural requirements for electronic prescribing of controlled substances; governs OptiMantra EPCS configuration and physician identity proofing |
| **California EPCS Mandate (Cal. Bus. & Prof. Code § 688)** | California mandate for electronic prescribing of controlled substances effective January 1, 2022; all Schedule III prescriptions under this SOP are transmitted via EPCS |
| **FDA section 503A (21 U.S.C. section 353a)** | Governs 503A compounding pharmacies; requires patient-specific prescription and medical necessity for compounded medications; applies to compounded GLP-1 exception pathway and compounded formulations |
| **FDA Drug Shortage Lists** | Maintained by FDA; referenced in section 5.9 as a basis for compounded GLP-1 medical necessity; checked at each compounded GLP-1 refill cycle |
| **FDA Prescribing Information — Testosterone Cypionate (Depo-Testosterone)** | Contraindications, warnings, precautions, dosing, and monitoring requirements for FDA-approved testosterone cypionate; informs Attachment A clinical parameters |
| **FDA Prescribing Information — Semaglutide (Wegovy/Ozempic)** | Contraindications, warnings, precautions, dosing, and titration requirements; informs Attachment B clinical parameters |
| **FDA Prescribing Information — Tirzepatide (Zepbound/Mounjaro)** | Contraindications, warnings, precautions, dosing, and titration requirements; informs Attachment B clinical parameters |
| **AUA Guidelines on Testosterone Deficiency (2018)** | Evidence-based guideline for testosterone therapy evaluation, diagnosis, treatment, and monitoring; primary clinical reference for TRT prescribing |
| **Endocrine Society Clinical Practice Guideline: Testosterone Therapy in Men with Hypogonadism (2018)** | Primary clinical guideline for TRT evaluation, diagnosis, treatment initiation, and monitoring; informs Attachment A clinical parameters |
| **Obesity Medicine Association (OMA) Guidelines** | Evidence-based reference for GLP-1/GIP weight management prescribing, titration, and monitoring; informs Attachment B clinical parameters |
| **HIPAA Privacy Rule (45 CFR Part 164 Subpart E)** | Governs the use and disclosure of protected health information in prescribing records, pharmacy communications, and patient notifications |
| **California Confidentiality of Medical Information Act (Cal. Civ. Code section 56 et seq.)** | California-specific medical information confidentiality protections applicable to all prescribing records and pharmacy communications under this SOP |

---

## 10. Related Documents

### Upstream SOPs

| Document | Relationship |
| --- | --- |
| [SOP-001 — Document Control & SOP Lifecycle Management](../SOP-001-document-control/SOP-001-document-control.md) | Governs this SOP's lifecycle, versioning, approval, and clinical ownership framework (section 2.3) |
| [SOP-002 — Patient Intake Operations](../SOP-002-patient-intake-operations/SOP-002-patient-intake-operations.md) | Upstream intake workflow; patient identity, residency, and payment verification are prerequisites for prescribing |
| [SOP-003 — Clinical Eligibility Screening](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) | Upstream eligibility determination; "Proceed" determination is a prerequisite for the clinical visit that generates the prescribing decision |
| [SOP-005 — Synchronous Telehealth Visit](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) | Immediate upstream; the prescribing decision documented during the visit is the entry condition for this SOP |
| [SOP-006 — Lab Ordering & Review](../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md) | Parallel; lab results are inputs to prescribing decisions, refill eligibility, and dose adjustments |

### Parallel SOP

| Document | Relationship |
| --- | --- |
| [SOP-004 — Injection Education](../SOP-004-injection-education/SOP-004-injection-education.md) | Governs injection self-administration education for injectable medications prescribed under this SOP (testosterone cypionate, GLP-1 injectables, PT-141) |

### Attachments to This SOP

| Attachment | Title | Status |
| --- | --- | --- |
| [Attachment A](attachments/attachment-A-trt-prescribing-protocol.md) | TRT Prescribing Protocol (Testosterone Cypionate) | Pending — requires Covering Physician clinical content |
| [Attachment B](attachments/attachment-B-glp1-prescribing-protocol.md) | GLP-1/GIP Prescribing Protocol (Semaglutide, Tirzepatide) | Pending — requires Covering Physician clinical content |
| [Attachment C](attachments/attachment-C-sexual-health-prescribing-protocol.md) | Sexual Health Prescribing Protocol (PT-141, Tadalafil, Sildenafil) | Pending — requires Covering Physician clinical content |
| [Attachment D](attachments/attachment-D-longevity-prescribing-protocol.md) | Longevity Prescribing Protocol (NAD+, Glutathione) | Pending — requires Covering Physician clinical content; deferred pending LegitScript and partner finalization |
| [Attachment E](attachments/attachment-E-pharmacy-routing-reference.md) | Pharmacy Routing Reference (Strive, Compounding Partner, Retail) | Pending — operational; to be completed upon pharmacy onboarding |
| [Attachment F](attachments/attachment-F-cures-check-protocol.md) | CURES Check Protocol and Documentation Template | Pending — clinical template requires Covering Physician approval |
| [Attachment G](attachments/attachment-G-refill-tracker-template.md) | Schedule III Refill Tracker Template | Pending — operational; to be completed upon OptiMantra configuration |

### Future SOPs (Referenced but Not Yet Drafted)

| Document | Relationship |
| --- | --- |
| Adverse Event Reporting SOP | Will govern formal adverse event documentation and reporting; referenced in section 7.6 |
| Treatment Discontinuation SOP | Will govern formal treatment discontinuation procedures; referenced in section 7.8 |
| Follow-Up Visit SOP | Will govern synchronous follow-up encounters referenced in treatment phase cadences |
| Refill & Renewal SOP | May consolidate refill pathway procedures from this SOP into a standalone operational document as volume grows |
| Patient Communication SOP | Will govern standardized patient communication templates and channel protocols |

---

## 11. Revision History

| Version | Date | Author | Description of Change | Approver |
| --- | --- | --- | --- | --- |
| 0.1 | 2026-05-06 | Brian DeGuzman (MSO — operational scaffolding) | Initial draft. All 12 sections structurally complete. Governance sections (1-4, 6-12) are fully drafted with no clinical markers. Section 5 (Procedure) contains `[CLINICAL — PENDING COVERING PHYSICIAN]` markers in subsections 5.2, 5.4, 5.5, 5.7, and 5.9 where service-line-specific clinical parameters, thresholds, and decision criteria must be set by the Covering Physician. Operational content in section 5 (pharmacy routing, fill tracking, refill workflow, symptom intake) is fully drafted. Attachments A through G listed but not yet populated. This SOP is a clinical SOP per SOP-001 section 2.3; the initial v0.1 draft was prepared as operational scaffolding by the MSO Owner; clinical content authority and final approval are the Covering Physician's responsibility. | Covering Physician (TBD) |
| 0.2 | 2026-05-06 | Brian DeGuzman, RN (MSO Owner) | Minor revision applying second-pass audit findings before physician routing. Changes: (1) §3 Definition of EPCS, §5.3 step 2, and §9 Compliance References table updated to correct California EPCS mandate citation from Cal. H&S Code § 11159.2 to Cal. Bus. & Prof. Code § 688 (the actual statutory location of California's EPCS mandate); (2) §3 Definition of CURES and §5.4 CURES check requirement step 2 updated to correct the statutory CURES consultation frequency from "every four months" to "every six months" per Cal. Health & Safety Code § 11165.4; (3) §5.9 compounded GLP-1 medical necessity criterion (4) "other patient-specific clinical reason" converted to a `[CLINICAL — PENDING COVERING PHYSICIAN]` marker to preserve clinical authority over the standard rather than defaulting to a broad MSO-defined catch-all that would undermine the conservative default-branded posture. Classified as minor revision per SOP-001 §5.11.1 — regulatory citation corrections and clinical-authority preservation with no procedural or scope changes. Five additional issues identified in audit (Schedule III refill rule citation precision, async refill "flagged symptom" operational definition, six-month synchronous encounter clock-reset timing, attachment naming consistency, and phentermine boundary handling) are deferred to Covering Physician's first review pass since they require physician input or are cosmetic. | Covering Physician (TBD) |

---

## 12. Approval & Signature

This SOP becomes effective only when signed by the document owner and approving authority below. Until both signatures are present and the effective date is populated, this document is **DRAFT** and shall not govern clinical practice. No prescriptions may be generated, no pharmacy orders may be routed, and no refill requests may be processed under the authority of this SOP until it is signed and effective.

This is a clinical SOP per [SOP-001 section 2.3](../SOP-001-document-control/SOP-001-document-control.md). The Covering Physician serves as both Document Owner and Approving Authority.

---

**Document Owner & Approving Authority — Covering Physician (Medical Director)**

Name: _______________________________________________
Title: _______________________________________________
Medical License #: ___________________________________
State: California
DEA #: ______________________________________________
CURES Enrollment Confirmed: [ ] Yes  [ ] No
Signature: ___________________________________________
Date: _______________________________________________

---

**Acknowledgment — MSO Owner (Operational Support)**

I acknowledge that I have reviewed this SOP and that my role is limited to operational scaffolding as defined in section 4: pharmacy vendor management, integration configuration, refill workflow routing, fill-status tracking, patient logistics communication, CURES enrollment infrastructure, and SOP lifecycle maintenance. I do not prescribe, do not authorize refills, do not determine doses, do not perform CURES checks, and do not make clinical decisions of any kind.

Name: Brian DeGuzman
Title: MSO Owner / Registered Nurse
Signature: ___________________________________________
Date: _______________________________________________

---

**Acknowledgment of Receipt and Review**

By signing below, the personnel listed acknowledge they have read, understood, and agree to comply with this SOP within the scope of their assigned role as defined in section 4.

| Name | Role | Signature | Date |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

---

*Bloom Metabolics -- Confidential*
*This document is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md).*
