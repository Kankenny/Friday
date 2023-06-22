import { PostType } from "../primitive-types/PostType"
import { NotificationType } from "../primitive-types/NotificationType"
import { CommentType } from "../primitive-types/CommentType"
import { UserType } from "../primitive-types/UserType"

export interface ProfileSliceType {
  _id: string
  firstName: string
  lastName: string
  profilePicture: string | undefined
  email: string
  username: string
  following: UserType[]
  followers: UserType[]
  blocked: UserType[]
  posts: PostType[]
  upvotedPosts: PostType[]
  downvotedPosts: PostType[]
  savedPosts: PostType[]
  authorizedPosts: PostType[]
  notifications: NotificationType[]
  comments: CommentType[]
}
