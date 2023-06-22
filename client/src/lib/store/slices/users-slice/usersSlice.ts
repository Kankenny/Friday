import { createSlice } from "@reduxjs/toolkit"
import { UsersSliceType } from "../../../types/slice-types/UserSliceType"

const initialState: UsersSliceType = {
  isLoading: false,
  users: [],
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
})

export const {} = usersSlice.actions

export default usersSlice.reducer
