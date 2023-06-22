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
        className="mx-auto h-[7.5em] w-[7.5em] md:h-64 md:w-64 cursor-pointer text-6xl hover:bg-secondary hover:text-tertiary hover:opacity-70 duration-200 ease-in-out capitalize border-2 border-secondary"
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
