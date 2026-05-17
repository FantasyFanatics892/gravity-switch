export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-slate-800 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Master the Art of <span className="text-cyan-400">Gravity Control</span>
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Gravity Switch is a fast-paced arcade game that tests your reflexes and timing. Flip gravity at the perfect moment to dodge obstacles and rack up points.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Join our growing community of competitive players. Climb the global leaderboard, unlock achievements, and prove you're the master of gravity.
          </p>

          {/* Key Points */}
          <ul className="space-y-3 pt-4">
            <li className="flex items-center gap-3 text-slate-300">
              <span className="text-cyan-400 font-bold">✓</span> One-tap controls, infinite skill ceiling
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <span className="text-cyan-400 font-bold">✓</span> Real-time global leaderboards
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <span className="text-cyan-400 font-bold">✓</span> Works on desktop and mobile
            </li>
          </ul>
        </div>

        {/* Right: Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
            <p className="text-4xl font-bold text-cyan-400">2024</p>
            <p className="text-slate-300 text-sm mt-2">Launched Year</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
            <p className="text-4xl font-bold text-cyan-400">∞ FPS</p>
            <p className="text-slate-300 text-sm mt-2">Smooth Gameplay</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
            <p className="text-4xl font-bold text-cyan-400">100%</p>
            <p className="text-slate-300 text-sm mt-2">Free to Play</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
            <p className="text-4xl font-bold text-cyan-400">Live</p>
            <p className="text-slate-300 text-sm mt-2">Leaderboards</p>
          </div>
        </div>
      </div>
    </section>
  )
}
