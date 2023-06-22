import { createSlice } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import {
  blockOtherUserReducer,
  changeProfilePictureReducer,
  copyPostToProfileReducer,
  followOtherUserReducer,
  savePostReducer,
  setUserDetailsReducer,
  unblockOtherUserReducer,
  unfollowOtherUserReducer,
} from "./sameProfileActions"

const initialState: ProfileSliceType = {
  _id: "",
  firstName: "",
  lastName: "",
  profilePicture: "",
  email: "",
  username: "",
  following: [],
  followers: [],
  blocked: [],
  posts: [],
  upvotedPosts: [],
  downvotedPosts: [],
  savedPosts: [],
  authorizedPosts: [],
  notifications: [],
  comments: [],
}

const sameProfileSlice = createSlice({
  name: "same-profile",
  initialState,
  reducers: {
    setUserDetails: setUserDetailsReducer,
    changeProfilePicture: changeProfilePictureReducer,
    savePost: savePostReducer,
    copyPostToProfile: copyPostToProfileReducer,
    followUser: followOtherUserReducer,
    unfollowUser: unfollowOtherUserReducer,
    blockUser: blockOtherUserReducer,
    unblockUser: unblockOtherUserReducer,
  },
})

export const {
  setUserDetails,
  changeProfilePicture,
  savePost,
  copyPostToProfile,
  followUser,
  unfollowUser,
  blockUser,
  unblockUser,
} = sameProfileSlice.actions

export default sameProfileSlice.reducer
