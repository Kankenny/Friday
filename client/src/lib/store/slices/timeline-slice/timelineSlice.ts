import { createSlice } from "@reduxjs/toolkit"
import {
  createSubtaskReducer,
  createTaskReducer,
  deletePostReducer,
  deleteSubtaskReducer,
  deleteTaskReducer,
  queryTimelineReducer,
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
    queryTimeline: queryTimelineReducer,
    createPost: createPostReducer,
    deletePost: deletePostReducer,
    updatePost: updatePostReducer,
    createTask: createTaskReducer,
    createSubtask: createSubtaskReducer,
    updateTask: updateTaskReducer,
    updateSubtask: updateSubtaskReducer,
    deleteTask: deleteTaskReducer,
    deleteSubtask: deleteSubtaskReducer,
  },
})

export const {
  setTimeline,
  queryTimeline,
  createPost,
  deletePost,
  updatePost,
  createTask,
  createSubtask,
  updateTask,
  updateSubtask,
  deleteTask,
  deleteSubtask,
} = timelineSlice.actions

export default timelineSlice.reducer
