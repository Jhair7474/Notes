import { notesMock } from "./mocks";
import { NoteInfo } from "@shared/models";
import { atom, Atom } from "jotai";



export const notesAtom: Atom<NoteInfo[]> = atom(notesMock);
export const selectedNoteIndexAtom: Atom<number | null> = atom(null);

export const selectedNoteAtom: Atom<NoteInfo | null> = atom((get) => {
  const notes = get(notesAtom); 
  const selectedNoteIndex = get(selectedNoteIndexAtom)
    if (selectedNoteIndex == null) return null;

        const selectedNote = notes[selectedNoteIndex];
        return {
            ...selectedNote,
            content: `Hello World ${selectedNote.title}`,
        };
})

    export const createEmpyNoteAtom = atom(null, (get, set) =>{
      const notes = get(notesAtom);
      const title = `Note ${notes.length + 1}`
      const newNote: NoteInfo = {
        title,
        lastEditTime: Date.now(),
      }

      set(notesAtom, [newNote ,...notes.filter((note) => note.title !== newNote.title)])
      set(selectedNoteIndexAtom, 0)
    })

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote) return


  // filter out the deleted note
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  // de select any note
  set(selectedNoteIndexAtom, null)
})