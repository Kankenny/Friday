import { useState } from "react"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import postAPI from "../../services/axios-instances/postAPI"

type Props = {
  postId: string
  isAlreadyLiked: boolean
  isAlreadyDisliked: boolean
}

const useUpvoteDownvoteToggle = ({
  postId,
  isAlreadyLiked,
  isAlreadyDisliked,
}: Props) => {
  const [isLiked, setIsLiked] = useState(isAlreadyLiked)
  const [isDisliked, setIsDisliked] = useState(isAlreadyDisliked)

  const handleLike = async () => {
    try {
      if (!isAlreadyLiked) {
        await postAPI.put(`/${postId}/upvote`)
      } else {
        await postAPI.put(`/${postId}/revert`)
      }
      setIsLiked(!isLiked)
      setIsDisliked(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDislike = async () => {
    try {
      if (!isAlreadyDisliked) {
        await postAPI.put(`/${postId}/downvote`)
      } else {
        await postAPI.put(`/${postId}/revert`)
      }
      setIsLiked(false)
      setIsDisliked(!isDisliked)
    } catch (err) {
      console.error(err)
    }
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
