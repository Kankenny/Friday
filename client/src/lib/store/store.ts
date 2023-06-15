import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice/authSlice"
import sameProfileReducer from "./slices/same-profile-slice/sameProfileSlice"
import timelineReducer from "./slices/timeline-slice/timelineSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: sameProfileReducer,
    timeline: timelineReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
