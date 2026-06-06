'use client'

// Thin client layer. Server components (Header, Footer, page content) are
// passed in as children so they stay server-rendered. The client side here
// only decides:
//   - Whether to render Header/Footer (hidden on /clinic routes)
//   - Whether to wrap content in <main> with public padding
//   - Lazy-loading non-critical popups + cookie + tracker (ssr:false)

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const AttributionTracker = dynamic(() => import('@/components/AttributionTracker'), {
  ssr: false,
  loading: () => null,
})

const LeadPopup = dynamic(() => import('@/components/LeadPopup'), {
  ssr: false,
  loading: () => null,
})

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false,
  loading: () => null,
})

export function PublicChromeIslands() {
  const pathname = usePathname()
  const isClinic = pathname.startsWith('/clinic')

  if (isClinic) return null

  return (
    <>
      <AttributionTracker />
      <LeadPopup trigger="exit" variant="quiz" delay={20} />
      <LeadPopup trigger="scroll" variant="guide" delay={8} scrollDepth={30} />
      <CookieBanner />
    </>
  )
}

// Wraps Header/Footer slots — renders server-component children only on
// non-clinic routes. Header/Footer themselves stay server components.
export function PublicChromeFrame({
  header,
  footer,
  children,
}: {
  header: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isClinic = pathname.startsWith('/clinic')

  if (isClinic) return <>{children}</>

  return (
    <>
      {header}
      <main className="pt-16 lg:pt-20">{children}</main>
      {footer}
    </>
  )
}
