import { createSlice } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"
import {
  followedUserReducer,
  setOtherUserDetailsReducer,
  unfollowedUserReducer,
} from "./otherProfileActions"

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
    setOtherUserDetails: setOtherUserDetailsReducer,
    followedUser: followedUserReducer,
    unfollowedUser: unfollowedUserReducer,
  },
})

export const { setOtherUserDetails, followedUser, unfollowedUser } =
  otherProfileSlice.actions

export default otherProfileSlice.reducer
