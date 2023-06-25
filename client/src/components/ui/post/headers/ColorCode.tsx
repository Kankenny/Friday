import ColorPicker from "../../ColorPicker"
import { useState, useRef } from "react"
import Popper from "@mui/material/Popper"

type Props = {
  color: string
}

const ColorCode = ({ color }: Props) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="bg-red-500 h-2 rounded-t-sm"
      onClick={() => setOpen(!open)}
      ref={anchorRef}
    >
      <Popper open={open} anchorEl={anchorRef.current}>
        <ColorPicker initialColor={color} />
      </Popper>
    </div>
  )
}

export default ColorCode
