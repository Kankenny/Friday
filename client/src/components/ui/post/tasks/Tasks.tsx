import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import Task from "./Task"

type Props = {
  post: PostType
  tasks: TaskType[]
}

const Tasks = ({ post, tasks }: Props) => {
  const content = tasks.map((task) => (
    <Task task={task} post={post} key={task._id} />
  ))

  return content
}

export default Tasks
