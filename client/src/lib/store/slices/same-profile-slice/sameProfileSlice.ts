import { createSlice } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import {
  blockOtherUserReducer,
  changeProfilePictureReducer,
  copyPostReducer,
  followOtherUserReducer,
  savePostReducer,
  setUserDetailsReducer,
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
    copyPost: copyPostReducer,
    followUser: followOtherUserReducer,
    unfollowUser: unfollowOtherUserReducer,
    blockUser: blockOtherUserReducer,
  },
})

export const {
  setUserDetails,
  changeProfilePicture,
  savePost,
  copyPost,
  followUser,
  unfollowUser,
  blockUser,
} = sameProfileSlice.actions

export default sameProfileSlice.reducer
