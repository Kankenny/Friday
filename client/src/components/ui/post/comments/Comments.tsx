import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"
import Comment from "./Comment"
import { useRef, useEffect } from "react"

const Comments = () => {
  const { comments } = useTypedSelector((state) => state.postDetail)
  const containerRef = useRef<HTMLDivElement>(null)

  const content = comments.map((comment) => (
    <Comment key={comment._id} comment={comment} />
  ))

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [comments])

  return (
    <div
      className="space-y-5 overflow-y-scroll max-h-[50rem]"
      ref={containerRef}
    >
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
