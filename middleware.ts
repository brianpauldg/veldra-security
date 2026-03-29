import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/clients',
  '/compliance',
  '/documents',
  '/messaging',
  '/settings',
  '/api/clients',
  '/api/compliance',
  '/api/documents',
  '/api/messaging',
]

// Routes that are public
const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password', '/', '/privacy', '/terms']

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
  
  if (isProtected) {
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session) {
      // Not authenticated — redirect to login
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Session exists — verify it's not expired and user is active
    const tokenExpiry = session.expires_at
    if (tokenExpiry && Date.now() / 1000 > tokenExpiry) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('reason', 'session_expired')
      return NextResponse.redirect(loginUrl)
    }

    // Add user ID to request headers for server components
    res.headers.set('x-user-id', session.user.id)
    res.headers.set('x-user-email', session.user.email || '')
  }

  // ── 5. REDIRECT LOGGED-IN USERS AWAY FROM AUTH PAGES ────────────────────
  if (pathname === '/login' || pathname === '/signup') {
    // Allow bypassing the redirect when the user intentionally wants to
    // access signup for a payment/checkout flow. Marketing buttons can add
    // `?checkout=true` or `?intent=subscribe` to avoid forcing logged-in
    // users straight to the dashboard.
    const requestUrl = new URL(req.url)
    const skipRedirect =
      requestUrl.searchParams.get('checkout') === 'true' ||
      requestUrl.searchParams.get('intent') === 'subscribe' ||
      requestUrl.searchParams.get('source') === 'stripe'

    if (!skipRedirect) {
      const supabase = createMiddlewareClient({ req, res })
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
