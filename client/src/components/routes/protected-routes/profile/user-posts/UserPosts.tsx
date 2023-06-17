import { useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Post from "../../../../ui/post/Post"
import Tooltip from "@mui/material/Tooltip"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"

const UserPosts = () => {
  const { username: pathUsername } = useParams()
  const {
    username: sameUserUsername,
    posts: sameUserPosts,
    firstName: sameUserFirstName,
  } = useTypedSelector((state) => state.sameProfile)
  const { posts: otherUserPosts, firstName: otherUserFirstName } =
    useTypedSelector((state) => state.otherProfile)
  const isSameUser = pathUsername === sameUserUsername

  let userPosts

  if (isSameUser) {
    userPosts = sameUserPosts
  } else {
    userPosts = otherUserPosts
  }

  return (
    <div className="w-full">
      <div className="flex items-center mb-10 gap-2">
        {isSameUser ? (
          <h1 className="text-3xl text-tertiary font-semibold">
            Welcome back, {sameUserFirstName}
          </h1>
        ) : (
          <h1 className="text-3xl text-tertiary font-semibold">
            {otherUserFirstName}'s posts
          </h1>
        )}
        <Tooltip
          title="Private posts are hidden to others"
          className="cursor-pointer bg-tertiary rounded-full p-1 text-secondary hover:bg-secondary hover:text-tertiary duration-200"
        >
          <QuestionMarkIcon className="w-5 h-5" />
        </Tooltip>
      </div>
      <ul className="space-y-10">
        {userPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </ul>
    </div>
  )
}

export default UserPosts
