/**
 * Bloom Metabolics — PHI Redaction Utility
 * Default-deny: all fields are redacted unless explicitly allowed.
 * Used across audit logging, error responses, and external service payloads.
 */

// Fields that contain PHI and must ALWAYS be redacted in logs
const PHI_FIELDS = new Set([
  'ssn', 'socialsecurity', 'social_security',
  'password', 'token', 'secret', 'creditcard', 'credit_card',
  'cvv', 'cardnumber', 'card_number', 'bankaccount', 'bank_account', 'routingnumber', 'routing_number',
  'email', 'phone', 'phonenumber', 'phone_number',
  'firstname', 'first_name', 'lastname', 'last_name', 'name', 'fullname', 'full_name',
  'dateofbirth', 'date_of_birth', 'dob', 'birthdate',
  'address', 'street', 'city', 'zipcode', 'zip_code', 'zip',
  'medications', 'currentmedications', 'current_medications', 'allergies',
  'medicalhistory', 'medical_history', 'medical_history_encrypted',
  'currentmedications_encrypted', 'current_medications_encrypted',
  'symptoms', 'symptomsnotes', 'symptoms_notes', 'symptoms_notes_encrypted',
  'contraindications', 'contraindications_encrypted',
  'diagnoses', 'priordiagnoses', 'prior_diagnoses',
  'labvalues', 'lab_values', 'testosteronelevel', 'testosterone_level',
  'weight', 'bmi', 'height', 'waist',
  'signaturename', 'signature_name', 'signaturedate', 'signature_date',
  'formdata', 'form_data',
  'goals', 'expectations', 'notes',
  'sideeffects', 'side_effects',
  'priortrtusedetails', 'prior_trt_details',
  'priorglp1sideeffects', 'prior_glp1_side_effects',
  'ipaddress', 'ip_address',
])

// Fields that are safe to include in logs
const SAFE_FIELDS = new Set([
  'id', 'mrn', 'status', 'treatment_type', 'intake_type',
  'current_step', 'total_steps', 'consent_signed',
  'created_at', 'updated_at', 'completed_at',
  'severity', 'priority', 'category', 'type', 'task_type',
  'action', 'resource_type', 'resource_id',
  'stripe_session_id', 'session_type',
  'adherence', 'risk_score',
])

/**
 * Redact PHI from an object for safe logging.
 * Default-deny: only fields in SAFE_FIELDS pass through.
 * All other fields are replaced with [REDACTED].
 */
export function redactPHI(data: Record<string, unknown>, mode: 'strict' | 'permissive' = 'strict'): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase().replace(/[^a-z_]/g, '')

    if (mode === 'strict') {
      // Strict: only explicitly safe fields pass through
      if (SAFE_FIELDS.has(lowerKey)) {
        result[key] = value
      } else {
        result[key] = '[REDACTED]'
      }
    } else {
      // Permissive: only explicitly PHI fields are redacted
      if (PHI_FIELDS.has(lowerKey)) {
        result[key] = '[REDACTED]'
      } else {
        result[key] = value
      }
    }
  }

  return result
}

/**
 * Redact a single string value if it looks like PHI.
 */
export function redactIfPHI(fieldName: string, value: unknown): string {
  const lowerField = fieldName.toLowerCase().replace(/[^a-z_]/g, '')
  if (PHI_FIELDS.has(lowerField)) return '[REDACTED]'
  return String(value)
}
