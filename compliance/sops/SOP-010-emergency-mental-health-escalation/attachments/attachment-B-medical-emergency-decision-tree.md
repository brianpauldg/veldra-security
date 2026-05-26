---
attachment_id: "SOP-010 Attachment B"
title: "Medical Emergency Decision Tree"
parent_sop: "SOP-010 (Emergency & Mental Health Escalation)"
version: "0.1"
last_updated: "2026-05-24"
intended_use: "Clinician-facing decision tree for medical emergency triage and response. Used during sync visits, async message review, and other clinical interactions. Companion to SOP-010 §5.2."
classification: "INTERNAL — CLINICAL USE ONLY"
---

# Medical Emergency Decision Tree

**Clinician Decision Aid** · **SOP-010 Attachment B** · **v0.1**

This decision tree operationalizes [SOP-010 §5.2](../SOP-010-emergency-mental-health-escalation.md) for medical emergencies arising during any Bloom interaction. Clinical criteria at each branch point are `[CLINICAL — PENDING COVERING PHYSICIAN]` and will be populated during physician review.

---

## Entry Point

**Trigger.** Patient presents with a concerning physical symptom during any of:
- Synchronous video visit (intake, sync visit, lab review, re-entry)
- Asynchronous secure portal message
- Scheduled laboratory event (critically anomalous lab discovered during routine review)
- Third-party notification (family member, ED clinician calling Bloom, external provider)

**First question.** Is this an active life-threatening event right now?

```
                              ┌─────────────────────────────────────────┐
                              │ Step 1 — Active life-threatening event? │
                              └─────────────────────────────────────────┘
                                              │
                ┌─────────────────────────────┴─────────────────────────────┐
              YES                                                          NO
                │                                                            │
                ▼                                                            ▼
        Go to MEDICAL TIER 4                                        Go to Step 2
```

---

## Step 1 — Life-Threatening Triage

**Criteria for "active life-threatening event right now"** `[CLINICAL — PENDING COVERING PHYSICIAN]`:

- Respiratory failure or inability to breathe adequately
- Suspected acute MI or stroke (active symptoms of either)
- Anaphylactic shock with hemodynamic compromise (hypotension, altered mental status with allergic context)
- Severe trauma with active bleeding
- Patient unresponsive on sync visit (not due to disconnection)
- Active overdose (witnessed, described, or strongly suspected)
- Active seizure
- Any other event where a reasonable lay observer would call 911 immediately

If **YES** → **MEDICAL TIER 4** branch below.

If **NO** → proceed to Step 2.

---

## Step 2 — Severity Triage (For Non-Imminently-Life-Threatening Events)

**Question.** Is this likely to become life-threatening within hours absent intervention, OR does it require ED-level evaluation now?

**Criteria for "severe"** `[CLINICAL — PENDING COVERING PHYSICIAN]`:

- Anaphylaxis with airway involvement (stridor, throat swelling, wheeze) — note: shock-state belongs at Tier 4
- Chest pain with cardiac features (radiation, diaphoresis, exertional component) in elevated-risk patient
- Severe hypoglycemia requiring IM glucagon or IV intervention
- Syncope of unclear etiology in patient on testosterone or GLP-1
- New neurological symptoms (focal weakness, speech changes, severe headache)
- Priapism exceeding emergency-care duration threshold
- Severe injection-site reaction with systemic signs of sepsis
- Significant new symptom requiring urgent in-person evaluation

If **YES** → **MEDICAL TIER 3** branch.

If **NO** → proceed to Step 3.

---

## Step 3 — Moderate vs. Mild

**Question.** Does this require synchronous clinical evaluation OR urgent-care-level care?

**Criteria for "moderate"** `[CLINICAL — PENDING COVERING PHYSICIAN]`:

- Significant injection-site reaction with localized systemic symptoms (low-grade fever, lymphadenopathy) but without airway involvement
- Persistent vomiting from GLP-1 unresponsive to standard antiemetic guidance
- Suspected hypoglycemia not resolving with oral carbohydrate
- Allergic reaction with skin and GI symptoms but no airway involvement
- New persistent symptom (palpitations, edema) requiring evaluation beyond routine telehealth scope

If **YES** → **MEDICAL TIER 2** branch.

If **NO** (mild symptom suitable for patient self-management with Bloom guidance) → **MEDICAL TIER 1** branch.

---

## MEDICAL TIER 1 — Mild

**Action path.**

1. Address during the current interaction (sync visit) or via secure portal message (async).
2. Provide routine clinical guidance within Bloom's scope (e.g., warm compress for injection-site reaction, dietary guidance for GI side effects, dose-timing adjustment within prescribed parameters).
3. Schedule follow-up if appropriate.
4. No external escalation.

**Documentation.**

- Routine clinical note in OptiMantra: symptom, guidance provided, follow-up plan
- **No** SOP-008 AE Register entry
- **No** operational incident log entry

**Reassessment trigger.** If symptoms progress, worsen, or fail to respond to guidance, re-enter the decision tree and reassess for upgrade to Tier 2+.

---

## MEDICAL TIER 2 — Moderate

**Action path.**

