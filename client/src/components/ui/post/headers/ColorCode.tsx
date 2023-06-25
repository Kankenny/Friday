import ColorPicker from "../../ColorPicker"
import { useState, useRef } from "react"
import Popper from "@mui/material/Popper"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { useDispatch } from "react-redux"
import { setFeedback } from "../../../../lib/store/slices/feedback-slice/feedbackSlice"

type Props = {
  initialColor: string
  post: PostType
}

const ColorCode = ({ initialColor, post }: Props) => {
  const dispatch = useDispatch()
  const { _id: authUserId } = useTypedSelector((state) => state.sameProfile)
  const [color, setColor] = useState(initialColor)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const handleColorChange = (color: string) => {
    setColor(color)
  }

  const isCurrUserAuthorized =
    post.authorization === "public" ||
    (post.authorization === "private" &&
      post.authorizedUsers.some((user) => user._id === authUserId)) ||
    post.creatorId._id === authUserId

  const handleOpenColorPicker = () => {
    if (!isCurrUserAuthorized) {
      dispatch(
        setFeedback({
          feedbackMessage: "Unauthorized Request, You cannot update this post!",
          feedbackType: "error",
        })
      )
      return
    }

    setOpen(!open)
  }

  return (
    <div
      style={{ backgroundColor: color }}
      className={`h-2 rounded-t-sm`}
      onClick={handleOpenColorPicker}
      ref={anchorRef}
    >
      <Popper open={open} anchorEl={anchorRef.current}>
        <ColorPicker
          initialColor={initialColor}
          postId={post._id}
          handleParentColorChange={handleColorChange}
          setOpen={setOpen}
        />
      </Popper>
    </div>
  )
}

export default ColorCode
