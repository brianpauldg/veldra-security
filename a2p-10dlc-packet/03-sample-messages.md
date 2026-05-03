# A2P 10DLC — Sample Messages

All sample messages comply with:
- Brand identification included ("Bloom Metabolics" or "Bloom")
- Opt-out language or opt-in reference present
- Full URLs on owned domain (no shorteners)
- Under 320 characters (under 160 where possible)
- No specific medication names
- No medical claims
- No urgency/scarcity manipulation
- No SHAFT content

---

## 1. Appointment Confirmation

**Trigger:** Patient books a telehealth consultation via scheduling system.

**Message:**

> Bloom Metabolics: Your consultation is confirmed for [DATE] at [TIME] PT. Join via your patient portal: https://bloommetabolics.com/portal. Questions? Reply HELP. Reply STOP to opt out.

**Character count:** 185

**Carrier review notes:** Reviewers verify the message is clearly transactional, includes the brand name, and provides opt-out. The portal link must resolve to a live page on the declared domain.

---

## 2. Appointment Reminder (T-24h)

**Trigger:** Automated 24 hours before scheduled consultation.

**Message:**

> Bloom Metabolics: Reminder — your telehealth consultation is tomorrow at [TIME] PT. Please have your ID and completed intake form ready. Details: https://bloommetabolics.com/prepare. Reply STOP to opt out.

**Character count:** 205

**Carrier review notes:** Reminder messages are expected for healthcare. Reviewers check that it doesn't create false urgency and that the link domain matches the registered website.

---

## 3. Qualification Follow-Up

**Trigger:** Patient submits web intake form but does not complete the pre-screening questionnaire within 2 hours.

**Message:**

> Bloom Metabolics: Thanks for your consultation request. Finish your intake form to confirm your appointment: https://bloommetabolics.com/intake/continue. Reply HELP for help. Reply STOP to opt out.

**Character count:** 197

**Carrier review notes:** This is the highest-scrutiny sample. Reviewers confirm it references a prior action the recipient took (submitted intake form), is not unsolicited, and does not pressure the recipient. The message must clearly describe what the recipient will do at the link.

---

## 4. Lab Reminder

**Trigger:** Provider orders lab work; patient has not completed labs within 3 business days.

**Message:**

> Bloom Metabolics: Lab work has been ordered for you. Please visit a participating lab location at your convenience. View your lab order: https://bloommetabolics.com/portal/labs. Reply STOP to opt out.

**Character count:** 200

**Carrier review notes:** Reviewers verify this is a care-related transactional message. No mention of specific tests, conditions, or lab companies. The message directs to a patient portal, not a marketing page.

---

## 5. Post-Consult Check-In

**Trigger:** 48 hours after telehealth consultation is marked complete.

**Message:**

> Bloom Metabolics: Hi [FIRST NAME], checking in after your recent consultation. If you have questions about your care plan, message us here: https://bloommetabolics.com/portal/messages. Reply STOP to opt out.

**Character count:** 207

**Carrier review notes:** Post-visit check-ins are standard in telehealth and viewed favorably by reviewers. Must not reference specific treatments or medications. The personalization token ([FIRST NAME]) demonstrates legitimate CRM use.

---

## Compliance Summary

| # | Type | Chars | Brand ID | Opt-out | Link domain | Rx names | Claims |
|---|------|-------|----------|---------|-------------|----------|--------|
| 1 | Appt confirmation | 185 | ✓ | ✓ | bloommetabolics.com | None | None |
| 2 | Appt reminder | 205 | ✓ | ✓ | bloommetabolics.com | None | None |
| 3 | Qualification follow-up | 197 | ✓ | ✓ | bloommetabolics.com | None | None |
| 4 | Lab reminder | 200 | ✓ | ✓ | bloommetabolics.com | None | None |
| 5 | Post-consult check-in | 207 | ✓ | ✓ | bloommetabolics.com | None | None |
