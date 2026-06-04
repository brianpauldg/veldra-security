'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadPopup from '@/components/LeadPopup'
import AttributionTracker from '@/components/AttributionTracker'
import CookieBanner from '@/components/CookieBanner'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isClinic = pathname.startsWith('/clinic')

  // Clinic pages use their own layout — skip public Header/Footer/popups
  if (isClinic) {
    return <>{children}</>
  }

  return (
    <>
      <AttributionTracker />
      <Header />
      <main className="pt-16 lg:pt-20">{children}</main>
      <Footer />
      {/* Exit-intent lead captures. Shows at most once per session, never to existing leads. */}
      <LeadPopup trigger="exit" variant="quiz" delay={20} />
      <LeadPopup trigger="scroll" variant="guide" delay={8} scrollDepth={30} />
      <CookieBanner />
    </>
  )
}
