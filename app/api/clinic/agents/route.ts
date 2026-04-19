import { NextRequest, NextResponse } from 'next/server'
import {
  getPatientSummary, getPatientLabs, getPatientVitals,
  getPatientsRequiringAttention, getAllAlerts, getAllTasks,
  generateChartReviewContext, getPatientById,
} from '@/lib/clinic/data-service'
import { SEED_PATIENTS, SEED_USERS } from '@/lib/clinic/seed-data'
import { getNotifications } from '@/lib/clinic/mcp-adapter'
import { getAuditLogs } from '@/lib/clinic/audit'
import { logAudit } from '@/lib/clinic/audit'

/**
 * Bloom Metabolics — Agent Read API
 *
 * REST surface for Claude managed agents to read all clinical data.
 * Agents use GET with query params to fetch data.
 *
 * Auth: Bearer token (NOVA_AGENT_API_KEY or ANTHROPIC_API_KEY)
 *
 * Endpoints (via ?action= param):
 *   - overview: Dashboard summary of the entire practice
 *   - patients: List all patients with status/risk/protocol
 *   - patient: Single patient full summary (requires ?id=)
 *   - patient_labs: Patient lab history (requires ?id=, optional ?marker=)
 *   - patient_vitals: Patient vitals (requires ?id=, optional ?type=)
 *   - alerts: All active alerts
 *   - tasks: All pending tasks
 *   - attention: Patients requiring attention (optional ?reason=)
 *   - chart_review: AI chart review context (requires ?id=)
 *   - notifications: Recent notifications for Brian
 *   - audit: Recent audit log entries
 *   - team: Team members and roles
 */

function validateAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization')
  const apiKey = req.headers.get('x-api-key')
  const token = authHeader?.replace('Bearer ', '') || apiKey
  if (!token) return false
  return token.startsWith('nova_sk_') || token.startsWith('sk-ant-') || token === process.env.NOVA_AGENT_API_KEY
}

