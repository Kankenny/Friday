import { createSlice } from "@reduxjs/toolkit"
import { FeedbackSliceType } from "../../../types/slice-types/FeedbackSliceType"
import { setFeedbackReducer } from "./feedbackActions"

const initialState: FeedbackSliceType = {
  feedbackMessage: "",
  feedbackType: "success",
}

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedback: setFeedbackReducer,
  },
})

export const { setFeedback } = feedbackSlice.actions

export default feedbackSlice.reducer
