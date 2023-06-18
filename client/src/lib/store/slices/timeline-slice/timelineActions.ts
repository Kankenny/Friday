import { PayloadAction } from "@reduxjs/toolkit"
import { TimelineSliceType } from "../../../types/slice-types/TimelineSliceType"
import { PostType } from "../../../types/primitive-types/PostType"
import { TaskType } from "../../../types/primitive-types/TaskType"
import { SubtaskType } from "../../../types/primitive-types/SubtaskType"

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

export const createSubtaskReducer = (
  state: TimelineSliceType,
  action: PayloadAction<{
    post: PostType
    subtask: SubtaskType
    task: TaskType
  }>
) => {
  const { post, subtask, task } = action.payload

  // Find the task in the post
  const targetTaskIndex = post.tasks.findIndex((t) => t._id === task._id)

  if (targetTaskIndex !== -1) {
    // Create a new copy of the subtasks array with the new subtask added
    const updatedSubtasks = [...task.subtasks, subtask]

    // Create a new copy of the tasks array with the updated subtasks
    const updatedTasks = [...post.tasks]
    updatedTasks[targetTaskIndex] = {
      ...task,
      subtasks: updatedSubtasks,
    }

    // Update the task with the updated task
    return {
      ...state,
      posts: state.posts.map((p) =>
        p._id === post._id ? { ...p, tasks: updatedTasks } : p
      ),
    }
  }
}

export const updateTaskReducer = (
  state: TimelineSliceType,
  action: PayloadAction<{ post: PostType; task: TaskType }>
) => {
  const { post, task } = action.payload

  // Find the index of the task in the post's tasks array
  const taskIndex = post.tasks.findIndex((t) => t._id === task._id)

  // If the task is found, update it in the state
  if (taskIndex !== -1) {
    const existingSubtasks = post.tasks[taskIndex].subtasks
    const updatedTask = {
      ...task,
      subtasks: existingSubtasks, // Retain the existing subtasks
    }

    const updatedPost = {
      ...post,
      tasks: post.tasks.map((t) => (t._id === task._id ? updatedTask : t)),
    }

    // Find the index of the post in the state's posts array
    const postIndex = state.posts.findIndex((p) => p._id === post._id)

    // If the post is found, update it in the state
    if (postIndex !== -1) {
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, postIndex),
          updatedPost,
          ...state.posts.slice(postIndex + 1),
        ],
      }
    }
  }

  return state
}

export const updateSubtaskReducer = (
  state: TimelineSliceType,
  action: PayloadAction<{
    post: PostType
    subtask: SubtaskType
    task: TaskType
  }>
) => {
  const { post, subtask, task } = action.payload

  // Find the index of the task in the post's tasks array
  const taskIndex = post.tasks.findIndex((t) => t._id === task._id)

  // If the task is found, update the subtask within it
  if (taskIndex !== -1) {
    const updatedTask = {
      ...task,
      subtasks: task.subtasks.map((st) =>
        st._id === subtask._id ? { ...st, ...subtask } : st
      ),
    }

    // Find the index of the post in the state's posts array
    const postIndex = state.posts.findIndex((p) => p._id === post._id)

    // If the post and task are found, update the subtask in the state
    if (postIndex !== -1) {
      const updatedPost = {
        ...post,
        tasks: [
          ...post.tasks.slice(0, taskIndex),
          updatedTask,
          ...post.tasks.slice(taskIndex + 1),
        ],
      }

      return {
        ...state,
        posts: [
          ...state.posts.slice(0, postIndex),
          updatedPost,
          ...state.posts.slice(postIndex + 1),
        ],
      }
    }
  }

  return state
}
