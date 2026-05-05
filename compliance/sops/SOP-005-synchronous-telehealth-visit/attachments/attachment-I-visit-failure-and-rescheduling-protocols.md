# Attachment I — Visit Failure and Rescheduling Protocols

**Parent Document:** [SOP-005 — Synchronous Telehealth Visit](../SOP-005-synchronous-telehealth-visit.md)

---

## Overview

This attachment provides step-by-step protocols for every visit failure scenario defined in SOP-005 §7. MSO staff execute these protocols without clinical judgment. Clinical decisions (whether to continue, reschedule, or terminate) remain with the Covering Physician where the visit is in progress.

---

## Protocol 1 — Identity Confirmation Failure

**Trigger:** Physician cannot confirm patient identity at visit start (§7.1).

**Steps:**
1. Physician terminates the visit and documents the reason in OptiMantra
2. MSO Owner is notified within 2 hours
3. Patient is contacted by MSO staff: "We were unable to verify your identity during today's visit. This is a required step before we can proceed. Please contact us at [support email] so we can resolve this and reschedule."
4. GHL pipeline moves to "Identity Review Hold"
5. MSO Owner reviews the identity verification from SOP-002 and the physician's visit termination note
6. Resolution: patient provides additional identity documentation → re-verify under SOP-002 §5.8 → reschedule OR patient cannot be verified → decline per SOP-003 Attachment B
7. No automatic refund. Refund decision by MSO Owner based on circumstances.

---

## Protocol 2 — Video Technical Failure (Mid-Visit)

**Trigger:** Video connection drops or degrades during an active visit (§7.2).

**Steps:**
1. Physician and patient each attempt to reconnect for up to 5 minutes
2. If reconnection succeeds: visit continues, incident documented in visit note
3. If reconnection fails: physician evaluates audio-only fallback

**Audio-only fallback decision:**

`[CLINICAL — PENDING COVERING PHYSICIAN: Define when audio-only fallback is acceptable to complete a Good Faith Examination. Suggested framework:

- Audio-only is acceptable if the visit was >50% complete at the time of video failure AND the remaining clinical discussion does not require visual assessment
- Audio-only is NOT acceptable if: the visit had not yet begun the GFE, the physician needs visual assessment for the remaining elements, or the patient is a first-time visit where visual identity confirmation has not been completed
- If audio-only is used, the physician documents: reason for fallback, what portion of the visit was completed via video, what portion via audio-only, and attestation that the GFE was sufficient despite the modality change

Physician may define stricter or more permissive rules.]`

4. If audio-only is acceptable: complete visit via audio, document modality change in visit note
5. If audio-only is not acceptable: reschedule. Patient is contacted: "We experienced a technical issue during your visit. We would like to reschedule to ensure we can provide you with a complete evaluation. There is no charge for the rescheduled visit."
6. GHL pipeline: "Visit Rescheduling — Technical Issue"

---

## Protocol 3 — Patient No-Show

**Trigger:** Patient does not join the scheduled visit within the grace period (§7.3).

**Steps:**
1. Wait 15 minutes past the scheduled start time
2. At 5 minutes: MSO staff sends a reminder via OptiMantra portal message and/or SMS
3. At 10 minutes: MSO staff attempts phone contact
4. At 15 minutes: visit is marked as no-show
5. Physician is released from the time slot
6. Patient is contacted: "We missed you at your scheduled visit today. We would like to offer you a rescheduled appointment. Please contact us at [support email] or reply to this message to reschedule."

**First no-show:** One reschedule offered at no additional charge.

**Second no-show:** Patient is contacted: "We have now missed two scheduled appointments. We understand that scheduling can be challenging. If you would like to continue with Bloom Metabolics, please contact us to reschedule. Please note that future no-shows may result in your appointment being canceled." GHL pipeline: "Patient Disengaged — No-Show"

**Third no-show:** Patient record is moved to "Archived — Repeated No-Show." Patient may re-engage by contacting the clinic and completing a new scheduling request.

---

## Protocol 4 — Mid-Visit Termination by Physician

**Trigger:** Physician terminates the visit for clinical or safety reasons (§7.4).

