import { DetailedCommentType } from "../primitive-types/DetailedCommentType"
import { TaskType } from "../primitive-types/TaskType"
import { UserType } from "../primitive-types/UserType"

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
  authorization: "personal" | "collaborators" | "public" | "private"
  authorizedUsers: UserType[]
  upvotedBy: UserType[]
  downvotedBy: UserType[]
  tasks: TaskType[]
  comments: DetailedCommentType[]
  createdAt: Date
}
