'use client'

import { useEffect } from 'react'
import { captureClientAttribution, ensureSessionId } from '@/lib/attribution'

// Mounted once in LayoutShell. Fires on first page load of a session.
export default function AttributionTracker() {
  useEffect(() => {
    captureClientAttribution()
    ensureSessionId()
  }, [])
  return null
}
