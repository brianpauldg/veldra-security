import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Bloom Metabolics terms of service. Terms and conditions for using our telehealth platform and services.',
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-graphite-950 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-display text-white mb-3">Terms of Service</h1>
          <p className="text-[14px] text-graphite-400">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 text-[15px] leading-relaxed text-graphite-600">
            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using Bloom Metabolics&apos;s platform, website, or services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">2. Services Description</h2>
              <p>Bloom Metabolics provides telehealth consultation and treatment services for hormone optimization, medical weight management, and peptide therapy. All services are provided by licensed medical professionals through our telehealth platform.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">3. Eligibility</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You must be at least 18 years of age to use our services.</li>
                <li>You must reside in a state where our providers are licensed to practice.</li>
                <li>Treatment eligibility is determined solely by licensed medical providers.</li>
                <li>Not all patients qualify for all treatments.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">4. Medical Disclaimers</h2>
              <p>Our platform facilitates access to licensed medical providers but does not itself provide medical advice, diagnosis, or treatment. All clinical decisions are made by licensed healthcare professionals. Results vary by individual.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">5. Payments & Refunds</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Consultation fees are charged at the time of booking.</li>
                <li>Treatment program fees are billed as agreed upon with your provider.</li>
                <li>Payments are processed securely through Stripe.</li>
                <li>Consultation fees cover the provider&apos;s evaluation time and are generally non-refundable.</li>
                <li>Refund requests are evaluated on a case-by-case basis.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">6. User Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate and complete health information.</li>
                <li>Follow treatment instructions from your provider.</li>
                <li>Report any adverse effects or concerns promptly.</li>
                <li>Maintain confidentiality of your account credentials.</li>
                <li>Do not share prescription medications with others.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">7. AI-Assisted Operations</h2>
              <p>Bloom Metabolics uses artificial intelligence to support operational workflows including scheduling, reminders, intake guidance, and patient education. AI systems do not make medical diagnoses, prescribing decisions, or clinical judgments. All medical decisions are made exclusively by licensed healthcare providers.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">8. Limitation of Liability</h2>
              <p>Bloom Metabolics provides a platform for connecting patients with licensed providers. While we strive for the highest quality of care, we are not liable for clinical outcomes, individual treatment responses, or medical decisions made by providers.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">9. Changes to Terms</h2>
              <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">10. Contact</h2>
              <p>For questions about these terms, contact us at <strong>legal@bloommetabolics.com</strong>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
