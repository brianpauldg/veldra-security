import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { contactFormSchema } from '@/lib/types'

export const dynamic = 'force-dynamic'

// Simple in-memory rate limit: 3 requests per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 })
    return true
  }
  if (entry.count >= 3) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const data = contactFormSchema.parse(body)

    // Save to Supabase
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\\n/g, '')
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\\n/g, '')

    if (url && key) {
      const supabase = createClient(url, key)
      await supabase.from('contact_submissions').insert({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        subject: data.subject,
        message: data.message,
        ip_address: ip,
      }).then(({ error }) => {
        // If table doesn't exist, log but don't fail
        if (error) console.error('Contact save error (non-blocking):', error.message)
      })
    }

    // Send notification email to Brian via Resend
    const { sendContactNotification } = await import('@/lib/email/resend')
    await sendContactNotification({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })

    console.log(`[CONTACT] New submission | Subject: ${data.subject} | Saved + emailed`)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
