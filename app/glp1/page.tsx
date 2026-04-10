import type { Metadata } from 'next'
import { TrendingUp, HeartPulse, Activity, Brain, Zap, Shield } from 'lucide-react'
import TreatmentPage from '@/components/TreatmentPage'

export const metadata: Metadata = {
  title: 'GLP-1 — Medical Weight Loss',
  description: 'Physician-supervised GLP-1 weight loss programs via premium telehealth. Semaglutide and tirzepatide protocols for sustainable body composition change.',
  keywords: 'GLP-1 weight loss, semaglutide, tirzepatide, medical weight loss, telehealth weight loss, online weight loss clinic',
}

export default function GLP1Page() {
  return (
    <TreatmentPage
      tag="GLP-1 Medical Weight Loss"
      title="GLP-1 Therapy"
      headline="Medical weight loss that actually works"
      description="Physician-supervised GLP-1 receptor agonist protocols for sustainable weight management. Lab-informed dosing, regular monitoring, and a care team that stays with you."
      icon={<TrendingUp className="w-6 h-6" />}
      benefits={[
        { title: 'Sustainable Weight Loss', description: 'GLP-1 medications have demonstrated significant weight reduction in clinical studies when combined with lifestyle modifications.', icon: <TrendingUp className="w-5 h-5" /> },
        { title: 'Appetite Regulation', description: 'GLP-1 receptor agonists work by mimicking natural hormones that regulate appetite and satiety, reducing cravings naturally.', icon: <Brain className="w-5 h-5" /> },
        { title: 'Metabolic Health', description: 'Beyond weight loss, GLP-1 therapy may support improvements in blood sugar regulation, cardiovascular markers, and metabolic function.', icon: <HeartPulse className="w-5 h-5" /> },
        { title: 'Body Composition', description: 'Medically supervised protocols designed to support fat loss while maintaining lean mass through proper nutrition guidance.', icon: <Activity className="w-5 h-5" /> },
        { title: 'Energy & Vitality', description: 'Many patients report improved energy levels and overall well-being as they achieve healthier body composition.', icon: <Zap className="w-5 h-5" /> },
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
        { question: 'What GLP-1 medications do you prescribe?', answer: 'Our providers evaluate each patient individually and may prescribe semaglutide, tirzepatide, or other GLP-1 receptor agonists based on your medical history, goals, and eligibility. Specific medications are determined during your consultation.' },
        { question: 'How much weight can I expect to lose?', answer: 'Results vary significantly by individual. Clinical studies have shown average weight loss of 15-20% of body weight over 12-18 months, but individual results depend on adherence, lifestyle factors, and medical profile.' },
        { question: 'What are the side effects?', answer: 'Common side effects include nausea, which typically subsides as your body adjusts. Your provider will discuss all potential side effects and manage your dosing schedule to minimize discomfort.' },
        { question: 'How long do I need to take GLP-1 medication?', answer: 'Treatment duration is individualized. Your provider will work with you to develop a long-term plan that may include gradual tapering and transition to maintenance strategies.' },
        { question: 'Do I need to diet and exercise too?', answer: 'GLP-1 medications work best in combination with healthy nutrition and regular physical activity. Your care team provides guidance on sustainable lifestyle modifications.' },
      ]}
      disclaimer="GLP-1 medications require prescription by a licensed provider. Not all patients qualify. Results vary. Treatment includes regular medical monitoring."
    />
  )
}
