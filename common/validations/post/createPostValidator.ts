import { z } from "zod"

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be 5 characters or more!" })
    .trim(),
  creatorId: z.undefined(),
  creatorUsername: z.undefined(),
  dueDate: z.date().optional(),
  color: z.string().optional(),
  category: z.enum(["personal", "chores", "work", "school", "others"]),
  visibility: z.enum(["personal", "collaborators", "private", "public"]),
  authorization: z.enum(["personal", "collaborators"]),
})

export type createPostType = z.infer<typeof createPostSchema>
