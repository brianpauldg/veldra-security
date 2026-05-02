import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Waitlist',
  description:
    'Join the Bloom Metabolics waitlist for early access to physician-led TRT, GLP-1 weight loss, peptide therapy, and metabolic health programs.',
  openGraph: {
    title: 'Join the Bloom Metabolics Waitlist',
    description:
      'Be first to access personalized metabolic health, hormone optimization, and longevity-focused care when enrollment opens.',
  },
}

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children
}
