/**
 * Bloom Metabolics — Twilio SMS Provider
 * Gated behind SMS_ENABLED=true. Will not send until A2P 10DLC approved.
 */

import { logAudit } from '@/lib/clinic/audit'

const SMS_ENABLED = process.env.SMS_ENABLED === 'true'
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER

export interface SMSParams {
  to: string
  body: string
  template_id?: string
  patient_id?: string
}

export async function sendSMS(params: SMSParams): Promise<{ sent: boolean; reason?: string; sid?: string }> {
  if (!SMS_ENABLED) {
    return { sent: false, reason: 'SMS_ENABLED=false — awaiting A2P 10DLC approval' }
  }

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
    return { sent: false, reason: 'Twilio credentials not configured' }
  }

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: params.to,
          From: TWILIO_FROM_NUMBER,
          Body: params.body,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      logAudit({
        userId: 'system', userName: 'SMS', userRole: 'super_admin',
        action: 'sms_send_failed', resourceType: 'sms_sends',
        resourceId: params.template_id || '', details: { error: data.message },
      })
      return { sent: false, reason: data.message }
    }

    logAudit({
      userId: 'system', userName: 'SMS', userRole: 'super_admin',
      action: 'sms_sent', resourceType: 'sms_sends',
      resourceId: data.sid, details: { template_id: params.template_id },
    })

    return { sent: true, sid: data.sid }
  } catch (err) {
    return { sent: false, reason: 'Network error' }
  }
}
