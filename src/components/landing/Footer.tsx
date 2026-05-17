import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Gravity Switch</h3>
            <p className="text-sm text-slate-500">
              The ultimate skill-based arcade game. Flip gravity. Beat the odds. Claim your rank.
            </p>
          </div>

          {/* Game */}
          <div>
            <h4 className="text-white font-semibold mb-4">Game</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/game" className="hover:text-white transition">
                  Play Game
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-white transition">
                  Leaderboard
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  How to Play
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">© 2024 Gravity Switch. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition">
              Discord
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
