// app/auth/callback/route.ts
// Handles OAuth redirects from Google/Microsoft

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const redirectTo = requestUrl.searchParams.get('redirectTo') || '/dashboard'

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error)}`, request.url))
  }

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        console.error('Session exchange error:', sessionError)
        return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
      }
      
      // Validate redirect destination (prevent open redirect attacks)
      const allowedOrigins = [
        process.env.NEXT_PUBLIC_APP_URL || 'https://app.novahealth.io',
        'http://localhost:3000',
      ]
      
      let safeRedirect = '/dashboard'
      try {
        const redirectUrl = new URL(redirectTo, request.url)
        if (allowedOrigins.some(origin => redirectUrl.origin === new URL(origin).origin)) {
          safeRedirect = redirectUrl.pathname
        }
      } catch {
        safeRedirect = '/dashboard'
      }
      
      return NextResponse.redirect(new URL(safeRedirect, request.url))
    } catch (err) {
      console.error('Auth callback error:', err)
      return NextResponse.redirect(new URL('/login?error=server_error', request.url))
    }
  }

  return NextResponse.redirect(new URL('/login', request.url))
}
