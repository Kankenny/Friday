import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined"
import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"
import { useState, useEffect } from "react"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import {
  updateSubtaskSchema,
  updateSubtaskType,
} from "../../../../../../common/validations/subtask/updateSubtaskValidator"
import subtaskAPI from "../../../../lib/services/axios-instances/subtaskAPI"
import { useDispatch } from "react-redux"
import { updateSubtask } from "../../../../lib/store/slices/timeline-slice/timelineSlice"
import { setFeedback } from "../../../../lib/store/slices/feedback-slice/feedbackSlice"
import { isAxiosError } from "axios"

type Props = {
  post: PostType
  task: TaskType
  subtask: SubtaskType
}

const SubtaskCell = ({ post, task, subtask }: Props) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  const { register, handleSubmit, reset, setFocus } =
    useForm<updateSubtaskType>({
      resolver: zodResolver(updateSubtaskSchema),
    })

  const handleUpdateSubtask = async (formData: updateSubtaskType) => {
    try {
      const { data } = await subtaskAPI.put(
        `/${subtask._id}?postId=${post._id}&taskId=${task._id}`,
        formData
      )
      dispatch(updateSubtask({ post, task, subtask: data.data }))
      dispatch(
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
      )
      setIsEditing(false)
      reset()
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          setFeedback({
            feedbackMessage: err.response?.data.message,
            feedbackType: "success",
          })
        )
      } else {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    if (isEditing) {
      setFocus("title")
    }
  }, [isEditing, setFocus])

  return (
    <div className="border-secondary border p-2 pl-10 text-sm text-left cursor-pointer hover:bg-secondary hover:text-main duration-200 flex items-center flex-grow">
      <SubdirectoryArrowRightOutlinedIcon className="h-5 w-5" />
      {!isEditing ? (
        <h1 onClick={() => setIsEditing(true)} className="min-w-[5em] h-full">
          {subtask.title}
        </h1>
      ) : (
        <ClickAwayListener onClickAway={() => setIsEditing(false)}>
          <form onSubmit={handleSubmit(handleUpdateSubtask)}>
            <input
              type="text"
              placeholder={subtask.title}
              className="bg-transparent h-full px-2 outline-none text-secondary rounded-md hover:text-main hover:outline-tertiary"
              {...register("title")}
            />
          </form>
        </ClickAwayListener>
      )}
    </div>
  )
}

export default SubtaskCell
