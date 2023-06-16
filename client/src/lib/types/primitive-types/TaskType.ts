import { SubtaskType } from "./SubtaskType"

export interface TaskType {
  _id: string
  title: string
  progress: string
  priority: "low" | "medium" | "high"
  dueDate: Date
  postId: string
  subtasks: SubtaskType[]
}
