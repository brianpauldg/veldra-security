interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pre-built schemas for Bloom Metabolics
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://bloommetabolics.com'
const BRAND_LOGO_URL = `${SITE_URL}/logo.png` // 512x512 brand mark; matches favicon + Meridian glyph
const BRAND_LOGO_WIDTH = 512
const BRAND_LOGO_HEIGHT = 512

// Alias retained for internal references in the local-SEO schemas below.
const BASE_URL = SITE_URL

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: 'Bloom Metabolics',
  description:
    'Membership-based physician-managed telehealth for hormone optimization, metabolic health, and longevity. TRT, GLP-1, sexual health, and longevity protocols.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: BRAND_LOGO_URL,
    width: BRAND_LOGO_WIDTH,
    height: BRAND_LOGO_HEIGHT,
  },
  image: BRAND_LOGO_URL,
  email: 'brian@bloommetabolics.com',
  priceRange: '$149-$599',
  founder: {
    '@type': 'Person',
    name: 'Brian DeGuzman',
    jobTitle: 'Founder & RN',
    description:
      'Registered Nurse and founder of Bloom Metabolics. Pursuing Advanced Practice Nursing licensure.',
  },
  medicalSpecialty: ['Endocrinology', "Men's Health", 'Weight Management'],
  areaServed: [
    { '@type': 'State', name: 'California' },
    { '@type': 'AdministrativeArea', name: 'Orange County' },
  ],
  availableService: [
    { '@type': 'MedicalTherapy', name: 'TRT Optimization' },
    { '@type': 'MedicalTherapy', name: 'GLP-1 Metabolic Program' },
    { '@type': 'MedicalTherapy', name: 'Sexual Health Optimization' },
    { '@type': 'MedicalTherapy', name: 'Longevity Stack' },
    { '@type': 'MedicalTherapy', name: 'Peptide Therapy' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Bloom Metabolics Membership',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Bloom Essentials',
        description: 'Entry-level care team access, messaging, and basic lab review.',
        price: '149',
        priceCurrency: 'USD',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      },
      {
        '@type': 'Offer',
        name: 'Bloom Core',
        description: 'Flagship tier with clinician visits, comprehensive labs, and priority response.',
        price: '299',
        priceCurrency: 'USD',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      },
      {
        '@type': 'Offer',
        name: 'Bloom Signature',
        description:
          'Concierge tier with direct provider access, labs included, in-home phlebotomy.',
        price: '599',
        priceCurrency: 'USD',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      },
    ],
  },
  sameAs: [
    // Add when live:
    // 'https://www.facebook.com/bloommetabolics',
    // 'https://www.instagram.com/bloommetabolics',
    // 'https://twitter.com/bloommetabolics',
    // 'https://g.page/bloommetabolics',
  ],
}

// Per-location MedicalClinic schema. Use this on every city/service landing page
// to signal local relevance to Google. Combined with consistent NAP and the GBP,
// this is the foundation of the local SEO play.
export function localMedicalClinicSchema(args: {
  cityName: string
  cityFullName: string
  serviceName: string
  serviceShortName: string
  url: string
  neighborhoods?: string[]
}) {
  const { cityName, cityFullName, serviceName, serviceShortName, url, neighborhoods = [] } = args

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${url}#clinic`,
    name: `Bloom Metabolics — ${serviceShortName} for ${cityName}`,
    description: `Physician-managed ${serviceName} for ${cityFullName} residents. Telehealth visits, comprehensive labs, ongoing care. Cash-pay membership practice serving Orange County.`,
    url,
    image: BRAND_LOGO_URL,
    telephone: '',
    priceRange: '$149-$599',
    parentOrganization: { '@id': `${BASE_URL}/#organization` },
    medicalSpecialty: ['Endocrinology', "Men's Health", 'Weight Management'],
    availableService: {
      '@type': 'MedicalTherapy',
      name: serviceName,
      url,
    },
    areaServed: [
      { '@type': 'City', name: cityName, containedInPlace: { '@type': 'AdministrativeArea', name: 'Orange County' } },
      ...neighborhoods.map((n) => ({ '@type': 'Place', name: `${n}, ${cityName}` })),
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    // Telehealth-specific signals
    isAcceptingNewPatients: true,
    healthPlanNetworkTier: 'Cash-pay membership',
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function articleSchema(props: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.headline,
    description: props.description,
    author: { '@type': 'Organization', name: 'Bloom Metabolics' },
    publisher: {
      '@type': 'Organization',
      name: 'Bloom Metabolics',
      logo: {
        '@type': 'ImageObject',
        url: BRAND_LOGO_URL,
        width: BRAND_LOGO_WIDTH,
        height: BRAND_LOGO_HEIGHT,
      },
    },
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    mainEntityOfPage: props.url,
  }
}

// WebSite schema with SearchAction — improves sitelinks search box eligibility.
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Bloom Metabolics',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}
