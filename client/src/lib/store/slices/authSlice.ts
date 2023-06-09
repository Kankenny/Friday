import { createSlice } from "@reduxjs/toolkit"
import { authSliceType } from "../../types/authSliceType"

const initialState: authSliceType = {
  isLoggedIn: false,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
})
