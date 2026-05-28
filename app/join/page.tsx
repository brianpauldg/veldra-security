import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Stethoscope, Microscope, Shield, Users } from 'lucide-react'
import PreLaunchWaitlist from '@/components/PreLaunchWaitlist'
import Meridian from '@/components/Meridian'

export const metadata: Metadata = {
  title: 'Join the Bloom Metabolics Waitlist, Physician-Led Hormone & Metabolic Care',
  description: 'Enrollment opens early-to-mid June 2026. Physician-prescribed TRT, GLP-1, sexual health, and longevity protocols. Founded by Brian DeGuzman, RN. Join the waitlist.',
  openGraph: {
    title: 'Join the Bloom Metabolics Waitlist',
    description: 'Physician-directed hormone and metabolic care. Enrollment opens early-to-mid June 2026.',
    type: 'website',
  },
}

const VALUE_PROPS = [
  {
    icon: <Users className="w-4 h-4" />,
    title: 'Founded by a clinician, not a marketer.',
    desc: 'Brian DeGuzman, RN, building Bloom because the current telehealth model writes scripts without reviewing labs.',
  },
  {
    icon: <Stethoscope className="w-4 h-4" />,
    title: 'Every protocol is physician-prescribed.',
    desc: 'U.S.-licensed physicians evaluate, prescribe, and monitor. Treatment decisions follow comprehensive lab review.',
  },
  {
    icon: <Shield className="w-4 h-4" />,
    title: '503A compounding pharmacy. US-based.',
    desc: 'Medication compounded under individual patient prescription by a state-licensed pharmacy partner.',
  },
  {
    icon: <Microscope className="w-4 h-4" />,
    title: 'Clinical register, not consumer telehealth.',
    desc: 'Quarterly lab monitoring. Dose titration based on biomarkers. A care team that follows up proactively.',
  },
]

const FAQ = [
  { q: 'When does enrollment open?', a: 'Early-to-mid June 2026. Waitlist members are notified first.' },
  { q: 'What does the waitlist do?', a: 'Priority notification when enrollment opens. A 3-email welcome sequence introducing the clinical approach. No spam. Unsubscribe anytime.' },
  { q: 'What does the $49 evaluation include?', a: 'A focused session with a U.S.-licensed physician. Health history review, symptom discussion, and treatment eligibility determination. Credited toward your first month if you continue.' },
  { q: 'Who can I contact?', a: 'Brian DeGuzman, RN, brian@bloommetabolics.com. Reply directly to any email.' },
]

export default function JoinPage() {
  return (
    <main className="bg-[#020202]">
      {/* Hero + Form */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Copy */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Meridian size="sm" />
                <span className="font-mono text-[10px] text-[#8a8268] tracking-[0.25em] uppercase">
                  Bloom Metabolics
                </span>
              </div>

              <h1
                className="text-display-lg text-chrome mb-6"
                style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
              >
                Physician-directed hormone and metabolic care.{' '}
                <em className="italic">Built by a clinician.</em>
              </h1>

              <p className="text-[16px] text-[#8a8268] leading-relaxed mb-10 font-light max-w-lg">
                Bloom Metabolics opens for enrollment in early-to-mid June 2026. Join the waitlist for priority access.
              </p>

              {/* Value props */}
              <div className="space-y-6">
                {VALUE_PROPS.map((vp) => (
                  <div key={vp.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1814] flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                      {vp.icon}
                    </div>
                    <div>
                      <h3 className="text-[14px] text-[#d8cfbe] font-medium mb-1">{vp.title}</h3>
                      <p className="text-[13px] text-[#8a8268] leading-relaxed font-light">{vp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-[#0d0c0a] border border-[#1a1814] rounded-2xl p-8">
                <h2
                  className="text-[20px] text-[#d8cfbe] mb-2"
                  style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}
                >
                  Join the waitlist
                </h2>
                <p className="text-[13px] text-[#8a8268] mb-6 font-light">
                  Email and optional preferences only. No health information collected.
                </p>
                <PreLaunchWaitlist variant="full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Block */}
      <section className="py-16 border-t border-[#1a1814]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#1a1814] flex-shrink-0">
              <Image
                src="/images/founder-brian.png"
                alt="Brian DeGuzman, RN"
                width={64}
                height={64}
                className="object-cover object-top w-full h-full"
              />
            </div>
            <div>
              <p className="text-[15px] text-[#d8cfbe] font-medium">Brian DeGuzman, RN</p>
              <p className="text-[12px] text-[#8a8268] font-light">Founder, Bloom Metabolics</p>
            </div>
          </div>

          <div className="space-y-4 text-[14px] text-[#8a8268] leading-relaxed font-light">
            <p>
              Bloom is a membership-based telehealth practice specializing in testosterone optimization,
              GLP-1 metabolic therapy, sexual health, longevity protocols, and peptide therapy
              (launching under FDA 503A pathway as regulatory clarity emerges).
            </p>
            <p>
              All medication is compounded by a US-based, state-licensed 503A pharmacy under individual
              patient prescription. Compounded medications are not FDA-approved. Every treatment requires
              physician evaluation. Individual results vary.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-[#1a1814]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2
            className="text-[20px] text-[#d8cfbe] mb-8"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}
          >
            Common questions
          </h2>
          <div className="divide-y divide-[#1a1814]">
            {FAQ.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="text-[14px] text-[#d8cfbe] font-medium mb-2">{faq.q}</h3>
                <p className="text-[13px] text-[#8a8268] leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer contact */}
      <section className="py-12 border-t border-[#1a1814]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[13px] text-[#8a8268] font-light">
            Questions? Email{' '}
            <a href="mailto:brian@bloommetabolics.com" className="text-[#d8cfbe] hover:text-white transition-colors">
              brian@bloommetabolics.com
            </a>
          </p>
          <p className="font-mono text-[10px] text-[#2a2620] tracking-[0.15em] uppercase mt-6">
            All treatments require evaluation and approval by a licensed medical provider. Individual results vary.
          </p>
        </div>
      </section>
    </main>
  )
}
