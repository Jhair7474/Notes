export const DraggableTopBar = () => (
  <header
    className="fixed top-0 left-0 right-0 h-8 bg-zinc-800 border-b border-zinc-700 z-50"
    style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
  />
);
