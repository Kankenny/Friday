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
    const filteredPosts = otherUserPosts.filter(
      (post) => post.visibility !== "personal"
    )
    userPosts = filteredPosts
  }

  return (
    <div className="w-full">
      <div className="mb-10 flex items-center gap-2">
        <h1 className="text-tertiary text-3xl font-semibold">
          {isSameUser
            ? `Welcome back, ${sameUserFirstName}`
            : `${otherUserFirstName}'s posts`}
        </h1>
        <Tooltip
          title="Personal posts are hidden to every other user and private posts are only visible to users who follow you"
          className="bg-tertiary text-secondary hover:bg-secondary hover:text-tertiary cursor-pointer rounded-full p-1 duration-200"
        >
          <QuestionMarkIcon className="h-5 w-5" />
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
