import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { CITIES, SERVICES, LANDING_PAGES, getCity, getService } from '@/lib/seo/locations'
import SchemaMarkup, { breadcrumbSchema } from '@/components/SchemaMarkup'
import SymptomChecklistCTA from '@/components/SymptomChecklistCTA'

const city = getCity('orange-county')
const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'

export const metadata: Metadata = {
  title: `Orange County Telehealth Clinic — TRT, GLP-1, Hormone & Peptide Therapy`,
  description: `Physician-managed telehealth for Orange County: TRT, GLP-1 weight loss, hormone optimization, and peptide therapy. Serving Irvine, Newport Beach, Costa Mesa, Anaheim, Huntington Beach and surrounding cities.`,
  alternates: { canonical: `${BASE}/orange-county` },
  openGraph: {
    title: `Orange County Telehealth Clinic | Bloom Metabolics`,
    description: `TRT, GLP-1, hormone optimization, and peptide therapy for Orange County residents. Telehealth visits, local labs, physician oversight.`,
    url: `${BASE}/orange-county`,
    type: 'website',
  },
}

const ocServices = LANDING_PAGES.filter((p) => p.city === 'orange-county')

export default function OrangeCountyHubPage() {
  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: 'Home', url: BASE },
          { name: 'Orange County', url: `${BASE}/orange-county` },
        ])}
      />

      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-[#050404] to-[#020202]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,154,115,0.06),_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0d0c0a]/5 border border-white/10 text-[11px] sm:text-[12px] font-medium text-[#8a8268] tracking-wide uppercase">
                <MapPin className="w-3 h-3" />
                Orange County, California
              </span>
            </div>
            <h1
              className="text-[32px] leading-[1.05] sm:text-[44px] lg:text-[64px] text-white mb-4 sm:mb-5 font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Telehealth clinic for Orange County residents.
            </h1>
            <p className="text-[15px] sm:text-base lg:text-lg text-[#8a8268] leading-relaxed max-w-2xl mb-6 sm:mb-8">
              Physician-managed TRT, GLP-1 weight loss, hormone optimization, and peptide therapy.
              Comprehensive labs. Personalized protocols. Delivered to your Orange County home.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[14px] sm:text-[15px] font-semibold hover:bg-[#0d0c0a]/90 transition-all shadow-lg w-full sm:w-auto"
              >
                Start Care <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/15 text-white text-[14px] sm:text-[15px] font-medium hover:bg-[#0d0c0a]/5 transition-all w-full sm:w-auto"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-[#050404] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14 max-w-3xl">
            <div className="eyebrow mb-3 sm:mb-4">Services for Orange County</div>
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[44px] text-chrome leading-tight font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              What we treat
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ocServices.map(({ service: serviceSlug }) => {
              const svc = getService(serviceSlug)
              return (
                <Link
                  key={serviceSlug}
                  href={`/orange-county/${serviceSlug}`}
                  className="group p-5 sm:p-6 rounded-2xl bg-[#0d0c0a]/40 border border-white/5 hover:border-white/20 transition-all"
                >
                  <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#d8cfbe] mb-2 group-hover:text-white transition-colors">
                    {svc.shortName} in Orange County
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-[#8a8268] leading-relaxed mb-3">
                    {svc.heroSubhead}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-gold">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* City list */}
      <section className="py-16 sm:py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 max-w-3xl">
            <div className="eyebrow mb-3 sm:mb-4">Service Area</div>
            <h2
              className="text-[28px] sm:text-[36px] text-chrome leading-tight font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Cities we serve across Orange County
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Object.values(CITIES)
              .filter((c) => c.slug !== 'orange-county')
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/trt`}
                  className="p-4 rounded-xl bg-[#0d0c0a]/40 border border-white/5 hover:border-white/20 transition-all"
                >
                  <span className="text-[14px] sm:text-[15px] font-medium text-[#d8cfbe]">{c.name}</span>
                </Link>
              ))}
          </div>
          <p className="text-[12px] text-[#8a8268]/70 mt-6">
            Plus Santa Ana, Tustin, Mission Viejo, Laguna Beach, Yorba Linda, Fullerton, Aliso Viejo, Lake Forest, and all of Orange County.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 gradient-hero">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-[28px] sm:text-[36px] lg:text-[44px] text-white mb-4 sm:mb-5 leading-tight font-light"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Built for Orange County.
          </h2>
          <p className="text-[14px] sm:text-base lg:text-lg text-[#8a8268] leading-relaxed mb-6 sm:mb-8">
            No commutes, no waiting rooms, no insurance gatekeeping. Just licensed physicians, comprehensive labs, and personalized protocols shipped to your home.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[14px] sm:text-[15px] font-semibold hover:bg-[#0d0c0a]/90 transition-all shadow-lg w-full sm:w-auto"
          >
            Start Care <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Secondary conversion — OC hub spans all verticals, default to
          the broad hormone assessment as the lowest-friction entry. */}
      <SymptomChecklistCTA vertical="hormone" />
    </>
  )
}
