import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Nova Health privacy policy. How we collect, use, and protect your personal and health information.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-graphite-950 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-display text-white mb-3">Privacy Policy</h1>
          <p className="text-[14px] text-graphite-400">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="prose prose-graphite max-w-none space-y-8 text-[15px] leading-relaxed text-graphite-600">
            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">1. Information We Collect</h2>
              <p>Nova Health collects information necessary to provide telehealth services, including:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong>Personal Information:</strong> Name, email, phone number, date of birth, address, and state of residence.</li>
                <li><strong>Health Information:</strong> Medical history, symptoms, lab results, treatment data, and health goals.</li>
                <li><strong>Payment Information:</strong> Payment details processed securely through Stripe. We do not store credit card numbers.</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, and interaction patterns to improve our services.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide medical consultations and treatment services</li>
                <li>To communicate about your care, appointments, and follow-ups</li>
                <li>To process payments and manage your account</li>
                <li>To send relevant health education and treatment information</li>
                <li>To improve our platform and patient experience</li>
                <li>To comply with legal and regulatory requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">3. How We Protect Your Information</h2>
              <p>We implement industry-standard security measures including:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>HIPAA-compliant data handling and storage</li>
                <li>Encrypted data transmission (TLS/SSL)</li>
                <li>Secure cloud infrastructure with access controls</li>
                <li>Regular security audits and monitoring</li>
                <li>Staff training on privacy and data protection</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">4. Information Sharing</h2>
              <p>We do not sell your personal or health information. We may share information with:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Your healthcare providers and care team</li>
                <li>Laboratory partners (for lab orders)</li>
                <li>Payment processors (Stripe) for transaction processing</li>
                <li>As required by law, regulation, or legal process</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Access your personal and health information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your health records</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">6. Cookies and Analytics</h2>
              <p>We use essential cookies to operate our platform and analytics tools to improve the patient experience. You can manage cookie preferences through your browser settings.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">7. Contact Us</h2>
              <p>For privacy-related questions or requests, contact us at <strong>privacy@novahealth.com</strong>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
