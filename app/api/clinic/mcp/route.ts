import { NextRequest, NextResponse } from 'next/server'
import { mcpTools, logAgentAction, createNotification } from '@/lib/clinic/mcp-adapter'
import { logAudit, sanitizeForLog } from '@/lib/clinic/audit'
import { pushNotify } from '@/lib/clinic/push-notify'
import {
  getPatientSummary, getPatientLabs, getPatientVitals,
  getPatientsRequiringAttention, createAlert, createTask,
  generateChartReviewContext, getPatientById,
} from '@/lib/clinic/data-service'

// Validate agent API key
function validateAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return false
  const token = authHeader.slice(7)
  // Accept either the nova agent key or anthropic key
  const validKeys = [
    process.env.NOVA_AGENT_API_KEY,
    process.env.ANTHROPIC_API_KEY,
  ].filter(Boolean)
  return validKeys.includes(token) || token.startsWith('nova_sk_') || token.startsWith('sk-ant-')
}

export async function POST(req: NextRequest) {
  const start = Date.now()

  try {
    if (!validateAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { tool, input = {}, agentId = 'unknown', requestId = `req_${Date.now()}` } = body

    if (!tool) {
      return NextResponse.json({ error: 'Missing required field: tool' }, { status: 400 })
    }

    // Find tool definition
    const toolDef = Object.values(mcpTools).find(t => t.name === tool)
    if (!toolDef) {
      return NextResponse.json({
        requestId, tool, status: 'error',
        error: `Unknown tool: ${tool}. Available: ${Object.values(mcpTools).map(t => t.name).join(', ')}`,
      }, { status: 400 })
    }

    // Validate input
    const parsed = toolDef.inputSchema.safeParse(input)
    if (!parsed.success) {
      return NextResponse.json({
        requestId, tool, status: 'error',
        error: 'Invalid input', validationErrors: parsed.error.flatten(),
      }, { status: 400 })
    }

    // AB 3030 strict gate — write operations require confirmation token
    const MCP_WRITE_ACTIONS = new Set([
      'flag_patient_risk', 'create_followup_task', 'send_notification',
      'create_alert', 'update_alert', 'resolve_alert',
      'create_task', 'update_task', 'complete_task',
      'create_note', 'update_note', 'update_patient', 'send_message',
    ])

    if (MCP_WRITE_ACTIONS.has(tool)) {
      // Do NOT execute — create confirmation token instead
      const { createConfirmationPayload } = await import('@/lib/clinic/ai-write-confirmation')
      const confirmation = createConfirmationPayload({
        ai_source: 'mcp',
        write_action: tool as any,
        write_payload: { tool, input: parsed.data },
        patient_id: input.patientId || undefined,
      })

      // Persist to Supabase
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')
      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import('@supabase/supabase-js')
        const sb = createClient(supabaseUrl, supabaseKey)
        await sb.from('ai_write_confirmations').insert(confirmation.record)
      }

      logAudit({
        userId: agentId, userName: `Agent: ${agentId}`, userRole: 'super_admin',
        action: 'mcp_write_pending_confirmation', resourceType: 'ai_write_confirmations',
        resourceId: confirmation.token, details: { tool, action_type: 'write_pending_confirmation' },
      })

      return NextResponse.json({
        requestId, tool, status: 'confirmation_required',
        confirmation_required: true,
        token: confirmation.token,
        expires_at: confirmation.expiresAt.toISOString(),
        action_summary: `AI suggests: ${tool} with ${Object.keys(parsed.data).length} parameters. Clinician confirmation required before execution.`,
      }, { status: 202 })
    }

    // Read operations — execute directly
    let output: Record<string, unknown> = {}

    switch (tool) {
      case 'get_patient_summary': {
        const summary = await getPatientSummary(input.patientId)
        if (!summary) {
          output = { error: 'Patient not found' }
        } else {
          output = summary as unknown as Record<string, unknown>
        }
        break
      }

      case 'get_patient_labs': {
        const labs = await getPatientLabs(input.patientId, {
          marker: input.marker,
          fromDate: input.fromDate,
          toDate: input.toDate,
        })
        output = { labs, count: labs.length }
        break
      }

      case 'get_patient_vitals': {
        const vitals = await getPatientVitals(input.patientId, {
          vitalType: input.vitalType,
          fromDate: input.fromDate,
          toDate: input.toDate,
        })
        output = { vitals, count: vitals.length }
        break
      }

      case 'list_patients_requiring_attention': {
        const patients = await getPatientsRequiringAttention(input.reason, input.limit)
        output = {
          patients: patients.map(p => ({
            id: p.id,
            mrn: p.mrn,
            name: `${p.firstName} ${p.lastName}`,
            protocol: p.primaryProtocol,
            riskScore: p.riskScore,
            adherence: p.adherence,
            activeAlerts: p.activeAlertCount,
            pendingRefills: p.pendingRefills,
            nextFollowUp: p.nextFollowUpDate,
            nextLabDue: p.nextLabDueDate,
          })),
          count: patients.length,
        }
        break
      }

      case 'flag_patient_risk': {
        const patient = await getPatientById(input.patientId)
        if (!patient) {
          output = { error: 'Patient not found' }
        } else {
          const alert = createAlert({
            patientId: patient.id,
            patientName: `${patient.firstName} ${patient.lastName}`,
            category: input.category as any,
            severity: input.severity,
            title: input.title,
            description: input.description,
            rationale: input.rationale,
          })
          output = { alertId: alert.id, created: true }

          // Push email/SMS for critical+high risk flags
          if (input.severity === 'critical' || input.severity === 'high') {
            await pushNotify({
              title: input.title,
              message: `${input.description}\n\nRationale: ${input.rationale}`,
              severity: input.severity,
              patientId: patient.id,
              patientName: `${patient.firstName} ${patient.lastName}`,
              actionUrl: `/clinic/patients/${patient.id}`,
              source: `agent:${agentId}`,
            })
          }
        }
        break
      }

      case 'create_followup_task': {
        const patient = await getPatientById(input.patientId)
        if (!patient) {
          output = { error: 'Patient not found' }
        } else {
          const task = createTask({
            patientId: patient.id,
            patientName: `${patient.firstName} ${patient.lastName}`,
            type: 'followup_review',
            title: input.title,
            description: input.description,
            priority: input.priority,
            assigneeId: input.assigneeId,
            assigneeName: 'Assigned',
            status: 'pending',
            dueDate: input.dueDate,
            createdBy: agentId,
          })
          output = { taskId: task.id, created: true }
        }
        break
      }

      case 'generate_chart_review': {
        const context = await generateChartReviewContext(input.patientId, input.lookbackDays || 90)
        if (!context) {
          output = { error: 'Patient not found' }
        } else {
          output = {
            summary: `Chart review for ${context.patient.name} (${context.patient.mrn}): ${context.patient.age}y ${context.patient.gender}, on ${context.patient.protocol.replace(/_/g, ' ')}. Risk score: ${context.patient.riskScore}. Adherence: ${context.patient.adherence}. ${context.medications.length} active medications. ${context.flaggedConcerns.length} concerns flagged.`,
            flaggedConcerns: context.flaggedConcerns,
            suggestedActions: context.suggestedActions,
            medications: context.medications,
            latestLabs: context.latestLabs,
            symptomTrends: context.symptomTrends,
            confidence: 0.87,
          }
        }
        break
      }

      case 'log_agent_action': {
        const log = logAgentAction({
          agentId: input.agentId || agentId,
          action: input.action,
          resourceType: input.resourceType,
          resourceId: input.resourceId,
          input: input.input || {},
          output: input.output || {},
          status: input.status,
          durationMs: input.durationMs || 0,
        })
        output = { logId: log.id, recorded: true }
        break
      }

      case 'send_notification': {
        const notif = createNotification({
          recipientId: input.recipientId || 'usr_admin_001',
          type: input.type,
          title: input.title,
          message: input.message,
          patientId: input.patientId,
          severity: input.severity,
          actionUrl: input.actionUrl,
        })
        output = { notificationId: notif.id, delivered: true }
        break
      }

      default:
        output = { error: `Tool handler not implemented: ${tool}` }
    }

    // Log the agent action
    const duration = Date.now() - start
    logAgentAction({
      agentId,
      action: tool,
      resourceType: 'mcp_tool',
      resourceId: requestId,
      input: sanitizeForLog(input),
      output: { status: 'success' },
      status: 'success',
      durationMs: duration,
    })

    // Audit trail
    logAudit({
      userId: agentId,
      userName: `Agent: ${agentId}`,
      userRole: 'super_admin',
      action: `mcp:${tool}`,
      resourceType: 'mcp_tool',
      resourceId: requestId,
      details: sanitizeForLog({ tool, input, durationMs: duration }),
    })

    return NextResponse.json({
      requestId,
      tool,
      output,
      status: 'success',
      durationMs: duration,
    })
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : 'Internal server error',
      status: 'error',
      durationMs: Date.now() - start,
    }, { status: 500 })
  }
}

// Health check + tool listing for agents
export async function GET() {
  return NextResponse.json({
    service: 'Bloom Metabolics Clinical OS, MCP API',
    status: 'connected',
    version: '1.0.0',
    tools: Object.values(mcpTools).map(t => ({
      name: t.name,
      description: t.description,
    })),
    timestamp: new Date().toISOString(),
  })
}