1. **Decision** `[CLINICAL — PENDING COVERING PHYSICIAN: which option is the default?]`:
   - **Option A**: Schedule expedited sync visit with Covering Physician (or backup if Covering Physician unavailable) for clinical assessment.
   - **Option B**: Direct referral to urgent care or patient's PCP if telehealth assessment is insufficient.
2. Reaffirm Bloom does not provide urgent in-person care.
3. Coordinate with patient to ensure they have transportation and access to the recommended evaluation.

**Documentation.**

- OptiMantra clinical note documenting tier determination, action path chosen, rationale
- **SOP-008 AE Register entry** per [SOP-008 §5.3](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) standard handling
- Cross-reference between OptiMantra note and AE Register entry

**Covering Physician notification.** Per SOP-008 §5.3 standard.

**Disposition.** Continued active care during evaluation. No automatic pause. If urgent-care referral results in diagnosis affecting metabolic care eligibility under SOP-003, address per eligibility framework.

---

## MEDICAL TIER 3 — Severe

**Action path.**

1. **Immediate referral to emergency services** during the interaction.
2. Instruct patient to call 911 OR proceed directly to nearest ED.
3. **Warm handoff** — if in a sync visit, remain on the line until emergency services are dispatched AND patient is in active connection (call placed, ambulance en route, or patient en route to ED with confirmed transportation).
4. Bloom does **NOT** transport.

**Documentation.**

- OptiMantra clinical note with detailed timeline of recognition, action, and warm-handoff confirmation
- **SOP-008 AE Register entry** per [SOP-008 §5.4](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) SAE handling
- Cross-reference between OptiMantra note and AE Register entry

**Covering Physician notification.** Within **4 hours** per SOP-008 §5.4.

**Pause status?** `[CLINICAL — PENDING COVERING PHYSICIAN: default decision]`. Working presumption: Tier 3 events trigger pause pending Covering Physician review of ED outcome and clinical reassessment of fitness for current metabolic regimen.

**Follow-up.** Bloom contacts patient within 24-48 hours post-event to confirm outcome of ED evaluation and coordinate next steps (continue, modify, or terminate Bloom care plan).

---

## MEDICAL TIER 4 — Life-Threatening / Active Emergency

**Action path.**

1. **Call 911 immediately.** During a sync visit, the clinician calls 911 (or instructs another personnel member to call on a second line) while remaining on the patient's visit.
2. **Provide patient location** — confirmed location from sync visit start per SOP-005. If location was not confirmed (a SOP-005 protocol violation), see [SOP-010 §5.4.7](../SOP-010-emergency-mental-health-escalation.md) for unknown-location protocol.
3. **Stay on the line** until emergency services arrive on scene OR patient is in active connection with emergency personnel.
4. Where the sync visit drops mid-event, follow [SOP-010 §5.4.1](../SOP-010-emergency-mental-health-escalation.md) protocol.

**Documentation.**

- OptiMantra clinical note with detailed timeline including all 911 communications
- **SOP-008 AE Register entry** per [SOP-008 §5.5](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) sentinel event handling
- **Video/audio capture** from telehealth platform retained per SOP-008 documentation standards
- Cross-reference between OptiMantra note and AE Register entry

**Covering Physician notification.** Within **2 hours** per SOP-008 §5.5.

**FDA MedWatch reporting consideration** per [SOP-008 §5.9](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) where the event may be drug-related.

**Pause status.** Automatic pause per SOP-010 §5.6. Patient cannot return to active care without Covering Physician approval via re-entry pathway (§5.11).

**Follow-up.** Bloom monitors the patient's status via available channels (family contact with consent, hospital communication with HIPAA authorization, patient self-report once accessible). Quality-improvement review per [SOP-008 §5.12](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) and SOP-008 sentinel event RCA framework.

---

## Summary Table

| Tier | Severity | Response | Pause? | SOP-008 | CP Notify |
| --- | --- | --- | --- | --- | --- |
| 1 | Mild | Bloom guidance, patient self-manage | No | No | N/A |
| 2 | Moderate | Sync visit OR urgent care referral | No (default) | Yes (§5.3) | Standard |
| 3 | Severe | 911 or ED referral with warm handoff | Default yes `[CLINICAL — PENDING]` | Yes (§5.4) | 4 hours |
| 4 | Life-threatening | 911 immediately, stay on line | Automatic | Yes (§5.5) | 2 hours |

---

## Cross-References

- [SOP-010 §5.2 — Medical Emergency Framework](../SOP-010-emergency-mental-health-escalation.md) — body-level framework this attachment operationalizes
- [SOP-010 §5.4 — Telehealth-Specific Failure Modes](../SOP-010-emergency-mental-health-escalation.md) — handling for sync-visit drops, unknown location, etc.
- [SOP-010 §5.6 — Pause Protocol](../SOP-010-emergency-mental-health-escalation.md) — what pause entails
- [SOP-008 §5.3](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) (standard AE), [§5.4](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) (SAE), [§5.5](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) (sentinel)
- [Attachment A — Crisis Resource Card](attachment-A-crisis-resource-card.md) — patient-facing resources for handoff
- [Attachment D — Telehealth Sync Visit Crisis Protocols](attachment-D-telehealth-sync-visit-crisis-protocols.md) — scripted responses for sync-visit-specific failure modes

---

*Bloom Metabolics — Confidential — SOP-010 Attachment B — v0.1 — 2026-05-24*
