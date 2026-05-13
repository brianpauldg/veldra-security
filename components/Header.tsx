'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Meridian from './Meridian'

const navigation = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Process', href: '/how-it-works' },
  { name: 'FAQ', href: '/faq' },
]

const resourcesDropdown = [
  { name: 'The Library', href: '/learn' },
  { name: 'Blog', href: '/blog' },
  { name: 'Injection Guides', href: '/inject' },
]

const servicesDropdown = [
  { name: 'Testosterone Therapy', href: '/trt' },
  { name: 'GLP-1 Weight Loss', href: '/glp1' },
  { name: 'Sexual Health', href: '/pricing#add-ons' },
  { name: 'Longevity', href: '/pricing#add-ons' },
  { name: 'Peptide Roadmap', href: '/peptides' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-[#020202]/90 backdrop-blur-xl border-b border-[#1a1814]'
        : 'bg-transparent'
    )}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={cn(
          'flex items-center justify-between transition-all duration-300',
          scrolled ? 'h-16' : 'h-20'
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Meridian size="sm" />
            <div>
              <div className="text-[14px] font-normal tracking-tight text-[#d8cfbe]" style={{ fontFamily: 'Fraunces, serif' }}>
                Bloom Metabolics
              </div>
              <div className="font-mono text-[9px] text-[#8a8268] tracking-[0.25em] uppercase">
                Est · MMXXVI
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="px-4 py-2 text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors tracking-wide">
                Services
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2 min-w-[220px]"
                  >
                    <div className="bg-[#0d0c0a] border border-[#1a1814] rounded-lg py-2">
                      {servicesDropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2.5 text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] hover:bg-[#1a1814]/50 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors tracking-wide"
              >
                {item.name}
              </Link>
            ))}

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="px-4 py-2 text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors tracking-wide">
                Resources
              </button>
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2 min-w-[220px]"
                  >
                    <div className="bg-[#0d0c0a] border border-[#1a1814] rounded-lg py-2">
                      {resourcesDropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2.5 text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] hover:bg-[#1a1814]/50 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/book" className="bloom-btn">
              Book Consultation
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2 text-[#8a8268]"
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
            className="lg:hidden bg-[#0d0c0a] border-b border-[#1a1814] overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              <div className="eyebrow px-3 py-2">
                Services
              </div>
              {servicesDropdown.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[15px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <hr className="bloom-divider my-3" />
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[15px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <hr className="bloom-divider my-3" />
              <div className="eyebrow px-3 py-2">
                Resources
              </div>
              {resourcesDropdown.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[15px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/book"
                  onClick={() => setMobileOpen(false)}
                  className="bloom-btn w-full justify-center"
                >
                  Book Consultation
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
