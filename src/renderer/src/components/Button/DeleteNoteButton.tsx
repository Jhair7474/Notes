import { deleteNoteAtom } from '@renderer/store'
import { ActionButton, ActionButtonProps } from './ActionButton'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useSetAtom } from 'jotai'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async () => {
    await deleteNote()
  }

  return (
    <ActionButton {...props} onClick={handleDelete}>
      <FaRegTrashAlt className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
