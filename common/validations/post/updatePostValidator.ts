import { z } from "zod"

export const updatePostSchema = z.object({
  title: z.string().trim().optional(),
  creatorId: z.undefined(),
  creatorUsername: z.undefined(),
  dueDate: z.date().optional(),
  color: z.string().optional(),
  category: z.string().optional(),
  visibility: z
    .enum(["personal", "collaborators", "private", "public"])
    .optional(),
  upvotes: z.undefined(),
  downvotes: z.undefined(),
  authorization: z.enum(["personal", "collaborators"]).optional(),
  authorizedUsers: z.undefined(),
  upvotedBy: z.undefined(),
  downvotedBy: z.undefined(),
  tasks: z.undefined(),
  comments: z.undefined(),
})

export type updatePostType = z.infer<typeof updatePostSchema>
