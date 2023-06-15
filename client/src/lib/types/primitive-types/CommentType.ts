export interface CommentType {
  _id: string
  body: string
  commenterId: string
  commenterUsername: string
  postId: string
  createdAt: Date
}
