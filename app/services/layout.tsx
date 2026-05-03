import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Treatment Programs — TRT, GLP-1',
  description: 'Explore Bloom Metabolics\'s treatment programs: testosterone replacement therapy and GLP-1 medical weight loss. All physician-supervised.',
  keywords: 'trt treatment, glp-1 weight loss, men\'s health services, telehealth treatments, hormone optimization',
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children
}
