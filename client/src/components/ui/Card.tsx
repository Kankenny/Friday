import React from "react"

type Props = {
  children: React.ReactNode
  twClasses?: string
}

const Card = ({ children, twClasses }: Props) => {
  return (
    <div className={` ${twClasses} text-secondary rounded-lg shadow-lg`}>
      {children}
    </div>
  )
}

export default Card
