import { Link } from "react-router-dom"

// I opted to use a Link component instead of RouterLink to further customize the Lets Get Started button"

const LetsGetStarted = () => {
  return (
    <div className="bg-secondary align-center flex justify-center border-b border-b-white p-32">
      <Link
        to="/app"
        className="bg-tertiary text-primary text-main hover:text-secondary rounded-md px-10 py-4 text-3xl font-bold duration-200 ease-in-out hover:scale-105"
      >
        Let's Get Started
      </Link>
    </div>
  )
}
export default LetsGetStarted
