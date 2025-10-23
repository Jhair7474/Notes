import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote, WriteNote } from '@shared/types'
import fs from "fs-extra";
const { ensureDir, readdir, readFile, writeFile, stat, remove } = fs;
import pkg from 'lodash';
const { isEmpty } = pkg;
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'


import { homedir } from 'os'

import { CreateNote } from '../../shared/types';
import { dialog } from 'electron';
import path from 'path';

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
    console.info('No se encontro notas, creandoo la nota welcome')

    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

   
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
  
    console.info(`Escribiendo nota ${filename}`)
    return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
  }
   

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

 const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

   if (canceled || !filePath) {
    console.info('Creacion de nota cancelada')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (path.resolve(parentDir) !== path.resolve(rootDir)) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creacion de nota fallida',
      message: `Todas las notas deben guardarse en ${rootDir}.
      No uses otras carpetas para almacenar tus notas.`
    })

    return false
  }

  console.info(`Creando nota: ${filePath}`)
  await writeFile(filePath, '')

  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Eliminar nota',
    message: `Estas seguro de eliminar la nota ${filename}?`,
    buttons: ['Delete', 'Cancel'], 
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Eliminacion de nota cancelada')
    return false
  }

  console.info(`Nota eliminada: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
} 