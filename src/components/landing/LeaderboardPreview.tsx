import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchLeaderboard } from '@/api/auth'
import { Button } from '@/components/ui/button'
import type { LeaderboardEntry } from '@/api/types'

export function LeaderboardPreview() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
      .then((res) => setEntries(res.data.slice(0, 5)))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="leaderboard" className="py-20 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Top <span className="text-cyan-400">Players</span>
          </h2>
          <p className="text-slate-400">See who's dominating the leaderboards</p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading leaderboard...</div>
          ) : entries.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No scores yet. Be the first!</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700 border-b border-slate-600">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Player</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const medal = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'
                  return (
                    <tr key={entry.rank} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="px-6 py-4 text-cyan-400 font-semibold">
                        {medal} #{entry.rank}
                      </td>
                      <td className="px-6 py-4 text-white">{entry.username}</td>
                      <td className="px-6 py-4 text-right text-cyan-400 font-semibold">
                        {entry.topScore}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button variant="outline" onClick={() => navigate('/leaderboard')}>
            View Full Leaderboard
          </Button>
        </div>
      </div>
    </section>
  )
}
