import { PayloadAction } from "@reduxjs/toolkit"
import { TimelineSliceType } from "../../../types/slice-types/TimelineSliceType"
import { PostType } from "../../../types/primitive-types/PostType"

export const setTimelineReducer = (
  state: TimelineSliceType,
  action: PayloadAction<PostType[]>
) => {
  state.posts = action.payload
  state.isLoading = false
}
