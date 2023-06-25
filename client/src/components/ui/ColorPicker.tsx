/* eslint-disable @typescript-eslint/no-explicit-any */
import { TwitterPicker } from "react-color"
import { useState } from "react"

const ColorPicker = () => {
  const [color, setColor] = useState("fff")

  const handleColorChange = (color: any) => {
    setColor(color)
  }

  return <TwitterPicker onChange={handleColorChange} color={color} />
}

export default ColorPicker
