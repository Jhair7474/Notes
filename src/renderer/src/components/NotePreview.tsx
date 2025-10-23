import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime)

  return (
    <div
  className={cn(
    'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-100',
    {
      'bg-blue-700/70': isActive,
      
      'hover:bg-blue-600/60': !isActive
    },
    className
  )}
  {...props}
>
  <h3 className="mb-1 font-bold truncate text-blue-100">{title}</h3>
  <span className="block text-xs text-blue-300 font-light">{date}</span>
</div>

  )
}
