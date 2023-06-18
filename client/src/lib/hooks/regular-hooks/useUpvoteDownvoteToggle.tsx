import { useState } from "react"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"

const useUpvoteDownvoteToggle = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsLiked(false)
    setIsDisliked(!isDisliked)
  }

  const UpvoteIcon = () => {
    if (isLiked) {
      return (
        <ThumbUpIcon
          onClick={handleLike}
          className="cursor-pointer hover:text-tertiary duration-200 ease-in-out hover:scale-110"
        />
      )
    } else {
      return (
        <ThumbUpOffAltIcon
          onClick={handleLike}
          className="cursor-pointer hover:text-tertiary duration-200 ease-in-out hover:scale-110"
        />
      )
    }
  }

  const DownvoteIcon = () => {
    if (isDisliked) {
      return (
        <ThumbDownIcon
          onClick={handleDislike}
          className="cursor-pointer hover:text-tertiary duration-200 ease-in-out hover:scale-110"
        />
      )
    } else {
      return (
        <ThumbDownOffAltIcon
          onClick={handleDislike}
          className="cursor-pointer hover:text-tertiary duration-200 ease-in-out hover:scale-110"
        />
      )
    }
  }

  return { UpvoteIcon, DownvoteIcon }
}

export default useUpvoteDownvoteToggle
