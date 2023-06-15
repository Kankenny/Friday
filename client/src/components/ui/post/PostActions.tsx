import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { useRef } from "react"
import { PostType } from "../../../lib/types/primitive-types/PostType"
import CommentsButton from "./comments/CommentsButton"

type Props = {
  post: PostType
}

const PostActions = ({ post }: Props) => {
  const newTaskRef = useRef(null)

  const handleNewTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="flex justify-between border border-secondary rounded-b-md text-sm p-2">
      <form className="flex items-center" onSubmit={handleNewTaskSubmit}>
        <AddOutlinedIcon className="h-5 w-5 opacity-50" />
        <input
          type="text"
          placeholder="Add Task"
          className="h-full outline-none"
          ref={newTaskRef}
        />
      </form>
      <CommentsButton post={post} />
    </div>
  )
}

export default PostActions
