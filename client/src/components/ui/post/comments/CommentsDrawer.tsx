import Box from "@mui/material/Box"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import Comments from "./Comments"

type Props = {
  post: PostType
  toggleDrawer: (
    openState: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

const CommentsDrawer = ({ post, toggleDrawer }: Props) => {
  return (
    <Box
      className="w-[30em] lg:w-[50em] p-10 min-h-screen bg-secondary text-main focus:outline-none"
      onKeyDown={toggleDrawer(false)}
      role="presentation"
    >
      <h1 className="text-3xl font-bold text-tertiary pb-5 border-b border-main mb-5">
        {post.title} — Comments
      </h1>
      <Comments comments={post.comments} />
    </Box>
  )
}

export default CommentsDrawer
