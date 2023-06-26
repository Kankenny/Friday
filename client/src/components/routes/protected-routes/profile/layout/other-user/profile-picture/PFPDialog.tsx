import Dialog from "@mui/material/Dialog"

type Props = {
  firstName: string
  profilePicture: string | undefined
  open: boolean
  onClose: () => void
}

const PFPDialog = ({ firstName, profilePicture, open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-16">
        <div className="flex h-96 w-96 items-center justify-center ">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile Picture"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <h1 className="text-main flex h-full w-full select-none items-center justify-center rounded-full bg-gray-400 text-9xl capitalize">
              {firstName.charAt(0)}
            </h1>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default PFPDialog
