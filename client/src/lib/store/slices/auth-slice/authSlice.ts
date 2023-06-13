import { createSlice } from "@reduxjs/toolkit"
import { AuthSliceType } from "../../../types/slice-types/AuthSliceType"
import { persistLoginReducer, loginReducer, logoutReducer } from "./authActions"

const initialState: AuthSliceType = {
  isLoggedIn: false,
  _id: "",
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
