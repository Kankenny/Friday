import { z } from "zod"

const updateTaskProgressSchema = z.object({
  progress: z.enum(["done", "working on it", "stuck", "untouched"]),
})

export default updateTaskProgressSchema
