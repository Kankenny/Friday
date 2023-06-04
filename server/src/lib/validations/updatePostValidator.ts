import { z } from "zod"

// Disallow these fields to be updated on the update post controller
const updatePostSchema = z.object({
  creatorId: z.never(),
  creatorUsername: z.never(),
  upvotes: z.never(),
  downvotes: z.never(),
  authorizedUsers: z.never(),
  upvotedBy: z.never(),
  downvotedBy: z.never(),
  tasks: z.never(),
  comments: z.never(),
})

export default updatePostSchema
