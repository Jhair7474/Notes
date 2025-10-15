import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    //electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
    }
  }
}
