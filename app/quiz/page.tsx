'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, AlertTriangle, Activity } from 'lucide-react'
import { trackEvent } from '@/lib/events'
import TCPAConsent, { type ConsentState, isConsentValid } from '@/components/TCPAConsent'
import { CURRENT_CONSENT_VERSION } from '@/lib/consent-text'

const questions = [
  {
    id: 'energy',
    question: 'How would you rate your energy levels over the past 3 months?',
    options: [
      { label: 'High — I feel great', score: 0 },
      { label: 'Normal — no major complaints', score: 1 },
      { label: 'Noticeably lower than usual', score: 2 },
      { label: 'Consistently exhausted', score: 3 },
    ],
  },
  {
    id: 'body_composition',
    question: 'Have you experienced changes in body composition despite consistent diet/exercise?',
    options: [
      { label: 'No change', score: 0 },
      { label: 'Minor changes', score: 1 },
      { label: 'Noticeable fat gain or muscle loss', score: 2 },
      { label: 'Significant changes', score: 3 },
    ],
  },
  {
    id: 'mental_clarity',
    question: 'How would you describe your mental clarity and focus?',
    options: [
      { label: 'Sharp and clear', score: 0 },
      { label: 'Occasionally foggy', score: 1 },
      { label: 'Frequently foggy', score: 2 },
      { label: 'Severe brain fog daily', score: 3 },
    ],
  },
  {
    id: 'libido',
    question: 'Rate your libido compared to 2\u20133 years ago.',
    options: [
      { label: 'About the same', score: 0 },
      { label: 'Slightly lower', score: 1 },
      { label: 'Noticeably lower', score: 2 },
      { label: 'Significantly decreased', score: 3 },
    ],
  },
  {
    id: 'sleep',
    question: 'How is your sleep quality?',
    options: [
      { label: 'Great \u2014 I wake refreshed', score: 0 },
      { label: 'Decent \u2014 could be better', score: 1 },
      { label: 'Disrupted \u2014 waking frequently', score: 2 },
      { label: 'Poor \u2014 unrestorative most nights', score: 3 },
    ],
  },
  {
    id: 'mood',
    question: 'How is your mood and motivation?',
    options: [
      { label: 'Stable and driven', score: 0 },
      { label: 'Occasional dips', score: 1 },
      { label: 'Frequently low', score: 2 },
      { label: 'Persistent apathy or irritability', score: 3 },
    ],
  },
  {
    id: 'recovery',
    question: 'How well do you recover from exercise?',
    options: [
      { label: 'Quick recovery', score: 0 },
      { label: 'Normal \u2014 a day or so', score: 1 },
      { label: 'Slower than expected', score: 2 },
      { label: 'Very slow or persistent soreness', score: 3 },
    ],
  },
  {
    id: 'age',
    question: 'What is your age range?',
    options: [
      { label: 'Under 30', score: 0 },
      { label: '30\u201335', score: 1 },
      { label: '36\u201342', score: 2 },
      { label: '43\u201350', score: 2 },
      { label: '50+', score: 3 },
    ],
  },
  {
    id: 'labs',
    question: 'Have you had your testosterone levels checked in the last 2 years?',
    options: [
      { label: 'Yes \u2014 they were normal', score: 0 },
      { label: 'Yes \u2014 they were borderline', score: 2 },
      { label: 'Yes \u2014 they were low', score: 3 },
      { label: 'No', score: 1 },
    ],
  },
  {
    id: 'morning_erections',
    question: 'Have you noticed decreased morning erections?',
    options: [
      { label: 'No change', score: 0 },
      { label: 'Occasional decrease', score: 1 },
      { label: 'Frequent decrease', score: 2 },
      { label: 'Consistent decrease', score: 3 },
    ],
  },
  {
    id: 'afternoon_crash',
    question: 'Do you experience afternoon energy crashes?',
    options: [
      { label: 'Rarely', score: 0 },
      { label: 'Sometimes', score: 1 },
      { label: 'Most days', score: 2 },
      { label: 'Daily', score: 3 },
    ],
  },
  {
    id: 'family_history',
    question: 'Family history of hormonal issues or early andropause?',
    options: [
      { label: 'No', score: 0 },
      { label: 'Unsure', score: 1 },
      { label: 'Yes', score: 2 },
    ],
  },
]

