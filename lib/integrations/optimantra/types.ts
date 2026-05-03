/**
 * Bloom Metabolics — OptiMantra Entity Types
 * SHAPE GUESSED — verify against OptiMantra API responses during integration testing
 */

export interface OptiMantraPatient {
  id: string
  external_id?: string // Bloom's local UUID stored in OptiMantra
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth: string // ISO date
  gender: 'male' | 'female' | 'other' | 'unknown'
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  status: string
  created_at: string
  updated_at: string
  [key: string]: unknown // Extension fields
}

export interface OptiMantraPatientInput {
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth: string
  gender: 'male' | 'female' | 'other' | 'unknown'
  external_id?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  [key: string]: unknown
}

export interface OptiMantraPrescription {
  id: string
  patient_id: string
  prescriber_id: string
  drug_name: string
  drug_ndc?: string
  quantity: number
  refills: number
  directions: string
  dea_schedule?: string // 'II' | 'III' | 'IV' | 'V' | null
  is_compounded: boolean
  pharmacy_name?: string
  prescribed_at: string
  status: string
  created_at: string
  [key: string]: unknown
}

export interface OptiMantraLabResult {
  id: string
  patient_id: string
  order_id?: string
  test_name: string
  result_value: string
  result_unit?: string
  reference_range?: string
  abnormal_flag?: 'high' | 'low' | 'critical_high' | 'critical_low' | null
  collected_at: string
  resulted_at: string
  status: string
  [key: string]: unknown
}

export interface OptiMantraAppointment {
  id: string
  patient_id: string
  provider_id: string
  appointment_type: string
  status: 'scheduled' | 'completed' | 'canceled' | 'no_show'
  start_at: string
  end_at: string
  notes?: string
  created_at: string
  [key: string]: unknown
}

export interface OptiMantraDocument {
  id: string
  patient_id: string
  document_type: string
  file_name: string
  mime_type: string
  uploaded_at: string
  uploaded_by?: string
  [key: string]: unknown
}

export interface OptiMantraProvider {
  id: string
  first_name: string
  last_name: string
  npi?: string
  dea_number?: string
  specialty?: string
  email?: string
  status: string
  [key: string]: unknown
}

export interface DocumentMetadata {
  document_type: string
  file_name: string
  mime_type: string
  description?: string
}

export interface DateRange {
  from?: string // ISO date
  to?: string   // ISO date
}

export interface OptiMantraWebhookEvent {
  event_type: string
  timestamp: string
  data: Record<string, unknown>
  signature?: string
}
