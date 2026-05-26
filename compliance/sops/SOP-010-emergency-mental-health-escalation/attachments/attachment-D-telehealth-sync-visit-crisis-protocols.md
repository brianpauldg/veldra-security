---
attachment_id: "SOP-010 Attachment D"
title: "Telehealth Sync Visit Crisis Protocols"
parent_sop: "SOP-010 (Emergency & Mental Health Escalation)"
version: "0.1"
last_updated: "2026-05-24"
intended_use: "Scripted response cards for telehealth-specific crisis failure modes. Used by clinicians during synchronous video visits when telehealth-specific failure modes intersect with crisis events. Companion to SOP-010 §5.4."
classification: "INTERNAL — CLINICAL USE ONLY"
---

# Telehealth Sync Visit Crisis Protocols

**Clinician Response Cards** · **SOP-010 Attachment D** · **v0.1**

This attachment provides scripted response cards for each of the eight telehealth-specific failure modes addressed in [SOP-010 §5.4](../SOP-010-emergency-mental-health-escalation.md). Scripted verbal language is `[OPERATIONAL — PENDING MSO OWNER]` and will be refined during MSO Owner review for tone, length, and platform compatibility. Clinical judgment calls are `[CLINICAL — PENDING COVERING PHYSICIAN]`.

Each card follows the same structure: **Recognition · Immediate Verbal · Immediate Action · Follow-up · Documentation**.

---

## Card 1 — Sync Visit Drops Mid-Crisis

**Recognition cues.**
- An active crisis interaction (any Tier 3 or Tier 4 indicator surfaced) terminates due to network failure, platform failure, patient hangup, patient device failure, or unclear cause
- Distinguish from §5.4.2 unresponsiveness — here, the connection is terminated; there, the connection persists but the patient is unresponsive

**Immediate verbal (before drop, if drop is anticipated).** `[OPERATIONAL — PENDING MSO OWNER: confirm tone]`
> "If we lose connection, I want you to call 911 right now if you're in immediate danger, or text or call 988. I'm going to call your phone the moment we drop. Stay where you are if you can."

**Immediate action.**
1. **Attempt immediate reconnect** via the telehealth platform (one or two attempts).
2. **Call the patient's phone number on file** — both the cell number from SOP-002 enrollment and any alternate numbers.
3. **If neither succeeds within `[OPERATIONAL — PENDING MSO OWNER: define reconnect attempt window, suggested 3 minutes]`** → call 911 with patient's last-known location (confirmed at visit start per [SOP-005](../../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md)). The clinician on the visit makes the 911 call.
4. **Notify Covering Physician** (if clinician on visit was not Covering Physician) immediately.

**Follow-up.**
- Continue attempts to reach patient. Document every attempt with timestamp.
- If contact re-established, resume the visit and re-assess.
- If contact not re-established within `[OPERATIONAL — PENDING MSO OWNER: total attempt window, suggested 30 minutes]`, escalate to emergency contact on file (patient consented at enrollment under SOP-002).

**Documentation.**
- SOP-008 AE Register entry regardless of outcome — sync-visit drop during active crisis is itself a documentable incident per [SOP-008 §5.4 or §5.5](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) depending on tier at disconnection.

---

## Card 2 — Patient Becomes Unresponsive On Video

**Recognition cues.**
- During a sync visit, patient stops responding to verbal prompts
- Patient loses postural tone (slumps), appears unresponsive on camera, audio dropout where the patient is unaware they cannot be heard, technical issue
- Could indicate: medical emergency (syncope, seizure, overdose, cardiac), intentional disconnection, intoxication-related loss of consciousness, technical issue

**Immediate verbal.** `[OPERATIONAL — PENDING MSO OWNER]`
> "[Patient name], can you hear me? Can you respond?" (Repeat 2-3 times at 15-second intervals.)
> "[Patient name], I'm going to call 911 if you don't respond. [Patient name], if you can hear me but can't speak, give me any sign — move your hand, blink, anything."

