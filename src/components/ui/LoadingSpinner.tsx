export function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <span className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-white/15 border-t-game-player" />
    </div>
  )
}
