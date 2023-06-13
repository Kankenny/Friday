import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined"
import Tooltip from "@mui/material/Tooltip"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import { Dispatch, SetStateAction } from "react"
import { PostType } from "../../../../lib/types/primitive-types/PostType"

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
    <div className="p-2">
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
        <Tooltip title="Post Options" className="cursor-pointer">
          <MoreHorizOutlinedIcon />
        </Tooltip>
      </div>
      <div className="flex justify-between items-center pl-6">
        <h1 className="text-sm">
          {post.tasks.length} Tasks | {subtasksLength} Subtasks |{" "}
          {post.comments.length} comments
        </h1>
        <h1 className="font-light text-sm">By {post.creatorUsername}</h1>
      </div>
    </div>
  )
}

export default MainHeader