**Steps:**
1. Physician communicates to the patient that the visit must be concluded and provides a brief, non-confrontational reason (e.g., "I am not able to continue this visit today")
2. Physician documents the termination in OptiMantra with: reason, what was completed, clinical assessment (if any)
3. MSO Owner is notified within 2 hours
4. Patient communication is determined by the MSO Owner in consultation with the physician:
   - If the termination was for safety reasons (patient appeared impaired, threatening): no automatic rescheduling. MSO Owner reviews before any further contact.
   - If the termination was for clinical reasons (patient dishonest, refuses clinical discussion): decline notification per [SOP-003 Attachment B](../../SOP-003-clinical-eligibility-screening/attachments/attachment-B-decline-and-refer-language.md)
   - If the termination was due to clinical complexity beyond the visit scope: reschedule with noted adjustments
5. GHL pipeline: "Visit Terminated — Physician" with reason code
6. Refund: at MSO Owner discretion based on circumstances

---

## Protocol 5 — Mid-Visit Termination by Patient

**Trigger:** Patient disconnects or states they want to end the visit (§7.5).

**Steps:**
1. Physician documents what was completed before termination
2. Physician documents whether the GFE was substantially complete at the time of termination
3. If GFE was substantially complete and the physician can make a clinical determination: physician may document a determination (proceed, decline, defer) based on completed information
4. If GFE was not substantially complete: visit is treated as incomplete and rescheduling is offered
5. Patient is contacted within 24 hours: "We noticed our visit ended early today. If you would like to continue your evaluation, we are happy to reschedule. Please contact us at [support email]."
6. GHL pipeline: "Visit Incomplete — Patient Terminated"

---

## Protocol 6 — Acute Medical Emergency During Visit

**Trigger:** Patient reports or presents with emergency symptoms during the visit (§7.6).

**Steps:**
1. Physician immediately instructs patient: "Please call 911 now" or "Please go to your nearest emergency department immediately"
2. Physician stays on the call until the patient confirms 911 has been called or is en route to the ED (if possible without delaying emergency response)
3. Physician documents the emergency in OptiMantra: symptoms/signs observed, instructions given, patient response, time of emergency referral
4. MSO Owner is notified within 2 hours
5. MSO Owner documents per SOP-002 §7.4 emergency response documentation requirements: inquiry channel, symptoms, safety response, escalation status
6. Patient record is annotated with emergency encounter
7. Follow-up: MSO Owner contacts patient within 48 hours (if patient information and situation warrant) to confirm they received emergency care and to discuss next steps with Bloom Metabolics
8. No refund is automatically issued; the visit fee covers the physician's time and emergency response
9. GHL pipeline: "Emergency Referral During Visit"

---

## Protocol 7 — Telehealth Platform Outage

**Trigger:** OptiMantra-native video telehealth is unavailable (§7.7).

**Steps:**
1. MSO Owner confirms the outage (not a single-user technical issue)
2. If a pre-approved alternative HIPAA-compliant platform is available (Doxy.me, Zoom for Healthcare with BAA on file):
   - MSO staff notifies scheduled patients and physician of the platform switch
   - Provides alternative platform login instructions
   - Visit proceeds on the alternative platform
   - Visit note in OptiMantra documents: "Visit conducted on [alternative platform] due to OptiMantra outage on [date]. BAA on file."
3. If no approved alternative is available:
   - All visits scheduled during the outage window are rescheduled
   - Patients are contacted: "We are experiencing a temporary technical issue with our telehealth platform. Your visit has been rescheduled to [new date/time]. We apologize for the inconvenience."
   - GHL pipeline: "Visit Rescheduling — Platform Outage"
4. MSO Owner documents the outage: start time, end time, visits affected, alternative platform used (if any), resolution

---

## Refund Decision Authority

| Scenario | Refund Authority | Default |
| --- | --- | --- |
| Identity confirmation failure | MSO Owner | No refund (pending investigation) |
| Video technical failure (rescheduled) | MSO Owner | No additional charge for rescheduled visit |
| Patient no-show (first) | Automatic | No refund; one free reschedule |
| Patient no-show (second+) | MSO Owner | No refund |
| Mid-visit termination by physician | MSO Owner | Case-by-case |
| Mid-visit termination by patient | MSO Owner | No refund (physician time was allocated) |
| Acute medical emergency | MSO Owner | No automatic refund |
| Platform outage (rescheduled) | Automatic | No additional charge for rescheduled visit |

---

*Bloom Metabolics — Confidential*
