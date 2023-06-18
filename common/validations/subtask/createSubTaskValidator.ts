import { z } from "zod"

export const createSubtaskSchema = z.object({
  title: z.string().min(1).trim(),
})

export type createSubtaskType = z.infer<typeof createSubtaskSchema>
