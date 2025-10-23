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
      {}
      <DraggableTopBar />

      {}
      <RootLayout className="pt-8"> {}
        <Sidebar className="p-2 bg-zinc-900/50 border-r border-white/20 flex flex-col relative">
          {}
          <div className="sticky top-0 z-20 bg-zinc-900/70 backdrop-blur-sm pb-2">
            <ActionButtonsRow className="flex justify-between" />
          </div>

          {}
          <div className="overflow-auto flex-1 mt-2">
            <NotePreviewList className="space-y-1" onSelect={resetScroll} />
          </div>
        </Sidebar>

        <Content
          ref={contentContainerRef}
          className="bg-zinc-900/50 border-l border-white/20"
        >
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
