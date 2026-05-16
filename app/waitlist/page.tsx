'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import WaitlistModal from '@/components/WaitlistModal'
import Meridian from '@/components/Meridian'

function WaitlistContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const service = searchParams.get('service')
  const [open, setOpen] = useState(true)

  // Map URL service param to waitlist interest value
  const preselectedInterest = service === 'peptides' ? 'peptide-therapy'
    : service === 'trt' ? 'trt'
    : service === 'glp1' ? 'glp1'
    : undefined

  const isPeptide = service === 'peptides'

  function handleClose() {
    setOpen(false)
    router.push('/')
  }

  return (
    <>
      {/* Background content visible behind the modal */}
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center px-6">
          <Meridian size="md" className="mx-auto mb-10" />
          <h1
            className="text-display text-chrome mb-4"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
          >
            {isPeptide ? (
              <>Join the Peptide <em className="italic">Roadmap</em> Waitlist</>
            ) : (
              <>Join the <em className="italic">Waitlist</em></>
            )}
          </h1>
          <p className="text-[15px] text-[#8a8268] font-light max-w-md mx-auto">
            {isPeptide
              ? 'Be notified as each peptide tranche becomes available under FDA 503A pathway clarity.'
              : 'Be first to access personalized metabolic health, hormone optimization, and longevity-focused care.'
            }
          </p>
        </div>
      </section>

      <WaitlistModal isOpen={open} onClose={handleClose} preselectedInterest={preselectedInterest} />
    </>
  )
}

export default function WaitlistPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020202]" />}>
      <WaitlistContent />
    </Suspense>
  )
}
