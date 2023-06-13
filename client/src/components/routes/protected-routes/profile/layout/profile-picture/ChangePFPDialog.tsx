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
      <div className="py-16 px-32 space-y-16 flex flex-col items-center">
        <div className="text-3xl font-bold text-secondary text-center">
          <h1>Set Profile Picture</h1>
          <p className="text-sm font-light">Select or drag an image here</p>
        </div>
        <AvatarDropzone firstName={firstName} profilePicture={profilePicture} />
      </div>
    </Dialog>
  )
}

export default ChangePFPDialog
