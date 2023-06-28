import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"

import { isAxiosError } from "axios"
import { PostType } from "../../types/primitive-types/PostType"
import { TaskType } from "../../types/primitive-types/TaskType"
import { SubtaskType } from "../../types/primitive-types/SubtaskType"
import { useTypedSelector } from "../redux-hook/useTypedSelector"
import {
  updateSubtaskSchema,
  updateSubtaskType,
} from "../../../../../common/validations/subtask/updateSubtaskValidator"
import subtaskAPI from "../../services/axios-instances/subtaskAPI"
import {
  deleteSubtask,
  updateSubtask,
} from "../../store/slices/timeline-slice/timelineSlice"
import { setFeedback } from "../../store/slices/feedback-slice/feedbackSlice"

type UseSubtaskProps = {
  post: PostType
  task: TaskType
  subtask: SubtaskType
}

const useSubtask = ({ post, task, subtask }: UseSubtaskProps) => {
  const { _id: authUserId } = useTypedSelector((state) => state.sameProfile)
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

  const handleDeleteSubtask = async () => {
    try {
      const { data } = await subtaskAPI.delete(
        `/${subtask._id}?postId=${post._id}&taskId=${task._id}`
      )
      dispatch(deleteSubtask({ post, task, subtask }))
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

  const handleEditClick = () => {
    if (isCurrUserAuthorized) {
      setIsEditing(true)
    }
  }

  const handleClearClick = () => {
    handleDeleteSubtask()
  }

  const isCurrUserAuthorized =
    post.authorization === "public" ||
    (post.authorization === "private" &&
      post.authorizedUsers.some((user) => user._id === authUserId)) ||
    post.creatorId._id === authUserId

  const handleFormSubmit = handleSubmit(handleUpdateSubtask)

  const handleFormClickAway = () => {
    setIsEditing(false)
  }

  const handleFormFocus = () => {
    if (isEditing) {
      setFocus("title")
    }
  }

  return {
    isEditing,
    isCurrUserAuthorized,
    register,
    handleEditClick,
    handleClearClick,
    handleFormSubmit,
    handleFormClickAway,
    handleFormFocus,
  }
}

export default useSubtask
