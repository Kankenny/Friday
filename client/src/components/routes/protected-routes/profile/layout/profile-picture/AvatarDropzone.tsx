import Avatar from "@mui/material/Avatar"

type Props = {
  firstName: string
  profilePicture: string | undefined
}

const AvatarDropzone = ({ firstName, profilePicture }: Props) => {
  return (
    <Avatar className="h-96 w-96 cursor-pointer text-6xl hover:bg-secondary hover:text-tertiary hover:opacity-70 duration-200 ease-in-out capitalize">
      {profilePicture ? "" : firstName.charAt(0)}
    </Avatar>
  )
}

export default AvatarDropzone
