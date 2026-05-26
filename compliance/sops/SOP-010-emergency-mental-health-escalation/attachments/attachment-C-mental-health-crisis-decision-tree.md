---
attachment_id: "SOP-010 Attachment C"
title: "Mental Health Crisis Decision Tree"
parent_sop: "SOP-010 (Emergency & Mental Health Escalation)"
version: "0.1"
last_updated: "2026-05-24"
intended_use: "Clinician-facing decision tree for mental health crisis triage and response. Used during sync visits, async message review, and other clinical interactions. Companion to SOP-010 §5.3."
classification: "INTERNAL — CLINICAL USE ONLY"
---

# Mental Health Crisis Decision Tree

**Clinician Decision Aid** · **SOP-010 Attachment C** · **v0.1**

This decision tree operationalizes [SOP-010 §5.3](../SOP-010-emergency-mental-health-escalation.md) for mental health crises arising during any Bloom interaction. Parallel structure to Attachment B (Medical) with branch points for Tarasoff assessment and 5150 welfare-check consideration. Clinical criteria at each branch point are `[CLINICAL — PENDING COVERING PHYSICIAN]` and will be populated during physician review.

---

## Entry Point

**Trigger.** Patient discloses or exhibits mental health content during any of:
- Synchronous video visit
- Asynchronous secure portal message
- Pre-enrollment interaction (waitlist signup, intake form, eligibility screening) — note: pre-enrollment events follow [SOP-010 §5.5](../SOP-010-emergency-mental-health-escalation.md), not this tree
- Third-party notification

**First question.** Is the patient in active imminent danger right now?

```
                              ┌──────────────────────────────────────────┐
                              │ Step 1 — Active imminent danger right    │
                              │           now to self or identified      │
                              │           third party?                   │
                              └──────────────────────────────────────────┘
                                              │
                ┌─────────────────────────────┴─────────────────────────────┐
              YES                                                          NO
                │                                                            │
                ▼                                                            ▼
        Go to MH TIER 4                                              Go to Step 2
```

---

## Step 1 — Imminent Danger Triage

**Criteria for "active imminent danger right now"** `[CLINICAL — PENDING COVERING PHYSICIAN]`:

- Active suicide attempt in progress or just-completed (overdose described/witnessed, self-injurious behavior witnessed on video)
- Imminent threat of physical violence to identifiable victim (Tarasoff territory — see Tarasoff branch below)
- Gravely-disabled patient unable to care for self (no shelter, no food, decompensation visible on video)
- Active psychosis with safety risk (command hallucinations directing self-harm, paranoid delusions creating risk)
- Patient unresponsive on sync visit with mental-health context (possible overdose)

If **YES** → **MH TIER 4** branch below.

If **NO** → proceed to Step 2.

---

## Step 2 — Severe Triage (For Non-Imminent Events)

**Question.** Does the patient have severe psychiatric symptoms or active suicidal ideation with intent/plan/means short of imminent?

**Criteria for "severe"** `[CLINICAL — PENDING COVERING PHYSICIAN]`:

- Active suicidal ideation with **intent** OR **plan** OR **means** (any one of these elevates from Tier 2 to Tier 3)
- Severe psychiatric symptoms (acute psychosis, mania with impaired judgment, severe dissociation)
- Acute substance intoxication during sync visit (alcohol, opioids, stimulants, sedatives) sufficient to impair engagement
- Escalating self-harm behavior reported by patient or third party
- Homicidal ideation with intent, plan, or means (short of imminent — imminent goes to Tier 4)

If **YES** → **MH TIER 3** branch.

If **NO** → proceed to Step 3.

---

## Step 3 — Moderate vs. Mild

**Question.** Does this require synchronous clinical evaluation by the Covering Physician, OR does this require linkage to mental health care?

**Criteria for "moderate"** `[CLINICAL — PENDING COVERING PHYSICIAN]`:

- Depressive symptoms without suicidal ideation but with functional impairment (work, relationships, self-care)
- Anxiety with functional impairment
- **Passive suicidal ideation** without intent, plan, or means (e.g., "I think the world would be better off without me" without specific plan)
- New psychiatric symptoms in a patient who does not have established mental health care
- Previously stable patient reporting decompensation

If **YES** → **MH TIER 2** branch.

If **NO** (mild situational distress, no psychiatric symptoms, existing care adequate) → **MH TIER 1** branch.

---

## MH TIER 1 — Mild

**Action path.**

