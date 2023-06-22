import { useTypedSelector } from "../../../../../../lib/hooks/redux-hook/useTypedSelector"
import Card from "../../../../../ui/Card"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
import StyledButton from "../../../../../ui/StyledButton"
import { Link, useNavigate } from "react-router-dom"

const SameUserDetails = () => {
  const { username, email, firstName, lastName, followers, following } =
    useTypedSelector((state) => state.sameProfile)
  const navigate = useNavigate()

  const handleEditProfileClick = () => {
    navigate("/settings")
  }

  return (
    <Card twClasses="p-5 flex flex-col gap-5 w-full">
      <div className="pb-5 border-b border-secondary">
        <h1 className="font-bold text-xl">
          {firstName} {lastName}
        </h1>
        <h1 className="flex items-center gap-1">
          <span className="text-xs">@</span>
          <span className="underline">{username}</span>
        </h1>
        <h1 className="font-extralight text-sm pb-5">{email}</h1>
        <StyledButton
          onClick={handleEditProfileClick}
          buttonText="Edit profile"
          twClasses="w-full hover:scale-100 hover:bg-tertiary duration-200 hover:text-secondary border-2 border-secondary hover:border-secondary"
        />
      </div>
      <div className="space-x-2">
        <PeopleAltOutlinedIcon />
        <Link to={`/users/${username}/followers`}>
          <span className="hover:text-tertiary hover:underline duration-200 ease-in-out">
            {followers.length} followers
          </span>
        </Link>
        <Link to={`/users/${username}/following`}>
          <span className="hover:text-tertiary hover:underline duration-200 ease-in-out">
            {following.length} following
          </span>
        </Link>
      </div>
    </Card>
  )
}

export default SameUserDetails
