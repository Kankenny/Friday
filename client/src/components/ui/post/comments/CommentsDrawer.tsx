import Box from "@mui/material/Box"
import Comments from "./Comments"
import CommentInput from "./CommentInput"
import { PostType } from "../../../../lib/types/primitive-types/PostType"

type Props = {
  post: PostType
  toggleDrawer: (
    openState: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

const CommentsDrawer = ({ post }: Props) => {
  return (
    <Box
      className="w-[30em] lg:w-[50em] p-10 pb-0 min-h-screen bg-secondary text-main focus:outline-none flex flex-col justify-between"
      role="presentation"
    >
      <div>
        <h1 className="text-3xl font-bold text-tertiary pb-5 border-b border-main mb-5">
          {post.title} — Comments
        </h1>
        <Comments />
        <CommentInput postId={post._id} />
      </div>
    </Box>
  )
}

export default CommentsDrawer
