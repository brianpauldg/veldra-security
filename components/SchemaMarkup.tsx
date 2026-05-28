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

// Pre-built schemas for Bloom Metabolics

const SITE_URL = 'https://bloommetabolics.com'
const BRAND_LOGO_URL = `${SITE_URL}/logo.png` // 512x512 brand mark; matches favicon + Meridian glyph
const BRAND_LOGO_WIDTH = 512
const BRAND_LOGO_HEIGHT = 512

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Bloom Metabolics',
  description: 'Membership-based physician-managed telehealth for hormone optimization, metabolic health, and longevity. TRT, GLP-1, sexual health, and longevity protocols.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: BRAND_LOGO_URL,
    width: BRAND_LOGO_WIDTH,
    height: BRAND_LOGO_HEIGHT,
  },
  image: BRAND_LOGO_URL,
  email: 'brian@bloommetabolics.com',
  founder: {
    '@type': 'Person',
    name: 'Brian DeGuzman',
    jobTitle: 'Founder & RN',
    description: 'Registered Nurse and founder of Bloom Metabolics. Pursuing Advanced Practice Nursing licensure.',
  },
  medicalSpecialty: ['Endocrinology', 'Men\'s Health', 'Weight Management'],
  availableService: [
    { '@type': 'MedicalTherapy', name: 'TRT Optimization' },
    { '@type': 'MedicalTherapy', name: 'GLP-1 Metabolic Program' },
    { '@type': 'MedicalTherapy', name: 'Sexual Health Optimization' },
    { '@type': 'MedicalTherapy', name: 'Longevity Stack' },
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
        description: 'Concierge tier with direct provider access, labs included, in-home phlebotomy.',
        price: '599',
        priceCurrency: 'USD',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      },
    ],
  },
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
