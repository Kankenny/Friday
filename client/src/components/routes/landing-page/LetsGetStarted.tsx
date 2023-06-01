import { Link } from "react-router-dom"

// I opted to use a Link component instead of RouterLink to further customize the Lets Get Started button"

const LetsGetStarted = () => {
  return (
    <div className="bg-secondary flex justify-center align-center p-32 border-b border-b-white">
      <Link
        to="/app"
        className="px-10 py-4 bg-tertiary rounded-md text-3xl hover:scale-105 duration-200 ease-in-out text-primary font-bold text-main hover:text-secondary"
      >
        Let's Get Started
      </Link>
    </div>
  )
}
export default LetsGetStarted
