import type { Alert, AlertCategory, AlertSeverity, Patient, LabResult, Vital } from './types'
import { LAB_REFERENCE_RANGES } from './types'

type AlertRuleInput = {
  patient: Patient
  labs: LabResult[]
  vitals: Vital[]
}

type AlertRuleFn = (input: AlertRuleInput) => Omit<Alert, 'id' | 'createdAt' | 'status'> | null

// ── Alert Rule Engine ────────────────────────────────────────

const rules: AlertRuleFn[] = [
  // Elevated hematocrit
  ({ patient, labs }) => {
    const latest = labs.filter(l => l.marker === 'hematocrit').sort((a, b) => b.collectedAt.localeCompare(a.collectedAt))[0]
    if (!latest || latest.value <= 52) return null
    return {
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      category: 'elevated_hematocrit',
      severity: latest.value > 54 ? 'critical' : 'high',
      title: `Hematocrit ${latest.value}%`,
      description: `Patient hematocrit is ${latest.value}%, above the 52% threshold.`,
      rationale: 'Elevated hematocrit increases thrombotic risk. Consider therapeutic phlebotomy or dose adjustment.',
      triggerValue: `${latest.value}%`,
      triggerThreshold: '52%',
    }
  },

  // Estradiol out of range
  ({ patient, labs }) => {
    const latest = labs.filter(l => l.marker === 'estradiol').sort((a, b) => b.collectedAt.localeCompare(a.collectedAt))[0]
    if (!latest) return null
    const ref = LAB_REFERENCE_RANGES.estradiol
    if (latest.value >= ref.min && latest.value <= ref.max) return null
    const direction = latest.value < ref.min ? 'low' : 'high'
    return {
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      category: 'estradiol_out_of_range',
      severity: 'high',
      title: `Estradiol ${direction}: ${latest.value} pg/mL`,
      description: `Estradiol is ${latest.value} pg/mL (ref: ${ref.min}-${ref.max}).`,
      rationale: direction === 'high'
        ? 'Elevated E2 may cause gynecomastia, water retention, mood changes. Consider AI adjustment.'
        : 'Low E2 may cause joint pain, low libido, bone density concerns.',
      triggerValue: `${latest.value} pg/mL`,
      triggerThreshold: `${ref.min}-${ref.max} pg/mL`,
    }
  },

  // Rising PSA
  ({ patient, labs }) => {
    const psaResults = labs.filter(l => l.marker === 'psa').sort((a, b) => b.collectedAt.localeCompare(a.collectedAt))
    const latest = psaResults[0]
    if (!latest || latest.value <= 4.0) return null
    return {
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      category: 'rising_psa',
      severity: latest.value > 6 ? 'critical' : 'high',
      title: `PSA elevated: ${latest.value} ng/mL`,
      description: `PSA is ${latest.value} ng/mL, above the 4.0 threshold.`,
      rationale: 'Elevated PSA requires urology referral consideration. Review velocity and prior values.',
      triggerValue: `${latest.value} ng/mL`,
      triggerThreshold: '4.0 ng/mL',
    }
  },

  // Elevated BP
  ({ patient, vitals }) => {
    const systolic = vitals.filter(v => v.type === 'bp_systolic').sort((a, b) => b.recordedAt.localeCompare(a.recordedAt))[0]
    const diastolic = vitals.filter(v => v.type === 'bp_diastolic').sort((a, b) => b.recordedAt.localeCompare(a.recordedAt))[0]
    if (!systolic || !diastolic) return null
    if (systolic.value <= 140 && diastolic.value <= 90) return null
    return {
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      category: 'elevated_bp',
      severity: systolic.value > 160 || diastolic.value > 100 ? 'critical' : 'high',
      title: `BP ${systolic.value}/${diastolic.value}`,
      description: `Blood pressure is ${systolic.value}/${diastolic.value} mmHg.`,
      rationale: 'Hypertension on TRT requires monitoring. Consider lifestyle counseling and possible antihypertensive.',
      triggerValue: `${systolic.value}/${diastolic.value}`,
      triggerThreshold: '140/90',
    }
  },

  // Missed follow-up
  ({ patient }) => {
    const now = new Date()
    const nextFollowUp = new Date(patient.nextFollowUpDate)
    const daysOverdue = Math.floor((now.getTime() - nextFollowUp.getTime()) / (1000 * 60 * 60 * 24))
    if (daysOverdue < 7) return null
    return {
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      category: 'missed_followup',
      severity: daysOverdue > 30 ? 'high' : 'medium',
      title: `Follow-up ${daysOverdue} days overdue`,
      description: `Scheduled follow-up was ${patient.nextFollowUpDate}. ${daysOverdue} days overdue.`,
      rationale: 'Regular follow-ups are required for safe TRT monitoring.',
      triggerValue: `${daysOverdue} days`,
      triggerThreshold: '7 days',
    }
  },

  // Overdue labs
  ({ patient }) => {
    const now = new Date()
    const nextLabDue = new Date(patient.nextLabDueDate)
    const daysOverdue = Math.floor((now.getTime() - nextLabDue.getTime()) / (1000 * 60 * 60 * 24))
    if (daysOverdue < 14) return null
    return {
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      category: 'overdue_labs',
      severity: daysOverdue > 45 ? 'high' : 'medium',
      title: `Labs ${daysOverdue} days overdue`,
      description: `Labs were due ${patient.nextLabDueDate}. ${daysOverdue} days overdue.`,
      rationale: 'Regular lab monitoring is essential for safety on TRT protocols.',
      triggerValue: `${daysOverdue} days`,
      triggerThreshold: '14 days',
    }
  },

  // Adherence concern
  ({ patient }) => {
    if (patient.adherence !== 'poor') return null
    return {
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      category: 'adherence_concern',
      severity: 'medium',
      title: 'Poor adherence reported',
      description: `Patient adherence rated as poor.`,
      rationale: 'Low adherence reduces treatment efficacy and complicates lab interpretation. Consider outreach.',
    }
  },
]

export function evaluateAlerts(input: AlertRuleInput): Alert[] {
  const alerts: Alert[] = []
  for (const rule of rules) {
    const result = rule(input)
    if (result) {
      alerts.push({
        ...result,
        id: `alert_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        status: 'active',
        createdAt: new Date().toISOString(),
      })
    }
  }
  return alerts
}

export function severityOrder(severity: AlertSeverity): number {
  const order: Record<AlertSeverity, number> = { critical: 0, high: 1, medium: 2, low: 3, info: 4 }
  return order[severity]
}

export function severityColor(severity: AlertSeverity): string {
  const colors: Record<AlertSeverity, string> = {
    critical: 'text-red-400 bg-red-500/10 border-red-500/20',
    high: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    low: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    info: 'text-graphite-400 bg-graphite-500/10 border-graphite-500/20',
  }
  return colors[severity]
}