1. Acknowledge the disclosure during the current interaction.
2. Provide or reaffirm Crisis Resource Card (Attachment A).
3. Encourage patient to connect with existing PCP or mental health provider (if they have one); provide referral resources (if they do not).
4. No external escalation beyond resource provisioning.
5. No pause to metabolic care.

**Documentation.**

- Routine clinical note in OptiMantra: disclosure, resources provided, patient-affirmed plan to follow up with existing/new providers
- **No** SOP-008 AE Register entry
- **No** operational incident log entry

**Reassessment trigger.** If symptoms progress, re-enter the tree and reassess for upgrade.

---

## MH TIER 2 — Moderate

**Action path.**

1. Schedule expedited sync visit with Covering Physician (or backup if Covering Physician unavailable) to assess.
2. Strong referral to mental health provider; if patient has no established provider, Bloom provides referral resources and confirms within 7 days that the patient has made contact.
3. Provide Crisis Resource Card.
4. **Voluntary pause consideration** — `[CLINICAL — PENDING COVERING PHYSICIAN: decision criteria for voluntary pause at MH Tier 2; suggested defaults: pause if on GLP-1/GIP with new depressive symptoms; pause if testosterone recently initiated and plausibly contributing to mood changes; do not pause if symptoms are clearly unrelated and external care is established.]`

**Documentation.**

- OptiMantra clinical note: disclosure, tier determination, action path, voluntary pause decision rationale
- **SOP-008 AE consideration** — mental health symptoms during metabolic care may qualify as Tier 2 SOP-008 events per [SOP-008 §5.3](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) and SOP-010 §5.9
- AE Register entry where SOP-008 threshold met

**Disposition.** Active care continues unless voluntary pause invoked.

---

## MH TIER 3 — Severe

**Action path — Step A: Crisis response.**

1. **Mandatory sync visit** with Covering Physician (or backup if Covering Physician unavailable).
2. **Direct linkage to crisis resources** during the interaction:
   - 988 (active connection — call placed during interaction, warm handoff)
   - Crisis Text Line if patient prefers text
   - Local county crisis services where applicable
3. **Warm handoff** — remain engaged until confirmed connection with receiving resource.

**Action path — Step B: Tarasoff assessment.**

```
Was a threat of physical violence to a reasonably identifiable third party communicated?
                  │
        ┌─────────┴─────────┐
       YES                  NO
        │                    │
        ▼                    ▼
Go to TARASOFF branch    Continue to Step C
```

**TARASOFF branch (`[CLINICAL — PENDING COVERING PHYSICIAN: confirm applicability per §5.7.1`):**

1. Assess seriousness of threat `[CLINICAL — PENDING COVERING PHYSICIAN]`.
2. Identify intended victim (reasonably identifiable).
3. **Discharge duty by BOTH**:
   - **Warning** the intended victim (telephone if number known, through law enforcement, through known contacts)
   - **Notifying** a law enforcement agency with jurisdiction over the victim's location
4. Document detailed Tarasoff actions in OptiMantra and the SOP-008 AE Register entry.
5. Disclosures are permitted under 45 CFR 164.512(j) (avert serious threat) and Cal. Civ. Code §43.92 immunity provisions.

**Action path — Step C: 5150 consideration.**

```
Does the patient meet 5150 criteria (danger to self / danger to others / gravely
disabled due to mental disorder), AND would in-person evaluation be appropriate?
                  │
        ┌─────────┴─────────┐
       YES                  NO
        │                    │
        ▼                    ▼
Request welfare check    Continue to Step D
(non-emergency line, or
911 if also imminent)
```

**5150 welfare-check branch:**

1. Determine urgency — imminent → 911; non-imminent → non-emergency law-enforcement line
2. Call during the interaction; Covering Physician makes the call (or MSO Owner under Covering Physician direction `[CLINICAL — PENDING COVERING PHYSICIAN: confirm who makes the call]`)
3. Provide identity, location, nature of concern, Bloom's clinical relationship
4. Document call: agency, person spoken with, contents, response
5. Track outcome (Bloom does not make 5150 determination — responding personnel do)

**Action path — Step D: Pause status invoked.**

Pause status (§5.6) invoked automatically for any MH Tier 3 event. Patient notified per §5.6.3 template within 24 hours.

**Documentation.**

- OptiMantra clinical note with all details
- **SOP-008 AE Register entry** per [SOP-008 §5.4](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) — SAE-equivalent for crisis
- Tarasoff assessment outcome documented (whether triggered, action taken, rationale)
- 5150 welfare-check actions documented if applicable

**Covering Physician notification.** Within **4 hours**.

**Disposition.** Pause status. Re-entry per §5.11.

---

