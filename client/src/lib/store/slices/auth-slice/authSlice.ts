import { createSlice } from "@reduxjs/toolkit"
import { authSliceType } from "../../../types/authSliceType"
import { persistLoginReducer, loginReducer, logoutReducer } from "./authActions"

const initialState: authSliceType = {
  isLoggedIn: false,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    persistLogin: persistLoginReducer,
    login: loginReducer,
    logout: logoutReducer,
  },
})

export const { persistLogin, login, logout } = authSlice.actions

export default authSlice.reducer
