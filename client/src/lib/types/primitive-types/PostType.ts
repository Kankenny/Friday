import { CommentType } from "./CommentType"
import { TaskType } from "./TaskType"

export interface PostType {
  _id: string
  title: string
  creatorId: string
  creatorUsername: string
  color: string
  category: string
  visibility: "personal" | "collaborators" | "public" | "private"
  upvotes: number
  downvotes: number
  authorization: string
  authorizedUsers: string
  upvotedBy: string[]
  downvotedBy: string[]
  tasks: TaskType[]
  comments: CommentType[]
}
