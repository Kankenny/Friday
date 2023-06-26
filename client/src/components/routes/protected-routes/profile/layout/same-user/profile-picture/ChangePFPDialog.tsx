import Dialog from "@mui/material/Dialog"
import AvatarDropzone from "./AvatarDropzone"

type Props = {
  firstName: string
  profilePicture: string | undefined
  open: boolean
  onClose: () => void
}

const ChangePFPDialog = ({
  firstName,
  profilePicture,
  open,
  onClose,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col items-center space-y-16 px-32 py-16">
        <div className="text-secondary text-center text-3xl font-bold">
          <h1>Set Profile Picture</h1>
          <p className="text-sm font-light">Select or drag an image here</p>
        </div>
        <AvatarDropzone firstName={firstName} profilePicture={profilePicture} />
      </div>
    </Dialog>
  )
}

export default ChangePFPDialog
