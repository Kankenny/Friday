import { UserType } from "../primitive-types/UserType"

export interface AuthSliceType {
  isLoading: boolean
  users: UserType[]
}
