import { createSlice } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import { setUserDetailsReducer } from "./profileActions"

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
  },
})

export const { setUserDetails } = profileSlice.actions

export default profileSlice.reducer
