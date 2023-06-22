import React from "react"

type Props = {
  children: React.ReactNode
  twClasses?: string
}

const Overview = ({ children, twClasses }: Props) => {
  return (
    <div className={`flex flex-col text-center text-secondary ${twClasses}`}>
      {children}
    </div>
  )
}

export default Overview
