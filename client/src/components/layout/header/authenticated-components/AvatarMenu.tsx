import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"
import { logout } from "../../../../lib/store/slices/auth-slice/authSlice"
import Button from "@mui/material/Button"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

export default function MenuListComposition() {
  const { profilePicture, firstName, username } = useTypedSelector(
    (state) => state.sameProfile
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleProfileClick = (e: React.MouseEvent | Event) => {
    handleClose(e)
    navigate(`/users/${username}/posts`)
  }

  const handleSettingsClick = (e: React.MouseEvent | Event) => {
    handleClose(e)
    navigate("/settings")
  }

  const handleLogoutClick = (e: React.MouseEvent | Event) => {
    handleClose(e)
    dispatch(logout())
    navigate("/login")
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div>
      <Tooltip title="Account settings" disableHoverListener={open}>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className="rounded-full"
        >
          <Avatar className="text-secondary capitalize" src={profilePicture}>
            {profilePicture ? "" : firstName.charAt(0)}
          </Avatar>
        </Button>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  className=""
                >
                  <MenuItem
                    onClick={handleProfileClick}
                    divider
                    className="flex gap-2 items-center"
                  >
                    <AccountCircleOutlinedIcon />
                    <h1>Profile</h1>
                  </MenuItem>
                  <MenuItem
                    onClick={handleSettingsClick}
                    className="flex gap-2 items-center"
                  >
                    <SettingsOutlinedIcon />
                    <h1>Settings</h1>
                  </MenuItem>

                  <MenuItem
                    onClick={handleLogoutClick}
                    className="flex gap-2 items-center"
                  >
                    <LogoutOutlinedIcon />
                    <h1>Logout</h1>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
