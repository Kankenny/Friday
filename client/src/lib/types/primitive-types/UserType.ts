import { CommentType } from "./CommentType"
import { NotificationType } from "./NotificationType"
import { PostType } from "./PostType"

export interface UserType {
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