**Immediate action.**
1. **Verbal verification.** Call out to patient via sync visit. Watch for any response — verbal, postural, gestural.
2. **If no response within `[CLINICAL — PENDING COVERING PHYSICIAN: define threshold, suggested 30 seconds with continued attempts at 15-second intervals]`** → treat as Medical Tier 4 / MH Tier 4 event.
3. **Call 911** with last-known location. Provide all relevant clinical context (current medications, known conditions, last visible state).
4. **Remain on the sync visit** until emergency services arrive on scene OR patient regains responsiveness.
5. **Notify Covering Physician** immediately if not on visit.

**Follow-up.**
- Same as Card 1 — continue attempts to reach patient, document, escalate to emergency contact if not re-established.

**Documentation.**
- SOP-008 AE Register entry per [§5.5 sentinel event handling](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md).

---

## Card 3 — Patient Discloses Location of Means of Self-Harm

**Recognition cues.**
- During an interaction, patient discloses access to firearms, stockpiled medications, or other specific means of self-harm
- Disclosure occurs in combination with suicidal ideation (passive or active)
- Presence of identified means significantly elevates clinical concern

**Immediate verbal.** `[OPERATIONAL — PENDING MSO OWNER]`
> "Thank you for telling me. That takes courage. I'm going to ask you to do something specific right now."
> [If firearm:] "Is there someone — a family member, a friend, anyone — who can hold the firearms for you tonight? Or can we secure them in a way you can't access quickly?"
> [If stockpiled medications:] "Can you flush those medications right now, while we're talking? Or pour them into something so they're not usable?"
> [If other means:] "Tell me what we can do together right now to make those means less accessible to you."

**Immediate action.**
1. **Within the same interaction**, ask patient to remove or secure the means. `[CLINICAL — PENDING COVERING PHYSICIAN: confirm whether within-visit ask is appropriate standard; alternative approaches may involve immediate welfare check.]`
2. **Connect to 988 with warm handoff** during the same interaction — call 988 on a second line, introduce the patient, transition the conversation to the 988 counselor.
3. **Tarasoff assessment** if there is also disclosure of threat to identified third party (escalate to Tarasoff branch in Attachment C).
4. **Notify Covering Physician** immediately if not on visit.

**Follow-up.**
- Confirm via follow-up message within 24 hours that means were secured or removed.
- If unable to confirm, escalate per Card 1 escalation pathway.

**Documentation.**
- SOP-008 AE Register entry per [§5.4 or §5.5](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) depending on tier.
- Document the specific means and patient's stated plan for securing/removing them.

---

## Card 4 — Patient Is Intoxicated During Visit

**Recognition cues.**
- Slurred speech, impaired coordination visible on camera
- Apparent disorientation
- Behavior/content inconsistent with patient's known baseline
- Self-disclosure of recent substance use sufficient to impair the visit

**Immediate verbal.** `[OPERATIONAL — PENDING MSO OWNER]`
> "I'm noticing you may have had something to drink/used [substance] today. I want to be transparent — I don't think it's safe or helpful for me to make clinical decisions with you right now. Let's reschedule for when you're sober, but I want to make sure you're safe right now before we end."
> [If safety concern:] "Are you alone right now? Is there someone with you?"
> [If alone and impaired:] "I'd like to make sure someone knows where you are tonight. Can I help arrange that?"

**Immediate action.** Per `[CLINICAL — PENDING COVERING PHYSICIAN: suggested default — do not conduct substantive clinical care during intoxicated state.]`
1. **End or do not initiate the substantive clinical portion of the visit.**
2. **Confirm patient safety** — alone? with sober person? in safe location?
3. **If safety concern present**, escalate per Medical Tier 3 or MH Tier 3 framework.
4. **If substance use is the presenting concern**, provide Crisis Resource Card; offer warm handoff to SAMHSA helpline (1-800-662-4357).
5. **Notify Covering Physician** if not on visit.

**Follow-up.**
- Reschedule substantive visit for a sober date.
- If pattern of intoxication during visits emerges `[OPERATIONAL — PENDING MSO OWNER: define threshold for pattern recognition]`, Covering Physician reviews fitness for continued Bloom care.

**Documentation.**
- SOP-008 consideration per [§5.3 or §5.4](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) depending on tier.
- Pattern documentation for quality-improvement review.

---

