import Box from "@mui/material/Box"
import { PostType } from "../../../../lib/types/primitive-types/PostType"

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
      <h1 className="text-3xl font-bold text-tertiary">
        {post.title} — Comments
      </h1>
    </Box>
  )
}

export default CommentsDrawer
