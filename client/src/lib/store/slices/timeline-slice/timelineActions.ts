import { PayloadAction } from "@reduxjs/toolkit"
import { TimelineSliceType } from "../../../types/slice-types/TimelineSliceType"
import { PostType } from "../../../types/primitive-types/PostType"
import { TaskType } from "../../../types/primitive-types/TaskType"

export const setTimelineReducer = (
  state: TimelineSliceType,
  action: PayloadAction<PostType[]>
) => {
  state.posts = action.payload
  state.isLoading = false
}

export const createPostReducer = (
  state: TimelineSliceType,
  action: PayloadAction<PostType>
) => {
  state.posts = [action.payload, ...state.posts]
}

export const deletePostReducer = (
  state: TimelineSliceType,
  action: PayloadAction<PostType>
) => {
  const filteredPosts = state.posts.filter(
    (post) => post._id !== action.payload._id
  )
  state.posts = filteredPosts
}

export const updatePostReducer = (
  state: TimelineSliceType,
  action: PayloadAction<PostType>
) => {
  const updatedPost = action.payload
  const postIndex = state.posts.findIndex(
    (post) => post._id === updatedPost._id
  )

  if (postIndex !== -1) {
    state.posts[postIndex] = updatedPost
  }
}

export const createTaskReducer = (
  state: TimelineSliceType,
  action: PayloadAction<{ task: TaskType; post: PostType }>
) => {
  const { task, post } = action.payload
  const updatedTasks = [...post.tasks, task]
  return {
    ...state,
    // Update the post with the updated tasks
    posts: state.posts.map((p) =>
      p._id === post._id ? { ...p, tasks: updatedTasks } : p
    ),
  }
}
