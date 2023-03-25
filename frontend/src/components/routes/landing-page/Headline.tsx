import RouterLink from "../../ui/RouterLink"

const subhead = "The next best task management application"
const head = "A Better Day Than "
const days = ["Monday", "Tuesday", "Wednesday", "Thursday"]

const Headline = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mx-auto h-full text-center md:text-left">
      <div className="bg-white p-16 ">
        <h1 className="text-tertiary text-6xl font-bold mb-8">
          {head}
          {days[0]}
        </h1>
        <p className="text-gray-500 text-xl mb-10">{subhead}</p>
        <RouterLink
          routerLinkText="Let's Get Started"
          to="/app"
          twClasses="bg-secondary px-10 py-4 rounded-md text-3xl"
        />
      </div>
      <div className="w-2/5">
        <img src="/to-do.gif" alt="to-do gif" className="ml-auto" />
      </div>
    </div>
  )
}

export default Headline
