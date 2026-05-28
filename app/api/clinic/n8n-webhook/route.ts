import { NextRequest, NextResponse } from 'next/server'
import { createNotification } from '@/lib/clinic/mcp-adapter'
import { logAudit } from '@/lib/clinic/audit'
import { createTask, createAlert, createInsight } from '@/lib/clinic/data-service'
import { pushNotify } from '@/lib/clinic/push-notify'
import { z } from 'zod'

/**
 * Bloom Metabolics — n8n Webhook Integration
 *
 * Receives events from n8n workflows and routes them into the clinical dashboard.
 * Events include: new leads qualified, clinical intakes completed, agent actions,
 * content generated, GHL contact synced, workflow errors.
 *
 * n8n workflow should POST here with the event payload.
 * Auth: Bearer token using NOVA_AGENT_API_KEY
 */

const webhookPayloadSchema = z.object({
  event: z.enum([
    'lead_qualified',
    'clinical_intake_completed',
    'content_generated',
    'ghl_contact_synced',
    'ghl_opportunity_created',
    'agent_action',
    'workflow_error',
    'workflow_completed',
    'patient_outreach_sent',
    'refill_request',
    'lab_result_received',
  ]),
  source: z.string().default('n8n'),
  agentId: z.string().optional(),
  data: z.record(z.unknown()),
  timestamp: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const authHeader = req.headers.get('authorization')
    const apiKey = req.headers.get('x-api-key')
    const token = authHeader?.replace('Bearer ', '') || apiKey
    const validKey = process.env.NOVA_AGENT_API_KEY

    if (!token || (validKey && token !== validKey)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const parsed = webhookPayloadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({
        error: 'Invalid payload',
        details: parsed.error.flatten(),
      }, { status: 400 })
    }

    const { event, source, agentId, data } = parsed.data
    const ts = new Date().toISOString()

    // Route event to appropriate handler
    switch (event) {
      case 'lead_qualified': {
        const name = data.name as string || 'Unknown Lead'
        const segment = data.segment as string || 'UNKNOWN'
        const score = data.score as number || 0
        const interest = data.primary_interest as string || 'unknown'

        // Create notification for Brian
        createNotification({
          recipientId: 'usr_admin_001',
          type: 'system',
          title: `New ${segment} Lead: ${name}`,
          message: `Score: ${score}/100. Interest: ${interest}. Source: ${source}. ${segment === 'HOT' ? 'Ready for clinical intake.' : 'Added to nurture sequence.'}`,
          severity: segment === 'HOT' ? 'high' : 'medium',
          actionUrl: '/clinic',
        })

        // If HOT lead, create a task + push email
        if (segment === 'HOT') {
          createTask({
            type: 'patient_outreach',
            title: `New HOT lead: ${name}`,
            description: `Score ${score}/100. Interest: ${interest}. Ready for clinical intake and consultation booking.`,
            status: 'pending',
            priority: 'high',
            assigneeId: 'usr_clin_001',
            assigneeName: 'Sarah Chen',
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            createdBy: agentId || 'n8n-qualifier',
          })

          // Push email for HOT leads
          await pushNotify({
            title: `New HOT Lead: ${name}`,
            message: `Score: ${score}/100. Interest: ${interest}. Source: ${source}.\n\nThis lead is ready for clinical intake and consultation booking. Task assigned to Sarah Chen.`,
            severity: 'high',
            actionUrl: '/clinic',
            source: 'n8n-qualifier',
          })
        }
        break
      }

      case 'clinical_intake_completed': {
        const patientName = data.name as string || 'Unknown'
        const urgency = data.urgency as string || 'routine'
        const track = data.treatment_track as string || 'unknown'

        createNotification({
          recipientId: 'usr_admin_001',
          type: 'system',
          title: `Intake Complete: ${patientName}`,
          message: `Treatment track: ${track}. Urgency: ${urgency}. Labs required: ${(data.labs_required as string[])?.join(', ') || 'pending'}.`,
          severity: urgency === 'urgent' ? 'critical' : urgency === 'priority' ? 'high' : 'medium',
          actionUrl: '/clinic/tasks',
        })

        // Create lab review task
        createTask({
          type: 'lab_review',
          title: `Review intake + order labs: ${patientName}`,
          description: `Clinical intake completed. Track: ${track}. ${(data.red_flags as string[])?.length ? 'RED FLAGS: ' + (data.red_flags as string[]).join(', ') : 'No red flags.'}`,
          status: 'pending',
          priority: urgency === 'urgent' ? 'urgent' : 'high',
          assigneeId: 'usr_doc_001',
          assigneeName: 'Dr. Martinez',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createdBy: agentId || 'n8n-clinical',
        })

        // If red flags, create an alert + push SMS + email (critical)
        const redFlags = data.red_flags as string[]
        if (redFlags?.length) {
          await pushNotify({
            title: `Red Flags: ${patientName}`,
            message: `Clinical intake flagged critical concerns:\n${redFlags.join('\n')}\n\nTreatment track: ${track}. Urgency: ${urgency}. Immediate provider review required.`,
            severity: 'critical',
            actionUrl: '/clinic/alerts',
            source: 'n8n-clinical-intake',
          })
        }
        break
      }

      case 'content_generated': {
        createNotification({
          recipientId: 'usr_admin_001',
          type: 'agent_action',
          title: `Content: ${data.message_type || 'generated'}`,
          message: `${data.channel || 'email'} content created for ${data.recipient || 'lead'}. Subject: ${data.subject || 'N/A'}`,
          severity: 'info',
        })
        break
      }

      case 'ghl_contact_synced': {
        createNotification({
          recipientId: 'usr_admin_001',
          type: 'system',
          title: 'GHL Contact Synced',
          message: `${data.name || 'Contact'} synced to GHL. Tags: ${(data.tags as string[])?.join(', ') || 'none'}.`,
          severity: 'info',
        })
        break
      }

      case 'ghl_opportunity_created': {
        createNotification({
          recipientId: 'usr_admin_001',
          type: 'system',
          title: `New Opportunity: ${data.name || 'Unknown'}`,
          message: `Pipeline opportunity created in GHL. Stage: ${data.stage || 'new'}. Source: AI Qualifier.`,
          severity: 'medium',
          actionUrl: '/clinic',
        })
        break
      }

      case 'workflow_error': {
        // Workflow errors are critical — push SMS + email + dashboard
        await pushNotify({
          title: `Workflow Error: ${data.workflow || 'unknown'}`,
          message: `Error in n8n workflow: ${data.error || 'Unknown error'}.\nNode: ${data.node || 'unknown'}.\n\nThis may affect patient intake or lead processing.`,
          severity: 'critical',
          actionUrl: '/clinic/settings',
          source: 'n8n',
        })
        break
      }

      case 'workflow_completed': {
        createNotification({
          recipientId: 'usr_admin_001',
          type: 'agent_action',
          title: `Workflow Complete: ${data.workflow || 'pipeline'}`,
          message: `n8n workflow completed successfully. ${data.summary || ''}`,
          severity: 'info',
        })
        break
      }

      case 'patient_outreach_sent': {
        createNotification({
          recipientId: 'usr_admin_001',
          type: 'system',
          title: `Outreach Sent: ${data.patient || data.name || 'Unknown'}`,
          message: `${data.channel || 'Email'} sent. Type: ${data.type || 'follow-up'}.`,
          severity: 'info',
        })
        break
      }

      case 'lab_result_received': {
        const patientName = data.patientName as string || 'Unknown'
        const abnormals = data.abnormals as string[] || []

        createNotification({
          recipientId: 'usr_admin_001',
          type: 'lab_result',
          title: `Labs In: ${patientName}`,
          message: abnormals.length > 0
            ? `${abnormals.length} abnormal result(s): ${abnormals.join(', ')}`
            : 'All results within normal range.',
          patientId: data.patientId as string,
          severity: abnormals.length > 0 ? 'high' : 'info',
          actionUrl: data.patientId ? `/clinic/patients/${data.patientId}` : '/clinic/patients',
        })

        if (abnormals.length > 0) {
          createTask({
            patientId: data.patientId as string,
            patientName,
            type: 'lab_review',
            title: `Review abnormal labs: ${patientName}`,
            description: `Abnormal results: ${abnormals.join(', ')}`,
            status: 'pending',
            priority: 'high',
            assigneeId: 'usr_doc_001',
            assigneeName: 'Dr. Martinez',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            createdBy: 'n8n-lab-integration',
          })

          // Push email for abnormal labs
          await pushNotify({
            title: `Abnormal Labs: ${patientName}`,
            message: `${abnormals.length} abnormal result(s): ${abnormals.join(', ')}.\n\nLab review task created and assigned to Dr. Martinez.`,
            severity: 'high',
            patientId: data.patientId as string,
            patientName,
            actionUrl: data.patientId ? `/clinic/patients/${data.patientId}` : '/clinic/patients',
            source: 'n8n-lab-integration',
          })
        }
        break
      }

      case 'refill_request': {
        createNotification({
          recipientId: 'usr_admin_001',
          type: 'refill',
          title: `Refill: ${data.medication || 'Unknown'}`,
          message: `${data.patientName || 'Patient'} requesting refill of ${data.medication}.`,
          patientId: data.patientId as string,
          severity: 'medium',
          actionUrl: '/clinic/tasks',
        })
        break
      }
    }

    // Audit log
    logAudit({
      userId: agentId || 'n8n',
      userName: `n8n: ${source}`,
      userRole: 'super_admin',
      action: `webhook:${event}`,
      resourceType: 'n8n_webhook',
      resourceId: `wh_${Date.now()}`,
      details: { event, source, dataKeys: Object.keys(data) },
    })

    return NextResponse.json({
      received: true,
      event,
      timestamp: ts,
      message: `Event ${event} processed successfully`,
    })
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : 'Internal server error',
    }, { status: 500 })
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    service: 'Bloom Metabolics, n8n Webhook Integration',
    status: 'active',
    supportedEvents: [
      'lead_qualified', 'clinical_intake_completed', 'content_generated',
      'ghl_contact_synced', 'ghl_opportunity_created', 'agent_action',
      'workflow_error', 'workflow_completed', 'patient_outreach_sent',
      'refill_request', 'lab_result_received',
    ],
    auth: 'Bearer token or x-api-key header with NOVA_AGENT_API_KEY',
    timestamp: new Date().toISOString(),
  })
}
