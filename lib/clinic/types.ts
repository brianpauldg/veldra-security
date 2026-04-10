import { z } from 'zod'

// ── Enums & Constants ────────────────────────────────────────

export type UserRole = 'super_admin' | 'physician' | 'clinician' | 'rn_ma' | 'admin_ops'

export type PatientStatus = 'active' | 'inactive' | 'onboarding' | 'paused' | 'discharged'

export type Gender = 'male' | 'female' | 'other'

export type ProtocolType =
  | 'trt_standard'
  | 'trt_hcg'
  | 'trt_enclomiphene'
  | 'glp1_semaglutide'
  | 'glp1_tirzepatide'
  | 'peptide_bpc157'
  | 'peptide_cjc_ipamorelin'
  | 'peptide_pt141'
  | 'custom'

export type AdherenceLevel = 'excellent' | 'good' | 'fair' | 'poor' | 'unknown'

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'dismissed'

export type AlertCategory =
  | 'elevated_hematocrit'
  | 'estradiol_out_of_range'
  | 'rising_psa'
  | 'elevated_bp'
  | 'missed_followup'
  | 'overdue_labs'
  | 'refill_gap'
  | 'symptom_deterioration'
  | 'adherence_concern'
  | 'missing_monitoring'

export type TaskType =
  | 'followup_review'
  | 'refill_review'
  | 'lab_review'
  | 'protocol_review'
  | 'patient_outreach'
  | 'admin_ops'

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'

export type TaskPriority = 'urgent' | 'high' | 'normal' | 'low'

export type LabMarker =
  | 'total_testosterone'
  | 'free_testosterone'
  | 'shbg'
  | 'estradiol'
  | 'hematocrit'
  | 'hemoglobin'
  | 'rbc'
  | 'psa'
  | 'alt'
  | 'ast'
  | 'total_cholesterol'
  | 'ldl'
  | 'hdl'
  | 'triglycerides'
  | 'a1c'
  | 'fasting_glucose'
  | 'fasting_insulin'
  | 'tsh'
  | 'free_t3'
  | 'free_t4'
  | 'prolactin'
  | 'lh'
  | 'fsh'
  | 'dhea_s'
  | 'igf1'
  | 'cbc_wbc'
  | 'cbc_platelets'
  | 'creatinine'
  | 'egfr'

export type VitalType =
  | 'bp_systolic'
  | 'bp_diastolic'
  | 'heart_rate'
  | 'weight'
  | 'bmi'
  | 'waist'
  | 'body_fat_pct'
  | 'sleep_hours'
  | 'steps'

export type RefillStatus = 'pending' | 'approved' | 'denied' | 'shipped' | 'delivered'

export type EncounterType = 'initial_consult' | 'follow_up' | 'lab_review' | 'protocol_change' | 'urgent' | 'admin'

// ── Core Models ──────────────────────────────────────────────

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatarUrl?: string
  isActive: boolean
  createdAt: string
  lastLoginAt?: string
}

