import { UserType } from "./UserType"

export interface DetailedCommentType {
  _id: string
  body: string
  commenterId: UserType
  commenterUsername: string
  postId: string
  createdAt: Date
}
