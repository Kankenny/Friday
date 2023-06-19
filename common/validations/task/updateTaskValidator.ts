import { z } from "zod"

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be 5 characters or more!" })
    .optional(),
  progress: z.enum(["done", "working on it", "stuck", "untouched"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.date().optional(),
})

export type updateTaskType = z.infer<typeof updateTaskSchema>
