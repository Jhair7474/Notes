import { twMerge } from 'tailwind-merge'
import { DeleteNoteButton, NewNoteButton } from './Button'
import { ComponentProps } from 'react'

export const ActionButtonsRow = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge(
        'flex justify-between items-center gap-2 px-2 py-2 sticky top-0 bg-[#0f172a] border-b border-blue-900/40 z-40',
        className
      )}
      {...props}
    >
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}

