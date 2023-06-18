import { useState } from "react"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import postAPI from "../../services/axios-instances/postAPI"
import { PostType } from "../../types/primitive-types/PostType"
import { useDispatch } from "react-redux"
import { updatePost } from "../../store/slices/timeline-slice/timelineSlice"

type Props = {
  post: PostType
  isAlreadyLiked: boolean
  isAlreadyDisliked: boolean
}

const useUpvoteDownvoteToggle = ({
  post,
  isAlreadyLiked,
  isAlreadyDisliked,
}: Props) => {
  const dispatch = useDispatch()
  const [isLiked, setIsLiked] = useState(isAlreadyLiked)
  const [isDisliked, setIsDisliked] = useState(isAlreadyDisliked)

  const handleLike = async () => {
    try {
      if (!isAlreadyLiked) {
        await postAPI.put(`/${post._id}/upvote`)
        const updatedPost = { ...post, upvotes: post.upvotes + 1 }
        dispatch(updatePost(updatedPost))
      } else {
        await postAPI.put(`/${post._id}/revert`)
        const updatedPost = { ...post, upvotes: post.upvotes - 1 }
        dispatch(updatePost(updatedPost))
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
        await postAPI.put(`/${post._id}/downvote`)
        const updatedPost = { ...post, downvotes: post.downvotes + 1 }
        dispatch(updatePost(updatedPost))
      } else {
        await postAPI.put(`/${post._id}/revert`)
        const updatedPost = { ...post, downvotes: post.downvotes - 1 }
        dispatch(updatePost(updatedPost))
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
