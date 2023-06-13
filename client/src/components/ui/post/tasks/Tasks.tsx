import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import Task from "./Task"

type Props = {
  tasks: TaskType[]
}

const Tasks = ({ tasks }: Props) => {
  const content = tasks.map((task) => <Task task={task} key={task._id} />)

  return content
}

export default Tasks
