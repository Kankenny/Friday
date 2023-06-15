import { createSlice } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import { setUserDetailsReducer } from "./otherProfileActions"

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

const otherProfileSlice = createSlice({
  name: "other-profile",
  initialState,
  reducers: {
    setUserDetails: setUserDetailsReducer,
  },
})

export const { setUserDetails } = otherProfileSlice.actions

export default otherProfileSlice.reducer
