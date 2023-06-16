import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"
import Comment from "./Comment"

const Comments = () => {
  const { comments } = useTypedSelector((state) => state.postDetail)

  const content = comments.map((comment) => (
    <Comment key={comment._id} comment={comment} />
  ))

  return (
    <div className="space-y-5 overflow-y-scroll max-h-[50rem]">
      {comments.length !== 0 ? (
        content
      ) : (
        <h1 className="text-1xl font-bold text-red-500">
          No comments found...
        </h1>
      )}
    </div>
  )
}

export default Comments
