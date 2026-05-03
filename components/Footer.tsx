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
            <p className="text-[13px] text-[#8a8268] leading-relaxed max-w-xs font-light mb-4">
              Physician-prescribed TRT and GLP-1 therapy. Comprehensive labs. Transparent practice.
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

        <div className="border-t border-[#1a1814] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[#2a2620] tracking-[0.2em] uppercase">
            &copy; MMXXVI Bloom Metabolics. All rights reserved.
          </p>
          <p className="text-[11px] text-[#2a2620] max-w-2xl text-center md:text-right leading-relaxed font-light">
            Bloom Metabolics provides telehealth services. All prescriptions require evaluation by a U.S.-licensed physician. Medication availability varies by state. Individual results vary.
          </p>
        </div>
      </div>
    </footer>
  )
}
