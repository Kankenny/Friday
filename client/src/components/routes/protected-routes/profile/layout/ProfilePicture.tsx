import { Avatar } from "@mui/material"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"

const ProfilePicture = () => {
  const { profilePicture, firstName } = useTypedSelector(
    (state) => state.profile
  )
  return (
    <Avatar
      className="h-64 w-64 cursor-pointer text-6xl hover:bg-secondary hover:text-tertiary hover:opacity-70 duration-200 ease-in-out capitalize"
      src={profilePicture}
    >
      {profilePicture ? "" : firstName.charAt(0)}
    </Avatar>
  )
}

export default ProfilePicture
