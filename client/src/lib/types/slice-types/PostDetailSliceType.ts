import { DetailedCommentType } from "../primitive-types/DetailedCommentType"
import { TaskType } from "../primitive-types/TaskType"

export interface PostDetailSliceType {
  _id: string
  title: string
  creatorId: string
  creatorUsername: string
  color: string
  category: "personal" | "chores" | "work" | "school" | "others"
  visibility: "personal" | "collaborators" | "public" | "private"
  upvotes: number
  downvotes: number
  authorization: string
  authorizedUsers: string[]
  upvotedBy: string[]
  downvotedBy: string[]
  tasks: TaskType[]
  comments: DetailedCommentType[]
}
