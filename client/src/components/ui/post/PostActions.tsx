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
import { useTypedSelector } from "../../../lib/hooks/redux-hook/useTypedSelector"
import { Tooltip } from "@mui/material"

type Props = {
  post: PostType
}

const PostActions = ({ post }: Props) => {
  const { _id: authUserId } = useTypedSelector((state) => state.sameProfile)
  const { comments: dynamicSizedComments } = useTypedSelector(
    (state) => state.postDetail
  )
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

  const isCurrUserAuthorized =
    post.authorization === "public" ||
    (post.authorization === "private" &&
      post.authorizedUsers.some((user) => user._id === authUserId)) ||
    post.creatorId._id === authUserId

  return (
    <div className="border-secondary flex justify-between rounded-b-md border p-2 text-sm">
      <form
        className="flex items-center"
        onSubmit={handleSubmit(handleNewTaskSubmit)}
      >
        <button type="submit" disabled={!isCurrUserAuthorized}>
          <AddOutlinedIcon className="h-5 w-5 opacity-50" />
        </button>
        <Tooltip
          title={
            isCurrUserAuthorized
              ? "Enter new task"
              : "You are unauthorized on this post"
          }
        >
          <input
            type="text"
            placeholder="Add Task"
            className={`text-secondary h-full rounded-md bg-transparent px-2 outline-none duration-200 ease-in-out ${
              isCurrUserAuthorized
                ? "hover:border-secondary hover:border"
                : "cursor-not-allowed"
            }`}
            readOnly={!isCurrUserAuthorized}
            {...register("title")}
          />
        </Tooltip>
      </form>

      <div className="flex select-none items-center gap-10">
        <div className="flex items-center gap-2">
          <h1 className="text-gray-600">
            {dynamicSizedComments.length !== 0
              ? dynamicSizedComments.length
              : post.comments.length}{" "}
            comments
          </h1>
          <p>—</p>
          <CommentsButton post={post} />
        </div>
        <h1>|</h1>
        <LikeDislike post={post} />
      </div>
    </div>
  )
}

export default PostActions
