import { isAxiosError } from "axios"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import { UserType } from "../../../../../lib/types/primitive-types/UserType"
import StyledButton from "../../../../ui/StyledButton"
import { useDispatch } from "react-redux"
import { setFeedback } from "../../../../../lib/store/slices/feedback-slice/feedbackSlice"
import userAPI from "../../../../../lib/services/axios-instances/userAPI"

type Props = {
  follower: UserType
}

const FollowerAction = ({ follower }: Props) => {
  const {
    _id: currentId,
    username: currentUsername,
    followers: currFollowers,
  } = useTypedSelector((state) => state.sameProfile)
  const isSameUser = currentUsername === follower.username

  const isFollowedBack = currFollowers.includes(follower)
  const buttonText = isFollowedBack ? "Following" : "Follow"

  const dispatch = useDispatch()
  const handleFollowOrUnfollowClick = async () => {
    try {
      const action = isFollowedBack ? "unfollow" : "follow"
      const { data } = await userAPI.put(
        `/${currentId}/${action}/${follower._id}`
      )
      dispatch(
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
      )
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          setFeedback({
            feedbackMessage: err.response?.data.message,
            feedbackType: "error",
          })
        )
      }
    }
  }

  return !isSameUser ? (
    <StyledButton
      buttonText={buttonText}
      onClick={handleFollowOrUnfollowClick}
    />
  ) : null
}

export default FollowerAction
