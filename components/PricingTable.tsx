'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight, Clock } from 'lucide-react'
import {
  CONSULTATION,
  MEMBERSHIP_TIERS,
  ADD_ONS,
  PEPTIDE_TRANCHES,
  PEPTIDE_ROADMAP_INTRO,
  PEPTIDE_DISCLAIMER,
  NOT_INCLUDED,
  ANNUAL_PREPAY_NOTE,
  PRICING_LIVE,
  type BillingCadence,
  type MembershipTier,
  type AddOn,
  type PeptideTranche,
} from '@/lib/pricing'
import { cn } from '@/lib/utils'

interface PricingTableProps {
  /** Show membership tiers (default true) */
  showTiers?: boolean
  /** Show add-on services (default true) */
  showAddOns?: boolean
  /** Show peptide roadmap (default true) */
  showPeptideRoadmap?: boolean
  /** Show consultation card (default false — consultation is explained inline) */
  showConsultation?: boolean
  className?: string
}

export default function PricingTable({
  showTiers = true,
  showAddOns = true,
  showPeptideRoadmap = true,
  showConsultation = false,
  className,
}: PricingTableProps) {
  const [cadence, setCadence] = useState<BillingCadence>('monthly')

  return (
    <div className={cn('w-full', className)}>
      {!PRICING_LIVE && (
        <div className="mb-6 mx-auto max-w-2xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
          <p className="text-[12px] font-medium text-amber-800">
            Final pricing is being confirmed. Book a consultation, we&apos;ll share exact pricing before you commit.
          </p>
        </div>
      )}

      {/* ── Billing Toggle ─────────────────────────────────── */}
      {showTiers && (
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setCadence('monthly')}
            className={cn(
              'px-5 py-2 rounded-full text-[13px] font-medium transition-all',
              cadence === 'monthly'
                ? 'bg-[#080808] text-white'
                : 'text-[#8a8268] hover:text-[#d8cfbe]'
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setCadence('annual')}
            className={cn(
              'px-5 py-2 rounded-full text-[13px] font-medium transition-all',
              cadence === 'annual'
                ? 'bg-[#080808] text-white'
                : 'text-[#8a8268] hover:text-[#d8cfbe]'
            )}
          >
            Annual
            <span className="ml-1.5 text-[11px] text-gold">Save ~17%</span>
          </button>
        </div>
      )}

      {/* ── Consultation Card (optional) ───────────────────── */}
      {showConsultation && (
        <div className="mb-8 max-w-md mx-auto">
          <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-6">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8a8268] mb-2">
              Step 1
            </div>
            <h3 className="text-[18px] font-semibold text-white mb-1">{CONSULTATION.name}</h3>
            <div className="text-[22px] font-medium text-[#d8cfbe] mb-2">{CONSULTATION.display}</div>
            <p className="text-[13px] text-gold mb-4">{CONSULTATION.creditNote}</p>
            <ul className="space-y-2 mb-5">
              {CONSULTATION.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#8a8268]" />
                  <span className="text-[13px] text-[#a89878]">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={CONSULTATION.ctaHref}
              className="flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-full bg-white text-[#080808] text-[13px] font-semibold hover:bg-[#d8cfbe] transition-all"
            >
              {CONSULTATION.ctaCopy} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* ── Membership Tiers ───────────────────────────────── */}
      {showTiers && (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier) => (
            <MembershipCard key={tier.id} tier={tier} cadence={cadence} />
          ))}
        </div>
      )}

      {/* ── Annual Prepay Note ─────────────────────────────── */}
      {showTiers && cadence === 'annual' && (
        <p className="text-center text-[11px] text-[#8a8268] mt-4">
          {ANNUAL_PREPAY_NOTE}
        </p>
      )}

      {/* ── Add-On Services ────────────────────────────────── */}
      {showAddOns && (
        <div className="mt-16">
          <div className="text-center mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8a8268] mb-2">
              Add-On Services
            </div>
            <h3 className="text-[22px] text-[#d8cfbe] mb-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}>
              Attach to any membership tier
            </h3>
            <p className="text-[14px] text-[#8a8268] max-w-lg mx-auto">
              Each add-on includes medication and supplies. Add one or combine multiple with your membership.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {ADD_ONS.map((addon) => (
              <AddOnCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>
      )}

      {/* ── Peptide Roadmap ────────────────────────────────── */}
      {showPeptideRoadmap && (
        <div className="mt-16">
          <div className="text-center mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-gold mb-2">
              Coming Soon
            </div>
            <h3 className="text-[22px] text-[#d8cfbe] mb-4" style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}>
              Peptide Therapy Roadmap
            </h3>
            <p className="text-[13px] text-[#8a8268] max-w-2xl mx-auto leading-relaxed">
              {PEPTIDE_ROADMAP_INTRO}
            </p>
          </div>

          <div className="space-y-8">
            {PEPTIDE_TRANCHES.map((tranche) => (
              <PeptideTrancheSection key={tranche.id} tranche={tranche} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/waitlist?service=peptides"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gold/10 text-gold border border-gold/30 text-[13px] font-semibold hover:bg-gold/20 transition-all"
            >
              Join Peptide Roadmap Waitlist <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* ── Not Included ───────────────────────────────────── */}
      {NOT_INCLUDED.length > 0 && (
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8a8268] mb-2">
            What&apos;s not included
          </p>
          <p className="text-[13px] text-[#8a8268] leading-relaxed">
            {NOT_INCLUDED.join(' · ')}
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Membership Card ──────────────────────────────────────────
function MembershipCard({ tier, cadence }: { tier: MembershipTier; cadence: BillingCadence }) {
  const isMonthly = cadence === 'monthly'
  const price = isMonthly ? tier.monthly : tier.annual
  const suffix = isMonthly ? '/mo' : '/yr'

  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 lg:p-7 flex flex-col',
        tier.featured
          ? 'bg-[#080808] border border-gold/25'
          : 'bg-[#080808] border border-[#1a1814]'
      )}
    >
      {/* "Most Popular" badge removed — suppresses Elite tier signal for wealth-tier avatar */}

      <div className="mb-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold mb-2">
          {tier.eyebrow}
        </div>
        <h3 className="text-[20px] tracking-tight text-[#d8cfbe] mb-1" style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}>
          {tier.name}
        </h3>
        <p className="text-[13px] leading-snug text-[#8a8268]">
          {tier.description}
        </p>
      </div>

      <div className="mb-5">
        <div className="text-[22px] font-medium tracking-tight text-[#d8cfbe]">
          ${price.toLocaleString()}
          <span className="text-[14px] font-normal ml-1 text-[#8a8268]">{suffix}</span>
        </div>
        {!isMonthly && (
          <div className="text-[12px] text-[#8a8268] mt-1">
            Equivalent to ${tier.annualEquivalent}/mo
          </div>
        )}
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
            <span className="text-[13px] leading-snug text-[#a89878]">{item}</span>
          </li>
        ))}
      </ul>

      <Link
        href={tier.ctaHref}
        className={cn(
          'flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-full text-[13px] font-semibold transition-all',
          tier.featured
            ? 'bg-white/10 text-[#d8cfbe] hover:bg-white/15 border border-gold/20'
            : 'bg-white/10 text-white hover:bg-white/15'
        )}
      >
        {tier.ctaCopy} <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}

// ─── Add-On Card ──────────────────────────────────────────────
function AddOnCard({ addon }: { addon: AddOn }) {
  return (
    <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-5 flex flex-col">
      <div className="mb-3">
        <h4 className="text-[15px] font-semibold text-white mb-1">{addon.name}</h4>
        <div className="text-[18px] font-medium text-[#d8cfbe]">
          +${addon.monthly}
          <span className="text-[13px] font-normal text-[#8a8268] ml-1">/mo</span>
        </div>
        <div className="text-[11px] text-[#8a8268] mt-0.5">Medication included</div>
      </div>

      <p className="text-[12px] text-[#8a8268] leading-relaxed mb-4 flex-1">
        {addon.description}
      </p>

      <Link
        href={addon.ctaHref}
        className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-full bg-white/5 text-white text-[12px] font-medium hover:bg-white/10 transition-all"
      >
        {addon.ctaCopy} <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  )
}

// ─── Peptide Tranche Section ──────────────────────────────────
function PeptideTrancheSection({ tranche }: { tranche: PeptideTranche }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-[15px] font-semibold text-[#d8cfbe]">
          {tranche.title}
        </h4>
        <span className="text-[10px] text-[#8a8268]">
          Target: {tranche.targetTimeline}
        </span>
        <span className="px-2.5 py-0.5 bg-gold/10 text-gold text-[9px] font-semibold uppercase tracking-widest rounded-full border border-gold/20">
          {tranche.status}
        </span>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tranche.services.map((service) => (
          <div
            key={service.name}
            className="rounded-xl bg-[#0d0c0a] border border-[#1a1814]/60 p-4"
          >
            <h5 className="text-[14px] font-semibold text-[#d8cfbe] mb-1">{service.name}</h5>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] font-medium text-[#8a8268]">
                Target: +${service.targetMonthly}/mo
              </span>
              <span className="text-[10px] text-[#8a8268]">(medication included)</span>
            </div>
            <p className="text-[11px] text-[#8a8268] leading-relaxed mb-1">
              {service.compounds}, {service.description}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <Clock className="w-3 h-3 text-gold" />
              <span className="text-[10px] text-gold">{PEPTIDE_DISCLAIMER}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
