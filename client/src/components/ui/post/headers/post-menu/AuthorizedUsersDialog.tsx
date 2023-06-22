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

type Props = {
  post: PostType
  open: boolean
  onClose: () => void
}

const AuthorizedUsersDialog = ({ post, open, onClose }: Props) => {
  const authorizedUsers = post.authorizedUsers
  const { handleSubmit, register } = useForm<searchFormType>({
    resolver: zodResolver(searchFormSchema),
  })

  const content =
    authorizedUsers.length !== 0 ? (
      authorizedUsers.map((user) => <UserCard user={user} key={user._id} />)
    ) : (
      <Alert
        message="No users are currently authorized except you"
        severity="error"
      />
    )

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-16 gap-5 flex flex-col">
        <div className="text-3xl font-bold text-secondary text-center w-full">
          <h1>Authorized Users</h1>
          <p className="text-sm font-light">
            Manage who has collaboration access to this post
          </p>
        </div>
        {content}

        <div className="border border-secondary p-2 space-y-2">
          <h1 className="font-bold text-tertiary text-xl">Add users here</h1>
          <form onSubmit={handleSubmit(() => console.log("TEST"))}>
            <RHFInputField register={register("query")} label="Search" />
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default AuthorizedUsersDialog
