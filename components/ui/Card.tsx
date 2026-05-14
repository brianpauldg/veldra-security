import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-8 transition-all duration-300',
        'bg-[#0d0c0a] border border-[#1a1814]',
        hover && 'hover:border-[#2a2620]',
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
      'bg-[#1a1814] text-[#8a8268]',
      className
    )}>
      {children}
    </div>
  )
}
