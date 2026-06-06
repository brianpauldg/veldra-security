// Local SEO data layer for Orange County telehealth landing pages.
// Single source of truth for city + service combinations used by:
//   - /lib/seo/locations.ts (this file)
//   - /components/LocationServicePage.tsx
//   - /app/[city]/[service]/page.tsx routes
//   - /app/sitemap.ts
//   - /components/SchemaMarkup.tsx (localBusinessSchema, serviceArea)

export type ServiceSlug =
  | 'trt'
  | 'glp1'
  | 'medical-weight-loss'
  | 'hormone-optimization'
  | 'peptide-therapy'

export type CitySlug =
  | 'orange-county'
  | 'irvine'
  | 'newport-beach'
  | 'costa-mesa'
  | 'anaheim'
  | 'huntington-beach'

export interface CityData {
  slug: CitySlug
  name: string
  fullName: string
  county: 'Orange County'
  state: 'CA'
  stateFull: 'California'
  zipPrefixes: string[]
  neighborhoods: string[]
  nearbyCities: string[]
  driveTimeNote: string
  populationContext: string
  isHub?: boolean
}

export interface ServiceData {
  slug: ServiceSlug
  name: string
  shortName: string
  category: 'TRT' | 'GLP-1' | 'Weight Loss' | 'Hormone' | 'Peptide'
  internalRoute: string
  monthlyPrice: string
  primaryKeywords: string[]
  secondaryKeywords: string[]
  metaDescriptionLead: string
  heroSubhead: string
  patientSearchIntent: string
}

export const CITIES: Record<CitySlug, CityData> = {
  'orange-county': {
    slug: 'orange-county',
    name: 'Orange County',
    fullName: 'Orange County, California',
    county: 'Orange County',
    state: 'CA',
    stateFull: 'California',
    zipPrefixes: ['926', '927', '928'],
    neighborhoods: [
      'Irvine', 'Newport Beach', 'Costa Mesa', 'Anaheim', 'Huntington Beach',
      'Santa Ana', 'Tustin', 'Mission Viejo', 'Laguna Beach', 'Yorba Linda',
      'Fullerton', 'Aliso Viejo', 'Lake Forest',
    ],
    nearbyCities: ['Long Beach', 'Cerritos'],
    driveTimeNote: 'serving patients across Orange County without the drive to a clinic',
    populationContext: 'Orange County is home to 3.2 million residents across 34 cities',
    isHub: true,
  },
  irvine: {
    slug: 'irvine',
    name: 'Irvine',
    fullName: 'Irvine, CA',
    county: 'Orange County',
    state: 'CA',
    stateFull: 'California',
    zipPrefixes: ['92602', '92603', '92604', '92606', '92612', '92614', '92617', '92618', '92620'],
    neighborhoods: ['Woodbridge', 'Northwood', 'Quail Hill', 'Turtle Rock', 'Great Park', 'Spectrum', 'University Park'],
    nearbyCities: ['Tustin', 'Newport Beach', 'Lake Forest', 'Costa Mesa'],
    driveTimeNote: 'no drive to UCI Medical or Hoag — care comes to you',
    populationContext: 'Irvine is home to 300,000+ residents and a major UC research campus',
  },
  'newport-beach': {
    slug: 'newport-beach',
    name: 'Newport Beach',
    fullName: 'Newport Beach, CA',
    county: 'Orange County',
    state: 'CA',
    stateFull: 'California',
    zipPrefixes: ['92625', '92626', '92660', '92661', '92662', '92663'],
    neighborhoods: ['Corona del Mar', 'Balboa Island', 'Newport Coast', 'Lido Isle', 'Big Canyon', 'Eastbluff'],
    nearbyCities: ['Costa Mesa', 'Irvine', 'Huntington Beach', 'Laguna Beach'],
    driveTimeNote: 'a Hoag-area alternative without waiting rooms',
    populationContext: 'Newport Beach combines a high-performance lifestyle with one of the highest median incomes in the county',
  },
  'costa-mesa': {
    slug: 'costa-mesa',
    name: 'Costa Mesa',
    fullName: 'Costa Mesa, CA',
    county: 'Orange County',
    state: 'CA',
    stateFull: 'California',
    zipPrefixes: ['92626', '92627', '92628'],
    neighborhoods: ['South Coast Metro', 'Mesa Verde', 'Eastside', 'Westside', 'Halecrest'],
    nearbyCities: ['Newport Beach', 'Irvine', 'Huntington Beach', 'Santa Ana'],
    driveTimeNote: 'skip the South Coast Plaza traffic — start from home',
    populationContext: 'Costa Mesa sits at the center of Orange County with quick access to Irvine, Newport, and Huntington',
  },
  anaheim: {
    slug: 'anaheim',
    name: 'Anaheim',
    fullName: 'Anaheim, CA',
    county: 'Orange County',
    state: 'CA',
    stateFull: 'California',
    zipPrefixes: ['92801', '92802', '92804', '92805', '92806', '92807', '92808'],
    neighborhoods: ['Anaheim Hills', 'Platinum Triangle', 'Downtown Anaheim', 'West Anaheim'],
    nearbyCities: ['Yorba Linda', 'Orange', 'Fullerton', 'Santa Ana'],
    driveTimeNote: 'no Disneyland-zone traffic — care delivered to your door',
    populationContext: 'Anaheim is the largest city in Orange County by population',
  },
  'huntington-beach': {
    slug: 'huntington-beach',
    name: 'Huntington Beach',
    fullName: 'Huntington Beach, CA',
    county: 'Orange County',
    state: 'CA',
    stateFull: 'California',
    zipPrefixes: ['92646', '92647', '92648', '92649'],
    neighborhoods: ['Downtown HB', 'Huntington Harbour', 'Edinger Corridor', 'Bolsa Chica'],
    nearbyCities: ['Newport Beach', 'Costa Mesa', 'Westminster', 'Fountain Valley'],
    driveTimeNote: 'no PCH commute to a clinic — telehealth, in-home labs',
    populationContext: 'Surf City fitness culture meets serious metabolic health',
  },
}

