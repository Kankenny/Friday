import { PayloadAction } from "@reduxjs/toolkit"
import { UsersSliceType } from "../../../types/slice-types/UserSliceType"
import { UserType } from "../../../types/primitive-types/UserType"

export const setUsersReducer = (
  state: UsersSliceType,
  action: PayloadAction<UserType[]>
) => {
  state.users = action.payload
  state.isLoading = false
}
