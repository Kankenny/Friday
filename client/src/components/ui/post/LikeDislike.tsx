import useLikeDislikeToggle from "../../../lib/hooks/regular-hooks/useUpvoteDownvoteToggle"

const LikeDislike = () => {
  const { UpvoteIcon, DownvoteIcon } = useLikeDislikeToggle()

  return (
    <div className="flex gap-2">
      <UpvoteIcon />
      <DownvoteIcon />
    </div>
  )
}

export default LikeDislike
