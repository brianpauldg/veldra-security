# OptiMantra Integration Specification

**Date:** 2026-05-02  
**Status:** Built, not yet activated (awaiting BAA + onboarding)

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         BLOOM METABOLICS                         │
│                                                                  │
│  ┌──────────────┐    ┌───────────────┐    ┌──────────────────┐  │
│  │ Clinical     │    │ EHR Adapter   │    │ OptiMantra       │  │
│  │ Dashboard    │───▶│ (Canonical)   │───▶│ API Client       │──┼──▶ OptiMantra API
│  └──────────────┘    └───────────────┘    └──────────────────┘  │
│                              │                                    │
│                              ▼                                    │
│                     ┌────────────────┐                           │
│                     │ ehr_patient_   │                           │
│                     │ mappings       │                           │
│                     │ (Supabase)     │                           │
│                     └────────────────┘                           │
│                                                                  │
│  ┌──────────────┐                         ┌──────────────────┐  │
│  │ Webhook      │◀────────────────────────│ OptiMantra       │  │
│  │ Handler      │    (HMAC-SHA256)        │ Webhooks         │◀─┼── OptiMantra Events
│  └────���─┬───────┘                         └──────────────────┘  │
│         │                                                        │
│         ├─▶ prescription.created → Compliance gate validation    │
│         ├─▶ lab_result.received → Critical value alerts          │
│         ├─▶ patient.created → Auto-linking                       │
│         ├─▶ appointment.completed → Sequence enrollment          │
│         └─▶ appointment.canceled → Audit log                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## PHI Boundaries

| Data | Stored In | Notes |
|------|-----------|-------|
| Patient demographics | OptiMantra (system of record) | Bloom stores ID mapping only |
| Prescriptions | OptiMantra + DoseSpot | Bloom reads via API, does not persist |
| Lab results | OptiMantra | Bloom reads via API, alerts on critical values |
| Compliance records | Bloom Supabase | compounded_rx_justifications, pmp_queries, signed_consents |
| Audit logs | Bloom Supabase | All EHR interactions logged |
| Signed consent PDFs | Bloom Supabase Storage → pushed to OptiMantra chart |

---

## BAA Scope

- OptiMantra BAA covers: patient demographics, prescriptions, lab results, appointments, documents
- Bloom → OptiMantra: signed consent PDFs, patient external_id linkage
- OptiMantra → Bloom: webhook events (patient_id, event metadata — no full clinical records in webhook payload)

---

## Retention Policy

- Bloom compliance records: retained per California CMIA (minimum 7 years)
- EHR patient mappings: retained as long as patient is active + 7 years post-discharge
- Audit logs: retained indefinitely (append-only)
- OptiMantra records: governed by OptiMantra's retention policy + BAA terms

---

## Outage Handling

| Scenario | Behavior |
|----------|----------|
| OptiMantra API unreachable | EHR adapter returns empty data; clinic dashboard shows "EHR unavailable" banner |
| Webhook delivery fails | OptiMantra retries (their retry policy); Bloom returns 200 on success |
| Supabase unavailable | Compliance records use in-memory fallback; data may be lost on restart |
| Document push fails | Alert created in medical_director_review_queue; consent remains valid in Bloom |

---

## Rollback Plan

If OptiMantra integration is removed or replaced:

1. Set `OPTIMANTRA_ENABLED=false` — all calls immediately use MockEHRAdapter
2. Existing `ehr_patient_mappings` remain intact (historical reference)
3. Compliance records still reference `patient_id` (Bloom UUID) — independent of EHR
4. To switch EHR: implement new adapter class, update `config/integrations/ehr.ts` factory
5. Run new mapping script for replacement EHR
