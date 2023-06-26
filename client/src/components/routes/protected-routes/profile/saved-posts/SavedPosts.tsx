import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Post from "../../../../ui/post/Post"
import Tooltip from "@mui/material/Tooltip"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import Alert from "../../../../ui/mui/Alert"

const SavedPosts = () => {
  const { savedPosts } = useTypedSelector((state) => state.sameProfile)

  return (
    <div className="w-full">
      <div className="mb-10 flex items-center gap-2">
        <h1 className="text-tertiary text-3xl font-semibold">
          Your saved posts
        </h1>
        <Tooltip
          title="Your saved posts are hidden to others"
          className="bg-tertiary text-secondary hover:bg-secondary hover:text-tertiary cursor-pointer rounded-full p-1 duration-200"
        >
          <QuestionMarkIcon className="h-5 w-5" />
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
