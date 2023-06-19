import { useState } from "react"
import Subtasks from "../subtasks/Subtasks"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import ProgressCell from "../cells/ProgressCell"
import PriorityCell from "../cells/PriorityCell"
import DueDateCell from "../cells/DueDateCell"
import TaskCell from "../cells/TaskCell"
import NewSubtaskInput from "../subtasks/NewSubtaskInput"

type Props = {
  post: PostType
  task: TaskType
}

const Task = ({ post, task }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const taskDueDate = new Date(task.dueDate)
  const formattedDueDate = taskDueDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  console.log(isExpanded)
  return (
    <>
      <div className="flex justify-between text-center">
        <TaskCell
          post={post}
          task={task}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
        <ProgressCell
          progress={task.progress}
          post={post}
          task={task}
          isTaskCell={true}
        />
        <PriorityCell
          priority={task.priority}
          post={post}
          task={task}
          isTaskCell={true}
        />
        <DueDateCell
          formattedDueDate={formattedDueDate}
          post={post}
          task={task}
          isTaskCell={true}
        />
      </div>
      {isExpanded && task.subtasks.length !== 0 && (
        <Subtasks subtasks={task.subtasks} post={post} task={task} />
      )}
      {isExpanded && <NewSubtaskInput post={post} task={task} />}
    </>
  )
}

export default Task
