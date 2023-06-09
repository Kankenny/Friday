import { createSlice } from "@reduxjs/toolkit"
import { authSliceType } from "../../../types/authSliceType"
import {
  persistLogin as persistLoginFunction,
  login as loginFunction,
  logout as logoutFunction,
} from "./authActions"

const initialState: authSliceType = {
  isLoggedIn: false,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    persistLogin: persistLoginFunction,
    login: loginFunction,
    logout: logoutFunction,
  },
})

export const { persistLogin, login, logout } = authSlice.actions

export default authSlice.reducer
