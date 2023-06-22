import { isAxiosError } from "axios"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../../lib/hooks/redux-hook/useTypedSelector"
import userAPI from "../../../lib/services/axios-instances/userAPI"
import { setFeedback } from "../../../lib/store/slices/feedback-slice/feedbackSlice"
import StyledButton from "../StyledButton"
import { UserType } from "../../../lib/types/primitive-types/UserType"

type Props = {
  user: UserType
}

const FollowAction = ({ user }: Props) => {
  const {
    _id: currentId,
    username: currentUsername,
    followers: currUsers,
  } = useTypedSelector((state) => state.sameProfile)
  const isSameUser = currentUsername === user.username

  const isFollowedBack = currUsers.includes(user)
  const buttonText = isFollowedBack ? "Following" : "Follow"

  const dispatch = useDispatch()
  const handleFollowOrUnfollowClick = async () => {
    try {
      const action = isFollowedBack ? "unfollow" : "follow"
      const { data } = await userAPI.put(`/${currentId}/${action}/${user._id}`)
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

export default FollowAction
