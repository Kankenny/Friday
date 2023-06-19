import * as React from "react"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"

type Props = {
  progress: "done" | "working on it" | "stuck" | "untouched"
}

const ProgressCell = ({ progress }: Props) => {
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

  const progressColor = {
    done: "bg-[#499548] hover:bg-[#366136] focus:bg-[#499548]",
    "working on it": "bg-[#eab308] hover:bg-[#c79505] focus:bg-[#eab308]",
    stuck: "bg-[#ef4444] hover:bg-[#be2d2d] focus:bg-[#ef4444]",
    untouched: "bg-gray-300 hover:bg-gray-400 focus:bg-gray-300",
  }

  return (
    <>
      <h1
        ref={anchorRef}
        onClick={handleToggle}
        className={`uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:text-secondary duration-200 ${progressColor[progress]}`}
      >
        {progress}
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
            <Paper className="bg-blue-50 border border-secondary rounded-md">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  className="py-0 rounded-md"
                >
                  <MenuItem
                    onClick={handleClose}
                    className={`flex justify-center uppercase text-sm text-secondary ${progressColor["done"]}`}
                  >
                    Done
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className={`flex justify-center uppercase text-sm text-secondary ${progressColor["working on it"]}`}
                  >
                    Working on it
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className={`flex justify-center uppercase text-sm text-secondary ${progressColor["stuck"]}`}
                  >
                    Stuck
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className={`flex justify-center uppercase text-sm text-secondary ${progressColor["untouched"]}`}
                  >
                    Untouched
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

export default ProgressCell
