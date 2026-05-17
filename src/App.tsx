import './App.css'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { AuthPage, GamePage, LeaderboardPage, LandingPage } from './pages'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { cn } from '@/lib/utils'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth()

  if (auth.loading) {
    return <LoadingSpinner />
  }

  if (!auth.user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
      {children}
    </div>
  )
}

function AppShell() {
  const auth = useAuth()

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header - only show for authenticated users */}
      {auth.user && (
        <header className="border-b border-slate-700 px-4 py-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Gravity Switch</h1>
              <p className="text-sm text-slate-400">Player: {auth.user.username}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-400">Best Score</p>
                <p className="text-xl font-bold text-cyan-400">{auth.user.topScore}</p>
              </div>
              <Button variant="outline" size="sm" onClick={auth.logout}>
                Sign out
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Navigation - only show for authenticated users */}
      {auth.user && (
        <nav className="border-b border-slate-700 px-4 py-3 sm:px-6">
          <div className="max-w-7xl mx-auto flex gap-4">
            <NavLink
              to="/game"
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 rounded font-medium transition',
                  isActive ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
                )
              }
            >
              Play
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 rounded font-medium transition',
                  isActive ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
                )
              }
            >
              Leaderboard
            </NavLink>
          </div>
        </nav>
      )}

      {/* Main content */}
      <main className="flex-1">
        <Routes>
          {/* Landing page - visible to all */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth routes */}
          <Route
            path="/login"
            element={auth.user ? <Navigate to="/game" replace /> : <AuthLayout><AuthPage mode="login" /></AuthLayout>}
          />
          <Route
            path="/register"
            element={auth.user ? <Navigate to="/game" replace /> : <AuthLayout><AuthPage mode="register" /></AuthLayout>}
          />

          {/* Protected routes */}
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
                  <GamePage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
                  <LeaderboardPage />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Default redirect for authenticated users to game */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
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
