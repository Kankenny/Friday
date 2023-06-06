import { z } from "zod"

const createTaskSchema = z.object({
  title: z.string().min(1).trim(),
})

export default createTaskSchema
