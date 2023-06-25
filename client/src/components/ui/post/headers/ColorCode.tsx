import ColorPicker from "../../ColorPicker"
import { useState, useRef } from "react"
import Popper from "@mui/material/Popper"

const ColorCode = () => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="bg-red-500 h-2 rounded-t-sm"
      onClick={() => setOpen(!open)}
      ref={anchorRef}
    >
      <Popper open={open} anchorEl={anchorRef.current}>
        <ColorPicker />
      </Popper>
    </div>
  )
}

export default ColorCode
