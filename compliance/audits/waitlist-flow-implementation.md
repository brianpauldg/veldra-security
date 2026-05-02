# Waitlist Flow — Implementation Audit

**Date:** 2026-05-02  
**Build:** ✅ Compiled successfully (`tsc --noEmit` zero errors)  
**Tests:** N/A — manual QA checklist below

---

## What Changed

Added a complete patient waitlist flow: modal form with full validation, server-side API with rate limiting and bot protection, GHL webhook integration, dual Resend emails (notification + confirmation), Supabase backup, and three homepage CTAs.

### New Files Created

| File | Purpose |
|------|---------|
| `lib/waitlist/constants.ts` | US states (50 + DC), primary interests, contact methods, timelines, `SERVED_STATES` config array |
| `lib/waitlist/schema.ts` | Zod client schema (form validation) + server schema (stricter, trims/lowercases email) |
| `components/WaitlistModal.tsx` | Full modal: form fields, phone formatter, Turnstile widget, honeypot, UTM capture, focus trap, keyboard nav, success/error/rate-limited states |
| `app/api/waitlist/route.ts` | Server handler: Zod validation → honeypot check → Turnstile verify → rate limit → GHL webhook → notification email → confirmation email → Supabase backup |
| `supabase/migrations/20260502_waitlist_leads.sql` | `waitlist_leads` table with RLS, unique email constraint, status enum check |

### Existing Files Modified

| File | Change |
|------|--------|
| `components/Header.tsx` | Added "Join Waitlist" button (desktop + mobile nav), renders `WaitlistModal` |
| `app/page.tsx` | Hero CTA → "Join the Bloom Metabolics Waitlist"; added Section 8 bottom-of-page waitlist CTA with Meridian eyebrow |
| `app/globals.css` | Added `.waitlist-input` class (dark inputs matching obsidian/brass palette) |
| `env-example.txt` | Added `BUSINESS_LEAD_EMAIL`, `GHL_WEBHOOK_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| `package.json` / `package-lock.json` | Added `@upstash/redis` dependency |

---

## CTA Placement

| Location | Label | Behavior |
|----------|-------|----------|
| Header — desktop nav | "Join Waitlist" | Opens waitlist modal |
| Header — mobile nav | "Join Waitlist" | Opens waitlist modal |
| Hero section | "Join the Bloom Metabolics Waitlist" | Opens waitlist modal |
| Bottom-of-page Section 8 | "Join Waitlist" | Opens waitlist modal |

---

## Form Fields

### Required

| Field | Type | Validation |
|-------|------|------------|
| First Name | text | min 1, max 100, `autocomplete="given-name"` |
| Last Name | text | min 1, max 100, `autocomplete="family-name"` |
| Email | email | Zod `.email()`, `autocomplete="email"` |
| Phone | tel | US format `(XXX) XXX-XXXX`, live formatting, `autocomplete="tel"` |
| State | dropdown | 50 states + DC, stored as 2-letter code, `autocomplete="address-level1"` |
| Primary Interest | dropdown | 6 options: GLP-1 Weight Loss, Testosterone / Hormone Optimization, Peptide Therapy, Metabolic Health, Longevity / Preventive Health, General Interest |
| Medical Disclaimer | checkbox | Must be `true` to submit |

### Optional

| Field | Type | Notes |
|-------|------|-------|
| Preferred Contact | radio | Email (default) / Text / Phone Call |
| Timeline | dropdown | ASAP / 1–2 weeks / 1 month / Just researching |
| Notes / Health Goals | textarea | max 1000 chars |
| TCPA Consent | checkbox | Only shown when phone provided AND contact = Text or Phone Call |

### Hidden (auto-captured)

| Field | Source |
|-------|--------|
| `utmSource` | `window.location.search` → `utm_source` |
| `utmMedium` | `window.location.search` → `utm_medium` |
| `utmCampaign` | `window.location.search` → `utm_campaign` |
| `utmTerm` | `window.location.search` → `utm_term` |
| `utmContent` | `window.location.search` → `utm_content` |
| `referrer` | `document.referrer` |
| `landingPage` | `window.location.pathname + search` |
| `userAgent` | `navigator.userAgent` |
| `timestamp` | Set server-side (ISO 8601) |

### Honeypot

| Field | Name | Behavior |
|-------|------|----------|
| Hidden input | `website` | Positioned off-screen (`-left-[9999px]`), `aria-hidden`, `tabIndex={-1}`. If filled → fake 200 success, no integrations fire. |

---

## Server-Side Pipeline (`POST /api/waitlist`)

```
Request received
    │
    ├── 1. Rate limit check (Upstash Redis, 3/IP/hour)
    │       └── Exceeded → 429 "Too many submissions"
    │
    ├── 2. JSON parse + Zod validation
    │       └── Invalid → 400 + error details
    │
    ├── 3. Honeypot check
    │       └── Filled → fake 200 { ok: true }
    │
    ├── 4. Turnstile verification (production only)
    │       ├── No token → 400 "Bot verification required"
    │       └── Invalid → 403 "Bot verification failed"
    │
    ├── 5. GHL inbound webhook POST (5s timeout, try/catch)
    │       └── Payload: name, email, phone, state, interest, UTMs, tags
    │           Tags: ["waitlist-lead", "<interest-slug>"]
    │
    ├── 6. Notification email → brian@bloommetabolics.com (Resend)
    │       └── Subject: "New Bloom Metabolics Waitlist Lead — <Name> (<Interest>)"
    │           Reply-To: submitter's email
    │
    ├── 7. Confirmation email → submitter (Resend)
    │       └── Subject: "Welcome to the Bloom Metabolics waitlist"
    │           Branded dark HTML matching site aesthetic
    │
    └── 8. Supabase backup (if configured)
            └── UPSERT to waitlist_leads (on email conflict → update timestamp/notes)
