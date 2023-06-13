import Dialog from "@mui/material/Dialog"
import StyledButton from "../../../../../ui/StyledButton"
import { Avatar } from "@mui/material"
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
      <div className="py-16 px-32 space-y-5 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-secondary text-center">
          Change Profile Picture
        </h1>
        <AvatarDropzone firstName={firstName} profilePicture={profilePicture} />
        <StyledButton
          buttonText="Set Profile Picture"
          onClick={() => console.log("TEST")}
          twClasses="w-full text-xl font-semibold bg-tertiary text-secondary border-2 border-secondary"
        />
        <StyledButton
          buttonText="Remove Profile Picture"
          intent="secondary"
          onClick={() => console.log("TEST")}
          twClasses="w-full text-xl font-semibold"
        />
      </div>
    </Dialog>
  )
}

export default ChangePFPDialog
