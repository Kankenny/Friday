import { createSlice } from "@reduxjs/toolkit"
import { PostDetailSliceType } from "../../../types/slice-types/PostDetailSliceType"
import { createCommentReducer, setPostDetailReducer } from "./postDetailActions"

const initialState: PostDetailSliceType = {
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
    createComment: createCommentReducer,
  },
})

export const { setPostDetails } = postDetailSlice.actions

export default postDetailSlice.reducer
