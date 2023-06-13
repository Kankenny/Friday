import { useState } from "react"
import { Avatar } from "@mui/material"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Dialog from "@mui/material/Dialog"
import StyledButton from "../../../../ui/StyledButton"

const ProfilePicture = () => {
  const [open, setOpen] = useState(false)
  const { profilePicture, firstName } = useTypedSelector(
    (state) => state.profile
  )

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Avatar
        className="h-64 w-64 cursor-pointer text-6xl hover:bg-secondary hover:text-tertiary hover:opacity-70 duration-200 ease-in-out capitalize"
        src={profilePicture}
        onClick={handleOpen}
      >
        {profilePicture ? "" : firstName.charAt(0)}
      </Avatar>
      <ChangePFPDialog
        firstName={firstName}
        profilePicture={profilePicture}
        open={open}
        onClose={handleClose}
      />
    </>
  )
}

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
        <Avatar className="h-96 w-96 cursor-pointer text-6xl hover:bg-secondary hover:text-tertiary hover:opacity-70 duration-200 ease-in-out capitalize">
          {profilePicture ? "" : firstName.charAt(0)}
        </Avatar>
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

export default ProfilePicture
