import { useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"

const Followers = () => {
  const { username: currentUsername, followers: currentFollowers } =
    useTypedSelector((state) => state.sameProfile)
  const { followers: otherFollowers } = useTypedSelector(
    (state) => state.otherProfile
  )
  const { username: pathUsername } = useParams()
  const isSameUser = currentUsername === pathUsername

  const followers = isSameUser ? currentFollowers : otherFollowers
  return <div>{followers}</div>
}

export default Followers
