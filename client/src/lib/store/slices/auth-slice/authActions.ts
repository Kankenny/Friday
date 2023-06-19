import { PayloadAction } from "@reduxjs/toolkit"
import { AuthSliceType } from "../../../types/slice-types/AuthSliceType"

export const persistLoginReducer = (state: AuthSliceType) => {
  if (
    localStorage.getItem("token") !== null &&
    localStorage.getItem("_id") !== null
  ) {
    state.token = localStorage.getItem("token")
    state._id = localStorage.getItem("_id")
    state.isLoggedIn = true
  }
}

export const loginReducer = (
  state: AuthSliceType,
  action: PayloadAction<{ token: string; _id: string }>
) => {
  const token = action.payload.token
  localStorage.setItem("token", token)

  const _id = action.payload._id
  localStorage.setItem("_id", _id)

  state._id = _id
  state.token = token
  state.isLoggedIn = true
}

export const logoutReducer = (state: AuthSliceType) => {
  localStorage.removeItem("token")
  localStorage.removeItem("_id")
  state.token = null
  state._id = null
  state.isLoggedIn = false
}
