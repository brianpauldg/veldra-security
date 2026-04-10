import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  dark?: boolean
  hover?: boolean
}

export default function Card({ children, className, dark = false, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-8 transition-all duration-300',
        dark
          ? 'bg-graphite-900 border border-graphite-800'
          : 'bg-white border border-graphite-100',
        hover && (dark
          ? 'hover:border-graphite-700 hover:bg-graphite-800/50'
          : 'hover:border-graphite-200 hover:shadow-lg'),
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
      'w-12 h-12 rounded-xl flex items-center justify-center mb-5',
      'bg-graphite-100 text-graphite-700',
      className
    )}>
      {children}
    </div>
  )
}
