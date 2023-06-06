import { z } from "zod"

const createSubtaskSchema = z.object({
  title: z.string().min(1).trim(),
})

export default createSubtaskSchema
