'use client'

import { Stethoscope } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// MEDICAL_DIRECTOR_LIVE flag must NOT be flipped to true until ALL of:
// 1. Signed agreement with physician partner (executed by attorney)
// 2. Verified credentials: California medical license number, NPI, DEA, board certifications
// 3. Physician has reviewed and approved the bio content displayed below
// 4. Verified malpractice coverage extends to Bloom telehealth work
// 5. Brian has documented all of the above at /compliance/medical-director-launch-checklist.md
// Flipping this flag without all above is a legal exposure (false advertising,
// potential medical board complaint, fraudulent representation).
// ─────────────────────────────────────────────────────────────

export const MEDICAL_DIRECTOR_LIVE = false

export const MEDICAL_DIRECTOR = {
  name: '[TODO] Dr. [Full Name], MD',
  title: 'Medical Director',
  credentials: ['Board Certified — [Specialty]', 'Licensed in [States]'],
  bio: 'TODO — short bio once MD is confirmed.',
  photoUrl: '',
}

export default function MedicalDirectorBio() {
  if (!MEDICAL_DIRECTOR_LIVE) {
    return (
      <div className="rounded-2xl border border-[#1a1814] bg-[#050404] p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1a1814] flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-6 h-6 text-[#8a8268]" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8a8268] mb-1">
              Clinical Oversight
            </div>
            <h3 className="text-[18px] font-semibold text-[#d8cfbe] mb-2">
              Board-certified medical team
            </h3>
            <p className="text-[14px] text-[#8a8268] leading-relaxed">
              Every prescription is evaluated and signed by a U.S.-licensed physician. Our providers operate within state telehealth regulations and prescribe through licensed pharmacies.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[#1a1814] bg-[#0d0c0a] p-8">
      <div className="flex items-start gap-5">
        {MEDICAL_DIRECTOR.photoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={MEDICAL_DIRECTOR.photoUrl}
            alt={MEDICAL_DIRECTOR.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#1a1814] flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-7 h-7 text-[#8a8268]" />
          </div>
        )}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8a8268] mb-1">
            {MEDICAL_DIRECTOR.title}
          </div>
          <h3 className="text-[18px] font-semibold text-[#d8cfbe] mb-2">{MEDICAL_DIRECTOR.name}</h3>
          <ul className="space-y-1 mb-3">
            {MEDICAL_DIRECTOR.credentials.map((c) => (
              <li key={c} className="text-[13px] text-[#8a8268]">{c}</li>
            ))}
          </ul>
          <p className="text-[14px] text-[#8a8268] leading-relaxed">{MEDICAL_DIRECTOR.bio}</p>
        </div>
      </div>
    </div>
  )
}
