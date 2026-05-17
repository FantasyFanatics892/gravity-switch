import { useState } from 'react'
import { Game } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import { saveScore } from '@/api/auth'
import { Button } from '@/components/ui/button'

export function GamePage() {
  const auth = useAuth()
  const [topScore, setTopScore] = useState(auth.user?.topScore ?? 0)
  const [status, setStatus] = useState('Ready to play')
  const [saving, setSaving] = useState(false)

  const handleGameOver = async (score: number) => {
    setStatus(`Game over — ${score} points`)
    if (score <= topScore) {
      return
    }

    setSaving(true)
    try {
      const response = await saveScore(score)
      setTopScore(response.topScore)
      await auth.refreshUser()
      setStatus(`New record! ${response.topScore} points`)
    } catch {
      setStatus('Unable to save score. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Game info */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Play Game</h2>
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-slate-400">Best score: {topScore}</p>
          <p className="text-sm text-cyan-400">{status}</p>
        </div>
      </div>

      {/* Game area */}
      <div className="border border-slate-700 rounded bg-slate-800 p-4">
        <Game initialHighScore={topScore} onGameOver={handleGameOver} />
      </div>

      {/* Controls and tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-white mb-2">How to play</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Click or tap the game area to flip gravity. Dodge hazards and beat your best score. Progress syncs automatically.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            disabled={saving}
          >
            {saving ? 'Syncing...' : 'Syncing enabled'}
          </Button>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Tips</h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li>Keep rhythm with obstacles</li>
            <li>Avoid panic flips</li>
            <li>Higher scores rank better</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GamePage
