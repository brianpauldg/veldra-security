'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, AlertTriangle, Scale } from 'lucide-react'
import { trackEvent } from '@/lib/events'
import TCPAConsent, { type ConsentState, isConsentValid } from '@/components/TCPAConsent'
import { CURRENT_CONSENT_VERSION } from '@/lib/consent-text'

const questions = [
  {
    id: 'bmi',
    question: 'What is your approximate BMI?',
    subtitle: 'BMI = weight (lbs) / height (in)\u00B2 \u00D7 703. Not sure? Estimate based on your build.',
    options: [
      { label: 'Under 25 (normal weight)', score: 0 },
      { label: '25\u201327 (slightly overweight)', score: 1 },
      { label: '27\u201330 (overweight)', score: 2 },
      { label: '30\u201335 (obese class I)', score: 3 },
      { label: '35+ (obese class II+)', score: 3 },
    ],
  },
  {
    id: 'diet_history',
    question: 'Have you tried diet and exercise programs in the past 12 months?',
    options: [
      { label: 'Yes \u2014 multiple programs', score: 3 },
      { label: 'Yes \u2014 one program', score: 2 },
      { label: 'No, but I\u2019ve been thinking about it', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    id: 'conditions',
    question: 'Do you have any of the following conditions?',
    subtitle: 'Select the option that best applies.',
    options: [
      { label: 'Type 2 diabetes or pre-diabetes', score: 3 },
      { label: 'High blood pressure', score: 2 },
      { label: 'Sleep apnea', score: 2 },
      { label: 'Multiple of the above', score: 3 },
      { label: 'None of these', score: 0 },
    ],
  },
  {
    id: 'age',
    question: 'What is your age range?',
    options: [
      { label: 'Under 30', score: 1 },
      { label: '30\u201340', score: 2 },
      { label: '40\u201350', score: 3 },
      { label: '50+', score: 3 },
    ],
  },
  {
    id: 'prior_glp1',
    question: 'Have you used GLP-1 medications before?',
    options: [
      { label: 'No \u2014 this would be my first time', score: 2 },
      { label: 'Yes \u2014 with good results', score: 1 },
      { label: 'Yes \u2014 without results or had to stop', score: 3 },
    ],
  },
  {
    id: 'goal',
    question: 'What\u2019s your primary weight loss goal?',
    options: [
      { label: 'Improve overall health markers', score: 3 },
      { label: 'Look and feel better', score: 2 },
      { label: 'Athletic performance', score: 1 },
      { label: 'Doctor recommended weight loss', score: 3 },
    ],
  },
  {
    id: 'timeline',
    question: 'How soon are you looking to start treatment?',
    options: [
      { label: 'As soon as possible', score: 3 },
      { label: 'Within the next month', score: 2 },
      { label: 'Just researching for now', score: 1 },
    ],
  },
]

type EligibilityTier = 'likely' | 'possible' | 'unlikely'

function getTier(score: number): EligibilityTier {
  if (score >= 15) return 'likely'
  if (score >= 9) return 'possible'
  return 'unlikely'
}

const tierContent: Record<EligibilityTier, { title: string; description: string }> = {
  likely: {
    title: 'Likely Candidate',
    description: 'Based on your responses, you appear to be a strong candidate for GLP-1 medical weight loss. Your symptom profile, health history, and goals align with the typical patient who benefits most from physician-supervised GLP-1 therapy.',
  },
  possible: {
    title: 'May Qualify \u2014 Consultation Recommended',
    description: 'Your responses suggest you may benefit from GLP-1 therapy, but a medical evaluation is needed to confirm eligibility. Several factors in your profile warrant a conversation with a licensed provider.',
  },
  unlikely: {
    title: 'May Not Be the Best Fit',
    description: 'Based on your current responses, GLP-1 therapy may not be the most appropriate treatment. However, every situation is unique \u2014 a provider consultation can explore other options that may be better suited to your goals.',
  },
}

export default function GLP1QuizPage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'capture' | 'results'>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [email, setEmail] = useState('')
  const [quizConsent, setQuizConsent] = useState<ConsentState>({ email: false, sms: false, version: CURRENT_CONSENT_VERSION })
  const [phone, setPhone] = useState('')
  const [emailError, setEmailError] = useState('')

  function handleAnswer(score: number) {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      setStep('capture')
    }
  }

  function handleBack() {
    if (current > 0) {
      setCurrent(current - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    if (!isConsentValid(quizConsent, true, false)) {
      setEmailError('Please agree to receive email communications.')
      return
    }
    const totalScore = answers.reduce((a, b) => a + b, 0)
    const tier = getTier(totalScore)
    trackEvent('quiz_completed', {
      email,
      phone,
      score: totalScore,
      tier,
      serviceInterest: 'glp1',
    })

    // Save quiz result as a lead with consent
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        phone,
        consent: { email: quizConsent.email, sms: !!phone, version: quizConsent.version },
        source: 'glp1_quiz',
        serviceInterest: 'glp1',
        variant: 'quiz',
      }),
    }).catch(() => {})

    setStep('results')
  }

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const tier = getTier(totalScore)
  const result = tierContent[tier]

  return (
    <>
      <section className="bg-[#020202] pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0c0a]/5 border border-white/10 text-[12px] font-medium text-[#8a8268] tracking-wide mb-6">
            <Scale className="w-3.5 h-3.5 text-gold" />
            GLP-1 Eligibility Screener
          </div>
          <h1 className="text-display text-white mb-4">
            Am I a Candidate for GLP-1?
          </h1>
          <p className="text-lg text-[#8a8268] max-w-xl mx-auto">
            Answer 7 quick questions to find out if GLP-1 medical weight loss may be right for you. Get personalized results instantly.
          </p>
        </div>
      </section>

      <section className="bg-[#0d0c0a] py-16 lg:py-20 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="bg-[#050404] rounded-2xl p-8 mb-8">
                  <h2 className="text-display-sm text-[#d8cfbe] mb-4">What You&apos;ll Learn</h2>
                  <div className="grid gap-4 text-left max-w-md mx-auto">
                    {[
                      'Whether your health profile aligns with GLP-1 eligibility criteria',
                      'What next steps make sense based on your situation',
                      'How to connect with a licensed provider for medical evaluation',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <p className="text-[15px] text-[#8a8268]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setStep('quiz')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#020202] text-white text-[15px] font-semibold hover:bg-[#0d0c0a] transition-all shadow-lg"
                >
                  Check My Eligibility
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[12px] text-[#8a8268] mt-4">
                  This screener does not replace a medical evaluation. All treatments require provider approval.
                </p>
              </motion.div>
            )}

            {step === 'quiz' && (
              <motion.div
                key={`q-${current}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-medium text-[#8a8268] uppercase tracking-wider">
                      Question {current + 1} of {questions.length}
                    </span>
                    <span className="text-[12px] font-medium text-[#8a8268]">
                      {Math.round(((current + 1) / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#0d0c0a] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#020202] rounded-full"
                      initial={{ width: `${(current / questions.length) * 100}%` }}
                      animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <h2 className="text-display-sm text-[#d8cfbe] mb-2">
                  {questions[current].question}
                </h2>
                {questions[current].subtitle && (
                  <p className="text-[14px] text-[#8a8268] mb-8">{questions[current].subtitle}</p>
                )}

                <div className="grid gap-3">
                  {questions[current].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full text-left px-6 py-4 rounded-xl border border-[#1a1814] text-[15px] text-[#d8cfbe] hover:border-[#8a8268] hover:bg-[#050404] transition-all"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {current > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 inline-flex items-center gap-2 text-[14px] text-[#8a8268] hover:text-[#d8cfbe] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous question
                  </button>
                )}
              </motion.div>
            )}

            {step === 'capture' && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0d0c0a] flex items-center justify-center mx-auto mb-6">
                  <Scale className="w-8 h-8 text-[#d8cfbe]" />
                </div>
                <h2 className="text-display-sm text-[#d8cfbe] mb-3">
                  Your Eligibility Results Are Ready
                </h2>
                <p className="text-[15px] text-[#8a8268] mb-8 max-w-md mx-auto">
                  Enter your details to see your personalized GLP-1 eligibility assessment.
                </p>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                    placeholder="Email address"
                    className="w-full px-5 py-3.5 rounded-xl border border-[#1a1814] text-[15px] text-[#d8cfbe] placeholder:text-[#8a8268] focus:outline-none focus:ring-2 focus:ring-[#8a8268]/30"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number (optional)"
                    className="w-full px-5 py-3.5 rounded-xl border border-[#1a1814] text-[15px] text-[#d8cfbe] placeholder:text-[#8a8268] focus:outline-none focus:ring-2 focus:ring-[#8a8268]/30"
                  />
                  {emailError && (
                    <p className="text-[13px] text-red-500">{emailError}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#020202] text-white text-[15px] font-semibold hover:bg-[#0d0c0a] transition-all"
                  >
                    See My Results
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[12px] text-[#8a8268] mt-4">
                  No spam. We&apos;ll send your results and relevant information. Unsubscribe anytime.
                </p>
              </motion.div>
            )}

            {step === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-10">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-[13px] font-semibold ${
                    tier === 'likely' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                    tier === 'possible' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                    'border-[#1a1814] bg-[#050404] text-[#8a8268]'
                  }`}>
                    {tier === 'likely' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    {result.title}
                  </div>
                  <h2 className="text-display-sm text-[#d8cfbe] mb-4">
                    Your GLP-1 Eligibility Assessment
                  </h2>
                  <p className="text-[15px] text-[#8a8268] max-w-lg mx-auto">
                    {result.description}
                  </p>
                </div>

                {tier !== 'unlikely' && (
                  <div className="bg-[#050404] rounded-2xl p-6 mb-8">
                    <h3 className="text-[14px] font-semibold text-[#d8cfbe] mb-3 uppercase tracking-wider">What Happens Next</h3>
                    <div className="grid gap-3">
                      {[
                        'Book a consultation with a licensed Bloom Metabolics provider',
                        'Complete a medical evaluation and health history review',
                        'If appropriate, receive a personalized GLP-1 protocol with ongoing monitoring',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#020202] text-white text-[12px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-[14px] text-[#8a8268]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-[#020202] rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {tier === 'likely'
                      ? 'Ready to Get Started?'
                      : tier === 'possible'
                      ? 'Let\u2019s Find Out Together'
                      : 'Explore Other Options'}
                  </h3>
                  <p className="text-[15px] text-[#8a8268] mb-6 max-w-md mx-auto">
                    {tier === 'likely'
                      ? 'Book a consultation and a licensed provider will confirm your eligibility and build your personalized GLP-1 protocol.'
                      : tier === 'possible'
                      ? 'A provider consultation will determine if GLP-1 is right for you. Many patients with your profile do qualify.'
                      : 'We offer TRT alongside GLP-1. A consultation helps find the right approach for your goals.'}
                  </p>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[15px] font-semibold hover:bg-[#0d0c0a] transition-all"
                  >
                    Book Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-[12px] text-[#8a8268] text-center mt-6">
                  This screener is for informational purposes only and does not constitute medical advice or guarantee eligibility.
                  All treatments require evaluation and approval by a licensed medical provider.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
