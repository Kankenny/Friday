import ColorPicker from "../../ColorPicker"
import { useState } from "react"

const ColorCode = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-red-500 h-2 rounded-t-sm" onClick={() => setOpen(!open)}>
      {open && <ColorPicker />}
    </div>
  )
}

export default ColorCode
