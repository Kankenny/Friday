import { PayloadAction } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"

export const setOtherUserDetailsReducer = (
  state: ProfileSliceType,
  action: PayloadAction<ProfileSliceType>
) => {
  return { ...state, ...action.payload }
}

export const followedUserReducer = (
  state: ProfileSliceType,
  action: PayloadAction<ProfileSliceType>
) => {
  state.followers.push(action.payload)
}

export const unfollowedUserReducer = (state: ProfileSliceType) => {
  // hacky way to reduce number of followers
  // note: we only use this to display the NUMBER of followers of the other user
  state.followers = state.followers.slice(1)
}
