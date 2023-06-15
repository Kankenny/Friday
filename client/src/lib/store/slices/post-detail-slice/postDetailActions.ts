import { PayloadAction } from "@reduxjs/toolkit"
import { PostType } from "../../../types/primitive-types/PostType"

export const setPostDetailReducer = (
  state: PostType,
  action: PayloadAction<PostType[]>
) => {
  return { ...state, ...action.payload }
}
