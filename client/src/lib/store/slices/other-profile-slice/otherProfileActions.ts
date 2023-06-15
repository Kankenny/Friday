import { PayloadAction } from "@reduxjs/toolkit"
import { ProfileSliceType } from "../../../types/slice-types/ProfileSliceType"

export const setUserDetailsReducer = (
  state: ProfileSliceType,
  action: PayloadAction<ProfileSliceType>
) => {
  return { ...state, ...action.payload }
}
