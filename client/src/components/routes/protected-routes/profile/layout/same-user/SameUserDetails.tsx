import { useTypedSelector } from "../../../../../../lib/hooks/redux-hook/useTypedSelector"
import Card from "../../../../../ui/Card"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
// import StyledButton from "../../../../../ui/StyledButton"
import { Link } from "react-router-dom"

const SameUserDetails = () => {
  const { username, email, firstName, lastName, followers, following } =
    useTypedSelector((state) => state.sameProfile)
  // const navigate = useNavigate()

  // const handleEditProfileClick = () => {
  //   navigate("/settings")
  // }

  return (
    <Card twClasses="p-5 flex flex-col gap-5 w-full">
      <div className="border-secondary border-b pb-5">
        <h1 className="text-xl font-bold">
          {firstName} {lastName}
        </h1>
        <h1 className="flex items-center gap-1">
          <span className="text-xs">@</span>
          <span className="underline">{username}</span>
        </h1>
        <h1 className="pb-5 text-sm font-extralight">{email}</h1>
        {/* <StyledButton
          onClick={handleEditProfileClick}
          buttonText="Edit profile"
          twClasses="w-full hover:scale-100 hover:bg-tertiary duration-200 hover:text-secondary border-2 border-secondary hover:border-secondary"
        /> */}
      </div>
      <div className="space-x-2">
        <PeopleAltOutlinedIcon />
        <Link to={`/users/${username}/followers`}>
          <span className="hover:text-tertiary duration-200 ease-in-out hover:underline">
            {followers.length} followers
          </span>
        </Link>
        <Link to={`/users/${username}/following`}>
          <span className="hover:text-tertiary duration-200 ease-in-out hover:underline">
            {following.length} following
          </span>
        </Link>
      </div>
    </Card>
  )
}

export default SameUserDetails
