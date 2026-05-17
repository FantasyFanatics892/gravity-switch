import { useState } from 'react'
import { Game } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import { saveScore } from '@/api/auth'
import { Button } from '@/components/ui/button'

export function GamePage() {
  const auth = useAuth()
  const [topScore, setTopScore] = useState(auth.user?.topScore ?? 0)
  const [status, setStatus] = useState('Tap the game area or press space to start')
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
      setStatus('Unable to save score. Try again after refresh.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
      <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-5 shadow-2xl backdrop-blur">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-game-player">Play mode</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Gravity switch challenge</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Flip gravity, dodge hazards, and try to beat your own best score. Higher scores sync automatically to the leaderboard.
            </p>
          </div>
          <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200">
            <span className="block text-slate-400">Best score</span>
            <span className="mt-1 block text-lg font-semibold text-white">{topScore}</span>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[#09111d]/90 p-4 shadow-inner">
          <Game initialHighScore={topScore} onGameOver={handleGameOver} />
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-5 shadow-2xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-game-player">Status</p>
          <p className="mt-4 text-lg font-semibold text-white">{status}</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Keep your focus and touch or click anywhere inside the game area to flip gravity. The score updates after each obstacle you pass.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-6 w-full"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Score syncing enabled'}
          </Button>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-5 shadow-2xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-game-player">Quick tips</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>• Keep rhythm with the obstacles and avoid panic flips.</li>
            <li>• Tap or click only once every few hundred milliseconds for better control.</li>
            <li>• Higher score means better leaderboard placement.</li>
          </ul>
        </section>
      </aside>
    </div>
  )
}

export default GamePage
