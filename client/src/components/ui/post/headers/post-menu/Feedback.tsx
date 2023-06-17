import * as React from "react"
import Snackbar from "@mui/material/Snackbar"

type Props = {
  feedbackMessage: string
  feedbackType: "success" | "error"
  setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function Feedback({
  feedbackMessage,
  feedbackType,
  setFeedbackMessage,
}: Props) {
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setFeedbackMessage("")
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
