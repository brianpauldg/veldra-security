'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import CURESAttestationForm from '@/components/clinic/CURESAttestation'

function NewCURESContent() {
  const searchParams = useSearchParams()
  const patientId = searchParams.get('patient_id') || ''

  return (
    <div className="space-y-4">
      <Link href="/clinic/cures" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to CURES attestations
      </Link>
      <h1 className="text-2xl font-bold text-white tracking-tight">New CURES PMP Attestation</h1>
      <p className="text-sm text-zinc-500">California PDMP query attestation for Schedule III TRT prescriptions</p>
      <CURESAttestationForm defaultPatientId={patientId} />
    </div>
  )
}

export default function NewCURESPage() {
  return <Suspense fallback={<div className="text-zinc-500">Loading...</div>}><NewCURESContent /></Suspense>
}
