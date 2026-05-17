import { Navbar } from '@/components/landing/Navbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { AboutSection } from '@/components/landing/AboutSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { ScreenshotsSection } from '@/components/landing/ScreenshotsSection'
import { LeaderboardPreview } from '@/components/landing/LeaderboardPreview'
import { CommunitySection } from '@/components/landing/CommunitySection'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <LeaderboardPreview />
      <CommunitySection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default LandingPage
