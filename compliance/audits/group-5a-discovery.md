# Group 5A — OptiMantra EHR Integration: Discovery

**Date:** 2026-05-02

---

## 1. Existing EHR Adapter (`lib/clinic/ehr-adapter.ts`)

**Status:** EXISTS — CharmEHR adapter with extensible provider support

- Provider abstraction layer for CharmEHR (primary) with FHIR generic fallback
- OAuth2 authentication with token refresh
- Core operations: patient CRUD, encounter management, lab result push/pull
- Syncs patient data to `patients` table (fields: `ehr_provider`, `ehr_external_id`, `ehr_last_sync_at`)
- Logs all sync operations to `ehr_sync_log` table
- Key interfaces: `EHRPatient`, `EHREncounter`, `EHRLabOrder`, `EHRSyncResult`

**Action:** Refactor to generic `EHRAdapter` interface; implement OptiMantra concrete adapter alongside CharmEHR.

---

## 2. Patient Data Shape (`lib/clinic/data-service.ts` + `lib/clinic/types.ts`)

Patient lookups via `getPatientById(id)`, `getAllPatients(filters)` — queries Supabase `patients` table.

```typescript
interface Patient {
  id: string                    // UUID (local Bloom ID)
  mrn: string                   // Medical record number
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  state: string
  status: 'active' | 'inactive' | 'onboarding' | 'paused' | 'discharged'
  primaryProtocol: ProtocolType
  adherence: 'excellent' | 'good' | 'fair' | 'poor' | 'unknown'
  riskScore: number
  assignedPhysicianId: string
  enrollmentDate: string
  lastVisitDate: string
  nextFollowUpDate: string
  lastLabDate: string
  nextLabDueDate: string
  activeAlertCount: number
  pendingRefills: number
  tags: string[]
  notes?: string
}
```

DB already has: `ehr_provider`, `ehr_external_id`, `treatment_type` columns on `patients` table.

---

## 3. OptiMantra ID Migration Plan (`compliance/optimantra-id-migration.md`)

**Status:** EXISTS — drafted in Group 4 Stage 1

Plan summary:
- Create `patient_id_mapping` table: `bloom_id (UUID) → optimantra_id (TEXT)`
- Match patients by email against OptiMantra API
- Update compliance tables from Bloom UUIDs to OptiMantra IDs
- Rollback via mapping table reversal
- Execution deferred to post-onboarding (Group 5A implements the script)

---

## 4. Migration Targets (tables with `patient_id UUID`)

| Table | patient_id Type | Migration Target? | Source |
|-------|-----------------|-------------------|--------|
| `compounded_rx_justifications` | UUID NOT NULL | ✅ Yes | 20260429_clinical_compliance_gates.sql |
| `pmp_queries` | UUID NOT NULL | ✅ Yes | 20260429_clinical_compliance_gates.sql |
| `medical_director_review_queue` | UUID | ✅ Yes | 20260429_clinical_compliance_gates.sql |
| `ai_write_confirmations` | UUID | ✅ Yes | 20260429_clinical_compliance_gates.sql |
| `signed_consents` | UUID | ✅ Yes | 20260428_consent_records.sql |
| `consent_records` | (email-based) | ❌ No patient_id | 20260428_consent_records.sql |
| `lead_attribution` | UUID | ✅ Yes (optional) | 20260501_acquisition_infrastructure.sql |

**5 compliance tables** + 1 acquisition table need OptiMantra ID columns added.

---

## Conclusion

All infrastructure is in place. Proceeding to Phase 1 (OptiMantra API client).
