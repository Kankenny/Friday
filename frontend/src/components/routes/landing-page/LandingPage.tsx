import FAQ from "./FAQ";
import Features from "./Features";
import Headline from "./Headline";
import LetsGetStarted from "./LetsGetStarted";

const LandingPage = () => {
  return (
    <div className="text-secondary py-4 space-y-4">
      <Headline />
      <Features />
      <FAQ />
      <LetsGetStarted />
    </div>
  );
};

export default LandingPage;
