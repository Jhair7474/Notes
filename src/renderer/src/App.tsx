import { RootLayout, Sidebar, Content, DraggableTopBar } from '@/components'
import { NotePreviewList } from './components/NotePreviewList'
import { ActionButtonsRow } from './components/ActionButtonsRow'

const App = () => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2 bg-zinc-900/50 border-r border-white/20">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </Sidebar>
        <Content className="bg-zinc-900/50 border-l border-white/20">
          Content
        </Content>
      </RootLayout>
    </>
  )
}

export default App
