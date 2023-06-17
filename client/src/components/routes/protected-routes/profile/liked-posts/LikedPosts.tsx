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
    likedPosts = otherUserUpvotedPosts
  }

  return (
    <div className="w-full">
      <div className="flex items-center mb-10 gap-2">
        <h1 className="text-3xl text-tertiary font-semibold">
          {isSameUser
            ? "Your liked posts"
            : `${otherUserFirstName}'s liked posts`}
        </h1>
        <Tooltip
          title="Liked posts are visible to the public"
          className="cursor-pointer bg-tertiary rounded-full p-1 text-secondary hover:bg-secondary hover:text-tertiary duration-200"
        >
          <QuestionMarkIcon className="w-5 h-5" />
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
