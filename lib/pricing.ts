// ─────────────────────────────────────────────────────────────
// Bloom Metabolics — Central Pricing Source of Truth
// ─────────────────────────────────────────────────────────────
// Every price shown on the site reads from this file.
// When real pricing is confirmed:
//   1. Set PRICING_LIVE = true
//   2. Fill in the amount fields below (CONSULTATION_AMOUNT, TRT_FROM, etc.)
//   3. That's it — all pages update automatically.
// ─────────────────────────────────────────────────────────────

export const PRICING_LIVE = true

const CONSULTATION_AMOUNT: number | null = 49
const TRT_FROM: number | null = 149
const GLP1_FROM: number | null = 249
const PEPTIDES_FROM: number | null = 100

export type Cadence = 'one-time' | 'monthly'

export interface PriceTier {
  id: 'consultation' | 'trt' | 'glp1' | 'peptides'
  name: string
  shortName: string
  cadence: Cadence
  amount: number | null
  display: string
  tagline: string
  includes: string[]
  featured?: boolean
  ctaHref: string
  ctaCopy: string
}

export interface PeptideAddOn {
  id: string
  name: string
  shortName: string
  price: number
  description: string
  benefits: string[]
}

export const PEPTIDE_ADDONS: PeptideAddOn[] = [
  {
    id: 'bpc157-tb500',
    name: 'BPC-157 / TB-500',
    shortName: 'BPC-157/TB-500',
    price: 100,
    description: 'Recovery and tissue repair peptide blend. May support gut health, joint recovery, and accelerated healing.',
    benefits: [
      'May support tissue repair and recovery',
      'May promote gut health and integrity',
      'May reduce inflammation',
      'Commonly used for joint and tendon support',
    ],
  },
  {
    id: 'mots-c',
    name: 'MOTS-c',
    shortName: 'MOTS-c',
    price: 100,
    description: 'Mitochondrial-derived peptide for metabolic optimization. May support exercise capacity, insulin sensitivity, and cellular energy.',
    benefits: [
      'May support metabolic function',
      'May improve exercise capacity',
      'May promote insulin sensitivity',
      'Research-backed mitochondrial peptide',
    ],
  },
  {
    id: 'ghk-cu',
    name: 'GHK-Cu',
    shortName: 'GHK-Cu',
    price: 100,
    description: 'Copper peptide for skin health, tissue remodeling, and anti-aging. May support collagen production and wound healing.',
    benefits: [
      'May support collagen synthesis',
      'May promote skin elasticity and repair',
      'May support hair follicle health',
      'Research-backed anti-aging peptide',
    ],
  },
]

function fmt(amount: number | null, cadence: Cadence): string {
  if (amount == null) return cadence === 'monthly' ? 'From $—/mo' : 'Pricing TBD'
  return cadence === 'monthly' ? `From $${amount}/mo` : `$${amount}`
}

export const CONSULTATION: PriceTier = {
  id: 'consultation',
  name: 'Initial Consultation',
  shortName: 'Consultation',
  cadence: 'one-time',
  amount: CONSULTATION_AMOUNT,
  display: fmt(CONSULTATION_AMOUNT, 'one-time'),
  tagline: '15 minutes with a licensed physician.',
  includes: [
    'Licensed physician evaluation',
    'Health history and eligibility review',
    'Treatment options discussion',
    'Lab orders if appropriate',
    'Refund if you don\'t qualify',
  ],
  ctaHref: '/book',
  ctaCopy: 'Book Consultation',
}

export const PROGRAMS: PriceTier[] = [
  {
    id: 'trt',
    name: 'Testosterone Therapy',
    shortName: 'TRT',
    cadence: 'monthly',
    amount: TRT_FROM,
    display: fmt(TRT_FROM, 'monthly'),
    tagline: 'Restore healthy testosterone levels.',
    includes: [
      'Physician-prescribed medication',
      'Labs every 90 days',
      'Unlimited provider messaging',
      'Free shipping from licensed pharmacy',
      'Ongoing protocol adjustment',
    ],
    ctaHref: '/trt',
    ctaCopy: 'See Details',
  },
  {
    id: 'glp1',
    name: 'GLP-1 Weight Loss',
    shortName: 'GLP-1',
    cadence: 'monthly',
    amount: GLP1_FROM,
    display: fmt(GLP1_FROM, 'monthly'),
    featured: true,
    tagline: 'Semaglutide or Tirzepatide, physician-supervised.',
    includes: [
      'Medication from licensed pharmacy',
      'Dose titration by physician',
      'Monthly provider check-ins',
      'Free shipping',
      'Nutrition guidance',
    ],
    ctaHref: '/glp1',
    ctaCopy: 'See Details',
  },
  {
    id: 'peptides',
    name: 'Peptide Therapy',
    shortName: 'Peptides',
    cadence: 'monthly',
    amount: PEPTIDES_FROM,
    display: fmt(PEPTIDES_FROM, 'monthly'),
    tagline: 'BPC-157/TB-500, MOTS-c, GHK-Cu — add any peptide to your protocol.',
    includes: [
      '$100/mo per peptide add-on',
      'BPC-157/TB-500, MOTS-c, or GHK-Cu',
      'Provider-managed protocols',
      'Combinable with TRT or GLP-1',
      'Free shipping',
    ],
    ctaHref: '/peptides',
    ctaCopy: 'See Details',
  },
]

export const NOT_INCLUDED: string[] = [
  'State-required lab work may be billed separately',
  'State-specific regulations may affect medication availability',
  'Shipping fees may apply for expedited delivery',
]

// "Book Consultation — $49" style suffix. Empty string if price is TBD.
export function ctaPriceSuffix(): string {
  return CONSULTATION.amount == null ? '' : ` — $${CONSULTATION.amount}`
}

// Button copy helpers (used everywhere a CTA button is rendered)
export function primaryCtaLabel(): string {
  return `Book Consultation${ctaPriceSuffix()}`
}

export function primaryCtaSublabel(): string {
  return CONSULTATION.amount == null
    ? 'Refundable if you don\'t qualify'
    : `$${CONSULTATION.amount} · Refundable if you don\'t qualify`
}
