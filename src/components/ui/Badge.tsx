import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'success' | 'danger' | 'warning'
  size?: 'sm' | 'md'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-2.5 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'badge-base inline-flex',
          {
            'badge-primary': variant === 'primary',
            'badge-success': variant === 'success',
            'badge-danger': variant === 'danger',
            'bg-amber-500/20 text-amber-400 border border-amber-500/30': variant === 'warning',
          },
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
