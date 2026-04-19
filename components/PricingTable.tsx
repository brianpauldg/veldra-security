'use client'

import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { CONSULTATION, PROGRAMS, NOT_INCLUDED, PRICING_LIVE, PEPTIDE_ADDONS } from '@/lib/pricing'
import { cn } from '@/lib/utils'

interface PricingTableProps {
  /** Hide the consultation card when the consultation is already the surrounding CTA */
  showConsultation?: boolean
  className?: string
}

export default function PricingTable({ showConsultation = true, className }: PricingTableProps) {
  return (
    <div className={cn('w-full', className)}>
      {!PRICING_LIVE && (
        <div className="mb-6 mx-auto max-w-2xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
          <p className="text-[12px] font-medium text-amber-800">
            Final pricing is being confirmed. Book a free eligibility call — we&apos;ll share exact program pricing before you commit.
          </p>
        </div>
      )}

      <div
        className={cn(
          'grid gap-5',
          showConsultation ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'
        )}
      >
        {showConsultation && (
          <PricingCard
            tier={CONSULTATION}
            accent="dark"
          />
        )}

        {PROGRAMS.map((tier) => (
          <PricingCard key={tier.id} tier={tier} accent={tier.featured ? 'featured' : 'light'} />
        ))}
      </div>

      {/* Peptide Add-Ons */}
      {PEPTIDE_ADDONS.length > 0 && (
        <div className="mt-10">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-graphite-500 mb-4 text-center">
            Peptide Add-Ons — $100/mo each
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {PEPTIDE_ADDONS.map((addon) => (
              <div key={addon.id} className="rounded-xl border border-graphite-200 bg-white p-5">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-[15px] font-semibold text-graphite-950">{addon.shortName}</h4>
                  <span className="text-[13px] font-semibold text-graphite-950">${addon.price}/mo</span>
                </div>
                <p className="text-[12px] text-graphite-500 leading-relaxed mb-3">{addon.description}</p>
                <ul className="space-y-1.5">
                  {addon.benefits.slice(0, 2).map((b) => (
                    <li key={b} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-graphite-400 mt-0.5 flex-shrink-0" />
                      <span className="text-[11px] text-graphite-500">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {NOT_INCLUDED.length > 0 && (
        <div className="mt-10 max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-graphite-400 mb-2">
            What&apos;s not included
          </p>
          <p className="text-[13px] text-graphite-500 leading-relaxed">
            {NOT_INCLUDED.join(' · ')}
          </p>
        </div>
      )}
    </div>
  )
}

function PricingCard({
  tier,
  accent,
}: {
  tier: typeof CONSULTATION | typeof PROGRAMS[number]
  accent: 'dark' | 'light' | 'featured'
}) {
  const isDark = accent === 'dark'
  const isFeatured = accent === 'featured'

  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 lg:p-7 flex flex-col',
        isDark && 'bg-graphite-950 text-white',
        isFeatured && 'bg-white border-2 border-graphite-950 shadow-xl',
        !isDark && !isFeatured && 'bg-white border border-graphite-200'
      )}
    >
      {isFeatured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-graphite-950 text-white text-[10px] font-semibold uppercase tracking-widest rounded-full">
          Most Popular
        </span>
      )}

      <div className="mb-5">
        <div className={cn('text-[11px] font-semibold uppercase tracking-widest mb-2', isDark ? 'text-graphite-400' : 'text-graphite-500')}>
          {tier.shortName}
        </div>
        <h3 className={cn('text-[20px] font-semibold tracking-tight mb-1', isDark ? 'text-white' : 'text-graphite-950')}>
          {tier.name}
        </h3>
        <p className={cn('text-[13px] leading-snug', isDark ? 'text-graphite-400' : 'text-graphite-500')}>
          {tier.tagline}
        </p>
      </div>

      <div className="mb-5">
        <div className={cn('text-[28px] font-bold tracking-tight', isDark ? 'text-white' : 'text-graphite-950')}>
          {tier.display}
        </div>
        {tier.amount == null && (
          <div className={cn('text-[11px] mt-1', isDark ? 'text-graphite-500' : 'text-graphite-400')}>
            Pricing confirmed at consultation
          </div>
        )}
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className={cn('w-4 h-4 mt-0.5 flex-shrink-0', isDark ? 'text-graphite-300' : 'text-graphite-950')} />
            <span className={cn('text-[13px] leading-snug', isDark ? 'text-graphite-300' : 'text-graphite-600')}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={tier.ctaHref}
        className={cn(
          'flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-full text-[13px] font-semibold transition-all',
          isDark && 'bg-white text-graphite-950 hover:bg-graphite-100',
          isFeatured && 'bg-graphite-950 text-white hover:bg-graphite-800',
          !isDark && !isFeatured && 'bg-graphite-100 text-graphite-950 hover:bg-graphite-200'
        )}
      >
        {tier.ctaCopy}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}
