import { PayloadAction } from "@reduxjs/toolkit"
import { PostDetailSliceType } from "../../../types/slice-types/PostDetailSliceType"
import { DetailedCommentType } from "../../../types/primitive-types/DetailedCommentType"
import { UserType } from "../../../types/primitive-types/UserType"

export const setPostDetailReducer = (
  state: PostDetailSliceType,
  action: PayloadAction<PostDetailSliceType[]>
) => {
  console.log(action.payload)
  return { ...state, ...action.payload }
}

export const createCommentReducer = (
  state: PostDetailSliceType,
  action: PayloadAction<DetailedCommentType>
) => {
  return {
    ...state,
    comments: [...state.comments, action.payload],
  }
}

export const authorizeUserReducer = (
  state: PostDetailSliceType,
  action: PayloadAction<UserType>
) => {
  state.authorizedUsers.push(action.payload)
}

export const deauthorizeUserReducer = (
  state: PostDetailSliceType,
  action: PayloadAction<UserType>
) => {
  const filteredAuthUsers = state.authorizedUsers.filter(
    (user) => user._id !== action.payload._id
  )
  state.authorizedUsers = filteredAuthUsers
}
