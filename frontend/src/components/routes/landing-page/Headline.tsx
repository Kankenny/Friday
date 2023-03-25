import RouterLink from "../../ui/RouterLink"

const subhead = "The next best task management application"
let head = "A Better Day Than "

const Headline = () => {
  const date = new Date()
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" })

  if (dayOfWeek === "Friday") {
    head = "The best day, "
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mx-auto h-full text-center md:text-left">
      <div className="bg-white p-16 space-y-10">
        <h1 className="text-tertiary text-7xl font-bold">
          {head}
          {dayOfWeek}
        </h1>
        <p className="text-gray-500 text-xl">{subhead}</p>
        <RouterLink
          routerLinkText="Let's Get Started"
          to="/app"
          twClasses="block md:inline-block bg-secondary px-10 py-4 rounded-md text-3xl"
        />
      </div>
      <div className="w-2/5 min-w-max">
        <img src="/to-do.gif" alt="to-do gif" className="ml-auto" />
      </div>
    </div>
  )
}

export default Headline
