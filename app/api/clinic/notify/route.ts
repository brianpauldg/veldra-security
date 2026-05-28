import { NextRequest, NextResponse } from 'next/server'
import { pushNotify, type PushNotification } from '@/lib/clinic/push-notify'
import { z } from 'zod'

/**
 * Bloom Metabolics — Push Notification API
 *
 * POST: Send a push notification (dashboard + email + SMS based on severity)
 * GET: Health check
 *
 * Critical → dashboard + SMS + email
 * High → dashboard + email
 * Medium/Low/Info → dashboard only
 */

const notifySchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  severity: z.enum(['critical', 'high', 'medium', 'low', 'info']),
  patientId: z.string().optional(),
  patientName: z.string().optional(),
  actionUrl: z.string().optional(),
  source: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const apiKey = req.headers.get('x-api-key')
  const token = authHeader?.replace('Bearer ', '') || apiKey

  if (!token || (!token.startsWith('nova_sk_') && !token.startsWith('sk-ant-') && token !== process.env.NOVA_AGENT_API_KEY)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = notifySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({
        error: 'Invalid payload',
        details: parsed.error.flatten(),
      }, { status: 400 })
    }

    const result = await pushNotify(parsed.data)

    return NextResponse.json({
      delivered: true,
      channels: {
        dashboard: result.dashboard,
        email: result.email,
        sms: result.sms,
      },
      errors: result.errors.length > 0 ? result.errors : undefined,
    })
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : 'Internal server error',
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Bloom Metabolics, Push Notification API',
    status: 'active',
    channels: {
      dashboard: 'always',
      email: 'critical + high severity',
      sms: 'critical severity only',
    },
    timestamp: new Date().toISOString(),
  })
}