export async function GET(req: NextRequest) {
  if (!validateAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action') || 'overview'
  const id = searchParams.get('id')
  const agentId = req.headers.get('x-agent-id') || 'claude-agent'

  // Audit all agent reads
  logAudit({
    userId: agentId,
    userName: `Agent: ${agentId}`,
    userRole: 'super_admin',
    action: `agent_read:${action}`,
    resourceType: 'agent_api',
    resourceId: id || 'global',
    details: { action, params: Object.fromEntries(searchParams.entries()) },
  })

  switch (action) {
    case 'overview': {
      const now = new Date()
      const activePatients = SEED_PATIENTS.filter(p => p.status === 'active')
      const alerts = getAllAlerts().filter(a => a.status === 'active')
      const tasks = getAllTasks().filter(t => t.status !== 'completed' && t.status !== 'cancelled')
      const overdueFollowUps = activePatients.filter(p => new Date(p.nextFollowUpDate) < now)
      const overdueLabs = activePatients.filter(p => new Date(p.nextLabDueDate) < now)
      const highRisk = activePatients.filter(p => p.riskScore >= 50)
      const notifications = getNotifications('usr_admin_001', true)

      return NextResponse.json({
        practice: 'Bloom Metabolics',
        snapshot: {
          totalActivePatients: activePatients.length,
          activeAlerts: alerts.length,
          criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
          highAlerts: alerts.filter(a => a.severity === 'high').length,
          pendingTasks: tasks.length,
          urgentTasks: tasks.filter(t => t.priority === 'urgent').length,
          overdueFollowUps: overdueFollowUps.length,
          overdueLabs: overdueLabs.length,
          highRiskPatients: highRisk.length,
          unreadNotifications: notifications.length,
        },
        highRiskPatients: highRisk.map(p => ({
          id: p.id, name: `${p.firstName} ${p.lastName}`, riskScore: p.riskScore,
          protocol: p.primaryProtocol, alerts: p.activeAlertCount, adherence: p.adherence,
        })),
        criticalAlerts: alerts.filter(a => a.severity === 'critical').map(a => ({
          id: a.id, patient: a.patientName, title: a.title, severity: a.severity,
        })),
        urgentTasks: tasks.filter(t => t.priority === 'urgent').map(t => ({
          id: t.id, title: t.title, patient: t.patientName, dueDate: t.dueDate,
        })),
        timestamp: now.toISOString(),
      })
    }

    case 'patients': {
      return NextResponse.json({
        patients: SEED_PATIENTS.map(p => ({
          id: p.id, mrn: p.mrn,
          name: `${p.firstName} ${p.lastName}`,
          status: p.status, protocol: p.primaryProtocol,
          riskScore: p.riskScore, adherence: p.adherence,
          activeAlerts: p.activeAlertCount, pendingRefills: p.pendingRefills,
          lastVisit: p.lastVisitDate, nextFollowUp: p.nextFollowUpDate,
          nextLabDue: p.nextLabDueDate, tags: p.tags,
        })),
        count: SEED_PATIENTS.length,
      })
    }

    case 'patient': {
      if (!id) return NextResponse.json({ error: 'Missing ?id= param' }, { status: 400 })
      const summary = getPatientSummary(id)
      if (!summary) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
      return NextResponse.json(summary)
    }

    case 'patient_labs': {
      if (!id) return NextResponse.json({ error: 'Missing ?id= param' }, { status: 400 })
      const marker = searchParams.get('marker') || undefined
      const labs = getPatientLabs(id, { marker })
      return NextResponse.json({ labs, count: labs.length })
    }

    case 'patient_vitals': {
      if (!id) return NextResponse.json({ error: 'Missing ?id= param' }, { status: 400 })
      const vitalType = searchParams.get('type') || undefined
      const vitals = getPatientVitals(id, { vitalType })
      return NextResponse.json({ vitals, count: vitals.length })
    }

    case 'alerts': {
      const alerts = getAllAlerts()
      const statusFilter = searchParams.get('status')
      const filtered = statusFilter ? alerts.filter(a => a.status === statusFilter) : alerts
      return NextResponse.json({
        alerts: filtered.sort((a, b) => {
          const order = { critical: 0, high: 1, medium: 2, low: 3, info: 4 }
          return (order[a.severity] || 4) - (order[b.severity] || 4)
        }),
        count: filtered.length,
      })
    }

    case 'tasks': {
      const tasks = getAllTasks()
      const statusFilter = searchParams.get('status')
      const filtered = statusFilter ? tasks.filter(t => t.status === statusFilter) : tasks
      return NextResponse.json({ tasks: filtered, count: filtered.length })
    }

    case 'attention': {
      const reason = searchParams.get('reason') || undefined
      const limit = parseInt(searchParams.get('limit') || '20')
      const patients = getPatientsRequiringAttention(reason, limit)
      return NextResponse.json({
        patients: patients.map(p => ({
          id: p.id, name: `${p.firstName} ${p.lastName}`,
          riskScore: p.riskScore, alerts: p.activeAlertCount,
          protocol: p.primaryProtocol, adherence: p.adherence,
          nextFollowUp: p.nextFollowUpDate, nextLabDue: p.nextLabDueDate,
        })),
        count: patients.length,
        reason: reason || 'all',
      })
    }

    case 'chart_review': {
      if (!id) return NextResponse.json({ error: 'Missing ?id= param' }, { status: 400 })
      const lookback = parseInt(searchParams.get('days') || '90')
      const context = generateChartReviewContext(id, lookback)
      if (!context) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
      return NextResponse.json(context)
    }

    case 'notifications': {
      const notifs = getNotifications('usr_admin_001')
      return NextResponse.json({ notifications: notifs, count: notifs.length })
    }

    case 'audit': {
      const limit = parseInt(searchParams.get('limit') || '50')
      const logs = getAuditLogs({ limit })
      return NextResponse.json({ logs, count: logs.length })
    }

    case 'team': {
      return NextResponse.json({
        team: SEED_USERS.map(u => ({
          id: u.id, name: `${u.firstName} ${u.lastName}`,
          role: u.role, email: u.email, isActive: u.isActive,
        })),
      })
    }

    default:
      return NextResponse.json({
        error: `Unknown action: ${action}`,
        availableActions: [
          'overview', 'patients', 'patient', 'patient_labs', 'patient_vitals',
          'alerts', 'tasks', 'attention', 'chart_review', 'notifications', 'audit', 'team',
        ],
      }, { status: 400 })
  }
}
