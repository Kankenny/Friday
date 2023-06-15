import { PayloadAction } from "@reduxjs/toolkit"
import { PostDetailSliceType } from "../../../types/slice-types/PostDetailSliceType"

export const setPostDetailReducer = (
  state: PostDetailSliceType,
  action: PayloadAction<PostDetailSliceType[]>
) => {
  return { ...state, ...action.payload }
}
