import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => (
  <main className={twMerge('flex flex-row h-screen', className)} {...props}>
    {children}
  </main>
)

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => (
  <aside className={twMerge('w-[250px] pt-8 h-[calc(100vh-2rem)] overflow-auto', className)} {...props}>
    {children}
  </aside>
)

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto pt-8 h-[calc(100vh-2rem)]', className)} {...props}>
      {children}
    </div>
  )
)
Content.displayName = 'Content'
