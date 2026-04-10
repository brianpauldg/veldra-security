import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite-400 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-graphite-950 text-white hover:bg-graphite-800 shadow-sm hover:shadow-md': variant === 'primary',
            'bg-graphite-100 text-graphite-900 hover:bg-graphite-200': variant === 'secondary',
            'border border-graphite-200 text-graphite-700 hover:bg-graphite-50 hover:border-graphite-300': variant === 'outline',
            'text-graphite-600 hover:text-graphite-950 hover:bg-graphite-50': variant === 'ghost',
            'bg-white text-graphite-950 hover:bg-graphite-50 shadow-sm': variant === 'white',
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
