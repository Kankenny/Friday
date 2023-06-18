import { z } from "zod"

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  progress: z.enum(["done", "working on it", "stuck", "untouched"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.date().optional(),
})

export type updateTaskType = z.infer<typeof updateTaskSchema>
