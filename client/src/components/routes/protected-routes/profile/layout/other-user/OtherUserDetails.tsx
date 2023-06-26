import { Link, useLocation } from "react-router-dom"
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
  const { pathname } = useLocation()
  const isInFollowersPath =
    pathname.includes("followers") || pathname.includes("following")

  return (
    <Card twClasses="p-5 flex flex-col gap-2 w-full">
      <div className="border-secondary border-b pb-5">
        <h1 className="text-xl font-bold">
          {firstName} {lastName}
        </h1>
        <h1 className="flex items-center gap-1">
          <span className="text-xs">@</span>
          <span className="underline">{username}</span>
        </h1>
        <h1 className="pb-5 text-sm font-extralight">{email}</h1>
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
      {!isInFollowersPath && (
        <div className="mx-auto flex gap-2">
          {!isBlocked && (
            <div>
              <FollowAction user={user} />
            </div>
          )}
          <div>
            <BlockAction user={user} />
          </div>
        </div>
      )}
    </Card>
  )
}

export default OtherUserDetails
