import { CommentType } from "../../../../lib/types/primitive-types/CommentType"

type Props = {
  comment: CommentType
}

const Comment = ({ comment }: Props) => {
  const formattedDate = new Date(comment.createdAt).toLocaleString()

  return (
    <div>
      <div className="p-2 bg-gray-400 w-max rounded-xl text-secondary">
        <h1 className="font-semibold">{comment.commenterUsername}</h1>
        <p className="font-extralight text-sm">{comment.body}</p>
      </div>
      <p className="text-xs ml-1 mt-1">{formattedDate}</p>
    </div>
  )
}

export default Comment
