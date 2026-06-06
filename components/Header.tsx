// Server component. The only interactive piece is HeaderMobileMenu (client island).
// Desktop dropdowns use CSS-only :hover via Tailwind group-hover utilities — no JS.
// This removes framer-motion + AnimatePresence + useState + useEffect from the
// site-wide bundle on every page load.

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Meridian from './Meridian'
import HeaderMobileMenu from './HeaderMobileMenu'

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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020202]/90 backdrop-blur-xl border-b border-[#1a1814]">
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="Bloom Metabolics home">
            <Meridian size="sm" />
            <div>
              <div
                className="text-[14px] font-normal tracking-tight text-[#d8cfbe]"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                Bloom Metabolics
              </div>
              <div className="font-mono text-[9px] text-[#8a8268] tracking-[0.25em] uppercase">
                Est · MMXXVI
              </div>
            </div>
          </Link>

          {/* Desktop nav — CSS-only dropdowns via group-hover */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Services */}
            <div className="relative group">
              <button
                type="button"
                className="px-4 py-2 text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors tracking-wide"
                aria-haspopup="true"
              >
                Services
              </button>
              <div className="absolute top-full left-0 pt-2 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
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
              </div>
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

            {/* Resources */}
            <div className="relative group">
              <button
                type="button"
                className="px-4 py-2 text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors tracking-wide"
                aria-haspopup="true"
              >
                Resources
              </button>
              <div className="absolute top-full left-0 pt-2 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
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
              </div>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/join" className="bloom-btn min-h-[44px]">
              Join Waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu — small client island */}
          <HeaderMobileMenu
            services={servicesDropdown}
            resources={resourcesDropdown}
            navigation={navigation}
          />
        </div>
      </nav>
    </header>
  )
}
