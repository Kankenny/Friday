import { z } from "zod"

const updateTaskSchema = z.object({
  title: z.string().optional(),
  progress: z.enum(["done", "working on it", "stuck", "untouched"]).optional(),
})

export default updateTaskSchema
