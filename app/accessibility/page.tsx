import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Bloom Metabolics accessibility commitment and WCAG 2.1 AA compliance target.',
}

export default function AccessibilityPage() {
  return (
    <>
      <section className="bg-[#020202] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-display text-white mb-3">Accessibility Statement</h1>
          <p className="text-[14px] text-[#8a8268]">Last reviewed: April 29, 2026</p>
        </div>
      </section>

      <section className="bg-[#020202] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 text-[15px] leading-relaxed text-[#d8cfbe]">
            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Our Commitment</h2>
              <p>Bloom Metabolics is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to our website and services.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Compliance Target</h2>
              <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content accessible to people with a wide array of disabilities including visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Known Issues</h2>
              <p>We are aware that some areas of our website may not yet fully meet all WCAG 2.1 AA criteria. We are actively working to identify and resolve accessibility barriers.</p>
              <p className="text-[#8a8268] mt-2 text-[13px]">No specific issues documented at this time. This section will be updated as issues are identified and resolved.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Contact Us</h2>
              {/* <!-- REQUIRES BRIAN'S INPUT: confirm accessibility complaint email --> */}
              <p>If you encounter accessibility barriers on our website, please contact us:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Email: <strong className="text-white">brian@bloommetabolics.com</strong></li>
                <li>Response time: We aim to respond to accessibility feedback within 5 business days.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Third-Party Content</h2>
              <p>Our website may include content from third-party services (such as Calendly for scheduling and Stripe for payments). While we strive to ensure accessibility across all content, we cannot guarantee the accessibility of third-party applications. We encourage users to contact those services directly with accessibility concerns.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
