import { createSlice } from "@reduxjs/toolkit"
import {
  createSubtaskReducer,
  createTaskReducer,
  deletePostReducer,
  setTimelineReducer,
  updatePostReducer,
  updateTaskReducer,
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
    updateTask: updateTaskReducer,
  },
})

export const {
  setTimeline,
  createPost,
  deletePost,
  updatePost,
  createTask,
  createSubtask,
  updateTask,
} = timelineSlice.actions

export default timelineSlice.reducer
