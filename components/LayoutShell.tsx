'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isClinic = pathname.startsWith('/clinic')

  // Clinic pages use their own layout — skip public Header/Footer
  if (isClinic) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">{children}</main>
      <Footer />
    </>
  )
}
