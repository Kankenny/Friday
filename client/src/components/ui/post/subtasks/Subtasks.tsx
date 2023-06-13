import Subtask from "./Subtask"
import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"

type Props = {
  subtasks: SubtaskType[]
}

const Subtasks = ({ subtasks }: Props) => {
  const content = subtasks.map((subtask) => <Subtask subtask={subtask} />)

  return content
}

export default Subtasks
