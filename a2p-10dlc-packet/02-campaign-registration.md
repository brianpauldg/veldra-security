# A2P 10DLC — Campaign Registration

## Campaign Use Case: Customer Care (Healthcare)

### Use Case Justification

Bloom Metabolics is a cash-pay telehealth practice providing hormone optimization and metabolic health services to patients in California. Our SMS communications serve multiple essential functions within the patient care lifecycle: appointment scheduling and reminders, qualification follow-ups for patients who have initiated intake, lab visit coordination, and post-consultation care check-ins.

A Customer Care use case is appropriate because our message flow consists entirely of transactional, care-related communications within the patient lifecycle: appointment confirmations and reminders, intake follow-ups, lab coordination, and post-consultation check-ins. All messages are triggered by specific patient actions or clinical events, and no promotional or marketing content is sent through this campaign.

### Campaign Description

> Bloom Metabolics uses SMS to communicate with patients who have opted in via our website intake form or verbal consent during qualification calls. Messages include appointment confirmations and reminders, intake follow-ups, lab visit reminders, and post-consultation check-ins. All messages are transactional and care-related. All recipients are existing patients or leads who have explicitly consented to receive SMS communications from Bloom Metabolics.

Character count: 455

---

## Message Flow Description

### How a contact opts in:

1. **Web form opt-in:** A prospective patient visits bloommetabolics.com and submits a consultation request form. The form includes an explicit SMS consent checkbox (unchecked by default) with full TCPA-compliant disclosure language. The checkbox must be actively selected before form submission is accepted.

2. **Verbal opt-in (outbound qualification call):** A prospective patient receives an outbound qualification call from our team (or Bland.ai assistant). During the call, the representative reads a scripted verbal consent disclosure and records the patient's explicit affirmative response ("yes") before any SMS messages are sent.

### What happens after opt-in:

1. The contact immediately receives a double opt-in confirmation SMS acknowledging their consent and providing STOP/HELP instructions.
2. Based on where they are in the patient lifecycle, they will receive relevant transactional messages (appointment confirmations, reminders, lab coordination).
3. All messages are transactional and care-related — no promotional content is sent through this campaign.

### What messages they receive:

- Appointment confirmation (immediately after booking)
- Appointment reminder (24 hours before scheduled consultation)
- Intake/qualification follow-up (if intake form started but not completed)
- Lab visit reminder (after labs are ordered by provider)
- Post-consultation check-in (24-48 hours after visit)

---

## Keyword Auto-Responses

### HELP Response

> Bloom Metabolics Patient Support: For questions about your care, visit https://bloommetabolics.com/contact or email [SUPPORT EMAIL]. For SMS help, call [SUPPORT PHONE]. Msg & data rates may apply.

### STOP Response

> Bloom Metabolics: You have been unsubscribed and will no longer receive SMS messages from us. Reply START to re-subscribe. For questions, email [SUPPORT EMAIL].

### Opt-In Keywords

| Keyword | Response |
|---------|----------|
| START | "Bloom Metabolics: You have been re-subscribed to receive SMS messages. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out." |
| UNSTOP | (Same as START) |

---

## Campaign Parameters

| Field | Value |
|-------|-------|
| Subscriber opt-in | Yes |
| Subscriber opt-out | Yes |
| Subscriber help | Yes |
| Number pooling | No |
| Direct lending or loan | No |
| Embedded link | Yes (own domain only: bloommetabolics.com) |
| Embedded phone number | No |
| Age-gated content | No |
| Campaign type | Customer Care |
| Vertical | Healthcare |
