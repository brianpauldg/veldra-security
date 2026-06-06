import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Bloom Metabolics terms of service. Terms and conditions for using our telehealth platform and services.',
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-[#020202] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-display text-white mb-3">Terms of Service</h1>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-6 py-4 mb-6 max-w-2xl mx-auto">
            <p className="text-[12px] text-amber-300 font-medium uppercase tracking-wider mb-2">Draft for Attorney Review, Not Yet Legally Operative</p>
            <p className="text-[11px] text-[#8a8268] leading-relaxed font-light">
              Bloom Metabolics is in pre-launch state. These documents are being finalized by counsel and will be operative when enrollment opens. No medical services are currently being provided and no protected health information is being collected during pre-launch. Waitlist signups collect only email and optional preference data, not health information.
            </p>
          </div>
          <p className="text-[14px] text-[#8a8268]">Last updated: May 3, 2026</p>
        </div>
      </section>

      <section className="bg-[#020202] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 text-[15px] leading-relaxed text-[#d8cfbe]">
            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>1. Acceptance of Terms</h2>
              <p>By accessing or using Bloom Metabolics&apos;s platform, website, or services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>2. Services Description</h2>
              <p>Bloom Metabolics provides telehealth consultation and treatment services for hormone optimization and medical weight management. All services are provided by licensed medical professionals through our telehealth platform.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>3. Eligibility</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You must be at least 18 years of age to use our services.</li>
                <li>You must reside in a state where our providers are licensed to practice.</li>
                <li>Treatment eligibility is determined solely by licensed medical providers.</li>
                <li>Not all patients qualify for all treatments.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>3a. Geographic Availability</h2>
              <p>Bloom Metabolics currently provides services to patients residing in California. Services will expand to additional states as physician licensure allows. The current list of available states is maintained on our website and updated as coverage expands. Patients in unavailable states will be notified and may join a waitlist for future availability.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>4. Medical Disclaimers</h2>
              <p>Our platform facilitates access to licensed medical providers but does not itself provide medical advice, diagnosis, or treatment. All clinical decisions are made by licensed healthcare professionals. Results vary by individual.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>5. Payments &amp; Refunds</h2>
              <p>The $49 consultation fee is charged at the time of booking and is refundable in full if the treating physician determines you do not qualify for any available treatment. If you qualify, the $49 consultation fee is applied as a credit toward your first month of treatment, provided you begin treatment within 7 days of approved eligibility. After 7 days, a new consultation and $49 fee are required for re-evaluation. Treatment program fees are billed monthly as a recurring charge, confirmed verbally with the patient by our care team before the first payment is processed. Payments are processed securely through Corepay. We do not store payment card information on our servers.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>6. User Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate and complete health information.</li>
                <li>Follow treatment instructions from your provider.</li>
                <li>Report any adverse effects or concerns promptly.</li>
                <li>Maintain confidentiality of your account credentials.</li>
                <li>Do not share prescription medications with others.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>7. Technology &amp; Operations</h2>
              <p>Bloom Metabolics uses technology tools to support operational workflows including scheduling, appointment reminders, intake guidance, and patient education communications. All medical decisions, treatment recommendations, and prescriptions are made exclusively by licensed healthcare providers.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>8. SMS Communications</h2>
              <p>By opting in to receive SMS/text messages from Bloom Metabolics, you agree to the following:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>You will receive recurring automated SMS and text messages related to appointment reminders, care updates, intake follow-ups, lab coordination, and post-consultation check-ins.</li>
                <li>Message frequency varies based on your interactions with our services.</li>
                <li>Standard message and data rates from your wireless carrier may apply.</li>
                <li>Consent to marketing messages is not required to receive care or purchase services.</li>
                <li>You may opt out at any time by replying <strong className="text-white">STOP</strong> to any message. After opting out, you will receive one final confirmation message and no further SMS communications.</li>
                <li>You may reply <strong className="text-white">HELP</strong> to any message for assistance, or contact us at support@bloommetabolics.com or (949) 567-8463.</li>
                <li>Bloom Metabolics and mobile carriers are not liable for delayed or undelivered messages.</li>
              </ul>
              <p className="mt-3">Our SMS communications do not contain Protected Health Information (PHI). For full details on how we handle your phone number and SMS data, see our <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>, Section 7 (SMS/Text Messaging Communications).</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>9. Limitation of Liability</h2>
              <p>Bloom Metabolics provides a platform for connecting patients with licensed providers. While we strive for the highest quality of care, we are not liable for clinical outcomes, individual treatment responses, or medical decisions made by providers.</p>
            </div>

            {/* ── Stub sections — require legal review before deployment ── */}
            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>10. Intellectual Property</h2>
              <p className="italic text-[#8a8268]">TO BE DRAFTED &mdash; Legal review required before deployment. Contact healthcare-experienced attorney to draft this section.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>11. Prohibited Conduct</h2>
              <p className="italic text-[#8a8268]">TO BE DRAFTED &mdash; Legal review required before deployment. Contact healthcare-experienced attorney to draft this section.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>12. Indemnification</h2>
              <p className="italic text-[#8a8268]">TO BE DRAFTED &mdash; Legal review required before deployment. Contact healthcare-experienced attorney to draft this section.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>13. Dispute Resolution and Arbitration</h2>
              <p className="italic text-[#8a8268]">TO BE DRAFTED &mdash; Legal review required before deployment. Contact healthcare-experienced attorney to draft this section.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>14. Class Action Waiver</h2>
              <p className="italic text-[#8a8268]">TO BE DRAFTED &mdash; Legal review required before deployment. Contact healthcare-experienced attorney to draft this section.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>15. Changes to Terms</h2>
              <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>16. Contact</h2>
              <p>For questions about these terms, contact us at <strong className="text-white">legal@bloommetabolics.com</strong>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
