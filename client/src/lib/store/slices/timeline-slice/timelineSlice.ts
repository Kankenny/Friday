import { createSlice } from "@reduxjs/toolkit"
import {
  createSubtaskReducer,
  createTaskReducer,
  deletePostReducer,
  deleteTaskReducer,
  setTimelineReducer,
  updatePostReducer,
  updateSubtaskReducer,
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
    updateSubtask: updateSubtaskReducer,
    deleteTask: deleteTaskReducer,
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
  updateSubtask,
} = timelineSlice.actions

export default timelineSlice.reducer
