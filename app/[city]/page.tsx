import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, MapPin } from 'lucide-react'
import SchemaMarkup, { breadcrumbSchema, localMedicalClinicSchema } from '@/components/SchemaMarkup'
import {
  CITIES,
  LANDING_PAGES,
  getCity,
  getService,
  type CitySlug,
} from '@/lib/seo/locations'

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'

// Static city hubs (excluding orange-county, which has its own /app/orange-county/page.tsx)
const HUB_CITIES: CitySlug[] = (Object.keys(CITIES) as CitySlug[]).filter(
  (c) => c !== 'orange-county'
)

export function generateStaticParams() {
  return HUB_CITIES.map((city) => ({ city }))
}

interface PageProps {
  params: { city: string }
}

function isValid(slug: string): slug is CitySlug {
  return (HUB_CITIES as string[]).includes(slug)
}

export function generateMetadata({ params }: PageProps): Metadata {
  if (!isValid(params.city)) return {}
  const city = getCity(params.city as CitySlug)
  const title = `Telehealth Clinic in ${city.name}, CA — TRT, GLP-1, Hormone Therapy`
  const description = `Physician-managed telehealth for ${city.name}: TRT, GLP-1 weight loss, hormone optimization, peptide therapy. ${city.driveTimeNote}.`
  return {
    title,
    description,
    keywords: `TRT clinic ${city.name}, GLP-1 clinic ${city.name}, hormone optimization ${city.name}, telehealth ${city.name}, medical weight loss ${city.name}`,
    alternates: { canonical: `${BASE}/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE}/${city.slug}`,
      type: 'website',
    },
  }
}

export default function CityHubPage({ params }: PageProps) {
  if (!isValid(params.city)) notFound()
  const city = getCity(params.city as CitySlug)

  const cityServices = LANDING_PAGES.filter((lp) => lp.city === city.slug)

  return (
    <>
      <SchemaMarkup
        schema={[
          localMedicalClinicSchema({
            cityName: city.name,
            cityFullName: city.fullName,
            serviceName: 'Hormone & Metabolic Telehealth',
            serviceShortName: 'Telehealth',
            url: `${BASE}/${city.slug}`,
            neighborhoods: city.neighborhoods,
          }),
          breadcrumbSchema([
            { name: 'Home', url: BASE },
            { name: city.name, url: `${BASE}/${city.slug}` },
          ]),
        ]}
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
                {city.fullName}
              </span>
            </div>
            <h1
              className="text-[32px] leading-[1.05] sm:text-[44px] lg:text-[64px] text-white mb-4 sm:mb-5 font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Telehealth clinic for {city.name} residents.
            </h1>
            <p className="text-[15px] sm:text-base lg:text-lg text-[#8a8268] leading-relaxed max-w-2xl mb-6 sm:mb-8">
              {city.populationContext}. Bloom Metabolics is a physician-managed telehealth practice
              serving {city.name} patients with TRT, GLP-1 weight loss, hormone optimization, and peptide therapy.
              {' '}{city.driveTimeNote}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[14px] sm:text-[15px] font-semibold hover:bg-[#0d0c0a]/90 transition-all shadow-lg w-full sm:w-auto"
              >
                Start Care in {city.name} <ArrowRight className="w-4 h-4" />
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

      {/* Services in this city */}
      <section className="bg-[#050404] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14 max-w-3xl">
            <div className="eyebrow mb-3 sm:mb-4">{city.name} Services</div>
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[44px] text-chrome leading-tight font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Available for {city.name} residents
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cityServices.map(({ service: serviceSlug }) => {
              const svc = getService(serviceSlug)
              return (
                <Link
                  key={serviceSlug}
                  href={`/${city.slug}/${serviceSlug}`}
                  className="group p-5 sm:p-6 rounded-2xl bg-[#0d0c0a]/40 border border-white/5 hover:border-white/20 transition-all"
                >
                  <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#d8cfbe] mb-2 group-hover:text-white transition-colors">
                    {svc.shortName} in {city.name}
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

      {/* Neighborhoods served */}
      <section className="py-12 sm:py-16 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <div className="eyebrow mb-3">{city.name} Service Area</div>
            <h2
              className="text-[22px] sm:text-[28px] text-chrome leading-tight font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Neighborhoods we serve in {city.name}
            </h2>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2.5">
            {city.neighborhoods.map((n) => (
              <li key={n} className="text-[13px] sm:text-[14px] text-[#8a8268]">
                {n}
              </li>
            ))}
          </ul>
          {city.nearbyCities.length > 0 && (
            <p className="text-[12px] text-[#8a8268]/70 mt-6">
              Also serving nearby: {city.nearbyCities.join(', ')}.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 gradient-hero">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-[28px] sm:text-[36px] lg:text-[44px] text-white mb-4 sm:mb-5 leading-tight font-light"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Start your care from {city.name}.
          </h2>
          <p className="text-[14px] sm:text-base lg:text-lg text-[#8a8268] leading-relaxed mb-6 sm:mb-8">
            Begin with a 5-minute intake. A licensed provider will review your goals and recommend the right protocol.
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
