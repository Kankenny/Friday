import { useEffect } from "react"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createSubtaskSchema,
  createSubtaskType,
} from "../../../../../../common/validations/subtask/createSubTaskValidator"
import subtaskAPI from "../../../../lib/services/axios-instances/subtaskAPI"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { createSubtask } from "../../../../lib/store/slices/timeline-slice/timelineSlice"
import { isAxiosError } from "axios"
import { setFeedback } from "../../../../lib/store/slices/feedback-slice/feedbackSlice"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"

type Props = {
  post: PostType
  task: TaskType
}

const NewSubtaskInput = ({ post, task }: Props) => {
  const { _id: authUserId } = useTypedSelector((state) => state.sameProfile)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<createSubtaskType>({
    resolver: zodResolver(createSubtaskSchema),
  })

  const handleNewSubtaskSubmit = async (formData: createSubtaskType) => {
    try {
      const { data } = await subtaskAPI.post(
        `/?taskId=${task._id}&postId=${post._id}`,
        formData
      )
      dispatch(createSubtask({ post, task, subtask: data.data }))
      dispatch(
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
      )
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
    <div className="border border-secondary p-2 pl-9 text-sm">
      <form
        className="flex items-center"
        onSubmit={handleSubmit(handleNewSubtaskSubmit)}
      >
        <button type="submit">
          <AddOutlinedIcon className="h-5 w-5 opacity-50" />
        </button>
        <input
          type="text"
          placeholder="Add Subtask"
          className={`bg-transparent px-2 h-full outline-none text-secondary rounded-md hover:border hover:border-secondary duration-200 ease-in-out ${
            !isCurrUserAuthorized && "cursor-not-allowed"
          }`}
          {...register("title")}
          readOnly={!isCurrUserAuthorized}
        />
      </form>
    </div>
  )
}

export default NewSubtaskInput
