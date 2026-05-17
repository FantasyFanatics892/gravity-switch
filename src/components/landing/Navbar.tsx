import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const navigate = useNavigate()
  const auth = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-cyan-400 transition">
          Gravity Switch
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-300 hover:text-white transition text-sm">
            Features
          </a>
          <a href="#leaderboard" className="text-slate-300 hover:text-white transition text-sm">
            Leaderboard
          </a>
          <a href="#community" className="text-slate-300 hover:text-white transition text-sm">
            Community
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          {auth.user ? (
            <>
              <span className="text-sm text-slate-300">{auth.user.username}</span>
              <Button variant="primary" size="sm" onClick={() => navigate('/game')}>
                Play
              </Button>
            </>
          ) : (
            <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
              Play
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-4 space-y-3">
          <a href="#features" className="block text-slate-300 hover:text-white">
            Features
          </a>
          <a href="#leaderboard" className="block text-slate-300 hover:text-white">
            Leaderboard
          </a>
          <a href="#community" className="block text-slate-300 hover:text-white">
            Community
          </a>
        </div>
      )}
    </nav>
  )
}
