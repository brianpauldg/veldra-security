# Group 5A — OptiMantra EHR Integration: COMPLETE

**Date:** 2026-05-02  
**Build:** ✅ Compiled successfully (no type errors)  
**Tests:** ✅ 270 passed / 0 failed (46 test files, 61 new tests added)

---

## Phase Summary

### Phase 0: Discovery
- [group-5a-discovery.md](group-5a-discovery.md) — existing infrastructure audit

### Phase 1: OptiMantra API Client
- `lib/integrations/optimantra/client.ts` — Type-safe REST client with retry + rate limiting
- `lib/integrations/optimantra/types.ts` — Entity type definitions (all marked VERIFY)
- `lib/integrations/optimantra/errors.ts` — Custom error classes + isRetryable helper
- `lib/integrations/optimantra/config.ts` — Centralized config, feature flag, env guards

### Phase 2: EHR Adapter Abstraction
- `lib/clinic/ehr-types.ts` — Canonical types + EHRAdapter interface
- `lib/clinic/ehr-adapter-optimantra.ts` — OptiMantra concrete adapter
- `lib/clinic/ehr-adapter-mock.ts` — Mock adapter (used when disabled)
- `config/integrations/ehr.ts` — Factory: getEHRAdapter() returns active adapter

### Phase 3: Patient ID Linking
- `lib/clinic/ehr-mapping.ts` — link/unlink/lookup with Supabase persistence
- `supabase/migrations/20260502_ehr_patient_mappings.sql` — mapping table + indexes + RLS

### Phase 4: Webhook Handlers
- `app/api/webhooks/optimantra/route.ts` — Signature verify + replay protection + routing
- `lib/integrations/optimantra/webhook-handlers/prescription-created.ts` — Compounded Rx + CURES gates
- `lib/integrations/optimantra/webhook-handlers/lab-result-received.ts` — Hematocrit + liver enzyme alerts
- `lib/integrations/optimantra/webhook-handlers/patient-created.ts` — Auto-linking by external_id
- `lib/integrations/optimantra/webhook-handlers/appointment-completed.ts` — Conversion event + sequence enrollment
- `lib/integrations/optimantra/webhook-handlers/appointment-canceled.ts` — Audit log

### Phase 5: Document Push
- `lib/clinic/consent-push.ts` — pushConsentToEHR() with idempotency + failure alerting
- `supabase/migrations/20260502_signed_consents_ehr_columns.sql` — ehr_document_id, ehr_pushed_at, ehr_push_error

### Phase 6: Patient ID Migration Script
- `scripts/migrate-patient-ids-to-ehr.ts` — Dry-run + live modes, orphan detection, report generation

### Phase 7: Provider Account Linking
- `lib/clinic/provider-ehr-mapping.ts` — link/lookup for providers
- `supabase/migrations/20260502_providers_ehr_columns.sql` — ehr_provider, ehr_external_provider_id columns

### Phase 8: Clinician Workflow UI
- `app/clinic/integrations/optimantra/page.tsx` — Integration status dashboard

---

## Test Files Added (10 new files, 61 tests)

| File | Tests |
|------|-------|
| `tests/lib/integrations/optimantra/client.test.ts` | 10 |
| `tests/lib/integrations/optimantra/errors.test.ts` | 5 |
| `tests/lib/clinic/ehr-adapter.test.ts` | 8 |
| `tests/lib/clinic/ehr-mapping.test.ts` | 6 |
| `tests/lib/integrations/optimantra/webhook-handlers/prescription-created.test.ts` | 8 |
| `tests/lib/integrations/optimantra/webhook-handlers/lab-result-received.test.ts` | 4 |
| `tests/lib/integrations/optimantra/webhook-handlers/appointment-completed.test.ts` | 4 |
| `tests/api/webhooks/optimantra.test.ts` | 6 |
| `tests/lib/clinic/consent-push.test.ts` | 6 |
| `tests/lib/clinic/provider-ehr-mapping.test.ts` | 4 |

---

## VERIFY Markers (requires OptiMantra API docs)

All endpoint paths in `lib/integrations/optimantra/client.ts` are marked:
```
// VERIFY against OptiMantra API docs during integration testing
```

Locations:
- GET `/patients/{id}` — patient lookup
- GET `/patients?email=` — patient search by email
- GET `/patients?external_id=` — patient search by external ID
- POST `/patients` — patient creation
- PATCH `/patients/{id}` — patient update
- GET `/patients/{id}/prescriptions` — prescription list
- GET `/patients/{id}/lab-results` — lab results
- GET `/patients/{id}/appointments` — appointments
- POST `/patients/{id}/documents` — document upload (may use multipart/form-data)
- GET `/documents/{id}` — document retrieval
- GET `/providers/{id}` — provider lookup
- Webhook signature header: `x-optimantra-signature` (VERIFY header name)
- Webhook event_type values (VERIFY enum)

---

## Supabase Migrations to Run

1. `supabase/migrations/20260502_ehr_patient_mappings.sql` — ehr_patient_mappings table
2. `supabase/migrations/20260502_signed_consents_ehr_columns.sql` — 3 new columns
3. `supabase/migrations/20260502_providers_ehr_columns.sql` — 3 new columns + index

---

## HUMAN-ACTION-REQUIRED

1. **OptiMantra contract** — execute in MSO entity name
2. **OptiMantra BAA** — execute in writing, confirm date
3. **OptiMantra API documentation** — request from OptiMantra support; update all VERIFY markers
4. **OptiMantra DoseSpot/EPCS** — activate for prescribing physician
5. **Test CURES query** — verify in OptiMantra/DoseSpot before launch
6. **Set env vars on Vercel:**
   - `OPTIMANTRA_API_KEY` — from OptiMantra dashboard
   - `OPTIMANTRA_BASE_URL` — confirm URL (default: `https://api.optimantra.com/v1`)
   - `OPTIMANTRA_WEBHOOK_SECRET` — from OptiMantra webhook config
   - `OPTIMANTRA_ENABLED=false` — keep false until BAA confirmed
7. **Configure webhook URL** — `https://bloommetabolics.com/api/webhooks/optimantra` in OptiMantra dashboard
8. **Run Supabase migrations** — 3 SQL files listed above
9. **Run patient ID migration script** — after all patients are in OptiMantra: `npx tsx scripts/migrate-patient-ids-to-ehr.ts --dry-run` then without flag
10. **Set `OPTIMANTRA_ENABLED=true`** — only after BAA confirmed + webhook configured + test queries passing

---

## Next: Group 5B
- Payment processor migration (Stripe → Corepay dual-write)
- SMS activation (A2P 10DLC)
- BAA finalization
- LegitScript packet
- Requires Brian's approval before proceeding.
