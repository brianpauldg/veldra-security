import type { Metadata } from 'next'
import { Zap, TrendingUp, Brain, HeartPulse, Activity, Shield } from 'lucide-react'
import TreatmentPage from '@/components/TreatmentPage'

export const metadata: Metadata = {
  title: 'TRT — Testosterone Replacement Therapy',
  description: 'Clinician-guided testosterone replacement therapy via telehealth. Personalized, lab-informed TRT protocols. Physician-prescribed, individually dosed, and monitored.',
  keywords: 'TRT, testosterone replacement therapy, telehealth TRT, online TRT, hormone optimization, low testosterone treatment',
}

export default function TRTPage() {
  return (
    <TreatmentPage
      tag="Testosterone Replacement Therapy"
      title="TRT"
      headline="Restore your energy. Reclaim your edge."
      description="Clinician-guided testosterone optimization designed around your labs, your symptoms, and your goals. Not a cookie-cutter protocol — a personalized program supervised by licensed providers."
      icon={<Zap className="w-6 h-6" />}
      benefits={[
        { title: 'Energy & Vitality', description: 'TRT may support increased energy and reduced fatigue — many patients report initial improvements within 2–4 weeks, with fuller benefits developing over 3–6 months of consistent treatment. Individual results vary based on baseline levels and protocol adherence.', icon: <Zap className="w-5 h-5" /> },
        { title: 'Body Composition', description: 'Optimized testosterone levels may support lean muscle maintenance, reduced body fat, and improved metabolic health. Individual results vary.', icon: <TrendingUp className="w-5 h-5" /> },
        { title: 'Mental Clarity', description: 'Some patients report improved focus and reduced brain fog with properly managed hormone levels. Individual results vary.', icon: <Brain className="w-5 h-5" /> },
        { title: 'Libido & Sexual Health', description: 'TRT may support improvements in libido and sexual function. Individual results vary.', icon: <HeartPulse className="w-5 h-5" /> },
        { title: 'Mood & Motivation', description: 'Balanced hormones may support emotional stability and motivation. Individual results vary.', icon: <Activity className="w-5 h-5" /> },
        { title: 'Recovery & Sleep', description: 'Some patients report improved recovery from exercise and better sleep quality with optimized testosterone. Individual results vary.', icon: <Shield className="w-5 h-5" /> },
      ]}
      process={[
        { step: '01', title: 'Consultation', description: 'Meet with a licensed provider to discuss your symptoms, health history, and goals.' },
        { step: '02', title: 'Lab Work', description: 'Complete comprehensive bloodwork including total and free testosterone, metabolic panel, and relevant biomarkers.' },
        { step: '03', title: 'Clinical Review', description: 'Your provider reviews your labs, evaluates eligibility, and designs a personalized protocol.' },
        { step: '04', title: 'Treatment Initiation', description: 'Begin your prescribed TRT protocol with clear dosing instructions and ongoing support.' },
        { step: '05', title: 'Follow-Up Labs', description: 'Regular bloodwork to monitor levels, assess response, and adjust your protocol as needed.' },
        { step: '06', title: 'Ongoing Optimization', description: 'Continuous care with regular check-ins, lab monitoring, and protocol refinement for long-term results.' },
      ]}
      idealFor={[
        'Persistent fatigue or low energy despite adequate sleep',
        'Difficulty maintaining muscle mass or increased body fat',
        'Reduced libido or sexual dysfunction',
        'Brain fog, poor concentration, or declining motivation',
        'Mood changes, irritability, or low confidence',
        'Poor recovery from exercise or physical activity',
        'Age-related decline in vitality and performance',
      ]}
      faqs={[
        { question: 'How do I know if I need TRT?', answer: 'Low testosterone is diagnosed through blood tests and symptom evaluation. If you\'re experiencing symptoms like persistent fatigue, low libido, brain fog, or body composition changes, a consultation can determine if TRT is appropriate for you.' },
        { question: 'Is TRT safe?', answer: 'When prescribed and monitored by a licensed provider with regular lab work, TRT is generally well-tolerated. Your provider will discuss potential risks, side effects, and monitoring protocols during your consultation.' },
        { question: 'How long until I see results?', answer: 'Many patients report initial improvements in energy and mood within 2-4 weeks. Full benefits, including body composition changes, typically develop over 3-6 months of consistent treatment.' },
        { question: 'Do I need TRT forever?', answer: 'Treatment duration varies. Your provider will discuss your options, including the potential for long-term therapy and what happens if you choose to discontinue.' },
        { question: 'Will insurance cover this?', answer: 'Bloom Metabolics operates as a cash-pay telehealth clinic. We provide transparent pricing without insurance billing complexity. Many patients find this more convenient and cost-effective.' },
      ]}
      addOnPricing="+$199/mo add-on to any Bloom membership tier. Medication included."
      disclaimer="All TRT treatments require evaluation and prescription by a licensed medical provider. Individual results vary. Not everyone qualifies for testosterone replacement therapy."
    />
  )
}
