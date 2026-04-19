'use client'

import { Stethoscope } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// When the Medical Director name and credentials are confirmed,
// set MEDICAL_DIRECTOR_LIVE = true and fill out the object below.
// Until then, this component renders a placeholder block that
// still conveys "real medical oversight" without claiming a
// specific (unverified) name.
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
      <div className="rounded-2xl border border-graphite-200 bg-graphite-50 p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-graphite-200 flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-6 h-6 text-graphite-500" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-graphite-500 mb-1">
              Clinical Oversight
            </div>
            <h3 className="text-[18px] font-semibold text-graphite-950 mb-2">
              Board-certified medical team
            </h3>
            <p className="text-[14px] text-graphite-600 leading-relaxed">
              Every prescription is evaluated and signed by a U.S.-licensed physician. Our providers operate within state telehealth regulations and prescribe through licensed pharmacies.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-graphite-200 bg-white p-8">
      <div className="flex items-start gap-5">
        {MEDICAL_DIRECTOR.photoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={MEDICAL_DIRECTOR.photoUrl}
            alt={MEDICAL_DIRECTOR.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-graphite-200 flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-7 h-7 text-graphite-500" />
          </div>
        )}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-graphite-500 mb-1">
            {MEDICAL_DIRECTOR.title}
          </div>
          <h3 className="text-[18px] font-semibold text-graphite-950 mb-2">{MEDICAL_DIRECTOR.name}</h3>
          <ul className="space-y-1 mb-3">
            {MEDICAL_DIRECTOR.credentials.map((c) => (
              <li key={c} className="text-[13px] text-graphite-600">{c}</li>
            ))}
          </ul>
          <p className="text-[14px] text-graphite-600 leading-relaxed">{MEDICAL_DIRECTOR.bio}</p>
        </div>
      </div>
    </div>
  )
}
