'use client'

import { useState, useEffect } from 'react'

const COOKIE_CONSENT_KEY = 'bloom_cookie_consent_v1'
const CONSENT_EXPIRY_MS = 365 * 24 * 60 * 60 * 1000 // 12 months

interface CookieConsent {
  necessary: boolean // always true
  analytics: boolean
  marketing: boolean
  timestamp: number
}

function getStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!raw) return null
    const consent: CookieConsent = JSON.parse(raw)
    if (Date.now() - consent.timestamp > CONSENT_EXPIRY_MS) {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
      return null
    }
    return consent
  } catch {
    return null
  }
}

function saveConsent(consent: CookieConsent) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  // CCPA-compliant defaults: non-essential cookies OFF
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const existing = getStoredConsent()
    if (!existing) {
      setVisible(true)
    }
  }, [])

  function accept(analyticsOn: boolean, marketingOn: boolean) {
    saveConsent({
      necessary: true,
      analytics: analyticsOn,
      marketing: marketingOn,
      timestamp: Date.now(),
    })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4" role="dialog" aria-label="Cookie consent">
      <div className="max-w-2xl mx-auto rounded-xl border border-[#1a1814] bg-[#0d0c0a] p-5 shadow-2xl">
        <p className="text-[13px] text-[#d8cfbe] leading-relaxed mb-4">
          We use cookies to operate our platform. Analytics and marketing cookies are off by default.{' '}
          <a href="/privacy" className="underline text-[#8a8268] hover:text-[#d8cfbe]">Privacy Policy</a>.
        </p>

        {showCustomize && (
          <div className="space-y-3 mb-4 p-3 rounded-lg bg-[#050404] border border-[#1a1814]">
            <label className="flex items-center justify-between">
              <span className="text-[12px] text-[#d8cfbe]">Necessary (always on)</span>
              <input type="checkbox" checked disabled className="w-4 h-4 rounded" aria-label="Necessary cookies" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[12px] text-[#8a8268]">Analytics</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-4 h-4 rounded border-[#2a2620] bg-[#0d0c0a] text-[#8a8268]"
                aria-label="Analytics cookies"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[12px] text-[#8a8268]">Marketing</span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="w-4 h-4 rounded border-[#2a2620] bg-[#0d0c0a] text-[#8a8268]"
                aria-label="Marketing cookies"
              />
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => accept(true, true)}
            className="px-4 py-2 rounded-lg bg-[#d8cfbe] text-[#020202] text-[12px] font-medium hover:bg-[#f5ecd9] transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={() => accept(false, false)}
            className="px-4 py-2 rounded-lg border border-[#1a1814] text-[#8a8268] text-[12px] font-medium hover:text-[#d8cfbe] transition-colors"
          >
            Reject Non-Essential
          </button>
          {showCustomize ? (
            <button
              onClick={() => accept(analytics, marketing)}
              className="px-4 py-2 rounded-lg border border-[#1a1814] text-[#8a8268] text-[12px] font-medium hover:text-[#d8cfbe] transition-colors"
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={() => setShowCustomize(true)}
              className="px-4 py-2 rounded-lg border border-[#1a1814] text-[#8a8268] text-[12px] font-medium hover:text-[#d8cfbe] transition-colors"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
