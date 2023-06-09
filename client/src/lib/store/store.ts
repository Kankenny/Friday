import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice/authSlice"

const store = configureStore({
  reducer: { auth: authReducer },
})

export default store
