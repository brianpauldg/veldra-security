/**
 * Bloom Metabolics — Email Service (Resend)
 * Server-side only. Handles all outbound email.
 */

import { Resend } from 'resend'

const FROM_EMAIL = 'Bloom Metabolics <notifications@bloommetabolics.com>'
const BRIAN_EMAIL = 'brian@bloommetabolics.com'

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export interface EmailParams {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

/**
 * Send an email via Resend.
 * Returns true on success, false on failure (non-blocking).
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  const resend = getResend()
  if (!resend) {
    console.warn('[EMAIL] Resend not configured — email not sent')
    return false
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(params.to) ? params.to : [params.to],
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo,
    })

    if (error) {
      console.error('[EMAIL] Send failed:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('[EMAIL] Send error')
    return false
  }
}

/**
 * Notify Brian of a new contact form submission.
 */
export async function sendContactNotification(data: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<boolean> {
  return sendEmail({
    to: BRIAN_EMAIL,
    subject: `[Bloom] New contact: ${data.subject}`,
    replyTo: data.email,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px;">
        <h2 style="color: #020202; margin-bottom: 4px;">New Contact Form Submission</h2>
        <hr style="border: none; border-top: 1px solid #d8cfbe; margin: 16px 0;" />
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${data.message}</div>
        <hr style="border: none; border-top: 1px solid #d8cfbe; margin: 16px 0;" />
        <p style="color: #8a8268; font-size: 12px;">Bloom Metabolics Clinical OS</p>
      </div>
    `,
  })
}

/**
 * Send consultation booking confirmation to patient.
 */
export async function sendBookingConfirmation(data: {
  patientEmail: string
  patientName: string
  serviceInterest: string
}): Promise<boolean> {
  const service = data.serviceInterest === 'glp1' ? 'GLP-1 Weight Management' : data.serviceInterest === 'trt' ? 'Testosterone Therapy' : 'treatment'

  return sendEmail({
    to: data.patientEmail,
    subject: 'Your Bloom Metabolics Consultation — Next Steps',
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px;">
        <h2 style="color: #020202;">Thank you, ${data.patientName}</h2>
        <p>Your consultation for ${service} has been booked. Here's what happens next:</p>
        <ol style="line-height: 2;">
          <li><strong>Complete your intake form</strong> — you should have been redirected after payment</li>
          <li><strong>Schedule your consultation</strong> — pick a time that works for you</li>
          <li><strong>Meet your physician</strong> — via secure video call</li>
        </ol>
        <p>If you have any questions before your consultation, reply to this email or contact us at <a href="mailto:brian@bloommetabolics.com">brian@bloommetabolics.com</a>.</p>
        <hr style="border: none; border-top: 1px solid #d8cfbe; margin: 24px 0;" />
        <p style="color: #8a8268; font-size: 12px;">Bloom Metabolics · Irvine, CA<br/>
        <a href="https://bloommetabolics.com/unsubscribe?email=${encodeURIComponent(data.patientEmail)}" style="color: #8a8268;">Unsubscribe</a></p>
      </div>
    `,
  })
}

/**
 * Send post-order thank-you email with review incentive.
 * Triggered after pharmacy fulfillment or checkout completion.
 */
export async function sendOrderThankYou(data: {
  patientEmail: string
  patientName: string
  treatmentType: string
}): Promise<boolean> {
  const service = data.treatmentType === 'glp1' ? 'GLP-1 Weight Management' : data.treatmentType === 'trt' ? 'Testosterone Therapy' : 'treatment'

  return sendEmail({
    to: data.patientEmail,
    subject: 'Thank you for choosing Bloom Metabolics',
    html: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#020202;padding:40px 32px;border-radius:8px;">
  <div style="text-align:center;margin-bottom:32px;">
    <span style="font-family:Georgia,serif;font-size:18px;color:#d8cfbe;letter-spacing:-0.02em;font-weight:300;">Bloom Metabolics</span>
    <div style="font-family:monospace;font-size:9px;color:#8a8268;letter-spacing:0.25em;text-transform:uppercase;margin-top:2px;">Est \u00b7 MMXXVI</div>
  </div>
  <h1 style="font-family:Georgia,serif;font-size:24px;color:#d8cfbe;font-weight:300;margin-bottom:16px;">Thank you, ${data.patientName}.</h1>
  <p style="font-size:15px;color:#a89878;line-height:1.7;margin-bottom:20px;">Your ${service} order has been processed and is on its way. Your medication will arrive from our licensed compounding pharmacy within 5\u20137 business days.</p>
  <p style="font-size:15px;color:#a89878;line-height:1.7;margin-bottom:20px;">If you have questions about your protocol, dosing, or what to expect, reply directly to this email \u2014 your care team is here.</p>

  <div style="background:#0d0c0a;border:1px solid #1a1814;border-radius:8px;padding:24px;margin:28px 0;text-align:center;">
    <p style="font-family:Georgia,serif;font-size:18px;color:#d8cfbe;font-weight:300;margin:0 0 8px;">Get 10% off your next month</p>
    <p style="font-size:14px;color:#a89878;line-height:1.6;margin:0 0 16px;">Share your experience with a quick review and we\u2019ll apply 10% off your next billing cycle.</p>
    <a href="https://bloommetabolics.com/review" style="display:inline-block;padding:12px 28px;border-radius:9999px;border:1px solid rgba(216,207,190,0.3);color:#d8cfbe;font-size:13px;font-weight:400;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;">Leave a Review</a>
  </div>

  <p style="font-size:13px;color:#8a8268;line-height:1.7;margin-bottom:32px;">Individual results vary. All treatments are prescribed and monitored by a licensed physician.</p>
  <hr style="border:none;border-top:1px solid #1a1814;margin:24px 0;" />
  <p style="font-size:12px;color:#8a8268;text-align:center;">\u2014 The Bloom Metabolics Team<br/><a href="https://bloommetabolics.com" style="color:#8a8268;">bloommetabolics.com</a></p>
</div>`,
  })
}

/**
 * Send new patient notification to Brian.
 */
export async function sendNewPatientAlert(data: {
  patientName: string
  patientEmail: string
  treatmentType: string
}): Promise<boolean> {
  return sendEmail({
    to: BRIAN_EMAIL,
    subject: `[Bloom] New ${data.treatmentType.toUpperCase()} patient: ${data.patientName}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px;">
        <h2 style="color: #020202;">New Patient Registered</h2>
        <p><strong>Name:</strong> ${data.patientName}</p>
        <p><strong>Email:</strong> ${data.patientEmail}</p>
        <p><strong>Treatment:</strong> ${data.treatmentType.toUpperCase()}</p>
        <p><strong>Action:</strong> Review intake form and schedule protocol call.</p>
        <p><a href="https://bloommetabolics.com/clinic/patients" style="color: #020202; font-weight: bold;">Open Dashboard →</a></p>
        <hr style="border: none; border-top: 1px solid #d8cfbe; margin: 16px 0;" />
        <p style="color: #8a8268; font-size: 12px;">Bloom Metabolics Clinical OS</p>
      </div>
    `,
  })
}
