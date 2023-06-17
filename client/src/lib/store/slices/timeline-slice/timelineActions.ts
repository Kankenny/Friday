import { PayloadAction } from "@reduxjs/toolkit"
import { TimelineSliceType } from "../../../types/slice-types/TimelineSliceType"
import { PostType } from "../../../types/primitive-types/PostType"

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
