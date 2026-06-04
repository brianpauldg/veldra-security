// ─────────────────────────────────────────────────────────────
// Bloom Metabolics — Central Pricing Source of Truth
// ─────────────────────────────────────────────────────────────
// Every price shown on the site reads from this file.
// Three-tier membership model + service-line add-ons + peptide roadmap.
// ─────────────────────────────────────────────────────────────

export const PRICING_LIVE = true

// ─── Consultation ───────────────────────────────────────────
export const CONSULTATION_AMOUNT = 49

export interface ConsultationTier {
  id: 'consultation'
  name: string
  shortName: string
  amount: number
  display: string
  tagline: string
  creditNote: string
  includes: string[]
  ctaHref: string
  ctaCopy: string
}

export const CONSULTATION: ConsultationTier = {
  id: 'consultation',
  name: 'Optimization Consultation',
  shortName: 'Consultation',
  amount: CONSULTATION_AMOUNT,
  display: `$${CONSULTATION_AMOUNT}`,
  tagline: '15 minutes with a licensed physician.',
  creditNote: `$${CONSULTATION_AMOUNT} credited toward your first month of membership.`,
  includes: [
    'Licensed physician evaluation',
    'Health history and eligibility review',
    'Treatment options discussion',
    'Lab orders if appropriate',
    'Refund if you don\'t qualify',
    'Credited toward Month 1 if you continue',
  ],
  ctaHref: '/join',
  ctaCopy: 'Join Waitlist',
}

// ─── Membership Tiers ───────────────────────────────────────
export type BillingCadence = 'monthly' | 'annual'

export interface MembershipTier {
  id: 'essentials' | 'core' | 'signature'
  name: string
  eyebrow: string
  monthly: number
  annual: number
  annualSavings: number
  annualEquivalent: number
  description: string
  includes: string[]
  featured?: boolean
  ctaHref: string
  ctaCopy: string
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'essentials',
    name: 'Bloom Essentials',
    eyebrow: 'ENTRY',
    monthly: 149,
    annual: 1490,
    annualSavings: 298,
    annualEquivalent: 124,
    description: 'For patients beginning their clinical program. Care team access, refill coordination, async messaging, basic lab review.',
    includes: [
      'Async secure messaging with care team',
      'Refill coordination on prescribed protocols',
      'Quarterly basic lab review (patient-paid labs)',
      'Care team navigation',
      'Educational content library',
      '24–48 hour message response',
    ],
    ctaHref: '/join',
    ctaCopy: 'Join Waitlist',
  },
  {
    id: 'core',
    name: 'Bloom Core',
    eyebrow: 'FLAGSHIP',
    monthly: 299,
    annual: 2990,
    annualSavings: 598,
    annualEquivalent: 249,
    description: 'For committed optimization patients. Everything in Essentials plus clinician visits, comprehensive labs, and priority response.',
    includes: [
      'Everything in Essentials',
      'Two clinician visits per quarter',
      'Comprehensive lab review with protocol adjustments',
      'Symptom and progress tracking dashboard',
      'Quarterly biomarker check-in',
      '24-hour priority message response',
    ],
    featured: true,
    ctaHref: '/join',
    ctaCopy: 'Join Waitlist',
  },
  {
    id: 'signature',
    name: 'Bloom Signature',
    eyebrow: 'CONCIERGE',
    monthly: 599,
    annual: 5990,
    annualSavings: 1198,
    annualEquivalent: 499,
    description: 'For executive-level patients. Direct provider access, comprehensive labs included, in-home phlebotomy, and dedicated care coordination.',
    includes: [
      'Everything in Core',
      'Direct provider messaging access',
      'Quarterly comprehensive lab panel included (Bloom-paid)',
      'In-home phlebotomy (California at launch; other states expanding)',
      'Annual 50+ biomarker comprehensive review',
      'Dedicated care coordinator',
      '12-hour priority message response',
    ],
    ctaHref: '/join',
    ctaCopy: 'Join Waitlist',
  },
]

// ─── Service-Line Add-Ons ───────────────────────────────────
export type AddOnStatus = 'active' | 'coming_soon'

export interface AddOn {
  id: 'trt' | 'glp1' | 'sexual-health' | 'longevity'
  name: string
  shortName: string
  monthly: number
  description: string
  includes: string[]
  status: AddOnStatus
  ctaHref: string
  ctaCopy: string
}

