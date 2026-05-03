# A2P 10DLC — Pre-Submission Review Checklist

Run through every item the morning of submission. A single "no" is a rejection risk.

---

## Brand Registration

- [ ] Legal name in registration matches IRS EIN letter **exactly** (character-for-character, including punctuation, "PC", "Inc.", etc.)
- [ ] EIN is correct and matches the legal name
- [ ] Business address matches state records (Secretary of State filing)
- [ ] Authorized representative is an actual officer/owner of the entity (not a contractor or virtual assistant)
- [ ] Authorized representative email uses the company domain (not gmail/yahoo)
- [ ] Website URL (bloommetabolics.com) resolves and loads without errors
- [ ] Website clearly displays the brand name "Bloom Metabolics"
- [ ] Website has a visible phone number or contact method
- [ ] DUNS number (if provided) matches the legal entity

## Campaign Registration

- [ ] Campaign description is between 200-500 characters
- [ ] Campaign use case (Customer Care) matches actual message patterns
- [ ] Message flow description accurately reflects the real opt-in process
- [ ] All sample messages include the brand name "Bloom Metabolics" or "Bloom"
- [ ] All sample messages include opt-out language (Reply STOP to opt out)
- [ ] All embedded links use bloommetabolics.com (no shorteners, no third-party domains)
- [ ] Every URL in every sample message has been tested in incognito browser and returns HTTP 200
- [ ] Every URL in every sample message displays Bloom Metabolics branding (not a generic placeholder or third-party login screen)
- [ ] No sample message references specific medication names
- [ ] No sample message makes health outcome claims
- [ ] HELP keyword response includes contact information
- [ ] STOP keyword response confirms unsubscription

## Opt-In Compliance

- [ ] Website consultation form has SMS consent checkbox (unchecked by default)
- [ ] Consent checkbox language matches what's declared in the campaign registration
- [ ] Consent language mentions: brand name, recurring messages, data rates, STOP, HELP
- [ ] Privacy Policy link in consent text resolves to a live page
- [ ] Terms of Service link in consent text resolves to a live page
- [ ] Verbal opt-in script matches disclosed opt-in method in campaign registration
- [ ] Double opt-in confirmation message is configured and tested
- [ ] Web form checkbox text includes the word "automated"
- [ ] Verbal opt-in script includes the word "automated"

## Privacy Policy

- [ ] Privacy policy is publicly accessible at bloommetabolics.com/privacy (no login required)
- [ ] Privacy policy includes SMS-specific section
- [ ] SMS section states phone numbers are not sold or shared for marketing
- [ ] SMS section explains how to opt out
- [ ] SMS section mentions message frequency
- [ ] SMS section mentions message and data rates may apply
- [ ] Privacy policy was last updated within 30 days of submission
- [ ] Privacy policy SMS section includes HIPAA Compliance paragraph
- [ ] Privacy policy SMS section does not describe promotional/marketing message patterns inconsistent with declared Customer Care use case

## Healthcare Vertical — Special Considerations

- [ ] No messages reference specific controlled substances or scheduled medications
- [ ] No messages could be interpreted as medical advice
- [ ] No messages reference specific lab results or diagnoses
- [ ] Messages use service/logistics language only (appointments, reminders, check-ins)
- [ ] HIPAA BAA is signed with SMS service provider (Twilio/HighLevel)
- [ ] No PHI (Protected Health Information) appears in any sample message
- [ ] Sample messages do not reference specific treatment protocols
- [ ] All sample messages are transactional/care-related (no promotional content) — required for Customer Care use case

## Volume & Technical

- [ ] Declared message volume (~100/day scaling to ~750/day) is plausible for declared audience
- [ ] Only one phone number will be registered under this campaign initially
- [ ] No number pooling declared (consistent with single-number setup)

## Common Rejection Reasons to Double-Check

- [ ] ❌ Legal name doesn't match EIN → verify against CP 575 letter
- [ ] ❌ Website not live at time of review → confirm DNS and hosting are active
- [ ] ❌ Privacy policy not accessible → test in incognito browser
- [ ] ❌ Sample messages don't match declared use case → re-read use case description
- [ ] ❌ Opt-in flow on website doesn't match description → screenshot actual form
- [ ] ❌ Links in sample messages 404 → verify all URLs resolve
- [ ] ❌ Brand name in messages doesn't match registered brand → check capitalization

## Landing Page Verification

- [ ] `/portal` page is live and branded
- [ ] `/portal/labs` page is live and branded
- [ ] `/portal/messages` page is live and branded
- [ ] `/intake/continue` page is live and functional
- [ ] `/prepare` page is live and branded
- [ ] `/contact` page is live and functional
- [ ] `/privacy` page is live and contains SMS section
- [ ] `/terms` page is live
- [ ] All landing pages tested on mobile
- [ ] All OptiMantra deep-links from landing pages work end-to-end
