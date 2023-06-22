import Dialog from "@mui/material/Dialog"
import { PostType } from "../../../../../lib/types/primitive-types/PostType"
import UserCard from "../../../user/UserCard"
import Alert from "../../../mui/Alert"
import {
  searchFormSchema,
  searchFormType,
} from "../../../../../lib/validations/searchValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import RHFInputField from "../../../rhf/RHFInputField"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUsers } from "../../../../../lib/store/slices/users-slice/usersSlice"
import { isAxiosError } from "axios"
import { setFeedback } from "../../../../../lib/store/slices/feedback-slice/feedbackSlice"
import userAPI from "../../../../../lib/services/axios-instances/userAPI"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import { Avatar } from "@mui/material"
import StyledButton from "../../../StyledButton"
import { UserType } from "../../../../../lib/types/primitive-types/UserType"
import postAPI from "../../../../../lib/services/axios-instances/postAPI"

type Props = {
  post: PostType
  open: boolean
  onClose: () => void
}

const AuthorizedUsersDialog = ({ post, open, onClose }: Props) => {
  const { _id } = useTypedSelector((state) => state.sameProfile)
  const { users: allUsers, isLoading } = useTypedSelector(
    (state) => state.users
  )
  const authorizedUsers = post.authorizedUsers
  const { handleSubmit, register } = useForm<searchFormType>({
    resolver: zodResolver(searchFormSchema),
  })

  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await userAPI.get("/")
        dispatch(setUsers(data.data))
      } catch (err) {
        if (isAxiosError(err)) {
          dispatch(
            setFeedback({
              feedbackMessage: err.response?.data.message,
              feedbackType: "error",
            })
          )
        } else {
          console.error(err)
        }
      }
    }
    fetchAllUsers()
  }, [dispatch])

  const filteredUsers = allUsers
    .filter((user) => user._id !== _id)
    .map((user) => (
      <li
        key={user._id}
        className="flex items-center justify-between p-2 md:p-4 pb-2 mb-2 border-b border-secondary"
      >
        <div className="flex items-center gap-2">
          <Avatar
            className="text-secondary capitalize"
            src={user.profilePicture}
          >
            {user.profilePicture ? "" : user.firstName.charAt(0)}
          </Avatar>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
        </div>
        <StyledButton
          buttonText="Authorize"
          intent="secondary"
          onClick={() => handleAuthorizeOrDeauthorize(user)}
        />
      </li>
    ))

  const handleAuthorizeOrDeauthorize = async (user: UserType) => {
    try {
      const action = "authorize"
      const { data } = await postAPI.put(`/${post._id}/${action}/${user._id}`)
      dispatch(
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
      )
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          setFeedback({
            feedbackMessage: err.response?.data.message,
            feedbackType: "error",
          })
        )
      } else {
        console.error(err)
      }
    }
  }

  const currentAuthUsers =
    authorizedUsers.length !== 0 ? (
      authorizedUsers.map((user) => (
        <UserCard user={user} key={user._id + new Date()} />
      ))
    ) : (
      <Alert
        message="No users are currently authorized except you"
        severity="error"
      />
    )

  return !isLoading ? (
    <Dialog open={open} onClose={onClose} className="mx-auto">
      <div className="p-16 gap-5 flex flex-col bg-blue-50">
        <div className="text-3xl font-bold text-secondary text-center">
          <h1>Authorized Users</h1>
          <p className="text-sm font-light">
            Manage who has collaboration access to this post
          </p>
        </div>
        {currentAuthUsers}

        <div className="border border-secondary rounded-md">
          <h1 className="font-bold text-tertiary text-xl bg-secondary p-2">
            Add users here
          </h1>
          <ul className="space-y-2 overscroll-y-auto"> {filteredUsers}</ul>
          <form
            onSubmit={handleSubmit(() => console.log("TEST"))}
            className="p-2"
          >
            <RHFInputField register={register("query")} label="Search" />
          </form>
        </div>
      </div>
    </Dialog>
  ) : (
    <div>TEST</div>
  )
}

export default AuthorizedUsersDialog
