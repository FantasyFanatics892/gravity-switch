import { useState } from 'react'
import { Game } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import { saveScore } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageContainer } from '@/components/PageContainer'

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
    <PageContainer>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        {/* Main game section */}
        <section className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Play Mode
              </Badge>
              <span className="text-xs text-white/50">Gravity Switch Challenge</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Keep climbing</h2>
            <p className="text-sm text-white/60 max-w-lg">
              Flip gravity, dodge hazards, and beat your best score. Your progress syncs automatically to the leaderboard.
            </p>
          </div>

          <Card variant="interactive" padding="md" className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">Best score</p>
                <p className="text-4xl font-bold text-accent-cyan mt-1">{topScore}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">Status</p>
                <p className="text-sm text-white/80 mt-1">{status}</p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div className="bg-dark-900/50 rounded-lg p-4">
              <Game initialHighScore={topScore} onGameOver={handleGameOver} />
            </div>
          </Card>
        </section>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Status card */}
          <Card padding="md">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">
                  Active
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Game Controls</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Keep your focus and touch or click anywhere inside the game area to flip gravity. The score updates after each obstacle you pass.
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="w-full"
                disabled={saving}
              >
                {saving ? 'Syncing...' : 'Syncing enabled'}
              </Button>
            </div>
          </Card>

          {/* Tips card */}
          <Card padding="md">
            <div className="space-y-3">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <span className="text-lg">💡</span> Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex gap-2">
                  <span className="text-accent-cyan flex-shrink-0">•</span>
                  <span>Keep rhythm with the obstacles and avoid panic flips.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-cyan flex-shrink-0">•</span>
                  <span>Tap or click once every few hundred milliseconds for control.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-cyan flex-shrink-0">•</span>
                  <span>Higher score means better leaderboard placement.</span>
                </li>
              </ul>
            </div>
          </Card>
        </aside>
      </div>
    </PageContainer>
  )
}

export default GamePage
