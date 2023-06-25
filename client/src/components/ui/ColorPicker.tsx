/* eslint-disable @typescript-eslint/no-explicit-any */
import { TwitterPicker } from "react-color"
import { useState } from "react"

type Props = {
  initialColor: string
}

const ColorPicker = ({ initialColor }: Props) => {
  const [color, setColor] = useState(initialColor)

  const handleColorChange = (color: any) => {
    setColor(color)
  }

  return <TwitterPicker onChange={handleColorChange} color={color} />
}

export default ColorPicker
