import { Link } from "react-router-dom"
import { useTypedSelector } from "../../../../../../lib/hooks/redux-hook/useTypedSelector"
import Card from "../../../../../ui/Card"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
import FollowAction from "../../../../../ui/user/FollowAction"
import BlockAction from "../../../../../ui/user/BlockAction"

const OtherUserDetails = () => {
  const { blocked } = useTypedSelector((state) => state.sameProfile)
  const user = useTypedSelector((state) => state.otherProfile)
  const { username, email, firstName, lastName, followers, following } = user

  const isBlocked = blocked.includes(user)

  return (
    <Card twClasses="p-5 flex flex-col gap-2 w-full">
      <div className="pb-5 border-b border-secondary">
        <h1 className="font-bold text-xl">
          {firstName} {lastName}
        </h1>
        <h1 className="flex items-center gap-1">
          <span className="text-xs">@</span>
          <span className="underline">{username}</span>
        </h1>
        <h1 className="font-extralight text-sm pb-5">{email}</h1>
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
      <div className="flex gap-2 mx-auto">
        {isBlocked && (
          <div>
            <FollowAction user={user} />
          </div>
        )}
        <div>
          <BlockAction user={user} />
        </div>
      </div>
    </Card>
  )
}

export default OtherUserDetails
