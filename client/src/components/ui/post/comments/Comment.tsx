import { UserType } from "../../../../lib/types/primitive-types/UserType"
import Avatar from "@mui/material/Avatar"

type Props = {
  comment: {
    _id: string
    body: string
    commenterId: UserType
    commenterUsername: string
    postId: string
    createdAt: Date
  }
}

const Comment = ({ comment }: Props) => {
  const formattedDate = new Date(comment.createdAt).toLocaleString()
  const { commenterId } = comment
  const { firstName, profilePicture } = commenterId

  return (
    <div className="flex gap-1">
      <Avatar className="text-secondary capitalize" src={profilePicture}>
        {profilePicture ? "" : firstName.charAt(0)}
      </Avatar>
      <div>
        <div className="p-2 bg-gray-400 w-max rounded-2xl text-secondary">
          <h1 className="font-semibold">{comment.commenterUsername}</h1>
          <p className="font-light text-sm">{comment.body}</p>
        </div>
        <p className="font-extralight text-xs ml-1 mt-1">{formattedDate}</p>
      </div>
    </div>
  )
}

export default Comment
