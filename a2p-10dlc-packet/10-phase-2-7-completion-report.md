# A2P 10DLC — Phases 2–7 Completion Report

**Date:** 2026-05-03
**TypeScript check:** PASS (0 new errors; 2 pre-existing stale cache errors from deleted billing route)

---

## Phase 2: Privacy Policy — COMPLETE

**File:** `app/privacy/page.tsx`

### Changes made:
- **Inserted new Section 7: SMS/Text Messaging Communications** — the full SMS section from `05-privacy-policy-sms-section.md`, verbatim, including all subsections:
  - What Information We Collect
  - How We Use Your Phone Number
  - Information Sharing
  - Message Frequency and Rates
  - How to Opt Out
  - How to Get Help
  - HIPAA Compliance
  - Carrier Disclaimer
  - SMS Data Retention
  - Changes to SMS Practices
  - CTIA/TCPA attribution line
- **Renumbered sections 7→8 through 16→17, adding new Section 18 (Contact Info)**
- **Updated internal cross-reference:** "as described in Section 10" → "as described in Section 11" (CPRA sensitive PI reference)
- **Updated "Last updated" date:** April 29, 2026 → May 3, 2026
- **Placeholders preserved:** `[SUPPORT EMAIL]`, `[SUPPORT PHONE]` with TODO comments

### What was NOT changed:
- All existing sections remain untouched (content, formatting, structure)
- The "Draft for Attorney Review" banner remains
- No sections were deleted or reworded

---

## Phase 3: Terms of Service — COMPLETE

**File:** `app/terms/page.tsx`

### Changes made:
- **Added Section 8: SMS Communications** — new section covering:
  - User agreement to receive recurring automated SMS
  - Message types (appointment reminders, care updates, intake follow-ups, lab coordination, check-ins)
  - Message frequency varies
  - Standard rates may apply
  - Consent not required for care
  - STOP/HELP instructions
  - Carrier liability disclaimer
  - Cross-reference to Privacy Policy Section 7
- **Added 5 stub sections** (10–14) with placeholder text "TO BE DRAFTED — Legal review required before deployment. Contact healthcare-experienced attorney to draft this section.":
  - 10. Intellectual Property
  - 11. Prohibited Conduct
  - 12. Indemnification
  - 13. Dispute Resolution and Arbitration
  - 14. Class Action Waiver
- **Renumbered** existing sections: Limitation of Liability → 9, Changes to Terms → 15, Contact → 16
- **Added "Draft for Attorney Review" banner** (matching privacy page)
- **Updated "Last updated" date:** April 2026 → May 3, 2026

---

## Phase 4: Contact Page — NO CHANGES NEEDED

**File:** `app/contact/page.tsx`

Already functional with: Name, Email, Phone (optional), Subject, Message fields. Posts to `/api/contact`. Has sidebar contact info. Meets all A2P requirements.

---

## Phase 5: Consultation Form Update — COMPLETE

### Consent Text Version Bump

**File:** `lib/consent-text.ts`

- **Bumped `CURRENT_CONSENT_VERSION`** from `1.0.0` to `2.0.0`
- **v2.0.0 SMS text** matches File 04 Section A **verbatim**:
  > "By checking this box, I consent to receive recurring automated SMS and text messages from Bloom Metabolics at the phone number provided, including appointment reminders, care updates, and intake follow-ups. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for assistance at any time. Consent to marketing messages is not required to receive care or purchase services. View our Privacy Policy and Terms of Service."
- **v1.0.0 preserved** in `LEGACY_VERSIONS` array — never deleted
- **Added `effective_from` and `effective_until` dates** to each version:
  - v1.0.0: effective 2026-04-28 → 2026-05-02
  - v2.0.0: effective 2026-05-03 → null (current)

### TCPAConsent Component Update

**File:** `components/TCPAConsent.tsx`

- **SMS consent text now renders at 14px** (was 11px) — meets minimum readability requirement
- **"Privacy Policy" and "Terms of Service" render as inline `<Link>` elements** pointing to `/privacy` and `/terms` — clickable, open in new tab
- **Existing API preserved:** `ConsentState`, `isConsentValid`, `formId`, `requiresSMS`, `requiresEmail` all work as before

### TRT Intake Form

**File:** `app/intake/trt/page.tsx`

- **Added Phone Number field** to Step 1 (Personal Information), required, with `type="tel"`
- **Added `TCPAConsent` component** to Step 1 with `requiresSMS={true}` and `requiresEmail={true}`
- **Step 1 validation:** form cannot proceed to Step 2 unless SMS consent checkbox is checked AND phone number is valid
- **Consent state flows into form data:** `smsConsent`, `emailConsent`, `consentVersion` fields set via `update()` callback
- **Error message renders below consent checkboxes** if SMS consent not checked
- **Step 7 (Risks & Consent) unchanged** — telehealth/treatment consent remains separate

### GLP-1 Intake Form

**File:** `app/intake/glp1/page.tsx`

- **Identical changes** as TRT intake: phone field + TCPAConsent in Step 1, same validation
- **GLP-1 specific content unchanged:** BMI calculator, weight history, GLP-1 medical history, MEN2/thyroid warnings all preserved
- **Step 7 (Risks & Consent) unchanged**

### IntakeWizard Validation

**File:** `components/intake/IntakeWizard.tsx`

- **Added phone format validation** on Step 1: strips formatting characters, validates US phone pattern (`+1XXXXXXXXXX` or `XXXXXXXXXX`, first digit 2-9)
- **Added SMS consent validation** on Step 1: blocks progression if `smsConsent` is falsy
- **Both validations are client-side UX guards** — server-side validation happens in API route

