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
  authorization: string
  authorizedUsers: string[]
  upvotedBy: string[]
  downvotedBy: string[]
  tasks: TaskType[]
  comments: {
    _id: string
    body: string
    commenterId: UserType
    commenterUsername: string
    postId: string
    createdAt: Date
  }[]
}
