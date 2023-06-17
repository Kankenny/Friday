// Components
import { Outlet } from "react-router-dom"
import HomeNavigationTabs from "./HomeNavigationTabs"

const HomeLayout = () => {
  return (
    <div className="p-10 space-y-5">
      <HomeNavigationTabs />
      <div className="min-h-screen w-full flex">
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayout
