import { createSlice } from "@reduxjs/toolkit"
import { setTimelineReducer } from "./timelineActions"
import { TimelineSliceType } from "../../../types/slice-types/TimelineSliceType"

const initialState: TimelineSliceType = { posts: [] }

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setTimeline: setTimelineReducer,
  },
})

export const { setTimeline } = timelineSlice.actions

export default timelineSlice.reducer
