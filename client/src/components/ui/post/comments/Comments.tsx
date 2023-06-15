import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"

const Comments = () => {
  const { comments } = useTypedSelector((state) => state.postDetail)

  const content = comments.map((comment) => <div key={1}>{comment.body}</div>)
  console.log(comments)
  return <>{content}</>
}

export default Comments
