import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import ClearIcon from "@mui/icons-material/Clear"
import { Tooltip } from "@mui/material"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"
import useSubtask from "../../../../lib/hooks/regular-hooks/useSubtask"

type Props = {
  post: PostType
  task: TaskType
  subtask: SubtaskType
}

const SubtaskCell = ({ post, task, subtask }: Props) => {
  const {
    isEditing,
    isCurrUserAuthorized,
    register,
    handleEditClick,
    handleClearClick,
    handleFormSubmit,
    handleFormClickAway,
    handleFormFocus,
  } = useSubtask({ post, task, subtask })

  return (
    <div className="border-secondary hover:bg-secondary hover:text-main flex flex-grow cursor-pointer items-center border p-2 pl-10 text-left text-sm duration-200">
      <SubdirectoryArrowRightOutlinedIcon className="h-5 w-5" />
      {!isEditing || !isCurrUserAuthorized ? (
        <Tooltip
          title={
            isCurrUserAuthorized
              ? "Edit this Subtask"
              : "You are unauthorized to edit this subtask"
          }
        >
          <div className="flex w-full items-center justify-between">
            <h1 onClick={handleEditClick} className="h-full min-w-[5em]">
              {subtask.title}
            </h1>
            <ClearIcon
              onClick={handleClearClick}
              className="rounded-full p-1 transition duration-200 ease-in-out hover:bg-red-500"
            />
          </div>
        </Tooltip>
      ) : (
        <ClickAwayListener onClickAway={handleFormClickAway}>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder={subtask.title}
              className="text-secondary hover:text-main hover:outline-tertiary h-full rounded-md bg-transparent px-2 outline-none"
              {...register("title")}
              onFocus={handleFormFocus}
            />
          </form>
        </ClickAwayListener>
      )}
    </div>
  )
}

export default SubtaskCell
