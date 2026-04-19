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
      initial={{ opacity: 0.15, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
      className={cn(
        'py-[80px] lg:py-[140px]',
        'bg-[#020202]',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  )
}

export function SectionLabel({ children }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="eyebrow mb-4">
      {children}
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode; dark?: boolean }) {
  return (
    <h2 className="text-display text-chrome mb-5" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
      {children}
    </h2>
  )
}

export function SectionDescription({ children, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={cn(
      'text-[15px] text-[#8a8268] leading-relaxed max-w-2xl font-light',
      className
    )}>
      {children}
    </p>
  )
}
