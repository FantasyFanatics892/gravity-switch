import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { fetchLeaderboard } from '@/api/auth'
import type { LeaderboardEntry } from '@/api/types'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Card } from '@/components/ui/Card'
import { Trophy } from '@/components/Trophy'
import { Badge } from '@/components/ui/Badge'
import { PageContainer } from '@/components/PageContainer'

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
  const currentUserEntry = entries.find((e) => e.username === currentUsername)

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              Global Ranking
            </Badge>
            <span className="text-xs text-white/50">Top 50 Players</span>
          </div>
          <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
          <p className="text-white/60 max-w-2xl">
            Global ranking sorted by best recorded score. Track your position and see how you stack up against the competition.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <Card padding="lg" className="flex items-center justify-center min-h-96">
            <div className="text-center space-y-4">
              <div className="inline-block">
                <LoadingSpinner />
              </div>
              <p className="text-white/60">Loading leaderboard...</p>
            </div>
          </Card>
        )}

        {/* Error state */}
        {error && !loading && (
          <Card padding="lg" className="border-red-500/30 bg-red-500/10">
            <div className="flex items-center gap-3">
              <span className="text-red-400 text-2xl">⚠️</span>
              <p className="text-red-200">{error}</p>
            </div>
          </Card>
        )}

        {/* Empty state */}
        {!loading && !error && entries.length === 0 && (
          <Card padding="lg" className="text-center space-y-4">
            <p className="text-xl text-white">No scores yet</p>
            <p className="text-white/60">
              Play the game and get a high score to appear on the leaderboard!
            </p>
          </Card>
        )}

        {/* Leaderboard list */}
        {!loading && !error && entries.length > 0 && (
          <div className="space-y-3">
            {/* Your rank highlight */}
            {currentUserEntry && (
              <div className="mb-6 p-4 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30">
                <p className="text-xs uppercase tracking-wider text-accent-cyan/60 font-medium mb-2">
                  Your current position
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Trophy rank={currentUserEntry.rank} isCurrentUser={true} />
                    <div>
                      <p className="font-semibold text-white text-lg">Rank #{currentUserEntry.rank}</p>
                      <p className="text-sm text-white/60">{currentUserEntry.username}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-accent-cyan">{currentUserEntry.topScore}</p>
                </div>
              </div>
            )}

            {/* Entries list */}
            <div className="space-y-2">
              {entries.map((entry) => {
                const isCurrent = currentUsername === entry.username
                return (
                  <Card
                    key={`${entry.username}-${entry.rank}`}
                    variant={isCurrent ? 'default' : 'interactive'}
                    padding="md"
                    className={isCurrent ? 'ring-2 ring-accent-cyan/50' : ''}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <Trophy rank={entry.rank} isCurrentUser={isCurrent} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-white truncate">{entry.username}</p>
                            {isCurrent && (
                              <Badge variant="success" size="sm">
                                You
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-white/50">Rank #{entry.rank}</p>
                        </div>
                      </div>
                      <p className="font-bold text-accent-cyan text-lg flex-shrink-0">{entry.topScore}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  )
}

export default LeaderboardPage
