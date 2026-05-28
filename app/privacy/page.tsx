import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy & Notice of Privacy Practices',
  description: 'Bloom Metabolics HIPAA-compliant Notice of Privacy Practices. How we collect, use, and protect your Protected Health Information.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-[#020202] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-6 py-4 mb-6 max-w-2xl mx-auto">
            <p className="text-[12px] text-amber-300 font-medium uppercase tracking-wider mb-2">Draft for Attorney Review, Not Yet Legally Operative</p>
            <p className="text-[11px] text-[#8a8268] leading-relaxed font-light">
              Bloom Metabolics is in pre-launch state. These documents are being finalized by counsel and will be operative when enrollment opens. No medical services are currently being provided and no protected health information is being collected during pre-launch. Waitlist signups collect only email and optional preference data, not health information.
            </p>
          </div>
          <h1 className="text-display text-white mb-3">Privacy Policy &amp; Notice of Privacy Practices</h1>
          <p className="text-[14px] text-[#8a8268]">Last updated: May 3, 2026</p>
        </div>
      </section>

      <section className="bg-[#020202] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 text-[15px] leading-relaxed text-[#d8cfbe]">
            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>1. Introduction</h2>
              <p>Bloom Metabolics (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and security of your health information. This Notice of Privacy Practices describes how we collect, use, and disclose your Protected Health Information (PHI) in compliance with the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and applicable state privacy laws.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>2. Information We Collect</h2>
              <p>We collect the following categories of information to provide telehealth services:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-white">Personal Information:</strong> Name, date of birth, address, email address, phone number, and state of residence</li>
                <li><strong className="text-white">Protected Health Information (PHI):</strong> Medical history, symptoms, diagnoses, lab results, prescriptions, treatment records, and health goals</li>
                <li><strong className="text-white">Payment Information:</strong> Payment details processed securely through Corepay. We do not store credit card numbers on our servers</li>
                <li><strong className="text-white">Technical Data:</strong> IP address, browser type, pages visited, and usage patterns collected to improve our platform</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>3. How We Use Your Information</h2>
              <p>We may use and disclose your PHI for the following purposes without requiring your additional authorization:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-white">Treatment:</strong> To provide, coordinate, and manage your medical care, including sharing information with your prescribing physician, pharmacies, and laboratory partners</li>
                <li><strong className="text-white">Payment:</strong> To process payments and manage billing for services rendered</li>
                <li><strong className="text-white">Healthcare Operations:</strong> To conduct quality assessments, training, compliance activities, and improve our services</li>
                <li><strong className="text-white">Legal Requirements:</strong> To comply with applicable federal and state laws, court orders, or lawful government requests</li>
                <li><strong className="text-white">Business Associates:</strong> We share PHI with third-party service providers (including OptiMantra EHR, Corepay, and laboratory partners) who operate under Business Associate Agreements (BAAs) requiring them to protect your information in accordance with HIPAA</li>
              </ul>
              <p className="mt-3">All other uses or disclosures of your PHI not described above require your written authorization.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>4. How We Protect Your Information</h2>
              <p>We implement the following safeguards to protect your PHI:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>HIPAA-compliant data handling, storage, and transmission</li>
                <li>Encrypted data transmission using TLS/SSL technology</li>
                <li>Secure cloud infrastructure with role-based access controls</li>
                <li>Regular security risk assessments and monitoring</li>
                <li>Staff training on HIPAA privacy and security requirements</li>
                <li>Business Associate Agreements with all third-party vendors who access PHI</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>5. Your Rights Under HIPAA</h2>
              <p>You have the following rights regarding your Protected Health Information:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-white">Right to Access:</strong> Request a copy of your medical records and PHI in our possession</li>
                <li><strong className="text-white">Right to Amend:</strong> Request correction of inaccurate or incomplete PHI</li>
                <li><strong className="text-white">Right to Restrict Disclosures:</strong> Request restrictions on how we use or disclose your PHI (we will accommodate reasonable requests)</li>
                <li><strong className="text-white">Right to Confidential Communications:</strong> Request that we contact you through specific means or at specific locations</li>
                <li><strong className="text-white">Right to an Accounting of Disclosures:</strong> Request a list of disclosures of your PHI made for purposes other than treatment, payment, and operations</li>
                <li><strong className="text-white">Right to Receive a Copy of This Notice:</strong> You may request a paper copy of this notice at any time</li>
                <li><strong className="text-white">Right to Opt Out of Marketing:</strong> We will not use your PHI for marketing purposes without your written authorization</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, contact us at <strong className="text-white">privacy@bloommetabolics.com</strong>.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>6. Breach Notification</h2>
              <p>In the event of a breach of unsecured PHI, we will notify affected individuals within 60 days of discovery as required by the HIPAA Breach Notification Rule. Notification will be provided via email or written notice and will include a description of the breach, the types of information involved, steps you should take to protect yourself, and actions we are taking to address the breach.</p>
            </div>

            {/* ── SMS/Text Messaging Section (from A2P 10DLC File 05) ── */}
            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>7. SMS/Text Messaging Communications</h2>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>What Information We Collect</h3>
              <p>When you opt in to receive SMS/text messages from Bloom Metabolics, we collect and store:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Your mobile phone number</li>
                <li>Your opt-in consent record (timestamp, method of consent, and consent language version)</li>
                <li>Message delivery and interaction data (delivery receipts, opt-out requests)</li>
              </ul>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>How We Use Your Phone Number</h3>
              <p>We use your mobile phone number exclusively to send you SMS/text messages related to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Appointment confirmations and reminders</li>
                <li>Care coordination (lab reminders, intake follow-ups, post-visit check-ins)</li>
              </ul>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>Information Sharing</h3>
              <p><strong className="text-white">We do not sell, rent, or share your phone number or SMS consent data with any third party for their marketing purposes.</strong> Your phone number may be shared only with:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Our SMS service provider (for message delivery only, subject to a Business Associate Agreement)</li>
                <li>As required by law, regulation, or legal process</li>
              </ul>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>Message Frequency and Rates</h3>
              <p>Message frequency varies based on your interactions with our services. You will receive transactional messages related to scheduled appointments, intake follow-ups, lab coordination, and post-consultation check-ins. Standard message and data rates from your wireless carrier may apply.</p>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>How to Opt Out</h3>
              <p>You may opt out of SMS communications at any time by:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Replying <strong className="text-white">STOP</strong> to any message from us</li>
                <li>Contacting us at support@bloommetabolics.com or (949) 567-8463</li>
                <li>Updating your communication preferences in your patient portal</li>
              </ul>
              <p className="mt-3">After opting out, you will receive one final confirmation message and no further SMS communications. Opting out of SMS does not affect other communications (email, patient portal messages) or your care relationship with Bloom Metabolics.</p>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>How to Get Help</h3>
              <p>Reply <strong className="text-white">HELP</strong> to any message from us, or contact:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Email: support@bloommetabolics.com</li>
                <li>Phone: (949) 567-8463</li>
                <li>Web: <a href="https://bloommetabolics.com/contact" className="underline hover:text-white">https://bloommetabolics.com/contact</a></li>
              </ul>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>HIPAA Compliance</h3>
              <p>Bloom Metabolics is a covered entity under the Health Insurance Portability and Accountability Act (HIPAA). Our SMS communications are limited to operational and logistical content (appointment reminders, intake follow-ups, care check-ins) and do not contain Protected Health Information (PHI). Our SMS service provider operates under a signed Business Associate Agreement (BAA) and is contractually obligated to safeguard any data transmitted through the messaging platform in accordance with HIPAA requirements.</p>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>Carrier Disclaimer</h3>
              <p>Bloom Metabolics and mobile carriers are not liable for delayed or undelivered messages. Message delivery is subject to effective transmission by your wireless carrier.</p>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>SMS Data Retention</h3>
              <p>We retain your phone number and consent records for the duration of your patient relationship plus seven (7) years, in accordance with healthcare record retention requirements. Message logs are retained for three (3) years for compliance purposes. You may request deletion of your phone number from our marketing systems at any time (subject to legal retention obligations for clinical records).</p>

              <h3 className="text-[1.1rem] font-light text-white mb-3 mt-6" style={{ fontFamily: 'Fraunces, serif' }}>Changes to SMS Practices</h3>
              <p>If we make material changes to how we use SMS communications, we will notify you via text message before changes take effect and provide an opportunity to opt out.</p>

              <p className="mt-6 text-[12px] text-[#8a8268] italic">This section was drafted in accordance with CTIA Messaging Principles and Best Practices (2024), TCPA requirements, and carrier content policy guidelines.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>8. Complaints</h2>
              <p>If you believe your privacy rights have been violated, you may file a complaint with us at <strong className="text-white">privacy@bloommetabolics.com</strong> or with the U.S. Department of Health and Human Services Office for Civil Rights at:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Website: hhs.gov/ocr/privacy/hipaa/complaints</li>
                <li>Phone: 1-800-368-1019</li>
              </ul>
              <p className="mt-3">We will not retaliate against you for filing a complaint.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>9. Cookies and Analytics</h2>
              <p>We use essential cookies necessary to operate our platform and analytics tools to improve the patient experience. When you first visit our website, you are presented with a cookie consent banner where you can accept all cookies, reject non-essential cookies, or customize your preferences. Analytics and marketing cookies are disabled by default. You can revisit your cookie preferences at any time by clearing your browser cookies for this site. Analytics data is aggregated and does not contain PHI.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>10. Changes to This Notice</h2>
              <p>We reserve the right to update this Notice of Privacy Practices at any time. The updated notice will be posted on our website with a revised effective date. Material changes will be communicated to active patients via email.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>11. Your Rights Under California Law (CCPA/CPRA)</h2>
              <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA):</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-white">Right to Know:</strong> You may request that we disclose the categories and specific pieces of personal information we have collected about you, the categories of sources, the business purpose for collection, and the categories of third parties with whom we share it.</li>
                <li><strong className="text-white">Right to Delete:</strong> You may request deletion of your personal information, subject to certain exceptions (e.g., legal retention requirements, ongoing treatment).</li>
                <li><strong className="text-white">Right to Correct:</strong> You may request correction of inaccurate personal information.</li>
                <li><strong className="text-white">Right to Limit Use of Sensitive Personal Information:</strong> You may direct us to limit the use and disclosure of your sensitive personal information (including health information) to purposes necessary for providing services.</li>
                <li><strong className="text-white">Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
              </ul>
              <p className="mt-3"><strong className="text-white">How to Submit a Request:</strong> Email <strong className="text-white">privacy@bloommetabolics.com</strong> with your request. We will verify your identity before processing. We respond within 45 days of receiving a verifiable request. If additional time is needed, we will notify you of the extension (up to 90 days total).</p>
              <p className="mt-2 text-[13px] text-[#8a8268]">Note: Where HIPAA applies to your health information, HIPAA requirements govern over CCPA/CPRA. HIPAA-protected health information is exempt from certain CCPA provisions.</p>
              <p className="mt-3"><strong className="text-white">Authorized Agents:</strong> California consumers may designate an authorized agent to submit privacy rights requests on their behalf. Authorized agents must provide proof of authorization and identity. For authorized agent requests, contact <strong className="text-white">privacy@bloommetabolics.com</strong> with documentation.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>12. Sensitive Personal Information (CPRA)</h2>
              <p>Under the CPRA, health information is classified as &ldquo;sensitive personal information.&rdquo; Bloom Metabolics handles sensitive personal information as follows:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Use of sensitive PI is limited to providing the requested telehealth services and complying with legal obligations.</li>
                <li>Bloom does not use sensitive PI for cross-context behavioral advertising.</li>
                <li>Bloom does not sell sensitive PI.</li>
                <li>Sensitive PI is encrypted at rest and in transit.</li>
                <li>Patients have the right to limit use and disclosure of sensitive PI as described in Section 11.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>13. California Confidentiality of Medical Information Act (CMIA)</h2>
              <p>As a healthcare provider operating in California, Bloom Metabolics is also subject to the California Confidentiality of Medical Information Act (CMIA), which provides additional protections for medical information beyond HIPAA. Under the CMIA:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Your medical information will not be disclosed without your written authorization except as permitted by law (e.g., treatment, payment, certain public health purposes).</li>
                <li>You have the right to receive a copy of your medical records.</li>
                <li>Unauthorized disclosure of medical information may result in civil penalties and damages.</li>
                <li>CMIA protections apply in addition to HIPAA, where both laws apply, the stricter standard governs.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>14. Third-Party Service Providers</h2>
              <p>We share information with the following third-party processors to provide our services. Where PHI is involved, Business Associate Agreements (BAAs) are required.</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-[#1a1814]">
                      <th className="text-left py-2 text-[#8a8268] font-medium">Vendor</th>
                      <th className="text-left py-2 text-[#8a8268] font-medium">Purpose</th>
                      <th className="text-left py-2 text-[#8a8268] font-medium">BAA Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a1814]">
                    <tr><td className="py-2">Supabase</td><td className="py-2 text-[#8a8268]">Database &amp; patient records</td><td className="py-2 text-amber-400">Pending, BAA execution in progress as of pre-launch May 2026</td></tr>
                    <tr><td className="py-2">Corepay</td><td className="py-2 text-[#8a8268]">Payment processing</td><td className="py-2 text-[#8a8268]">Not BAA-eligible; PHI not transmitted*</td></tr>
                    <tr><td className="py-2">Vercel</td><td className="py-2 text-[#8a8268]">Website hosting</td><td className="py-2 text-amber-400">Pending, BAA execution in progress as of pre-launch May 2026</td></tr>
                    <tr><td className="py-2">OptiMantra</td><td className="py-2 text-[#8a8268]">Electronic Health Records</td><td className="py-2 text-amber-400">Pending, BAA execution in progress as of pre-launch May 2026</td></tr>
                    <tr><td className="py-2">Calendly</td><td className="py-2 text-[#8a8268]">Appointment scheduling</td><td className="py-2 text-amber-400">Pending, BAA execution in progress as of pre-launch May 2026</td></tr>
                    <tr><td className="py-2">Resend</td><td className="py-2 text-[#8a8268]">Transactional email</td><td className="py-2 text-amber-400">Pending, BAA execution in progress as of pre-launch May 2026</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[12px] text-[#8a8268]">* Corepay processes payment data only. Payment metadata uses opaque patient identifiers; PHI is not transmitted to Corepay. BAA status for other vendors will be updated as agreements are executed.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>15. We Do Not Sell Personal Information</h2>
              <p>Bloom Metabolics does not sell personal information or Protected Health Information to third parties. We do not share personal information for cross-context behavioral advertising. This applies to all categories of personal information, including sensitive personal information as defined under the CPRA.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>16. Children&apos;s Privacy</h2>
              <p>Bloom Metabolics services are for adults 18 years of age and older residing in California. We do not knowingly collect personal information from children under 18. If we become aware that personal information from a minor under 18 has been collected, we will delete it promptly. Parents or guardians who believe their child&apos;s information may have been collected can contact <strong className="text-white">privacy@bloommetabolics.com</strong>.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>17. Data Retention</h2>
              <p>We retain your information in accordance with applicable legal requirements:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-white">Medical Records:</strong> Retained for a minimum of 7 years from the date of last treatment, as required by California law (10 years for minors from the date of majority).</li>
                <li><strong className="text-white">HIPAA Audit Logs:</strong> Retained for a minimum of 6 years as required by HIPAA.</li>
                <li><strong className="text-white">Payment Records:</strong> Retained per PCI DSS requirements and applicable tax law (generally 7 years).</li>
                <li><strong className="text-white">Consent Records:</strong> Retained for the duration of the patient relationship plus the applicable retention period.</li>
                <li><strong className="text-white">Marketing Data:</strong> Retained until you opt out or request deletion, subject to legal obligations.</li>
              </ul>
              <p className="mt-3">When retention periods expire, records are securely destroyed or de-identified in accordance with HIPAA and NIST guidelines.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>18. Contact Information</h2>
              <p>For privacy-related questions, requests, or to exercise your HIPAA or CCPA/CPRA rights:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Email: <strong className="text-white">privacy@bloommetabolics.com</strong></li>
                <li>Mailing address: Bloom Metabolics, Irvine, CA</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
