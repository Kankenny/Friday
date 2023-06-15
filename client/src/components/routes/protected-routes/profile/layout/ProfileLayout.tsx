// Components
import { Outlet, useParams } from "react-router-dom"
import SameUserPFP from "./same-user/profile-picture/SameUserPFP"
import SameUserDetails from "./same-user/SameUserDetails"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import OtherUserPFP from "./other-user/profile-picture/OtherUserPFP"
import OtherUserDetails from "./other-user/OtherUserDetails"

const ProfileLayout = () => {
  const { username: currentUsername } = useTypedSelector(
    (state) => state.sameProfile
  )
  const { username: pathUsername } = useParams()
  const isSameUser = currentUsername === pathUsername

  const PFP = isSameUser ? <SameUserPFP /> : <OtherUserPFP />
  const UserDetails = isSameUser ? <SameUserDetails /> : <OtherUserDetails />

  return (
    <div className="flex px-10">
      <div className="min-h-screen w-[20.2em] max-w-[20.2em] min-w-[20.2em] flex-col mr-5 p-5 space-y-5">
        {PFP}
        {UserDetails}
      </div>
      <div className="min-h-screen w-full flex">
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileLayout
