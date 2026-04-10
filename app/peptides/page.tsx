import type { Metadata } from 'next'
import { FlaskConical, Zap, HeartPulse, Brain, Shield, Activity } from 'lucide-react'
import TreatmentPage from '@/components/TreatmentPage'

export const metadata: Metadata = {
  title: 'Peptide Therapy — Advanced Recovery & Performance',
  description: 'Provider-managed peptide therapy protocols for recovery, performance, sleep, and cellular optimization. Research-informed, physician-supervised telehealth.',
  keywords: 'peptide therapy, BPC-157, peptide treatment, telehealth peptides, recovery peptides, performance optimization',
}

export default function PeptidesPage() {
  return (
    <TreatmentPage
      tag="Peptide Therapy"
      title="Peptide Therapy"
      headline="Targeted protocols for recovery and performance"
      description="Research-informed peptide protocols for recovery, sleep, performance, and cellular health. Provider-managed, individually tailored, and designed for measurable outcomes."
      icon={<FlaskConical className="w-6 h-6" />}
      benefits={[
        { title: 'Accelerated Recovery', description: 'Certain peptides may support tissue repair, reduce inflammation, and accelerate recovery from exercise or injury.', icon: <HeartPulse className="w-5 h-5" /> },
        { title: 'Sleep Quality', description: 'Targeted peptides may support deeper, more restorative sleep — a foundational pillar of health optimization.', icon: <Brain className="w-5 h-5" /> },
        { title: 'Performance Support', description: 'Protocols designed to support physical performance, endurance, and exercise capacity under medical supervision.', icon: <Zap className="w-5 h-5" /> },
        { title: 'Cellular Health', description: 'Peptide therapy may support cellular repair processes, immune function, and overall biological resilience.', icon: <Shield className="w-5 h-5" /> },
        { title: 'Body Composition', description: 'Certain peptides may support fat metabolism and lean tissue maintenance as part of a comprehensive protocol.', icon: <Activity className="w-5 h-5" /> },
        { title: 'Anti-Aging Support', description: 'Research-informed protocols that may support skin health, collagen production, and markers associated with biological aging.', icon: <FlaskConical className="w-5 h-5" /> },
      ]}
      process={[
        { step: '01', title: 'Consultation', description: 'Discuss your goals — recovery, sleep, performance, or general optimization — with a licensed provider.' },
        { step: '02', title: 'Health Assessment', description: 'Review your medical history, current medications, and any lab work relevant to peptide therapy.' },
        { step: '03', title: 'Protocol Selection', description: 'Your provider selects specific peptides, dosing, and cycling schedules tailored to your objectives.' },
        { step: '04', title: 'Treatment Initiation', description: 'Receive your prescribed peptides with detailed administration instructions and support resources.' },
        { step: '05', title: 'Progress Review', description: 'Regular check-ins to evaluate response, adjust protocols, and optimize your regimen.' },
        { step: '06', title: 'Continued Optimization', description: 'Ongoing access to your care team for protocol refinement and additional peptide options.' },
      ]}
      idealFor={[
        'Athletes or active individuals seeking improved recovery',
        'People experiencing poor sleep quality despite good sleep hygiene',
        'Those interested in research-informed anti-aging protocols',
        'Individuals recovering from injury or surgery (under medical guidance)',
        'People seeking complementary optimization alongside TRT or other treatments',
        'Health-conscious individuals interested in cutting-edge, provider-managed therapies',
      ]}
      faqs={[
        { question: 'What are peptides?', answer: 'Peptides are short chains of amino acids that act as signaling molecules in the body. Different peptides can target specific biological processes like tissue repair, growth hormone release, or immune function.' },
        { question: 'Are peptides safe?', answer: 'When prescribed and supervised by a licensed provider, peptide therapy is generally well-tolerated. Your provider will evaluate your health history and monitor your response throughout treatment.' },
        { question: 'Which peptides do you offer?', answer: 'Our providers evaluate each patient individually and select from available, medically appropriate peptides based on your goals, health status, and current regulations. Specific peptides are discussed during your consultation.' },
        { question: 'Can I combine peptides with TRT?', answer: 'Yes, many patients use peptide therapy alongside other treatments. Your provider will design a coordinated protocol that accounts for all of your current treatments.' },
        { question: 'How are peptides administered?', answer: 'Most peptides are administered via subcutaneous injection. Your provider will provide detailed instructions and support to ensure proper administration.' },
      ]}
      disclaimer="Peptide therapy requires prescription and supervision by a licensed provider. Availability of specific peptides may vary. Individual results are not guaranteed."
    />
  )
}
