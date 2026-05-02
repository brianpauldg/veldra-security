'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import WaitlistModal from '@/components/WaitlistModal'
import Meridian from '@/components/Meridian'

export default function WaitlistPage() {
  const router = useRouter()
  const [open, setOpen] = useState(true)

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
            Join the <em className="italic">Waitlist</em>
          </h1>
          <p className="text-[15px] text-[#8a8268] font-light max-w-md mx-auto">
            Be first to access personalized metabolic health, hormone optimization, and longevity-focused care.
          </p>
        </div>
      </section>

      <WaitlistModal isOpen={open} onClose={handleClose} />
    </>
  )
}
