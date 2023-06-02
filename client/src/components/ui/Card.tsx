import React from "react"

type Props = {
  children: React.ReactNode
  twClasses?: string
}

const Card = ({ children, twClasses }: Props) => {
  return (
    <div
      className={` ${twClasses} rounded-lg shadow-lg bg-main text-secondary`}
    >
      {children}
    </div>
  )
}

export default Card
