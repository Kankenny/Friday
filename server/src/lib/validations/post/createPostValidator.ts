import { z } from "zod"

const createPostSchema = z.object({
  title: z.string().min(1).trim(),
  creatorId: z.string().min(1),
  creatorUsername: z.string().min(1),
  dueDate: z.date().optional(),
  color: z.string().min(1),
  category: z.string().min(1),
  visibility: z.enum(["personal", "collaborators", "private", "public"]),
  authorization: z.enum(["personal", "collaborators"]),
})

export default createPostSchema
