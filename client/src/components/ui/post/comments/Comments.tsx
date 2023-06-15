import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"
import Comment from "./Comment"

const Comments = () => {
  const { comments } = useTypedSelector((state) => state.postDetail)

  const content = comments.map((comment) => (
    <Comment key={comment._id} comment={comment} />
  ))

  return <div className="space-y-5">{content}</div>
}

export default Comments
