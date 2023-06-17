import { useParams } from "react-router-dom"

const UserPosts = () => {
  const { username } = useParams()

  console.log(username)

  return <div>UserPosts</div>
}

export default UserPosts
