import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || ''
const BUSINESS_LEAD_EMAIL = process.env.BUSINESS_LEAD_EMAIL || 'brian@bloommetabolics.com'

const schema = z.object({
  email: z.string().email().trim().toLowerCase(),
  firstName: z.string().max(100).optional(),
  interest: z.string().max(100).optional(),
  source: z.string().max(100).optional(),
  landingPage: z.string().max(2000).optional(),
  referrer: z.string().max(2000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // ── Post to GHL with "Waitlist Pre-Launch" tag ──
    if (GHL_WEBHOOK_URL) {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName || '',
          tags: ['waitlist-pre-launch', data.interest ? `interest-${data.interest}` : null, data.source ? `source-${data.source}` : null].filter(Boolean),
          source: 'website-prelaunch-waitlist',
          customField: {
            interest: data.interest || '',
            source: data.source || '',
            landingPage: data.landingPage || '',
            referrer: data.referrer || '',
            joinedAt: new Date().toISOString(),
          },
        }),
      }).catch((err) => console.error('[PRELAUNCH-WAITLIST] GHL post failed:', err))
    }

    // ── Send notification to Brian ──
    try {
      const { sendEmail } = await import('@/lib/email/resend')
      if (BUSINESS_LEAD_EMAIL) {
        await sendEmail({
          to: BUSINESS_LEAD_EMAIL,
          subject: `New waitlist signup: ${data.email}`,
          html: `
            <div style="font-family:system-ui,sans-serif;color:#d8cfbe;background:#020202;padding:24px;border-radius:8px;">
              <h2 style="margin:0 0 16px;color:#d8cfbe;">New Pre-Launch Waitlist Signup</h2>
              <p style="color:#8a8268;margin:4px 0;"><strong style="color:#d8cfbe;">Email:</strong> ${data.email}</p>
              ${data.firstName ? `<p style="color:#8a8268;margin:4px 0;"><strong style="color:#d8cfbe;">Name:</strong> ${data.firstName}</p>` : ''}
              ${data.interest ? `<p style="color:#8a8268;margin:4px 0;"><strong style="color:#d8cfbe;">Interest:</strong> ${data.interest}</p>` : ''}
              ${data.source ? `<p style="color:#8a8268;margin:4px 0;"><strong style="color:#d8cfbe;">Source:</strong> ${data.source}</p>` : ''}
              <p style="color:#8a8268;margin:16px 0 0;font-size:12px;">${new Date().toISOString()}</p>
            </div>
          `,
        })
      }
    } catch (err) {
      console.error('[PRELAUNCH-WAITLIST] Notification email failed:', err)
    }

    // ── Send confirmation to the subscriber ──
    try {
      const { sendEmail } = await import('@/lib/email/resend')
      const name = data.firstName || 'there'
      await sendEmail({
        to: data.email,
        replyTo: 'brian@bloommetabolics.com',
        subject: "You're on the Bloom Metabolics waitlist",
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#a89878;background:#020202;padding:32px;border-radius:8px;">
            <p style="font-size:15px;line-height:1.7;margin-bottom:20px;color:#d8cfbe;">Hey ${name},</p>
            <p style="font-size:15px;line-height:1.7;margin-bottom:20px;">You're on the Bloom Metabolics waitlist. Thank you for your interest.</p>
            <p style="font-size:15px;line-height:1.7;margin-bottom:20px;">Bloom opens for enrollment in early-to-mid June 2026. Over the next week, I'll send you a few emails introducing the clinical approach, what we offer, and how to prepare.</p>
            <p style="font-size:15px;line-height:1.7;margin-bottom:20px;">If you have questions in the meantime, reply directly to this email. I read every one.</p>
            <p style="font-size:15px;line-height:1.7;margin-bottom:4px;color:#d8cfbe;">Brian</p>
            <p style="font-size:13px;color:#8a8268;">Brian DeGuzman, RN | Bloom Metabolics</p>
          </div>
        `,
      })
    } catch (err) {
      console.error('[PRELAUNCH-WAITLIST] Confirmation email failed:', err)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    console.error('[PRELAUNCH-WAITLIST] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
