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

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Bloom Metabolics',
  description: 'Premium physician-managed telehealth for TRT, GLP-1 weight loss, and peptide therapy. Comprehensive labs. Proactive care.',
  url: 'https://bloommetabolics.com',
  logo: 'https://bloommetabolics.com/logo.png',
  email: 'support@bloommetabolics.com',
  medicalSpecialty: ['Endocrinology', 'Men\'s Health', 'Weight Management'],
  availableService: [
    { '@type': 'MedicalTherapy', name: 'Testosterone Replacement Therapy (TRT)' },
    { '@type': 'MedicalTherapy', name: 'GLP-1 Medical Weight Loss' },
    { '@type': 'MedicalTherapy', name: 'Peptide Therapy' },
  ],
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
      logo: { '@type': 'ImageObject', url: 'https://bloommetabolics.com/logo.png' },
    },
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    mainEntityOfPage: props.url,
  }
}
