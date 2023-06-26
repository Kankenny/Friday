import { useState } from "react"
import { Avatar } from "@mui/material"
import { useTypedSelector } from "../../../../../../../lib/hooks/redux-hook/useTypedSelector"
import ChangePFPDialog from "./ChangePFPDialog"

const SameUserPFP = () => {
  const [open, setOpen] = useState(false)
  const { profilePicture, firstName } = useTypedSelector(
    (state) => state.sameProfile
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
        className="hover:bg-secondary hover:text-tertiary border-secondary mx-auto h-[7.5em] w-[7.5em] cursor-pointer border-2 text-6xl capitalize duration-200 ease-in-out hover:opacity-70 md:h-64 md:w-64"
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

export default SameUserPFP
