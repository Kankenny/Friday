// Components
import { Outlet } from "react-router-dom"
import NavigationTabs from "./NavigationTabs"
import StyledButton from "../../../../ui/StyledButton"

const HomeLayout = () => {
  return (
    <div className="p-10 space-y-5">
      <NavigationTabs />{" "}
      <StyledButton buttonText="New Post" onClick={() => console.log("TEST")} />
      <div className="min-h-screen w-full flex">
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayout
