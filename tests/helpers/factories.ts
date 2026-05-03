/**
 * Test data factories — realistic shapes, no real PHI.
 */

let counter = 0
function uid() { return `test-${++counter}-${Math.random().toString(36).slice(2, 8)}` }

export function buildPatient(overrides: Record<string, unknown> = {}) {
  return {
    id: uid(),
    mrn: `BM-${String(counter).padStart(5, '0')}`,
    first_name: 'Test',
    last_name: 'Patient',
    email: `test${counter}@example.com`,
    phone: '5551234567',
    date_of_birth: '1990-01-01',
    gender: 'male',
    state: 'CA',
    status: 'onboarding',
    treatment_type: 'trt',
    primary_protocol: 'trt_standard',
    adherence: 'unknown',
    risk_score: 0,
    ...overrides,
  }
}

export function buildConsentRecord(overrides: Record<string, unknown> = {}) {
  return {
    id: uid(),
    user_email: `test${counter}@example.com`,
    user_phone: '5551234567',
    consent_type: 'email',
    consent_version: '1.0.0',
    granted: true,
    granted_at: new Date().toISOString(),
    form_id: 'book_form',
    ...overrides,
  }
}

export function buildLead(overrides: Record<string, unknown> = {}) {
  return {
    email: `lead${counter}@example.com`,
    firstName: 'Test',
    lastName: 'Lead',
    phone: '5559876543',
    serviceInterest: 'trt',
    source: 'test',
    ...overrides,
  }
}

export function buildProvider(overrides: Record<string, unknown> = {}) {
  return {
    id: uid(),
    user_id: uid(),
    full_name: 'Dr. Test Provider',
    role: 'clinician',
    npi: '1234567890',
    dea_number: 'AA1234567',
    dea_expiration: '2027-12-31',
    ca_medical_license: 'A12345',
    ca_license_expiration: '2027-12-31',
    cures_enrolled: true,
    cures_enrollment_date: '2026-01-01',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

export function buildJustification(overrides: Record<string, unknown> = {}) {
  return {
    id: uid(),
    patient_id: uid(),
    drug: 'compounded_semaglutide',
    deviation_categories: ['allergy'],
    deviation_details: 'PEG allergy documented',
    clinical_rationale: 'Patient has documented PEG hypersensitivity confirmed via skin prick test 2024-08-15. Compounded preparation excluding PEG is medically necessary.',
    prescriber_id: uid(),
    prescriber_npi: '1234567890',
    prescriber_signature: 'data:image/png;base64,test',
    signed_at: new Date().toISOString(),
    status: 'signed',
    created_at: new Date().toISOString(),
    ...overrides,
  }
}

export function buildPMPQuery(overrides: Record<string, unknown> = {}) {
  return {
    id: uid(),
    patient_id: uid(),
    prescriber_id: uid(),
    prescriber_dea: 'AA1234567',
    query_datetime: new Date().toISOString(),
    query_method: 'manual_portal',
    risk_stratification: 'low',
    findings_checklist: {
      multiple_prescribers: false, multiple_pharmacies: false,
      overlapping_testosterone_rx: false, concurrent_benzo_or_opioid: false,
      recent_er_substance: false, recent_decline_elsewhere: false,
    },
    attestation_signature: 'data:image/png;base64,test',
    outage_attested: false,
    created_at: new Date().toISOString(),
    ...overrides,
  }
}

export function buildMCPConfirmation(overrides: Record<string, unknown> = {}) {
  return {
    id: uid(),
    token: `tok_${uid()}`,
    ai_source: 'mcp',
    write_action: 'create_alert',
    write_payload: { title: 'Test alert', severity: 'medium' },
    suggested_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 3600000).toISOString(),
    created_at: new Date().toISOString(),
    ...overrides,
  }
}

export function buildIntakeSubmission(overrides: Record<string, unknown> = {}) {
  return {
    id: uid(),
    stripe_session_id: `cs_test_${uid()}`,
    email: `intake${counter}@example.com`,
    intake_type: 'trt',
    current_step: 0,
    total_steps: 7,
    status: 'in_progress',
    form_data: { dateOfBirth: '1990-01-01', state: 'CA', biologicalSex: 'male' },
    consent_signed: false,
    ...overrides,
  }
}
