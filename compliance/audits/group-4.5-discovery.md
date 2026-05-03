# Group 4.5 Discovery — Existing Infrastructure Audit

## AttributionTracker (components/AttributionTracker.tsx)
- Client component, fires once on mount via LayoutShell
- Calls `captureClientAttribution()` + `ensureSessionId()` from lib/attribution.ts
- Captures: utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid, landing_page, referrer
- Stores in sessionStorage under `nova_attribution` key (old brand — needs rename)
- Session ID stored under `nova_session_id` key (old brand)
- No server-side persistence — attribution lives only in browser session

## lib/events.ts
- Client-side event bus with `trackEvent()`, `updateLeadStage()`, `triggerWelcomeEmail()`, `triggerBookingReminder()`
- All are placeholder implementations (console.log in dev, no actual sends)
- Uses `getSessionId()` for session tracking
- Still references "Nova Event" in console.log (old brand)
- No server-side persistence of events

## lib/attribution.ts
- `captureClientAttribution()` — captures UTM on first page load, stores in sessionStorage
- `ensureSessionId()` — generates UUID session ID
- `enrichServerLead()` — enriches leads with geo (from Vercel headers), device info, session_id
- `withAttribution()` — wraps form data with client-captured attribution
- Storage keys use `nova_` prefix (old brand)

## Existing Email Sends
| File | What |
|------|------|
| lib/email/resend.ts | Full Resend integration: sendEmail(), sendContactNotification(), sendBookingConfirmation(), sendNewPatientAlert() |
| app/api/contact/route.ts | Calls sendContactNotification() on form submit |
| app/api/stripe-webhook/route.ts | Calls sendBookingConfirmation() + sendNewPatientAlert() on checkout.session.completed |
| lib/notify.ts | Legacy sendTelegram(), sendLeadEmail(), emitN8n() — used by /api/leads |

## Consent Infrastructure (Group 3)
- consent_records table: live in Supabase
- TCPAConsent component on all forms
- Consent checked before lead creation in /api/leads
- Opt-out via /api/communications/opt-out + /unsubscribe page

## vercel.json
- Framework: nextjs, buildCommand, devCommand, installCommand
- Region: iad1
- Security headers configured
- NO cron entries currently

## Key Findings
1. Attribution captures are client-only (sessionStorage) — no server persistence
2. Event tracking is placeholder (no actual analytics)
3. `nova_` prefixed storage keys need rename to `bloom_`
4. Email via Resend is functional but limited to 4 templates
5. No SMS infrastructure
6. No referral system
7. No blog infrastructure
8. No analytics provider
9. No cron config