## MH TIER 4 — Active Crisis / Imminent Danger

**Action path — Step A: Crisis response.**

1. **Call 911 immediately** (for mental health emergencies as well as medical; 911 dispatch coordinates with mental health crisis services where county co-response models exist).
2. **Stay on the sync visit line** during dispatch.
3. **Request welfare check** via 911 (active) for patient's last-known location.
4. If patient is online and there is opportunity, warm handoff to 988 in parallel.

**Action path — Step B: Tarasoff assessment.**

If a threat of physical violence to identifiable victim was communicated — execute Tarasoff procedure **concurrently** with 911 dispatch:
1. Warn the intended victim or victims
2. Notify a law enforcement agency
3. Document everything

(See MH Tier 3 Tarasoff branch above for detailed procedure.)

**Action path — Step C: Pause status invoked.**

Pause status (§5.6) invoked immediately.

**Documentation.**

- OptiMantra clinical note with detailed timeline
- **SOP-008 AE Register entry** per [SOP-008 §5.5](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) sentinel event handling
- All Tarasoff actions documented in full
- 5150 hold status tracked if patient placed on hold (facility, anticipated duration, designated personnel, disposition at end of 72-hour evaluation)
- Video/audio capture from telehealth platform retained

**Covering Physician notification.** Within **2 hours**.

**Disposition.** Pause status. Re-entry per §5.11. Sentinel event RCA per [SOP-008 §5.5](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md).

---

## Mandated Reporting Branch (Cross-Cutting)

Throughout the decision tree, watch for content that triggers mandated reporter obligations independent of tier:

- **Child abuse/neglect** (Cal. Penal Code §11164 et seq.) — disclosure of child abuse during patient interaction, even though the patient is an adult
- **Elder or dependent adult abuse** (Cal. Welf. & Inst. Code §15630) — patient is 65+ or dependent adult AND there is reasonable suspicion of abuse, OR patient discloses abuse of another elder/dependent adult
- **Injuries from assaultive conduct** (Cal. Penal Code §11160) — patient presents with injuries suggesting assaultive or abusive conduct including domestic violence

If triggered:
1. Make telephonic report immediately or as soon as practicably possible
2. Submit written report within statutory window (36 hours for CANRA; two working days for elder abuse and §11160)
3. The reporting clinician is the licensed Covering Physician or MSO Owner RN — personal obligation
4. Disclosures permitted under 45 CFR 164.512(b) and (c)

See [SOP-010 §5.7.3](../SOP-010-emergency-mental-health-escalation.md) for procedure detail.

---

## Summary Table

| Tier | Severity | Response | Pause? | Tarasoff? | 5150 Welfare? | SOP-008 | CP Notify |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Mild | Acknowledge, resources, no escalation | No | No | No | No | N/A |
| 2 | Moderate | Sync visit + MH referral | Maybe `[CLINICAL — PENDING]` | If threat disclosed | If criteria met | Maybe (§5.3) | Standard |
| 3 | Severe | Sync visit + 988 + welfare check if 5150 criteria | Yes (automatic) | If threat disclosed | If criteria met | Yes (§5.4) | 4 hours |
| 4 | Imminent | 911 + Tarasoff if applicable + welfare check | Yes (automatic) | If threat disclosed | Yes (via 911) | Yes (§5.5) | 2 hours |

---

## Cross-References

- [SOP-010 §5.3 — Mental Health Crisis Framework](../SOP-010-emergency-mental-health-escalation.md) — body-level framework this attachment operationalizes
- [SOP-010 §5.5 — Pre-Enrollment Crisis Handling](../SOP-010-emergency-mental-health-escalation.md) — pre-enrollment events follow a different pathway; do not use this tree for those
- [SOP-010 §5.6 — Pause-and-Stabilize Protocol](../SOP-010-emergency-mental-health-escalation.md)
- [SOP-010 §5.7 — California Legal Obligations](../SOP-010-emergency-mental-health-escalation.md) — Tarasoff, 5150 interface, mandated reporting
- [SOP-010 §5.11 — Re-Entry Pathway](../SOP-010-emergency-mental-health-escalation.md)
- [SOP-008 §5.3](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md), [§5.4](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md), [§5.5](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md)
- [Attachment A — Crisis Resource Card](attachment-A-crisis-resource-card.md) — patient-facing resources
- [Attachment D — Telehealth Sync Visit Crisis Protocols](attachment-D-telehealth-sync-visit-crisis-protocols.md)

---

*Bloom Metabolics — Confidential — SOP-010 Attachment C — v0.1 — 2026-05-24*
