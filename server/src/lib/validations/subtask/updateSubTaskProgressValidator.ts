import { z } from "zod"

const updateSubtaskProgressSchema = z.object({
  progress: z.enum(["done", "working on it", "stuck", "untouched"]),
})

export default updateSubtaskProgressSchema
