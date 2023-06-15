import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined"
import Tooltip from "@mui/material/Tooltip"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import { Dispatch, SetStateAction } from "react"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import VisibilityIcon from "../icons/VisibilityIcon"
import CategoryIcon from "../icons/CategoryIcon"
import { Link } from "react-router-dom"

type Props = {
  post: PostType
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}

const MainHeader = ({ post, setIsExpanded, isExpanded }: Props) => {
  const subtasksLength = post.tasks
    ? post.tasks.reduce(
        (total, task) => total + (task.subtasks?.length || 0),
        0
      )
    : 0

  return (
    <div className="group p-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Tooltip title="Expand Post">
            <ChevronRightOutlinedIcon
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer"
            />
          </Tooltip>
          <h1 className="font-semibold text-lg">{post.title}</h1>
        </div>
        <div className="flex items-center gap-1">
          <VisibilityIcon visibility={post.visibility} />
          <Tooltip title="Post Options" className="cursor-pointer">
            <MoreHorizOutlinedIcon />
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-between items-center pl-6">
        <div className="flex items-center gap-2">
          <CategoryIcon category={post.category} />
          <h1 className="text-sm">
            {post.tasks.length} Tasks | {subtasksLength} Subtasks |{" "}
            {post.comments.length} comments
          </h1>
        </div>
        <Link
          className="font-light text-sm group-hover:underline duration-200 ease-in-out hover:text-tertiary hover:decoration-tertiary"
          to={`/users/${post.creatorUsername}`}
        >
          By {post.creatorUsername}
        </Link>
      </div>
    </div>
  )
}

export default MainHeader
