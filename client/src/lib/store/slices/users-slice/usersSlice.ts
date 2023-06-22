import { createSlice } from "@reduxjs/toolkit"
import { UsersSliceType } from "../../../types/slice-types/UserSliceType"
import { setUsersReducer } from "./usersActions"

const initialState: UsersSliceType = {
  isLoading: false,
  users: [],
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: setUsersReducer,
  },
})

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
