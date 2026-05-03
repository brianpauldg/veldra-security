# Clinician Workflow — Bloom Metabolics

## Compounded GLP-1 Prescription Flow

```
Prescriber opens patient in OptiMantra
  → Decides to prescribe compounded semaglutide/tirzepatide
  → Opens Bloom /clinic/rx-justifications/new?patient_id=X
  → Completes justification form:
    - Selects deviation categories
    - Writes clinical rationale (min 100 chars, denylist enforced)
    - Signs electronically
  → Justification saved (status: signed)
  → Returns to OptiMantra
  → Prescribes via DoseSpot
  → [Group 5] OptiMantra fires prescription.created webhook
  → Bloom verifies justification exists for this patient + drug
  → If valid: no action needed
  → If missing/expired: flags for medical director review
```

## TRT Prescription Flow (CURES Gate)

```
Prescriber opens patient in OptiMantra
  → Decides to prescribe testosterone (Schedule III)
  → Opens Bloom /clinic/cures/new?patient_id=X
  → Queries CURES (via DoseSpot PMP or manual portal)
  → Records attestation:
    - Query method + reference
    - Risk stratification
    - Findings checklist (6 items)
    - Clinical judgment (if findings present)
    - Signature
  → Attestation saved
  → If high risk: medical director review alert created
  → Returns to OptiMantra
  → Prescribes via DoseSpot eRx
  → [Group 5] Webhook verifies CURES query within 120 days
```

## System Boundaries

| System | What Happens There |
|--------|-------------------|
| OptiMantra | Patient chart, encounter notes, lab review, DoseSpot eRx, CURES (via DoseSpot) |
| Bloom /clinic | Rx justification, CURES attestation, billing, intake review, provider credentials, AI suggestions |
| Stripe | Payment processing, subscriptions, invoices |
| Calendly | Appointment scheduling |
