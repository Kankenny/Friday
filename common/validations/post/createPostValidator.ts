import { z } from "zod"

export const createPostSchema = z.object({
  title: z.string().min(1).trim(),
  creatorId: z.undefined(),
  creatorUsername: z.undefined(),
  dueDate: z.date().optional(),
  color: z.string().optional(),
  category: z.string().optional(),
  visibility: z.enum(["personal", "collaborators", "private", "public"]),
  authorization: z.enum(["personal", "collaborators"]),
})

export type createPostType = z.infer<typeof createPostSchema>
