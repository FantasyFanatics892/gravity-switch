import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          Ready to <span className="text-cyan-400">Flip Gravity</span> and Beat the Odds?
        </h2>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Join thousands of players competing for the top spot. Start your journey from zero to hero right now.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(auth.user ? '/game' : '/login')}
            className="min-w-48"
          >
            {auth.user ? 'Play Now' : 'Start Playing'}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/leaderboard')}
            className="min-w-48"
          >
            View Leaderboard
          </Button>
        </div>

        <p className="text-sm text-slate-500 pt-4">
          Free to play. No downloads required. Play instantly in your browser.
        </p>
      </div>
    </section>
  )
}
