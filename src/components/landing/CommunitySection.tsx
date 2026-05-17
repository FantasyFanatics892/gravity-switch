export function CommunitySection() {
  return (
    <section id="community" className="py-20 px-4 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Our <span className="text-cyan-400">Community</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Connect with fellow players, share strategies, and stay updated on the latest news and updates.
          </p>
        </div>

        {/* Community Links */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Discord */}
          <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 hover:border-cyan-500/50 transition text-center">
            <p className="text-5xl mb-4">💬</p>
            <h3 className="text-xl font-semibold text-white mb-2">Discord Community</h3>
            <p className="text-slate-400 mb-6">Chat with players, get tips, and connect with the community.</p>
            <a
              href="#"
              className="inline-block px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
            >
              Join Discord
            </a>
          </div>

          {/* Twitter */}
          <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 hover:border-cyan-500/50 transition text-center">
            <p className="text-5xl mb-4">𝕏</p>
            <h3 className="text-xl font-semibold text-white mb-2">Follow Updates</h3>
            <p className="text-slate-400 mb-6">Get latest news, updates, and announcements on Twitter.</p>
            <a
              href="#"
              className="inline-block px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
            >
              Follow @GravitySwitch
            </a>
          </div>

          {/* Newsletter */}
          <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 hover:border-cyan-500/50 transition text-center">
            <p className="text-5xl mb-4">✉️</p>
            <h3 className="text-xl font-semibold text-white mb-2">Newsletter</h3>
            <p className="text-slate-400 mb-6">Subscribe for exclusive tips, events, and game updates.</p>
            <button className="px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-8 border border-slate-500">
          <h3 className="text-2xl font-bold text-white mb-4">🚀 What's Coming</h3>
          <div className="grid md:grid-cols-2 gap-6 text-slate-300">
            <div>
              <p className="font-semibold text-white mb-2">New Game Modes</p>
              <p>Multiplayer, time trials, and special challenges coming soon.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Mobile App</p>
              <p>Native iOS and Android apps for the ultimate portable experience.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Cosmetics & Rewards</p>
              <p>Customize your player profile with exclusive unlockables.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Global Tournaments</p>
              <p>Compete in official tournaments with cash prizes and glory.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
