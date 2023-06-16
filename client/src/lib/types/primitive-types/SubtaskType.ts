export interface SubtaskType {
  _id: string
  title: string
  priority: "low" | "medium" | "high"
  dueDate: Date
  progress: string
  taskId: string
}
