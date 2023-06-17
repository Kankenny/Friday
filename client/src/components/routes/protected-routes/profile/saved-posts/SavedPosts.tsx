import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Post from "../../../../ui/post/Post"
import Tooltip from "@mui/material/Tooltip"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import Alert from "../../../../ui/mui/Alert"

const SavedPosts = () => {
  const { savedPosts } = useTypedSelector((state) => state.sameProfile)

  return (
    <div className="w-full">
      <div className="flex items-center mb-10 gap-2">
        <h1 className="text-3xl text-tertiary font-semibold">
          Your saved posts
        </h1>
        <Tooltip
          title="Your saved posts are hidden to others"
          className="cursor-pointer bg-tertiary rounded-full p-1 text-secondary hover:bg-secondary hover:text-tertiary duration-200"
        >
          <QuestionMarkIcon className="w-5 h-5" />
        </Tooltip>
      </div>
      {savedPosts.length !== 0 ? (
        <ul className="space-y-10">
          {savedPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </ul>
      ) : (
        <Alert message="You have no saved posts yet" severity="error" />
      )}
    </div>
  )
}

export default SavedPosts
