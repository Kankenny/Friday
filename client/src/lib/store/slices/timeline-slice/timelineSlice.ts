import { createSlice } from "@reduxjs/toolkit"
import {
  createSubtaskReducer,
  createTaskReducer,
  deletePostReducer,
  setTimelineReducer,
  updatePostReducer,
} from "./timelineActions"
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
    updatePost: updatePostReducer,
    createTask: createTaskReducer,
    createSubtask: createSubtaskReducer,
  },
})

export const {
  setTimeline,
  createPost,
  deletePost,
  updatePost,
  createTask,
  createSubtask,
} = timelineSlice.actions

export default timelineSlice.reducer
