import { PayloadAction } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import { PostType } from "../../../types/primitive-types/PostType"

export const setUserDetailsReducer = (
  state: ProfileSliceType,
  action: PayloadAction<ProfileSliceType>
) => {
  return { ...state, ...action.payload }
}

export const savePostReducer = (
  state: ProfileSliceType,
  action: PayloadAction<PostType>
) => {
  state.savedPosts.push(action.payload)
}

export const changeProfilePictureReducer = (
  state: ProfileSliceType,
  action: PayloadAction<string>
) => {
  state.profilePicture = action.payload
}
