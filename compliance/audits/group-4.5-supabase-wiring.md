# Group 4.5 — Supabase Wiring: End-to-End Pipeline

**Date:** 2026-05-01  
**Build:** ✅ Compiled successfully  
**Tests:** ✅ 209 passed / 0 failed

---

## What Changed

Previously, all acquisition libraries used **in-memory stores**. They now persist directly to Supabase with graceful in-memory fallback when Supabase is unavailable.

### Files Modified

| File | Change |
|------|--------|
| `lib/supabase-admin.ts` | **NEW** — Shared singleton Supabase admin client |
| `lib/acquisition/tracking.ts` | Rewritten — `trackEvent()` INSERTs to `conversion_events`, `recordTouchpoint()` upserts `lead_attribution` |
| `lib/email/send.ts` | Rewritten — `sendTemplatedEmail()` INSERTs to `email_sends` after successful send |
| `app/api/webhooks/resend/route.ts` | Rewritten — UPDATEs `email_sends` on delivered/bounced/complained/opened/clicked |
| `app/api/leads/route.ts` | Added `trackEvent('lead_created')`, `recordTouchpoint()`, and welcome email send |
| `tests/lib/acquisition/tracking.test.ts` | Mock `supabase-admin` to ensure in-memory fallback in test |

---

## End-to-End Pipeline

```
Lead submits popup (email consent = true)
    │
    ▼
POST /api/leads
    ├── consent_records INSERT (existing)
    ├── trackEvent('lead_created') ──────────► conversion_events INSERT
    ├── recordTouchpoint(session_id) ────────► lead_attribution INSERT/UPSERT
    ├── sendTemplatedEmail('welcome-after-lead')
    │       ├── Resend API send ─────────────► email_sends INSERT (sent_at)
    │       └── (non-blocking, fire-and-forget)
    ├── GHL upsert (if configured)
    ├── Telegram alert (if high-intent)
    └── Lead alert email to Brian
              │
              ▼ (async, via webhook)
POST /api/webhooks/resend { type: 'email.delivered' }
    └── email_sends UPDATE (delivered_at)
```

---

## Verification Checklist

After deploying and submitting a test lead:

| Step | Where to Check | Expected |
|------|---------------|----------|
| 1. Lead created event | Supabase → `conversion_events` | Row with `event_type='lead_created'`, `source` populated |
| 2. Attribution stored | Supabase → `lead_attribution` | Row with `first_touch_source`, `last_touch_source`, `touchpoint_count=1` |
| 3. Welcome email sent | Supabase → `email_sends` | Row with `template_id='welcome-after-lead'`, `sent_at` set |
| 4. Email delivered | Supabase → `email_sends` | Same row: `delivered_at` populated (requires webhook configured) |
| 5. Email in inbox | Gmail/inbox of test email | Subject: "Welcome to Bloom Metabolics", lands in Primary |

---

## Prerequisites for Live Test

1. **Deploy to Vercel** — push changes so the new code is live
2. **Resend webhook URL** — configure in Resend dashboard:
   - URL: `https://bloommetabolics.com/api/webhooks/resend`
   - Events: `email.delivered`, `email.bounced`, `email.complained`, `email.opened`, `email.clicked`
3. **Supabase tables exist** — migration `20260501_acquisition_infrastructure_clean.sql` already run ✅

---

## Fallback Behavior

If Supabase is unavailable (e.g., env vars missing, network error):
- Events store in-memory (lost on restart, but lead capture still succeeds)
- Email still sends via Resend (just not persisted to `email_sends`)
- No user-facing errors — pipeline degrades gracefully
