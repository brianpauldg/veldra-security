'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Legacy /booking route — redirect to /book, preserving the session param.
function BookingRedirect() {
  const params = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    const session = params.get('session')
    router.replace(session ? `/book?session=${encodeURIComponent(session)}` : '/book')
  }, [params, router])
  return <div className="min-h-screen bg-graphite-950" />
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-graphite-950" />}>
      <BookingRedirect />
    </Suspense>
  )
}
