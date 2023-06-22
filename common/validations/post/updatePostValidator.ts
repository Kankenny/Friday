import { z } from "zod"

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be 5 characters or more!" })
    .trim()
    .optional(),
  creatorId: z.undefined(),
  creatorUsername: z.undefined(),
  dueDate: z.date().optional(),
  color: z.string().optional(),
  category: z
    .enum(["personal", "chores", "work", "school", "others"])
    .optional(),
  visibility: z
    .enum(["personal", "collaborators", "private", "public"])
    .optional(),
  upvotes: z.undefined(),
  downvotes: z.undefined(),
  authorization: z
    .enum(["personal", "collaborators", "private", "public"])
    .optional(),
  authorizedUsers: z.undefined(),
  upvotedBy: z.undefined(),
  downvotedBy: z.undefined(),
  tasks: z.undefined(),
  comments: z.undefined(),
})

export type updatePostType = z.infer<typeof updatePostSchema>
