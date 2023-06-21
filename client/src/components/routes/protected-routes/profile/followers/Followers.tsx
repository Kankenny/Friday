import { useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"

const Followers = () => {
  const { username: currentUsername } = useTypedSelector(
    (state) => state.sameProfile
  )
  const { username: pathUsername } = useParams()
  const isSameUser = currentUsername === pathUsername

  const followers = isSameUser ? <div>T</div> : <div>K</div>
  return <div>{followers}</div>
}

export default Followers
