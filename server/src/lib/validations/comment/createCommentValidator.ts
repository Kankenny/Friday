import { z } from "zod"

const createCommentSchema = z.object({
  comment: z.string().trim().min(1),
})

export default createCommentSchema
