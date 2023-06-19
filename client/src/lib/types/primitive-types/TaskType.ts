import { SubtaskType } from "./SubtaskType"

export interface TaskType {
  _id: string
  title: string
  progress: "done" | "working on it" | "stuck" | "untouched"
  priority: "low" | "medium" | "high"
  dueDate: Date
  postId: string
  subtasks: SubtaskType[]
}
