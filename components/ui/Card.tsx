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
          ? 'bg-zinc-900 border border-zinc-800'
          : 'bg-white border border-zinc-100',
        hover && (dark
          ? 'hover:border-zinc-700 hover:bg-zinc-800/50'
          : 'hover:border-zinc-200 hover:shadow-lg'),
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
      'bg-zinc-100 text-zinc-700',
      className
    )}>
      {children}
    </div>
  )
}
