import Link from 'next/link'

const footerLinks = {
  treatments: [
    { name: 'TRT Therapy', href: '/trt' },
    { name: 'GLP-1 Weight Loss', href: '/glp1' },
    { name: 'Peptide Therapy', href: '/peptides' },
    { name: 'All Treatments', href: '/pricing' },
  ],
  company: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
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
        {/* Main Footer */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                <span className="text-graphite-950 font-bold text-sm">N</span>
              </div>
              <div>
                <div className="text-[15px] font-semibold tracking-tight">Nova Health</div>
                <div className="text-[10px] font-medium text-graphite-400 tracking-widest uppercase">Medical Optimization</div>
              </div>
            </div>
            <p className="text-[13px] text-graphite-400 leading-relaxed max-w-xs">
              Premium telehealth for hormone optimization, medical weight loss, and peptide therapy.
              Licensed providers. Personalized care. Modern systems.
            </p>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-graphite-400 mb-4">Treatments</h4>
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

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-graphite-400 mb-4">Company</h4>
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

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-graphite-400 mb-4">Legal</h4>
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

        {/* Bottom Bar */}
        <div className="border-t border-graphite-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-graphite-500">
            &copy; {new Date().getFullYear()} Nova Health. All rights reserved.
          </p>
          <p className="text-[11px] text-graphite-600 max-w-2xl text-center md:text-right leading-relaxed">
            Nova Health provides telehealth services subject to clinician evaluation. All treatments require approval
            by a licensed medical provider. Individual results may vary. This site does not provide medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
