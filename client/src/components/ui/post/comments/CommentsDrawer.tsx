import Box from "@mui/material/Box"
import Comments from "./Comments"
import { PostDetailSliceType } from "../../../../lib/types/slice-types/PostDetailSliceType"

type Props = {
  post: PostDetailSliceType
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
      <Comments />
    </Box>
  )
}

export default CommentsDrawer
