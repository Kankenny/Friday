import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined"
import { useState } from "react"
import Subtasks from "../subtasks/Subtasks"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = {
  task: TaskType
}

const Task = ({ task }: Props) => {
  const dispatch = useDispatch()
  const [isExpanded, setIsExpanded] = useState(false)

  const { register, handleSubmit, reset } = useForm<createSubtaskType>({
    resolver: zodResolver(createSubtaskSchema),
  })

  const taskDueDate = new Date(task.dueDate)
  const formattedDueDate = taskDueDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <>
      <div className="flex justify-between text-center">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-grow max-w-[50%] border border-secondary p-2 text-sm text-left cursor-pointer hover:bg-secondary hover:text-main duration-200 flex items-center"
        >
          <ChevronRightOutlinedIcon />
          <h1>{task.title}</h1>
        </div>
        <h1 className="uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
          {task.progress}
        </h1>
        <h1 className="uppercase flex-grow max-w-[10%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
          {task.priority}
        </h1>
        <h1 className="uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
          {formattedDueDate}
        </h1>
      </div>
      {isExpanded && task.subtasks.length !== 0 && (
        <Subtasks subtasks={task.subtasks} />
      )}
      {isExpanded && (
        <div className="border border-secondary p-2 pl-9 text-sm">
          <div className="flex items-center">
            <AddOutlinedIcon className="h-5 w-5 opacity-50" />
            <input
              type="text"
              placeholder="Add Subtask"
              className="h-full outline-none"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Task
