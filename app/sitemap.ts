import type { MetadataRoute } from 'next'
import { CITIES, LANDING_PAGES, type CitySlug } from '@/lib/seo/locations'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // ── Core pages ──────────────────────────────────────────
  const corePages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/trt`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/glp1`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/peptides`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/glp1-quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/booking`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/waitlist`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/join`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/learn`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]

  // ── City hub pages ──────────────────────────────────────
  // Orange County is the main hub; smaller city hubs are auto-generated.
  const cityHubs: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/orange-county`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    ...(Object.keys(CITIES) as CitySlug[])
      .filter((c) => c !== 'orange-county')
      .map((c) => ({
        url: `${BASE_URL}/${c}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      })),
  ]

  // ── City × Service landing pages ────────────────────────
  const cityServicePages: MetadataRoute.Sitemap = LANDING_PAGES.map(({ city, service }) => ({
    url: `${BASE_URL}/${city}/${service}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: city === 'orange-county' ? 0.9 : 0.8,
  }))

  // ── Comparison pages ────────────────────────────────────
  const comparisonPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/alternatives/best-online-trt-clinics`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // ── Legal pages ─────────────────────────────────────────
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  return [...corePages, ...cityHubs, ...cityServicePages, ...comparisonPages, ...legalPages]
}
