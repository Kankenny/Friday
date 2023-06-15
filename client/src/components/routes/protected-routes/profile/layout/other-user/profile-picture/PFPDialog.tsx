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
        <div className="w-96 h-96 flex justify-center items-center ">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile Picture"
              className="rounded-full object-cover w-full h-full"
            />
          ) : (
            <h1 className="text-9xl bg-gray-400 text-main select-none capitalize w-full h-full rounded-full flex items-center justify-center">
              {firstName.charAt(0)}
            </h1>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default PFPDialog
