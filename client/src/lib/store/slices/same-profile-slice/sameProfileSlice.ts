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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserDetails: setUserDetailsReducer,
    changeProfilePicture: changeProfilePictureReducer,
  },
})

export const { setUserDetails, changeProfilePicture } = profileSlice.actions

export default profileSlice.reducer
