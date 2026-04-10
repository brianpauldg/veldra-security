import { NextRequest, NextResponse } from 'next/server'
import { handleMCPRequest, createNotification } from '@/lib/clinic/mcp-adapter'
import { logAudit } from '@/lib/clinic/audit'

export async function POST(req: NextRequest) {
  try {
    // In production: validate auth token, check agent permissions
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    if (!body.tool || !body.agentId || !body.requestId) {
      return NextResponse.json(
        { error: 'Missing required fields: tool, agentId, requestId' },
        { status: 400 }
      )
    }

    // Handle the MCP request
    const response = await handleMCPRequest({
      tool: body.tool,
      input: body.input || {},
      agentId: body.agentId,
      requestId: body.requestId,
    })

    // If the tool creates something actionable, send a notification to the admin
    if (response.status === 'success' && ['flag_patient_risk', 'create_followup_task'].includes(body.tool)) {
      createNotification({
        recipientId: 'usr_admin_001',
        type: 'agent_action',
        title: `Agent: ${body.tool.replace(/_/g, ' ')}`,
        message: `Agent ${body.agentId} executed ${body.tool}`,
        severity: 'info',
        actionUrl: '/clinic',
      })
    }

    return NextResponse.json(response)
  } catch (err) {
    logAudit({
      userId: 'system',
      userName: 'System',
      userRole: 'super_admin',
      action: 'mcp_request_error',
      resourceType: 'api',
      resourceId: 'mcp',
      details: { error: err instanceof Error ? err.message : 'Unknown error' },
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check endpoint for MCP server status
export async function GET() {
  return NextResponse.json({
    status: 'connected',
    version: '1.0.0',
    tools: [
      'get_patient_summary',
      'get_patient_labs',
      'get_patient_vitals',
      'list_patients_requiring_attention',
      'flag_patient_risk',
      'create_followup_task',
      'generate_chart_review',
      'log_agent_action',
      'send_notification',
    ],
    timestamp: new Date().toISOString(),
  })
}
