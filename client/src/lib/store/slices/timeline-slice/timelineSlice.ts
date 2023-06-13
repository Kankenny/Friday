import { createSlice } from "@reduxjs/toolkit"
import { setTimelineReducer } from "./timelineActions"
import { createPostReducer } from "./timelineActions"
import { TimelineSliceType } from "../../../types/slice-types/TimelineSliceType"

const initialState: TimelineSliceType = { posts: [], isLoading: true }

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setTimeline: setTimelineReducer,
    createPost: createPostReducer,
  },
})

export const { setTimeline, createPost } = timelineSlice.actions

export default timelineSlice.reducer
