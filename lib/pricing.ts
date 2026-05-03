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
const TRT_FROM: number | null = 299
const GLP1_FROM: number | null = 249
const PEPTIDE_FROM: number | null = 150
export type Cadence = 'one-time' | 'monthly'
export type ServiceStatus = 'active' | 'coming_soon'

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
  status?: ServiceStatus
  addOnNote?: string
  ctaHref: string
  ctaCopy: string
}

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
    status: 'active',
    tagline: 'Restore healthy testosterone levels. Starts with $49 consultation.',
    includes: [
      'Testosterone + HCG + Anastrozole as needed',
      'Comprehensive labs included every 90 days',
      'Estrogen management included',
      'Unlimited provider messaging',
      'Free shipping from licensed compounding pharmacy', // FDA April 1 2026 essentially-a-copy rule
      'Ongoing protocol adjustment',
    ],
    ctaHref: '/book?service=trt',
    ctaCopy: 'Start TRT',
  },
  {
    id: 'glp1',
    name: 'GLP-1 Weight Management',
    shortName: 'GLP-1',
    cadence: 'monthly',
    amount: GLP1_FROM,
    display: fmt(GLP1_FROM, 'monthly'),
    featured: true,
    status: 'active',
    // FDA April 1 2026 essentially-a-copy rule — compounded designation required
    tagline: 'Compounded semaglutide or tirzepatide. Not FDA-approved. Physician-supervised. Starts with $49 consultation.',
    includes: [
      'Compounded medication from licensed compounding pharmacy',
      'Dose titration by physician',
      'Monthly provider check-ins',
      'Free shipping',
      'Nutrition guidance',
    ],
    ctaHref: '/book?service=glp1',
    ctaCopy: 'Start GLP-1',
  },
  {
    id: 'peptides',
    name: 'Peptide Therapy',
    shortName: 'Peptides',
    cadence: 'monthly',
    amount: PEPTIDE_FROM,
    display: fmt(PEPTIDE_FROM, 'monthly'),
    status: 'coming_soon',
    tagline: 'Peptide therapy options coming soon. Join the waitlist to be notified when available.',
    addOnNote: 'Available as standalone or add-on to TRT/GLP-1',
    includes: [
      'Physician-selected peptide protocols',
      'Compounded from licensed pharmacy',
      'Monthly provider check-ins',
      'Free shipping',
      'Protocol adjustment as needed',
    ],
    ctaHref: '/waitlist?service=peptides',
    ctaCopy: 'Join Waitlist',
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
