import './App.css'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { GamePage, LeaderboardPage } from './pages'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

function AppShell() {
  const auth = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent-cyan/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="animate-fade-in">
          <Card padding="lg" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="space-y-3">
                <Badge variant="primary" size="sm">
                  Gravity Switch
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  Play, compete,<br className="hidden sm:block" /> climb the ranks
                </h1>
                <p className="text-white/60 max-w-sm">
                  Join players worldwide and prove you&apos;re the best at dodging gravity.
                </p>
              </div>

              {/* Player info section */}
              <div className="flex flex-col sm:items-end gap-4">
                <div className="card-base p-4 w-full sm:w-auto">
                  <p className="text-xs uppercase tracking-wider text-white/50 font-medium">Player</p>
                  <p className="mt-2 text-2xl font-bold text-accent-cyan">{auth.user?.username}</p>
                  <p className="mt-1 text-sm text-white/60">Best: {auth.user?.topScore} points</p>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  onClick={auth.logout}
                  className="touch-target"
                >
                  Sign out
                </Button>
              </div>
            </div>
          </Card>
        </header>

        {/* Navigation tabs */}
        <nav className="flex gap-2 rounded-lg bg-dark-800/50 border border-white/10 p-1">
          <NavLink
            to="/play"
            className={({ isActive }) =>
              cn(
                'flex-1 px-4 py-3 rounded-md font-medium transition-all duration-200 text-center',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan',
                isActive
                  ? 'bg-accent-cyan text-dark-900 shadow-glow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/10',
              )
            }
          >
            🎮 Play
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              cn(
                'flex-1 px-4 py-3 rounded-md font-medium transition-all duration-200 text-center',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan',
                isActive
                  ? 'bg-accent-cyan text-dark-900 shadow-glow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/10',
              )
            }
          >
            🏆 Leaderboard
          </NavLink>
          <div className="hidden sm:flex items-center px-4 py-3 text-xs text-white/40 font-medium">
            All scores synced in real-time
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/play" element={<GamePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<Navigate to="/play" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-6 pb-4 text-center text-xs text-white/40">
          <p>Gravity Switch • Built with precision and passion</p>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}

export default App