export interface Patient {
  id: string
  mrn: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: Gender
  state: string
  status: PatientStatus
  primaryProtocol: ProtocolType
  adherence: AdherenceLevel
  riskScore: number // 0-100
  assignedPhysicianId: string
  assignedPhysician?: string
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

export interface Encounter {
  id: string
  patientId: string
  type: EncounterType
  date: string
  providerId: string
  providerName: string
  chiefComplaint?: string
  assessment: string
  plan: string
  followUpDate?: string
  notes?: string
}

export interface Vital {
  id: string
  patientId: string
  type: VitalType
  value: number
  unit: string
  recordedAt: string
  source: 'patient' | 'clinic' | 'device'
}

export interface LabResult {
  id: string
  patientId: string
  marker: LabMarker
  value: number
  unit: string
  referenceMin: number
  referenceMax: number
  isAbnormal: boolean
  collectedAt: string
  reportedAt: string
  orderId?: string
}

export interface Medication {
  id: string
  patientId: string
  name: string
  dosage: string
  frequency: string
  route: string
  startDate: string
  endDate?: string
  isActive: boolean
  prescriberId: string
}

export interface Protocol {
  id: string
  patientId: string
  type: ProtocolType
  name: string
  medications: Medication[]
  startDate: string
  endDate?: string
  isActive: boolean
  notes?: string
}

export interface ProtocolChange {
  id: string
  patientId: string
  protocolId: string
  previousState: string
  newState: string
  reason: string
  changedBy: string
  changedAt: string
}

export interface SymptomAssessment {
  id: string
  patientId: string
  date: string
  energyLevel: number       // 1-10
  libido: number            // 1-10
  mood: number              // 1-10
  sleepQuality: number      // 1-10
  mentalClarity: number     // 1-10
  physicalPerformance: number // 1-10
  sideEffects: string[]
  notes?: string
}

export interface Alert {
  id: string
  patientId: string
  patientName: string
  category: AlertCategory
  severity: AlertSeverity
  status: AlertStatus
  title: string
  description: string
  rationale: string
  triggerValue?: string
  triggerThreshold?: string
  createdAt: string
  acknowledgedAt?: string
  resolvedAt?: string
  ownerId?: string
  ownerName?: string
  resolutionNotes?: string
}

export interface Task {
  id: string
  patientId?: string
  patientName?: string
  type: TaskType
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  assigneeName: string
  dueDate: string
  completedAt?: string
  createdAt: string
  createdBy: string
  notes?: string
}

export interface RefillRequest {
  id: string
  patientId: string
  patientName: string
  medicationName: string
  status: RefillStatus
  requestedAt: string
  reviewedAt?: string
  reviewedBy?: string
  trackingNumber?: string
  notes?: string
}

export interface Message {
  id: string
  patientId: string
  senderId: string
  senderName: string
  senderRole: 'patient' | 'provider' | 'system'
  content: string
  sentAt: string
  readAt?: string
}

export interface AgentInsight {
  id: string
  patientId: string
  type: 'summary' | '90_day_review' | 'risk_flag' | 'chart_review' | 'recommendation'
  title: string
  content: string
  confidence: number // 0-1
  generatedAt: string
  reviewedBy?: string
  reviewedAt?: string
  isApproved?: boolean
}

export interface AgentActionLog {
  id: string
  agentId: string
  action: string
  resourceType: string
  resourceId: string
  input: Record<string, unknown>
  output: Record<string, unknown>
  status: 'success' | 'error' | 'pending'
  executedAt: string
  durationMs: number
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  userRole: UserRole
  action: string
  resourceType: string
  resourceId: string
  details: Record<string, unknown>
  ipAddress?: string
  timestamp: string
}

// ── Lab Reference Ranges ─────────────────────────────────────

export const LAB_REFERENCE_RANGES: Record<LabMarker, { min: number; max: number; unit: string; label: string }> = {
  total_testosterone: { min: 300, max: 1000, unit: 'ng/dL', label: 'Total Testosterone' },
  free_testosterone: { min: 9, max: 30, unit: 'pg/mL', label: 'Free Testosterone' },
  shbg: { min: 10, max: 57, unit: 'nmol/L', label: 'SHBG' },
  estradiol: { min: 10, max: 40, unit: 'pg/mL', label: 'Estradiol (E2)' },
  hematocrit: { min: 38, max: 52, unit: '%', label: 'Hematocrit' },
  hemoglobin: { min: 13, max: 17.5, unit: 'g/dL', label: 'Hemoglobin' },
  rbc: { min: 4.5, max: 5.5, unit: 'M/uL', label: 'RBC' },
  psa: { min: 0, max: 4.0, unit: 'ng/mL', label: 'PSA' },
  alt: { min: 7, max: 56, unit: 'U/L', label: 'ALT' },
  ast: { min: 10, max: 40, unit: 'U/L', label: 'AST' },
  total_cholesterol: { min: 0, max: 200, unit: 'mg/dL', label: 'Total Cholesterol' },
  ldl: { min: 0, max: 100, unit: 'mg/dL', label: 'LDL' },
  hdl: { min: 40, max: 100, unit: 'mg/dL', label: 'HDL' },
  triglycerides: { min: 0, max: 150, unit: 'mg/dL', label: 'Triglycerides' },
  a1c: { min: 4.0, max: 5.6, unit: '%', label: 'HbA1c' },
  fasting_glucose: { min: 70, max: 100, unit: 'mg/dL', label: 'Fasting Glucose' },
  fasting_insulin: { min: 2.6, max: 24.9, unit: 'uIU/mL', label: 'Fasting Insulin' },
  tsh: { min: 0.4, max: 4.0, unit: 'mIU/L', label: 'TSH' },
  free_t3: { min: 2.3, max: 4.2, unit: 'pg/mL', label: 'Free T3' },
  free_t4: { min: 0.8, max: 1.8, unit: 'ng/dL', label: 'Free T4' },
  prolactin: { min: 2, max: 18, unit: 'ng/mL', label: 'Prolactin' },
  lh: { min: 1.8, max: 8.6, unit: 'mIU/mL', label: 'LH' },
  fsh: { min: 1.5, max: 12.4, unit: 'mIU/mL', label: 'FSH' },
  dhea_s: { min: 100, max: 500, unit: 'ug/dL', label: 'DHEA-S' },
  igf1: { min: 100, max: 300, unit: 'ng/mL', label: 'IGF-1' },
  cbc_wbc: { min: 4.5, max: 11.0, unit: 'K/uL', label: 'WBC' },
  cbc_platelets: { min: 150, max: 400, unit: 'K/uL', label: 'Platelets' },
  creatinine: { min: 0.7, max: 1.3, unit: 'mg/dL', label: 'Creatinine' },
  egfr: { min: 60, max: 120, unit: 'mL/min', label: 'eGFR' },
}

// ── Vital Metadata ───────────────────────────────────────────

export const VITAL_METADATA: Record<VitalType, { label: string; unit: string; min?: number; max?: number }> = {
  bp_systolic: { label: 'Systolic BP', unit: 'mmHg', min: 90, max: 140 },
  bp_diastolic: { label: 'Diastolic BP', unit: 'mmHg', min: 60, max: 90 },
  heart_rate: { label: 'Heart Rate', unit: 'bpm', min: 60, max: 100 },
  weight: { label: 'Weight', unit: 'lbs' },
  bmi: { label: 'BMI', unit: 'kg/m²', min: 18.5, max: 30 },
  waist: { label: 'Waist', unit: 'in' },
  body_fat_pct: { label: 'Body Fat', unit: '%' },
  sleep_hours: { label: 'Sleep', unit: 'hrs', min: 7, max: 9 },
  steps: { label: 'Steps', unit: 'steps/day' },
}

// ── Alert Rule Definitions ───────────────────────────────────

export const ALERT_RULES: { category: AlertCategory; label: string; description: string; severity: AlertSeverity }[] = [
  { category: 'elevated_hematocrit', label: 'Elevated Hematocrit', description: 'Hematocrit above 52%', severity: 'critical' },
  { category: 'estradiol_out_of_range', label: 'Estradiol Out of Range', description: 'E2 outside 10-40 pg/mL', severity: 'high' },
  { category: 'rising_psa', label: 'Rising PSA', description: 'PSA above 4.0 or trending up', severity: 'high' },
  { category: 'elevated_bp', label: 'Elevated Blood Pressure', description: 'BP above 140/90', severity: 'high' },
  { category: 'missed_followup', label: 'Missed Follow-up', description: 'Follow-up overdue by 7+ days', severity: 'medium' },
  { category: 'overdue_labs', label: 'Overdue Labs', description: 'Labs overdue by 14+ days', severity: 'medium' },
  { category: 'refill_gap', label: 'Refill Gap', description: 'Medication refill delayed', severity: 'medium' },
  { category: 'symptom_deterioration', label: 'Symptom Deterioration', description: 'Symptom scores declining', severity: 'high' },
  { category: 'adherence_concern', label: 'Adherence Concern', description: 'Patient adherence rated poor', severity: 'medium' },
  { category: 'missing_monitoring', label: 'Missing Monitoring', description: 'Required lab/vital not recorded', severity: 'low' },
]

// ── Zod Schemas for API Contracts ────────────────────────────

export const patientSearchSchema = z.object({
  query: z.string().optional(),
  status: z.enum(['active', 'inactive', 'onboarding', 'paused', 'discharged']).optional(),
  protocol: z.string().optional(),
  riskMin: z.number().min(0).max(100).optional(),
  riskMax: z.number().min(0).max(100).optional(),
  adherence: z.enum(['excellent', 'good', 'fair', 'poor', 'unknown']).optional(),
  hasAlerts: z.boolean().optional(),
  hasPendingRefills: z.boolean().optional(),
  sortBy: z.enum(['name', 'risk', 'lastVisit', 'nextFollowUp', 'adherence']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
})

export const createTaskSchema = z.object({
  patientId: z.string().optional(),
  type: z.enum(['followup_review', 'refill_review', 'lab_review', 'protocol_review', 'patient_outreach', 'admin_ops']),
  title: z.string().min(1),
  description: z.string(),
  priority: z.enum(['urgent', 'high', 'normal', 'low']),
  assigneeId: z.string(),
  dueDate: z.string(),
})

export const createAlertSchema = z.object({
  patientId: z.string(),
  category: z.enum([
    'elevated_hematocrit', 'estradiol_out_of_range', 'rising_psa', 'elevated_bp',
    'missed_followup', 'overdue_labs', 'refill_gap', 'symptom_deterioration',
    'adherence_concern', 'missing_monitoring',
  ]),
  severity: z.enum(['critical', 'high', 'medium', 'low', 'info']),
  title: z.string(),
  description: z.string(),
  rationale: z.string(),
  triggerValue: z.string().optional(),
  triggerThreshold: z.string().optional(),
})

export type PatientSearchParams = z.infer<typeof patientSearchSchema>
export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type CreateAlertInput = z.infer<typeof createAlertSchema>
