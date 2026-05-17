import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded font-medium transition',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-cyan-600 text-white hover:bg-cyan-700': variant === 'primary',
            'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600': variant === 'secondary',
            'border border-cyan-600 text-cyan-400 hover:bg-cyan-600/20': variant === 'outline',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-2.5 text-base': size === 'lg',
          },
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
