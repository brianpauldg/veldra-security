'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'TRT', href: '/trt' },
  { name: 'GLP-1', href: '/glp1' },
  { name: 'Peptides', href: '/peptides' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-graphite-100">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-graphite-950 flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tight">N</span>
            </div>
            <div>
              <div className="text-[15px] font-semibold tracking-tight text-graphite-950">Nova Health</div>
              <div className="text-[10px] font-medium text-graphite-400 tracking-widest uppercase">Medical Optimization</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3.5 py-2 text-[13px] font-medium text-graphite-600 hover:text-graphite-950 transition-colors rounded-lg hover:bg-graphite-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/clinic"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-graphite-600 hover:text-graphite-950 transition-colors rounded-lg hover:bg-graphite-50"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-medium text-graphite-600 hover:text-graphite-950 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/pricing"
              className={cn(
                'inline-flex items-center justify-center px-5 py-2.5 rounded-full',
                'bg-graphite-950 text-white text-[13px] font-medium',
                'hover:bg-graphite-800 transition-all duration-200',
                'shadow-sm hover:shadow-md'
              )}
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2 text-graphite-600"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-graphite-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[15px] font-medium text-graphite-700 hover:text-graphite-950 hover:bg-graphite-50 rounded-lg"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/clinic"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-[15px] font-medium text-graphite-700 hover:text-graphite-950 hover:bg-graphite-50 rounded-lg"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[15px] font-medium text-graphite-600"
                >
                  Contact
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block text-center px-5 py-3 rounded-full',
                    'bg-graphite-950 text-white text-[15px] font-medium'
                  )}
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
