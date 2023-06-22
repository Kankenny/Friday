import { UserType } from "../../../../../lib/types/primitive-types/UserType"
import Card from "../../../../ui/Card"
import Avatar from "@mui/material/Avatar"

type Props = {
  follower: UserType
}

const Follower = ({ follower }: Props) => {
  const { firstName, lastName, profilePicture, username } = follower

  return (
    <Card twClasses="border border-secondary bg-blue-200 group shadow-md p-2 md:p-4 flex items-center gap-2 md:gap-4">
      <Avatar
        className="text-secondary capitalize cursor-pointer"
        src={profilePicture}
      >
        {profilePicture ? "" : firstName.charAt(0)}
      </Avatar>
      <div className="group-hover:text-tertiary duration-200 ease-in-out cursor-pointer">
        <h1 className="group-hover:underline">
          {firstName} {lastName}
        </h1>
        <p className="text-xs font-light">@{username}</p>
      </div>
    </Card>
  )
}

export default Follower
