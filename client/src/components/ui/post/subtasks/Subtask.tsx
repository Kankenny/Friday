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

type Props = {
  post: PostType
  task: TaskType
  subtask: SubtaskType
}

const Subtask = ({ post, task, subtask }: Props) => {
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
      console.log(data)
      reset()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (isEditing) {
      setFocus("title")
    }
  }, [isEditing, setFocus])

  const subtaskDueDate = new Date(subtask.dueDate)
  const formattedDueDate = subtaskDueDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="flex justify-between text-center">
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
                className="h-full px-2 py-1 outline-none text-secondary rounded-md"
                {...register("title")}
              />
            </form>
          </ClickAwayListener>
        )}
      </div>
      <h1 className="uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
        {subtask.progress}
      </h1>
      <h1 className="uppercase flex-grow max-w-[10%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
        {subtask.priority}
      </h1>
      <h1 className="uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
        {formattedDueDate}
      </h1>
    </div>
  )
}

export default Subtask
