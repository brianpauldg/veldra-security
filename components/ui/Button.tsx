import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a8268] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050404]',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-[#1a1814] text-[#d8cfbe] hover:bg-[#2a2620] border border-[#1a1814] hover:border-[#2a2620]': variant === 'primary',
            'bg-[#0d0c0a] text-[#d8cfbe] hover:bg-[#1a1814] border border-[#1a1814]': variant === 'secondary',
            'border border-[#8a8268]/30 text-[#8a8268] hover:text-[#d8cfbe] hover:border-[#8a8268]/50': variant === 'outline',
            'text-[#8a8268] hover:text-[#d8cfbe]': variant === 'ghost',
          },
          {
            'px-4 py-2 text-[13px]': size === 'sm',
            'px-6 py-2.5 text-[14px]': size === 'md',
            'px-8 py-3.5 text-[15px]': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
export default Button
