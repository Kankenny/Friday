import { isAxiosError } from "axios"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../../lib/hooks/redux-hook/useTypedSelector"
import userAPI from "../../../lib/services/axios-instances/userAPI"
import { setFeedback } from "../../../lib/store/slices/feedback-slice/feedbackSlice"
import StyledButton from "../StyledButton"
import { UserType } from "../../../lib/types/primitive-types/UserType"
import {
  blockUser,
  unblockUser,
} from "../../../lib/store/slices/same-profile-slice/sameProfileSlice"
import { ProfileSliceType } from "../../../lib/types/slice-types/ProfileSliceType"
import { decreaseUserFollower } from "../../../lib/store/slices/other-profile-slice/otherProfileSlice"

type Props = {
  user: UserType | ProfileSliceType
}

const BlockAction = ({ user }: Props) => {
  const {
    _id: currentId,
    username: currentUsername,
    following: currFollowing,
    blocked: currBlocked,
  } = useTypedSelector((state) => state.sameProfile)
  const isSameUser = currentUsername === user.username

  const isAlreadyBlocked = currBlocked.includes(user)
  const buttonText = isAlreadyBlocked ? "Blocked" : "Block"

  const dispatch = useDispatch()
  const handleBlockOrUnblockClick = async () => {
    try {
      const action = isAlreadyBlocked ? "unblock" : "block"
      const { data } = await userAPI.put(`/${currentId}/${action}/${user._id}`)
      dispatch(
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
      )
      if (isAlreadyBlocked) {
        dispatch(unblockUser(user))
      } else {
        dispatch(blockUser(user))

        if (currFollowing.some((f) => f._id === user._id)) {
          dispatch(decreaseUserFollower())
        }
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
    <StyledButton buttonText={buttonText} onClick={handleBlockOrUnblockClick} />
  ) : null
}

export default BlockAction
