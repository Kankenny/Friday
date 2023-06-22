import { isAxiosError } from "axios"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../../lib/hooks/redux-hook/useTypedSelector"
import userAPI from "../../../lib/services/axios-instances/userAPI"
import { setFeedback } from "../../../lib/store/slices/feedback-slice/feedbackSlice"
import StyledButton from "../StyledButton"
import { UserType } from "../../../lib/types/primitive-types/UserType"
import {
  followUser,
  unfollowUser,
} from "../../../lib/store/slices/same-profile-slice/sameProfileSlice"

type Props = {
  user: UserType
}

const FollowAction = ({ user }: Props) => {
  const {
    _id: currentId,
    username: currentUsername,
    following: currFollowing,
  } = useTypedSelector((state) => state.sameProfile)
  const isSameUser = currentUsername === user.username

  const isAlreadyFollowed = currFollowing.includes(user)
  const buttonText = isAlreadyFollowed ? "Following" : "Follow"

  const dispatch = useDispatch()
  const handleFollowOrUnfollowClick = async () => {
    try {
      const action = isAlreadyFollowed ? "unfollow" : "follow"
      const { data } = await userAPI.put(`/${currentId}/${action}/${user._id}`)
      dispatch(
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
      )
      if (isAlreadyFollowed) {
        dispatch(unfollowUser(user))
      } else {
        dispatch(followUser(user))
      }
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
