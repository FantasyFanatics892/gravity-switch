import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-20 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Gravity <span className="text-cyan-400">Switch</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto">
          Flip gravity, dodge hazards, and compete against players worldwide in the ultimate skill-based arcade game.
        </p>

        {/* Description */}
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Fast-paced gameplay. Real-time leaderboards. Simple controls, endless challenge. Play now and claim your spot at the top.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(auth.user ? '/game' : '/login')}
            className="min-w-48"
          >
            {auth.user ? 'Play Game' : 'Play Now'}
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-700">
          <div>
            <p className="text-3xl font-bold text-cyan-400">1000+</p>
            <p className="text-slate-400 text-sm">Games Played</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-400">50+</p>
            <p className="text-slate-400 text-sm">Top Players</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-400">∞</p>
            <p className="text-slate-400 text-sm">Challenge</p>
          </div>
        </div>
      </div>
    </div>
  )
}
