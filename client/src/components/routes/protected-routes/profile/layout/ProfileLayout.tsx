// Components
import { Outlet, useParams } from "react-router-dom"
import SameUserPFP from "./same-user/profile-picture/SameUserPFP"
import SameUserDetails from "./same-user/SameUserDetails"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import OtherUserPFP from "./other-user/profile-picture/OtherUserPFP"
import OtherUserDetails from "./other-user/OtherUserDetails"
import { useEffect, useState } from "react"
import { isAxiosError } from "axios"
import userAPI from "../../../../../lib/services/axios-instances/userAPI"
import { useDispatch } from "react-redux"
import { setOtherUserDetails } from "../../../../../lib/store/slices/other-profile-slice/otherProfileSlice"
import ProfileNavigationTabs from "./ProfileNavigationTabs"

const ProfileLayout = () => {
  const dispatch = useDispatch()
  const [, setError] = useState("")
  const { username: currentUsername } = useTypedSelector(
    (state) => state.sameProfile
  )
  const { username: pathUsername } = useParams()
  const isSameUser = currentUsername === pathUsername

  const PFP = isSameUser ? <SameUserPFP /> : <OtherUserPFP />
  const UserDetails = isSameUser ? <SameUserDetails /> : <OtherUserDetails />

  useEffect(() => {
    const fetchOtherUserDetails = async () => {
      try {
        const { data } = await userAPI.get(`/${pathUsername}`)
        dispatch(setOtherUserDetails(data.data))
        setError("")
      } catch (err) {
        if (isAxiosError(err)) {
          console.error(err)
          setError(err.message)
        }
      }
    }

    if (!isSameUser) {
      fetchOtherUserDetails()
    }
  }, [pathUsername, isSameUser, dispatch])

  return (
    <div className="flex px-10">
      <div className="min-h-screen w-[20.2em] max-w-[20.2em] min-w-[20.2em] flex-col mr-5 p-5 space-y-5">
        {PFP}
        {UserDetails}
      </div>
      <div className="w-full space-y-10 py-5">
        <ProfileNavigationTabs />
        <div className="min-h-screen flex">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
