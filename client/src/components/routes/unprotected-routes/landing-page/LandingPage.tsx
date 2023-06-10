import FAQ from "./FAQ"
import Features from "./Features"
import Headline from "./Headline"
import LetsGetStarted from "./LetsGetStarted"
import MissionVision from "./MissionVision"

const LandingPage = () => {
  return (
    <div className="text-secondary space-y-10">
      <Headline />
      <Features />
      <MissionVision />
      <FAQ />
      <LetsGetStarted />
    </div>
  )
}

export default LandingPage
