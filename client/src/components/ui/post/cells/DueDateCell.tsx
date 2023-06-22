import { useDispatch } from "react-redux"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import DatePicker from "../../../ui/mui/DatePicker"
import taskAPI from "../../../../lib/services/axios-instances/taskAPI"
import subtaskAPI from "../../../../lib/services/axios-instances/subtaskAPI"
import {
  updateSubtask,
  updateTask,
} from "../../../../lib/store/slices/timeline-slice/timelineSlice"
import { setFeedback } from "../../../../lib/store/slices/feedback-slice/feedbackSlice"
import { isAxiosError } from "axios"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"
import { Tooltip } from "@mui/material"

type Props = {
  post: PostType
  task: TaskType
  subtask?: SubtaskType
  formattedDueDate: string
  isTaskCell: boolean
}

const DueDateCell = ({
  post,
  task,
  subtask,
  formattedDueDate,
  isTaskCell,
}: Props) => {
  const { _id: authUserId } = useTypedSelector((state) => state.sameProfile)
  const dispatch = useDispatch()

  const handleUpdatePiority = async (selectedDate: Date | null) => {
    try {
      if (isTaskCell) {
        const { data } = await taskAPI.put(
          `/?postId=${post._id}&taskId=${task._id}`,
          {
            dueDate: selectedDate,
          }
        )
        dispatch(updateTask({ post, task: data.data }))
        dispatch(
          setFeedback({
            feedbackMessage: data.message,
            feedbackType: "success",
          })
        )
      } else {
        const { data } = await subtaskAPI.put(
          `/${subtask?._id}?postId=${post._id}&taskId=${task._id}`,
          {
            dueDate: selectedDate,
          }
        )
        dispatch(updateSubtask({ post, task, subtask: data.data }))
        dispatch(
          setFeedback({
            feedbackMessage: data.message,
            feedbackType: "success",
          })
        )
      }
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          setFeedback({
            feedbackMessage: err.response?.data.message,
            feedbackType: "error",
          })
        )
      } else {
        console.error(err)
      }
    }
  }

  const isCurrUserAuthorized =
    post.authorization === "public" ||
    (post.authorization === "private" &&
      post.authorizedUsers.includes(authUserId)) ||
    post.creatorId === authUserId

  return (
    <Tooltip
      title={
        isCurrUserAuthorized
          ? "Edit due date"
          : "You are unauthorized to edit this post"
      }
    >
      <div
        className={`uppercase flex-grow max-w-[20%] border border-secondary text-sm  duration-200 bg-tertiary ${
          isCurrUserAuthorized
            ? "hover:bg-secondary cursor-pointer"
            : "cursor-not-allowed"
        }`}
      >
        <DatePicker
          callbackFn={handleUpdatePiority}
          formattedDueDate={formattedDueDate}
          isAuthorized={isCurrUserAuthorized}
        />
      </div>
    </Tooltip>
  )
}

export default DueDateCell
