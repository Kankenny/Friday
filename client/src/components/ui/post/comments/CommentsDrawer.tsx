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
      className="bg-secondary text-main flex min-h-screen w-[30em] flex-col justify-between p-10 pb-0 focus:outline-none lg:w-[50em]"
      role="presentation"
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <h1 className="text-tertiary border-main mb-5 border-b pb-5 text-3xl font-bold">
            {post.title} — Comments
          </h1>
          <Comments />
        </div>
        <CommentInput post={post} />
      </div>
    </Box>
  )
}

export default CommentsDrawer
