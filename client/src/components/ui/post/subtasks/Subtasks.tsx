import Subtask from "./Subtask"
import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"

type Props = {
  post: PostType
  task: TaskType
  subtasks: SubtaskType[]
}

const Subtasks = ({ post, task, subtasks }: Props) => {
  const content = subtasks.map((subtask) => (
    <Subtask post={post} task={task} subtask={subtask} key={subtask._id} />
  ))

  return content
}

export default Subtasks
