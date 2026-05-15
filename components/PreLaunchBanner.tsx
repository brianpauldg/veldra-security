'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'bloom-prelaunch-banner-dismissed'

interface PreLaunchBannerProps {
  /** Copy text for the banner. Selected from variants during review. */
  copy?: string
}

export default function PreLaunchBanner({
  copy = 'Bloom Metabolics opens for enrollment in early-to-mid June 2026. Join the waitlist below.',
}: PreLaunchBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show banner if not dismissed in this session
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  if (!visible) return null

  return (
    <div className="bg-[#0d0c0a] border-b border-[#1a1814] py-3 px-4 relative z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <p className="text-[13px] text-[#d8cfbe] font-light text-center">
          <span className="text-gold font-medium">Pre-launch</span>
          <span className="mx-2 text-[#1a1814]">|</span>
          {copy}
        </p>
        <button
          onClick={dismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#8a8268] hover:text-[#d8cfbe] transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
