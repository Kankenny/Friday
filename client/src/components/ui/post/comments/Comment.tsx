import { useNavigate } from "react-router-dom"
import { UserType } from "../../../../lib/types/primitive-types/UserType"
import Avatar from "@mui/material/Avatar"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"

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
  const { username } = useTypedSelector((state) => state.sameProfile)
  const formattedDate = new Date(comment.createdAt).toLocaleString()
  const { body, commenterId, commenterUsername } = comment
  const { firstName, lastName, profilePicture } = commenterId

  const navigate = useNavigate()

  const handleProfileVisit = () => {
    navigate(`/users/${commenterUsername}`)
  }

  const isUserTheCommenter = username === commenterUsername

  return (
    <div className={`flex gap-2 ${isUserTheCommenter && "justify-end"}`}>
      <Avatar
        className="text-secondary capitalize mt-1 cursor-pointer"
        src={profilePicture}
        onClick={handleProfileVisit}
      >
        {profilePicture ? "" : firstName.charAt(0)}
      </Avatar>
      <div className={`flex flex-col ${isUserTheCommenter && "order-first"}`}>
        <div
          className={`p-2 bg-gray-400 max-w-sm rounded-2xl text-secondary ${
            isUserTheCommenter && "self-end"
          }`}
        >
          <h1
            className={`cursor-pointer ${isUserTheCommenter && "text-right"}`}
            onClick={handleProfileVisit}
          >
            {firstName + " " + lastName}
          </h1>
          <p className="font-light text-sm break-words">{body}</p>
        </div>
        <p
          className={`font-extralight text-xs ml-1 mt-1 ${
            isUserTheCommenter && "text-right"
          }`}
        >
          {formattedDate}
        </p>
      </div>
    </div>
  )
}

export default Comment
