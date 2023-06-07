import { z } from "zod"

export const changeUserDetailsFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profilePicture: z.string().optional(),
  email: z.undefined(),
  username: z.undefined(),
  password: z.undefined(),
  securityQuestion: z.undefined(),
  securityAnswer: z.undefined(),
  following: z.undefined(),
  followers: z.undefined(),
  blocked: z.undefined(),
  posts: z.undefined(),
  upvotedPosts: z.undefined(),
  downvotedPosts: z.undefined(),
  savedPosts: z.undefined(),
  notifications: z.undefined(),
  comments: z.undefined(),
})

export type changeUserDetailsFormType = z.infer<
  typeof changeUserDetailsFormSchema
>
