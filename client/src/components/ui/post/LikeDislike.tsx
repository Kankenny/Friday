import { useTypedSelector } from "../../../lib/hooks/redux-hook/useTypedSelector"
import useLikeDislikeToggle from "../../../lib/hooks/regular-hooks/useUpvoteDownvoteToggle"
import { PostType } from "../../../lib/types/primitive-types/PostType"

type Props = {
  post: PostType
}

const LikeDislike = ({ post }: Props) => {
  const { _id } = useTypedSelector((state) => state.auth)
  const isAlreadyLiked = post.upvotedBy.includes(_id ?? "")
  const isAlreadyDisliked = post.downvotedBy.includes(_id ?? "")

  const { UpvoteIcon, DownvoteIcon } = useLikeDislikeToggle({
    post,
    isAlreadyLiked,
    isAlreadyDisliked,
  })

  return (
    <div className="flex gap-2">
      <UpvoteIcon />
      <DownvoteIcon />
    </div>
  )
}

export default LikeDislike