```

### Error Handling

| Scenario | Response |
|----------|----------|
| GHL fails, email succeeds | 200 success (lead captured via email) |
| Email fails, GHL succeeds | 200 success (lead captured in CRM) |
| Both GHL and email fail | 500 error to user |
| Supabase fails | Silent — does not affect response |
| Confirmation email fails | Silent — does not affect response |

---

## Bot Protection

| Layer | Implementation |
|-------|---------------|
| Honeypot | Hidden `website` field, fake success if filled |
| Turnstile | Cloudflare widget (dark theme), server-side token verify. Skipped in dev if env vars missing (console warning). Required in production. |
| Rate limiting | Upstash Redis, 3 submissions per IP per hour. Gracefully skipped if Redis not configured. |

---

## Compliance & Privacy

| Check | Status |
|-------|--------|
| No PII in logs | ✅ Only log channel + status code (e.g., "GHL webhook failed: 500") |
| No form payload to analytics | ✅ No GA/Meta/pixel events on submit |
| TLS transport | ✅ Resend and GHL handle TLS by default |
| No medical claims in copy | ✅ Uses "may," "personalized," "when enrollment opens" |
| No eligibility promises | ✅ "does not guarantee eligibility or treatment" |
| No provider relationship implied | ✅ Explicit disclaimer checkbox + footer text |
| TCPA consent conditional | ✅ Only shown when phone + Text/Phone Call selected |
| Medical disclaimer always required | ✅ `z.literal(true)` — form won't submit without it |
| State restriction soft message | ✅ Does not block submission; shows amber inline note |
| API keys server-only | ✅ Only `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is public |

---

## Accessibility

| Check | Status |
|-------|--------|
| Visible labels on all inputs | ✅ `<label htmlFor>` on every field |
| `aria-invalid` on error fields | ✅ Set dynamically |
| `aria-describedby` linking errors | ✅ Error `id` matches `aria-describedby` |
| `role="dialog"` + `aria-modal` | ✅ On modal container |
| `aria-label` on modal | ✅ "Join the Bloom Metabolics Waitlist" |
| Focus trap inside modal | ✅ Tab + Shift+Tab cycle within modal |
| Auto-focus first field on open | ✅ `firstFieldRef` focused after 150ms |
| Escape key closes modal | ✅ With dirty-data confirmation |
| Outside click closes modal | ✅ With dirty-data confirmation |
| Keyboard-navigable form | ✅ Standard tab order, radios arrow-navigable |
| Screen reader error announcements | ✅ `role="alert"` on error messages |

---

## UX States

| State | What User Sees |
|-------|---------------|
| Idle | Full form with all fields |
| Submitting | Button shows spinner + "Submitting...", disabled |
| Success | Checkmark icon + "You're on the list." + close button |
| Error | "Something went wrong" + Try Again / Close buttons + email fallback |
| Rate Limited | "Already submitted" + "We have your information" + close button |

---

## Environment Variables

