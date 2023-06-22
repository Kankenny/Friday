import { useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
// import Followed from "./Followed"
import Alert from "../../../../ui/mui/Alert"
import UserCard from "../../../../ui/user/UserCard"

const Blocked = () => {
  const { username: currentUsername, blocked: currentBlocked } =
    useTypedSelector((state) => state.sameProfile)
  const { blocked: otherBlocked } = useTypedSelector(
    (state) => state.otherProfile
  )
  const { username: pathUsername } = useParams()
  const isSameUser = currentUsername === pathUsername

  const blockedUsers = isSameUser ? currentBlocked : otherBlocked

  return blockedUsers.length !== 0 ? (
    <ul className="w-full">
      {blockedUsers.map((user) => (
        <UserCard user={user} toFollow={false} />
      ))}
    </ul>
  ) : (
    <div className="w-full">
      <Alert
        message="You don't have any other blocked users"
        severity="success"
      />
    </div>
  )
}

export default Blocked
