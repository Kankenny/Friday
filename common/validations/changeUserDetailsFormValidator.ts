import { z } from "zod"

export const changeUserDetailsFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profilePicture: z.string().optional(),
  email: z.never(),
  username: z.never(),
  password: z.never(),
  securityQuestion: z.never(),
  securityAnswer: z.never(),
  following: z.never(),
  followers: z.never(),
  blocked: z.never(),
  posts: z.never(),
  upvotedPosts: z.never(),
  downvotedPosts: z.never(),
  savedPosts: z.never(),
  notifications: z.never(),
  comments: z.never(),
})

export type changeUserDetailsFormType = z.infer<
  typeof changeUserDetailsFormSchema
>
