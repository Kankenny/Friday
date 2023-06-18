import { PayloadAction } from "@reduxjs/toolkit"
import { FeedbackSliceType } from "../../../types/slice-types/FeedbackSliceType"

export const setFeedbackReducer = (
  _state: FeedbackSliceType,
  action: PayloadAction<FeedbackSliceType>
) => {
  return { ...action.payload }
}
