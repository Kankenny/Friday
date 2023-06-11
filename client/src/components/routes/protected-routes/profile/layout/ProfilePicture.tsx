import { Avatar } from "@mui/material"

type Props = {
  src?: string
}

const ProfilePicture = ({ src }: Props) => {
  return (
    <Avatar
      className="h-64 w-64 cursor-pointer text-6xl hover:bg-secondary hover:text-tertiary hover:opacity-70 duration-200 ease-in-out"
      src={src}
    >
      {src ? "" : "K"}
    </Avatar>
  )
}

export default ProfilePicture