### Quiz Page

**File:** `app/quiz/page.tsx` — **NO CHANGES**

The quiz currently captures email only (no phone field). Since the quiz is a marketing lead-gen tool, not a consultation intake form, and there's no phone number to attach SMS consent to, it remains email-only. Adding SMS consent to the quiz would require adding a phone field, which changes the quiz UX significantly — left for a separate decision.

---

## Phase 6: Consent Logging Infrastructure — COMPLETE

### Supabase Migration

**File:** `supabase/migrations/20260503_consent_records_add_columns.sql`

Adds three columns to `consent_records`:
- `consent_language_text` (TEXT, nullable) — full text snapshot
- `consent_text_hash` (TEXT, nullable) — SHA-256 hash of consent text
- `page_url` (TEXT, nullable) — URL where consent was captured
- Index on `consent_text_hash` for audit lookups

**`created_at` already exists** in the original migration (`20260428_consent_records.sql`) — not duplicated.

### API Route Updates

**`/api/leads/route.ts`:**
- Consent record writes now populate `consent_language_text`, `consent_text_hash`, and `page_url`
- `consent_text_hash` computed server-side via `crypto.createHash('sha256')` — not client-supplied
- `page_url` captured from `Referer` header
- `consent_version` default updated from `1.0.0` to `2.0.0`

**`/api/intake/route.ts`:**
- **New consent logging block** added after intake save
- Writes consent records to `consent_records` table when Step 1 includes SMS/email consent
- Populates all three new columns
- Phone number encrypted with AES-256-GCM before storage (same `encryptFormField` pattern as form data)
- Non-blocking — consent write failure doesn't block intake save

### v1.0.0 Migration Query

Cannot run the migration query to count v1.0.0 SMS consent records without direct Supabase access. **You need to run this manually:**

```sql
SELECT COUNT(*) FROM consent_records
WHERE consent_version = '1.0.0' AND consent_type = 'sms';
```

These records remain valid and should NOT be modified.

---

## HIPAA / BAA Verification — FLAGGED

### Findings:

1. **Supabase BAA status: UNKNOWN**
   - No `.env` file contains BAA tier indicators
   - No `supabase/config.toml` or project config found in repo
   - The privacy policy vendor table (Section 14) lists Supabase BAA status as "Unconfirmed"
   - **You must verify this in the Supabase dashboard** → Settings → General → check if HIPAA add-on is enabled

2. **Vercel BAA status: UNKNOWN**
   - No Vercel project config in repo indicates tier
   - The privacy policy vendor table lists Vercel BAA status as "Unconfirmed"
   - **You must verify this in the Vercel dashboard** → check if Enterprise/HIPAA tier is active

3. **Data segregation: NOT SEGREGATED**
   - Clinical intake records (`intake_submissions`) and consent records (`consent_records`) are in the **same Supabase project** — both created in the same migration directory
   - This is acceptable if the Supabase project has a signed BAA
   - If NOT BAA-covered, consent records (email, consent type, IP) are not PHI and can stay, but clinical intake data (symptoms, medical history, medications) is PHI and needs to move to a BAA-covered store

### Action required:
- [ ] Verify Supabase HIPAA add-on is active and BAA is signed
- [ ] Verify Vercel BAA status
- [ ] If either is NOT BAA-covered, do NOT deploy the intake form changes to production until resolved

**The SMS consent work itself (consent text, checkbox, consent_records writes) does NOT collect PHI and can proceed regardless of BAA status.** The phone field on the intake form is the borderline item — phone number alone is not PHI, but phone number + medical intake data in the same request could be considered PHI in aggregate.

---

## Files Changed Summary

| File | Change |
|------|--------|
| `lib/consent-text.ts` | Full rewrite — v2.0.0 with File 04 text, legacy v1.0.0 preserved |
| `components/TCPAConsent.tsx` | Full rewrite — inline links, 14px SMS text, preserved API |
| `components/intake/IntakeWizard.tsx` | Added phone + SMS consent validation to `validateStep()` |
| `app/privacy/page.tsx` | Inserted SMS section (Section 7), renumbered 8–18, updated date |
| `app/terms/page.tsx` | Added SMS section (8), 5 stub sections (10–14), renumbered, updated date |
| `app/intake/trt/page.tsx` | Added phone field + TCPAConsent to Step 1 |
| `app/intake/glp1/page.tsx` | Added phone field + TCPAConsent to Step 1 |
| `app/api/intake/route.ts` | Added consent record logging with new columns |
| `app/api/leads/route.ts` | Updated consent writes with new columns |
| `supabase/migrations/20260503_consent_records_add_columns.sql` | NEW — adds 3 columns to consent_records |

---

## Pre-Deploy Checklist

- [ ] Run Supabase migration: `20260503_consent_records_add_columns.sql`
- [ ] Verify Supabase BAA status
- [ ] Verify Vercel BAA status
- [ ] Fill placeholder values: `[SUPPORT EMAIL]`, `[SUPPORT PHONE]` in privacy and terms pages
- [ ] Run v1.0.0 consent count query (see Phase 6 section above)
- [ ] Test intake forms end-to-end (TRT + GLP-1): phone field validates, SMS consent blocks progression, consent record writes to Supabase
- [ ] Test privacy policy page loads with SMS section visible
- [ ] Test terms page loads with SMS section + stub sections
- [ ] Verify "Privacy Policy" and "Terms of Service" links in consent checkbox open correct pages
- [ ] Clear `.next` cache if stale type errors persist (`rm -rf .next/types`)
