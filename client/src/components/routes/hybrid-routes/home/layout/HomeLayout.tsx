// Components
import { Outlet } from "react-router-dom"
import NavigationTabs from "./NavigationTabs"

const HomeLayout = () => {
  return (
    <div className="p-10">
      <NavigationTabs />
      <div className="min-h-screen w-full flex">
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayout
