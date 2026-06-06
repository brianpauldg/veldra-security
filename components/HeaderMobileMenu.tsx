'use client'

// Tiny client island — only the mobile menu toggle needs interactivity.
// The rest of the header (logo, desktop nav, dropdowns) is rendered as
// pure server HTML in Header.tsx and styled with CSS-only :hover.

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'

interface NavItem {
  name: string
  href: string
}

interface HeaderMobileMenuProps {
  services: NavItem[]
  resources: NavItem[]
  navigation: NavItem[]
}

export default function HeaderMobileMenu({
  services,
  resources,
  navigation,
}: HeaderMobileMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden p-2 -mr-2 text-[#8a8268] min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 bg-[#0d0c0a] border-b border-[#1a1814]"
        >
          <div className="px-6 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="eyebrow px-3 py-2">Services</div>
            {services.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-[15px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors min-h-[44px]"
              >
                {item.name}
              </Link>
            ))}
            <hr className="bloom-divider my-3" />
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-[15px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors min-h-[44px]"
              >
                {item.name}
              </Link>
            ))}
            <hr className="bloom-divider my-3" />
            <div className="eyebrow px-3 py-2">Resources</div>
            {resources.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-[15px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors min-h-[44px]"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/join"
                onClick={() => setOpen(false)}
                className="bloom-btn w-full justify-center min-h-[44px]"
              >
                Join Waitlist
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
