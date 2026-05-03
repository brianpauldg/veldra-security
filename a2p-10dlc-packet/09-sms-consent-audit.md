# A2P 10DLC — SMS Consent Infrastructure Audit

**Audit date:** 2026-05-03
**Codebase:** bloommetabolics (Next.js 14, App Router, TypeScript, Tailwind v4)
**Database:** Supabase
**Deployment:** Vercel

---

## Framework & Stack

| Component | Value |
|-----------|-------|
| Framework | Next.js 14, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4, Framer Motion |
| Database | Supabase (already has `consent_records` table) |
| Auth | Supabase Auth Helpers (clinic admin) |
| Payments | Stripe |
| Email | Resend |
| Form library | react-hook-form + zod |

---

## Page-by-Page Findings

### `/privacy` — EXISTS

- **File:** `app/privacy/page.tsx` (205 lines, server component)
- **Sections:** 17 total (Introduction → Contact Info)
- **Has HIPAA section?** Yes (Sections 6, 12)
- **Has CCPA/CPRA?** Yes (Sections 10–11)
- **Has SMS section?** **NO — this is the gap.** File 05's SMS section needs to be inserted.
- **Has vendor table?** Yes (Supabase, Stripe, OptiMantra, Calendly, Resend)
- **Last updated date in source:** April 29, 2026
- **Has "Draft for Attorney Review" banner:** Yes

**Action required:** Insert the full SMS/Text Messaging Communications section from `05-privacy-policy-sms-section.md` as a new top-level section.

---

### `/terms` — EXISTS

- **File:** `app/terms/page.tsx` (91 lines, server component)
- **Sections:** 10 total (Acceptance, Services, Eligibility, Geo Availability, Medical Disclaimers, Payments, User Responsibilities, Technology, Limitation of Liability, Changes, Contact)
- **Has SMS Communications section?** **NO — gap**
- **Has Telehealth consent section?** Partial (Section 4 Medical Disclaimers is brief)
- **Has Dispute Resolution / Arbitration?** No
- **Has Intellectual Property?** No
- **Has Indemnification?** No
- **Has Prohibited Conduct?** No

**Action required:** At minimum, add an SMS Communications section. Ideally expand to cover all 17 sections from the task spec — but the terms page is thin (10 sections vs. 17 required).

---

### `/contact` — EXISTS, FUNCTIONAL, MEETS REQUIREMENTS

- **File:** `app/contact/page.tsx` (183 lines, client component)
- **Has functional contact form?** Yes — Name, Email, Phone (optional), Subject dropdown, Message
- **Posts to:** `/api/contact` route (exists and works)
- **Has sidebar with contact info?** Yes — email (brian@bloommetabolics.com), response time, emergency disclaimer
- **Already imports TCPAConsent component:** Yes (email marketing consent on contact form)

**Action required:** None for A2P compliance. Optionally add support phone and business address placeholders.

---

## Consultation / Intake Form Findings

### Two separate form entry points:

**1. TRT Quiz** — `app/quiz/page.tsx`
- 12-question symptom assessment
- Captures email + email consent only
- No phone number field
- No SMS consent
- Posts to `/api/leads`

**2. TRT Intake Form** — `app/intake/trt/page.tsx`
- 7-step clinical intake wizard (personal info, symptoms, medical history, hormone history, lifestyle, goals, risks/consent)
- Posts to `/api/intake`
- **No SMS consent checkbox anywhere in the intake flow**
- **No phone number field**
- **No `TCPAConsent` component imported**

**3. GLP-1 Intake Form** — `app/intake/glp1/page.tsx`
- Separate intake (not yet audited in detail but likely same pattern)

**Action required:** Add phone number field to Step 1 (Personal Information) and SMS consent checkbox to Step 7 (Risks & Consent) of the intake wizard. Both TRT and GLP-1 intakes need this.

---

## Existing Consent Infrastructure

### Already built and partially deployed:

**Consent text store:** `lib/consent-text.ts`
- Versioned consent text with `sms_text` and `email_text` fields
- Current version: `1.0.0` (effective 2026-04-28)
- **Problem:** The `sms_text` does NOT match File 04. It's a shorter, non-TCPA-compliant version:
  > "I agree to receive text messages from Bloom Metabolics at the phone number provided. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe. Reply HELP for help. View our Terms of Service at bloommetabolics.com/terms."
- **Required (File 04, Section A):**
  > "By checking this box, I consent to receive recurring automated SMS and text messages from Bloom Metabolics at the phone number provided, including appointment reminders, care updates, and intake follow-ups. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for assistance at any time. Consent to marketing messages is not required to receive care or purchase services. View our Privacy Policy and Terms of Service."

**Consent UI component:** `components/TCPAConsent.tsx`
- Dual checkbox component (email + SMS)
- SMS checkbox exists but only renders when `requiresSMS={true}` is passed
- **No form currently passes `requiresSMS={true}`**

**Consent logging API:** `app/api/leads/route.ts` (lines 89–129)
- Already writes consent records to Supabase `consent_records` table
- Captures: `user_email`, `user_phone` (encrypted), `consent_type`, `consent_version`, `granted`, `form_id`, `ip_address`, `user_agent`
- Phone numbers encrypted with AES-256-GCM when `ENCRYPTION_KEY` is set
- Non-blocking (consent persistence failure doesn't block lead capture)

**Consent records table schema (inferred from code):**

| Column | Type | Notes |
|--------|------|-------|
| user_email | text | Lead's email |
| user_phone | text | Encrypted phone number |
| consent_type | text | 'email' or 'sms' |
| consent_version | text | e.g., '1.0.0' |
| granted | boolean | Always true at time of capture |
| form_id | text | Source form identifier |
| ip_address | text | From x-forwarded-for header |
| user_agent | text | Browser user agent |

**Missing from schema (recommended additions):**
- `consent_language_text` — full text snapshot of what the user agreed to
- `created_at` — timestamp (may exist as Supabase default)
- `page_url` — URL where consent was captured

---

## Key Gaps Summary

| What | Status | Work Needed |
|------|--------|-------------|
| `/privacy` | Exists | Insert SMS section from File 05 |
| `/terms` | Exists | Add SMS Communications section + expand missing sections |
| `/contact` | Exists, functional | Meets requirements — no changes needed |
| SMS consent checkbox | Component exists, wrong text | Update `lib/consent-text.ts` to match File 04 verbatim |
| Consent logging | Already built | Already writes to `consent_records` in Supabase |
| Intake form SMS consent | Missing | Add phone field + SMS consent checkbox to intake wizard |
| Consent text version | `1.0.0` | Bump to `2.0.0` with File 04 text |

---

## Decisions Needed Before Phase 2

1. **Privacy policy SMS section placement:** Insert as which section number? Suggested: Section 7 (after Breach Notification, before Complaints), shifting remaining sections down.

2. **Terms of service scope:** Expand fully to 17 sections per task spec, or just add SMS Communications section and leave the rest for later?

3. **Intake form SMS consent placement:** Add phone number field to Step 1 (Personal Information) and SMS consent checkbox to Step 7 (Risks & Consent)?

4. **Consent version bump:** Update `lib/consent-text.ts` from `1.0.0` to `2.0.0` with the File 04 TCPA-compliant text?
