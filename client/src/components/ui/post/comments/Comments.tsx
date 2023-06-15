import { CommentType } from "../../../../lib/types/primitive-types/CommentType"

type Props = {
  comments: CommentType[]
}

const Comments = ({ comments }: Props) => {
  const content = comments.map((comment) => <div key={1}>{comment.body}</div>)
  console.log(comments)
  return <>{content}</>
}

export default Comments
