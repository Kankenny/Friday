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

type Props = {
  post: PostType
}

const PostActions = ({ post }: Props) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm<createTaskType>({
    resolver: zodResolver(createTaskSchema),
  })
  const handleNewTaskSubmit = async (formData: createTaskType) => {
    try {
      const { data } = await taskAPI.post(`/?postId=${post._id}`, formData)
      dispatch(createTask({ task: data.data, post }))
      reset()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex justify-between border border-secondary rounded-b-md text-sm p-2">
      <form
        className="flex items-center"
        onSubmit={handleSubmit(handleNewTaskSubmit)}
      >
        <AddOutlinedIcon className="h-5 w-5 opacity-50" />
        <input
          type="text"
          placeholder="Add Task"
          className="h-full outline-none"
          {...register("title")}
        />
      </form>
      <CommentsButton post={post} />
    </div>
  )
}

export default PostActions
