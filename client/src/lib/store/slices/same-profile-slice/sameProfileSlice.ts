import { createSlice } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import {
  changeProfilePictureReducer,
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
  },
})

export const { setUserDetails, changeProfilePicture } = sameProfileSlice.actions

export default sameProfileSlice.reducer
