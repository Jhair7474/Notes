import { twMerge } from 'tailwind-merge'
import { DeleteNoteButton, NewNoteButton } from './Button'
import { ComponentProps } from 'react'

export const ActionButtonsRow = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge(
        'flex justify-between items-center gap-2 pt-8 px-1 sticky top-8 bg-zinc-900/50 z-40',
        className
      )}
      {...props}
    >
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
