import StyledLink from "../../ui/StyledLink"
import FAQ from "./FAQ"
import Features from "./Features"
import Headline from "./Headline"
import LetsGetStarted from "./LetsGetStarted"
import MissionVision from "./MissionVision"

const LandingPage = () => {
  return (
    <div className="text-secondary py-4 space-y-10">
      <StyledLink
        href="https://mddlknntt.monday.com/boards/4007785360/pulses/4086640487"
        linkText="Templates can be seen here in the Files section of the subtask"
        target="_blank"
        rel="noopener noreferrer"
      />
      <Headline />
      <Features />
      <MissionVision />
      <FAQ />
      <LetsGetStarted />
    </div>
  )
}

export default LandingPage
