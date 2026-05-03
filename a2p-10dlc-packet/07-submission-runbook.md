# A2P 10DLC — Submission Day Runbook

## Prerequisites (Must Be Complete Before Starting)

| Prerequisite | Status |
|-------------|--------|
| PC entity registered with California Secretary of State | ☐ |
| EIN received from IRS (CP 575 or 147C letter in hand) | ☐ |
| HIPAA BAA signed with GoHighLevel | ☐ |
| bloommetabolics.com live and resolving | ☐ |
| Privacy policy published at /privacy with SMS section | ☐ |
| Terms of service published at /terms | ☐ |
| Consultation form live with SMS consent checkbox | ☐ |
| Support email active and monitored | ☐ |
| Support phone number active | ☐ |

---

## Step 1: Pre-Flight Verification (30 minutes)

1. Confirm all sample messages are transactional/care-related — Customer Care use case does not permit promotional content
2. Open bloommetabolics.com in an incognito browser — confirm it loads
3. Navigate to /privacy — confirm SMS section is visible
4. Navigate to /terms — confirm page loads
5. Navigate to consultation form — confirm SMS checkbox is present, unchecked by default, and consent text matches `04-opt-in-language.md` Version A
6. Click Privacy Policy and Terms links in the consent text — confirm they resolve
7. Run through `06-review-checklist.md` — all boxes must be checked
8. Screenshot the form with consent checkbox for your records

---

## Step 2: Brand Registration in GoHighLevel

**Navigation:** GoHighLevel → Settings → Phone Numbers → Trust Center → A2P Registration

### 2a. Business Profile

1. Select "Register New Brand"
2. Entity type: **Private Company**
3. Enter legal company name: `[EXACT LEGAL NAME]` — copy/paste from EIN letter
4. Enter EIN: `[EIN]`
5. Business industry: **Healthcare**
6. Enter website: `https://bloommetabolics.com`
7. Enter business address (must match state filing)
8. Enter authorized representative details
9. Review all fields against `01-business-profile.md`
10. Submit brand registration

**Expected timeline:** Brand verification typically completes in 1-5 business days. Healthcare brands may take up to 7 business days.

**Brand Trust Score:** Healthcare verticals typically receive a secondary vetting score. A score of 75+ is passing. Scores below 50 will be rejected.

---

## Step 3: Campaign Registration

**Do not start until brand registration is approved.** You'll receive an email/notification from GoHighLevel.

1. Select your approved brand
2. Choose "Register New Campaign"
3. Campaign use case: **Customer Care**
4. Campaign vertical: **Healthcare**
5. Paste campaign description from `02-campaign-registration.md`
6. Paste message flow description from `02-campaign-registration.md`
7. Subscriber opt-in: **Yes**
8. Subscriber opt-out: **Yes**
9. Subscriber help: **Yes**
10. Number pooling: **No**
11. Direct lending: **No**
12. Embedded link: **Yes**
13. Embedded phone: **No**
14. Age-gated: **No**
15. Enter sample messages from `03-sample-messages.md` (all 5)
16. Enter HELP response from `02-campaign-registration.md`
17. Enter STOP response from `02-campaign-registration.md`
18. Review everything one final time
19. Submit campaign registration

**Expected timeline:** Campaign approval typically takes 3-15 business days. Healthcare Customer Care campaigns average 5-8 business days.

---

## Step 4: If Brand Registration Fails

| Rejection reason | Action |
|-----------------|--------|
| Legal name mismatch | Compare submitted name against EIN letter character-by-character. Resubmit with exact match. |
| EIN not found | Verify EIN is active with IRS. If entity was recently formed, wait 2-4 weeks for IRS database propagation. |
| Website not accessible | Confirm DNS, SSL, and hosting are active. Test from multiple networks. |
| Insufficient web presence | Add more content to the website (about page, services, contact info). Resubmit after 48 hours. |
| Address mismatch | Use the exact address from your state Secretary of State filing. |

**Resubmission wait:** After a brand rejection, wait at least 24 hours before resubmitting. Multiple rapid resubmissions can flag your account.

---

## Step 5: If Campaign Registration Fails

| Rejection reason | Action |
|-----------------|--------|
| Sample messages non-compliant | Review messages against carrier guidelines. Common issues: missing brand name, missing STOP language, URL shorteners, medication names. Fix and resubmit. |
| Opt-in flow unclear | Add more detail to the message flow description. Include screenshots of your actual web form if possible. |
| Use case mismatch | Ensure declared use case (Customer Care) matches all sample messages. All messages must be transactional/care-related — no promotional content. |
| Privacy policy insufficient | Verify SMS section exists and covers all required elements per `05-privacy-policy-sms-section.md`. |
| Healthcare content concerns | Remove any references to specific conditions, medications, or outcomes. Keep all messages strictly operational. |

**Resubmission wait:** Campaign rejections can be resubmitted immediately after fixes, but allow 24 hours for reviewer rotation.

---

## Step 6: Post-Approval Steps

### 6a. Register Phone Number

1. In GoHighLevel Trust Center, assign your phone number to the approved campaign
2. Wait for number registration confirmation (usually instant, up to 24 hours)
3. Verify the number shows "Active" under the campaign

### 6b. Test SMS Delivery

1. Send a test message to your personal phone — confirm delivery
2. Send a test message to a phone on a different carrier (test at least AT&T, T-Mobile, Verizon)
3. Reply STOP — confirm opt-out response fires
4. Reply START — confirm re-subscription response fires
5. Reply HELP — confirm help response fires
6. Send a test message with a bloommetabolics.com link — confirm it's not filtered

### 6c. Monitor First 7 Days

| Day | Action |
|-----|--------|
| Day 1 | Send messages to internal team only (5-10 messages). Monitor delivery rates. |
| Day 2-3 | Begin sending to first real patients (limit 50/day). Monitor for any carrier filtering. |
| Day 4-7 | Ramp to normal volume gradually. Check delivery reports daily. |
| Day 7+ | If delivery rate > 95% and no filtering, proceed to full volume. |

**Red flags to watch for:**
- Delivery rate drops below 90%
- Messages marked as spam
- Carrier filtering (messages sent but not received)
- "30007" error codes (carrier filtering)
- "21610" error codes (recipient on blocklist)

---

## Timeline Summary

| Phase | Duration | Running total |
|-------|----------|---------------|
| Prerequisites complete | — | Day 0 |
| Brand registration submitted | Same day | Day 0 |
| Brand approval | 1-7 business days | Day 1-7 |
| Campaign registration submitted | Same day as brand approval | Day 1-7 |
| Campaign approval | 3-10 business days (Customer Care) | Day 4-17 |
| Phone number registration | 0-1 business days | Day 4-18 |
| Testing & ramp-up | 7 days | Day 11-25 |

**Best case:** Sending production messages by Day 11
**Typical case (healthcare Customer Care):** Sending production messages by Day 17-20
**Worst case (one rejection cycle):** Add 7-14 days per rejection

---

## Emergency Contacts

- GoHighLevel A2P Support: support@gohighlevel.com (or in-app chat)
- Twilio Trust Hub (if escalation needed): https://www.twilio.com/console/trust-hub
- TCR (The Campaign Registry) status: https://csp.campaignregistry.com
