import { SubtaskType } from "./SubtaskType"

export interface TaskType {
  _id: string
  title: string
  progress: string
  postId: string
  subtasks: SubtaskType[]
}
