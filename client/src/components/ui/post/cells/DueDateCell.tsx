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

  return (
    <h1 className="uppercase flex-grow max-w-[20%] border border-secondary text-sm cursor-pointer hover:bg-secondary  duration-200 bg-tertiary">
      <DatePicker
        callbackFn={handleUpdatePiority}
        formattedDueDate={formattedDueDate}
      />
    </h1>
  )
}

export default DueDateCell
