import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationServicePage from '@/components/LocationServicePage'
import SchemaMarkup, {
  breadcrumbSchema,
  localMedicalClinicSchema,
  faqSchema,
} from '@/components/SchemaMarkup'
import {
  CITIES,
  SERVICES,
  LANDING_PAGES,
  getCity,
  getService,
  buildPageTitle,
  buildMetaDescription,
  buildCanonical,
  type CitySlug,
  type ServiceSlug,
} from '@/lib/seo/locations'

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'

interface PageProps {
  params: { city: string; service: string }
}

export function generateStaticParams() {
  return LANDING_PAGES.map(({ city, service }) => ({ city, service }))
}

function isValidParams(p: PageProps['params']): p is { city: CitySlug; service: ServiceSlug } {
  return (
    LANDING_PAGES.some(
      (lp) => lp.city === (p.city as CitySlug) && lp.service === (p.service as ServiceSlug)
    )
  )
}

export function generateMetadata({ params }: PageProps): Metadata {
  if (!isValidParams(params)) return {}
  const city = getCity(params.city)
  const service = getService(params.service)
  const title = buildPageTitle(city, service)
  const description = buildMetaDescription(city, service)
  const canonical = buildCanonical(city, service)
  const keywords = [
    `${service.shortName} ${city.name}`,
    `${service.patientSearchIntent} ${city.name}`,
    `${service.patientSearchIntent} near me`,
    ...service.primaryKeywords.map((k) => `${k} ${city.name}`),
    ...service.secondaryKeywords,
  ].join(', ')

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Bloom Metabolics',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function CityServicePage({ params }: PageProps) {
  if (!isValidParams(params)) notFound()

  const city = getCity(params.city)
  const service = getService(params.service)

  const cityPath = `${BASE}/${city.slug}`
  const fullPath = `${cityPath}/${service.slug}`

  return (
    <>
      <SchemaMarkup
        schema={[
          localMedicalClinicSchema({
            cityName: city.name,
            cityFullName: city.fullName,
            serviceName: service.name,
            serviceShortName: service.shortName,
            url: fullPath,
            neighborhoods: city.neighborhoods,
          }),
          breadcrumbSchema([
            { name: 'Home', url: BASE },
            { name: city.name, url: cityPath },
            { name: service.shortName, url: fullPath },
          ]),
          faqSchema([
            {
              question: `Is Bloom Metabolics a ${service.shortName} clinic in ${city.name}?`,
              answer: `Bloom Metabolics is a physician-managed telehealth practice serving patients across ${city.fullName}. ${city.name} patients complete labs at a local draw site and meet with their provider by secure video.`,
            },
            {
              question: `How do I start ${service.shortName} from ${city.name}?`,
              answer: `Complete a 5-minute intake, schedule a video consultation with a licensed provider, and complete your labs at a ${city.name}-area Quest or LabCorp site. If you qualify, your protocol is built around your bloodwork.`,
            },
            {
              question: `Do you serve patients near me in ${city.neighborhoods[0]}?`,
              answer: `Yes. We serve patients throughout ${city.name}, including ${city.neighborhoods.slice(0, 4).join(', ')}, and the surrounding ${city.county} area.`,
            },
          ]),
        ]}
      />
      <LocationServicePage city={city} service={service} />
    </>
  )
}
