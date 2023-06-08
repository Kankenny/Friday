import { z } from "zod"

const createCommentSchema = z.object({
  body: z.string().trim().min(1),
})

export default createCommentSchema
