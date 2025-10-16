import { RootLayout, Sidebar, Content, DraggableTopBar, MarkdownEditor, FloatingNoteTitle } from '@/components'
import { NotePreviewList } from './components/NotePreviewList'
import { ActionButtonsRow } from './components/ActionButtonsRow'
import { useRef } from 'react'


const App = () => {
    const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2 bg-zinc-900/50 border-r border-white/20">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll}/>
        </Sidebar>
        <Content ref={contentContainerRef} className="bg-zinc-900/50 border-l border-white/20">
          <FloatingNoteTitle className='pt-2'/>
          <MarkdownEditor/>
        </Content>
      </RootLayout>
    </>
  )
}

export default App
