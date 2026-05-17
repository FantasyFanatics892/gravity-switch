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

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div className="text-red-400 text-center py-8">{error}</div>
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white mb-2">No scores yet</p>
        <p className="text-slate-400 text-sm">Play the game to appear on the leaderboard</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Leaderboard</h2>

      {/* Table */}
      <div className="border border-slate-700 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700">
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Player</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-slate-300">Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const isCurrent = currentUsername === entry.username
              const medal = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : ''

              return (
                <tr
                  key={`${entry.username}-${entry.rank}`}
                  className={`border-b border-slate-700 last:border-0 ${
                    isCurrent ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <td className="px-4 py-3 text-sm">
                    {medal ? <span className="text-lg">{medal}</span> : <span className="text-slate-400">#{entry.rank}</span>}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="text-white font-medium">{entry.username}</span>
                    {isCurrent && <span className="text-cyan-400 text-xs ml-2">(You)</span>}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-cyan-400">
                    {entry.topScore}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaderboardPage
