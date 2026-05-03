'use client'

/**
 * PostHog Analytics Bootstrap
 * Loads PostHog via script tag on public pages. Never tracks PHI.
 * PostHog JS SDK loaded dynamically — no npm dependency required.
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isPublicPage } from '@/lib/analytics/safe-track'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

declare global {
  interface Window {
    posthog?: { init: (key: string, opts: Record<string, unknown>) => void; __loaded?: boolean }
  }
}

export function AnalyticsBootstrap() {
  const pathname = usePathname()

  useEffect(() => {
    if (!POSTHOG_KEY || !isPublicPage(pathname)) return
    if (window.posthog?.__loaded) return

    // Load PostHog snippet via script tag
    const script = document.createElement('script')
    script.async = true
    script.src = `${POSTHOG_HOST}/static/array.js`
    script.onload = () => {
      window.posthog?.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: true,
        capture_pageleave: true,
        persistence: 'localStorage+cookie',
        autocapture: false,
        disable_session_recording: true,
        respect_dnt: true,
      })
    }
    document.head.appendChild(script)
  }, [pathname])

  return null
}
