import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical Disclaimer',
  description: 'Bloom Metabolics medical disclaimer. Important information about our telehealth services and treatment programs.',
}

export default function DisclaimerPage() {
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
          <h1 className="text-display text-white mb-3">Medical Disclaimer</h1>
          <p className="text-[14px] text-[#8a8268]">Last updated: April 2026</p>
        </div>
      </section>

      <section className="bg-[#020202] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 text-[15px] leading-relaxed text-[#d8cfbe]">
            <div className="rounded-2xl border border-[#8a8268]/30 bg-[#1a1814] p-6">
              <p className="text-[14px] text-[#d8cfbe] font-medium">
                The information provided on this website is for general informational purposes only and does not constitute medical advice, diagnosis, or treatment. All clinical decisions, diagnoses, and treatment recommendations are made exclusively by licensed healthcare providers.
              </p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Telehealth Platform</h2>
              <p>Bloom Metabolics facilitates access to licensed physicians through a telehealth platform. We are not a medical practice, hospital, or healthcare facility. The physician-patient relationship is established between you and the licensed physician who conducts your consultation.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Individual Results</h2>
              <p>Results of hormone therapy or weight management treatments vary significantly between individuals. No outcomes are guaranteed. Statements on this website describing potential benefits are not guarantees of individual results.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Regulatory Compliance</h2>
              <p>All medications prescribed through Bloom Metabolics are dispensed by licensed compounding pharmacies in accordance with applicable state and federal regulations. Medication availability may vary based on your state of residence and applicable regulations at the time of prescribing.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>FDA Disclaimer</h2>
              <p>These statements have not been evaluated by the Food and Drug Administration. Compounded medications are not FDA-approved drugs. Compounding pharmacies operate under the oversight of state boards of pharmacy and, where applicable, the FDA.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Licensed Provider Oversight</h2>
              <p>All treatments offered through Bloom Metabolics require evaluation, prescription, and supervision by a licensed medical provider. Eligibility for any treatment is determined solely by your provider based on your medical history, symptoms, lab results, and clinical judgment. Not all patients qualify for all treatments.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Emergency Services</h2>
              <p>Bloom Metabolics is not an emergency medical service. If you are experiencing a medical emergency, call 911 or go to your nearest emergency room immediately.</p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-light text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Contact</h2>
              <p>For questions about our medical disclaimer, contact <strong className="text-white">legal@bloommetabolics.com</strong>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
