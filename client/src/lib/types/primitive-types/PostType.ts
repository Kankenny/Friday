import { CommentType } from "./CommentType"
import { TaskType } from "./TaskType"
import { UserType } from "./UserType"

export interface PostType {
  _id: string
  title: string
  creatorId: string
  creatorUsername: string
  color: string
  category: "personal" | "chores" | "work" | "school" | "others"
  visibility: "personal" | "collaborators" | "public" | "private"
  upvotes: number
  downvotes: number
  authorization: "personal" | "collaborators" | "public" | "private"
  authorizedUsers: UserType[]
  upvotedBy: UserType[]
  downvotedBy: UserType[]
  tasks: TaskType[]
  comments: CommentType[]
  createdAt: Date
}
