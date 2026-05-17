import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { fetchLeaderboard } from '@/api/auth'
import type { LeaderboardEntry } from '@/api/types'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function LeaderboardPage() {
  const auth = useAuth()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchLeaderboard()
      .then((response) => setEntries(response.data))
      .catch(() => setError('Unable to load leaderboard.'))
      .finally(() => setLoading(false))
  }, [])

  const currentUsername = auth.user?.username

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-game-player">Leaderboard</p>
          <h2 className="text-3xl font-semibold text-white">Top 50 players</h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Global ranking is sorted by best recorded score. Your current position is highlighted so you can track progress.
          </p>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-4 shadow-2xl backdrop-blur">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">{error}</div>
        ) : entries.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300">
            No players have saved scores yet. Play the game and submit a new high score to appear here.
          </div>
        ) : (
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#09111d]/90 shadow-inner">
            <div className="hidden grid-cols-[72px_1fr_120px] items-center gap-4 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.3em] text-slate-500 sm:grid">
              <span>Rank</span>
              <span>Player</span>
              <span>Top score</span>
            </div>

            <div className="divide-y divide-white/5">
              {entries.map((entry) => {
                const isCurrent = currentUsername === entry.username
                return (
                  <div
                    key={`${entry.username}-${entry.rank}`}
                    className={`flex flex-col gap-3 px-5 py-4 sm:grid sm:grid-cols-[72px_1fr_120px] sm:items-center sm:gap-0 ${
                      isCurrent ? 'bg-game-player/10 text-white' : 'bg-transparent text-slate-200'
                    }`}
                  >
                    <span className="text-lg font-semibold">#{entry.rank}</span>
                    <div className="space-y-1">
                      <p className="font-semibold">{entry.username}</p>
                      {isCurrent && <p className="text-xs uppercase tracking-[0.3em] text-game-player">Your position</p>}
                    </div>
                    <span className="font-semibold text-game-player sm:text-right">{entry.topScore}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default LeaderboardPage
