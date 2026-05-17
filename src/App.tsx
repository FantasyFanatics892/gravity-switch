import './App.css'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { GamePage, LeaderboardPage } from './pages'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function AppShell() {
  const auth = useAuth()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(93,227,255,0.16),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.18),_transparent_36%),linear-gradient(180deg,#050816_0%,#090d1f_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-slate-950/85 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-game-player">Gravity Switch</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Play, compete, and climb the leaderboard</h1>
          </div>

          <div className="grid gap-3 sm:auto-cols-min sm:grid-flow-col sm:items-center">
            <div className="rounded-3xl bg-slate-900/90 px-4 py-3 shadow-sm ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Player</p>
              <p className="mt-2 text-lg font-semibold text-white">{auth.user?.username}</p>
              <p className="mt-1 text-sm text-slate-400">Top score: {auth.user?.topScore}</p>
            </div>
            <Button variant="outline" onClick={auth.logout}>Sign out</Button>
          </div>
        </header>

        <nav className="grid grid-cols-2 gap-3 rounded-[28px] border border-white/10 bg-slate-950/85 p-4 shadow-inner sm:grid-cols-3">
          <NavLink
            to="/play"
            className={({ isActive }) =>
              cn(
                'rounded-2xl px-4 py-3 text-center text-sm font-semibold transition',
                isActive ? 'bg-game-player text-slate-950 shadow-[0_20px_50px_-30px_rgba(93,227,255,0.9)]' : 'bg-white/5 text-slate-200 hover:bg-white/10',
              )
            }
          >
            Play
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              cn(
                'rounded-2xl px-4 py-3 text-center text-sm font-semibold transition',
                isActive ? 'bg-game-player text-slate-950 shadow-[0_20px_50px_-30px_rgba(93,227,255,0.9)]' : 'bg-white/5 text-slate-200 hover:bg-white/10',
              )
            }
          >
            Leaderboard
          </NavLink>
          <div className="hidden rounded-2xl bg-white/5 px-4 py-3 text-center text-sm text-slate-300 sm:block">
            Game stats stay synced with the local database backend.
          </div>
        </nav>

        <main className="flex-1">
          <Routes>
            <Route path="/play" element={<GamePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<Navigate to="/play" replace />} />
          </Routes>
        </main>
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
