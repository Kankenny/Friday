import { Link } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import Card from "../Card"
import { UserType } from "../../../lib/types/primitive-types/UserType"

type Props = {
  user: UserType
}

const UserCard = ({ user }: Props) => {
  const { firstName, lastName, profilePicture, username } = user

  return (
    <Card twClasses="flex items-center justify-between border border-secondary bg-blue-200 shadow-md p-2 md:p-4">
      <Link
        to={`/users/${username}/posts`}
        className="group flex items-center gap-2 md:gap-4"
      >
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
      </Link>
      {/* <FollowerAction follower={follower} /> */}
    </Card>
  )
}

export default UserCard
