import * as React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function SectionHeader({
  title,
  subtitle,
  icon,
  action,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 mb-6',
        className
      )}
      {...props}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          {icon && <div className="text-accent-cyan">{icon}</div>}
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        {subtitle && (
          <p className="text-sm text-white/60">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}
