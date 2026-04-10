/**
 * Nova Health — Clinical Data Service
 * Serves real data from seed store (swap for Supabase in production).
 * Powers MCP tools, agent API routes, and dashboard queries.
 */

import {
  SEED_PATIENTS, SEED_LABS, SEED_VITALS, SEED_ALERTS, SEED_TASKS,
  SEED_REFILLS, SEED_MEDICATIONS, SEED_ENCOUNTERS, SEED_SYMPTOMS,
  SEED_INSIGHTS, SEED_USERS, SEED_NOTIFICATIONS,
} from './seed-data'
import { LAB_REFERENCE_RANGES } from './types'
import type { Alert, Task, AgentInsight, LabMarker } from './types'
import { createNotification, type Notification } from './mcp-adapter'

// ── Patient Queries ──────────────────────────────────────────

export function getPatientById(id: string) {
  return SEED_PATIENTS.find(p => p.id === id || p.mrn === id) ?? null
}

export function getPatientSummary(patientId: string) {
  const patient = getPatientById(patientId)
  if (!patient) return null

  const recentLabs = SEED_LABS
    .filter(l => l.patientId === patient.id)
    .sort((a, b) => b.collectedAt.localeCompare(a.collectedAt))
    .slice(0, 20)

  const recentVitals = SEED_VITALS
    .filter(v => v.patientId === patient.id)
    .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt))
    .slice(0, 10)

  const activeAlerts = SEED_ALERTS
    .filter(a => a.patientId === patient.id && a.status === 'active')

  const activeMeds = SEED_MEDICATIONS
    .filter(m => m.patientId === patient.id && m.isActive)

  const recentEncounters = SEED_ENCOUNTERS
    .filter(e => e.patientId === patient.id)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  const symptoms = SEED_SYMPTOMS
    .filter(s => s.patientId === patient.id)
    .sort((a, b) => b.date.localeCompare(a.date))

  const insights = SEED_INSIGHTS
    .filter(i => i.patientId === patient.id)

  // Build latest labs by marker
  const latestLabsByMarker: Record<string, { value: number; unit: string; date: string; isAbnormal: boolean }> = {}
  for (const lab of recentLabs) {
    if (!latestLabsByMarker[lab.marker]) {
      latestLabsByMarker[lab.marker] = {
        value: lab.value,
        unit: lab.unit,
        date: lab.collectedAt,
        isAbnormal: lab.isAbnormal,
      }
    }
  }

  return {
    patient,
    recentLabs,
    latestLabsByMarker,
    recentVitals,
    activeAlerts,
    activeMedications: activeMeds,
    recentEncounters,
    symptoms,
    insights,
    currentProtocol: patient.primaryProtocol,
    adherence: patient.adherence,
    riskScore: patient.riskScore,
  }
}

export function getPatientLabs(patientId: string, filters?: {
  marker?: string
  fromDate?: string
  toDate?: string
}) {
  let labs = SEED_LABS.filter(l => l.patientId === patientId)
  if (filters?.marker) labs = labs.filter(l => l.marker === filters.marker)
  if (filters?.fromDate) labs = labs.filter(l => l.collectedAt >= filters.fromDate!)
  if (filters?.toDate) labs = labs.filter(l => l.collectedAt <= filters.toDate!)
  return labs.sort((a, b) => b.collectedAt.localeCompare(a.collectedAt))
}

export function getPatientVitals(patientId: string, filters?: {
  vitalType?: string
  fromDate?: string
  toDate?: string
}) {
  let vitals = SEED_VITALS.filter(v => v.patientId === patientId)
  if (filters?.vitalType) vitals = vitals.filter(v => v.type === filters.vitalType)
  if (filters?.fromDate) vitals = vitals.filter(v => v.recordedAt >= filters.fromDate!)
  if (filters?.toDate) vitals = vitals.filter(v => v.recordedAt <= filters.toDate!)
  return vitals.sort((a, b) => b.recordedAt.localeCompare(a.recordedAt))
}

// ── Attention Lists ──────────────────────────────────────────

export function getPatientsRequiringAttention(reason?: string, limit = 20) {
  const now = new Date()
  let patients = [...SEED_PATIENTS].filter(p => p.status === 'active')

  switch (reason) {
    case 'alerts':
      patients = patients.filter(p => p.activeAlertCount > 0)
      break
    case 'overdue_labs':
      patients = patients.filter(p => new Date(p.nextLabDueDate) < now)
      break
    case 'pending_refills':
      patients = patients.filter(p => p.pendingRefills > 0)
      break
    case 'missed_followups':
      patients = patients.filter(p => new Date(p.nextFollowUpDate) < now)
      break
    default:
      patients = patients.filter(p =>
        p.activeAlertCount > 0 ||
        new Date(p.nextLabDueDate) < now ||
        p.pendingRefills > 0 ||
        new Date(p.nextFollowUpDate) < now
      )
  }

  return patients
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, limit)
}

// ── Alert + Task Creation ────────────────────────────────────

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

  // Notify Brian
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

  // Notify Brian
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

export function getAllAlerts() {
  return [...SEED_ALERTS, ...runtimeAlerts]
}

export function getAllTasks() {
  return [...SEED_TASKS, ...runtimeTasks]
}

export function getAllInsights() {
  return [...SEED_INSIGHTS, ...runtimeInsights]
}

// ── Chart Review Generator (structured context for AI) ───────

export function generateChartReviewContext(patientId: string, lookbackDays = 90) {
  const summary = getPatientSummary(patientId)
  if (!summary) return null

  const { patient, latestLabsByMarker, activeAlerts, activeMedications, recentEncounters, symptoms } = summary
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - lookbackDays)
  const cutoffStr = cutoff.toISOString().split('T')[0]

  const recentLabs = SEED_LABS
    .filter(l => l.patientId === patientId && l.collectedAt >= cutoffStr)
    .sort((a, b) => b.collectedAt.localeCompare(a.collectedAt))

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
  if (new Date(patient.nextFollowUpDate) < new Date()) {
    suggestedActions.push('Schedule overdue follow-up')
  }
  if (new Date(patient.nextLabDueDate) < new Date()) {
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
      date: e.date,
      type: e.type,
      assessment: e.assessment,
      plan: e.plan,
    })),
    symptomTrends: symptoms.slice(0, 2).map(s => ({
      date: s.date,
      energy: s.energyLevel,
      libido: s.libido,
      mood: s.mood,
      sleep: s.sleepQuality,
      sideEffects: s.sideEffects,
    })),
    flaggedConcerns,
    suggestedActions,
    lookbackDays,
  }
}
