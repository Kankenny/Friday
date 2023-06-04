import { useNavigate } from "react-router-dom"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import PersonAdd from "@mui/icons-material/PersonAdd"
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"

export default function AvatarMenu() {
  const { logout } = useAuthContext()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 30, height: 30 }} className="bg-tertiary">
            M
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          className: "caret-transparent",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} className="space-x-2">
          <AccountCircleIcon /> <p>Profile</p>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} className="space-x-2">
          <PersonAdd fontSize="small" />
          <p>Add another account</p>
        </MenuItem>
        <MenuItem onClick={handleClose} className="space-x-2">
          <Settings fontSize="small" />
          <p>Settings</p>
        </MenuItem>
        <MenuItem onClick={handleLogout} className="space-x-2">
          <Logout fontSize="small" />
          <p>Logout</p>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
