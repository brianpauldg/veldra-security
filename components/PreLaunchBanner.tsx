'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'bloom-prelaunch-banner-dismissed'

export default function PreLaunchBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  if (!visible) return null

  return (
    <div className="bg-[#0d0c0a] border-b border-[#1a1814] py-3 px-10 relative z-[60]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[13px] text-[#d8cfbe] font-light leading-relaxed">
          <strong className="font-medium">Bloom Metabolics launches July 15, 2026.</strong>{' '}
          Be among the first to access our personalized metabolic care platform. Join the waitlist today for priority access and exclusive launch updates.
        </p>
        <p className="text-[11px] text-[#8a8268] font-light leading-relaxed mt-1">
          No medical services are currently provided, and no health information is collected.
        </p>
      </div>
      <button
        onClick={dismiss}
        className="absolute right-4 top-3 p-1 text-[#8a8268] hover:text-[#d8cfbe] transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
