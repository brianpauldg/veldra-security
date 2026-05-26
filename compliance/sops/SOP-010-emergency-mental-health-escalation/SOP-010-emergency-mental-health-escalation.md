---
sop_id: "SOP-010"
title: "Emergency & Mental Health Escalation"
version: "0.1"
status: "Draft (Physician-Pending)"
effective_date: "TBD (pending approval)"
next_review_date: "12 months from effective date"
owner: "Dr. Michael Napolitano, MD — Covering Physician / Medical Director"
approver: "Dr. Michael Napolitano, MD — Covering Physician / Medical Director (clinical SOP per SOP-001 §2.3)"
classification: "INTERNAL — CLINICAL USE ONLY"
governing_sop: "SOP-001 (Document Control & SOP Lifecycle Management)"
operational_owner: "Brian DeGuzman, RN — MSO Owner"
issued_date: "2026-05-24"
related_documents:
  - "SOP-001 (Document Control & SOP Lifecycle Management)"
  - "SOP-002 (Patient Intake Operations)"
  - "SOP-003 (Clinical Eligibility Screening)"
  - "SOP-005 (Synchronous Telehealth Visit)"
  - "SOP-007 (Prescribing Protocols)"
  - "SOP-008 (Adverse Event & Incident Reporting)"
  - "Future Provider Credentialing, Insurance & Coverage SOP"
  - "Future Treatment Discontinuation & Tapering SOP"
  - "Future Patient Communication Protocols SOP"
---

# Emergency & Mental Health Escalation

**SOP ID:** SOP-010
**Version:** 0.1
**Status:** Draft (Physician-Pending)
**Effective Date:** TBD (pending approval)
**Next Scheduled Review:** 12 months from effective date
**Document Owner:** Dr. Michael Napolitano, MD — Covering Physician / Medical Director
**Approving Authority:** Dr. Michael Napolitano, MD — Covering Physician / Medical Director (clinical SOP per SOP-001 §2.3)
**Operational Owner:** Brian DeGuzman, RN — MSO Owner
**Classification:** INTERNAL — CLINICAL USE ONLY

---

## Notice

### Standing Notice

This Standard Operating Procedure is the property of Bloom Metabolics and is intended exclusively for use by authorized Bloom Metabolics personnel and agents. This document does not constitute medical, legal, or regulatory advice and does not replace individualized clinical judgment by the covering physician. All clinical decisions remain the responsibility of the licensed prescribing clinician.

This SOP is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../SOP-001-document-control/SOP-001-document-control.md). No section of this document may be modified, distributed, or implemented outside the workflow defined therein.

### Status Notice

> This document is in DRAFT status. It has not been reviewed, approved, or signed and is NOT operative. No emergency escalation, mental health crisis response, Tarasoff assessment, 5150 welfare check request, mandated reporting submission, pause-status determination, or re-entry decision shall be conducted on the basis of this document in its current state. No event handling may occur under this SOP until the Covering Physician has signed and the effective date has been populated. In the interim — and at all times — any patient who presents with imminent danger to self or others shall be directed to call 911 or, where Bloom personnel are interacting synchronously with the patient, Bloom personnel shall facilitate emergency services dispatch without delay.

### Clinical Authority Notice

