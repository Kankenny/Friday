import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice/authSlice"
import sameProfileReducer from "./slices/same-profile-slice/sameProfileSlice"
import otherProfileReducer from "./slices/other-profile-slice/otherProfileSlice"
import timelineReducer from "./slices/timeline-slice/timelineSlice"
import postDetailReducer from "./slices/post-detail-slice/postDetailSlice"
import feedbackReducer from "./slices/feedback-slice/feedbackSlice"
import usersReducer from "./slices/users-slice/usersSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    sameProfile: sameProfileReducer,
    otherProfile: otherProfileReducer,
    timeline: timelineReducer,
    postDetail: postDetailReducer,
    feedback: feedbackReducer,
    users: usersReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
