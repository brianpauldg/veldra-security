import { z } from 'zod'
import type {
  Patient, LabResult, Vital, Alert, Task, AgentActionLog, AgentInsight,
} from './types'
import { logAudit, sanitizeForLog } from './audit'

// ── MCP Tool Schemas ─────────────────────────────────────────
// These define the contract for agent tools that can be called
// via MCP server / n8n / direct API.

export const mcpTools = {
  getPatientSummary: {
    name: 'get_patient_summary',
    description: 'Get a comprehensive summary of a patient including demographics, protocol, recent labs, vitals, alerts, and adherence.',
    inputSchema: z.object({
      patientId: z.string().describe('Patient ID or MRN'),
    }),
    outputSchema: z.object({
      patient: z.any(),
      recentLabs: z.array(z.any()),
      recentVitals: z.array(z.any()),
      activeAlerts: z.array(z.any()),
      currentProtocol: z.any().nullable(),
      adherence: z.string(),
      riskScore: z.number(),
      aiSummary: z.string().optional(),
    }),
  },

  getPatientLabs: {
    name: 'get_patient_labs',
    description: 'Get lab results for a patient, optionally filtered by marker and date range.',
    inputSchema: z.object({
      patientId: z.string(),
      marker: z.string().optional().describe('Lab marker to filter by'),
      fromDate: z.string().optional().describe('ISO date string'),
      toDate: z.string().optional().describe('ISO date string'),
    }),
    outputSchema: z.object({
      labs: z.array(z.any()),
      count: z.number(),
    }),
  },

  getPatientVitals: {
    name: 'get_patient_vitals',
    description: 'Get vitals for a patient, optionally filtered by type and date range.',
    inputSchema: z.object({
      patientId: z.string(),
      vitalType: z.string().optional(),
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
    }),
    outputSchema: z.object({
      vitals: z.array(z.any()),
      count: z.number(),
    }),
  },

  listPatientsRequiringAttention: {
    name: 'list_patients_requiring_attention',
    description: 'List patients with active alerts, overdue labs, pending refills, or missed follow-ups.',
    inputSchema: z.object({
      reason: z.enum(['alerts', 'overdue_labs', 'pending_refills', 'missed_followups', 'all']).optional(),
      limit: z.number().optional(),
    }),
    outputSchema: z.object({
      patients: z.array(z.any()),
      count: z.number(),
    }),
  },

  flagPatientRisk: {
    name: 'flag_patient_risk',
    description: 'Create or update a risk flag / alert for a patient.',
    inputSchema: z.object({
      patientId: z.string(),
      category: z.string(),
      severity: z.enum(['critical', 'high', 'medium', 'low', 'info']),
      title: z.string(),
      description: z.string(),
      rationale: z.string(),
    }),
    outputSchema: z.object({
      alertId: z.string(),
      created: z.boolean(),
    }),
  },

  createFollowUpTask: {
    name: 'create_followup_task',
    description: 'Create a follow-up task for a patient assigned to a provider.',
    inputSchema: z.object({
      patientId: z.string(),
      title: z.string(),
      description: z.string(),
      priority: z.enum(['urgent', 'high', 'normal', 'low']),
      assigneeId: z.string(),
      dueDate: z.string(),
    }),
    outputSchema: z.object({
      taskId: z.string(),
      created: z.boolean(),
    }),
  },

  generateChartReview: {
    name: 'generate_chart_review',
    description: 'Generate an AI-assisted chart review summary for a patient. This is review support only, not autonomous decision-making.',
    inputSchema: z.object({
      patientId: z.string(),
      lookbackDays: z.number().optional().describe('Number of days to look back (default: 90)'),
    }),
    outputSchema: z.object({
      summary: z.string(),
      flaggedConcerns: z.array(z.string()),
      suggestedActions: z.array(z.string()),
      confidence: z.number(),
    }),
  },

  logAgentAction: {
    name: 'log_agent_action',
    description: 'Log an action taken by an agent for audit purposes.',
    inputSchema: z.object({
      agentId: z.string(),
      action: z.string(),
      resourceType: z.string(),
      resourceId: z.string(),
      input: z.record(z.unknown()).optional(),
      output: z.record(z.unknown()).optional(),
      status: z.enum(['success', 'error', 'pending']),
      durationMs: z.number().optional(),
    }),
    outputSchema: z.object({
      logId: z.string(),
      recorded: z.boolean(),
    }),
  },

  sendNotification: {
    name: 'send_notification',
    description: 'Send a notification to the provider/admin about a patient event, alert, or system event.',
    inputSchema: z.object({
      recipientId: z.string().describe('User ID of the recipient'),
      type: z.enum(['alert', 'task', 'refill', 'lab_result', 'system', 'agent_action']),
      title: z.string(),
      message: z.string(),
      patientId: z.string().optional(),
      severity: z.enum(['critical', 'high', 'medium', 'low', 'info']).optional(),
      actionUrl: z.string().optional().describe('Deep link into the dashboard'),
    }),
    outputSchema: z.object({
      notificationId: z.string(),
      delivered: z.boolean(),
    }),
  },
} as const

