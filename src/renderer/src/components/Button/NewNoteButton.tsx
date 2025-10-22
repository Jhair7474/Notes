import { LuSignature } from 'react-icons/lu'
import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@/store'

import { useSetAtom } from 'jotai'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)


  const handleCreation = async () => {
    await createEmptyNote()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
