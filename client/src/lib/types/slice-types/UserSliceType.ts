import { UserType } from "../primitive-types/UserType"

export interface UsersSliceType {
  isLoading: boolean
  users: UserType[]
}
