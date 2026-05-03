'use client'

/**
 * /r/[code] — Referral landing page
 * Stores referral code in cookie and redirects to /book
 */

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ReferralLandingPage() {
  const params = useParams()
  const router = useRouter()
  const code = params.code as string

  useEffect(() => {
    if (code) {
      // Store referral code in cookie (30-day expiry)
      document.cookie = `ref_code=${encodeURIComponent(code)};path=/;max-age=${30 * 24 * 3600};samesite=lax`
    }
    router.replace('/book')
  }, [code, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <p className="text-[#c9b88c] text-lg">Redirecting...</p>
    </div>
  )
}
