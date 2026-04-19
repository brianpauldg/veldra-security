'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { primaryCtaLabel } from '@/lib/pricing'

const navigation = [
  { name: 'Treatments', href: '/trt' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'FAQ', href: '/faq' },
]

const treatmentDropdown = [
  { name: 'Testosterone Therapy', href: '/trt' },
  { name: 'GLP-1 Weight Loss', href: '/glp1' },
  { name: 'Peptide Therapy', href: '/peptides' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [treatmentsOpen, setTreatmentsOpen] = useState(false)
  const ctaLabel = primaryCtaLabel()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-graphite-200">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-graphite-950 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-graphite-800 to-graphite-950" />
              <span className="relative text-white font-bold text-[13px] tracking-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>B</span>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
            <div>
              <div className="text-[15px] font-semibold tracking-tight text-graphite-950">Bloom Metabolics</div>
              <div className="text-[10px] font-medium text-graphite-500 tracking-widest uppercase">Telehealth · Rx</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Treatments dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTreatmentsOpen(true)}
              onMouseLeave={() => setTreatmentsOpen(false)}
            >
              <button
                className="px-3.5 py-2 text-[13px] font-medium text-graphite-600 hover:text-graphite-950 transition-colors rounded-lg hover:bg-graphite-50"
              >
                Treatments
              </button>
              <AnimatePresence>
                {treatmentsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2 min-w-[220px]"
                  >
                    <div className="bg-white border border-graphite-200 rounded-xl shadow-lg py-2">
                      {treatmentDropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2.5 text-[13px] font-medium text-graphite-700 hover:text-graphite-950 hover:bg-graphite-50 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navigation.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3.5 py-2 text-[13px] font-medium text-graphite-600 hover:text-graphite-950 transition-colors rounded-lg hover:bg-graphite-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/book"
              className={cn(
                'inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full',
                'bg-graphite-950 text-white text-[13px] font-semibold',
                'hover:bg-graphite-800 transition-all duration-200',
                'shadow-sm hover:shadow-md'
              )}
            >
              {ctaLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2 text-graphite-700"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-graphite-200 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-graphite-400">
                Treatments
              </div>
              {treatmentDropdown.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[15px] font-medium text-graphite-700 hover:text-graphite-950 hover:bg-graphite-50 rounded-lg"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-graphite-100 mt-3" />
              {navigation.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[15px] font-medium text-graphite-700 hover:text-graphite-950 hover:bg-graphite-50 rounded-lg"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/book"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block text-center px-5 py-3 rounded-full',
                    'bg-graphite-950 text-white text-[15px] font-semibold'
                  )}
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