## Card 5 — Async Message Contains Crisis Content Outside Business Hours

**Recognition cues.**
- Patient sends a secure portal message, email, or voicemail outside business hours
- Content contains crisis indicators: suicidal ideation in any form, active medical emergency description, threats to others, etc.

**Immediate verbal.** N/A — async context. Patient receives auto-acknowledgment per portal configuration.

**Auto-acknowledgment language (in patient portal auto-response).** `[OPERATIONAL — PENDING MSO OWNER: refine language]`
> "Thank you for your message. **If you are in immediate danger, please call 911.** **For mental health crisis, please call or text 988 right now.** Bloom monitors portal messages during business hours; your message will be reviewed at the start of the next business day. We are not equipped to respond to crisis events in real time. If your situation requires immediate care, please use 911 or 988 now."

**Immediate action — operational coverage model.** `[OPERATIONAL — PENDING MSO OWNER: determine after-hours coverage model. Options:`
- **(a) MSO Owner monitors after-hours messages** with escalation to Covering Physician for crisis content
- **(b) Automated triage with auto-response and after-hours service relationship**
- **(c) Explicit "messages not monitored after hours" patient communication and 988/911 instruction]`

**Interim default until coverage model is set.**
1. Patient portal auto-response (above) on every message
2. MSO Owner reviews after-hours messages at the start of the next business day (or earlier if practicable)
3. Crisis content routed per the §5.3 framework upon review

**Follow-up.**
- Once message reviewed, contact patient via channel they used (or by phone) to confirm current safety status.
- Proceed per applicable tier framework.

**Documentation.**
- SOP-008 event documentation per applicable tier framework.
- Operational incident log entry for after-hours coverage performance review (was the auto-response sufficient? Was the morning-review timing adequate to the situation?).

---

## Card 6 — Patient Refuses 911 Dispatch Despite Tier 3/4 Criteria

**Recognition cues.**
- During a sync visit or active engagement, Covering Physician (or clinician on visit) determines that Tier 3 or Tier 4 criteria are met
- Clinician recommends 911 dispatch
- Patient refuses

**Immediate verbal.** `[OPERATIONAL — PENDING MSO OWNER]`
> "I hear that you don't want me to call 911. I want to understand — can you tell me why?"
> [After listening:] "I'm worried about you. From what I'm seeing/hearing, I think you need more help than I can give you right now. Help me understand what would help — would [alternative resource] feel okay?"
> [If refusing all options:] "I understand. Let me be transparent — if I believe you're in immediate danger, I may need to call 911 anyway. Tell me what you're thinking about right now."

**Immediate action.**
1. **Clarify refusal — informed or impaired?**
   - **Informed refusal** (capacity intact, refusing despite understanding the risk): document, continue warm handoff to less-acute resources (988, mental health provider, primary care), continue to advise emergency services.
   - **Impaired refusal** (incapacity, refusing because of the condition for which they need help): escalate to 911 over patient's objection. `[CLINICAL — PENDING COVERING PHYSICIAN: criteria for capacity assessment in this context.]`
2. **For active medical emergency (Medical Tier 4)** with refusal: Covering Physician determines whether to call 911 despite refusal. Bloom does not have direct legal authority to dispatch over the patient's objection for medical emergencies, but is also not legally obligated to honor a refusal when patient is actively dying. `[PENDING COUNSEL VALIDATION]`
3. **Welfare check** as an alternative — non-emergency line where the patient is not in active emergency but is in danger.
4. **Notify Covering Physician** immediately if not on visit.

**Follow-up.**
- Continue engagement with patient as long as possible.
- Document refusal in detail (time, content, capacity assessment, alternative resources accepted).
- Quality-improvement review of refusal events.

**Documentation.**
- SOP-008 event per applicable tier.
- Refusal documentation in OptiMantra with clinical capacity assessment.

---

## Card 7 — Patient Location Unknown

**Recognition cues.**
- Location was not confirmed at start of sync visit (a SOP-005 protocol violation per [SOP-005](../../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md))
- A crisis event surfaces during the visit requiring 911 dispatch
- Clinician realizes location is unknown when preparing to dispatch

**Immediate verbal.** `[OPERATIONAL — PENDING MSO OWNER]`
> "[Patient name], I need to ask you something urgently — where are you right now? What's your physical address? Can you look around and tell me anything that would help locate you?"

**Immediate action.**
1. **Ask patient their physical location now.**
2. **If unable to obtain** (incoherent, refusing, unable to perceive surroundings), use the address on file from SOP-002 enrollment as the location for 911 dispatch, with a note to the dispatcher that location is unconfirmed and patient may be elsewhere.
3. **Where patient is on known device with GPS**, request the patient enable location sharing in the telehealth platform if the platform supports it.
4. **Call 911 with best-available location information.**

**Follow-up.**
- Quality-improvement review of SOP-005 location-confirmation step.
- Root-cause analysis per [SOP-008 §5.12](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) if location confirmation is being skipped in practice.

**Documentation.**
- SOP-008 event per applicable tier.
- Documented violation of SOP-005 location-confirmation requirement (operational improvement opportunity).

---

## Card 8 — Patient Is In a State Other Than California During Crisis

**Recognition cues.**
- During the interaction, it becomes apparent the patient is physically located in a state other than California
- Patient may have moved, be traveling, or never disclosed actual location
- May surface during location confirmation at visit start (SOP-005) or during the crisis itself

**Immediate verbal.** `[OPERATIONAL — PENDING MSO OWNER]`
> "I see you're in [state]. I need you to know something important — Bloom's California license doesn't authorize me to provide care to you while you're outside California. But right now, you're in crisis, and that takes priority. Let me help you get connected to care in [state]."

**Immediate action.** Crisis response priorities supersede licensure concerns during an active life-threatening event.
1. **Call 911 for the state the patient is in** — 911 is universal across U.S.
2. **Coordinate with local emergency services** — provide patient identity, location, and clinical context.
3. **988** is national and works from any state — provide as primary mental health resource.
4. **Document the out-of-state location.**
5. **Notify Covering Physician** immediately.

**Follow-up.**
- Bloom's California medical license does not authorize care of patients located outside California.
- Out-of-state crisis events surface significant licensure-relevant concerns that the Covering Physician addresses in consultation with healthcare counsel.
- `[PENDING COUNSEL VALIDATION: out-of-state crisis event handling, including documentation, mandated reporting in the patient's actual state, Tarasoff applicability under the patient's actual state's laws, and disposition of the ongoing Bloom care relationship.]`

**Documentation.**
- SOP-008 event per applicable tier.
- Pause status invoked while licensure question is resolved.
- Re-entry per §5.11 will require establishing whether Bloom can continue to care for the patient at all.

---

## Universal Documentation Standard (All Cards)

For every event documented under any of these cards:

- **Timestamp every action** — recognition, verbal exchange, 911 call placed, 911 arrival confirmed, warm-handoff completion, follow-up calls
- **Capture verbatim or near-verbatim** the patient's relevant statements (especially for Tarasoff or 5150-relevant content)
- **Capture clinician's clinical assessment** in addition to the actions taken
- **Cross-reference** to SOP-008 AE Register entry where applicable
- **Cross-reference** to OptiMantra clinical note
- **Video/audio capture** from telehealth platform retained where the event meets SOP-008 §5.5 sentinel event criteria

---

## Cross-References

- [SOP-010 §5.4 — Telehealth-Specific Failure Modes](../SOP-010-emergency-mental-health-escalation.md) — body-level framework this attachment operationalizes
- [SOP-005 — Synchronous Telehealth Visit](../../SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md) — visit-start location confirmation is the prerequisite for these protocols
- [Attachment B — Medical Emergency Decision Tree](attachment-B-medical-emergency-decision-tree.md)
- [Attachment C — Mental Health Crisis Decision Tree](attachment-C-mental-health-crisis-decision-tree.md)
- [Attachment A — Crisis Resource Card](attachment-A-crisis-resource-card.md)
- [SOP-008 §5.4 / §5.5](../../SOP-008-adverse-event-reporting/SOP-008-adverse-event-reporting.md) — AE Register and sentinel event handling

---

*Bloom Metabolics — Confidential — SOP-010 Attachment D — v0.1 — 2026-05-24*
