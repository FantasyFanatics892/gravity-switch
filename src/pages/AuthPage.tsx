import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'

export function AuthPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!auth.loading && auth.user) {
      navigate('/play', { replace: true })
    }
  }, [auth.user, auth.loading, navigate])

  const validateForm = () => {
    let isValid = true
    setUsernameError(null)
    setPasswordError(null)

    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters')
      isValid = false
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      isValid = false
    }
    return isValid
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!validateForm()) return

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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 px-4 py-8 sm:px-6 lg:px-8">
      {/* Decorative background element */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-md flex-col gap-6">
        {/* Header */}
        <div className="space-y-4 text-center animate-fade-in">
          <div className="flex justify-center mb-2">
            <Badge variant="primary" size="sm">
              Gravity Switch
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-white">
            {mode === 'register' ? 'Create account' : 'Welcome back'}
          </h1>
          <p className="text-white/60 max-w-sm mx-auto">
            {mode === 'register'
              ? 'Join the leaderboard and start climbing the ranks'
              : 'Sign in to continue your gaming journey'}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setMode('login')
              setError(null)
              setUsernameError(null)
              setPasswordError(null)
            }}
            className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              mode === 'login'
                ? 'bg-accent-cyan text-dark-900 shadow-glow-md'
                : 'bg-dark-700 text-white border border-white/20 hover:border-accent-cyan/50'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register')
              setError(null)
              setUsernameError(null)
              setPasswordError(null)
            }}
            className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              mode === 'register'
                ? 'bg-accent-cyan text-dark-900 shadow-glow-md'
                : 'bg-dark-700 text-white border border-white/20 hover:border-accent-cyan/50'
            }`}
          >
            Register
          </button>
        </div>

        {/* Auth card */}
        <div className="card-base p-8 animate-slide-up">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              minLength={3}
              required
              disabled={submitting}
            />

            <Input
              label="Password"
              placeholder="Enter a secure password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              minLength={6}
              required
              disabled={submitting}
            />

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 animate-slide-down">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={submitting}
              disabled={submitting}
            >
              {mode === 'register' ? 'Create account' : 'Sign in'}
            </Button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-white/50 leading-relaxed">
          Local SQLite backend. Your account and scores are stored securely on-disk.
        </p>
      </div>
    </div>
  )
}

export default AuthPage
