import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical Disclaimer',
  description: 'Nova Health medical disclaimer. Important information about our telehealth services and treatment programs.',
}

export default function DisclaimerPage() {
  return (
    <>
      <section className="bg-graphite-950 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-display text-white mb-3">Medical Disclaimer</h1>
          <p className="text-[14px] text-graphite-400">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 text-[15px] leading-relaxed text-graphite-600">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-[14px] text-amber-800 font-medium">
                This website and its content are for informational purposes only and do not constitute
                medical advice, diagnosis, or treatment. Always consult with a qualified healthcare
                provider before starting any treatment program.
              </p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">Not Medical Advice</h2>
              <p>The information provided on this website, including but not limited to text, graphics, images, and other materials, is for informational purposes only. Nothing on this website is intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">Individual Results Vary</h2>
              <p>Results from telehealth consultations, treatments, and programs vary by individual. Testimonials and examples used on this site represent individual experiences and do not guarantee similar outcomes. Your results will depend on your individual health profile, adherence to treatment, lifestyle factors, and other variables.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">Licensed Provider Oversight</h2>
              <p>All treatments offered through Nova Health require evaluation, prescription, and supervision by a licensed medical provider. Eligibility for any treatment is determined solely by your provider based on your medical history, symptoms, lab results, and clinical judgment. Not all patients qualify for all treatments.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">AI Systems Disclaimer</h2>
              <p>Nova Health uses artificial intelligence systems to support operational workflows, including but not limited to scheduling, reminders, intake guidance, patient education, and care coordination. These AI systems:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Do NOT provide medical diagnoses</li>
                <li>Do NOT prescribe medications or treatments</li>
                <li>Do NOT make clinical decisions</li>
                <li>Do NOT replace the judgment of licensed healthcare providers</li>
              </ul>
              <p className="mt-3">All medical decisions are made exclusively by licensed, qualified healthcare professionals.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">Prescription Medications</h2>
              <p>Prescription medications, including testosterone, GLP-1 receptor agonists, and peptides, carry risks and potential side effects. Your provider will discuss these with you before initiating any treatment. Do not start, stop, or modify any medication without consulting your healthcare provider.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">Emergency Situations</h2>
              <p>Nova Health&apos;s telehealth platform is not designed for medical emergencies. If you are experiencing a medical emergency, call 911 or go to your nearest emergency room immediately.</p>
            </div>

            <div>
              <h2 className="text-display-sm text-graphite-950 mb-4">Third-Party Content</h2>
              <p>This website may contain links to third-party websites or references to third-party products and services. Nova Health does not endorse or assume responsibility for the content, accuracy, or practices of third-party sites.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
