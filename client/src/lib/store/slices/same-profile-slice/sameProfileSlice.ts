import { createSlice } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import {
  changeProfilePictureReducer,
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
  },
})

export const { setUserDetails, changeProfilePicture, savePost } =
  sameProfileSlice.actions

export default sameProfileSlice.reducer
