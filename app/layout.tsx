import './globals.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { LayoutShell } from '@/components/LayoutShell'

export const metadata: Metadata = {
  title: {
    default: 'Nova Health — Premium Telehealth for Hormone Optimization & Weight Loss',
    template: '%s | Nova Health',
  },
  description: 'Premium telehealth clinic specializing in TRT, GLP-1 medical weight loss, and peptide therapy. Licensed providers, personalized care, AI-enhanced operations. Book your consultation today.',
  keywords: 'TRT telehealth, hormone optimization, GLP-1 weight loss, peptide therapy, online testosterone clinic, medical weight loss, telehealth consultation, premium telehealth',
  openGraph: {
    title: 'Nova Health — Premium Telehealth for Medical Optimization',
    description: 'Licensed providers. Personalized protocols. AI-enhanced care operations. The modern standard in telehealth.',
    type: 'website',
    siteName: 'Nova Health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova Health — Premium Telehealth',
    description: 'TRT, GLP-1, and peptide therapy from licensed providers. Book your consultation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
