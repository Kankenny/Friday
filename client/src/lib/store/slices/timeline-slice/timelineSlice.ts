import { createSlice } from "@reduxjs/toolkit"

const initialState = { posts: [] }

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {},
})

export default timelineSlice.reducer
