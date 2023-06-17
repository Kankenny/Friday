import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined"
import Tooltip from "@mui/material/Tooltip"
import { Dispatch, SetStateAction } from "react"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import VisibilityIcon from "../icons/VisibilityIcon"
import CategoryIcon from "../icons/CategoryIcon"
import { Link } from "react-router-dom"
import PostMenu from "./post-menu/PostMenu"

type Props = {
  post: PostType
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const MainHeader = ({
  post,
  setIsExpanded,
  setIsEditing,
  isExpanded,
}: Props) => {
  const subtasksLength = post.tasks
    ? post.tasks.reduce(
        (total, task) => total + (task.subtasks?.length || 0),
        0
      )
    : 0

  return (
    <div className="flex w-full items-center p-1">
      <div
        className="w-full group p-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <Tooltip title="Expand Post">
              <ChevronRightOutlinedIcon className="cursor-pointer" />
            </Tooltip>
            <h1 className="font-semibold text-lg">{post.title}</h1>
          </div>
          <div className="flex items-center gap-1">
            <VisibilityIcon visibility={post.visibility} />
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
            to={`/users/${post.creatorUsername}/posts`}
          >
            By {post.creatorUsername}
          </Link>
        </div>
      </div>
      <PostMenu post={post} setIsEditing={setIsEditing} />
    </div>
  )
}

export default MainHeader
