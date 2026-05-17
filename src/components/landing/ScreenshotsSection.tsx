import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export function ScreenshotsSection() {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <section className="py-20 px-4 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            See It In <span className="text-cyan-400">Action</span>
          </h2>
          <p className="text-slate-400">Experience the gameplay that's captivating players worldwide</p>
        </div>

        {/* Game Preview Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Main Preview */}
          <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden aspect-video flex items-center justify-center hover:border-cyan-500/50 transition">
            <div className="text-center">
              <p className="text-cyan-400 text-lg">🎮</p>
              <p className="text-slate-400 text-sm mt-2">Game Preview</p>
              <p className="text-slate-500 text-xs mt-1">Play to see live gameplay</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Pure Arcade Experience</h3>
              <p className="text-slate-300 leading-relaxed">
                Gravity Switch brings back the essence of classic arcade games with modern polish. Simple controls, fast action, and endless challenge.
              </p>
              <ul className="space-y-2 text-slate-400">
                <li>✓ Instant feedback and responsiveness</li>
                <li>✓ Progressive difficulty scaling</li>
                <li>✓ Smooth 60 FPS gameplay</li>
              </ul>
            </div>

            <Button
              variant="primary"
              onClick={() => navigate(auth.user ? '/game' : '/login')}
              className="w-full"
            >
              Play Now
            </Button>
          </div>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-lg border border-slate-700 aspect-square flex items-center justify-center hover:border-cyan-500/50 transition cursor-pointer"
            >
              <div className="text-center">
                <p className="text-cyan-400 text-2xl">#{i}</p>
                <p className="text-slate-500 text-xs mt-2">Screenshot</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
