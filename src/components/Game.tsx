import { useRef, useEffect } from 'react'
import { useGame } from '@/hooks/useGame'

interface GameProps {
  initialHighScore: number
  onGameOver?: (score: number) => void
}

export function Game({ initialHighScore, onGameOver }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { dimensions, handleTap } = useGame(canvasRef, initialHighScore, onGameOver)
  const lastTapTimeRef = useRef<number>(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault()
        handleTap()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleTap])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleInput = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()

      const now = Date.now()
      if (now - lastTapTimeRef.current < 200) {
        return
      }

      lastTapTimeRef.current = now
      handleTap()
    }

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isTouchDevice) {
      canvas.addEventListener('touchstart', handleInput, { passive: false })
    } else {
      canvas.addEventListener('mousedown', handleInput)
    }

    const preventScroll = (e: Event) => e.preventDefault()
    canvas.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      if (isTouchDevice) {
        canvas.removeEventListener('touchstart', handleInput)
      } else {
        canvas.removeEventListener('mousedown', handleInput)
      }
      canvas.removeEventListener('touchmove', preventScroll)
    }
  }, [handleTap])

  return (
    <div className="game-container w-full h-full flex items-center justify-center overflow-hidden rounded-[28px] bg-[#050816] px-2 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="game-canvas h-full max-h-[760px] w-full max-w-full touch-none select-none rounded-[28px] shadow-2xl"
        style={{ touchAction: 'none' }}
      />
    </div>
  )
}

export default Game