| Variable | Type | Purpose |
|----------|------|---------|
| `BUSINESS_LEAD_EMAIL` | Server | Notification recipient (fallback: `LEAD_ALERT_EMAIL`) |
| `GHL_WEBHOOK_URL` | Server | GoHighLevel inbound webhook endpoint |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Cloudflare Turnstile client widget |
| `TURNSTILE_SECRET_KEY` | Server | Cloudflare Turnstile server verification |
| `UPSTASH_REDIS_REST_URL` | Server | Rate limiting database |
| `UPSTASH_REDIS_REST_TOKEN` | Server | Rate limiting auth |
| `RESEND_API_KEY` | Server | Already configured — email sending |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Already configured — Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Already configured — Supabase admin |

---

## Supabase Migration

**File:** `supabase/migrations/20260502_waitlist_leads.sql`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | PK, `gen_random_uuid()` |
| `first_name` | text | NOT NULL |
| `last_name` | text | NOT NULL |
| `email` | text | NOT NULL, UNIQUE |
| `phone` | text | NOT NULL |
| `state` | text | NOT NULL |
| `primary_interest` | text | NOT NULL |
| `preferred_contact` | text | — |
| `timeline` | text | — |
| `notes` | text | — |
| `utm_source` | text | — |
| `utm_medium` | text | — |
| `utm_campaign` | text | — |
| `utm_term` | text | — |
| `utm_content` | text | — |
| `referrer` | text | — |
| `landing_page` | text | — |
| `user_agent` | text | — |
| `ip_address` | text | — |
| `status` | text | NOT NULL, default `'new'`, CHECK IN (`new`, `contacted`, `qualified`, `disqualified`, `converted`) |
| `created_at` | timestamptz | NOT NULL, default `now()` |

- RLS enabled, no public policies (service role only)
- On email conflict: UPSERT (updates timestamp + notes)

---

## Where Leads Are Stored

1. **Primary:** GoHighLevel CRM — tagged `waitlist-lead` + interest slug
2. **Secondary:** `brian@bloommetabolics.com` inbox — full lead details in notification email
3. **Tertiary:** Supabase `waitlist_leads` table — if configured

---

## External Setup Required Before Go-Live

1. Set all env vars in Vercel dashboard
2. Create GHL inbound webhook (Automations → trigger) → paste URL as `GHL_WEBHOOK_URL`
3. Register Cloudflare Turnstile site → get site key + secret
4. Create Upstash Redis database (free tier) → get REST URL + token
5. Run Supabase migration `20260502_waitlist_leads.sql`
6. Verify sender domain in Resend for `waitlist@bloommetabolics.com` (or use existing `notifications@`)

---

## Verification Checklist (Post-Deploy)

| # | Test | Expected |
|---|------|----------|
| 1 | Open homepage on desktop (1440px) | "Join Waitlist" in header nav, hero CTA, bottom section CTA |
| 2 | Open homepage on mobile (375px) | "Join Waitlist" in mobile menu, hero CTA wraps properly |
| 3 | Click any "Join Waitlist" button | Modal opens, first name field auto-focused |
| 4 | Press Escape with empty form | Modal closes |
| 5 | Press Escape with dirty form | Confirmation dialog appears |
| 6 | Tab through all fields | Focus moves logically, stays trapped in modal |
| 7 | Submit empty form | Validation errors on all required fields |
| 8 | Enter invalid email | "Please enter a valid email address" |
| 9 | Enter partial phone | "Please enter a valid US phone number" |
| 10 | Type phone digits | Formats as (XXX) XXX-XXXX in real-time |
| 11 | Select state not in SERVED_STATES | Amber message shown, submission not blocked |
| 12 | Select Text as contact + enter phone | TCPA checkbox appears |
| 13 | Select Email as contact | TCPA checkbox hidden |
| 14 | Submit without medical disclaimer | "You must acknowledge this disclaimer" |
| 15 | Fill honeypot field (dev tools) | Fake success, no lead created |
| 16 | Submit valid form | Spinner → "You're on the list." |
| 17 | Check GHL | Contact created with tags `waitlist-lead` + interest slug |
| 18 | Check `brian@bloommetabolics.com` | Notification email with full lead details |
| 19 | Check submitter inbox | Branded confirmation email "Welcome to the Bloom Metabolics waitlist" |
| 20 | Check Supabase `waitlist_leads` | Row with all fields populated |
| 21 | Submit 4th time from same IP within 1 hour | "Already submitted" rate-limited state |
| 22 | Submit with UTM params in URL | UTM values captured in GHL payload + Supabase row |
| 23 | Submit same email twice | Supabase upserts (no duplicate error), GHL creates/updates contact |
