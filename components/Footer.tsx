import Link from 'next/link'

const footerLinks = {
  treatments: [
    { name: 'Testosterone Therapy', href: '/trt' },
    { name: 'GLP-1 Weight Loss', href: '/glp1' },
    { name: 'Peptide Therapy', href: '/peptides' },
  ],
  company: [
    { name: 'Pricing', href: '/pricing' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Medical Disclaimer', href: '/disclaimer' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-graphite-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-graphite-100" />
                <span className="relative text-graphite-950 font-bold text-[13px] tracking-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>B</span>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-graphite-300 to-transparent" />
              </div>
              <div>
                <div className="text-[15px] font-semibold tracking-tight">Bloom Metabolics</div>
                <div className="text-[10px] font-medium text-graphite-400 tracking-widest uppercase">Telehealth · Rx</div>
              </div>
            </div>
            <p className="text-[13px] text-graphite-400 leading-relaxed max-w-xs">
              Physician-prescribed TRT, GLP-1, and peptide therapy. Real labs. Real prescriptions. Transparent pricing.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-graphite-500 mb-4">Treatments</h4>
            <ul className="space-y-2.5">
              {footerLinks.treatments.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] text-graphite-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-graphite-500 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] text-graphite-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-graphite-500 mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] text-graphite-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-graphite-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-graphite-500">
            &copy; {new Date().getFullYear()} Bloom Metabolics. All rights reserved.
          </p>
          <p className="text-[11px] text-graphite-500 max-w-2xl text-center md:text-right leading-relaxed">
            Bloom Metabolics provides telehealth services. All prescriptions require evaluation by a U.S.-licensed physician. Medication availability varies by state. Individual results vary. This site does not provide medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