// ── Agent Action Logger ──────────────────────────────────────

const actionLogs: AgentActionLog[] = []

export function logAgentAction(entry: Omit<AgentActionLog, 'id' | 'executedAt'>): AgentActionLog {
  const log: AgentActionLog = {
    ...entry,
    id: `alog_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    executedAt: new Date().toISOString(),
  }
  actionLogs.unshift(log)

  // Also write to audit trail
  logAudit({
    userId: entry.agentId,
    userName: `Agent: ${entry.agentId}`,
    userRole: 'super_admin',
    action: `agent:${entry.action}`,
    resourceType: entry.resourceType,
    resourceId: entry.resourceId,
    details: sanitizeForLog({ input: entry.input, output: entry.output, status: entry.status }),
  })

  return log
}

export function getAgentActionLogs(filters?: {
  agentId?: string
  resourceType?: string
  limit?: number
}): AgentActionLog[] {
  let results = [...actionLogs]
  if (filters?.agentId) results = results.filter(l => l.agentId === filters.agentId)
  if (filters?.resourceType) results = results.filter(l => l.resourceType === filters.resourceType)
  return results.slice(0, filters?.limit ?? 50)
}

// ── Notification Store (in-memory, V1) ───────────────────────

export interface Notification {
  id: string
  recipientId: string
  type: 'alert' | 'task' | 'refill' | 'lab_result' | 'system' | 'agent_action'
  title: string
  message: string
  patientId?: string
  severity?: string
  actionUrl?: string
  isRead: boolean
  createdAt: string
}

const notifications: Notification[] = []

export function createNotification(input: Omit<Notification, 'id' | 'isRead' | 'createdAt'>): Notification {
  const notif: Notification = {
    ...input,
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    isRead: false,
    createdAt: new Date().toISOString(),
  }
  notifications.unshift(notif)
  return notif
}

export function getNotifications(recipientId: string, unreadOnly = false): Notification[] {
  let results = notifications.filter(n => n.recipientId === recipientId)
  if (unreadOnly) results = results.filter(n => !n.isRead)
  return results.slice(0, 100)
}

export function markNotificationRead(id: string): void {
  const notif = notifications.find(n => n.id === id)
  if (notif) notif.isRead = true
}

// ── MCP Request/Response Handler ─────────────────────────────

export interface MCPRequest {
  tool: string
  input: Record<string, unknown>
  agentId: string
  requestId: string
}

export interface MCPResponse {
  requestId: string
  tool: string
  output: Record<string, unknown>
  status: 'success' | 'error'
  error?: string
  durationMs: number
}

// Central dispatcher — in production, wire to actual data layer
export async function handleMCPRequest(req: MCPRequest): Promise<MCPResponse> {
  const start = Date.now()
  try {
    const toolDef = Object.values(mcpTools).find(t => t.name === req.tool)
    if (!toolDef) {
      return {
        requestId: req.requestId,
        tool: req.tool,
        output: {},
        status: 'error',
        error: `Unknown tool: ${req.tool}`,
        durationMs: Date.now() - start,
      }
    }

    // Validate input
    const parsed = toolDef.inputSchema.safeParse(req.input)
    if (!parsed.success) {
      return {
        requestId: req.requestId,
        tool: req.tool,
        output: { validationErrors: parsed.error.flatten() },
        status: 'error',
        error: 'Invalid input',
        durationMs: Date.now() - start,
      }
    }

    // Log the action
    logAgentAction({
      agentId: req.agentId,
      action: req.tool,
      resourceType: 'mcp_tool',
      resourceId: req.requestId,
      input: req.input,
      output: {},
      status: 'success',
      durationMs: 0,
    })

    // Return placeholder — wire to real data in production
    return {
      requestId: req.requestId,
      tool: req.tool,
      output: { message: `Tool ${req.tool} executed successfully`, input: parsed.data },
      status: 'success',
      durationMs: Date.now() - start,
    }
  } catch (err) {
    return {
      requestId: req.requestId,
      tool: req.tool,
      output: {},
      status: 'error',
      error: err instanceof Error ? err.message : 'Unknown error',
      durationMs: Date.now() - start,
    }
  }
}
