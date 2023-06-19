export interface SubtaskType {
  _id: string
  progress: "done" | "working on it" | "stuck" | "untouched"
  priority: "low" | "medium" | "high"
  dueDate: Date
  taskId: string
}
