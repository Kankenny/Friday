import { useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Alert from "../../../../ui/mui/Alert"
import UserCard from "../../../../ui/user/UserCard"

const Followers = () => {
  const { username: currentUsername, followers: currentFollowers } =
    useTypedSelector((state) => state.sameProfile)
  const { followers: otherFollowers } = useTypedSelector(
    (state) => state.otherProfile
  )
  const { username: pathUsername } = useParams()
  const isSameUser = currentUsername === pathUsername
  console.log(otherFollowers)
  const followers = isSameUser ? currentFollowers : otherFollowers

  return followers.length !== 0 ? (
    <ul className="w-full">
      {followers.map((follower) => (
        <UserCard user={follower} />
      ))}
    </ul>
  ) : (
    <div className="w-full">
      <Alert message="User has no followers" severity="error" />
    </div>
  )
}

export default Followers
