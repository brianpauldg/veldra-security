import type { ReactNode } from 'react'
import ClinicShell from './ClinicShell'

// Prevent static prerendering — clinic pages require Supabase auth at runtime
export const dynamic = 'force-dynamic'

export default function ClinicLayout({ children }: { children: ReactNode }) {
  return <ClinicShell>{children}</ClinicShell>
}
