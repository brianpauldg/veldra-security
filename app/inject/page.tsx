import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Injection Guides — Bloom Metabolics',
  description:
    'Patient injection education guides for Testosterone (TRT), GLP-1 weight loss (semaglutide, tirzepatide), and HCG therapy. Step-by-step self-injection instructions from Bloom Metabolics.',
  robots: { index: true, follow: true },
};

const protocols = [
  {
    slug: 'trt-im',
    name: 'Testosterone Cypionate',
    route: 'Intramuscular (IM)',
    description:
      'Weekly intramuscular injection guide for testosterone replacement therapy. Covers ventrogluteal, vastus lateralis, and deltoid sites.',
    tag: 'TRT',
    active: true,
  },
  {
    slug: 'glp1-subq',
    name: 'Semaglutide / Tirzepatide',
    route: 'Subcutaneous (SubQ)',
    description:
      'Subcutaneous injection guide for GLP-1/GIP weight management therapy. Covers abdominal, thigh, and upper arm sites.',
    tag: 'GLP-1',
    active: true,
  },
  {
    slug: 'hcg-subq',
    name: 'HCG',
    route: 'Subcutaneous (SubQ)',
    description:
      'Subcutaneous injection guide for HCG therapy. Includes reconstitution instructions, abdominal and thigh injection sites.',
    tag: 'HCG',
    active: true,
  },
  {
    slug: 'bpc157-subq',
    name: 'BPC-157',
    route: 'Subcutaneous (SubQ)',
    description:
      'Subcutaneous injection guide for BPC-157 peptide therapy. Includes reconstitution, abdominal and thigh injection sites.',
    tag: 'Peptide',
    active: false,
  },
  {
    slug: 'tb500-subq',
    name: 'TB-500 (Thymosin Beta-4)',
    route: 'Subcutaneous (SubQ)',
    description:
      'Subcutaneous injection guide for TB-500 peptide therapy. Includes reconstitution, abdominal and thigh injection sites.',
    tag: 'Peptide',
    active: false,
  },
];

export default function InjectIndexPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-graphite-950 pt-12 pb-16 px-6 md:px-12 border-b border-steel">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-champagne">
              <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1" />
              <circle cx="14" cy="14" r="4" fill="currentColor" />
            </svg>
            <span className="text-champagne text-sm font-light tracking-wide">Bloom Metabolics</span>
          </div>

          <p className="eyebrow mb-4">Patient Education</p>
          <h1 className="text-display-sm md:text-display text-champagne mb-4">
            Self-Injection Guides
          </h1>
          <p className="text-brass/70 max-w-2xl">
            Step-by-step injection instructions for your prescribed medication.
            Select your protocol below to view site-specific technique, rotation
            schedules, and troubleshooting.
          </p>
        </div>
      </section>

      {/* Injection Sites Overview Image */}
      <section className="bg-ink py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow mb-3">Reference</p>
          <h2 className="text-headline text-champagne mb-6">Common Injection Sites</h2>
          <div className="rounded-lg border border-steel/30 bg-white p-4 md:p-8 max-w-2xl mx-auto">
            <img
              src="/inject/diagrams/injection-sites.png"
              alt="Self-injection guide showing common subcutaneous and intramuscular injection sites on front and back body views. SubQ sites: deltoid, abdomen, thigh. IM sites: upper arm, upper outer buttock, ventrogluteal, vastus lateralis."
              className="w-full h-auto"
              width={800}
              height={1000}
            />
          </div>
          <p className="text-xs text-brass/40 mt-4 text-center">
            For educational use only — always follow instructions provided by your healthcare professional.
          </p>
        </div>
      </section>

      {/* Protocol Cards */}
      <section className="bg-graphite-950 py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow mb-3">Select Your Protocol</p>
          <h2 className="text-headline text-champagne mb-8">Injection Guides by Medication</h2>

          <div className="grid gap-4">
            {protocols.map((protocol) =>
              protocol.active ? (
                <Link
                  key={protocol.slug}
                  href={`/inject/${protocol.slug}`}
                  className="group block border border-steel/30 rounded-lg p-6 bg-ink hover:border-brass/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-mono text-brass uppercase tracking-wider bg-brass/10 px-2 py-0.5 rounded">
                        {protocol.tag}
                      </span>
                      <h3 className="text-lg text-champagne font-display mt-2">
                        {protocol.name}
                      </h3>
                      <p className="text-xs text-brass font-mono">{protocol.route}</p>
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      className="text-brass/40 group-hover:text-brass group-hover:translate-x-1 transition-all mt-2"
                    >
                      <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-brass/60">{protocol.description}</p>
                </Link>
              ) : (
                <div
                  key={protocol.slug}
                  className="block border border-brass/20 rounded-lg p-6 bg-[#1a1814]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-mono text-champagne uppercase tracking-wider bg-brass/20 px-2 py-0.5 rounded">
                        {protocol.tag} — Coming Soon
                      </span>
                      <h3 className="text-lg text-champagne font-display mt-2">
                        {protocol.name}
                      </h3>
                      <p className="text-xs text-brass font-mono">{protocol.route}</p>
                    </div>
                  </div>
                  <p className="text-sm text-champagne/60">{protocol.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-graphite-950 py-8 px-6 md:px-12 border-t border-steel/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-brass/40 leading-relaxed">
            These guides are provided for active Bloom Metabolics patients receiving
            care under medical supervision. This content is educational and does not
            replace direct clinical guidance. Contact your Bloom Metabolics care team
            before injecting if you have any questions.
          </p>
        </div>
      </section>
    </main>
  );
}
