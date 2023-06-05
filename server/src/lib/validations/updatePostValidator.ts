import { z } from "zod"

const updatePostSchema = z.object({
  title: z.string().trim().optional(),
  creatorId: z.never(),
  creatorUsername: z.never(),
  dueDate: z.date().optional(),
  color: z.string().optional(),
  category: z.string().optional(),
  visibility: z.enum(["personal", "collaborators", "private", "public"]),
  upvotes: z.never(),
  downvotes: z.never(),
  authorizedUsers: z.never(),
  upvotedBy: z.never(),
  downvotedBy: z.never(),
  tasks: z.never(),
  comments: z.never(),
})

export default updatePostSchema
