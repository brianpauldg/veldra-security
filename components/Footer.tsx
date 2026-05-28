import Link from 'next/link'
import Meridian from './Meridian'

const footerLinks = {
  practice: [
    { name: 'Testosterone Therapy', href: '/trt' },
    { name: 'GLP-1 Weight Loss', href: '/glp1' },
  ],
  company: [
    { name: 'Process', href: '/how-it-works' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Medical Disclaimer', href: '/disclaimer' },
    { name: 'Provider Login', href: '/clinic/login' },
  ],
}

// Social links — replace TODO placeholders with live URLs as they become available.
// Links are hidden from the rendered footer when href === '#' (placeholder).
const socialLinks: { name: string; href: string; label: string; icon: 'instagram' | 'youtube' | 'linkedin' | 'x' | 'facebook' }[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/bloommetabolics', label: 'Visit Bloom Metabolics on Instagram', icon: 'instagram' },
  // TODO: Replace with Bloom Metabolics YouTube URL
  { name: 'YouTube', href: '#', label: 'Visit Bloom Metabolics on YouTube', icon: 'youtube' },
  // TODO: Replace with Bloom Metabolics LinkedIn URL
  { name: 'LinkedIn', href: '#', label: 'Visit Bloom Metabolics on LinkedIn', icon: 'linkedin' },
  // TODO: Replace with Bloom Metabolics X (Twitter) URL
  { name: 'X', href: '#', label: 'Visit Bloom Metabolics on X', icon: 'x' },
  // TODO: Replace with Bloom Metabolics Facebook URL
  { name: 'Facebook', href: '#', label: 'Visit Bloom Metabolics on Facebook', icon: 'facebook' },
]

function SocialIcon({ icon }: { icon: 'instagram' | 'youtube' | 'linkedin' | 'x' | 'facebook' }) {
  const props = { className: 'w-4 h-4', fill: 'currentColor', 'aria-hidden': true, focusable: false as const }
  switch (icon) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.14 0-3.51.01-4.74.07-.96.04-1.48.2-1.83.34-.46.18-.79.4-1.13.74-.34.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.23-.07 1.6-.07 4.74s.01 3.51.07 4.74c.04.96.2 1.48.34 1.83.18.46.4.79.74 1.13.34.34.67.56 1.13.74.35.14.87.3 1.83.34 1.23.06 1.6.07 4.74.07s3.51-.01 4.74-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.4 1.13-.74.34-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.23.07-1.6.07-4.74s-.01-3.51-.07-4.74c-.04-.96-.2-1.48-.34-1.83a3 3 0 0 0-.74-1.13 3 3 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34C15.51 4.01 15.14 4 12 4zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-2.4a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.58A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.12c1.9.58 9.4.58 9.4.58s7.5 0 9.4-.58a3 3 0 0 0 2.1-2.12c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
        </svg>
      )
    case 'x':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M18.244 2H21.5l-7.49 8.56L23 22h-6.91l-5.41-7.05L4.4 22H1.144l8.01-9.15L1 2h7.08l4.89 6.46L18.244 2zm-1.21 18h1.91L7.06 4H5.04L17.034 20z" />
        </svg>
      )
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
        </svg>
      )
  }
}

export default function Footer() {
  return (
    <footer className="bg-[#020202] border-t border-[#1a1814]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Meridian size="sm" />
              <div>
                <div className="text-[14px] font-normal text-[#d8cfbe]" style={{ fontFamily: 'Fraunces, serif' }}>
                  Bloom Metabolics
                </div>
                <div className="font-mono text-[9px] text-[#8a8268] tracking-[0.25em] uppercase">
                  Est · MMXXVI
                </div>
              </div>
            </div>
            <p className="text-[13px] text-[#8a8268] leading-relaxed max-w-xs font-light mb-2">
              Physician-prescribed TRT and GLP-1 therapy. Comprehensive labs. Transparent practice.
            </p>
            <p className="text-[11px] text-[#2a2620] font-light mb-4">
              Founded by Brian DeGuzman, RN
            </p>
            <a href="mailto:brian@bloommetabolics.com" className="text-[13px] text-[#d8cfbe] hover:text-white transition-colors">
              brian@bloommetabolics.com
            </a>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Practice</h4>
            <ul className="space-y-3">
              {footerLinks.practice.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] font-light text-[#8a8268] hover:text-[#d8cfbe] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav
          aria-label="Social media"
          className="border-t border-[#1a1814] py-6 flex flex-wrap items-center justify-center md:justify-start gap-2"
        >
          <span className="font-mono text-[10px] text-[#8a8268] tracking-[0.2em] uppercase mr-3">
            Follow
          </span>
          <ul className="flex flex-wrap items-center gap-1">
            {socialLinks.map((s) => {
              const isPlaceholder = s.href === '#'
              return (
                <li key={s.name}>
                  <a
                    href={isPlaceholder ? undefined : s.href}
                    aria-label={s.label}
                    aria-disabled={isPlaceholder || undefined}
                    target={isPlaceholder ? undefined : '_blank'}
                    rel={isPlaceholder ? undefined : 'noopener noreferrer'}
                    title={isPlaceholder ? `${s.name} (coming soon)` : s.name}
                    className={
                      'inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#1a1814] text-[#8a8268] transition-colors ' +
                      (isPlaceholder
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:text-[#d8cfbe] hover:border-[#2a2620]')
                    }
                    onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
                  >
                    <SocialIcon icon={s.icon} />
                    <span className="sr-only">{s.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-[#1a1814] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[#2a2620] tracking-[0.2em] uppercase">
            &copy; MMXXVI Bloom Metabolics. All rights reserved.
          </p>
          <p className="text-[11px] text-[#2a2620] max-w-2xl text-center md:text-right leading-relaxed font-light">
            Bloom Metabolics is a California-based telehealth membership practice launching early-to-mid June 2026. All prescriptions, upon launch, require evaluation by a U.S.-licensed physician. Medication availability varies by state. Individual results vary.
          </p>
        </div>
      </div>
    </footer>
  )
}
