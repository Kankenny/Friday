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

export const queryTimelineReducer = (
  state: TimelineSliceType,
  action: PayloadAction<string>
) => {
  const query = action.payload
  if (query.length === 0) {
    state.didQuery = false
    return
  }

  const filteredPosts = state.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.creatorUsername.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
  )

  state.queriedPosts = filteredPosts
  state.didQuery = query.length > 0
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

export const deleteTaskReducer = (
  state: TimelineSliceType,
  action: PayloadAction<{ post: PostType; task: TaskType }>
) => {
  const { post, task } = action.payload
  const postIndex = state.posts.findIndex((p) => p._id === post._id)
  const taskIndex = post.tasks.findIndex((t) => t._id === task._id)

  if (taskIndex !== -1 && postIndex !== -1) {
    const updatedTasks = [
      ...post.tasks.slice(0, taskIndex),
      ...post.tasks.slice(taskIndex + 1),
    ]

    const updatedState = {
      ...state,
      posts: [
        ...state.posts.slice(0, postIndex),
        {
          ...state.posts[postIndex],
          tasks: updatedTasks,
        },
        ...state.posts.slice(postIndex + 1),
      ],
    }

    return updatedState
  }

  return state
}

export const deleteSubtaskReducer = (
  state: TimelineSliceType,
  action: PayloadAction<{
    post: PostType
    task: TaskType
    subtask: SubtaskType
  }>
) => {
  const { post, task, subtask } = action.payload
  const postIndex = state.posts.findIndex((p) => p._id === post._id)
  const taskIndex = post.tasks.findIndex((t) => t._id === task._id)
  const subtaskIndex = task.subtasks.findIndex((s) => s._id === subtask._id)

  if (subtaskIndex !== -1 && taskIndex !== -1 && postIndex !== -1) {
    // Get the reference to the existing subtasks array
    const subtasks = state.posts[postIndex].tasks[taskIndex].subtasks

    // Create a new subtasks array without the deleted subtask
    const updatedSubtasks = [
      ...subtasks.slice(0, subtaskIndex),
      ...subtasks.slice(subtaskIndex + 1),
    ]

    // Create a new tasks array with the updated subtasks array
    const updatedTasks = [
      ...post.tasks.slice(0, taskIndex),
      {
        ...task,
        subtasks: updatedSubtasks,
      },
      ...post.tasks.slice(taskIndex + 1),
    ]

    // Create a new posts array with the updated tasks array
    const updatedPosts = [
      ...state.posts.slice(0, postIndex),
      {
        ...post,
        tasks: updatedTasks,
      },
      ...state.posts.slice(postIndex + 1),
    ]

    // Create a new state object with the updated posts array
    const updatedState: TimelineSliceType = {
      ...state,
      posts: updatedPosts,
    }

    return updatedState
  }

  return state
}
