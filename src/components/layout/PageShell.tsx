export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="min-h-full p-7">
        {children}
      </div>
    </div>
  )
}
