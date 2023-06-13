import ShieldIcon from "@mui/icons-material/Shield"
import GroupsIcon from "@mui/icons-material/Groups"
import PublicIcon from "@mui/icons-material/Public"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import Tooltip from "@mui/material/Tooltip"

type Props = {
  visibility: "private" | "collaborators" | "public" | "personal"
}

const VisibilityIcon = ({ visibility }: Props) => {
  let icon

  switch (visibility) {
    case "private":
      icon = (
        <Tooltip title="This post is private">
          <ShieldIcon />
        </Tooltip>
      )
      break
    case "collaborators":
      icon = (
        <Tooltip title="This post is for collaborators">
          <GroupsIcon />
        </Tooltip>
      )
      break
    case "public":
      icon = (
        <Tooltip title="This post is public">
          <PublicIcon />
        </Tooltip>
      )
      break
    case "personal":
      icon = (
        <Tooltip title="This post is only visible to you">
          <AccountCircleIcon />
        </Tooltip>
      )
      break
    default:
      icon = undefined
      break
  }

  return icon
}

export default VisibilityIcon
