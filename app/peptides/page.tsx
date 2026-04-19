import type { Metadata } from 'next'
import { FlaskConical, Zap, HeartPulse, Brain, Shield, Activity } from 'lucide-react'
import TreatmentPage from '@/components/TreatmentPage'

export const metadata: Metadata = {
  title: 'Peptide Therapy — Advanced Recovery & Performance',
  description: 'Provider-managed peptide therapy protocols for recovery, performance, sleep, and cellular optimization. Research-informed, physician-supervised telehealth.',
  keywords: 'peptide therapy, BPC-157, TB-500, MOTS-c, GHK-Cu, peptide treatment, telehealth peptides, recovery peptides, performance optimization',
}

export default function PeptidesPage() {
  return (
    <TreatmentPage
      tag="Peptide Therapy"
      title="Peptide Therapy"
      headline="BPC-157/TB-500, MOTS-c, GHK-Cu — now available"
      description="These peptides have been removed from the FDA ban list and are available as physician-managed add-ons. $100/month per peptide, combinable with any treatment protocol."
      icon={<FlaskConical className="w-6 h-6" />}
      benefits={[
        { title: 'BPC-157 / TB-500 — $100/mo', description: 'Recovery and tissue repair blend. May support gut health, joint recovery, tendon repair, and accelerated healing from exercise or injury.', icon: <HeartPulse className="w-5 h-5" /> },
        { title: 'MOTS-c — $100/mo', description: 'Mitochondrial-derived peptide for metabolic optimization. May support exercise capacity, insulin sensitivity, and cellular energy production.', icon: <Zap className="w-5 h-5" /> },
        { title: 'GHK-Cu — $100/mo', description: 'Copper peptide for skin health and tissue remodeling. May support collagen synthesis, skin elasticity, hair follicle health, and wound healing.', icon: <FlaskConical className="w-5 h-5" /> },
        { title: 'Combinable with TRT', description: 'Add any peptide to your existing TRT protocol for comprehensive optimization. Your provider coordinates all medications together.', icon: <Shield className="w-5 h-5" /> },
        { title: 'Combinable with GLP-1', description: 'MOTS-c pairs particularly well with GLP-1 therapy for enhanced metabolic support. Provider-managed stacking for optimal results.', icon: <Activity className="w-5 h-5" /> },
        { title: 'Provider-Managed Protocols', description: 'Every peptide protocol is prescribed and monitored by a licensed physician. Dosing, cycling, and adjustments are tailored to your response.', icon: <Brain className="w-5 h-5" /> },
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
        { question: 'Which peptides do you offer?', answer: 'We currently offer BPC-157/TB-500 (recovery and tissue repair), MOTS-c (metabolic optimization), and GHK-Cu (skin health and anti-aging). Each is $100/month as an add-on to any treatment protocol. These peptides have been removed from the FDA ban list and are available through licensed pharmacies.' },
        { question: 'Can I combine peptides with TRT?', answer: 'Yes, many patients use peptide therapy alongside other treatments. Your provider will design a coordinated protocol that accounts for all of your current treatments.' },
        { question: 'How are peptides administered?', answer: 'Most peptides are administered via subcutaneous injection. Your provider will provide detailed instructions and support to ensure proper administration.' },
      ]}
      disclaimer="Peptide therapy requires prescription and supervision by a licensed provider. Availability of specific peptides may vary. Individual results are not guaranteed."
    />
  )
}
