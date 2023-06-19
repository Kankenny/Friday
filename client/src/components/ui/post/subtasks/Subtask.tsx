import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import ProgressCell from "../cells/ProgressCell"
import PriorityCell from "../cells/PriorityCell"
import DueDateCell from "../cells/DueDateCell"
import SubtaskCell from "../cells/SubtaskCell"

type Props = {
  post: PostType
  task: TaskType
  subtask: SubtaskType
}

const Subtask = ({ post, task, subtask }: Props) => {
  const subtaskDueDate = new Date(subtask.dueDate)
  const formattedDueDate = subtaskDueDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="flex justify-between text-center">
      <SubtaskCell post={post} task={task} subtask={subtask} />
      <ProgressCell
        progress={subtask.progress}
        post={post}
        task={task}
        subtask={subtask}
        isTaskCell={false}
      />
      <PriorityCell
        priority={subtask.priority}
        post={post}
        task={task}
        subtask={subtask}
        isTaskCell={false}
      />
      <DueDateCell
        formattedDueDate={formattedDueDate}
        post={post}
        task={task}
        subtask={subtask}
        isTaskCell={false}
      />
    </div>
  )
}

export default Subtask
