import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote, WriteNote } from '@shared/types'
import { ensureDir, readFile, readdir, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import { root } from 'postcss';

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile(welcomeNoteFilename, { encoding: fileEncoding })

    // create the welcome note
    await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, { encoding: fileEncoding })

    notes.push(welcomeNoteFilename)
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}


export const readNote: ReadNote = async (filename) => {
    const rootDir = getRootDir()

    return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
    const rootDir = getRootDir()
  
    console.info(`Writing note ${filename}`)
    return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
  }
  