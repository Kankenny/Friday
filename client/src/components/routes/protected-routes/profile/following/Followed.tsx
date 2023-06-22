import { Link } from "react-router-dom"
import { UserType } from "../../../../../lib/types/primitive-types/UserType"
import Card from "../../../../ui/Card"
import Avatar from "@mui/material/Avatar"

type Props = {
  followed: UserType
}

const Followed = ({ followed }: Props) => {
  const { firstName, lastName, profilePicture, username } = followed

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

export default Followed
