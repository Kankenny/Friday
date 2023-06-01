import React from "react"
import { Link } from "react-router-dom"

type Props = {
  children: React.ReactNode
  to: string
}

const RouterDiv = ({ children, to }: Props) => {
  return (
    <Link to={to}>
      <div className="text-main font-bold text-lg">{children}</div>
    </Link>
  )
}

export default RouterDiv
