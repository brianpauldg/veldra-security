import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/clinic',
  '/api/clinic',
]

// Routes exempt from auth within /clinic/*
const CLINIC_PUBLIC_ROUTES = [
  '/clinic/login',
]

// Rate limiting store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= limit) return false
  record.count++
  return true
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'

  // ── 1. SECURITY HEADERS ─────────────────────────────────────────────────
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-XSS-Protection', '1; mode=block')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  res.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )
  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // Next.js requires these in dev
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
    ].join('; ')
  )

  // ── 2. RATE LIMITING ON AUTH ROUTES ─────────────────────────────────────
  if (pathname.startsWith('/api/auth') || pathname === '/login') {
    if (!rateLimit(ip, 20, 60000)) {
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: { 'Retry-After': '60' }
      })
    }
  }

  // ── 3. FORCE HTTPS IN PRODUCTION ────────────────────────────────────────
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(`https://${req.headers.get('host')}${req.nextUrl.pathname}`, 301)
  }

  // ── 4. AUTH CHECK FOR PROTECTED ROUTES ──────────────────────────────────
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  const isClinicPublic = CLINIC_PUBLIC_ROUTES.some(route => pathname === route)

  if (isProtected && !isClinicPublic) {
    // For API routes, auth is handled per-route via lib/clinic/auth-middleware.ts
    // For page routes, auth is handled client-side in clinic/layout.tsx
    // Middleware adds session info to headers if available
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      res.headers.set('x-user-id', session.user.id)
      res.headers.set('x-user-email', session.user.email || '')
      res.headers.set('x-user-role', (session.user.user_metadata?.role as string) || '')
    } else if (pathname.startsWith('/api/clinic/')) {
      // API routes get 401 at middleware level if no session AND no bearer token
      const hasBearer = req.headers.get('authorization')?.startsWith('Bearer ')
      const hasApiKey = !!req.headers.get('x-api-key')
      const hasWebhookSecret = !!req.headers.get('x-webhook-secret')

      if (!hasBearer && !hasApiKey && !hasWebhookSecret) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }
      // Bearer/API key auth is verified per-route in auth-middleware.ts
    } else if (pathname.startsWith('/clinic') && !pathname.startsWith('/clinic/login')) {
      // Page routes redirect to login
      return NextResponse.redirect(new URL('/clinic/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
