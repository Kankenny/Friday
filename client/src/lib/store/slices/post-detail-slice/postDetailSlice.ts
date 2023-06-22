import { createSlice } from "@reduxjs/toolkit"
import { PostDetailSliceType } from "../../../types/slice-types/PostDetailSliceType"
import {
  authorizeUserReducer,
  createCommentReducer,
  setPostDetailReducer,
} from "./postDetailActions"

// DONT ADD THE MISSING PROPERTY. IT WILL CAUSE SOME NONE SERIALIZABLE REDUX ERR
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
    authorizeUser: authorizeUserReducer,
  },
})

export const { setPostDetails, createComment, authorizeUser } =
  postDetailSlice.actions

export default postDetailSlice.reducer
