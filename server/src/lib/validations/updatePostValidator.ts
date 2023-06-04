import { z } from "zod"

const updatePostSchema = z.object({
  creatorId: z.void(),
  creatorUsername: z.void(),
  upvotes: z.void(),
  downvotes: z.void(),
  authorizedUsers: z.void(),
  upvotedBy: z.void(),
  downvotedBy: z.void(),
  tasks: z.void(),
  comments: z.void(),
})

export default updatePostSchema
