import useLikeDislikeToggle from "../../../lib/hooks/regular-hooks/useUpvoteDownvoteToggle"
import { PostType } from "../../../lib/types/primitive-types/PostType"

type Props = {
  post: PostType
}

const LikeDislike = ({ post }: Props) => {
  const { UpvoteIcon, DownvoteIcon } = useLikeDislikeToggle({
    postId: post._id,
    isAlreadyLiked: true,
    isAlreadyDisliked: false,
  })

  return (
    <div className="flex gap-2">
      <UpvoteIcon />
      <DownvoteIcon />
    </div>
  )
}

export default LikeDislike
