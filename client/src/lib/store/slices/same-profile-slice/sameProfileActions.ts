import { PayloadAction } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import { PostType } from "../../../types/primitive-types/PostType"
import { UserType } from "../../../types/primitive-types/UserType"

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

export const copyPostReducer = (
  state: ProfileSliceType,
  action: PayloadAction<PostType>
) => {
  state.posts.push(action.payload)
}

export const changeProfilePictureReducer = (
  state: ProfileSliceType,
  action: PayloadAction<string>
) => {
  state.profilePicture = action.payload
}

export const followOtherUserReducer = (
  state: ProfileSliceType,
  action: PayloadAction<UserType>
) => {
  state.following.push(action.payload)
}

export const unfollowOtherUserReducer = (
  state: ProfileSliceType,
  action: PayloadAction<UserType>
) => {
  const following = state.following
  const filteredFollowing = following.filter(
    (user) => user._id !== action.payload._id
  )
  state.following = filteredFollowing
}

export const blockOtherUserReducer = (
  state: ProfileSliceType,
  action: PayloadAction<UserType>
) => {
  state.blocked.push(action.payload)

  // Remove blocked user from being potentially followed
  const filteredFollowing = state.following.filter(
    (user) => user._id !== action.payload._id
  )
  state.following = filteredFollowing
}

export const unblockOtherUserReducer = (
  state: ProfileSliceType,
  action: PayloadAction<UserType>
) => {
  const blocked = state.blocked
  const filteredBlocked = blocked.filter(
    (user) => user._id !== action.payload._id
  )
  state.blocked = filteredBlocked
}
