// Components
import { Outlet } from "react-router-dom"
import HomeNavigationTabs from "./HomeNavigationTabs"

const HomeLayout = () => {
  return (
    <div className="space-y-5 p-10">
      <HomeNavigationTabs />
      <div className="flex min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayout
