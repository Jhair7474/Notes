import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export const formatDateFromMs = (ms: number) => {
  const locale = window?.context?.locale || navigator.language || 'en-US'
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'UTC',
  })
  return dateFormatter.format(ms)
}

export const cn = (...args: ClassValue[]) => twMerge(clsx(...args))
