import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'

export function AuthPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!auth.loading && auth.user) {
      navigate('/play', { replace: true })
    }
  }, [auth.user, auth.loading, navigate])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      if (mode === 'register') {
        await auth.register(username, password)
      } else {
        await auth.login(username, password)
      }
      navigate('/play', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to authenticate.')
    } finally {
      setSubmitting(false)
    }
  }

  if (auth.loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-game-bg px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-[32px] border border-white/10 bg-slate-950/90 p-8 shadow-2xl backdrop-blur">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.36em] text-game-player">Local auth backend</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">{mode === 'register' ? 'Create account' : 'Welcome back'}</h1>
          <p className="text-sm text-slate-400">
            Use a username and password to sign in. Your account and top score are stored in the local SQLite backend.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={mode === 'login' ? 'default' : 'outline'}
            size="lg"
            type="button"
            onClick={() => {
              setMode('login')
              setError(null)
            }}
          >
            Sign in
          </Button>
          <Button
            variant={mode === 'register' ? 'default' : 'outline'}
            size="lg"
            type="button"
            onClick={() => {
              setMode('register')
              setError(null)
            }}
          >
            Register
          </Button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-200">
            <span>Username</span>
            <input
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-game-player"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Choose a username"
              required
              minLength={3}
            />
          </label>

          <label className="block text-sm text-slate-200">
            <span>Password</span>
            <input
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-game-player"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter a secure password"
              type="password"
              required
              minLength={6}
            />
          </label>

          {error && <p className="rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? 'Working...' : mode === 'register' ? 'Create account' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500">
          For school demos only: the backend runs locally and stores your account in an on-disk SQLite database.
        </p>
      </div>
    </div>
  )
}

export default AuthPage
