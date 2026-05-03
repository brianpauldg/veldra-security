# Group 3 Final Corrections — Completion Report

## Correction 1: TCPAConsent in LeadPopup — DONE

**components/LeadPopup.tsx** — MODIFIED
- Added email consent checkbox to the "guide" variant (email-capture form)
- Checkbox unchecked by default, identifies Bloom Metabolics, mentions unsubscribe, links to privacy policy
- Submit blocked if consent not granted (inline error message)
- Consent state passed to /api/leads call with `consent: { email: true, version: '1.0.0' }`
- "quiz" variant (CTA link only, no data captured) does not require consent — correct behavior

## Correction 2: PDF Generation — DONE

**Dependency:** pdfkit v0.18.0 + @types/pdfkit installed

**lib/clinic/consent-pdf.ts** — CREATED
- `generateConsentPDF()` — server-side PDF generation using pdfkit
- Renders: title, version, full consent body (markdown-like to styled PDF text), section headers, bullet lists, bold text
- Signature section: patient name, signed_at timestamp (Pacific time), IP address, embedded signature image (base64 PNG to PDF image)
- Footer: content hash (SHA-256) for integrity verification, electronic signature notice
- PDF metadata: title, author (Bloom Metabolics), subject, creator

**app/api/clinic/consents/route.ts** — MODIFIED (POST handler)
- After persisting signed_consents row, generates PDF via `generateConsentPDF()`
- Uploads to Supabase Storage `signed-consents` bucket
- Path: `{patient_id}/{document_id}-v{version}-{timestamp}.pdf`
- Updates signed_consents row with `pdf_storage_url`
- Non-blocking: if PDF generation/upload fails, consent record still saved (logged error)

## Correction 3: Phone Encryption — DONE

**app/api/leads/route.ts** — MODIFIED
- Added `encryptPhone()` function using AES-256-GCM (same pattern as intake encryption)
- Phone encrypted before writing to consent_records.user_phone
- Falls back to plaintext in development when ENCRYPTION_KEY not set
- In production with ENCRYPTION_KEY, produces hex:hex:hex format
- TODO marker REMOVED

## Correction 4: Tests — DONE

| Test File | Tests | Status |
|-----------|-------|--------|
| tests/lib/clinic/auth-middleware.test.ts | 3 | PASS |
| tests/lib/clinic/phi-redaction.test.ts | 5 | PASS |
| tests/api/intake/encryption.test.ts | 3 | PASS |
| tests/lib/clinic/consent-templates.test.ts | 5 | PASS |
| tests/lib/email/unsubscribe-link.test.ts | 4 | PASS |
| tests/lib/encryption.test.ts | 3 | PASS |
| tests/lib/clinic/consent-pdf.test.ts | 3 | PASS |
| tests/api/leads-encryption.test.ts | 3 | PASS |
| tests/api/communications/opt-out.test.ts | 4 | PASS |
| tests/components/StateGate.test.ts | 6 | PASS |
| tests/components/TCPAConsent.test.ts | 8 | PASS |
| **Total** | **47** | **ALL PASS** |

### New Tests Added in This Correction:
- **consent-pdf.test.ts**: PDF buffer generation, PDF magic number validation, signature embedding, graceful missing signature handling
- **leads-encryption.test.ts**: Phone encryption to hex:hex:hex format, decryption round-trip, unique ciphertexts per encryption
- **opt-out.test.ts**: Email opt-out, channel=all, idempotency via revoked_at filter, no existence leak
- **StateGate.test.ts**: CA eligible, TX/NY not eligible, ELIGIBLE_STATES = ['CA'], getStateName for full names
- **TCPAConsent.test.ts**: isConsentValid for all combinations (email/sms required/granted), consent version, consent text content verification

## Build Status
`npm run build` — **SUCCESS** (42/42 static pages, 0 errors)

## Test Status
`npm run test:run` — **47/47 PASSED** (11 test files)

## Deferred Items — NONE
All four corrections completed. No items deferred.

## Human Action Items

Updated in HUMAN-ACTION-REQUIRED.md:
1. Create Supabase Storage bucket `signed-consents` (Settings, Storage, New bucket, private, RLS enabled)
2. Run supabase/migrations/20260428_consent_records.sql
3. Add ENCRYPTION_KEY to Vercel production env
4. Add UNSUBSCRIBE_SECRET to Vercel production env
5. Physician partner review of consent templates

## Files Summary

| Action | File |
|--------|------|
| MODIFIED | components/LeadPopup.tsx (consent checkbox + validation) |
| CREATED | lib/clinic/consent-pdf.ts (pdfkit PDF generation) |
| MODIFIED | app/api/clinic/consents/route.ts (PDF generation + storage upload) |
| MODIFIED | app/api/leads/route.ts (encryptPhone + removed TODO) |
| INSTALLED | pdfkit, @types/pdfkit |
| CREATED | tests/lib/clinic/consent-pdf.test.ts (3 tests) |
| CREATED | tests/api/leads-encryption.test.ts (3 tests) |
| CREATED | tests/api/communications/opt-out.test.ts (4 tests) |
| CREATED | tests/components/StateGate.test.ts (6 tests) |
| CREATED | tests/components/TCPAConsent.test.ts (8 tests) |
