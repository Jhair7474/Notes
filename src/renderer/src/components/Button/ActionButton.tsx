import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'flex items-center justify-center p-2 rounded-md border border-zinc-400/50 hover:bg-zinc-700/50 transition-colors duration-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
