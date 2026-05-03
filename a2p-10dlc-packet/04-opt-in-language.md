# A2P 10DLC — Opt-In Language

## A. Web Form Checkbox Text

Place this adjacent to an **unchecked-by-default** checkbox on the consultation request form. The form must not submit successfully unless this checkbox is selected.

---

> ☐ By checking this box, I consent to receive recurring automated SMS and text messages from Bloom Metabolics at the phone number provided, including appointment reminders, care updates, and intake follow-ups. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for assistance at any time. Consent to marketing messages is not required to receive care or purchase services. View our [Privacy Policy](https://bloommetabolics.com/privacy) and [Terms of Service](https://bloommetabolics.com/terms).

---

**Implementation notes:**
- Checkbox MUST be unchecked by default (no pre-checked boxes — TCPA requirement)
- The consent text must be visible without scrolling (not buried in a modal or behind a "read more" link)
- The Privacy Policy and Terms links must be functional and resolve to live pages at submission time
- Log the timestamp, IP address, and exact consent language version when the box is checked (for records)

---

## B. Verbal Opt-In Script (Outbound Calls)

For use by Bland.ai or human qualification representatives during outbound calls.

---

**Representative reads:**

> "Before we continue, I'd like to let you know that Bloom Metabolics may send you automated text messages regarding your care, including appointment reminders, intake follow-ups, and check-ins. Message frequency varies. Message and data rates may apply. You can reply STOP at any time to opt out, or HELP for assistance. Do I have your permission to send you automated text messages at this number?"

**Wait for explicit response.**

- If **YES** (or clear affirmative): "Great, thank you. You'll receive a confirmation text shortly."
- If **NO** (or unclear/hesitant): "No problem at all. We'll communicate with you by email only. Let's continue."

---

**Implementation notes:**
- The affirmative response must be logged with timestamp in the CRM/call record
- If using Bland.ai, configure the intent detection to require a clear affirmative ("yes", "yeah", "sure", "that's fine") — do NOT treat silence or ambiguous responses as consent
- If the patient says "maybe" or "I'll think about it," treat as a NO
- Store the call recording or transcript as evidence of verbal consent

---

## C. Double Opt-In Confirmation Message

Sent immediately (within 60 seconds) after opt-in is captured via either method above.

---

> Bloom Metabolics: You're confirmed to receive SMS care updates. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out.

---

**Character count:** 151

**Implementation notes:**
- This message must be the FIRST message sent to the number — no other message should precede it
- Send within 60 seconds of consent capture to establish the communication relationship immediately
- If this message fails to deliver (invalid number, carrier block), do NOT send any subsequent messages — flag the contact for manual review
- This message itself does not require a reply to complete opt-in (it's confirmation, not double opt-in gate) — the consent was already captured via checkbox or verbal confirmation
