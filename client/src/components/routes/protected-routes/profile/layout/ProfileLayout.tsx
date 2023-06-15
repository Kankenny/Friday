// Components
import { Outlet } from "react-router-dom"
import SameUserPFP from "./same-user/profile-picture/SameUserPFP"
import SameUserDetails from "./same-user/SameUserDetails"

const ProfileLayout = () => {
  return (
    <div className="flex px-10">
      <div className="min-h-screen w-[20.2em] max-w-[20.2em] min-w-[20.2em] flex-col mr-5 p-5 space-y-5">
        <SameUserPFP />
        <SameUserDetails />
      </div>
      <div className="min-h-screen w-full flex">
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileLayout
