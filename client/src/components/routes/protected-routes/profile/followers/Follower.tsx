import { UserType } from "../../../../../lib/types/primitive-types/UserType"
import Card from "../../../../ui/Card"
import Avatar from "@mui/material/Avatar"
import FollowerAction from "./FollowerAction"

type Props = {
  follower: UserType
}

const Follower = ({ follower }: Props) => {
  const { firstName, lastName, profilePicture, username } = follower

  return (
    <Card twClasses="flex items-center justify-between border border-secondary bg-blue-200 shadow-md p-2 md:p-4">
      <div className="group flex items-center gap-2 md:gap-4">
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
          <p className="text-xs font-light text-gray-600">@ {username}</p>
        </div>
      </div>
      <FollowerAction follower={follower} />
    </Card>
  )
}

export default Follower
