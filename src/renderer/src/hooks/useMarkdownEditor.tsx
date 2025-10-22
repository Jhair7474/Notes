import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { NoteContent } from '@shared/models'
import { useRef } from 'react'
import { throttle } from 'lodash'
import { autoSavingTime } from '@shared/constants'

export const useMarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const saveNote = useSetAtom(saveNoteAtom)
    const editorRef = useRef<MDXEditorMethods>(null)

    const handleAutoSaving = throttle ( async (content: NoteContent) => {
        if (!selectedNote) return

        console.info('Auto saving:', selectedNote.title)

        await saveNote(content)

    }, 
    autoSavingTime, 
    {
        'leading': false,
        'trailing': true
    })
    return {
        editorRef,
        selectedNote,
        handleAutoSaving
    }

}