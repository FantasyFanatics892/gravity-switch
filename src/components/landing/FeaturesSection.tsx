export function FeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: 'Fast-Paced Action',
      description: 'Adrenaline-pumping gameplay that keeps you on the edge of your seat every second.',
    },
    {
      icon: '🎯',
      title: 'Skill-Based Challenge',
      description: 'Master the mechanics and climb the ranks. Pure skill determines who reaches the top.',
    },
    {
      icon: '🏆',
      title: 'Global Leaderboards',
      description: 'Compete in real-time against players worldwide. See your rank and climb the ladder.',
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Play seamlessly on desktop or mobile. One-tap controls work perfectly everywhere.',
    },
    {
      icon: '🔄',
      title: 'Gravity Flip',
      description: 'The core mechanic: flip gravity at precisely the right moment to survive.',
    },
    {
      icon: '👥',
      title: 'Community Driven',
      description: 'Join a passionate community of players, share tips, and compete together.',
    },
  ]

  return (
    <section id="features" className="py-20 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Players Love <span className="text-cyan-400">Gravity Switch</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A perfectly balanced combination of simple mechanics and endless challenge.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200"
            >
              <p className="text-4xl mb-4">{feature.icon}</p>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