> This is a clinical SOP per [SOP-001 §2.3](../SOP-001-document-control/SOP-001-document-control.md). All clinical content — including severity tier determination, mental health crisis assessment, Tarasoff applicability determination, 5150 criteria assessment, prescription handling during crisis, pause-and-stabilize criteria, stabilization confirmation, and re-entry approval — is the exclusive authority of the Covering Physician. The MSO Owner (Brian DeGuzman, RN) provides operational scaffolding only: incident intake routing, OptiMantra documentation infrastructure, crisis resource list maintenance, after-hours coverage coordination, mandated reporter submission logistics (the report content remains the reporter's clinical responsibility), and pause-status communication delivery. The MSO Owner does not assess clinical severity of any crisis event, does not determine Tarasoff applicability, does not make 5150 referral decisions, does not adjust prescriptions during crisis, and does not unilaterally place or release a patient from pause status. This boundary is absolute and is not subject to delegation.

### Scope-of-Practice Notice

> Bloom Metabolics is a California cash-pay telehealth practice scoped to metabolic and endocrine care: testosterone replacement therapy (TRT), GLP-1/GIP weight management, sexual health, longevity protocols, and peptide therapy (deferred pending LegitScript certification). Bloom Metabolics is **not** a mental health provider, emergency medicine provider, primary care provider, psychiatrist's office, substance abuse treatment program, crisis stabilization service, or designated 5150 facility. This SOP defines how Bloom recognizes, escalates, and documents emergency events and mental health crises that surface in the course of metabolic care — and how Bloom pauses metabolic care when continuing it would be clinically unsafe. This SOP does not — and cannot — convert Bloom into a provider of services outside its defined scope.

### Reporting & Escalation Authority Notice

> Bloom Metabolics is not the primary provider of emergency medicine, mental health care, or crisis stabilization for any patient. When an emergency or mental health crisis occurs in connection with Bloom care, Bloom's role is to (a) recognize the event, (b) facilitate connection to the appropriate external resource (911, 988, mental health provider, county crisis services), (c) document the event under this SOP and cascade documentation to [SOP-008 (Adverse Event & Incident Reporting)](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) where SOP-008 thresholds are met, and (d) determine whether Bloom's metabolic care continues, pauses, or terminates. Bloom does not transport patients, does not provide pre-hospital care, does not initiate involuntary holds, does not stabilize active crises, and does not substitute for established mental health treatment. Mandated reporting obligations (Cal. Penal Code §11164 et seq., Cal. Welf. & Inst. Code §15630, Cal. Penal Code §11160) are personal obligations of the licensed reporter (the Covering Physician or MSO Owner RN as applicable) and are not delegable to operational staff.

---

## 1. Purpose

This SOP establishes the comprehensive framework for identifying, responding to, escalating, documenting, and recovering from emergency events — both medical and mental health — that occur in the course of Bloom Metabolics operations. It defines Bloom's role as an escalation conduit for events that fall outside Bloom's defined scope of metabolic and endocrine care, and it defines the pause-and-stabilize protocol that governs Bloom's metabolic care when a patient is in active crisis or recovering from one.

Specifically, this SOP governs:

1. **Medical emergencies** occurring during or surfaced by Bloom telehealth interactions (synchronous video visits, asynchronous secure messaging, scheduled laboratory events, patient-reported events arriving through any channel), with a four-tier severity framework (Medical Tier 1 through Medical Tier 4)
2. **Mental health crises** occurring during or surfaced by Bloom telehealth interactions, with a parallel four-tier severity framework (MH Tier 1 through MH Tier 4)
3. **Telehealth-specific failure modes** during active crisis events, including synchronous visit drops, patient unresponsiveness on video, location-of-means disclosure, intoxication during a visit, async crisis-content messages received outside business hours, patient refusal of dispatch, unknown patient location, and out-of-California crisis events
4. **Pre-enrollment crisis disclosures** that surface during waitlist signups, intake form completion, or clinical eligibility screening before a Bloom clinical relationship has been established
5. **The pause-and-stabilize protocol** for patients who experience MH Tier 3 or MH Tier 4 events (and selected Medical Tier 3/4 events), including criteria for entry into pause status, scope of pause, patient communication, stabilization confirmation, and re-entry to Bloom care
6. **California-specific legal obligations** that arise in connection with crisis events: Tarasoff duty (Cal. Civ. Code §43.92), 5150 involuntary hold interface (Cal. Welf. & Inst. Code §5150), and mandated reporter obligations (Cal. Penal Code §11164 et seq. for child abuse and neglect; Cal. Welf. & Inst. Code §15630 for elder/dependent adult abuse; Cal. Penal Code §11160 for injuries from assaultive conduct including domestic violence)
7. **Crisis resource provisioning** to patients (and prospective patients), including the standing Crisis Resource Card (Attachment A) provided at intake and on the patient portal, and on-demand resource provisioning during sync visits and through other channels
8. **Documentation cascade** into [SOP-008 (Adverse Event & Incident Reporting)](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) where SOP-008 thresholds are met, and into the MSO operational incident log where SOP-008 does not apply (e.g., pre-enrollment events where no clinical relationship has been established)
9. **Prescription handling during active crisis**, including default-hold posture during pause status and the override criteria the Covering Physician may apply to continue specific medications during pause

The framework established by this SOP follows a structured lifecycle: **recognition → triage and tier determination → response action (in-scope handling, external escalation, or both) → documentation → pause assessment → stabilization tracking → re-entry decision → quality improvement**. Each step has clearly delineated clinical and operational authority per §4 and the Clinical Authority Notice above.

This SOP picks up where the upstream SOPs leave off when a crisis event is identified:

- From [SOP-002 (Patient Intake Operations)](../SOP-002-patient-intake-operations/SOP-002-patient-intake-operations.md): pre-enrollment crisis disclosures during intake routing into §5.5 of this SOP
- From [SOP-003 (Clinical Eligibility Screening)](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md): contraindication assessment that surfaces crisis-relevant exclusions or current crisis activity
- From [SOP-005 (Synchronous Telehealth Visit)](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md): in-visit crisis recognition (the location confirmation at the start of every sync visit per SOP-005 §[applicable section] is a prerequisite for the §5.4 telehealth crisis protocols here)
- From [SOP-007 (Prescribing Protocols)](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md): patient-reported symptom intake that surfaces a crisis indicator (suicidal ideation in a depression-screening question, severe injection-site infection requiring ED, etc.) routes to this SOP first; the clinical assessment and any subsequent AE documentation cascade to SOP-008
- From [SOP-008 (Adverse Event & Incident Reporting)](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md): mental health crises during treatment, which were previously out-of-scope for SOP-008, are now governed by this SOP

This SOP is **not** a clinical treatment manual for psychiatric care, suicide prevention, or emergency medicine. Bloom's clinical authority for these conditions is limited to recognizing them, escalating appropriately, and managing the impact on Bloom's metabolic care plan. The substantive clinical management of any condition outside Bloom's scope is the patient's external provider's responsibility.

---

## 2. Scope

### 2.1 In Scope

- **Medical emergencies** occurring during or surfaced by any Bloom interaction: synchronous video visits, asynchronous secure messages, scheduled laboratory events (e.g., a critically abnormal lab result discovered during routine review), patient-reported events arriving through any channel, and events disclosed in connection with billing, scheduling, or other operational interactions
- **Mental health crises** of any severity from mild situational distress through active imminent-danger events, including suicidal ideation across the passive/active/intent/plan/means spectrum, homicidal ideation, acute psychotic symptoms, severe substance intoxication during interaction, gravely-disabled-by-mental-disorder presentations, and acute decompensation in patients with previously stable established outside mental health care
- **Telehealth-specific failure modes** during crisis events: synchronous visit disconnection mid-crisis, patient becoming unresponsive on video (whether due to medical event, intoxication, intentional disconnection, or unclear cause), patient disclosure of location of means of self-harm (firearms, stockpiled medications, etc.), patient intoxication during a visit, async messages containing crisis content received outside business hours, patient refusal of 911 dispatch despite tier criteria being met, unknown patient location (typically resulting from skipped or failed location confirmation at visit start), and crisis events occurring when the patient is physically outside California
- **Pre-enrollment crisis disclosures** during waitlist signup, intake form completion, clinical eligibility screening, or any pre-clinical interaction with Bloom prior to enrollment
- **Post-enrollment crisis events** (the primary focus of this SOP) — events occurring once a clinical relationship has been established under [SOP-002 (Patient Intake Operations)](../SOP-002-patient-intake-operations/SOP-002-patient-intake-operations.md) §[applicable section] and [SOP-005 (Synchronous Telehealth Visit)](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md)
- **Pause-and-stabilize protocols** for patients post-escalation (§5.6): scope of the pause, communication to the patient, stabilization confirmation criteria, and re-entry pathway
- **Re-entry pathway** when stabilization is confirmed (§5.11)
- **California-specific legal obligations** triggered by crisis disclosures: Tarasoff duty (Cal. Civ. Code §43.92), 5150 welfare-check facilitation (Cal. Welf. & Inst. Code §5150), and mandated reporting obligations (Cal. Penal Code §11164 et seq., Cal. Welf. & Inst. Code §15630, Cal. Penal Code §11160)
- **Crisis resource provisioning**: the standing Crisis Resource Card (Attachment A), on-demand resource provisioning during interactions, and Bloom's posture toward third-party crisis service relationships (988, Crisis Text Line, county crisis lines, etc.)
- **Documentation cascade** into [SOP-008 (Adverse Event & Incident Reporting)](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) where SOP-008 thresholds are met per §5.9 of this SOP
- **Prescription handling during active crisis** (§5.10), including default-hold posture and Covering Physician override criteria

### 2.2 Out of Scope — What Bloom Does NOT Treat

Explicit enumeration. Bloom Metabolics provides metabolic and endocrine telehealth scoped to TRT, GLP-1/GIP weight management, sexual health, longevity protocols, and peptide therapy. Bloom Metabolics **DOES NOT** provide, and this SOP does not convert Bloom into a provider of:

- **Mental health treatment** — including psychotherapy, psychiatric medication management, crisis intervention, behavioral therapy, addiction counseling, or any other behavioral or psychiatric clinical service
- **Emergency medicine** — including pre-hospital care, ambulance transport, in-person urgent assessment, in-person stabilization, or any service customarily provided by an emergency department, urgent care center, or paramedic
- **Primary care** — including general medical management of chronic conditions outside Bloom's metabolic and endocrine scope, preventive care, vaccination, sick-visit care, or coordination of multi-specialty care
- **Psychiatry** — including diagnosis, treatment, or medication management of psychiatric conditions, regardless of whether those conditions are co-occurring with conditions Bloom treats
- **Substance abuse and addiction treatment** — including medication-assisted treatment for opioid or alcohol use disorder, withdrawal management, residential or outpatient addiction programs, or counseling for substance use disorders
- **Suicide prevention or active crisis stabilization** — Bloom recognizes and escalates suicidality; it does not provide the clinical intervention that addresses it
- **Pediatric care** — all Bloom patients are ≥18; this SOP does not address pediatric crises, except insofar as a mandated-reporting obligation arises during care of an adult patient regarding a child the patient discloses (per §5.7.3)
- **Pregnancy care or fertility services** — Bloom's contraindication framework under SOP-003 excludes patients during pregnancy and is not a fertility provider
- **Pain management** — neither chronic pain (which requires longitudinal pain medicine expertise) nor acute pain (which requires emergency or urgent in-person assessment)
- **Hospice or palliative care** — Bloom does not provide end-of-life care or symptom management for terminal illness
- **Eating disorder treatment** — Bloom's GLP-1/GIP service line includes screening for eating disorder history (per SOP-003) and pauses or excludes patients with active disordered eating; Bloom does not treat eating disorders themselves

This SOP defines how Bloom responds when an event surfaces that requires care outside of Bloom's scope. Bloom's role is to recognize the event, escalate to appropriate emergency or mental health services, document the event, and (when clinically appropriate) pause Bloom's metabolic care until the patient is stabilized through their external provider relationships.

The corollary out-of-scope items below clarify the boundary further:

- **Bloom does not initiate involuntary holds (5150)** — initiation is performed by county-designated personnel or peace officers in California per Cal. Welf. & Inst. Code §5150. Bloom facilitates welfare checks via 911 or non-emergency line; the responding personnel determine whether 5150 criteria are met.
- **Bloom does not transport patients** — neither to emergency departments nor to mental health facilities. Patients are advised to call 911, go to the nearest ED, or contact their external mental health provider.
- **Bloom does not provide 24/7 crisis line services** — for after-hours crisis events, patients are directed to 988, Crisis Text Line, 911, or county crisis services per Attachment A.
- **Bloom does not perform Tarasoff warnings on behalf of Covering Physicians who are not engaged with the patient under the Covering Physician relationship** — Tarasoff is a personal duty of the treating clinician. The MSO Owner does not warn intended victims.
- **Bloom does not deliver mandated reports on behalf of mandated reporters** — Cal. Penal Code §11166 mandated reporter obligations are personal to the licensed clinician (Covering Physician or RN). The MSO can provide submission logistics support; the report's content and submission decision remain the reporter's responsibility.

---

## 3. Definitions

**Medical Emergency**
Any acute medical event presenting risk of death, serious injury, irreversible loss of function, or significant disability if not addressed within minutes to hours by appropriate medical care. In Bloom's telehealth context, a medical emergency includes events the Covering Physician determines meet criteria for Tier 3 or Tier 4 of the medical severity framework (§5.2), as well as any event in which a reasonable lay observer would call 911. Medical emergencies fall outside Bloom's scope; Bloom's role is recognition, escalation, and documentation.

**Mental Health Crisis**
An acute change in mental, emotional, or behavioral state that creates risk of harm to the patient or others, severe psychiatric symptoms with significant functional impairment, or a presentation requiring immediate mental health intervention beyond what routine outpatient care addresses. Includes suicidal ideation (active, with intent, plan, or means), homicidal ideation, acute psychosis, severe substance intoxication during interaction, gravely-disabled presentations, and acute decompensation in patients with previously stable conditions. Mental health crises fall outside Bloom's scope; Bloom's role is recognition, escalation, documentation, and management of the impact on Bloom's metabolic care plan.

**Escalation**
The act of recognizing that an event has exceeded Bloom's defined scope and routing the patient to the appropriate external resource. Escalation may be to emergency services (911), a mental health crisis line (988, Crisis Text Line), a county crisis service, a hospital emergency department, the patient's external mental health provider, the patient's primary care provider, or a designated 5150 facility (via welfare check). Escalation is not a referral in the routine sense; it is an acute handoff with appropriate warm-handoff language per §5.1.

**Stabilization**
A clinical state in which the immediate risk of harm has resolved and the patient is engaged in appropriate ongoing care for the underlying condition that precipitated the crisis. Stabilization is not the same as "no longer in crisis"; it requires confirmation of linkage to ongoing external care. The specific stabilization confirmation criteria for purposes of re-entry to Bloom care are defined in §5.6 and remain `[CLINICAL — PENDING COVERING PHYSICIAN]` for clinical content.

**Pause Status**
The administrative status in which a Bloom patient's metabolic care has been suspended following an MH Tier 3 or MH Tier 4 event (and selected Medical Tier 3 and Tier 4 events per Covering Physician determination). During pause status, no new prescriptions are written, no refills are issued, no synchronous visits occur (except re-entry visits per §5.11), no laboratory orders are placed, and no asynchronous clinical messaging occurs except as needed to manage the pause itself. The scope and mechanics of pause status are defined in §5.6.

**Re-Entry**
The process by which a patient previously placed on pause status returns to active Bloom care. Re-entry requires Covering Physician confirmation of stabilization, a re-entry sync visit, and updated clinical context including any new medications, providers, or treatment plans the patient has established during the pause. The re-entry pathway is defined in §5.11.

**Mandated Reporter**
A licensed clinician or other professional who is required by California statute to report specified categories of suspected abuse, neglect, or injury. Bloom's mandated reporters include the Covering Physician (Cal. Penal Code §11165.7 for child abuse and neglect; Cal. Welf. & Inst. Code §15630 for elder/dependent adult abuse; Cal. Penal Code §11160 for injuries from assaultive conduct) and the MSO Owner RN (same statutes apply to registered nurses). Mandated reporting obligations are personal to the licensed clinician and are not delegable to operational staff.

**Tarasoff Duty**
The legal duty established under *Tarasoff v. Regents of the University of California* (1976) and codified in California at Cal. Civ. Code §43.92, requiring a psychotherapist (as defined in Cal. Evid. Code §1010, which includes physicians providing mental health services) to use reasonable care to protect a reasonably identifiable victim when the patient communicates a serious threat of physical violence against that victim. The duty is discharged by reasonable efforts to (a) warn the intended victim or victims and (b) notify a law enforcement agency. The applicability of Tarasoff to Bloom's metabolic-care model is addressed in §5.7.1 and remains `[PENDING COUNSEL VALIDATION]` for the MSO/PC structural specifics.

**5150 Hold**
California's involuntary 72-hour psychiatric hold under Cal. Welf. & Inst. Code §5150, triggered when a person is a danger to self, danger to others, or gravely disabled due to a mental disorder. 5150 holds are initiated only by county-designated personnel or peace officers; Bloom does not initiate 5150 holds. Bloom facilitates welfare checks via 911 or non-emergency law-enforcement lines when a patient meets criteria; the responding personnel make the 5150 determination. Documentation of welfare-check request and outcome is required per §5.7.2.

**Welfare Check**
A request to law enforcement to conduct an in-person check on a person who may be in crisis or imminent danger. Welfare checks may result in 5150 evaluation, transport to a designated facility, voluntary transport to an emergency department, no action (if the person declines and does not meet involuntary criteria), or other outcomes. Bloom requests welfare checks via 911 (for active emergencies) or the non-emergency line (for non-emergency situations where in-person check is needed). Documentation of every welfare-check request is required.

**Crisis Resource**
An external resource available to a person in crisis. Standing crisis resources used by Bloom include: 988 Suicide & Crisis Lifeline (call or text 988, national, 24/7), Crisis Text Line (text HOME to 741741, national, 24/7), 911 (medical emergency and active danger), SAMHSA National Helpline (1-800-662-4357, substance use), National Domestic Violence Hotline (1-800-799-7233), Veterans Crisis Line (988 then press 1), and California-specific county crisis lines (Attachment A). Bloom maintains these resources on the standing Crisis Resource Card (Attachment A) for distribution at intake and during interactions.

**Warm Handoff**
A handoff to external care in which the originating provider stays engaged until the receiving party has acknowledged receipt and the patient is in active connection with the receiving party. Examples: staying on a sync video call while emergency services are dispatched and arriving; remaining on a three-way call between patient, Bloom, and the patient's mental health provider until the mental health provider has assumed the conversation; following up with the patient within 24 hours after a referral to confirm the connection was made. Bloom's standard for crisis escalation is a warm handoff; cold referrals to "go call 988" without further engagement are insufficient for any Tier 3 or Tier 4 event.

**Imminent Danger**
A clinical assessment that harm to the patient or another identified person is likely within minutes to hours absent intervention. Imminent danger criteria are `[CLINICAL — PENDING COVERING PHYSICIAN]` for the specific clinical thresholds in §5.3 (MH Tier 4); operationally, imminent danger triggers the §5.3 MH Tier 4 response (911, welfare check, Tarasoff assessment if applicable, pause status).

**Gravely Disabled**
A condition in which a person is unable, as a result of a mental disorder, to provide for their basic personal needs for food, clothing, or shelter (Cal. Welf. & Inst. Code §5008(h)(1)(A)). Gravely-disabled status is one of three grounds for 5150 evaluation; the determination is made by county-designated personnel, not by Bloom. Bloom recognizes and escalates; it does not determine gravely-disabled status.

**Pre-Enrollment**
The period during which a prospective patient has interacted with Bloom (waitlist signup, intake form, eligibility screening) but has not been enrolled in active Bloom clinical care under SOP-002. Pre-enrollment interactions are not within a clinical relationship and do not create treatment obligations; safety and ethical obligations regarding crisis content disclosed during pre-enrollment apply nonetheless and are addressed in §5.5.

**Operational Incident Log**
A separate log maintained by the MSO Owner for incidents that do not meet [SOP-008 (Adverse Event & Incident Reporting)](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) thresholds but warrant tracking for pattern detection and operational quality improvement. Pre-enrollment crisis disclosures, where no clinical relationship has been established and SOP-008 therefore does not apply, are logged here per §6.

---

## 4. Roles & Responsibilities

| Role | Primary Responsibilities Under This SOP |
| --- | --- |
| **Covering Physician (Dr. Michael Napolitano, MD) — Document Owner & Approving Authority** | Performs clinical severity tier determination for all medical and mental health events processed under this SOP. Makes Tarasoff applicability determinations and discharges Tarasoff duty when triggered. Makes 5150 welfare-check referral decisions for patients meeting clinical criteria. Approves or modifies pause status for patients post-escalation. Confirms stabilization criteria are met for re-entry. Conducts re-entry sync visits and re-entry treatment-plan adjustments. Determines prescription handling during active crisis and pause status (§5.10). Files mandated reports under Cal. Penal Code §11164 et seq., Cal. Welf. & Inst. Code §15630, and Cal. Penal Code §11160 where applicable. Conducts or directs quality-improvement review of crisis events on the same quarterly cycle as SOP-008 trending. Populates all `[CLINICAL — PENDING COVERING PHYSICIAN]` markers in this SOP. Signs and approves this SOP as the clinical authority per SOP-001 §2.3. |
| **MSO Owner (Brian DeGuzman, RN)** | Manages operational scaffolding: incident intake routing, OptiMantra documentation infrastructure for crisis events, maintenance of the standing Crisis Resource Card (Attachment A), maintenance of the operational incident log for pre-enrollment events, after-hours coverage coordination (currently MSO Owner direct; future stated may include after-hours service). Coordinates mandated-report submission logistics — including provision of access to the relevant hotlines and online portals — while the report content and submission decision remain the licensed reporter's responsibility. Communicates pause-status notifications to patients using Covering-Physician-approved templates. Conducts the operational portion of quarterly trending review with the Covering Physician. Populates all `[OPERATIONAL — PENDING MSO OWNER]` markers in this SOP. As an RN, the MSO Owner is also a mandated reporter under the applicable California statutes and bears personal mandated-reporting obligations when triggered. The MSO Owner does NOT assess clinical severity of any event, does NOT make Tarasoff or 5150 referral decisions independently of the Covering Physician (operationally — see §5.7 for the rare circumstance where time precludes consultation), does NOT determine pause status independently, does NOT confirm stabilization, and does NOT make prescription decisions. |
| **Backup Provider (engaged via Doctors for Providers retainer; clinical credentialing governed by the future Provider Credentialing, Insurance & Coverage SOP)** | Assumes Covering Physician responsibilities under this SOP during the Covering Physician's unavailability, on a per-consult or limited-coverage basis. Backup provider engagement for crisis-event handling is `[OPERATIONAL — PENDING MSO OWNER]` (whether backup coverage extends to after-hours crisis response or only to in-business-hours backstop). Backup provider clinical credentialing requirements (DEA registration, California license, malpractice coverage, mandated-reporter training) are governed by the future Provider Credentialing SOP. |
| **MSO Intake / Operations Personnel** | Currently performed by the MSO Owner; future-stated as a separate role. Performs first-contact recognition for crisis indicators in intake forms, async messages, scheduled-event notifications, and other operational interactions. Routes crisis indicators to the Covering Physician (in-business-hours) or to after-hours coverage per the coverage matrix `[OPERATIONAL — PENDING MSO OWNER]`. Does NOT perform clinical severity assessment, does NOT determine Tier classification, does NOT make escalation decisions independently. Operational triage only — identify, log, route. |
| **Patient** | Provides accurate emergency contact information at enrollment under SOP-002. Provides accurate physical location at the start of every synchronous video visit per SOP-005 (this is a prerequisite for §5.4 telehealth-crisis protocols). Engages with crisis resources provided by Bloom when in crisis; engages with external mental health, primary care, or emergency providers as appropriate. Notifies Bloom of any inpatient hospitalization, mental health admission, suicide attempt, or other Tier 3/4 event Bloom would otherwise not learn of, to the extent the patient is willing and able. Cooperates with stabilization confirmation and re-entry requirements when seeking to return to Bloom care post-pause. |
| **Patient's External Mental Health Provider (where applicable)** | Receives Bloom-initiated communications regarding the patient's crisis or pause status when the patient consents to such communication. May provide the stabilization attestation that informs §5.6 stabilization confirmation per the Covering Physician's clinical judgment. Bloom does not direct the external provider's care; this is an informational and coordination relationship only. |

---

## 5. Procedure

### 5.1 General Principles

**Scope-of-practice limits.** Bloom's clinical scope is metabolic and endocrine care (TRT, GLP-1/GIP, sexual health, longevity, peptide therapy when LegitScript-cleared). Crisis events that exceed this scope are recognized, escalated to appropriate external resources, and documented. The pause-and-stabilize protocol (§5.6) governs the impact on Bloom's metabolic care. Personnel processing events under this SOP do not provide care outside Bloom's scope under any circumstance, including circumstances where the patient explicitly requests it or where the patient's access to alternative care is constrained.

**California legal obligations overview.** Three California-specific legal frameworks routinely intersect with crisis events processed under this SOP:

1. **Tarasoff duty** (Cal. Civ. Code §43.92) — applicable to psychotherapists, which includes physicians providing mental health services. Tarasoff applicability to Bloom's metabolic-care model is addressed in §5.7.1; the working presumption is that Tarasoff *may* apply when the Covering Physician's interaction with the patient touches on mental health content even though Bloom is not a mental health practice. `[PENDING COUNSEL VALIDATION]`
2. **5150 involuntary hold interface** (Cal. Welf. & Inst. Code §5150) — Bloom does not initiate 5150 holds. Bloom facilitates welfare checks (§5.7.2) that may result in 5150 evaluation by responding personnel.
3. **Mandated reporting** (Cal. Penal Code §11164 et seq., Cal. Welf. & Inst. Code §15630, Cal. Penal Code §11160) — applicable to physicians and registered nurses. Reporting obligations are personal to the licensed clinician (§5.7.3).

Detailed procedures for each framework are in §5.7.

**Recognition triggers.** A crisis event may be recognized in any of the following ways:

- Patient self-disclosure during a synchronous video visit (intake screening, sync visit, lab review visit, re-entry visit, etc.)
- Patient self-disclosure in an asynchronous message (secure portal message, email, telephonic message left after hours)
- Patient self-disclosure in an intake form, eligibility screening questionnaire, or other pre-clinical document
- Clinical observation by the Covering Physician during a synchronous visit (changed affect, content of speech indicating ideation, physical signs of intoxication, etc.)
- Indirect indicators in routine clinical data (e.g., a CBC lab result returning critically anomalous values during scheduled monitoring)
- Third-party notification (a family member, friend, or external provider notifies Bloom of a crisis event affecting the patient)
- Crisis discovered during routine quality-improvement chart review (rare; usually after-the-fact)

**Documentation requirements.** Every event processed under this SOP is documented in OptiMantra with the structured fields specified in §6. Where SOP-008 thresholds are met (§5.9), the event cascades into the SOP-008 AE Register. Where SOP-008 thresholds are not met (Medical Tier 1, MH Tier 1, pre-enrollment events), the event is logged in the operational incident log maintained by the MSO Owner. No crisis event is excluded from documentation regardless of outcome.

**Patient communication principles.** Crisis-related patient communication follows four standards:

- **Transparency** — the patient is told what is happening (e.g., "I am calling 911 now"; "We are placing your testosterone refill on hold while we coordinate with your psychiatrist") rather than left to infer
- **Clarity of next steps** — the patient is given specific, actionable next steps (specific phone numbers, specific actions, specific timing for follow-up) rather than vague reassurance
- **No abandonment** — the patient is not left without an active connection to care. The warm-handoff standard applies for any Tier 3 or Tier 4 event.
- **Documented patient communication** — every crisis-related communication with the patient (verbal during sync visit, written in async, telephonic from MSO) is documented in OptiMantra

**The warm-handoff standard.** For any MH Tier 3, MH Tier 4, Medical Tier 3, or Medical Tier 4 event, Bloom maintains active engagement with the patient until the receiving resource (emergency services, mental health provider, family member with patient consent, etc.) has acknowledged the handoff and the patient is in active connection with that resource. "Active connection" means more than a phone number provided; it means a confirmed call placed, a confirmed arrival of emergency services, or a confirmed conversation with the receiving provider. Cold referrals are insufficient.

**No clinical care outside scope.** During a crisis interaction, Bloom personnel may provide warm-handoff support, factual information about Bloom's care (e.g., what medications the patient is currently prescribed), and crisis-resource information. Bloom personnel do not provide psychotherapy, counseling, medication-adjustment guidance for psychiatric medications prescribed elsewhere, or any other clinical service outside Bloom's defined scope.

### 5.2 Medical Emergency Framework

Four-tier severity framework. Tier assignment is the Covering Physician's clinical authority (in real-time during sync visits; retrospectively in chart review for async events). MSO Intake operationally routes by initial urgency until clinical assessment is complete.

#### Medical Tier 1 — Mild

`[CLINICAL — PENDING COVERING PHYSICIAN: Define specific clinical criteria for Medical Tier 1 events. Examples for Covering Physician calibration: mild injection-site erythema or induration without systemic symptoms; transient lightheadedness post-injection that resolves spontaneously; mild GI side effects from GLP-1 that the patient can self-manage with standard guidance; minor headache after a sexual-health prescription that is consistent with the medication's expected side-effect profile.]`

**Response.** Patient-managed with Bloom guidance via secure portal messaging or, if warranted, a scheduled sync visit. No external escalation. Bloom provides routine clinical guidance within scope (e.g., warm compress for injection-site reaction, dietary guidance for GLP-1 GI side effects, dose-timing adjustment within prescribed parameters).

**Documentation.** Routine clinical note in OptiMantra documenting the symptom, the guidance provided, and the planned follow-up. No SOP-008 AE Register entry required unless the event progresses. No operational incident log entry required.

**Disposition.** Patient continues in active care. No pause. No re-entry workflow. If the event progresses (worsening symptoms, new symptoms, treatment failure), reassess for upgrade to Tier 2 or higher.

#### Medical Tier 2 — Moderate

`[CLINICAL — PENDING COVERING PHYSICIAN: Define specific clinical criteria. Examples for calibration: significant injection-site reaction with localized systemic symptoms (low-grade fever, regional lymphadenopathy) but without airway involvement or systemic signs of sepsis; persistent vomiting from GLP-1 unresponsive to standard antiemetic guidance and requiring clinical intervention; suspected hypoglycemia not resolving with oral carbohydrate; allergic reaction with skin and GI symptoms but no airway involvement; new-onset persistent symptom (e.g., palpitations, lower-extremity edema) requiring evaluation beyond routine telehealth scope.]`

**Response.** Synchronous evaluation via expedited sync visit with the Covering Physician (or backup if Covering Physician unavailable), OR direct referral to urgent care or the patient's PCP if telehealth assessment is insufficient. Bloom does not provide urgent in-person care. The decision between sync visit and direct urgent-care referral is `[CLINICAL — PENDING COVERING PHYSICIAN]` per scenario.

**Documentation.** SOP-008 AE event documentation per [SOP-008 §5.3](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) standard handling thresholds. OptiMantra clinical note with cross-reference to SOP-008 AE Register entry.

**Disposition.** Continued active care during evaluation. No automatic pause. If urgent-care referral results in a diagnosis that affects metabolic care eligibility under SOP-003, address per the eligibility framework (continue, modify, or pause).

#### Medical Tier 3 — Severe

`[CLINICAL — PENDING COVERING PHYSICIAN: Define specific clinical criteria. Examples for calibration: anaphylaxis with airway involvement (stridor, throat swelling, wheeze); chest pain with cardiac features (radiation, diaphoresis, exertional component, elevated risk profile); severe hypoglycemia requiring IM glucagon or IV intervention; syncope of unclear etiology in a patient on testosterone or GLP-1 therapy; new neurological symptoms (focal weakness, speech changes, severe headache with characteristics suggesting hemorrhage or thrombosis); priapism with sexual-health prescription exceeding the duration threshold for emergency care.]`

**Response.** Immediate referral to emergency services. The Covering Physician (or sync-visit clinician in the patient's interaction) instructs the patient to call 911 or proceed directly to the nearest ED. If the patient is in a synchronous visit when the event is recognized, the visit clinician stays on the line until emergency services are dispatched and the patient is in active connection (warm handoff). Bloom does not transport patients.

**Documentation.** SOP-008 AE event documentation per [SOP-008 §5.4](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) SAE handling. Mandatory Covering Physician notification within 4 hours per [SOP-008 §5.4](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md). OptiMantra clinical note + AE Register entry + Covering Physician notification documented per SOP-008.

**Disposition.** `[CLINICAL — PENDING COVERING PHYSICIAN: Determine whether Medical Tier 3 events trigger pause status (§5.6). Suggested default: yes, automatic pause pending Covering Physician review of ED outcome and clinical assessment of fitness to continue current metabolic regimen.]`

#### Medical Tier 4 — Life-Threatening / Active Emergency

`[CLINICAL — PENDING COVERING PHYSICIAN: Define specific clinical criteria. Examples for calibration: respiratory failure / inability to breathe adequately; suspected acute myocardial infarction or stroke (active symptoms of either); anaphylactic shock with hemodynamic compromise; severe trauma with active bleeding; patient unresponsive on synchronous visit (and not explained by disconnection); active overdose.]`

**Response.** 911 immediately. If during a synchronous visit, the visit clinician calls 911 (or instructs another personnel member to call on a second line) while remaining on the patient's visit. Patient location, confirmed at the start of every sync visit per [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md), is the location communicated to 911. The visit clinician stays on the line until emergency services arrive on scene or the patient is in active connection with emergency personnel. Where the patient's location was not confirmed (a §5.4 telehealth failure mode), see §5.4 protocols and Attachment D.

**Documentation.** SOP-008 AE event documentation per [SOP-008 §5.5](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) sentinel event handling. Mandatory Covering Physician notification within 2 hours per SOP-008. FDA MedWatch voluntary reporting consideration per [SOP-008 §5.9](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) where the event may be drug-related. Detailed timeline reconstruction including video/audio recording capture from the telehealth platform if available.

**Disposition.** Automatic pause status (§5.6) pending Covering Physician review of outcome and clinical reassessment of fitness for Bloom care. Patient cannot return to active care without Covering Physician approval via the re-entry pathway (§5.11).

### 5.3 Mental Health Crisis Framework

Four-tier severity framework, parallel to §5.2. Tier assignment is the Covering Physician's clinical authority. MSO Intake operationally routes by initial urgency.

#### MH Tier 1 — Mild

`[CLINICAL — PENDING COVERING PHYSICIAN: Define criteria. Examples for calibration: situational distress without psychiatric symptoms (e.g., relationship stressor, job loss, recent bereavement) in a patient who reports adequate coping resources and established outside care if needed; mild anxiety or depressive mood symptoms in a patient with established outside mental health care that is currently effective; sleep disturbance secondary to identifiable life events without other psychiatric symptoms.]`

**Response.** Acknowledge during the interaction in which the disclosure occurs. Document. Provide or reaffirm the Crisis Resource Card (Attachment A). Encourage the patient to connect with their existing PCP or mental health provider if they have one; provide referral resources if they do not. No external escalation beyond resource provisioning. No pause to metabolic care.

**Documentation.** Routine clinical note in OptiMantra including the disclosure, the resources provided, and any patient-affirmed plan to follow up with existing or new providers. No SOP-008 AE Register entry required. No operational incident log entry required for MH Tier 1.

**Disposition.** Patient continues in active care.

#### MH Tier 2 — Moderate

`[CLINICAL — PENDING COVERING PHYSICIAN: Define criteria. Examples for calibration: depressive symptoms without suicidal ideation but with functional impairment (work, relationships, self-care); anxiety with functional impairment; passive suicidal ideation without intent, plan, or means (e.g., "I think the world would be better off without me" without specific plan or method); new psychiatric symptoms in a patient who does not have established mental health care; previously stable patient reporting decompensation. Boundary between MH Tier 1 and MH Tier 2 is typically functional impairment or presence of suicidal ideation in any form.]`

**Response.** Synchronous evaluation via expedited sync visit with the Covering Physician (or backup if Covering Physician unavailable) to assess. Strong referral to mental health provider; if the patient has no established provider, Bloom provides referral resources and confirms within 7 days that the patient has made contact. Provide Crisis Resource Card. Consider voluntary pause to metabolic care pending confirmation of mental health linkage — the decision criteria for voluntary pause at MH Tier 2 are `[CLINICAL — PENDING COVERING PHYSICIAN]` (suggested defaults for calibration: pause if the patient is on GLP-1/GIP therapy and reports new depressive symptoms; pause if testosterone has been recently initiated and is plausibly contributing to mood changes; do not pause if symptoms are clearly unrelated to current metabolic therapy and external care is established).

**Documentation.** SOP-008 AE consideration. Mental health symptoms during metabolic care may qualify as Tier 2 SOP-008 events per [SOP-008 §5.3](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) and §5.9 of this SOP. OptiMantra clinical note + AE Register entry where SOP-008 threshold met.

**Disposition.** Active care continues unless voluntary pause is invoked per `[CLINICAL — PENDING COVERING PHYSICIAN]` criteria above.

#### MH Tier 3 — Severe

`[CLINICAL — PENDING COVERING PHYSICIAN: Define criteria. Examples for calibration: active suicidal ideation with intent OR plan OR means (any one of these elevates from MH Tier 2); severe psychiatric symptoms including acute psychosis, mania with impaired judgment, severe dissociation; acute substance intoxication during a sync visit (alcohol, opioids, stimulants, sedatives) sufficient to impair the patient's ability to engage with care; escalating self-harm behavior reported by patient or third party; homicidal ideation with intent, plan, or means short of imminent — see MH Tier 4 for imminent. Boundary between MH Tier 2 and MH Tier 3 is typically the addition of intent/plan/means to suicidal ideation, or the presence of severe psychiatric symptoms with significant functional risk.]`

**Response.** Mandatory sync visit with the Covering Physician if available; with backup provider otherwise. Direct linkage to crisis resources: 988 active connection (call placed during interaction, warm handoff), Crisis Text Line as alternative if patient prefers text, local county crisis services where applicable. Tarasoff assessment per §5.7.1 if any threat of violence to identifiable third party is disclosed; document outcome (whether duty triggered, action taken). 5150 welfare check consideration per §5.7.2 if patient meets clinical criteria.

**Pause status invoked.** Bloom metabolic care is placed in pause status (§5.6) for any MH Tier 3 event. Patient is notified per §5.6 communication template. Pause continues until Covering Physician confirms stabilization criteria are met per §5.11.

**Documentation.** SOP-008 AE event documentation per [SOP-008 §5.4](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) SAE-equivalent handling — mental health crisis during metabolic treatment is documented at SAE rigor regardless of formal SAE outcome criteria. Mandatory Covering Physician notification within 4 hours. Tarasoff assessment outcome documented (whether duty triggered or not, and the rationale). 5150 welfare-check actions documented if applicable.

**Disposition.** Patient on pause status. Re-entry per §5.11.

#### MH Tier 4 — Active Crisis / Imminent Danger

`[CLINICAL — PENDING COVERING PHYSICIAN: Define criteria. Examples for calibration: active suicide attempt in progress or just-completed (overdose described or witnessed on video, self-injurious behavior witnessed on video); imminent threat of physical violence to identifiable victim where Tarasoff applies; gravely-disabled patient unable to care for self (no shelter, no food, no medication compliance, decompensation visible on video); active psychosis with safety risk (e.g., command hallucinations directing self-harm, paranoid delusions creating risk to self or others); unresponsive on sync visit and overdose or other medical emergency suspected. Boundary between MH Tier 3 and MH Tier 4 is typically imminence — minutes to hours, not days.]`

**Response.** 911 immediately, including for mental health emergencies (911 dispatch coordinates with mental health crisis services where the county has co-response models; in counties without co-response, 911 is still the appropriate first call for imminent danger). Welfare check via 911 (active) or non-emergency line (non-active but in-person check needed) where the patient's situation warrants. Stay on the sync visit line during dispatch. If Tarasoff duty triggered (§5.7.1), execute Tarasoff procedure concurrently with 911 dispatch — both warning the intended victim and notifying law enforcement. Patient placed on pause status (§5.6) immediately.

**Documentation.** SOP-008 AE event documentation per [SOP-008 §5.5](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) sentinel event handling. Mandatory Covering Physician notification within 2 hours. All Tarasoff actions documented in detail (date, time, identity of victim warned and law enforcement agency notified, content of warning, method of notification, follow-up actions). 5150 hold status tracked if patient placed on involuntary hold; documentation includes the 5150 facility, anticipated hold duration, designated personnel signing the 5150, and the disposition at the end of the 72-hour evaluation period. Video/audio capture from telehealth platform retained per SOP-008 documentation standards.

**Disposition.** Patient on pause status. Re-entry per §5.11. Quality improvement review per [SOP-008 §5.12](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) quarterly trending; sentinel event RCA per SOP-008 §5.5 framework.

### 5.4 Telehealth-Specific Failure Modes

This section addresses scenarios specific to telehealth that the general §5.2 and §5.3 frameworks do not adequately address. Attachment D provides scripted response cards for each scenario. The clinical criteria within each scenario remain `[CLINICAL — PENDING COVERING PHYSICIAN]`; the operational protocols remain `[OPERATIONAL — PENDING MSO OWNER]` where the scripts and after-hours coverage matrix need MSO Owner determination.

#### 5.4.1 Sync Visit Drops Mid-Crisis

**Recognition.** Active crisis interaction (any Tier 3 or Tier 4 indicator surfaced during a sync visit) terminates due to network failure, platform failure, patient hangup, patient device failure, or unclear cause.

**Immediate action.** (1) Attempt immediate reconnect via the telehealth platform. (2) Call the patient's phone number on file. (3) If neither succeeds within `[OPERATIONAL — PENDING MSO OWNER: define reconnect attempt window, suggested default 3 minutes]`, escalate to 911 with the patient's last-known location (confirmed at visit start per [SOP-005](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md)) and request a welfare check. The clinician on the visit makes the 911 call.

**Follow-up.** Continue attempts to reach the patient. Document every attempt with timestamp. If contact is re-established, resume the visit and re-assess. If contact is not re-established within `[OPERATIONAL — PENDING MSO OWNER: define total attempt window, suggested default 30 minutes]`, escalate to emergency contact on file (if patient consented at enrollment under SOP-002).

**Documentation.** SOP-008 AE event documentation regardless of outcome — a sync-visit drop during active crisis is itself a documentable incident under [SOP-008 §5.4 or §5.5](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) depending on tier of crisis at the time of disconnection.

#### 5.4.2 Patient Becomes Unresponsive On Video

**Recognition.** During a sync visit, the patient stops responding to verbal prompts, loses postural tone (slumps), or otherwise appears unresponsive. Could indicate: medical emergency (syncope, seizure, overdose, cardiac event), intentional disconnection (patient ended interaction without disconnecting platform), intoxication-related loss of consciousness, or technical issue (audio dropout where the patient is unaware they cannot be heard).

**Immediate action.** (1) Verbal verification — call out to patient via the sync visit. (2) If no response within `[CLINICAL — PENDING COVERING PHYSICIAN: define seconds threshold, suggested default 30 seconds with continued attempts at 15-second intervals]`, treat as a Medical Tier 4 / MH Tier 4 event. (3) Call 911 with last-known location. (4) Remain on the sync visit until emergency services arrive on scene OR the patient regains responsiveness.

**Follow-up.** Same as §5.4.1.

**Documentation.** SOP-008 AE event per §5.5 sentinel event handling.

#### 5.4.3 Patient Discloses Location of Means of Self-Harm

**Recognition.** During an interaction (sync visit or async), patient discloses access to firearms, stockpiled medications, or other specific means of self-harm in combination with suicidal ideation. The presence of identified means elevates the clinical concern significantly.

**Immediate action.** (1) Within the same interaction, ask the patient to remove or secure the means (e.g., "Is there someone who can hold the firearms for you tonight?"; "Can you flush the stockpiled medication while we're talking?"). `[CLINICAL — PENDING COVERING PHYSICIAN: confirm whether this within-visit ask is the appropriate standard or whether a different approach is preferred.]` (2) Connect to 988 with warm handoff during the same interaction. (3) Tarasoff assessment if there is also disclosure of threat to identified third party.

**Follow-up.** Confirm via follow-up message within 24 hours that the means were secured or removed. If unable to confirm, escalate per the §5.4.1 escalation pathway.

**Documentation.** SOP-008 AE event per §5.4 or §5.5 depending on tier. The specific means and the patient's stated plan for securing/removing them are documented.

#### 5.4.4 Patient Is Intoxicated During Visit

**Recognition.** Patient presents on video with signs of acute intoxication: slurred speech, impaired coordination visible on camera, apparent disorientation, behavior or content inconsistent with the patient's known baseline, or self-disclosure of recent substance use sufficient to impair the visit.

**Immediate action.** Per `[CLINICAL — PENDING COVERING PHYSICIAN: suggested default — do not conduct substantive clinical care during intoxicated state. End visit (or do not begin) and reschedule.]` (1) End or do not initiate the substantive clinical portion of the visit. (2) Confirm patient safety (alone? with sober person? in safe location?). (3) If safety concern present, escalate per Medical Tier 3 or MH Tier 3 framework. (4) Provide Crisis Resource Card if substance use is itself the presenting concern; warm-handoff to SAMHSA helpline (1-800-662-4357) if appropriate.

**Follow-up.** Reschedule the substantive visit for a sober date. If pattern of intoxication during visits emerges (`[OPERATIONAL — PENDING MSO OWNER: define threshold for pattern recognition]`), the Covering Physician reviews fitness for continued Bloom care.

**Documentation.** SOP-008 consideration per §5.3 or §5.4 depending on tier. Pattern documentation for quality-improvement review.

#### 5.4.5 Async Message Contains Crisis Content Outside Business Hours

**Recognition.** Patient sends a secure portal message, email, or voicemail outside business hours that contains crisis content (suicidal ideation in any form, active medical emergency description, etc.).

**Immediate action.** `[OPERATIONAL — PENDING MSO OWNER: determine after-hours coverage model. Options: (a) MSO Owner monitors after-hours messages with escalation to Covering Physician; (b) automated triage with auto-response and after-hours service relationship; (c) explicit "messages not monitored after hours" patient communication and 988/911 instruction.]`

The interim default until the coverage model is set: the patient portal auto-response on every message acknowledges receipt and instructs the patient to call 911 if in immediate danger or 988 for mental health crisis. The MSO Owner reviews after-hours messages at the start of the next business day (or earlier if practicable) and routes any crisis content per the §5.3 framework.

**Follow-up.** Once the message is reviewed, contact the patient via the channel they used (or by phone) to confirm current safety status and proceed per the appropriate tier framework.

**Documentation.** SOP-008 event documentation per the applicable tier framework. Operational incident log entry for after-hours coverage performance review.

#### 5.4.6 Patient Refuses 911 Dispatch Despite Tier 3/4 Criteria

**Recognition.** During a sync visit or active engagement, the Covering Physician (or clinician on the visit) determines that Tier 3 or Tier 4 criteria are met and recommends 911 dispatch. Patient refuses.

**Immediate action.** (1) Clarify the patient's refusal — is it informed (capacity intact, refusing despite understanding the risk) or impaired (incapacity, refusing because of the condition for which they need help)? `[CLINICAL — PENDING COVERING PHYSICIAN: criteria for capacity assessment in this context.]` (2) If informed refusal, document and continue warm handoff to less-acute resources (988, mental health provider, primary care) while continuing to advise emergency services. (3) If impaired refusal, escalate to 911 over the patient's objection — 5150 criteria are commonly met when capacity is impaired and danger to self exists. (4) Where the patient is in active medical emergency (Medical Tier 4), the Covering Physician determines whether to call 911 despite refusal — Bloom does not have direct legal authority to dispatch over the patient's objection for medical emergencies, but is also not legally obligated to honor a refusal of emergency care when the patient is actively dying. `[PENDING COUNSEL VALIDATION]`

**Follow-up.** Continue engagement with the patient as long as possible. Document the refusal in detail (time, content, capacity assessment, alternative resources accepted). Quality-improvement review of refusal events to inform future protocol refinement.

**Documentation.** SOP-008 event per applicable tier. Refusal documentation in OptiMantra with the clinical capacity assessment.

#### 5.4.7 Patient Location Unknown

**Recognition.** Location was not confirmed at the start of the sync visit (a SOP-005 protocol violation) and a crisis event surfaces requiring 911 dispatch.

**Immediate action.** (1) Ask the patient their physical location now. (2) If unable to obtain (incoherent, refusing, unable to perceive surroundings), use the address on file from SOP-002 enrollment as the location for 911 dispatch, with a note to the dispatcher that location is unconfirmed and the patient may be elsewhere. (3) Where the patient is on a known device with GPS, request the patient enable location sharing.

**Follow-up.** Quality-improvement review of the SOP-005 location-confirmation step. If location confirmation is being skipped in practice, root-cause analysis per [SOP-008 §5.12](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md).

**Documentation.** SOP-008 event per applicable tier plus a documented violation of SOP-005 location-confirmation requirement.

#### 5.4.8 Patient In a State Other Than California During Crisis

**Recognition.** During the interaction, it becomes apparent the patient is physically located in a state other than California — either because they have moved, are traveling, or never disclosed their actual location.

**Immediate action.** Crisis response priorities supersede licensure concerns during an active life-threatening event. (1) Call 911 for the state the patient is in (911 is universal across U.S.). (2) Coordinate with local emergency services. (3) Provide 988 (national; works from any state) for mental health crisis. (4) Document the out-of-state location.

**Follow-up.** Bloom's California medical license does not authorize care of patients located outside California; out-of-state crisis events surface significant licensure-relevant concerns that the Covering Physician addresses in consultation with healthcare counsel. `[PENDING COUNSEL VALIDATION: out-of-state crisis event handling, including documentation, mandated reporting in the patient's actual state, Tarasoff applicability under the patient's actual state's laws, and disposition of the ongoing Bloom care relationship.]`

**Documentation.** SOP-008 event per applicable tier. Pause status invoked while licensure question is resolved; re-entry per §5.11 will require establishing whether Bloom can continue to care for the patient at all.

### 5.5 Pre-Enrollment Crisis Handling

Patients who interact with Bloom prior to enrollment (waitlist signups, intake forms, eligibility screening questionnaires) are not in a clinical relationship with Bloom. Bloom does not have treatment obligations toward pre-enrollment contacts. However, safety and ethical obligations regarding crisis content disclosed during pre-enrollment do apply, and California law regarding mandated reporting may apply to a licensed clinician who learns of reportable information regardless of whether a treatment relationship exists.

#### 5.5.1 Recognition

Pre-enrollment crisis content may surface in:

- Waitlist signup free-text fields (questions like "Why are you interested in Bloom?" or "Anything else we should know?")
- Intake form responses (depression screening items, anxiety screening items, substance use questions, suicidality screening items, etc.) per [SOP-002 §[applicable section]](../SOP-002-patient-intake-operations/SOP-002-patient-intake-operations.md)
- Eligibility screening questionnaire responses per [SOP-003](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md)
- Pre-enrollment communications with MSO Operations Personnel via portal message or email

#### 5.5.2 Recognition Criteria

`[CLINICAL — PENDING COVERING PHYSICIAN: Define specific criteria for pre-enrollment crisis content that triggers this section. Suggested elements for calibration: any disclosure of suicidal ideation (active or passive); any disclosure of homicidal ideation; any disclosure of recent inpatient psychiatric hospitalization (e.g., within prior 30 or 90 days); any disclosure of active substance use sufficient to constitute a safety concern; any disclosure of active eating disorder; any disclosure of recent (within 24-72 hours) overdose or other Tier 4-equivalent event.]`

Recognition is performed by:

- MSO Operations Personnel during routine intake review (operational recognition only — flag for clinical review)
- Covering Physician during eligibility screening review per SOP-003
- Automated intake form processing where structured screening items can be flagged programmatically `[OPERATIONAL — PENDING MSO OWNER: determine whether automated flagging is implemented and what the routing flow is]`

#### 5.5.3 Response

Bloom's response to pre-enrollment crisis content is a **warm handoff to appropriate crisis resources, not clinical engagement**. Specifically:

1. **Acknowledge receipt of the disclosure.** Contact the prospective patient (via the channel they used, or by phone if a phone number is on file) to acknowledge the disclosure was received and to provide crisis resources.

2. **Provide Crisis Resource Card.** Send Attachment A by the appropriate channel (email, portal message).

3. **Recommend immediate engagement with crisis resources or appropriate care.** Specifically, recommend 988 for mental health crisis, 911 for imminent danger or medical emergency, the patient's existing PCP or mental health provider where applicable, or referral resources for new mental health care.

4. **Document the response.** Operational incident log entry (this is NOT a SOP-008 AE event — no clinical relationship has been established).

5. **Place enrollment on hold.** The prospective patient is placed on a "stabilization required prior to enrollment" hold (§5.5.4).

6. **No clinical engagement.** Bloom does not provide clinical advice during pre-enrollment crisis response. Bloom does not recommend specific medications, does not assess severity in a clinical sense, does not initiate any Bloom service line in response to the disclosure.

#### 5.5.4 Enrollment Hold and Re-Entry to Enrollment

Prospective patients with pre-enrollment crisis disclosure are placed on enrollment hold. The patient is told that enrollment can proceed once they have engaged with appropriate care and are stable. Specific re-engagement criteria are `[CLINICAL — PENDING COVERING PHYSICIAN: define what evidence of stabilization is required at pre-enrollment phase. Suggested elements: written attestation from the patient's mental health provider or PCP; passage of a specified period without recurrence; patient self-report that they have engaged with care and are no longer in crisis.]`

The re-engagement pathway parallels §5.11 (re-entry from pause status) but applies to enrollment status rather than active-care status:

1. Prospective patient initiates re-engagement (contacts Bloom indicating they are ready to proceed with enrollment)
2. Covering Physician reviews stabilization evidence per the criteria above
3. If criteria are met, enrollment proceeds per SOP-002 with documentation of the pre-enrollment disclosure history retained in the new chart
4. If criteria are not met, the hold continues with clear communication to the prospective patient of what is needed

#### 5.5.5 Mandated Reporting at Pre-Enrollment

Mandated reporting obligations may apply to pre-enrollment disclosures regardless of clinical relationship. The Covering Physician or MSO Owner RN, upon learning of reportable information during pre-enrollment review (child abuse/neglect, elder/dependent adult abuse, certain injuries from assaultive conduct), fulfills personal mandated reporter obligations per §5.7.3 regardless of whether the prospective patient is enrolled. `[PENDING COUNSEL VALIDATION: confirm pre-enrollment mandated reporter scope.]`

### 5.6 Pause-and-Stabilize Protocol (Post-Escalation Patient Status)

When an MH Tier 3, MH Tier 4, Medical Tier 4 (and selected Medical Tier 3 events per Covering Physician determination) is documented, the patient is placed in pause status. This section defines the mechanics.

#### 5.6.1 Scope of Pause

`[OPERATIONAL — PENDING MSO OWNER: Specify scope of pause precisely. Suggested defaults for calibration:`
- `No new prescriptions written during pause`
- `No refills authorized during pause`
- `Existing prescriptions allowed to run out (not actively terminated, but not extended)`
- `No synchronous visits during pause except the re-entry visit per §5.11`
- `No laboratory orders during pause`
- `No asynchronous clinical messaging except as needed to manage the pause itself`
- `Patient retains portal access for viewing records and historical messages`
- `Open questions: are pre-scheduled sync visits canceled or kept (rescheduled past pause)? are open lab orders canceled? what happens to in-flight pharmacy orders?]`

The default is conservative: when in doubt, the service is paused. The Covering Physician may override on a per-element basis with documented clinical rationale (e.g., "Continue testosterone refill during pause because abrupt cessation may worsen depressive symptoms; clinical rationale documented" or "Continue lab order because the lab itself is informative for the crisis assessment").

#### 5.6.2 Authorization of Pause

- For MH Tier 3 and MH Tier 4 events: pause is automatic upon Covering Physician tier determination
- For Medical Tier 4 events: pause is automatic upon Covering Physician tier determination
- For Medical Tier 3 events: pause at Covering Physician discretion `[CLINICAL — PENDING COVERING PHYSICIAN: default position]`

The MSO Owner does not independently place a patient on pause; the MSO Owner implements the pause once the Covering Physician has determined the tier.

#### 5.6.3 Communication to Patient

Pause-status notification template `[OPERATIONAL — PENDING MSO OWNER: develop template. Required elements: (1) clinical rationale for pause in plain language; (2) specific scope of what is paused; (3) what the patient should do (engage with crisis resources, connect with mental health provider, etc.); (4) who to contact at Bloom and how; (5) re-entry pathway summary; (6) explicit statement that this is not termination of the patient-provider relationship and that re-entry is the expected pathway; (7) patient's right to terminate the relationship if they wish (not the same as pause, but the option exists).]`

Delivery channel: portal message AND email (if patient has email on file) AND telephonic confirmation if the pause was invoked during a synchronous interaction.

Timing: pause notification within 24 hours of Covering Physician tier determination; immediately during a sync visit if the visit is the triggering event.

#### 5.6.4 Stabilization Confirmation Criteria

`[CLINICAL — PENDING COVERING PHYSICIAN: Define what counts as "stabilized for Bloom care re-entry." Suggested elements for calibration:`
- `Linkage to mental health provider confirmed (written attestation from provider, or patient self-report with sufficient corroboration)`
- `No active suicidal ideation per patient self-report AND per mental health provider attestation`
- `Medication regimen for psychiatric care stable for X weeks (suggested: 4-12 weeks depending on severity of original event)`
- `No inpatient hospitalization in past Y weeks (suggested: 4-8 weeks depending on severity)`
- `Patient willing to engage in heightened monitoring per §5.11`
- `For substance-use-related events: documented engagement with substance-use treatment if active substance use disorder was the precipitating factor`
- `Open question: is mental health provider attestation always required, or may patient self-report suffice in lower-severity Tier 3 events?]`

The Covering Physician applies these criteria as clinical judgment, not as a checklist that must be mechanically satisfied.

#### 5.6.5 Pause Duration

Pause continues until the Covering Physician confirms stabilization criteria are met. No fixed maximum duration. The Covering Physician reviews pause status at intervals `[CLINICAL — PENDING COVERING PHYSICIAN: define review cadence, suggested defaults: at 30 days, 60 days, 90 days, and quarterly thereafter]` to determine whether the patient remains on pause appropriately or whether termination of the Bloom relationship is more appropriate (e.g., patient unreachable, patient declining to engage in stabilization).

### 5.7 California-Specific Legal Obligations

Three subsections covering the three California legal frameworks that routinely intersect with crisis events under this SOP.

#### 5.7.1 Tarasoff Duty (Cal. Civ. Code §43.92)

**The legal framework.** Under California law (Tarasoff v. Regents of the University of California, 1976; codified at Cal. Civ. Code §43.92), a psychotherapist has a duty to use reasonable care to protect a reasonably identifiable victim when the patient communicates a serious threat of physical violence against that victim. The duty is discharged by reasonable efforts to (a) warn the intended victim or victims AND (b) notify a law enforcement agency. Cal. Civ. Code §43.92 also provides immunity from liability to the psychotherapist who fulfills the duty as specified.

**"Psychotherapist" definition.** Cal. Evid. Code §1010 defines psychotherapist broadly. The definition includes physicians "to the extent that the physician examines, treats, or otherwise advises any person concerning a mental or emotional condition." This means a physician who is not nominally practicing psychotherapy may still be a psychotherapist for Tarasoff purposes if the physician's interaction with the patient touches on mental health content.

**Applicability to Bloom's metabolic-care model.** Bloom is not a mental health practice. Bloom's Covering Physician treats patients for metabolic conditions. However, when a Bloom patient discloses a threat of violence during a Bloom interaction — particularly during a mental-health-relevant component such as a depression-screening item, a Tier 2+ mental health assessment, or a §5.5 crisis recognition — the interaction may be construed to fall within Cal. Evid. Code §1010's "treats or otherwise advises any person concerning a mental or emotional condition" scope, triggering Tarasoff duty for the Covering Physician.

`[CLINICAL — PENDING COVERING PHYSICIAN: Confirm Tarasoff applicability to Bloom's practice model. This should be evaluated in consultation with healthcare counsel. The friendly-PC structure may affect duty allocation between the PC physician personally and the broader practice; the question is whether the duty rests on the Covering Physician personally as the practitioner who heard the threat, or whether other structural considerations apply.]`

`[PENDING COUNSEL VALIDATION: Cal. Civ. Code §43.92 applicability to Bloom's MSO-PC structure; whether duty falls on Covering Physician personally as the practitioner who heard the threat; documentation standards for fulfillment of the duty; immunity scope under §43.92(b); interaction with HIPAA permitted disclosures under 45 CFR 164.512(j) for threats of harm.]`

**Tarasoff procedure outline (working draft pending counsel and Covering Physician validation).**

1. **Recognize potential threat.** During an interaction, the patient communicates content suggesting threat to identifiable third party. The threshold is "serious threat of physical violence" — clinical judgment is required to determine whether a statement crosses the threshold or is venting/distress speech.

2. **Assess seriousness.** `[CLINICAL — PENDING COVERING PHYSICIAN: criteria for assessing seriousness — specificity of plan, expressed intent, history of violence, current means access, etc.]`

3. **Identify the intended victim.** "Reasonably identifiable" — by name, by relationship to patient, by other identifying characteristics sufficient to locate the person.

4. **Discharge the duty.** Reasonable efforts to BOTH:
   - **Warn the intended victim or victims.** Means of warning: telephone call to victim if number known/findable; through law enforcement; through the victim's known contacts. Communicate the substance of the threat (without exposing PHI beyond what is necessary to convey the warning) and the patient's identity to the extent legally required to make the warning meaningful.
   - **Notify a law enforcement agency.** The local police department or sheriff's office with jurisdiction over the victim's location. Provide identity of the patient, identity of the intended victim, content of the threat, and any other information requested by law enforcement.

5. **Document.** Detailed documentation in OptiMantra: date and time of recognition, basis for assessing seriousness, identity of victim, contents of warning, identity of law enforcement notified, contents of notification, follow-up actions. Tarasoff documentation is essential both for legal protection under §43.92(b) immunity provisions and for SOP-008 AE Register completeness.

6. **HIPAA coordination.** Disclosures made to fulfill Tarasoff duty are permitted under 45 CFR 164.512(j) (uses and disclosures to avert a serious threat to health or safety). Disclosure scope is limited to what is necessary to avert the threat.

7. **Report under SOP-008.** Tarasoff-triggering events are SOP-008 sentinel events per [SOP-008 §5.5](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md).

**Who executes Tarasoff.** Tarasoff is a personal duty of the treating clinician — in Bloom's case, the Covering Physician who heard the threat. The MSO Owner does not warn intended victims on the Covering Physician's behalf. The MSO Owner may provide logistical support (locating contact information, preparing documentation) but the warning and notification are the Covering Physician's actions.

#### 5.7.2 5150 Hold Interface (Cal. Welf. & Inst. Code §5150)

**The legal framework.** Cal. Welf. & Inst. Code §5150 authorizes a peace officer, a member of an attending staff of an evaluation facility designated by the county, a designated member of a mobile crisis team, or other professional person designated by the county to take a person who, as a result of a mental disorder, is a danger to self, a danger to others, or gravely disabled, into custody for a 72-hour evaluation and treatment in a designated facility.

**Bloom's role.** Bloom **does not** initiate 5150 holds. Bloom is not a designated facility. The Covering Physician, as a California physician practicing telehealth, is not categorically authorized to initiate a 5150 — the authorization to initiate depends on county designation and other county-specific requirements. `[PENDING COUNSEL VALIDATION: confirm Covering Physician 5150 initiation status across California counties; whether Covering Physician should hold any specific designation to enable participation in 5150 process.]`

**Bloom's actual role: welfare check facilitation.** When a Bloom patient meets clinical criteria suggesting 5150 evaluation is appropriate (danger to self due to mental disorder, danger to others due to mental disorder, or gravely disabled due to mental disorder), Bloom requests a welfare check.

**Welfare check request procedure.**

1. **Determine urgency.** Active imminent danger → 911. Non-imminent but in-person check needed → non-emergency line for the patient's local law enforcement.

2. **Make the call.** During the interaction in which the need is recognized. The Covering Physician (or sync-visit clinician) calls; the MSO Owner may make the call only if the Covering Physician directs and is unavailable to call personally `[CLINICAL — PENDING COVERING PHYSICIAN: confirm whether MSO Owner may make the welfare-check call under Covering Physician direction or whether the Covering Physician must call personally]`.

3. **Provide information.** Patient identity, patient location (confirmed location from sync visit, or address on file from SOP-002 with note about confirmation status), nature of concern (e.g., "active suicidal ideation with plan and identified means"), the clinical relationship ("this is the patient's metabolic-care telehealth provider"), Bloom contact for follow-up.

4. **Document the call.** Date/time, agency contacted, person spoken with, contents of the request, response from the agency.

5. **Track outcome.** Bloom does not make the 5150 determination — the responding personnel do. Bloom tracks the outcome (5150 placed; voluntary transport; declined; no response; etc.) for completeness of the documentation cascade.

6. **Crisis-services provider relationship.** `[OPERATIONAL — PENDING MSO OWNER: Decide whether Bloom maintains a relationship with a specific California crisis services provider (e.g., ProtoCall, a county mobile crisis team partnership) as an overflow or specialized escalation route, or whether 911/non-emergency line is the default escalation route for every event. The interim default is 911 / non-emergency line.]`

#### 5.7.3 Mandated Reporter Obligations

**The legal framework.** California's mandated reporter framework spans multiple statutes covering different vulnerable populations and circumstances:

- **Child Abuse and Neglect Reporting Act (CANRA)**, Cal. Penal Code §11164 et seq. — mandated reporters listed at Cal. Penal Code §11165.7 include licensed physicians, registered nurses, and other clinicians. Required to report reasonable suspicion of child abuse or neglect to the appropriate agency (county child welfare or law enforcement). Initial report by telephone immediately or as soon as practicably possible; written report on the standardized SCAR (Suspected Child Abuse Report) form within 36 hours of telephonic report.

- **Elder and Dependent Adult Abuse Reporting**, Cal. Welf. & Inst. Code §15630 — mandated reporters include physicians and registered nurses among many other professions. Required to report known or suspected abuse of elders (65+) or dependent adults to the appropriate agency (Adult Protective Services or law enforcement, or long-term-care ombudsman if institution-based). Telephone report immediately or as soon as practicably possible; written report within two working days.

- **Injuries from Assaultive Conduct (Domestic Violence)**, Cal. Penal Code §11160 — applies to physicians and other healthcare workers who provide medical services for a physical condition that they know or reasonably suspect was caused by assaultive or abusive conduct. Required to report to law enforcement. Telephonic report immediately followed by written report within two working days.

**Bloom's mandated reporters.** The Covering Physician (Dr. Michael Napolitano, MD) is a mandated reporter under all three frameworks. The MSO Owner (Brian DeGuzman, RN) is also a mandated reporter under all three frameworks as a registered nurse. Each is personally obligated under the statutes — the obligation is not delegable to operational staff who are not themselves mandated reporters under California law.

**Likelihood of relevance to Bloom's adult patient population.** All Bloom patients are ≥18 (children excluded from intake under SOP-002 / SOP-003), so child abuse reporting is unlikely to arise from direct care of a patient. However, a patient may disclose information about a child during care (e.g., a patient discloses they witnessed a child's abuse, or a patient is themselves a child's caregiver and discloses information suggesting abuse). The mandated-reporting duty applies regardless of whether the affected party (the child) is the Bloom patient. Similarly, an adult patient may meet the elder/dependent adult definition (65+ or dependent adult); the mandated-reporting duty applies. Patients may also present with injuries suggestive of assaultive conduct as part of clinical care; the mandated-reporting duty applies.

**Reporting procedure.**

1. **Recognize.** During an interaction, the clinician recognizes content that may meet a mandated-reporting threshold.

2. **Determine threshold.** `[CLINICAL — PENDING COVERING PHYSICIAN: criteria for "reasonable suspicion" under each statute. The threshold is intentionally low — reasonable suspicion, not proof — but distinguishing reportable disclosures from non-reportable ones requires clinical judgment.]`

3. **Make the report.** Initial telephonic report immediately or as soon as practicably possible to the appropriate agency. Written report within the statutory window (36 hours for CANRA; two working days for elder abuse and DV/injury reporting).

4. **The reporter must be the licensed clinician.** Reporting is a personal obligation. The MSO Owner does not file the Covering Physician's report; the Covering Physician does not file the MSO Owner's report. Each reports independently when triggered.

5. **Operational support from MSO Owner.** The MSO Owner maintains the list of relevant reporting hotlines and submission portals (per the operational item below) and assists with the logistics (clinician access to the portals, time during the day to make calls, etc.) without taking over the reporting content or submission decision.

6. **Document the report.** Date and time of telephonic report, agency contacted, person spoken with, identity of victim and reporter, content of report, written report submission confirmation, follow-up actions.

7. **HIPAA coordination.** Mandated reporting disclosures are permitted under 45 CFR 164.512(b) (uses and disclosures for public health activities) and 45 CFR 164.512(c) (disclosures about victims of abuse, neglect, or domestic violence).

`[OPERATIONAL — PENDING MSO OWNER: Document the specific reporting hotlines and submission portals for each mandated-reporting category. Required: county-by-county child welfare hotlines (or California Child Welfare Services hotline as default if county-specific not maintained); county-by-county Adult Protective Services hotlines (or California APS resource); law enforcement contact information for the patient's known county; the standardized SCAR form (DOJ-issued); the standardized elder abuse and DV/injury reporting forms (DOJ-issued or county-issued); access to the California Department of Justice Mandated Reporter Online Training as a refresher resource.]`

### 5.8 Crisis Resource List and Access

Reference Attachment A for the full Crisis Resource Card distributed to patients. In-body summary of standing resources:

| Resource | Contact | Availability | Use Case |
| --- | --- | --- | --- |
| 988 Suicide & Crisis Lifeline | Call or text 988 | 24/7 national | Mental health crisis (primary first-line resource) |
| Crisis Text Line | Text HOME to 741741 | 24/7 national | Mental health crisis (text alternative for patients who cannot safely call) |
| 911 | 911 | 24/7 national | Active medical emergency or imminent danger to self or others |
| California Peer-Run Warm Line | `[OPERATIONAL — PENDING MSO OWNER: verify current California Peer-Run Warm Line number; past number was 855-845-7415]` | Peer-run, hours TBD | Non-crisis mental health support |
| SAMHSA National Helpline | 1-800-662-4357 | 24/7 national | Substance abuse and addiction referral |
| National Domestic Violence Hotline | 1-800-799-7233 | 24/7 national | Domestic violence support |
| Veterans Crisis Line | 988, press 1 | 24/7 national | Veterans-specific mental health crisis |
| Local county crisis lines | See Attachment A | Varies by county | Local crisis services where applicable |

Bloom distributes the Crisis Resource Card (Attachment A) to all patients at enrollment via the patient portal and during sync visits as appropriate. The card is also referenced in pre-enrollment crisis disclosures (§5.5) and provided to prospective patients placed on enrollment hold.

### 5.9 SOP-008 Interface (Adverse Event Documentation Cascade)

When an escalation event triggers SOP-008 documentation. The mapping:

| Escalation Tier | SOP-008 Documentation | Covering Physician Notification |
| --- | --- | --- |
| Medical Tier 1 | NOT required (routine clinical care) | N/A |
| Medical Tier 2 | Required per SOP-008 §5.3 | Per SOP-008 §5.3 standard |
| Medical Tier 3 | Required per SOP-008 §5.4 (SAE handling) | Within 4 hours |
| Medical Tier 4 | Required per SOP-008 §5.5 (sentinel) | Within 2 hours + FDA MedWatch consideration per SOP-008 §5.9 |
| MH Tier 1 | NOT required (routine clinical care) | N/A |
| MH Tier 2 | Consideration per SOP-008 §5.3 | Per SOP-008 §5.3 standard |
| MH Tier 3 | Required per SOP-008 §5.4 (SAE-equivalent for crisis) | Within 4 hours + Tarasoff documentation if applicable |
| MH Tier 4 | Required per SOP-008 §5.5 (sentinel) | Within 2 hours + all Tarasoff/5150 actions documented |

Cross-reference: [SOP-008 §5.3](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) (standard handling), [§5.4](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) (SAE handling), [§5.5](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) (sentinel event handling).

Crisis events documented under this SOP feed SOP-008's documentation system; SOP-010 does not duplicate SOP-008's AE Register. The chart entry in OptiMantra under SOP-010 cross-references the AE Register entry under SOP-008. Trending and quality improvement are coordinated quarterly with SOP-008's framework (SOP-008 §5.12).

Events that do **not** cascade to SOP-008: pre-enrollment crisis disclosures (no clinical relationship; logged in operational incident log per §6) and Medical Tier 1 / MH Tier 1 events (routine clinical care; OptiMantra clinical note only).

### 5.10 SOP-007 Interface (Prescription Handling During Active Crisis)

When a patient is in active mental health crisis (MH Tier 3 or MH Tier 4) or in pause status (§5.6), prescription decisions interact with this SOP. The general principle: default-hold during pause status; the Covering Physician may override on a per-medication basis with documented clinical rationale.

#### 5.10.1 TRT and Active Mental Health Crisis

`[CLINICAL — PENDING COVERING PHYSICIAN: Define decision rules for testosterone cypionate during MH Tier 3/4 events and during pause status. Considerations for calibration: testosterone's known psychiatric profile (mood effects ranging from improvement to irritability/aggression depending on individual response and dose), interaction with antipsychotic and antidepressant medications, withdrawal effects of abrupt cessation including significant mood drop, current FDA labeling, AUA Guidelines and Endocrine Society guidance on hormone management during psychiatric crises. Suggested default: hold new prescriptions and refills during pause; existing prescription continues to expiration; abrupt cessation specifically considered for psychiatric impact.]`

#### 5.10.2 GLP-1/GIP and Active Mental Health Crisis

`[CLINICAL — PENDING COVERING PHYSICIAN: Define decision rules for GLP-1/GIP agonists during MH Tier 3/4 events and during pause status. Considerations for calibration: FDA completed safety review in September 2024 finding no causal link between GLP-1 receptor agonists and suicidal thoughts/actions, but Saxenda and Wegovy product labels retain monitoring language for psychiatric symptoms including suicidality; clinical context for hold-vs-continue decisions; potential interaction with eating disorder symptoms if those are part of the presenting concern. Suggested default: hold new prescriptions and refills during pause; existing prescription paused; reassess at re-entry.]`

#### 5.10.3 Sexual Health Prescriptions and Active Mental Health Crisis

`[CLINICAL — PENDING COVERING PHYSICIAN: Define decision rules for tadalafil, sildenafil, and PT-141 during MH Tier 3/4 events and during pause status. Considerations: tadalafil and sildenafil generally lower-risk for psychiatric interaction; PT-141 has psychiatric considerations and is itself a melanocortin-receptor-active compound with mood-related effects in some patients. Suggested default: hold during pause; reassess at re-entry per Covering Physician.]`

#### 5.10.4 Longevity Compounds and Active Mental Health Crisis

`[CLINICAL — PENDING COVERING PHYSICIAN: Define decision rules for NAD+ and glutathione during MH Tier 3/4 events and during pause status. Considerations: generally lower-risk for psychiatric interaction; some patients report mood-related effects with NAD+ that may warrant consideration. Suggested default: hold during pause.]`

#### 5.10.5 Peptide Therapy and Active Mental Health Crisis

`[CLINICAL — PENDING COVERING PHYSICIAN: Define decision rules for peptide therapy during MH Tier 3/4 events and during pause status. Considerations per peptide: BPC-157 and TB-500 minimal neurologic activity; certain other peptides (Selank, Semax) have anxiolytic or nootropic activity that may interact with psychiatric medications; current FDA compounded peptide regulatory status restricts which peptides are available regardless. Suggested default: hold all peptide therapy during pause given heterogeneity and limited safety data in crisis contexts.]`

**Default rule during pause.** All Bloom prescriptions are held during pause status. Override allowed only via documented Covering Physician decision with clinical rationale. Override decisions are documented in OptiMantra clinical notes and cross-referenced to the pause event.

### 5.11 Re-Entry Pathway

When the Covering Physician confirms stabilization criteria are met per §5.6.4, the patient may return to Bloom care.

#### 5.11.1 Stabilization Confirmation

The Covering Physician reviews evidence of stabilization. Evidence sources may include:

- Patient self-report during a check-in visit `[CLINICAL — PENDING COVERING PHYSICIAN: define what self-report content is required and how it is structured]`
- Written attestation from the patient's mental health provider regarding stability `[CLINICAL — PENDING COVERING PHYSICIAN: define what content the attestation should contain; whether attestation is always required or sometimes substituted by self-report]`
- Documentation of inpatient discharge if the original event included hospitalization
- Documentation of mental health treatment plan in place
- Documentation of medication regimen stability

The Covering Physician makes a clinical determination based on this evidence; this is not a checklist.

#### 5.11.2 Re-Entry Sync Visit

Mandatory before resuming any service line. The re-entry visit covers:

- Patient's clinical context update (current mental health status, current providers, current medications including psychiatric, current treatment plans)
- Review of the original triggering event and patient's reflection on it
- Discussion of risk factors and how they have been addressed
- Updated informed consent for resuming Bloom services
- Treatment plan adjustment to reflect any changes (e.g., different starting dose; different monitoring cadence; specific symptoms the patient is asked to surface immediately)
- Re-affirmation of crisis-resource awareness (Attachment A re-provided)

#### 5.11.3 Resumption Modality

`[CLINICAL — PENDING COVERING PHYSICIAN: Default policy for resumption — graduated (one service line at a time) versus simultaneous (all paused services resume). Suggested defaults for calibration: graduated for MH Tier 4 events; simultaneous acceptable for MH Tier 3 events that did not involve hospitalization; case-by-case for everything else.]`

#### 5.11.4 Heightened Monitoring

`[CLINICAL — PENDING COVERING PHYSICIAN: Define post-re-entry monitoring schedule. Suggested elements: more-frequent sync visit cadence for first N months post-re-entry; specific screening items added to routine sync visit checklists; lower threshold for re-pause if any indicators reappear; coordination expectations with the patient's mental health provider (e.g., quarterly coordination touch-base).]`

#### 5.11.5 Re-Entry Documentation

Re-entry event documented in OptiMantra with reference back to the original Tier 3/4 escalation event. SOP-008 AE Register entry updated to reflect resolution and re-entry. Quality-improvement review of the case included in the next quarterly SOP-008 trending cycle per [SOP-008 §5.12](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md).

#### 5.11.6 If Re-Entry Criteria Are Not Met

If the patient seeks re-entry but the Covering Physician determines stabilization criteria are not yet met, the pause continues with clear communication to the patient regarding what additional evidence or steps are needed. If re-entry remains untenable for an extended period `[CLINICAL — PENDING COVERING PHYSICIAN: define threshold, suggested 6-12 months]`, the Covering Physician considers whether termination of the Bloom relationship is more appropriate than indefinite pause; termination is communicated transparently to the patient with appropriate referral to alternative care.

---

## 6. Records & Documentation

### 6.1 What Is Documented

For every event processed under this SOP, the following data elements are documented in OptiMantra:

- **Event identifier** — unique identifier and date/time of recognition
- **Recognition channel** — sync visit / async message / intake form / scheduled-event review / third-party notification / other
- **Tier classification** — Medical Tier 1/2/3/4 or MH Tier 1/2/3/4 with rationale
- **Clinical content summary** — what the patient disclosed or what was observed, in clinical detail sufficient to inform later reviewers
- **Response actions** — actions taken in real time (911 called, 988 connected, sync visit conducted, etc.) with timestamps
- **Warm handoff confirmation** — for Tier 3/4 events, evidence that warm handoff was completed
- **Tarasoff status** — whether duty was triggered, action taken, victim warning details if applicable, law enforcement notification details if applicable
- **5150 status** — whether welfare check requested, agency contacted, outcome of welfare check (5150 placed, voluntary transport, declined, etc.)
- **Mandated reporting status** — whether mandated reporting threshold was met, report filed, agency contacted, written report submission confirmation
- **Pause status** — whether pause invoked, scope of pause, communication to patient, expected duration
- **Stabilization tracking** — milestone events during pause (mental health provider attestation received, inpatient discharge confirmed, medication regimen stable, etc.)
- **Re-entry tracking** — re-entry sync visit, treatment plan adjustments, heightened monitoring schedule
- **Cross-references** — SOP-008 AE Register entry ID where applicable; pre-enrollment incident log ID where applicable

### 6.2 Where It Is Documented

OptiMantra is the primary documentation system. Specific OptiMantra workflows: `[OPERATIONAL — PENDING MSO OWNER: define exact OptiMantra workflow steps for crisis-event documentation. Required: structured-field templates for tier classification and required fields above; cross-reference linkages to SOP-008 AE Register; restricted-access controls for the most sensitive entries; reporting infrastructure to support quarterly quality-improvement review per SOP-008 §5.12.]`

Cross-referenced to:
- [SOP-008 AE Register](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) — for events meeting SOP-008 thresholds per §5.9
- Operational incident log (maintained by MSO Owner) — for pre-enrollment events and other events that don't meet SOP-008 thresholds but warrant tracking

### 6.3 Access Controls

`[OPERATIONAL — PENDING MSO OWNER: Verify OptiMantra access controls for crisis event documentation. Considerations: crisis events contain particularly sensitive mental health content; access should be more restricted than routine clinical notes; specifically, sub-clinical staff (if added in future) should not have routine access; auditing of access is appropriate. Tarasoff documentation specifically warrants access controls and audit logging given the legal protections at issue under §43.92(b).]`

### 6.4 Retention

Per [SOP-001 §[applicable section]](../SOP-001-document-control/SOP-001-document-control.md) retention requirements. Crisis-event documentation retained for the longer of HIPAA 6 years (45 CFR §164.530(j)) and California 7-year medical-records retention. Tarasoff documentation retained per the applicable California statute of limitations for any related civil action, which may exceed the medical-records retention period — the Covering Physician retains personal copies of Tarasoff documentation indefinitely under direction of healthcare counsel `[PENDING COUNSEL VALIDATION]`.

### 6.5 Operational Incident Log

The operational incident log, maintained by the MSO Owner, contains entries for events that do not meet SOP-008 thresholds (pre-enrollment events, Medical Tier 1, MH Tier 1) but warrant tracking. Each entry includes:

- Date and channel of disclosure
- Operational handling actions taken (resources provided, enrollment hold imposed, etc.)
- Outcome (enrollment proceeded, hold continues, lost to follow-up, etc.)
- Pattern flags for quality improvement

Reviewed quarterly with the Covering Physician as part of the SOP-008 §5.12 trending cycle.

---

## 7. Patient-Facing Communication

### 7.1 Pre-Event Communication

Bloom communicates its scope and crisis-response posture to patients before any event arises. Pre-event communication channels:

- **Waitlist signup** — landing page or signup flow includes a statement of Bloom's scope (metabolic and endocrine care only) and crisis-resource references (988, 911 for emergencies)
- **Intake form** — explicit acknowledgment item that the patient understands Bloom is not a mental health provider, primary care provider, or emergency care provider, and that the patient has access to crisis resources (988, 911, Crisis Resource Card)
- **Terms of service** — references this SOP's framework: Bloom provides metabolic care; crisis events trigger escalation to external resources; pause status may apply post-escalation
- **Crisis Resource Card** — distributed at enrollment via the patient portal; accessible at any time via the portal

`[OPERATIONAL — PENDING MSO OWNER: Develop the specific language for waitlist signup, intake form, and terms of service. Coordinate with the future Patient Communication Protocols SOP for standardization.]`

### 7.2 During-Event Communication

Scripted responses for sync-visit crisis events: see Attachment D (Telehealth Sync Visit Crisis Protocols). Each card provides:

- Recognition cues for the specific scenario
- Immediate verbal response (what the clinician says to the patient)
- Immediate action (what the clinician does — call 911, escalate to Covering Physician, etc.)
- Follow-up action (within 24 hours)
- Documentation requirements

Warm-handoff language is consistent across scenarios: explicit, transparent, action-oriented, no abandonment.

### 7.3 Post-Event Communication

- **Pause-status notification** — per §5.6.3 template, delivered via portal and email within 24 hours of pause invocation
- **Stabilization milestone communications** — at each review point during pause, the MSO Owner contacts the patient (per Covering Physician direction) to update on pause status and next steps
- **Re-entry communication** — at the re-entry sync visit, the Covering Physician communicates re-entry directly; written summary follows via portal

All crisis-related patient communications are documented in OptiMantra (channel, date/time, content summary, patient response).

### 7.4 Communication With Family / Third Parties

Communication with patient's family or other third parties requires patient consent, with limited exceptions:

- **HIPAA permitted disclosures** under 45 CFR 164.512(j) (uses and disclosures to avert a serious and imminent threat to health or safety) — applies during active Tier 4 events
- **Tarasoff warnings** — disclosure to intended victim and law enforcement is permitted under both Tarasoff itself and 45 CFR 164.512(j)
- **Welfare check** — disclosure to law enforcement of identity, location, and nature of concern is permitted
- **Mandated reporting** — disclosure to mandated-reporting agencies is permitted under 45 CFR 164.512(b) and (c)

Outside these exceptions, communication with family or third parties requires patient consent obtained per the future Patient Communication Protocols SOP and SOP-001 informed-consent standards.

---

## 8. Training & Competency

`[OPERATIONAL — PENDING MSO OWNER: Define training requirements for personnel under this SOP. Suggested elements for calibration:`

- **For Covering Physician**:
  - California-specific Tarasoff law refresher (annual)
  - California mandated-reporter training (initial + annual refresher; the California Department of Justice provides a free online Mandated Reporter training)
  - Crisis-recognition training appropriate to telehealth setting
  - Sync-visit crisis-protocol drills (recommended at SOP rollout and at least annually thereafter)
  - Mental Health First Aid certification — optional but valuable for non-psychiatrist physicians engaging with mental health crises
  - 988 and Crisis Text Line orientation
  - Documentation training for crisis-event entries (OptiMantra workflow + Tarasoff/5150 documentation specifics)

- **For MSO Owner RN**:
  - California mandated-reporter training (initial + annual refresher)
  - Crisis-recognition training appropriate to operational/intake role
  - Sync-visit crisis-protocol drills (annual)
  - OptiMantra workflow training (operational portion)
  - Pause-status communication delivery training (templates and tone)
  - HIPAA permitted-disclosure refresher specific to crisis events

- **For MSO Intake / Operations Personnel** (future stated):
  - Crisis-recognition awareness (operational only — flag and route, no clinical assessment)
  - Routing protocols (sync to Covering Physician; async to operational triage)
  - Operational incident log entry procedures
  - HIPAA basics (already required as part of general HIPAA training under future HIPAA SOP)
  - Sync-visit support during crisis (e.g., placing 911 calls while clinician remains on visit)

- **Cadence**: Initial training prior to SOP rollout; refresher cadence annual minimum.

- **Documentation**: Training completion logged in personnel file. Training-completion attestation included in §12 acknowledgment table where applicable.]`

---

## 9. References

### 9.1 Federal Regulatory References

| Authority | Relevance to This SOP |
| --- | --- |
| **45 CFR 164.512(j)** | HIPAA permitted disclosure to avert a serious threat to health or safety. Basis for disclosures during active crisis events including Tarasoff warnings and 911 dispatches. |
| **45 CFR 164.512(b)** | HIPAA permitted disclosure for public health activities. Basis for mandated-reporting disclosures. |
| **45 CFR 164.512(c)** | HIPAA permitted disclosure about victims of abuse, neglect, or domestic violence. Basis for elder abuse and DV mandated-reporting disclosures. |
| **45 CFR 164.530(j)** | HIPAA documentation retention requirement (6 years). Establishes minimum retention for crisis-event documentation. |
| **21 CFR Part 803 / 314.80** | FDA adverse event reporting framework. Crisis events that include adverse drug events cascade to [SOP-008](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) per §5.9 of this SOP; SOP-008 governs voluntary FDA MedWatch reporting. |

### 9.2 California Statutory References

| Authority | Relevance to This SOP |
| --- | --- |
| **Cal. Civ. Code §43.92** | Tarasoff duty. Establishes the duty of psychotherapists to use reasonable care to protect a reasonably identifiable victim when the patient communicates a serious threat. §5.7.1. Immunity provisions in §43.92(b) for fulfillment of duty. |
| **Cal. Evid. Code §1010** | Definition of "psychotherapist" for purposes of Tarasoff and related provisions. Includes physicians "to the extent that the physician examines, treats, or otherwise advises any person concerning a mental or emotional condition." §5.7.1. |
| **Cal. Welf. & Inst. Code §5150** | Involuntary 72-hour psychiatric hold. Bloom facilitates welfare checks; does not initiate 5150. §5.7.2. |
| **Cal. Welf. & Inst. Code §5008(h)(1)(A)** | Definition of "gravely disabled" for 5150 purposes. |
| **Cal. Penal Code §11164 et seq. (CANRA)** | California Child Abuse and Neglect Reporting Act. Mandated reporters under §11165.7 include physicians and registered nurses. §5.7.3. |
| **Cal. Welf. & Inst. Code §15630** | Elder and Dependent Adult Abuse Reporting. Mandated reporters include physicians and registered nurses. §5.7.3. |
| **Cal. Penal Code §11160** | Reporting of injuries from assaultive conduct (including domestic violence). Applies to physicians and other healthcare workers. §5.7.3. |
| **Cal. Bus. & Prof. Code §2290.5** | Telehealth requirements including patient location confirmation. Cross-referenced to SOP-005; relevant to §5.4 telehealth failure modes including location-unknown scenarios. |

### 9.3 Professional and Reference Resources

| Resource | Relevance |
| --- | --- |
| **988 Suicide & Crisis Lifeline** | National mental health crisis resource active since July 2022. Primary first-line resource referenced throughout this SOP. |
| **Crisis Text Line (text HOME to 741741)** | National text-based crisis resource. Alternative for patients who cannot safely call. |
| **SAMHSA National Helpline (1-800-662-4357)** | Substance abuse and addiction national resource. |
| **National Domestic Violence Hotline (1-800-799-7233)** | DV national resource. |
| **California Mandated Reporter Online Training (DOJ)** | Free training resource for California mandated reporters. Recommended for Covering Physician and MSO Owner RN refresher. |
| **Mental Health First Aid** | Non-clinician mental health crisis recognition framework. Recommended as optional certification for personnel under this SOP. |
| **Tarasoff v. Regents of the University of California (1976)** | Foundational California case establishing the psychotherapist duty to protect. Codified at Cal. Civ. Code §43.92. |
| **FDA Drug Safety Communication on GLP-1 Receptor Agonists and Suicidality (September 2024)** | FDA completed safety review finding no causal link between GLP-1 RAs and suicidal thoughts or actions. Saxenda and Wegovy product labels retain monitoring language. Referenced in §5.10.2. |

---

## 10. Related Documents

### 10.1 Upstream and Parallel SOPs

| SOP | Relationship to SOP-010 |
| --- | --- |
| [SOP-001 — Document Control & SOP Lifecycle Management](../SOP-001-document-control/SOP-001-document-control.md) | Governing SOP. All revisions to SOP-010 follow the SOP-001 change process. |
| [SOP-002 — Patient Intake Operations](../SOP-002-patient-intake-operations/SOP-002-patient-intake-operations.md) | Upstream SOP. Pre-enrollment crisis disclosures during intake processing route into §5.5 of this SOP. Emergency contact collection at enrollment supports §5.4.1 escalation pathway. |
| [SOP-003 — Clinical Eligibility Screening](../SOP-003-clinical-eligibility-screening/SOP-003-clinical-eligibility-screening.md) | Parallel SOP. SOP-003 screens for crisis-relevant exclusions (active suicidality, active substance abuse, active eating disorder, etc.); patients excluded under SOP-003 may receive §5.5 pre-enrollment crisis handling. |
| [SOP-005 — Synchronous Telehealth Visit](../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) | Parallel SOP. Sync-visit location confirmation at visit start (per SOP-005) is a prerequisite for §5.4 telehealth crisis protocols. In-visit crisis recognition routes into §5.2 and §5.3 frameworks. |
| [SOP-007 — Prescribing Protocols](../SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md) | Parallel SOP. Prescription handling during active crisis and pause status governed by §5.10 of this SOP. SOP-007's patient-reported symptom intake (§5.8) routes crisis indicators into this SOP first, with subsequent AE cascade per §5.9. |
| [SOP-008 — Adverse Event & Incident Reporting](../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) | Primary downstream SOP. Crisis events meeting SOP-008 thresholds per §5.9 cascade into SOP-008's AE Register. Quality-improvement trending is coordinated quarterly. |

### 10.2 Future SOPs Referenced in This Document

| Document | Relationship |
| --- | --- |
| Future Provider Credentialing, Insurance & Coverage SOP | Will govern Covering Physician and backup provider credentialing including DEA, California license, malpractice coverage, mandated-reporter training. Referenced in §4 and §5.4 (backup provider role during after-hours crises). |
| Future Treatment Discontinuation & Tapering SOP | Will govern formal treatment discontinuation when post-crisis review determines that Bloom care should not resume. Until drafted, the Covering Physician determines discontinuation per case-by-case clinical judgment during the §5.11 re-entry assessment. |
| Future HIPAA & PHI Handling SOP | Will govern comprehensive HIPAA compliance. §5.7.1, §5.7.3, and §7.4 of this SOP reference HIPAA permitted-disclosure provisions for crisis-related disclosures. |
| Future Patient Communication Protocols SOP | Will govern standardized patient communication. §6 and §7 of this SOP govern crisis-specific patient communication; coordination with the future SOP is anticipated. |
| Future Records Retention & Destruction SOP | Will consolidate retention periods across all SOPs. Crisis-event retention governed by §6.4 of this SOP until the Records Retention SOP is drafted. |

### 10.3 Attachments

| Attachment | Title | Status |
| --- | --- | --- |
| Attachment A | Crisis Resource Card | Drafted v0.1 (this commit) |
| Attachment B | Medical Emergency Decision Tree | Drafted v0.1 (this commit) |
| Attachment C | Mental Health Crisis Decision Tree | Drafted v0.1 (this commit) |
| Attachment D | Telehealth Sync Visit Crisis Protocols | Drafted v0.1 (this commit) |

---

## 11. Revision History

| Version | Date | Author | Description of Change | Approver |
| --- | --- | --- | --- | --- |
| 0.1 | 2026-05-24 | Brian DeGuzman, RN (MSO Owner) — operational scaffolding | Initial draft per MSO Owner instruction. Scope: dual-domain (medical + mental health) with tiered severity frameworks (Medical Tier 1-4, MH Tier 1-4). Clinical content marked `[CLINICAL — PENDING COVERING PHYSICIAN]` for Covering Physician population during review. Operational content marked `[OPERATIONAL — PENDING MSO OWNER]` for MSO Owner determination. Pre-enrollment crisis handling addressed in dedicated subsection §5.5; post-enrollment is the primary focus. Pause-and-stabilize protocol established in §5.6; re-entry pathway in §5.11. California-specific legal obligations (Tarasoff at Cal. Civ. Code §43.92, 5150 interface at Cal. Welf. & Inst. Code §5150, mandated reporting at Cal. Penal Code §11164 et seq., Cal. Welf. & Inst. Code §15630, Cal. Penal Code §11160) addressed in §5.7. Four attachments built concurrently: A (Crisis Resource Card), B (Medical Emergency Decision Tree), C (Mental Health Crisis Decision Tree), D (Telehealth Sync Visit Crisis Protocols). Cross-references with SOP-002, SOP-003, SOP-005, SOP-007, SOP-008. SOP-008 cross-reference backfill performed in same commit (SOP-008 v0.2 → v0.3): forward-references to "future Emergency & Mental Health Escalation SOP" replaced with concrete SOP-010 references. | Dr. Michael Napolitano, MD (signature pending) |

---

## 12. Approval & Acknowledgment

This SOP becomes effective only when signed by the Document Owner and Approving Authority below. Until the signature is present and the effective date is populated, this document is **DRAFT** and shall not govern operational practice.

This is a clinical SOP per [SOP-001 §2.3](../SOP-001-document-control/SOP-001-document-control.md). The Covering Physician serves as Document Owner and Approving Authority. The MSO Owner acknowledges operational responsibilities but does not approve clinical content.

---

**Document Owner & Approving Authority**

Name: Dr. Michael Napolitano, MD
Title: Covering Physician / Medical Director
DEA Registration: ___________________________________________
California Medical License: ___________________________________________
Signature: ___________________________________________
Date: _______________________________________________

---

**MSO Owner Acknowledgment**

By signing below, the MSO Owner acknowledges that: (a) the operational scaffolding in this SOP accurately reflects the MSO's intended operational procedures; (b) the MSO Owner understands and will comply with the clinical/operational boundary defined throughout this SOP including the boundary that the MSO Owner does not assess clinical severity, does not make Tarasoff applicability determinations, and does not place patients on or release patients from pause status independently of the Covering Physician; (c) the MSO Owner will populate all `[OPERATIONAL — PENDING MSO OWNER]` markers before this SOP becomes operative; and (d) the MSO Owner has completed (or will complete prior to effective date) California mandated-reporter training.

Name: Brian DeGuzman
Title: MSO Owner / Registered Nurse
California RN License: ___________________________________________
Signature: ___________________________________________
Date: _______________________________________________

---

**Acknowledgment of Receipt and Review**

By signing below, the personnel listed acknowledge they have read, understood, and agree to comply with this SOP.

| Name | Role | Signature | Date |
| --- | --- | --- | --- |
| Dr. Michael Napolitano, MD | Covering Physician / Medical Director |  |  |
| Brian DeGuzman | MSO Owner / Registered Nurse |  |  |
| | Backup Provider (DfP-engaged) |  |  |
| | MSO Intake / Operations Personnel |  |  |

---

*Bloom Metabolics — Confidential*
