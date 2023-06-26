import { useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Post from "../../../../ui/post/Post"
import Tooltip from "@mui/material/Tooltip"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import Alert from "../../../../ui/mui/Alert"

const LikedPosts = () => {
  const { username: pathUsername } = useParams()
  const { username: sameUserUsername, upvotedPosts: sameUserUpvotedPosts } =
    useTypedSelector((state) => state.sameProfile)
  const { firstName: otherUserFirstName, upvotedPosts: otherUserUpvotedPosts } =
    useTypedSelector((state) => state.otherProfile)
  const isSameUser = pathUsername === sameUserUsername

  let likedPosts

  if (isSameUser) {
    likedPosts = sameUserUpvotedPosts
  } else {
    const filteredPosts = otherUserUpvotedPosts.filter(
      (post) => post.visibility !== "personal"
    )
    likedPosts = filteredPosts
  }

  return (
    <div className="w-full">
      <div className="mb-10 flex items-center gap-2">
        <h1 className="text-tertiary text-3xl font-semibold">
          {isSameUser
            ? "Your liked posts"
            : `${otherUserFirstName}'s liked posts`}
        </h1>
        <Tooltip
          title="Liked posts are visible to the public"
          className="bg-tertiary text-secondary hover:bg-secondary hover:text-tertiary cursor-pointer rounded-full p-1 duration-200"
        >
          <QuestionMarkIcon className="h-5 w-5" />
        </Tooltip>
      </div>
      {likedPosts.length !== 0 ? (
        <ul className="space-y-10">
          {likedPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </ul>
      ) : (
        <Alert
          severity="error"
          message={
            isSameUser
              ? "You have not liked any posts"
              : `${otherUserFirstName} has not yet liked any posts`
          }
        />
      )}
    </div>
  )
}

export default LikedPosts
