import * as React from "react"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import Tooltip from "@mui/material/Tooltip"
import EditIcon from "@mui/icons-material/Edit"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"

export default function PostMenu() {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
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

  const handleEditPostClick = (e: React.MouseEvent | Event) => {
    handleClose(e)
  }

  const handleCopyClick = (e: React.MouseEvent | Event) => {
    handleClose(e)
  }

  const handleDeleteClick = (e: React.MouseEvent | Event) => {
    handleClose(e)
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
    <div onClick={(e) => e.stopPropagation()}>
      <Tooltip
        title="Post Options"
        className="cursor-pointer"
        ref={anchorRef}
        aria-haspopup="true"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleToggle}
      >
        <MoreHorizOutlinedIcon className="rounded-full hover:bg-tertiary duration-200 ease-in-out" />
      </Tooltip>
      {open && (
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
              <Paper className="shadow-xl border border-secondary">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={handleEditPostClick}
                      className="flex gap-4 items-center"
                    >
                      <EditIcon className="h-5 w-5" />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={handleCopyClick}
                      divider
                      className="flex gap-4 items-center"
                    >
                      <ContentCopyIcon className="h-5 w-5" />
                      Copy
                    </MenuItem>
                    <MenuItem
                      onClick={handleDeleteClick}
                      className="flex gap-4 items-center"
                    >
                      <DeleteIcon className="h-5 w-5" />
                      Delete
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </div>
  )
}
