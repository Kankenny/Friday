import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined"
import { useState, useEffect } from "react"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import {
  deleteTask,
  updateTask,
} from "../../../../lib/store/slices/timeline-slice/timelineSlice"
import {
  updateTaskSchema,
  updateTaskType,
} from "../../../../../../common/validations/task/updateTaskValidator"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import taskAPI from "../../../../lib/services/axios-instances/taskAPI"
import { setFeedback } from "../../../../lib/store/slices/feedback-slice/feedbackSlice"
import { isAxiosError } from "axios"
import ClearIcon from "@mui/icons-material/Clear"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"
import { Tooltip } from "@mui/material"

type Props = {
  post: PostType
  task: TaskType
  isExpanded: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}
const TaskCell = ({ post, task, isExpanded, setIsExpanded }: Props) => {
  const { _id: authUserId } = useTypedSelector((state) => state.sameProfile)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<updateTaskType>({
    resolver: zodResolver(updateTaskSchema),
  })

  const handleUpdateTask = async (formData: updateTaskType) => {
    try {
      const { data } = await taskAPI.put(
        `/?postId=${post._id}&taskId=${task._id}`,
        formData
      )
      dispatch(updateTask({ post, task: data.data }))
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
            feedbackType: "error",
          })
        )
      } else {
        console.error(err)
      }
    }
  }

  const handleDeleteTask = async () => {
    try {
      const { data } = await taskAPI.delete(`/?taskId=${task._id}`)
      dispatch(deleteTask({ post, task }))
      dispatch(
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
      )
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

  useEffect(() => {
    if (isEditing) {
      setFocus("title")
    }
  }, [isEditing, setFocus])

  useEffect(() => {
    if (errors.title?.message && !isSubmitSuccessful) {
      dispatch(
        setFeedback({
          feedbackMessage: errors.title?.message,
          feedbackType: "error",
        })
      )
    }
  }, [errors.title?.message, isSubmitSuccessful, dispatch])

  const isCurrUserAuthorized =
    post.authorization === "public" ||
    (post.authorization === "private" &&
      post.authorizedUsers.some((user) => user._id === authUserId)) ||
    post.creatorId._id === authUserId

  return (
    <div className="border-secondary hover:bg-secondary hover:text-main flex w-[45%] max-w-[45%] flex-grow cursor-pointer items-center border p-2 text-left text-sm duration-200">
      <ChevronRightOutlinedIcon
        onClick={() => setIsExpanded(!isExpanded)}
        className={`transform transition duration-200 ease-in-out ${
          isExpanded ? "rotate-90" : "rotate-0"
        }`}
      />

      {!isEditing || !isCurrUserAuthorized ? (
        <Tooltip
          title={
            isCurrUserAuthorized
              ? "Edit this Task"
              : "You are unauthorized to edit this task"
          }
        >
          <div className="flex w-full items-center justify-between">
            <h1 onClick={() => setIsEditing(true)} className="h-full ">
              {task.title}
            </h1>
            <ClearIcon
              onClick={handleDeleteTask}
              className="rounded-full p-1 transition duration-200 ease-in-out hover:bg-red-500"
            />
          </div>
        </Tooltip>
      ) : (
        <ClickAwayListener onClickAway={() => setIsEditing(false)}>
          <form onSubmit={handleSubmit(handleUpdateTask)}>
            <input
              type="text"
              placeholder={task.title}
              className="text-secondary hover:border-secondary hover:text-main hover:outline-tertiary h-full rounded-md bg-transparent px-4 outline-none duration-200 ease-in-out hover:border"
              {...register("title")}
            />
          </form>
        </ClickAwayListener>
      )}
    </div>
  )
}

export default TaskCell
