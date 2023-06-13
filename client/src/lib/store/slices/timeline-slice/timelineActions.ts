import { PayloadAction } from "@reduxjs/toolkit"
import { TimelineSliceType } from "../../../types/slice-types/TimelineSliceType"

export const setTimelineReducer = (
  state: TimelineSliceType,
  action: PayloadAction<TimelineSliceType>
) => {
  return { ...state, ...action.payload }
}
