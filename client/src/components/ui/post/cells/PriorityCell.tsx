import * as React from "react"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"

type Props = {
  priority: "low" | "medium" | "high"
}

const PriorityCell = ({ priority }: Props) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLHeadingElement>(null)

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus()
    }

    prevOpen.current = open
  }, [open])

  const priorityColor = {
    low: "bg-[#FFDADA] hover:bg-[#FFB3B3]",
    medium: "bg-[#FF8E8E] hover:bg-[#FF5F5F]",
    high: "bg-[#FF3838] hover:bg-[#FF1A1A]",
  }

  return (
    <>
      <h1
        ref={anchorRef}
        onClick={handleToggle}
        className={`uppercase flex-grow max-w-[10%] border border-secondary p-2 text-sm cursor-pointer hover:text-secondary duration-200 ${priorityColor[priority]}`}
      >
        {priority}
      </h1>
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
            <Paper className="bg-blue-50">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={handleClose}
                    className="flex justify-center"
                  >
                    Low
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="flex justify-center"
                  >
                    Medium
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="flex justify-center"
                  >
                    High
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default PriorityCell