export const ADD_ONS: AddOn[] = [
  {
    id: 'trt',
    name: 'TRT Optimization',
    shortName: 'TRT',
    monthly: 199,
    description: 'Compounded testosterone cypionate, HCG, and anastrozole as a bundled protocol via licensed 503A pharmacy partner. Injection supplies, quarterly hormone panel interpretation, dose titration support based on lab response.',
    includes: [
      'Compounded testosterone cypionate, HCG, and anastrozole bundled',
      'Licensed 503A pharmacy partner',
      'Injection supplies included',
      'Quarterly hormone panel interpretation',
      'Dose titration support based on lab response',
      'Medication included in price',
    ],
    status: 'active',
    ctaHref: '/join',
    ctaCopy: 'Join Waitlist',
  },
  {
    id: 'glp1',
    name: 'GLP-1 Metabolic Program',
    shortName: 'GLP-1',
    monthly: 299,
    // FDA April 1 2026 essentially-a-copy rule — compounded designation required
    description: 'Compounded semaglutide or tirzepatide (where legally permissible), injection supplies, monthly weight and metabolic check-in, side effect management.',
    includes: [
      'Compounded semaglutide or tirzepatide',
      'Injection supplies included',
      'Monthly weight and metabolic check-in',
      'Side effect management',
      'Medication included in price',
    ],
    status: 'active',
    ctaHref: '/join',
    ctaCopy: 'Join Waitlist',
  },
  {
    id: 'sexual-health',
    name: 'Sexual Health Optimization',
    shortName: 'Sexual Health',
    monthly: 129,
    description: 'PT-141, tadalafil, or sildenafil (clinically appropriate). Discreet shipping, quarterly follow-up.',
    includes: [
      'Clinician-selected medication (PT-141, tadalafil, or sildenafil)',
      'Discreet shipping',
      'Quarterly follow-up',
      'Medications included in price',
    ],
    status: 'active',
    ctaHref: '/join',
    ctaCopy: 'Join Waitlist',
  },
  {
    id: 'longevity',
    name: 'Longevity Stack',
    shortName: 'Longevity',
    monthly: 249,
    description: 'Subcutaneous NAD+ and Glutathione protocols (standard grade). Injection supplies and dosing guidance included. Quarterly aging biomarker review. Advanced IV-grade protocols available on a custom basis.',
    includes: [
      'Subcutaneous NAD+ and Glutathione protocols (standard grade)',
      'Injection supplies and dosing guidance included',
      'Quarterly aging biomarker review',
      'Advanced IV-grade protocols available on a custom basis',
      'Medications included in price',
    ],
    status: 'active',
    ctaHref: '/join',
    ctaCopy: 'Join Waitlist',
  },
]

// ─── Peptide Roadmap ────────────────────────────────────────
export type PeptideTrancheStatus = 'PENDING FDA 503A PATHWAY' | 'INDEPENDENT REGULATORY PATH'

export interface PeptideService {
  name: string
  targetMonthly: number
  compounds: string
  description: string
}

export interface PeptideTranche {
  id: string
  title: string
  targetTimeline: string
  status: PeptideTrancheStatus
  services: PeptideService[]
}

export const PEPTIDE_ROADMAP_INTRO =
  'Our peptide service line is sequenced to FDA 503A pathway events. The FDA\'s April 2026 actions initiated a multi-tranche regulatory pathway for compounded peptide therapies. Bloom is operationally prepared to launch each tranche as regulatory clarity emerges. The protocols below represent our planned service lines; specific availability is contingent on FDA Category 1 designation, enforcement discretion announcement, or formal rulemaking inclusion. Patients can join the Bloom Peptide Roadmap waitlist to be notified at launch.'

export const PEPTIDE_DISCLAIMER =
  'Availability pending FDA 503A pathway clarity. Join the Peptide Roadmap waitlist for launch notification.'

export const PEPTIDE_TRANCHES: PeptideTranche[] = [
  {
    id: 'tranche-1',
    title: 'Tranche 1',
    targetTimeline: 'Q3–Q4 2026',
    status: 'PENDING FDA 503A PATHWAY',
    services: [
      {
        name: 'Recovery & Repair Stack',
        targetMonthly: 299,
        compounds: 'BPC-157 + TB-500',
        description: 'Injury recovery and soft-tissue support.',
      },
      {
        name: 'Cellular Energy Stack',
        targetMonthly: 249,
        compounds: 'MOTs-C',
        description: 'Mitochondrial function and metabolic support.',
      },
      {
        name: 'Gut & Anti-Inflammatory Stack',
        targetMonthly: 199,
        compounds: 'KPV',
        description: 'GI inflammation and mucosal repair.',
      },
    ],
  },
  {
    id: 'tranche-2',
    title: 'Tranche 2',
    targetTimeline: 'Q2–Q3 2027',
    status: 'PENDING FDA 503A PATHWAY',
    services: [
      {
        name: 'Skin & Tissue Regeneration',
        targetMonthly: 199,
        compounds: 'GHK-Cu',
        description: 'Skin quality, wound healing, and tissue regeneration support.',
      },
      {
        name: 'Cognitive Performance',
        targetMonthly: 349,
        compounds: 'Semax / Epitalon',
        description: 'Cognitive function and neuroprotective support.',
      },
      {
        name: 'Sleep Optimization',
        targetMonthly: 249,
        compounds: 'DSIP (Emideltide)',
        description: 'Sleep architecture and circadian rhythm support.',
      },
    ],
  },
  {
    id: 'tranche-3',
    title: 'Tranche 3',
    targetTimeline: 'TBD',
    status: 'INDEPENDENT REGULATORY PATH',
    services: [
      {
        name: 'Growth Hormone Optimization',
        targetMonthly: 399,
        compounds: 'Sermorelin, CJC-1295, Ipamorelin',
        description: 'Growth hormone secretagogue protocols.',
      },
      {
        name: 'Immune Support',
        targetMonthly: 299,
        compounds: 'Thymosin Alpha-1',
        description: 'Immune modulation and resilience support.',
      },
    ],
  },
]

// ─── Not Included / Disclaimers ─────────────────────────────
export const NOT_INCLUDED: string[] = [
  'State-required lab work may be billed separately (except Signature tier)',
  'State-specific regulations may affect medication availability',
  'Shipping fees may apply for expedited delivery',
]

export const ANNUAL_PREPAY_NOTE =
  'Annual prepay billed in advance. See Terms of Service for cancellation and refund policy.'

// ─── CTA Helpers ────────────────────────────────────────────

export function primaryCtaLabel(): string {
  return 'Join Waitlist'
}

export function primaryCtaSublabel(): string {
  return 'Enrollment opens July 15, 2026'
}

/** Format tier price for display */
export function formatMonthly(amount: number): string {
  return `$${amount}/mo`
}

export function formatAnnual(amount: number): string {
  return `$${amount.toLocaleString()}/yr`
}
