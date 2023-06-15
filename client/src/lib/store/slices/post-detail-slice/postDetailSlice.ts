import { createSlice } from "@reduxjs/toolkit"
import { PostType } from "../../../types/primitive-types/PostType"
import { setPostDetailReducer } from "./postDetailActions"

const initialState: PostType = {
  _id: "",
  title: "",
  creatorId: "",
  creatorUsername: "",
  color: "",
  category: "personal",
  visibility: "personal",
  upvotes: 0,
  downvotes: 0,
  authorization: "personal",
  authorizedUsers: [],
  upvotedBy: [],
  downvotedBy: [],
  tasks: [],
  comments: [],
}

const postDetailSlice = createSlice({
  name: "post-detail",
  initialState,
  reducers: {
    setPostDetails: setPostDetailReducer,
  },
})

export const { setPostDetails } = postDetailSlice.actions

export default postDetailSlice.reducer
