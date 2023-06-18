import React from "react"
import useLikeDislikeToggle from "../../../lib/hooks/regular-hooks/useLikeDislikeToggle"

const LikeDislike = () => {
  return (
    <div className="flex gap-2">
      <ThumbUpOffAltIcon className="cursor-pointer" />
      <ThumbDownOffAltIcon className="cursor-pointer" />
    </div>
  )
}

export default LikeDislike
