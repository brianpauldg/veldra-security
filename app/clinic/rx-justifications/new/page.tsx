'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import CompoundedRxJustificationForm from '@/components/clinic/CompoundedRxJustification'

function NewJustificationContent() {
  const searchParams = useSearchParams()
  const patientId = searchParams.get('patient_id') || ''

  return (
    <div className="space-y-4">
      <Link href="/clinic/rx-justifications" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to justifications
      </Link>
      <h1 className="text-2xl font-bold text-white tracking-tight">New Compounded Rx Justification</h1>
      <p className="text-sm text-zinc-500">FDA April 2026 — patient-specific medical necessity documentation</p>
      <CompoundedRxJustificationForm defaultPatientId={patientId} />
    </div>
  )
}

export default function NewJustificationPage() {
  return <Suspense fallback={<div className="text-zinc-500">Loading...</div>}><NewJustificationContent /></Suspense>
}
