import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-cyan',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            // Primary variant
            'bg-accent-cyan text-dark-900 hover:shadow-glow-md hover:shadow-cyan-500/50 active:scale-95': variant === 'primary',
            // Secondary variant
            'bg-dark-700 text-white border border-white/20 hover:border-accent-cyan/50 hover:bg-dark-600 active:scale-95': variant === 'secondary',
            // Outline variant
            'border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 active:scale-95': variant === 'outline',
            // Ghost variant
            'text-white hover:bg-white/10 active:bg-white/20': variant === 'ghost',
            // Size variants
            'h-10 px-3 text-sm': size === 'sm',
            'h-11 px-4 text-base': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
            'h-14 px-8 text-lg': size === 'xl',
          },
          className
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
