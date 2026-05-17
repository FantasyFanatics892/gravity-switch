import * as React from 'react'
import { cn } from '@/lib/utils'

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fullHeight?: boolean
}

export function PageContainer({
  children,
  fullHeight = true,
  className,
  ...props
}: PageContainerProps) {
  return (
    <main
      className={cn(
        'w-full px-4 py-8 sm:px-6 lg:px-8 animate-fade-in',
        {
          'min-h-screen': fullHeight,
        },
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl">
        {children}
      </div>
    </main>
  )
}
