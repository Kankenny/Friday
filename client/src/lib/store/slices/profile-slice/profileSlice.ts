import { createSlice } from "@reduxjs/toolkit"
import { profileSliceType } from "../../../types/slice-types/profileSliceType"

const initialState: profileSliceType = {
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
  reducers: {},
})

export default profileSlice.reducer
