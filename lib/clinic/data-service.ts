/**
 * Bloom Metabolics — Clinical Data Service
 * Queries Supabase for live patient data. Falls back to seed data when Supabase is unavailable.
 * Powers MCP tools, agent API routes, and dashboard queries.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import {
  SEED_PATIENTS, SEED_LABS, SEED_VITALS, SEED_ALERTS, SEED_TASKS,
  SEED_REFILLS, SEED_MEDICATIONS, SEED_ENCOUNTERS, SEED_SYMPTOMS,
  SEED_INSIGHTS, SEED_USERS, SEED_NOTIFICATIONS,
} from './seed-data'
import { LAB_REFERENCE_RANGES } from './types'
import type { Patient, Alert, Task, AgentInsight, LabMarker } from './types'
import { createNotification } from './mcp-adapter'

// ── Supabase Client ─────────────────────────────────────────

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
  if (!url || !key) return null
  return createClient(url, key)
}

// Helper to map DB row (snake_case) to Patient interface (camelCase)
// Maps to actual Supabase column names from existing schema
function mapDbPatient(row: Record<string, unknown>): Patient {
  return {
    id: row.id as string,
    mrn: (row.mrn as string) || '',
    firstName: row.first_name as string,
    lastName: row.last_name as string,
    email: row.email as string,
    phone: (row.phone as string) || '',
    dateOfBirth: (row.date_of_birth as string) || '',
    gender: (row.gender as Patient['gender']) || 'male',
    state: (row.state as string) || '',
    status: (row.status as Patient['status']) || 'onboarding',
    primaryProtocol: (row.current_protocol as Patient['primaryProtocol']) || (row.primary_protocol as Patient['primaryProtocol']) || 'custom',
    adherence: (row.adherence as Patient['adherence']) || 'unknown',
    riskScore: (row.risk_score as number) || (row.churn_risk_score as number) || 0,
    assignedPhysicianId: (row.provider_assigned as string) || (row.assigned_physician_id as string) || '',
    enrollmentDate: (row.enrollment_date as string) || (row.created_at as string)?.split('T')[0] || '',
    lastVisitDate: (row.last_visit_date as string) || (row.last_check_in as string) || '',
    nextFollowUpDate: (row.next_follow_up_date as string) || (row.next_check_in as string) || '',
    lastLabDate: (row.last_lab_date as string) || '',
    nextLabDueDate: (row.next_lab_due_date as string) || (row.refill_due_date as string) || '',
    activeAlertCount: (row.active_alert_count as number) || 0,
    pendingRefills: (row.pending_refills as number) || 0,
    tags: (row.tags as string[]) || [],
    notes: (row.notes as string) || '',
    // Extra fields for dashboard
    treatmentType: row.treatment_type as string,
    ehrProvider: row.ehr_provider as string,
    ehrExternalId: row.ehr_external_id as string,
  } as Patient & { treatmentType?: string; ehrProvider?: string; ehrExternalId?: string }
}

// ── Patient Queries ──────────────────────────────────────────

export async function getPatientById(id: string): Promise<Patient | null> {
  const sb = getSupabase()
  if (sb) {
    const { data } = await sb
      .from('patients')
      .select('*')
      .or(`id.eq.${id},mrn.eq.${id}`)
      .maybeSingle()
    if (data) return mapDbPatient(data)
  }
  return null
}

export async function getAllPatients(filters?: {
  status?: string
  treatmentType?: string
  search?: string
}): Promise<Patient[]> {
  const sb = getSupabase()
  if (sb) {
    let query = sb.from('patients').select('*').order('created_at', { ascending: false })
    if (filters?.status) query = query.eq('status', filters.status)
    if (filters?.treatmentType) query = query.eq('treatment_type', filters.treatmentType)
    if (filters?.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,mrn.ilike.%${filters.search}%`)
    }
    const { data, error } = await query
    if (!error && data) return data.map(mapDbPatient)
  }
  // Supabase unavailable — fail securely, never serve seed data in production
  if (process.env.NODE_ENV === 'production') {
    console.error('[SECURITY] Supabase unavailable — refusing to serve data')
    return []
  }
  return []
}

export async function getPatientSummary(patientId: string) {
  const patient = await getPatientById(patientId)
  if (!patient) return null

  const sb = getSupabase()

  // Try Supabase first for related data
  let recentLabs = SEED_LABS.filter(l => l.patientId === patientId)
  let recentVitals = SEED_VITALS.filter(v => v.patientId === patientId)
  let activeAlerts = SEED_ALERTS.filter(a => a.patientId === patientId && a.status === 'active')
  let activeMeds = SEED_MEDICATIONS.filter(m => m.patientId === patientId && m.isActive)
  let recentEncounters = SEED_ENCOUNTERS.filter(e => e.patientId === patientId)
  let symptoms = SEED_SYMPTOMS.filter(s => s.patientId === patientId)

  if (sb) {
    const [labsRes, vitalsRes, alertsRes, medsRes, encountersRes] = await Promise.all([
      sb.from('lab_results').select('*').eq('patient_id', patientId).order('collected_at', { ascending: false }).limit(20),
      sb.from('vitals').select('*').eq('patient_id', patientId).order('recorded_at', { ascending: false }).limit(10),
      sb.from('clinical_alerts').select('*').eq('patient_id', patientId).eq('status', 'active'),
      sb.from('medications').select('*').eq('patient_id', patientId).eq('is_active', true),
      sb.from('encounters').select('*').eq('patient_id', patientId).order('date', { ascending: false }).limit(5),
    ])

    if (labsRes.data?.length) recentLabs = labsRes.data.map(l => ({
      ...l, patientId: l.patient_id, referenceMin: l.reference_min, referenceMax: l.reference_max,
      isAbnormal: l.is_abnormal, collectedAt: l.collected_at, reportedAt: l.reported_at, orderId: l.order_id,
    }))
    if (vitalsRes.data?.length) recentVitals = vitalsRes.data.map(v => ({
      ...v, patientId: v.patient_id, recordedAt: v.recorded_at,
    }))
    if (alertsRes.data?.length) activeAlerts = alertsRes.data.map(a => ({
      ...a, patientId: a.patient_id, patientName: a.patient_name, createdAt: a.created_at,
      acknowledgedAt: a.acknowledged_at, resolvedAt: a.resolved_at, ownerId: a.owner_id,
      ownerName: a.owner_name, triggerValue: a.trigger_value, triggerThreshold: a.trigger_threshold,
      resolutionNotes: a.resolution_notes,
    }))
    if (medsRes.data?.length) activeMeds = medsRes.data.map(m => ({
      ...m, patientId: m.patient_id, startDate: m.start_date, endDate: m.end_date,
      isActive: m.is_active, prescriberId: m.prescriber_id,
    }))
    if (encountersRes.data?.length) recentEncounters = encountersRes.data.map(e => ({
      ...e, patientId: e.patient_id, providerId: e.provider_id, providerName: e.provider_name,
      chiefComplaint: e.chief_complaint, followUpDate: e.follow_up_date,
    }))
  }

  recentLabs.sort((a, b) => (b.collectedAt || '').localeCompare(a.collectedAt || ''))
  recentVitals.sort((a, b) => (b.recordedAt || '').localeCompare(a.recordedAt || ''))
  recentEncounters.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  symptoms.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  const latestLabsByMarker: Record<string, { value: number; unit: string; date: string; isAbnormal: boolean }> = {}
  for (const lab of recentLabs) {
    if (!latestLabsByMarker[lab.marker]) {
      latestLabsByMarker[lab.marker] = {
        value: lab.value, unit: lab.unit, date: lab.collectedAt, isAbnormal: lab.isAbnormal,
      }
    }
  }

  const insights = SEED_INSIGHTS.filter(i => i.patientId === patientId)

  return {
    patient, recentLabs, latestLabsByMarker, recentVitals, activeAlerts,
    activeMedications: activeMeds, recentEncounters, symptoms, insights,
    currentProtocol: patient.primaryProtocol, adherence: patient.adherence, riskScore: patient.riskScore,
  }
}

export async function getPatientLabs(patientId: string, filters?: {
  marker?: string; fromDate?: string; toDate?: string
}) {
  const sb = getSupabase()
  if (sb) {
    let query = sb.from('lab_results').select('*').eq('patient_id', patientId)
    if (filters?.marker) query = query.eq('marker', filters.marker)
    if (filters?.fromDate) query = query.gte('collected_at', filters.fromDate)
    if (filters?.toDate) query = query.lte('collected_at', filters.toDate)
    const { data } = await query.order('collected_at', { ascending: false })
    if (data?.length) return data.map(l => ({
      ...l, patientId: l.patient_id, referenceMin: l.reference_min, referenceMax: l.reference_max,
      isAbnormal: l.is_abnormal, collectedAt: l.collected_at, reportedAt: l.reported_at,
    }))
  }
  let labs = SEED_LABS.filter(l => l.patientId === patientId)
  if (filters?.marker) labs = labs.filter(l => l.marker === filters.marker)
  if (filters?.fromDate) labs = labs.filter(l => l.collectedAt >= filters.fromDate!)
  if (filters?.toDate) labs = labs.filter(l => l.collectedAt <= filters.toDate!)
  return labs.sort((a, b) => b.collectedAt.localeCompare(a.collectedAt))
}

export async function getPatientVitals(patientId: string, filters?: {
  vitalType?: string; fromDate?: string; toDate?: string
}) {
  const sb = getSupabase()
  if (sb) {
    let query = sb.from('vitals').select('*').eq('patient_id', patientId)
    if (filters?.vitalType) query = query.eq('type', filters.vitalType)
    if (filters?.fromDate) query = query.gte('recorded_at', filters.fromDate)
    if (filters?.toDate) query = query.lte('recorded_at', filters.toDate)
    const { data } = await query.order('recorded_at', { ascending: false })
    if (data?.length) return data.map(v => ({
      ...v, patientId: v.patient_id, recordedAt: v.recorded_at,
    }))
  }
  let vitals = SEED_VITALS.filter(v => v.patientId === patientId)
  if (filters?.vitalType) vitals = vitals.filter(v => v.type === filters.vitalType)
  if (filters?.fromDate) vitals = vitals.filter(v => v.recordedAt >= filters.fromDate!)
  if (filters?.toDate) vitals = vitals.filter(v => v.recordedAt <= filters.toDate!)
  return vitals.sort((a, b) => b.recordedAt.localeCompare(a.recordedAt))
}

// ── Attention Lists ──────────────────────────────────────────

export async function getPatientsRequiringAttention(reason?: string, limit = 20) {
  const patients = await getAllPatients({ status: 'active' })
  const now = new Date()

  let filtered = patients
  switch (reason) {
    case 'alerts':
      filtered = patients.filter(p => p.activeAlertCount > 0)
      break
    case 'overdue_labs':
      filtered = patients.filter(p => p.nextLabDueDate && new Date(p.nextLabDueDate) < now)
      break
    case 'pending_refills':
      filtered = patients.filter(p => p.pendingRefills > 0)
      break
    case 'missed_followups':
      filtered = patients.filter(p => p.nextFollowUpDate && new Date(p.nextFollowUpDate) < now)
      break
    default:
      filtered = patients.filter(p =>
        p.activeAlertCount > 0 ||
        (p.nextLabDueDate && new Date(p.nextLabDueDate) < now) ||
        p.pendingRefills > 0 ||
        (p.nextFollowUpDate && new Date(p.nextFollowUpDate) < now)
      )
  }

  return filtered.sort((a, b) => b.riskScore - a.riskScore).slice(0, limit)
}

// ── Alert + Task + Insight Operations ───────────────────────

const runtimeAlerts: Alert[] = []
const runtimeTasks: Task[] = []
const runtimeInsights: AgentInsight[] = []

export function createAlert(input: Omit<Alert, 'id' | 'status' | 'createdAt'>): Alert {
  const alert: Alert = {
    ...input,
    id: `alert_rt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: 'active',
    createdAt: new Date().toISOString(),
  }
  runtimeAlerts.push(alert)

  // Also persist to Supabase
  const sb = getSupabase()
  if (sb) {
    sb.from('clinical_alerts').insert({
      patient_id: alert.patientId,
      patient_name: alert.patientName,
      category: alert.category,
      severity: alert.severity,
      status: 'active',
      title: alert.title,
      description: alert.description,
      rationale: alert.rationale,
      trigger_value: alert.triggerValue,
      trigger_threshold: alert.triggerThreshold,
    }).then(({ error }) => {
      if (error) console.error('Failed to persist alert:', error)
    })
  }

  createNotification({
    recipientId: 'usr_admin_001',
    type: 'alert',
    title: `Alert: ${alert.title}`,
    message: `${alert.patientName} — ${alert.description}`,
    patientId: alert.patientId,
    severity: alert.severity,
    actionUrl: `/clinic/patients/${alert.patientId}`,
  })

  return alert
}

export function createTask(input: Omit<Task, 'id' | 'createdAt'>): Task {
  const task: Task = {
    ...input,
    id: `task_rt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  }
  runtimeTasks.push(task)

  const sb = getSupabase()
  if (sb) {
    sb.from('clinical_tasks').insert({
      patient_id: task.patientId,
      patient_name: task.patientName,
      type: task.type,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignee_id: task.assigneeId,
      assignee_name: task.assigneeName,
      due_date: task.dueDate,
      created_by: task.createdBy,
    }).then(({ error }) => {
      if (error) console.error('Failed to persist task:', error)
    })
  }

  createNotification({
    recipientId: 'usr_admin_001',
    type: 'task',
    title: `Task: ${task.title}`,
    message: `${task.description} — assigned to ${task.assigneeName}`,
    patientId: task.patientId,
    severity: task.priority === 'urgent' ? 'critical' : task.priority === 'high' ? 'high' : 'medium',
    actionUrl: '/clinic/tasks',
  })

  return task
}

export function createInsight(input: Omit<AgentInsight, 'id' | 'generatedAt'>): AgentInsight {
  const insight: AgentInsight = {
    ...input,
    id: `ins_rt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    generatedAt: new Date().toISOString(),
  }
  runtimeInsights.push(insight)
  return insight
}

export async function getAllAlerts() {
  const sb = getSupabase()
  if (sb) {
    const { data } = await sb.from('clinical_alerts').select('*').order('created_at', { ascending: false })
    if (data?.length) return data.map(a => ({
      ...a, patientId: a.patient_id, patientName: a.patient_name, createdAt: a.created_at,
      acknowledgedAt: a.acknowledged_at, resolvedAt: a.resolved_at, ownerId: a.owner_id,
      ownerName: a.owner_name, triggerValue: a.trigger_value, triggerThreshold: a.trigger_threshold,
      resolutionNotes: a.resolution_notes,
    }))
  }
  return [...SEED_ALERTS, ...runtimeAlerts]
}

export async function getAllTasks() {
  const sb = getSupabase()
  if (sb) {
    const { data } = await sb.from('clinical_tasks').select('*').order('created_at', { ascending: false })
    if (data?.length) return data.map(t => ({
      ...t, patientId: t.patient_id, patientName: t.patient_name,
      assigneeId: t.assignee_id, assigneeName: t.assignee_name,
      dueDate: t.due_date, completedAt: t.completed_at,
      createdAt: t.created_at, createdBy: t.created_by,
    }))
  }
  return [...SEED_TASKS, ...runtimeTasks]
}

export function getAllInsights() {
  return [...SEED_INSIGHTS, ...runtimeInsights]
}

// ── Chart Review (for provider dashboard) ───────────────────

export async function generateChartReviewContext(patientId: string, lookbackDays = 90) {
  const summary = await getPatientSummary(patientId)
  if (!summary) return null

  const { patient, latestLabsByMarker, activeAlerts, activeMedications, recentEncounters, symptoms } = summary

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - lookbackDays)
  const cutoffStr = cutoff.toISOString().split('T')[0]

  const recentLabs = (await getPatientLabs(patientId, { fromDate: cutoffStr }))
  const abnormalLabs = recentLabs.filter(l => l.isAbnormal)

  const flaggedConcerns: string[] = []
  if (activeAlerts.length > 0) {
    flaggedConcerns.push(...activeAlerts.map(a => `${a.severity.toUpperCase()}: ${a.title} — ${a.rationale}`))
  }
  if (patient.adherence === 'poor' || patient.adherence === 'fair') {
    flaggedConcerns.push(`Adherence is ${patient.adherence} — may affect treatment efficacy`)
  }
  if (abnormalLabs.length > 0) {
    flaggedConcerns.push(...abnormalLabs.slice(0, 5).map(l => {
      const ref = LAB_REFERENCE_RANGES[l.marker as LabMarker]
      return `${ref?.label || l.marker}: ${l.value} ${l.unit} (ref: ${l.referenceMin}-${l.referenceMax})`
    }))
  }

  const suggestedActions: string[] = []
  if (patient.nextFollowUpDate && new Date(patient.nextFollowUpDate) < new Date()) {
    suggestedActions.push('Schedule overdue follow-up')
  }
  if (patient.nextLabDueDate && new Date(patient.nextLabDueDate) < new Date()) {
    suggestedActions.push('Order overdue labs')
  }
  if (activeAlerts.some(a => a.severity === 'critical')) {
    suggestedActions.push('Address critical alerts immediately')
  }
  if (patient.pendingRefills > 0) {
    suggestedActions.push(`Review ${patient.pendingRefills} pending refill(s)`)
  }

  return {
    patient: {
      name: `${patient.firstName} ${patient.lastName}`,
      mrn: patient.mrn,
      age: Math.floor((Date.now() - new Date(patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
      gender: patient.gender,
      protocol: patient.primaryProtocol,
      adherence: patient.adherence,
      riskScore: patient.riskScore,
      status: patient.status,
    },
    medications: activeMedications.map(m => `${m.name} ${m.dosage} ${m.frequency}`),
    latestLabs: latestLabsByMarker,
    recentEncounterSummaries: recentEncounters.slice(0, 3).map(e => ({
      date: e.date, type: e.type, assessment: e.assessment, plan: e.plan,
    })),
    symptomTrends: symptoms.slice(0, 2).map(s => ({
      date: s.date, energy: s.energyLevel, libido: s.libido, mood: s.mood,
      sleep: s.sleepQuality, sideEffects: s.sideEffects,
    })),
    flaggedConcerns,
    suggestedActions,
    lookbackDays,
  }
}
