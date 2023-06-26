import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore"
import WorkIcon from "@mui/icons-material/Work"
import SchoolIcon from "@mui/icons-material/School"
import AltRouteIcon from "@mui/icons-material/AltRoute"
import Tooltip from "@mui/material/Tooltip"

type Props = {
  category: "personal" | "chores" | "work" | "school" | "others"
}

const CategoryIcon = ({ category }: Props) => {
  let icon

  switch (category) {
    case "personal":
      icon = (
        <Tooltip title="This post is about the person">
          <EmojiPeopleIcon />
        </Tooltip>
      )
      break
    case "chores":
      icon = (
        <Tooltip title="This post is about chores">
          <LocalGroceryStoreIcon />
        </Tooltip>
      )
      break
    case "work":
      icon = (
        <Tooltip title="This post is about work">
          <WorkIcon />
        </Tooltip>
      )
      break
    case "school":
      icon = (
        <Tooltip title="This post is about school">
          <SchoolIcon />
        </Tooltip>
      )
      break
    case "others":
      icon = (
        <Tooltip title="This post is about other categories">
          <AltRouteIcon />
        </Tooltip>
      )
      break
    default:
      icon = undefined
      break
  }

  return (
    <div className="bg-secondary text-main hover:bg-secondary hover:text-main flex h-7 max-w-fit items-center gap-2 rounded-md px-2 py-0.5 text-xs capitalize">
      {icon} {category}
    </div>
  )
}

export default CategoryIcon
