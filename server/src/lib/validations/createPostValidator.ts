import { z } from "zod"

const createPostSchema = z.object({
  title: z.string().min(1),
  creatorId: z.string().min(1),
  creatorUsername: z.string().min(1),
  dueDate: z.date().optional(),
  color: z.string().min(1),
  category: z.string().min(1),
  visibility: z.string().min(1),
  authorization: z.string().min(1),
})

export default createPostSchema
