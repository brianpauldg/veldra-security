// Server component on purpose — no client JS, no framer-motion on this page.
// Pure HTML + Tailwind keeps mobile FCP/LCP fast (Squarespace-style).
// Native <details> handles FAQ open/close with zero JS.

import Link from 'next/link'
import { ArrowRight, Check, MapPin, Clock, Stethoscope, ShieldCheck } from 'lucide-react'
import type { CityData, ServiceData } from '@/lib/seo/locations'

interface LocationServicePageProps {
  city: CityData
  service: ServiceData
  faqs?: { question: string; answer: string }[]
}

export default function LocationServicePage({
  city,
  service,
  faqs,
}: LocationServicePageProps) {
  const defaultFaqs = [
    {
      question: `Is Bloom Metabolics a ${service.shortName} clinic in ${city.name}?`,
      answer: `Bloom Metabolics is a physician-managed telehealth practice serving patients across ${city.fullName}. We are not a brick-and-mortar clinic. ${city.name} patients complete labs at a local Quest or LabCorp draw site (or in-home phlebotomy where available) and meet with their provider by secure video. Medications are shipped directly to your ${city.name} address.`,
    },
    {
      question: `How do I start ${service.shortName} from ${city.name}?`,
      answer: `Three steps. First, complete a 5-minute intake. Second, schedule a video consultation with a licensed provider. Third, complete your labs at a ${city.name}-area draw site. If you qualify, your protocol is built around your bloodwork and shipped to you. No clinic visits required.`,
    },
    {
      question: `Do you serve patients near me in ${city.neighborhoods[0]}?`,
      answer: `Yes. We serve patients throughout ${city.name}, including ${city.neighborhoods.slice(0, 4).join(', ')}, and the surrounding ${city.county} area. Because care is delivered via telehealth, your ${city.zipPrefixes.length > 1 ? 'ZIP code' : 'neighborhood'} does not change your access.`,
    },
    {
      question: `Will my ${city.name} insurance cover this?`,
      answer: `Bloom Metabolics operates as a cash-pay membership practice. We do not bill insurance. This keeps pricing transparent and removes coverage delays that can slow ${service.shortName} programs at traditional ${city.name}-area clinics. You can use HSA or FSA dollars in most cases.`,
    },
    {
      question: `What's the difference between Bloom and an in-person ${service.shortName} clinic in ${city.name}?`,
      answer: `Brick-and-mortar ${service.shortName} clinics in ${city.name} require commutes, waiting rooms, and rigid appointment windows. Bloom is built around licensed physicians, comprehensive lab work, and ongoing message-based care, all without leaving home. For routine ${service.shortName.toLowerCase()} management, telehealth is often a better fit than a clinic visit.`,
    },
  ]

  const finalFaqs = faqs ?? defaultFaqs

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-[#050404] to-[#020202]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,154,115,0.06),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0d0c0a]/5 border border-white/10 text-[11px] sm:text-[12px] font-medium text-[#8a8268] tracking-wide uppercase">
                <MapPin className="w-3 h-3" />
                {service.shortName} · {city.name}, {city.state}
              </span>
            </div>

            <h1
              className="text-[32px] leading-[1.05] sm:text-[44px] lg:text-[64px] text-white mb-4 sm:mb-5 font-light"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              {service.patientSearchIntent} for {city.name} residents.
            </h1>

            <p className="text-[15px] sm:text-base lg:text-lg text-[#8a8268] leading-relaxed max-w-2xl mb-6 sm:mb-8">
              {service.heroSubhead} {city.driveTimeNote}.
            </p>

            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#0d0c0a]/5 border border-white/10 text-[12px] sm:text-[13px] text-[#8a8268]">
                {service.monthlyPrice}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[14px] sm:text-[15px] font-semibold hover:bg-[#0d0c0a]/90 transition-all shadow-lg w-full sm:w-auto"
              >
                Start in {city.name} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/15 text-white text-[14px] sm:text-[15px] font-medium hover:bg-[#0d0c0a]/5 transition-all w-full sm:w-auto"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOCAL VALUE STRIP ─── */}
      <section className="bg-[#050404] py-10 sm:py-14 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0d0c0a] flex items-center justify-center text-[#d8cfbe] flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-[#d8cfbe] mb-1">
                  Serving {city.name} {city.isHub ? 'and all of OC' : `& ${city.county}`}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-[#8a8268] leading-relaxed">
                  {city.neighborhoods.slice(0, 4).join(', ')}
                  {city.neighborhoods.length > 4 ? ', and surrounding areas' : ''}.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0d0c0a] flex items-center justify-center text-[#d8cfbe] flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-[#d8cfbe] mb-1">No commute</h3>
                <p className="text-[12px] sm:text-[13px] text-[#8a8268] leading-relaxed">
                  Video consults, in-home labs where available, medication shipped to your {city.name} address.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0d0c0a] flex items-center justify-center text-[#d8cfbe] flex-shrink-0">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-[#d8cfbe] mb-1">Licensed in California</h3>
                <p className="text-[12px] sm:text-[13px] text-[#8a8268] leading-relaxed">
                  Board-certified physicians, comprehensive lab work, ongoing message-based care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY {CITY} RESIDENTS CHOOSE BLOOM ─── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14 max-w-3xl">
            <div className="eyebrow mb-3 sm:mb-4">{city.name} · {service.shortName}</div>
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[44px] text-chrome mb-4 sm:mb-5 leading-tight font-light"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              Why {city.name} patients choose Bloom for {service.shortName.toLowerCase()}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#8a8268] leading-relaxed font-light">
              {city.populationContext}. Most ${service.shortName.toLowerCase()} programs in the area still require in-person visits, ${city.driveTimeNote.toLowerCase()}. Bloom is built for residents who want serious physician oversight without the friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: `Local lab partners across ${city.name}`,
                body: `Quest and LabCorp draw sites near ${city.neighborhoods[0]} and ${city.neighborhoods[1] ?? city.name}. In-home phlebotomy available for Signature members.`,
              },
              {
                title: 'Personalized protocols, not templates',
                body: `Your ${service.shortName.toLowerCase()} protocol is built around your bloodwork, your symptoms, and your goals. Not a flowchart.`,
              },
              {
                title: 'Ongoing physician oversight',
                body: 'Message your care team between visits. Follow-up labs included on Core and Signature tiers.',
              },
              {
                title: 'Transparent membership pricing',
                body: 'Cash-pay membership. No insurance gatekeeping. HSA and FSA accepted.',
              },
              {
                title: 'Compounded medications when indicated',
                body: 'Sourced from licensed compounding pharmacies. Shipped to your door.',
              },
              {
                title: 'California-licensed physicians',
                body: 'Care delivered by board-certified physicians licensed in California, with experience in hormone and metabolic medicine.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 sm:p-6 rounded-2xl bg-[#0d0c0a]/40 border border-white/5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0d0c0a] flex items-center justify-center text-[#d8cfbe] mb-3 sm:mb-4">
                  <Check className="w-4 h-4" />
                </div>
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#d8cfbe] mb-1.5 sm:mb-2">{item.title}</h3>
                <p className="text-[12px] sm:text-[13px] text-[#8a8268] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (CITY-SPECIFIC) ─── */}
      <section className="bg-[#050404] py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="eyebrow mb-3 sm:mb-4">The Process</div>
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[44px] text-chrome leading-tight font-light max-w-3xl mx-auto"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              How {service.shortName} works for {city.name} residents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Intake', desc: `5-minute online intake from your ${city.name} home.` },
              { step: '02', title: 'Video Consult', desc: 'Meet a licensed physician by secure video.' },
              { step: '03', title: 'Labs Near You', desc: `Walk into a Quest or LabCorp in ${city.name} or schedule in-home draw.` },
              { step: '04', title: 'Treatment', desc: `Protocol shipped to your ${city.name} address. Ongoing care included.` },
            ].map((p) => (
              <div key={p.step}>
                <span className="text-[44px] sm:text-[56px] font-bold text-[#1a1814] leading-none">{p.step}</span>
                <h3 className="text-headline mt-1.5 sm:mt-2 mb-1.5 sm:mb-2 text-[#d8cfbe] text-[18px] sm:text-[20px] font-semibold">{p.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-[#8a8268] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREA ─── */}
      <section className="py-16 sm:py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">
            <div>
              <div className="eyebrow mb-3 sm:mb-4">Service Area</div>
              <h2
                className="text-[24px] sm:text-[30px] lg:text-[36px] text-chrome mb-4 sm:mb-5 leading-tight font-light"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                {service.shortName} for patients across {city.name} {city.isHub ? '' : `and ${city.county}`}
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#8a8268] leading-relaxed mb-4">
                We serve {city.fullName} patients in:
              </p>
            </div>
            <div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {city.neighborhoods.map((n) => (
                  <li key={n} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-gold mt-1 flex-shrink-0" />
                    <span className="text-[13px] sm:text-[14px] text-[#8a8268]">{n}</span>
                  </li>
                ))}
              </ul>
              {city.nearbyCities.length > 0 && (
                <p className="text-[12px] text-[#8a8268]/70 mt-5">
                  Also serving nearby: {city.nearbyCities.join(', ')}.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-[#050404] py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="eyebrow mb-3 sm:mb-4">{city.name} FAQ</div>
            <h2
              className="text-[26px] sm:text-[32px] lg:text-[40px] text-chrome leading-tight font-light"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              {service.shortName} questions from {city.name} patients
            </h2>
          </div>

          <div className="space-y-0 divide-y divide-[#1a1814]">
            {finalFaqs.map((faq) => (
              <details key={faq.question} className="py-5 sm:py-6 group">
                <summary className="text-[15px] sm:text-[16px] font-semibold text-[#d8cfbe] cursor-pointer list-none flex items-start justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-[#8a8268] text-[20px] leading-none mt-0.5 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-[13px] sm:text-[14px] text-[#8a8268] leading-relaxed mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className="py-12 sm:py-16 bg-[#020202] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
              <p className="text-[12px] sm:text-[13px] text-[#8a8268] leading-relaxed max-w-xl">
                All Bloom Metabolics treatments require evaluation and prescription by a licensed medical provider. Individual results vary. Not everyone qualifies for {service.shortName.toLowerCase()}. Bloom is a telehealth membership practice, not an in-person clinic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 sm:py-24 lg:py-32 gradient-hero">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-[28px] sm:text-[36px] lg:text-[44px] text-white mb-4 sm:mb-5 leading-tight font-light"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Start your {service.shortName.toLowerCase()} program from {city.name}
          </h2>
          <p className="text-[14px] sm:text-base lg:text-lg text-[#8a8268] leading-relaxed mb-6 sm:mb-8">
            Begin with a 5-minute intake. A licensed provider will review your goals and determine if {service.shortName.toLowerCase()} is right for you.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[14px] sm:text-[15px] font-semibold hover:bg-[#0d0c0a]/90 transition-all shadow-lg w-full sm:w-auto"
          >
            Join Waitlist <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
