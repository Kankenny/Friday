import { useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
// import Followed from "./Followed"
import Alert from "../../../../ui/mui/Alert"

const Following = () => {
  const { username: currentUsername, following: currentFollowing } =
    useTypedSelector((state) => state.sameProfile)
  const { following: otherFollowing } = useTypedSelector(
    (state) => state.otherProfile
  )
  const { username: pathUsername } = useParams()
  const isSameUser = currentUsername === pathUsername

  const followed = isSameUser ? currentFollowing : otherFollowing

  return followed.length !== 0 ? (
    <ul className="w-full">
      {/* {following.map((follower) => (
        <Follower follower={follower} />
      ))} */}
    </ul>
  ) : (
    <div className="w-full">
      <Alert message="User does not follow any other users" severity="error" />
    </div>
  )
}

export default Following
Following
