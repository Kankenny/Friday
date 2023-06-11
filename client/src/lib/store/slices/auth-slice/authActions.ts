import { PayloadAction } from "@reduxjs/toolkit"
import { AuthSliceType } from "../../../types/slice-types/AuthSliceType"

export const persistLoginReducer = (state: authSliceType) => {
  if (localStorage.getItem("token") !== null) {
    state.token = localStorage.getItem("token")
    state.isLoggedIn = true
  }
}

export const loginReducer = (
  state: AuthSliceType,
  action: PayloadAction<string>
) => {
  const token = action.payload
  localStorage.setItem("token", token)
  state.token = action.payload
  state.isLoggedIn = true
}

export const logoutReducer = (state: AuthSliceType) => {
  localStorage.removeItem("token")
  state.token = null
  state.isLoggedIn = false
}
