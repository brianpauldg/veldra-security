# Group 1: Security & PHI Hardening — Completion Report

## Changes Made

### Issue 8 + C1 + C3: Authentication & Middleware

**middleware.ts** — MODIFIED
- Replaced old Nova Health protected routes (`/dashboard`, `/clients`, `/compliance`, `/documents`, `/messaging`, `/settings`) with correct Bloom routes (`/clinic`, `/api/clinic`)
- Added `CLINIC_PUBLIC_ROUTES` exemption for `/clinic/login`
- `/api/clinic/*` routes now return 401 at middleware level if no session, bearer token, or webhook secret
- `/clinic/*` page routes redirect to `/clinic/login` if no session

**lib/clinic/auth-middleware.ts** — CREATED (new file)
- `requireClinicAuth()` — Supabase session verification for clinic API routes. Returns authenticated user with role or 401/403.
- `requireBearerAuth()` — Bearer token verification for agent/webhook API routes.
- `requireWebhookAuth()` — Webhook shared secret verification for n8n/external.

**app/api/clinic/patients/route.ts** — MODIFIED
- Added `requireClinicAuth()` to both GET and PATCH handlers

**app/api/clinic/billing/route.ts** — MODIFIED
- Added `requireClinicAuth()` to both POST and GET handlers

**app/api/clinic/ehr/route.ts** — MODIFIED
- Added `requireClinicAuth()` to both POST and GET handlers

**Routes already authenticated (verified, no changes needed):**
- `/api/clinic/agents` — has `validateAuth()` bearer check
- `/api/clinic/mcp` — has `validateAuth()` bearer check
- `/api/clinic/n8n-webhook` — has bearer + API key check
- `/api/clinic/notify` — has bearer + API key check

### Issue C4: Seed Data Fallback Removed

**lib/clinic/data-service.ts** — MODIFIED
- Added production safety check: logs `[SECURITY] Supabase unavailable` instead of silently falling back to seed data

**app/api/clinic/agents/route.ts** — MODIFIED
- Removed `SEED_PATIENTS` import
- `overview` and `patients` actions now use `getAllPatients()` (live Supabase data)

### Issue C5: .mcp.json Secrets

**.mcp.json** — MODIFIED
- Replaced all hardcoded API keys with `${ENV_VAR}` placeholders
- Obsidian API key, Google OAuth secret, GHL API key, GHL location ID all removed

**.gitignore** — VERIFIED
- `.mcp.json` already in `.gitignore` (line 30)
- Secrets were committed before gitignore was added — flagged in HUMAN-ACTION-REQUIRED.md

### Issue H1: Email Removed from URL Parameters

**app/api/checkout/route.ts** — MODIFIED
- Removed `&email=${encodeURIComponent(data.email)}` from demo mode redirect URL (line 27)

### Issue H2: PHI Removed from Console Logs

**app/api/contact/route.ts** — MODIFIED
- Changed `console.log` from logging name, email, message to `[CONTACT] New submission | Subject: ${subject} | Saved to DB`

**app/api/stripe-webhook/route.ts** — MODIFIED
- Changed `Patient created for ${email} (${type})` to `[WEBHOOK] Patient record created (${type})`

### Issue C2: Intake Form Encryption

**app/api/intake/route.ts** — REWRITTEN
- Added `encryptFormData()` and `decryptFormData()` functions
- When `ENCRYPTION_KEY` env var is set (64 hex chars), form_data is encrypted with AES-256-GCM before storage
- When key is not set, logs `[SECURITY] ENCRYPTION_KEY not set` warning and stores as JSON (graceful degradation)
- Decryption handles both encrypted (hex:hex:hex format) and unencrypted (JSONB) data transparently

### Issue 8: PHI Redaction Expanded

**lib/clinic/phi-redaction.ts** — CREATED (new file)
- Comprehensive PHI field list (50+ field names) including: names, emails, phones, DOBs, addresses, medications, conditions, lab values, signatures, form data, IP addresses
- `redactPHI()` — default-deny (strict mode) or field-deny (permissive mode)
- `redactIfPHI()` — single-field redaction check