type ResultTier = 'low' | 'moderate' | 'high'

function getResultTier(score: number): ResultTier {
  if (score <= 10) return 'low'
  if (score <= 20) return 'moderate'
  return 'high'
}

const resultContent: Record<ResultTier, { title: string; description: string; color: string; icon: typeof Check }> = {
  low: {
    title: 'Low Risk',
    description: 'Based on your responses, your symptoms don\u2019t strongly suggest low testosterone. However, if you\u2019re not feeling your best, lifestyle factors like sleep, stress, and nutrition are worth evaluating. A baseline blood panel is always smart preventive care.',
    color: 'text-emerald-600',
    icon: Check,
  },
  moderate: {
    title: 'Moderate Risk',
    description: 'Your responses suggest several symptoms commonly associated with suboptimal testosterone levels. This doesn\u2019t mean you have low T \u2014 but it\u2019s worth getting your levels checked. A comprehensive lab panel can tell you exactly what\u2019s going on.',
    color: 'text-amber-600',
    icon: AlertTriangle,
  },
  high: {
    title: 'High Risk',
    description: 'Your responses indicate a strong pattern of symptoms associated with low testosterone. We\u2019d strongly recommend getting a comprehensive lab panel. Many men in your situation find that their levels are well below optimal \u2014 and treatment can be life-changing.',
    color: 'text-red-600',
    icon: AlertTriangle,
  },
}

