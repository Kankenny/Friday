import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice/authSlice"
import profileReducer from "./slices/profile-slice/profileSlice"

const store = configureStore({
  reducer: { auth: authReducer, profile: profileReducer },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
