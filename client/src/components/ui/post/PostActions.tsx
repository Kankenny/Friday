import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import { useRef } from "react"

const PostActions = () => {
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
      <h1 className="cursor-pointer">
        <CommentOutlinedIcon className="mr-2 opacity-100 h-5 w-5" />
        Comments
      </h1>
    </div>
  )
}

export default PostActions
