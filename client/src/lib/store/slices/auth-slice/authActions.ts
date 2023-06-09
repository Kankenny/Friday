import { PayloadAction } from "@reduxjs/toolkit"
import { authSliceType } from "../../../types/authSliceType"

export const persistLoginReducer = (state: authSliceType) => {
  if (localStorage.getItem("token") !== null) {
    state.token = localStorage.getItem("token")
    state.isLoggedIn = true
  }
}

export const loginReducer = (
  state: authSliceType,
  action: PayloadAction<string>
) => {
  localStorage.setItem("token", action.payload)
  state.token = action.payload
  state.isLoggedIn = true
}

export const logoutReducer = (state: authSliceType) => {
  localStorage.removeItem("token")
  state.token = null
  state.isLoggedIn = false
}