export const SERVICES: Record<ServiceSlug, ServiceData> = {
  trt: {
    slug: 'trt',
    name: 'Testosterone Replacement Therapy',
    shortName: 'TRT',
    category: 'TRT',
    internalRoute: '/trt',
    monthlyPrice: '$199/mo add-on',
    primaryKeywords: ['TRT clinic', 'testosterone replacement', 'low T treatment'],
    secondaryKeywords: ['hormone optimization', 'testosterone therapy', 'online TRT', 'telehealth TRT'],
    metaDescriptionLead: 'Physician-managed TRT for men',
    heroSubhead: 'Clinician-guided testosterone optimization without the drive to a clinic. Labs, prescriptions, and ongoing care delivered to your door.',
    patientSearchIntent: 'TRT clinic',
  },
  glp1: {
    slug: 'glp1',
    name: 'GLP-1 Medical Weight Loss',
    shortName: 'GLP-1',
    category: 'GLP-1',
    internalRoute: '/glp1',
    monthlyPrice: 'Included in Core & Signature',
    primaryKeywords: ['GLP-1 clinic', 'semaglutide', 'tirzepatide', 'Ozempic alternative'],
    secondaryKeywords: ['medical weight loss', 'weight loss injections', 'compounded GLP-1'],
    metaDescriptionLead: 'Physician-supervised GLP-1 therapy',
    heroSubhead: 'Semaglutide and tirzepatide programs supervised by licensed physicians. Comprehensive labs. Ongoing dose management.',
    patientSearchIntent: 'GLP-1 clinic',
  },
  'medical-weight-loss': {
    slug: 'medical-weight-loss',
    name: 'Medical Weight Loss',
    shortName: 'Medical Weight Loss',
    category: 'Weight Loss',
    internalRoute: '/glp1',
    monthlyPrice: 'From $299/mo',
    primaryKeywords: ['medical weight loss clinic', 'weight loss doctor', 'prescription weight loss'],
    secondaryKeywords: ['GLP-1', 'semaglutide', 'metabolic weight loss', 'obesity medicine'],
    metaDescriptionLead: 'Physician-led medical weight loss',
    heroSubhead: 'A physician-led metabolic program. Comprehensive labs, GLP-1 therapy when indicated, body composition tracking, ongoing care.',
    patientSearchIntent: 'medical weight loss clinic',
  },
  'hormone-optimization': {
    slug: 'hormone-optimization',
    name: 'Hormone Optimization',
    shortName: 'Hormone Optimization',
    category: 'Hormone',
    internalRoute: '/trt',
    monthlyPrice: 'From $299/mo',
    primaryKeywords: ['hormone optimization clinic', 'hormone replacement', 'HRT'],
    secondaryKeywords: ['TRT', 'low testosterone', 'thyroid optimization', 'cortisol management'],
    metaDescriptionLead: 'Comprehensive hormone optimization',
    heroSubhead: 'Comprehensive hormone panels, individualized protocols, ongoing physician oversight. Built around your labs, not a template.',
    patientSearchIntent: 'hormone optimization clinic',
  },
  'peptide-therapy': {
    slug: 'peptide-therapy',
    name: 'Peptide Therapy',
    shortName: 'Peptide Therapy',
    category: 'Peptide',
    internalRoute: '/peptides',
    monthlyPrice: 'From $149/mo',
    primaryKeywords: ['peptide therapy clinic', 'peptide doctor', 'BPC-157'],
    secondaryKeywords: ['CJC-1295', 'Ipamorelin', 'GHK-Cu', 'MOTS-c', 'recovery peptides'],
    metaDescriptionLead: 'Physician-supervised peptide therapy',
    heroSubhead: 'Peptide protocols for recovery, longevity, and metabolic support. Physician-supervised. Sourced from licensed compounding pharmacies.',
    patientSearchIntent: 'peptide therapy clinic',
  },
}

