import { createSlice } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import {
  changeProfilePictureReducer,
  copyPostReducer,
  followOtherUserReducer,
  savePostReducer,
  setUserDetailsReducer,
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
  },
})

export const {
  setUserDetails,
  changeProfilePicture,
  savePost,
  copyPost,
  followUser,
} = sameProfileSlice.actions

export default sameProfileSlice.reducer