**lib/clinic/audit.ts** — REWRITTEN
- Now imports and uses `redactPHI()` from phi-redaction.ts
- All audit log details are redacted before storage
- `sanitizeForLog()` deprecated in favor of `redactPHI()`

### Issue H7: Stripe Webhook Idempotency

**app/api/stripe-webhook/route.ts** — MODIFIED
- Added check: if patient already exists for the email, skip creation and return `{ received: true, existing: true }`
- Prevents duplicate patient records on webhook retries

### Issue 3 (Skeleton): Payment Provider Abstraction

**lib/payments/types.ts** — CREATED
- `PaymentProvider` interface with: findOrCreateCustomer, createCheckoutSession, retrieveSession, createInvoice, cancelSubscription, constructWebhookEvent

**lib/payments/provider.ts** — CREATED
- `getPaymentProvider()` factory function. Reads `PAYMENT_PROVIDER` env var. Default: 'stripe'.

**lib/payments/stripe.ts** — CREATED
- `StripeProvider` class implementing `PaymentProvider` interface
- Wraps all existing Stripe SDK patterns used across checkout/billing routes

**lib/payments/corepay.ts** — CREATED
- `CorepayProvider` stub. All methods throw `NotImplementedError` referencing Group 5 post-launch build.

**Note:** Existing checkout/billing routes still call Stripe directly. Full migration to use `getPaymentProvider()` is deferred to Group 5 to avoid behavior changes in this security-focused group. The abstraction layer is ready for when migration happens.

## Build Status

`npm run build` — **SUCCESS** (41/41 static pages generated, 0 errors)

## Test Coverage

**No automated test framework exists** in this codebase (no Vitest, Jest, or Playwright config). Manual verification:
- Build passes ✓
- Auth middleware compiles and exports correctly ✓
- PHI redaction utility compiles ✓
- Payment abstraction compiles ✓

**Flagged:** Automated test coverage should be added in a future sprint. Priority test targets:
- `requireClinicAuth()` — test authenticated, unauthenticated, wrong role, expired session
- `redactPHI()` — test strict/permissive modes, edge cases
- `encryptFormData()`/`decryptFormData()` — round-trip encryption test

## Human Action Items

See `/compliance/HUMAN-ACTION-REQUIRED.md`:
1. **Rotate all secrets** previously in .mcp.json (Google OAuth, GHL API key, Obsidian key)
2. **Set ENCRYPTION_KEY** on Vercel for intake form encryption
3. **Verify BAAs** with all vendors (see `/compliance/baa-status.md`)

## Files Summary

| Action | File | Lines Changed |
|--------|------|---------------|
| MODIFIED | middleware.ts | ~30 lines |
| CREATED | lib/clinic/auth-middleware.ts | ~115 lines |
| MODIFIED | app/api/clinic/patients/route.ts | +6 lines |
| MODIFIED | app/api/clinic/billing/route.ts | +8 lines |
| MODIFIED | app/api/clinic/ehr/route.ts | +8 lines |
| MODIFIED | app/api/clinic/agents/route.ts | ~20 lines |
| MODIFIED | lib/clinic/data-service.ts | +4 lines |
| MODIFIED | .mcp.json | full rewrite (secrets removed) |
| MODIFIED | app/api/checkout/route.ts | -1 line (email from URL) |
| MODIFIED | app/api/contact/route.ts | 1 line (console.log) |
| MODIFIED | app/api/stripe-webhook/route.ts | ~10 lines (idempotency + log fix) |
| REWRITTEN | app/api/intake/route.ts | ~140 lines (encryption added) |
| CREATED | lib/clinic/phi-redaction.ts | ~95 lines |
| REWRITTEN | lib/clinic/audit.ts | ~45 lines |
| CREATED | lib/payments/types.ts | ~45 lines |
| CREATED | lib/payments/provider.ts | ~20 lines |
| CREATED | lib/payments/stripe.ts | ~100 lines |
| CREATED | lib/payments/corepay.ts | ~25 lines |
