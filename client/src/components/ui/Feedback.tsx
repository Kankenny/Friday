import * as React from "react"
import Snackbar from "@mui/material/Snackbar"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../lib/hooks/redux-hook/useTypedSelector"
import { setFeedback } from "../../lib/store/slices/feedback-slice/feedbackSlice"

export default function Feedback() {
  const dispatch = useDispatch()
  const { feedbackMessage, feedbackType } = useTypedSelector(
    (state) => state.feedback
  )

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setFeedback({ feedbackMessage: "", feedbackType: "success" }))
  }

  return (
    <Snackbar
      open={Boolean(feedbackMessage)}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <div
        className={`px-6 py-3 rounded-md text-secondary shadow-xl z-10 ${
          feedbackType === "success" ? "bg-tertiary" : "bg-red-500"
        }`}
      >
        {feedbackMessage}
      </div>
    </Snackbar>
  )
}
