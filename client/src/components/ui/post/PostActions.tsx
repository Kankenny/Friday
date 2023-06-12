import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"

const PostActions = () => {
  return (
    <div className="flex justify-between border border-secondary rounded-b-md text-sm p-2">
      <h1 className="opacity-50 flex items-center">
        <AddOutlinedIcon />
        <input
          type="text"
          placeholder="Add task"
          className="h-full outline-none"
        />
      </h1>
      <h1 className="cursor-pointer">
        <CommentOutlinedIcon className="mr-2 opacity-100" />
        Comments
      </h1>
    </div>
  )
}

export default PostActions
