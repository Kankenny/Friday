import { createSlice } from "@reduxjs/toolkit"
import { deletePostReducer, setTimelineReducer } from "./timelineActions"
import { createPostReducer } from "./timelineActions"
import { TimelineSliceType } from "../../../types/slice-types/TimelineSliceType"

const initialState: TimelineSliceType = { posts: [], isLoading: true }

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setTimeline: setTimelineReducer,
    createPost: createPostReducer,
    deletePost: deletePostReducer,
  },
})

export const { setTimeline, createPost, deletePost } = timelineSlice.actions

export default timelineSlice.reducer
