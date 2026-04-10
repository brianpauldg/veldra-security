'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  dark?: boolean
  id?: string
}

export default function Section({ children, className, dark = false, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
      className={cn(
        'py-20 lg:py-28',
        dark ? 'bg-graphite-950 text-white' : 'bg-white text-graphite-950',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  )
}

export function SectionLabel({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={cn(
      'text-[11px] font-semibold uppercase tracking-[0.15em] mb-4',
      dark ? 'text-graphite-400' : 'text-graphite-500'
    )}>
      {children}
    </div>
  )
}

export function SectionTitle({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <h2 className={cn(
      'text-display mb-5',
      dark ? 'text-white' : 'text-graphite-950'
    )}>
      {children}
    </h2>
  )
}

export function SectionDescription({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={cn(
      'text-subheadline max-w-2xl',
      dark ? 'text-graphite-400' : 'text-graphite-500',
      className
    )}>
      {children}
    </p>
  )
}
