import Dialog from "@mui/material/Dialog"
import { PostType } from "../../../../../lib/types/primitive-types/PostType"
import UserCard from "../../../user/UserCard"
import Alert from "../../../mui/Alert"

type Props = {
  post: PostType
  open: boolean
  onClose: () => void
}

const AuthorizedUsersDialog = ({ post, open, onClose }: Props) => {
  const authorizedUsers = post.authorizedUsers

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
      <div className="p-16 gap-5 flex flex-col items-center max-h-96">
        <div className="text-3xl font-bold text-secondary text-center w-full">
          <h1>Authorized Users</h1>
          <p className="text-sm font-light">
            Manage who has collaboration access to this post
          </p>
        </div>
        {content}
      </div>
    </Dialog>
  )
}

export default AuthorizedUsersDialog
