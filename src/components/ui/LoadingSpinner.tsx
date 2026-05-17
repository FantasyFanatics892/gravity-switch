export function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/20 animate-spin" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-cyan border-r-accent-cyan/50 animate-spin" />
          <div className="absolute inset-1 rounded-full border border-accent-cyan/10" />
        </div>
        <p className="text-sm text-white/60 font-medium">Loading...</p>
      </div>
    </div>
  )
}
