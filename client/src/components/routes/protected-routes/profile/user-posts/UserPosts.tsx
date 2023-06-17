import { useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"

const UserPosts = () => {
  const { username } = useParams()
  const { username: currentlyAuthUsername } = useTypedSelector(
    (state) => state.sameProfile
  )

  const isSameUser = username === currentlyAuthUsername
  console.log(isSameUser)

  return <div>UserPosts</div>
}

export default UserPosts
