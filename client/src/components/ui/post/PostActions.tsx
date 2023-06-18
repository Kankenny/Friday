import { useEffect } from "react"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { PostType } from "../../../lib/types/primitive-types/PostType"
import CommentsButton from "./comments/CommentsButton"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createTaskSchema,
  createTaskType,
} from "../../../../../common/validations/task/createTaskValidator"
import taskAPI from "../../../lib/services/axios-instances/taskAPI"
import { useDispatch } from "react-redux"
import { createTask } from "../../../lib/store/slices/timeline-slice/timelineSlice"
import { setFeedback } from "../../../lib/store/slices/feedback-slice/feedbackSlice"
import { isAxiosError } from "axios"
import LikeDislike from "./LikeDislike"

type Props = {
  post: PostType
}

const PostActions = ({ post }: Props) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<createTaskType>({
    resolver: zodResolver(createTaskSchema),
  })

  const handleNewTaskSubmit = async (formData: createTaskType) => {
    try {
      const { data } = await taskAPI.post(`/?postId=${post._id}`, formData)
      dispatch(createTask({ task: data.data, post }))
      dispatch(
        setFeedback({ feedbackMessage: data.message, feedbackType: "success" })
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

  return (
    <div className="flex justify-between border border-secondary rounded-b-md text-sm p-2">
      <form
        className="flex items-center"
        onSubmit={handleSubmit(handleNewTaskSubmit)}
      >
        <button type="submit">
          <AddOutlinedIcon className="h-5 w-5 opacity-50" />
        </button>
        <input
          type="text"
          placeholder="Add Task"
          className="h-full px-2 outline-none text-secondary rounded-md hover:border hover:border-secondary duration-200 ease-in-out"
          {...register("title")}
        />
      </form>
      <div className="flex gap-2">
        <CommentsButton post={post} />
        <h1>|</h1>
        <LikeDislike post={post} />
      </div>
    </div>
  )
}

export default PostActions
