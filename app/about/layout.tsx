import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'About Bloom Metabolics, Physician-Led Men\'s Health Telehealth',
  description: 'Bloom Metabolics was built for men who refuse to settle for average healthcare. Board-certified providers, lab-informed protocols, and modern telehealth.',
  keywords: 'about bloom metabolics, men\'s health telehealth, online trt clinic, hormone optimization, telehealth providers',
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
