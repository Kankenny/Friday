import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"

type Props = {
  post: PostType
  task: TaskType
  subtask?: SubtaskType
  formattedDueDate: string
  isTaskCell: boolean
}

const DueDateCell = ({
  post,
  task,
  subtask,
  formattedDueDate,
  isTaskCell,
}: Props) => {
  return (
    <h1 className="uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
      {formattedDueDate}
    </h1>
  )
}

export default DueDateCell
