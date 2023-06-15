import { useNavigate } from "react-router-dom"
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
  const { body, commenterId, commenterUsername } = comment
  const { firstName, profilePicture } = commenterId

  const navigate = useNavigate()

  const handleProfileVisit = () => {
    navigate(`/users/${commenterUsername}`)
  }

  return (
    <div className="flex gap-1">
      <Avatar
        className="text-secondary capitalize mt-1 cursor-pointer"
        src={profilePicture}
        onClick={handleProfileVisit}
      >
        {profilePicture ? "" : firstName.charAt(0)}
      </Avatar>
      <div>
        <div className="p-2 bg-gray-400 w-max rounded-2xl text-secondary">
          <h1 className="cursor-pointer" onClick={handleProfileVisit}>
            {commenterUsername}
          </h1>
          <p className="font-light text-sm">{body}</p>
        </div>
        <p className="font-extralight text-xs ml-1 mt-1">{formattedDate}</p>
      </div>
    </div>
  )
}

export default Comment
