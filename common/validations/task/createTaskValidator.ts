import { z } from "zod"

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be 5 characters or more!" })
    .trim(),
})

export type createTaskType = z.infer<typeof createTaskSchema>