export default function QuizPage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'email' | 'results'>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [email, setEmail] = useState('')
  const [quizConsent, setQuizConsent] = useState<ConsentState>({ email: false, sms: false, version: CURRENT_CONSENT_VERSION })
  const [emailError, setEmailError] = useState('')

  function handleAnswer(score: number) {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      setStep('email')
    }
  }

  function handleBack() {
    if (current > 0) {
      setCurrent(current - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
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
    const tier = getResultTier(totalScore)
    trackEvent('quiz_completed', {
      email,
      score: totalScore,
      tier,
      serviceInterest: 'trt',
    })

    // Save quiz result as a lead with consent
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'trt_quiz',
        serviceInterest: 'trt',
        variant: 'quiz',
        consent: { email: quizConsent.email, version: quizConsent.version },
      }),
    }).catch(() => {})

    setStep('results')
  }

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const tier = getResultTier(totalScore)
  const result = resultContent[tier]

  return (
    <>
      {/* Hero */}
      <section className="bg-graphite-950 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-medium text-graphite-300 tracking-wide mb-6">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            2-Minute Self-Assessment
          </div>
          <h1 className="text-display text-white mb-4">
            Is It Low T?
          </h1>
          <p className="text-lg text-graphite-400 max-w-xl mx-auto">
            Answer 12 quick questions about your symptoms. Get a personalized risk assessment and find out if your testosterone levels may be holding you back.
          </p>
        </div>
      </section>

      {/* Quiz Body */}
      <section className="bg-white py-16 lg:py-20 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="bg-graphite-50 rounded-2xl p-8 mb-8">
                  <h2 className="text-display-sm text-graphite-950 mb-4">How It Works</h2>
                  <div className="grid gap-4 text-left max-w-md mx-auto">
                    {[
                      'Answer 12 questions about your symptoms',
                      'Get a personalized risk score instantly',
                      'Receive tailored recommendations based on your results',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-graphite-950 text-white text-[13px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-[15px] text-graphite-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setStep('quiz')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-graphite-950 text-white text-[15px] font-semibold hover:bg-graphite-800 transition-all shadow-lg"
                >
                  Start Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[12px] text-graphite-400 mt-4">
                  This assessment is for educational purposes only and does not constitute medical advice.
                </p>
              </motion.div>
            )}

            {/* QUIZ QUESTIONS */}
            {step === 'quiz' && (
              <motion.div
                key={`q-${current}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-medium text-graphite-400 uppercase tracking-wider">
                      Question {current + 1} of {questions.length}
                    </span>
                    <span className="text-[12px] font-medium text-graphite-400">
                      {Math.round(((current + 1) / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-graphite-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-graphite-950 rounded-full"
                      initial={{ width: `${(current / questions.length) * 100}%` }}
                      animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <h2 className="text-display-sm text-graphite-950 mb-8">
                  {questions[current].question}
                </h2>

                <div className="grid gap-3">
                  {questions[current].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full text-left px-6 py-4 rounded-xl border border-graphite-200 text-[15px] text-graphite-700 hover:border-graphite-400 hover:bg-graphite-50 transition-all"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {current > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 inline-flex items-center gap-2 text-[14px] text-graphite-500 hover:text-graphite-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous question
                  </button>
                )}
              </motion.div>
            )}

            {/* EMAIL CAPTURE */}
            {step === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-graphite-100 flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-8 h-8 text-graphite-700" />
                </div>
                <h2 className="text-display-sm text-graphite-950 mb-3">
                  Your Results Are Ready
                </h2>
                <p className="text-[15px] text-graphite-500 mb-8 max-w-md mx-auto">
                  Enter your email to see your personalized hormone health risk score and get tailored recommendations.
                </p>
                <form onSubmit={handleEmailSubmit} className="max-w-sm mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                    placeholder="Enter your email"
                    className="w-full px-5 py-3.5 rounded-xl border border-graphite-200 text-[15px] text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:ring-2 focus:ring-graphite-300 mb-2"
                  />
                  {emailError && (
                    <p className="text-[13px] text-red-500 mb-2">{emailError}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-graphite-950 text-white text-[15px] font-semibold hover:bg-graphite-800 transition-all"
                  >
                    See My Results
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[12px] text-graphite-400 mt-4">
                  No spam. We&apos;ll send your results and relevant health content. Unsubscribe anytime.
                </p>
              </motion.div>
            )}

            {/* RESULTS */}
            {step === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-10">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-[13px] font-semibold ${
                    tier === 'low' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                    tier === 'moderate' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                    'border-red-200 bg-red-50 text-red-700'
                  }`}>
                    <result.icon className="w-4 h-4" />
                    {result.title} &mdash; Score: {totalScore}/36
                  </div>
                  <h2 className="text-display-sm text-graphite-950 mb-4">
                    Your Hormone Health Assessment
                  </h2>
                  <p className="text-[15px] text-graphite-500 max-w-lg mx-auto">
                    {result.description}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="bg-graphite-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-[14px] font-semibold text-graphite-950 mb-4 uppercase tracking-wider">Your Symptom Profile</h3>
                  <div className="grid gap-3">
                    {questions.map((q, i) => {
                      if (i >= answers.length) return null
                      const score = answers[i]
                      return (
                        <div key={q.id} className="flex items-center justify-between">
                          <span className="text-[14px] text-graphite-600">{q.question.replace(/\?$/, '').substring(0, 50)}...</span>
                          <div className="flex gap-1">
                            {[0, 1, 2, 3].map((level) => (
                              <div
                                key={level}
                                className={`w-3 h-3 rounded-full ${
                                  level <= score
                                    ? score <= 1 ? 'bg-emerald-400' : score === 2 ? 'bg-amber-400' : 'bg-red-400'
                                    : 'bg-graphite-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-graphite-950 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {tier === 'high'
                      ? 'We\u2019d Strongly Recommend Getting Your Labs Checked'
                      : tier === 'moderate'
                      ? 'A Comprehensive Lab Panel Can Give You Answers'
                      : 'Stay Proactive About Your Health'}
                  </h3>
                  <p className="text-[15px] text-graphite-400 mb-6 max-w-md mx-auto">
                    {tier === 'high'
                      ? 'A Bloom Metabolics provider can order comprehensive labs and build a personalized protocol if treatment is appropriate.'
                      : tier === 'moderate'
                      ? 'Talk to a licensed provider who specializes in hormone optimization. A simple blood panel tells the full story.'
                      : 'Even with a low risk score, a baseline lab panel is smart preventive care. Know your numbers.'}
                  </p>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all"
                  >
                    {tier === 'low' ? 'Learn About Our Services' : 'Book Consultation'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-[12px] text-graphite-400 text-center mt-6">
                  This assessment is for educational purposes only and does not constitute a medical diagnosis.
                  Individual results vary. All treatments require evaluation by a licensed provider.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
