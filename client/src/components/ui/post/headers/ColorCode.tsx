import ColorPicker from "../../ColorPicker"
import { useState, useRef } from "react"
import Popper from "@mui/material/Popper"

type Props = {
  initialColor: string
  postId: string
}

const ColorCode = ({ initialColor, postId }: Props) => {
  const [color, setColor] = useState(initialColor)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const handleColorChange = (color: string) => {
    setColor(color)
  }

  return (
    <div
      style={{ backgroundColor: color }}
      className={`h-2 rounded-t-sm`}
      onClick={() => setOpen(!open)}
      ref={anchorRef}
    >
      <Popper open={open} anchorEl={anchorRef.current}>
        <ColorPicker
          initialColor={initialColor}
          postId={postId}
          handleParentColorChange={handleColorChange}
        />
      </Popper>
    </div>
  )
}

export default ColorCode
