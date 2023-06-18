import { z } from "zod"

export const createSubtaskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be 5 characters or more!" })
    .trim(),
})

export type createSubtaskType = z.infer<typeof createSubtaskSchema>
