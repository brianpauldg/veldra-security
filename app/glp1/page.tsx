import type { Metadata } from 'next'
import { TrendingUp, HeartPulse, Activity, Brain, Zap, Shield } from 'lucide-react'
import TreatmentPage from '@/components/TreatmentPage'

export const metadata: Metadata = {
  title: 'GLP-1 — Medical Weight Loss',
  // FDA April 1 2026 essentially-a-copy rule — compounded designation in metadata
  description: 'Physician-supervised compounded GLP-1 therapy via telehealth. Compounded semaglutide and tirzepatide protocols. Not FDA-approved. Individual medical evaluation required.',
  keywords: 'GLP-1 weight loss, semaglutide, tirzepatide, medical weight loss, telehealth weight loss, online weight loss clinic',
}

export default function GLP1Page() {
  return (
    <TreatmentPage
      tag="GLP-1 Medical Weight Loss"
      title="GLP-1 Therapy"
      headline="Medical weight loss that actually works"
      // FDA April 1 2026 essentially-a-copy rule
      description="Physician-prescribed compounded GLP-1 receptor agonist therapy for medically indicated weight management. Compounded medications are not FDA-approved. Lab-informed dosing, regular monitoring, and a care team that stays with you."
      icon={<TrendingUp className="w-6 h-6" />}
      benefits={[
        { title: 'Weight Management', description: 'Clinical trials of brand-name GLP-1 medications have shown meaningful weight reduction when combined with lifestyle modifications. Compounded formulations have not been independently studied. Individual results vary.', icon: <TrendingUp className="w-5 h-5" /> },
        { title: 'Appetite Regulation', description: 'GLP-1 receptor agonists work by mimicking natural hormones that regulate appetite and satiety, reducing cravings naturally.', icon: <Brain className="w-5 h-5" /> },
        { title: 'Metabolic Health', description: 'Beyond weight loss, GLP-1 therapy may support improvements in blood sugar regulation, cardiovascular markers, and metabolic function.', icon: <HeartPulse className="w-5 h-5" /> },
        { title: 'Body Composition', description: 'Medically supervised protocols designed to support fat loss while maintaining lean mass through proper nutrition guidance.', icon: <Activity className="w-5 h-5" /> },
        { title: 'Energy & Vitality', description: 'Some patients report improved energy levels and overall well-being as body composition changes. Individual results vary.', icon: <Zap className="w-5 h-5" /> },
        { title: 'Medical Oversight', description: 'Every step supervised by licensed providers with regular lab monitoring and dosage adjustments for safety and efficacy.', icon: <Shield className="w-5 h-5" /> },
      ]}
      process={[
        { step: '01', title: 'Consultation', description: 'Meet with a provider to review your weight history, medical background, and goals for treatment.' },
        { step: '02', title: 'Medical Evaluation', description: 'Comprehensive evaluation including labs, BMI assessment, and review of contraindications.' },
        { step: '03', title: 'Protocol Design', description: 'Your provider selects the appropriate GLP-1 medication and creates a titration schedule tailored to you.' },
        { step: '04', title: 'Treatment Start', description: 'Begin with a low dose that gradually increases. Clear instructions, injection guidance, and support throughout.' },
        { step: '05', title: 'Monitoring', description: 'Regular check-ins to assess progress, manage side effects, and adjust dosing for optimal results.' },
        { step: '06', title: 'Long-Term Plan', description: 'Develop a sustainable maintenance strategy including nutrition, activity, and ongoing medical support.' },
      ]}
      idealFor={[
        'BMI of 27+ with weight-related health conditions, or BMI of 30+',
        'History of unsuccessful weight loss attempts with diet and exercise alone',
        'Difficulty controlling appetite or persistent cravings',
        'Weight-related metabolic concerns (blood sugar, cholesterol)',
        'Desire for medically supervised, evidence-based weight management',
        'Commitment to combining medication with lifestyle changes',
      ]}
      faqs={[
        // FDA April 1 2026 — compounded designation
        { question: 'What GLP-1 medications do you prescribe?', answer: 'Our physicians evaluate each patient individually and may prescribe compounded semaglutide or tirzepatide based on clinician-determined patient-specific medical necessity. Compounded medications are not FDA-approved and are prepared by a licensed compounding pharmacy. Specific medications are determined during your consultation.' },
        // FDA April 1 2026 — removed specific percentage claims for compounded meds
        { question: 'How much weight can I expect to lose?', answer: 'Individual results vary significantly. Weight loss outcomes depend on medical evaluation, adherence, lifestyle factors, and your individual medical profile. Not all patients respond to GLP-1 therapy. Your physician will discuss realistic expectations during your consultation.' },
        { question: 'What are the side effects?', answer: 'Common side effects include nausea, which typically subsides as your body adjusts. Your provider will discuss all potential side effects and manage your dosing schedule to minimize discomfort.' },
        { question: 'How long do I need to take GLP-1 medication?', answer: 'Treatment duration is individualized. Your provider will work with you to develop a long-term plan that may include gradual tapering and transition to maintenance strategies.' },
        { question: 'Do I need to diet and exercise too?', answer: 'GLP-1 medications work best in combination with healthy nutrition and regular physical activity. Your care team provides guidance on sustainable lifestyle modifications.' },
      ]}
      addOnPricing="+$299/mo add-on to any Bloom membership tier. Medication included."
      // FDA April 1 2026 — compounded disclosure in disclaimer
      disclaimer="GLP-1 medications provided by Bloom Metabolics are compounded by a licensed compounding pharmacy and are not FDA-approved. Prescribed based on individual medical evaluation and patient-specific medical necessity. Not all patients qualify. Results vary significantly. Treatment includes regular medical monitoring."
    />
  )
}