// City × service combinations that get dedicated landing pages.
// Keep this conservative — Google penalizes thin doorway pages.
export const LANDING_PAGES: Array<{ city: CitySlug; service: ServiceSlug }> = [
  // OC hub — every service
  { city: 'orange-county', service: 'trt' },
  { city: 'orange-county', service: 'glp1' },
  { city: 'orange-county', service: 'medical-weight-loss' },
  { city: 'orange-county', service: 'hormone-optimization' },
  { city: 'orange-county', service: 'peptide-therapy' },
  // Irvine — top 3 services
  { city: 'irvine', service: 'trt' },
  { city: 'irvine', service: 'glp1' },
  { city: 'irvine', service: 'hormone-optimization' },
  // Newport Beach — top 2
  { city: 'newport-beach', service: 'trt' },
  { city: 'newport-beach', service: 'glp1' },
  // Costa Mesa — top 2
  { city: 'costa-mesa', service: 'trt' },
  { city: 'costa-mesa', service: 'glp1' },
  // Anaheim — TRT
  { city: 'anaheim', service: 'trt' },
  // Huntington Beach — GLP-1 (fitness/weight loss angle)
  { city: 'huntington-beach', service: 'glp1' },
]

export function getCity(slug: CitySlug): CityData {
  return CITIES[slug]
}

export function getService(slug: ServiceSlug): ServiceData {
  return SERVICES[slug]
}

export function buildPageTitle(city: CityData, service: ServiceData): string {
  return `${service.patientSearchIntent} in ${city.name}, ${city.state} | Bloom Metabolics`
}

export function buildMetaDescription(city: CityData, service: ServiceData): string {
  return `${service.metaDescriptionLead} for ${city.name} residents. Telehealth visits, in-home labs, physician oversight. ${city.driveTimeNote}.`
}

export function buildCanonical(city: CityData, service: ServiceData): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'
  return `${base}/${city.slug}/${service.slug}`
}
