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
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm hover:shadow-md': variant === 'primary',
            'bg-zinc-100 text-zinc-900 hover:bg-zinc-200': variant === 'secondary',
            'border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300': variant === 'outline',
            'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50': variant === 'ghost',
            'bg-white text-zinc-950 hover:bg-zinc-50 shadow-sm': variant === 'white',
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
